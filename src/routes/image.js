const express = require('express');
const multer = require('multer');
const { removeBackground } = require('../services/imageProcessing');
const { deductUserCredits } = require('../services/userService');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/process', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Deduct 1 credit for processing the image
    await deductUserCredits(req.userId, 1);

    const processedImagePath = await removeBackground(req.file.path);
    res.json({ processedImageUrl: processedImagePath });
  } catch (error) {
    console.error('Error processing image:', error);
    if (error.message === 'Insufficient credits') {
      res.status(402).json({ message: 'Insufficient credits to process image' });
    } else {
      res.status(500).json({ message: 'Error processing image' });
    }
  }
});

module.exports = router;