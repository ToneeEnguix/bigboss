const faqs = require("../schemas/faq.js");

class FaqController {
  async create(req, res) {
    const faq = {
      question: "New Question",
      answer: "New Answer",
    };
    try {
      await faqs.create(faq);
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async read(req, res) {
    try {
      res.status(200).send(foundcoupon);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req, res) {
    try {
      const { faq } = req.body;
      faq.map(async (item) => {
        await faqs.updateOne({ _id: item._id }, item);
      });
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    try {
      const { faq } = req.body;
      await faqs.deleteOne({ _id: faq._id });
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async all(req, res) {
    try {
      const allfaq = await faqs.find({});
      res.status(200).send(allfaq);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new FaqController();
