const axios = require('axios');

const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const LEMONSQUEEZY_STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;
const LEMONSQUEEZY_SIGNING_SECRET = process.env.LEMONSQUEEZY_SIGNING_SECRET;

const lemonSqueezyApi = axios.create({
  baseURL: 'https://api.lemonsqueezy.com/v1',
  headers: {
    'Authorization': `Bearer ${LEMONSQUEEZY_API_KEY}`,
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

module.exports = { 
  lemonSqueezyApi, 
  LEMONSQUEEZY_STORE_ID, 
  LEMONSQUEEZY_SIGNING_SECRET 
};