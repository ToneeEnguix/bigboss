const orders = require("../schemas/orders.js");
const users = require("../schemas/users");
const competitions = require("../schemas/competitions");
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
      console.error(error);
      res.status(500).send(error);
    }
  }

  async update(req, res) {}
  async delete(req, res) {}

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
        let cleanCart = [];
        cart.cart.cart.forEach((cartElement) => {
          const product = cartElement.competition._id;
          const amount = cartElement.amount;
          cleanCart.push({ product, amount });
        });

        const currentOrders = await orders.countDocuments({});

        const order = {
          orderNumber: currentOrders + 1,
          user: cart.cart.user,
          amount: Number(info.payload.response[0].baseamount) / 100,
          productsBought: cleanCart,
          transactionReference: info.payload.response[0].transactionreference,
          paymentStatus: "Successful",
          orderDate: Date.now(),
        };
        const result = await orders.create(order);
        console.log(result);
      }
      res.redirect("https://bigbosscompetitions.com/bye");
    } catch (error) {
      res.status(500).send();
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
        .populate("user");

      let entriesForCompetition = [];
      competitionDetails.forEach((competition) => {
        const userName = competition.user.name;
        const email = competition.user.email;
        const id = competition.user._id;
        const dateofPurchase = competition.orderDate;
        let ticketsBought = 0;

        competition.productsBought.forEach((boughtProduct) => {
          if (boughtProduct.product.toString() === competitionId) {
            ticketsBought = ticketsBought + boughtProduct.amount;
          }
        });

        entriesForCompetition.push({
          userName,
          email,
          id,
          ticketsBought,
          dateofPurchase,
        });
      });
      res.status(200).send(entriesForCompetition);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new OrdersController();
