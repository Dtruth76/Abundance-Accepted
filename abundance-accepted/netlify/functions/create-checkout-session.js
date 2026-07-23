import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { tier } = JSON.parse(event.body || '{}');
    const priceId = {
      'abundance-plus': 'price_1TvT6bE1ZQ0yoHJiiRthasAQ',
      'abundance-premium': 'price_1TvTRkE1ZQ0yoHJirsep9gQV',
    }[tier];

    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Unknown tier: ${tier}` }),
      };
    }

    const siteUrl = process.env.SITE_URL || 'http://localhost:8888';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout-cancelled`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong creating checkout.' }),
    };
  }
};
