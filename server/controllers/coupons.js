const coupons = require("../schemas/coupons.js");

class CouponsController {
  async create(req, res) {
    try {
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async read(req, res) {
    const code = req.params.coupon;

    try {
      const foundcoupon = await coupons.find({ code: code });

      if (foundcoupon.length > 0) {
        res.status(200).send(foundcoupon);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req, res) {
    
  }

  async delete(req, res) {}

  async all(req, res) {
    try {
      const allOrders = await coupons.find();

      res.status(200).send(allOrders);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new CouponsController();
