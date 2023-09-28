// import express, { Request, Response } from "express";

// // Create an instance of Express
// const app = express();
// const port = 4002;
// const host = "0.0.0.0";

// // Define a simple GET endpoint
// app.get("/hello", (req: Request, res: Response) => {
//   res.json({ message: "express.js server works" });
// });

// // Start the Express server
// app.listen(port, host, () => {
//   console.log(`Running on http://${host}:${port}`);
// });

const express = require("express");
const cors = require("cors");
const app = express();
const { resolve } = require("path");
// Copy the .env.example in the root into a .env file in this folder
require("dotenv").config();

// Ensure environment variables are set.
checkEnv();

const test = true;
const stripe_key = test ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripe_key, {
  apiVersion: "2020-08-27",
});

app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded());
// app.use(cors({ origin: ["https://checkout.stripe.com", "http://localhost:3000"] }));
app.use(cors({ origin: "*" }));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post("/create-checkout-session", async (req, res) => {
  // console.log(stripe);
  // console.log(stripe.checkout.sessions);
  const domainURL = "http://localhost:3000"; //process.env.DOMAIN;
  const { amount, isOneOff, currency } = req.body;
  const isOneOffBoolean = isOneOff === "true" ? true : false;

  let price_data = {
    unit_amount: parseInt(parseFloat(amount) * 100),
    currency: currency.toLowerCase(),
    product: test
      ? isOneOffBoolean
        ? process.env.PRODUCT_TEST_ONEOFF
        : process.env.PRODUCT_TEST_SUBSCRIPTION
      : isOneOffBoolean
      ? process.env.PRODUCT_ONEOFF
      : process.env.PRODUCT_SUBSCRIPTION,
  };
  if (!isOneOffBoolean) {
    price_data.recurring = { interval: "month" };
  }

  const payment_description = {
    mode: isOneOffBoolean ? "payment" : "subscription",
    line_items: [
      {
        price_data,
        quantity: 1,
      },
    ],
    success_url: `${domainURL}/donate/success`,
    cancel_url: `${domainURL}/donate/canceled`,
  };
  if (isOneOffBoolean) {
    payment_description.submit_type = "donate";
  }

  console.log(price_data);
  try {
    const session = await stripe.checkout.sessions.create(payment_description);
    res.redirect(303, session.url);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
});

// Webhook handler for asynchronous events.
app.post("/webhook", async (req, res) => {
  let event;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `.env`,
    // retrieve the event data directly from the request body.
    event = req.body;
  }

  if (event.type === "checkout.session.completed") {
    console.log(`🔔  Payment received!`);

    // Note: If you need access to the line items, for instance to
    // automate fullfillment based on the the ID of the Price, you'll
    // need to refetch the Checkout Session here, and expand the line items:
    //
    // const session = await stripe.checkout.sessions.retrieve(
    //   'cs_test_KdjLtDPfAjT1gq374DMZ3rHmZ9OoSlGRhyz8yTypH76KpN4JXkQpD2G0',
    //   {
    //     expand: ['line_items'],
    //   }
    // );
    //
    // const lineItems = session.line_items;
  }

  res.sendStatus(200);
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

function checkEnv() {
  const price = process.env.PRICE;
  if (price === "price_12345" || !price) {
    console.log("You must set a Price ID in the environment variables. Please see the README.");
    process.exit(0);
  }
}
