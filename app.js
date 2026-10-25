const express = require('express');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/camping-app'





// set ejs as template engine
app.set('view engine', 'ejs');
// Set the views directory (optional if using the default)
app.set('views', './views');


app.get('/', (req, res) => {
   res.render('home');
})



// Connect to MongoDB
mongoose.connect(MONGO_URI)
   .then(() => console.log('Connected to MongoDB for API Server'))
   .catch(err => console.error('MongoDB connection error:', err));

// home page
app.get('/', (req, res) => {
   res.render('home');
})

// API Endpoint to fetch campers
app.get('/campgrounds', async (req, res) => {

   try {
      const campgrounds = await Campground.find({}); // Fetch everything from the collection
      // res.json(campgrounds); // Send it as JSON to the browser

      res.render('campgrounds/index', { campgrounds })
   } catch (error) {

      console.error("DETAILED ERROR:", error);
      res.status(500).json({ error: 'Failed to fetch campgrounds', details: error.message });
   }
});


app.listen(PORT, () => {
   console.log(`Serving on port:${PORT} (^_^)`);
})

/*



// Routes 
// ----> Home <----


// ---> LOADING ISSSUE AGAIN  <----
app.get('/campgrounds', async (req, res) => {

   const campgrounds = await Campground.findOne({})

   res.render('campgrounds/index', { campgrounds })

   console.log(data)
});




// // Handle GET request to the root path
// app.get('/', (req, res) => {
//    res.render('home')
// });

// app.get('/campgrounds', async (req, res) => {
//    const campground = await Campground.find({});
//    res.render('campgrounds/index')
// });



app.listen(PORT, () => {
   console.log(`Serving on port:${PORT} (^_^)`);
})

*/

