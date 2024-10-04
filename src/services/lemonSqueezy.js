const { lemonSqueezyApi, LEMONSQUEEZY_STORE_ID, LEMONSQUEEZY_SIGNING_SECRET } = require('../config/lemon');
const { updateUserCredits } = require('./userService');
const crypto = require('crypto');

const createCheckoutSession = async (userId, plan) => {
  try {
    const response = await lemonSqueezyApi.post('/checkouts', {
      data: {
        type: 'checkouts',
        attributes: {
          store_id: LEMONSQUEEZY_STORE_ID,
          product_options: {
            name: `${plan} Plan`,
            description: plan === 'basic' ? '200 credits for image processing' : '1000 credits for image processing',
            price: plan === 'basic' ? 999 : 1999, // Price in cents
          },
          checkout_data: {
            custom: {
              user_id: userId,
              plan: plan,
            },
          },
        },
      },
    });

    return response.data.data.attributes.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

const verifyWebhookSignature = (payload, signature) => {
  const hmac = crypto.createHmac('sha256', LEMONSQUEEZY_SIGNING_SECRET);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
};

const handleSubscriptionCreated = async (event) => {
  const { user_id, plan } = event.data.attributes.custom_data;
  const credits = plan === 'basic' ? 200 : 1000;
  await updateUserCredits(user_id, credits);
};

const handleSubscriptionUpdated = async (event) => {
  const { user_id, plan } = event.data.attributes.custom_data;
  const credits = plan === 'basic' ? 200 : 1000;
  await updateUserCredits(user_id, credits);
};

const handleSubscriptionCancelled = async (event) => {
  const { user_id } = event.data.attributes.custom_data;
  // You might want to handle cancellation differently, e.g., allowing users to keep their credits until they run out
  // or setting credits to 0. For now, we'll just set it to 0.
  await updateUserCredits(user_id, 0);
};

module.exports = {
  createCheckoutSession,
  verifyWebhookSignature,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionCancelled,
};