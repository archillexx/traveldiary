const Destination = require('../models/destination');

// Add a new destination
// Add a new destination
const addDestination = async (req, res) => {
    const { destination, description, date, photoUrl, latitude, longitude, categories } = req.body;
  
    try {
      const newDestination = await Destination.create({
        userId: req.user._id,
        destination,
        description,
        date,
        photoUrl,
        latitude,
        longitude,
        categories,
      });
  
      res.status(201).json(newDestination);
    } catch (error) {
      console.error('Error adding destination:', error);
      res.status(500).json({ message: error.message });
    }
  };
  

// Get all destinations for a specific user
const getDestinations = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
  
    try {
      const total = await Destination.countDocuments({ userId: req.user._id });
  
      const destinations = await Destination.find({ userId: req.user._id })
        .populate('categories')
        .skip(skip)
        .limit(limit);
  
      res.json({
        data: destinations,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


// Update a destination
const updateDestination = async (req, res) => {
    const { destination, description, date, photoUrl, categories } = req.body;
    try {
        const destinationEntry = await Destination.findById(req.params.id);
        if (!destinationEntry) return res.status(404).json({ message: 'Destination not found' });

        // Only allow the owner to update
        if (destinationEntry.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        destinationEntry.destination = destination || destinationEntry.destination;
        destinationEntry.description = description || destinationEntry.description;
        destinationEntry.date = date || destinationEntry.date;
        destinationEntry.photoUrl = photoUrl || destinationEntry.photoUrl;
        destinationEntry.categories = categories || destinationEntry.categories;  // Update categories

        const updatedDestination = await destinationEntry.save();
        res.json(updatedDestination);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete a destination
const deleteDestination = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    await Destination.deleteOne({ _id: id });
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ message: 'Server error while deleting destination' });
  }
};

module.exports = {
  addDestination,
  getDestinations,
  updateDestination,
  deleteDestination,
};
