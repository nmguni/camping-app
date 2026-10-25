const mongoose = require('mongoose');
const cities = require('./cities');


// model import 
const Campground = require('../models/campground');

// seed items 
const { places, descriptors } = require('./seedHelpers');


// pick a random item out of an array
const sample = array => array[Math.floor(Math.random() * array.length)];

const MONGO_URI = 'mongodb://localhost:27017/camping-app'

const seedDB = async () => {

   // - connect to the database
   await mongoose.connect(MONGO_URI)
   console.log('Connected to MongoDb for seeding...... (o_o)')

   // - clear exisiting data 
   await Campground.deleteMany({});
   console.log('Cleared exisiting camping data.....(x.x)')


   // - insert mock camping data
   for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const camp = new Campground({
         location: `${cities[random1000].city}, ${cities[random1000].state}`,
         title: `${sample(descriptors)} ${sample(places)}`
      })
      // insert new seed data  - make new camp grunds 
      await Campground.insertMany(camp);
   }
   console.log('----- (O.o) Database seeded (O.o) -----');

   mongoose.connection.close();
};

seedDB();

