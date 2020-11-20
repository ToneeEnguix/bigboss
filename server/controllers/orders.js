const orders = require("../schemas/orders.js");
const users = require("../schemas/users");
const competitions = require("../schemas/competitions")
const jwt = require("jsonwebtoken");
const config = require("../token/trustPaymentsConfig.js");

class OrdersController {


  async create(req, res) {
    try {
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async read(req, res) {
    const user = req.query.user;

    try {
      const userOrders = await orders.find({ user: user });

      res.status(200).send(userOrders);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async update(req, res) { }
  async delete(req, res) { }

  async all(req, res) {
    try {
      const allOrders = await orders
        .find({})
        .populate("user")
        .populate("productsBought.product");
      res.status(200).send(allOrders);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async receive(req, res) {

    let info = undefined;
    let cart = undefined;

 

    try {

      jwt.verify(req.body.cart, config.key, async (err, decoded) => {


        cart = decoded;

   

      });

      jwt.verify(req.body.jwt, config.key, async (err, decoded) => {


        info = decoded;

      });

      if (info.payload.response[0].settlestatus === "0") {

        const currentOrders = await orders.countDocuments({});

        const order = {

          orderNumber: currentOrders + 1,
          user: cart.cart.user,
          amount: Number(info.payload.response[0].baseamount) / 100,
          productsBought: cart.cart,
          transactionReference: info.payload.response[0].transactionreference,
          paymentStatus:"Successful",
          orderDate:Date.now()
        }

        const result = await orders.create(order);

        }
        res.redirect("http://localhost:3000/bye");
      }
    catch (error) {

      console.log(error)
      res.status(500).send()
    }

  }


  async getUserOrders(req, res) {
    const userId = req.params.id;
    const skip = Number(req.params.skip);


    try {
      let number = await orders.countDocuments({ user: userId });
      const allOrders = await orders.find({ user: userId }).skip(skip).limit(5);

      const pages = Math.ceil(number / 5);
      res.status(200).send({ orders: allOrders, total: number, pages: pages });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getCompetitionOrders(req, res) {
    const competitionId = req.params.competitionId;
    try {
      let competitionDetails = await orders
        .find({
          "productsBought.product": competitionId,
        })
        .populate("user")
        .populate("productsBought.product");
      res.status(200).send(competitionDetails);
    } catch (err) {

      res.status(500).send(err);
    }
  }
}

module.exports = new OrdersController();
