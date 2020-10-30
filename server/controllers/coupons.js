const coupons = require("../schemas/coupons.js");

class CouponsController {
  async create(req, res) {
    const coupon = {
      title: "New Title",
      discount: 0,
      expires: Date.now(),
    };
    try {
      await coupons.create(coupon);
      res.status(200).send({ ok: true });
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
    try {
      const { coupon } = req.body;
      const found = await coupons.findOne({ _id: coupon._id });
      found.title = coupon.title;
      found.discount = coupon.discount;
      found.expires = coupon.expires;
      await found.save();
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    const { coupon } = req.body;
    try {
      await coupons.deleteOne({ _id: coupon._id });
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

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
