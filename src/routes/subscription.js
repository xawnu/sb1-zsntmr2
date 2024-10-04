const express = require('express');
const { createCheckoutSession, verifyWebhookSignature, handleSubscriptionCreated, handleSubscriptionUpdated, handleSubscriptionCancelled } = require('../services/lemonSqueezy');
const { updateUserSubscription } = require('../services/userService');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { plan } = req.body;
    const checkoutUrl = await createCheckoutSession(req.userId, plan);
    res.json({ checkoutUrl });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Error creating subscription' });
  }
});

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const signature = req.headers['x-signature'];
  
  if (!verifyWebhookSignature(req.body, signature)) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(req.body);

  switch (event.meta.event_name) {
    case 'subscription_created':
      await handleSubscriptionCreated(event);
      break;
    case 'subscription_updated':
      await handleSubscriptionUpdated(event);
      break;
    case 'subscription_cancelled':
      await handleSubscriptionCancelled(event);
      break;
    default:
      console.log(`Unhandled event type: ${event.meta.event_name}`);
  }

  res.json({ received: true });
});

module.exports = router;