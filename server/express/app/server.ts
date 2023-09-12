import express, { Request, Response } from "express";

// Create an instance of Express
const app = express();
const port = 4002;
const host = "0.0.0.0";

// Define a simple GET endpoint
app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "express.js server works" });
});

// Start the Express server
app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`);
});
