var express = require("express");
var connection = require("../database");
var router = express.Router();
var { body, validationResult } = require("express-validator");
const { response } = require("express");
let products = [];
/* GET products listing page. */
router.get("/products", function (req, res, next) {
  var promise = connection.raw(`select * from product;`);
  promise
    .then(function (result) {
      var products = result[0];
      console.log(products);
      res.json({
        products: products,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});
/* GET product page. */
router.get("/products/:id", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  var promise = connection.raw(`select * from product where id = ?`, [
    requestedId,
  ]);
  promise
    .then(function (result) {
      var products = result[0];
      res.json(products[0]);
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

/* GET manufacturers listing page. */
router.get("/manufacturers", function (req, res, next) {
  var promise = connection.raw(`select * from manufacturer;`);
  promise
    .then(function (result) {
      var manufacturers = result[0];
      console.log(manufacturers);
      res.json({
        manufacturers: manufacturers,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});
/* GET manufacturer page. */
router.get("/manufacturers/:id", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  var promise = connection.raw(
    "select * from product where manufacturer_id= ?",
    [requestedId]
  );

  promise
    .then(function (result) {
      var manufacturers = result[0];
      res.json(manufacturers[0]);
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

/* Post a product */
router.post(
  "/products/",
  body("name").not().isEmpty(),
  body("price").not().isEmpty(),
  body("description").not().isEmpty(),
  body("image").not().isEmpty(),
  function (req, res, next) {
    console.log("POST Request", req.body);
    // Extract the validation result
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      res.render("product-create-form", {});
    } else {
      // SQL
      var promise = connection.raw(
        ` 
  insert into product (name, price, description, image) values (?, ?, ?, ?) 
  `,
        [
          req.body["name"],
          req.body["price"],
          req.body["description"],
          req.body["image"],
        ]
      );
      promise
        .then(function (result) {
          console.log("SQL insertion result", result);
          // Redirect to products
          res.json(201, req.body);
        })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.json(400, error);
        });
    }
  }
);

/* Post a manufacturer */
router.post(
  "/manufacturers/",
  body("name").not().isEmpty(),
  body("description").not().isEmpty(),
  body("image").not().isEmpty(),
  function (req, res, next) {
    console.log("POST Request", req.body);
    // Extract the validation result
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      res.render("manufacturer-create-form", {});
    } else {
      // SQL
      var promise = connection.raw(
        ` 
  insert into manufacturer (name, description, image) values (?, ?, ?) 
  `,
        [req.body["name"], req.body["description"], req.body["image"]]
      );
      promise
        .then(function (result) {
          console.log("SQL insertion result", result);
          // Redirect to products
          res.json(201, req.body);
        })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.json(400, error);
        });
    }
  }
);

// UPDATE product
router.put("/products/:id", function(req,res){
  var params= req.body;
  var name = params.name;
  var price = params.price;
  var description = params.description;
  var image = params.image;
  var id = params.id;
var promise=
  connection.raw("Update product SET name=?, price=?, description=?, image=? WHERE id=?",[name,price,description,image,id]);
    promise
        .then(function (result) {
          console.log("SQL update result", result);
          // Redirect to products
          res.json(201, req.body);
         
        })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.json(400, error);
        });
});

// UPDATE manufacturer
router.put("/manufacturers/:id", function(req,res){
  var params= req.body;
  var name = params.name;
  var description = params.description;
  var image = params.image;
  var id = params.id;
var promise=
  connection.raw("Update manufacturer SET name=?, description=?, image=? WHERE id=?",[name,description,image,id]);
    promise
        .then(function (result) {
          console.log("SQL update result", result);
          // Redirect to products
          res.json(201, req.body);
         
        })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.json(400, error);
        });
});

// DELETE product
router.delete("/products/:id", function (req, res, next) {
 
  var id = req.body.id;
  var promise = connection.raw("delete from product where id=?", [
    id,
  ]);
  promise
  .then(function (result) {
    console.log("SQL deletion result", result);
    // Redirect to products
    res.json(201, req.body);
    
  })
  .catch(function (error) {
    console.log("SQL errors:", error);
    res.json(400, error);
  });
});

// DELETE manufacturer
router.delete("/manufacturers/:id", function (req, res, next) {
 
  var id = req.body.id;
  var promise = connection.raw("delete from manufacturer where id=?", [
    id,
  ]);
  promise
  .then(function (result) {
    console.log("SQL deletion result", result);
    // Redirect to products
    res.json(201, req.body);
    
  })
  .catch(function (error) {
    console.log("SQL errors:", error);
    res.json(400, error);
  });
});

module.exports = router;
