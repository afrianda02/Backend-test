const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home route
 *     description: Returns a welcome message
 *     responses:
 *       200:
 *         description: A welcome message
 */
router.get('/', (req, res) => {
  res.send('Welcome to the Library API');
});

module.exports = router;
