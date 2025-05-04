const Destination = require('../models/destination');
const mongoose = require('mongoose')


const getSavedDestinations = async (req, res) => {
  
  const userId = req.user._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const skip = (page - 1) * limit;

  try {
    const savedDestinationIds = req.user.saved.map((e) => new mongoose.Types.ObjectId(e));
    
    
    const total = await Destination.countDocuments({ _id: { $in: savedDestinationIds } });

    const savedDestinations = await Destination.find({ _id: { $in: savedDestinationIds } })
      .populate('categories')
      .populate('userId', 'name')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: savedDestinations,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error('Error fetching saved destinations:', error);
    res.status(500).json({ message: 'Error fetching saved destinations' });
  }
};




const toggleSaved = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; 

  try {
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    
    if (destination.saved.includes(userId)) {
      
      destination.saved = destination.saved.filter(user => user.toString() !== userId.toString());
    } else {
      
      destination.saved.push(userId);
      req.user.saved.push(destination._id);

    }

    await destination.save();
    await req.user.save();
    res.status(200).json({ message: 'Favorite status updated', destination });
  } catch (error) {
    console.error('Error toggling saved:', error);
    res.status(500).json({ message: error.message });
  }
};


const getAllDestinations = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  try {
    const total = await Destination.countDocuments();

    const destinations = await Destination.find()
      .populate('userId', 'name') 
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
    res.status(500).json({ message: 'Server Error' });
  }
};


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
  


const getDestinations = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
  
    try {
      const total = await Destination.countDocuments({ userId: req.user._id });
  
      const destinations = await Destination.find({ userId: req.user._id })
        .populate('userId', 'name')
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
  



const updateDestination = async (req, res) => {
    const { destination, description, date, photoUrl, categories } = req.body;
    try {
        const destinationEntry = await Destination.findById(req.params.id);
        if (!destinationEntry) return res.status(404).json({ message: 'Destination not found' });

        
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
  getAllDestinations,
  updateDestination,
  deleteDestination,
  toggleSaved,
  getSavedDestinations,
};
