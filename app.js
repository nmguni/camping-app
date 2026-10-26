const express = require('express');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/camping-app'

var methodOverride = require('method-override')

// set ejs as template engine
app.set('view engine', 'ejs');
// Set the views directory (optional if using the default)
app.set('views', './views');

// parse form body
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

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



// --------- NEW AND CREATE -----------------
app.get('/campgrounds/new', async (req, res) => {
   res.render('campgrounds/new')
})

// --------- FORM SUBMISSION -----------------
app.post('/campgrounds', async (req, res) => {
   const campground = new Campground(req.body.campground)
   await campground.save();
   res.redirect(`/campgrounds/${campground._id}`)
})


// --------- SHOW PAGE -----------------
app.get('/campgrounds/:id', async (req, res) => {
   const campgrounds = await Campground.findById(req.params.id);
   res.render('campgrounds/show', { campgrounds })
})



// --------- EDIT AND UPDATE -----------------
app.get('/campgrounds/:id/edit', async (req, res) => {
   const campgrounds = await Campground.findById(req.params.id);
   res.render('campgrounds/edit', { campgrounds })

})

app.put('/campgrounds/:id', async (req, res) => {
   const { id } = req.params
   const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
   res.redirect(`/campgrounds/${campground._id}`)

})


// --------- DELETE -----------------
app.delete('/campgrounds/:id', async (req, res) => {
   const { id } = req.params
   await Campground.findByIdAndDelete(id);
   res.redirect('/campgrounds')
})


// --------- SERVER -----------------
app.listen(PORT, () => {
   console.log(`Serving on port:${PORT} (^_^)`);
})
