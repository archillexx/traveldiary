const express = require('express');
const { addDestination, getDestinations, getAllDestinations, updateDestination, deleteDestination, toggleSaved, getSavedDestinations} = require('../controllers/destinationController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();




router.route('/')
  .get(protect, getDestinations)
  .post(protect, addDestination);

router.get('/all',getAllDestinations);




router.route('/:id') 
  .put(protect, updateDestination)
  .delete(protect, deleteDestination);


router.post('/:id/saved', protect, toggleSaved);


router.get('/saved', protect, getSavedDestinations);
module.exports = router;
