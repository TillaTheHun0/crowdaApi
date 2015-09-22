var customer = require("./customerModel");
var router = require("express").Router();

function getCustomers(req, res) {
  customer.findAll(function (error, customers) {
    if (error) {
      console.log(error, "error finding customers");
      res.status(500).send(error);
      return;
    }
    res.json(customers);
  });
}

function createCustomer(req, res) {
  res.status(201).send();
}

router.post("/customers", createCustomer);
router.get("/customers", getCustomers);

module.exports = router;
