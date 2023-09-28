import React from "react";

export default function Pay({ amount, isOneOff, currency }) {
  return (
    <form action="http://0.0.0.0:4242/create-checkout-session" method="POST">
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="isOneOff" value={isOneOff} />
      <input type="hidden" name="currency" value={currency} />
      <button
        type="submit"
        role="link"
        className="text-prm-green cursor-pointer rounded-full text-3xl tracking-wider font-normal bg-prm-white border-solid border-[2px] overflow-hidden border-prm-green donate_items_size flex items-center justify-center drop-shadow-md transition-all  hover:bg-prm-green/20 hover:border-[1px]"
      >
        Donate
      </button>
    </form>
  );
}
