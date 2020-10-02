const orders = require("../schemas/orders.js");


class OrdersController {

  async create(req, res) {

  
    try {


      res.status(200).send()
    }
    catch (error) {

      res.status(500).send(error)
    }
  }

  async read(req, res) {

    const user = req.query.user;

    try {

      const userOrders = await orders.find({ user: user });


      res.status(200).send(userOrders)
    }
    catch (error) {

      console.log(error)
      res.status(500).send(error)
    }

  }

  async update(req, res) { }
  async delete(req, res) { }


  async all(req, res) {

    try {

      const allOrders = await orders.find({});


      res.status(200).send(allOrders)
    }
    catch (error) {


      res.status(500).send(error)
    }
  }

}

module.exports = new OrdersController;