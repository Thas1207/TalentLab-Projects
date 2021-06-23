var express = require("express");
var connection = require("../database");
const { body, validationResult } = require("express-validator");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect(302, "products");
});
/* GET products listing page. */
router.get("/products", function (req, res, next) {
  var promise = connection.raw(`select * from product;`);
  promise
    .then(function (result) {
      var products = result[0];
      res.render("products", {
        title: "Product Listing",
        description: "This page shows a list of products.",
        products: products,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

/* GET products create form */
router.get("/products/create-form", function (req, res, next) {
  res.render("product-create-form", {
    title: "Product Create Form",
    description: "This page shows a form to create a product.",
  });
});

router.post(
  "/products/create-form",
  body("name").not().isEmpty(),
  body("price").not().isEmpty(),
  body("description").not().isEmpty(),
  body("image").not().isEmpty(),
  body("manufacturer_id").not().isEmpty(),

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
  insert into product (name, price,description,image,manufacturer_id)
  values (?, ?, ?, ?, ?)
 `,
        [
          req.body["name"],
          req.body["price"],
          req.body["description"],
          req.body["image"],
          req.body["manufacturer_id"],
        ]
      );

      promise
        .then(function (result) {
          console.log("SQL insertion result", result);
          // Redirect to products
          res.redirect(302, "/products");
        })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.render("product-create-form", {});
        });
    }
  }
);

/* GET products update form */
router.get("/products/:id/update-form", function (req, res, next) {
  var requestedId = req.params["id"]; // Update this line
  var promise = connection.raw("select * from product where id = ?", [
    requestedId,
  ]);
  promise
    .then(function (result) {
      var products = result[0];
      console.log(products);
      res.render("product-update-form", {
        title: "Product Update Form",
        description: "This page shows the update form of a product",
        product: products[0],
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

router.post(
  "/products/update-form",
  body("name").not().isEmpty(),
  body("price").not().isEmpty(),
  body("description").not().isEmpty(),
  body("image").not().isEmpty(),

  function (req, res, next) {
    // var requestedId = req.params["id"];
    console.log("POST Request", req.body);
    // Extract the validation result
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
        res.render("product-update-form", {});
     
    } else {
      // SQL
      console.log(req.body);
      var promise = connection.raw(
        "update product set name = ?, price = ?, description = ?, image = ?, where id = ?;",
        [
          req.body["name"],
          req.body["price"],
          req.body["description"],
          req.body["image"],

          req.params["id"],
        ]
      );

      promise
        .then(function (result) {
          console.log("SQL update result", result);
          // Redirect to products
          res.redirect(302, "/products");
        })
        .catch(function (error) {
          
          console.log("SQL errors:", error);
          res.render("product-update-form", {});
        });
    }
  }
);

/* GET products delete form */
router.get("/products/:id/delete-form", function (req, res, next) {
  res.render("product-delete-form", { id: req.params["id"] });
});

router.post("/products/:id/delete-form", function (req, res, next) {
  var requestedId = req.params["id"];
  var promise = connection.raw("delete from product where id=?", [requestedId]);
  promise
    .then(function (result) {
      console.log("SQL delete result", result);
      // Done: Redirect to products
      res.redirect(302, "/products");
    })
    .catch(function (error) {
      // Failed: Stay in this form
      console.log("SQL errors:", error);
      res.render("product-delete-form", {});
    });
});

/* GET manufacturer listing page. */
router.get("/manufacturers", function (req, res, next) {
  var promise = connection.raw("select * from manufacturer;");
  promise
    .then(function (result) {
      var manufacturers = result[0];
      res.render("manufacturers", {
        title: "Manufacturer page",
        description: "This page shows a list of manufacturers.",
        manufacturers: manufacturers,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});
/* GET manufacturer create form */
router.get("/manufacturers/create-form", function (req, res, next) {
  res.render("manufacturer-create-form", {
    title: "Manufacturer Create Form",
    description: "This page shows a form to create a manufacturer.",
  });
});
/* POST manufacturer create form */
router.post(
  "/manufacturers/create-form",
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
  insert into manufacturer (name,description,image)
  values (?, ?, ?)
 `,
        [req.body["name"], req.body["description"], req.body["image"]]
      );

      promise
        .then(function (result) {
          console.log("SQL insertion result", result);
          // Redirect to manufacturers
          res.redirect(302, "/manufacturers");
        })
        .catch(function (error) {
          console.log("SQL errors:", error);
          res.render("manufacturer-create-form", {});
        });
    }
  }
);
/* GET manufacturer update form */
router.get("/manufacturers/:id/update-form", function (req, res, next) {
  res.render("manufacturer-update-form", {
    title: "Manufacturer Update Form",
    description: "This page shows a form to update a manufacturer.",
  });
});
/* GET manufacturer delete form */
router.get("/manufacturers/:id/delete-form", function (req, res, next) {
  res.render("manufacturer-delete-form", {
    id: req.params["id"],
  });
});

router.post("/manufacturers/:id/delete-form", function (req, res, next) {
  var requestedId = req.params["id"];
  var promise = connection.raw("delete from manufacturer where id=?", [
    requestedId,
  ]);
  promise
    .then(function (result) {
      console.log("SQL delete result", result);
      // Done: Redirect to manufacturers
      res.redirect(302, "/manufacturers");
    })
    .catch(function (error) {
      // Failed: Stay in this form
      console.log("SQL errors:", error);
      res.render("manufacturer-delete-form", {});
    });
});

router.get("/manufacturers/:id/details", function (req, res, next) {
  var requestedId = req.params["id"];
  var promise = connection.raw("select * from manufacturer where id= ?", [
    requestedId,
  ]);
  promise
    .then(function (result) {
      var manufacturers = result[0];
      console.log(manufacturers);
      res.render("manufacturer", {
        title: "Manufacturer Page",
        description: "This page shows details of manufacturer.",
        manufacturer: manufacturers[0],
        product: manufacturers[0],
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

/* GET manufacturer page. */
router.get("/manufacturers/:id", function (req, res, next) {
  var requestedId = req.params["id"];
  var promise = connection.raw(
    "select * from product where manufacturer_id= ?",
    [requestedId]
  );
  promise
    .then(function (result) {
      var products = result[0];
      console.log(products);
      res.render("products", {
        title: "Manufacturer Page",
        description:
          "This page shows a list of products from this manufacturer.",
        products:products,
        manufacturer: products[0],
        product: products[0],
       
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
  var promise = connection.raw("select * from product where id = ?", [
    requestedId,
  ]);
  promise
    .then(function (result) {
      var products = result[0];
      console.log(products);
      res.render("product", {
        title: "Product Page",
        description: "This page shows the details of a product",
        product: products[0],
      });
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error");
    });
});

module.exports = router;
