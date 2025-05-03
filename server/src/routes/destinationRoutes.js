const express = require('express');
const { addDestination, getDestinations, getAllDestinations, updateDestination, deleteDestination } = require('../controllers/destinationController');
const { protect } = require('../middleware/authMiddleware');
//const commentRoutes = require('./commentRoutes');

const router = express.Router();

// Get user's destinations and add a new destination
router.route('/')
  .get(protect, getDestinations)
  .post(protect, addDestination);



// Update and delete a destination by ID
router.route('/:id')
  .put(protect, updateDestination)
  .delete(protect, deleteDestination);

//router.use('/:destinationId/comments', commentRoutes);

module.exports = router;
