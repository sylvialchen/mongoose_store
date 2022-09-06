require('dotenv').config()

// Dependencies
const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const db = mongoose.connection;
const Product = require('./models/products');

//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(process.env.MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: to MONGO_URI'));
db.on('disconnected', () => console.log('mongod disconnected'));

app.use(express.urlencoded({ extended: true }));

// Routes / Controllers
// Seed
const productSeed = require('./models/productSeed.js');

app.get('/product/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/product');
	});
});

// Index
// New
// Delete
// Update
// Create
// Edit
// Show



// Listener
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));