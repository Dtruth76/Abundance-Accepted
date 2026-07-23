// src/lib/stripeCheckout.ts
//
// Import this into your membership tier buttons, e.g.:
//   import { startCheckout } from "../lib/stripeCheckout";
//   <button onClick={() => startCheckout("abundance-plus")}>Join Plus</button>

export type MembershipTier = "abundance-plus" | "abundance-premium";

export async function startCheckout(tier: MembershipTier) {
  try {
    const response = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier }),
    });

    if (!response.ok) {
      throw new Error("Failed to start checkout");
    }

    const { url } = await response.json();

    if (url) {
      window.location.href = url; // sends the customer to Stripe's hosted checkout page
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Something went wrong starting checkout. Please try again in a moment.");
  }
}