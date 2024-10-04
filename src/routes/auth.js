const express = require('express');
const { 
  signUpWithEmail, 
  signInWithEmail, 
  signInWithGoogle 
} = require('../services/userService');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, session } = await signUpWithEmail(email, password);
    res.status(201).json({ user, session });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, session } = await signInWithEmail(email, password);
    res.json({ user, session });
  } catch (error) {
    res.status(400).json({ message: 'Invalid credentials', error: error.message });
  }
});

router.get('/google', async (req, res) => {
  try {
    const { user, session } = await signInWithGoogle();
    res.json({ user, session });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in with Google', error: error.message });
  }
});

module.exports = router;