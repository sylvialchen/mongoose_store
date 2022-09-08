const express = require("express");
const productRouter = express.Router();
const Product = require('../models/products.js');

module.exports = productRouter;

// Routes / Controllers
// Seed
const productSeed = require('../models/productSeed.js');

productRouter.get('/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/products');
	});
});

// Index
productRouter.get('/', (req, res) => {
	Product.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	});
});
// New
productRouter.get('/new', (req, res) => {
	res.render('new.ejs');
});

// Delete
productRouter.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
      res.redirect("/products")
    })
  });

// Update
productRouter.put("/:id/buy", (req, res) => {  
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProduct) => {
        updatedProduct.qty -= 1;
        updatedProduct.save();
        res.redirect(`/products/${req.params.id}`)
      }
    )
  })

productRouter.put("/:id", (req, res) => {  
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`)
      }
    )
  })



// Create
productRouter.post('/', (req, res) => {
    Product.create(req.body, (error, foundProduct) => {
        res.redirect('/products');
    });
});

// Edit
productRouter.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
      res.render("edit.ejs", {
        product: foundProduct,
      })
    })
  })

// Show
productRouter.get("/:id", (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render("show.ejs", {
            product: foundProduct,
        })
	});
});
