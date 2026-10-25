const mongoose = require('mongoose');


const CampgroundSchema = new mongoose.Schema({
   title: String,
   price: String,
   description: String,
   location: String
});

// Campground convert to lower case and plurlized -> campgrounds
module.exports = mongoose.model('Campground', CampgroundSchema);

