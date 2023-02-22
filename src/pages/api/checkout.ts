import { stripe } from "@/lib/Stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { priceIds } = req.body;

  if (!Array.isArray(priceIds) || priceIds.length === 0) {
    return res.status(400).json({ error: "Price ids not correctly informed" });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: priceIds.map((priceId: string) => {
      return {
        price: priceId,
        quantity: 1,
      };
    }),
    cancel_url: cancelUrl,
    success_url: successUrl,
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
