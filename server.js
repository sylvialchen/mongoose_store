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

app.get('/products/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/products');
	});
});

// Index
app.get('/products', (req, res) => {
	Product.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	});
});
// New
app.get('/products/new', (req, res) => {
	res.render('new.ejs');
});
// Delete
// Update
// Create
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
    res.redirect('/products');
});
});
// Edit
app.get("/products/:index/edit", (req, res) => {
	res.render("edit.ejs", {

    })
});

// Show
app.get("/products/:id", (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render("show.ejs", {
            product: foundProduct,
        })
	});
});


// Listener
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));