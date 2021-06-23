var express = require('express');
var router = express.Router();

var manufacturers = [ 
  { 
  id: 1, 
  name: "Lego", 
  imageUrl: "images/lego.png", 
  }, 
  { 
  id: 2, 
  name: "Disney", 
  imageUrl: "images/disney.png", 
  }, 
  ]; 
  var products = [ 
  { 
  id: 1, 
  name: "LEGO Marvel Avengers: Avengers Tower Battle 76166 Collectible Building Toy with Action Scenes and Superhero Minifigures; Cool Holiday or Birthday Gift, New 2020 (685 Pieces)", 
  price: 89.95, 
  imageUrl: "/images/product_1.jpg", 
  description: "With 5 floors and 7 feature-packed rooms, the LEGO Marvel Avengers: Avengers Tower Battle (76166) is bursting with role-play possibilities with classic Marvel characters",  
  manufacturerId: 1, 
  }, 
  { 
  id: 2, 
  name: "LEGO DC Batman Batmobile: Pursuit of the Joker 76119 Building Kit (342 pieces)", 
  price: 40.99, 
  imageUrl: "/images/product_2.jpg", 
  description: "The awesome LEGO DC Batman Joker's Trike (76159) puts fast-moving, Batman-vs.-THE JOKER action, iconic vehicles, awesome weapons and super-cool features into the hands of young Batman fans", 
  manufacturerId: 1, 
  }, 
  { 
  id: 3, 
  name: "LEGO Star Wars 75018: Jek-14's Stealth Starfighter", 
  price: 68.87, 
  imageUrl: "/images/product_3.jpg", 
  description: "Features retractable landing gear, opening cockpit with space for a minifigure, rotating and elevating blaster cannon, R4-G0 astromech droid", 
  manufacturerId: 1, 
  }, 
  { 
  id: 4, 
  name: "Disney Phineas and Ferb 8 Ferb Plush, soft, cuddle doll toy", 
  price: 19.99, 
  imageUrl: "/images/product_5.jpg",
  description: "Disney's Phineas and Ferb 8 Inch Plush, soft, cuddle Phineas figure", 
  manufacturerId: 2, 
  }, 
  { 
  id: 5, 
  name: 
  "DESPICABLE ME 2 - Minion cuddly Soft Toy - Plush Figures Banana 28-33 cm, Minion Typ:Bob", 
  price: 19.99, 
  imageUrl:  "/images/product_4.jpg", 
  description: "Despicable Me 2 Plush Figure Minion Plush 3D Eyes Banana 30 cm Minions are small yellow creatures that have existed since ancient times. From the yellow protozoans, they developed into a life form with only one goal: to serve the most terrible villain of history. So they are a bit clumsy and chaotic, however, do not bother anyone... Except of course, their super-scoundrel who rarely survives worship.", 
  manufacturerId: 2, 
  }, 
  ];
  



/* GET home page. */
router.get("/", function (req, res, next) { 
  res.redirect(302, "products"); 
  }); 
  
  /* GET products listing page. */ 
router.get("/products", function (req, res, next) { 
  res.render("products", { 
  title: "Product Listing", 
  products: products, 
  description: "This page shows a list of products.", 
  }); 
  }); 
  /* GET product page. */ 
  router.get("/products/:id", function (req, res, next) {
   
      // Fill in the code: get the parameter 
      var requestedId = req.params["id"]; 
      // Get the requested product from the product list 
      var requestedProduct = products.filter(function (product) { 
      return product.id == requestedId; 
      }); 
       
      if (requestedProduct.length > 0) {  
  res.render("product", { 
  title: "Product Page", 
  products:products,
  manufacturers: manufacturers,
  product: requestedProduct[0], 
  description: "This page shows the details of a product", 
  }); 
} else { 
  // 404 Product not found 
  res.status(404).send("Product not found"); 
  } 
  
});
  

  /* GET manufacturer listing page. */ 
  router.get("/manufacturers", function (req, res, next) { 
  res.render("manufacturers", { 
  title: "Manufacturer Page", 
  products:products,
  manufacturers: manufacturers,
  description: "This page shows a list of manufacturers." 
  }); 
  }); 
  /* GET manufacturer page. */ 
  router.get("/manufacturers/:id", function (req, res, next) { 

    var requestedId = req.params["id"]; 
    // Get the requested product from the product list 
    var requestedProducts = products.filter(function (product) { 
    return product.manufacturerId == requestedId; 
    }); 
    
  res.render("products", { 
  title: "Manufacturer Page", 
  products: requestedProducts,
  description: "This page shows a list of products from this manufacturer.", }); 
  }); 
  
module.exports = router;
