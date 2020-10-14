const faqs = require("../schemas/faq.js");


class FaqController {

  async create(req, res) {

    try {


      res.status(200).send()
    }
    catch (error) {

      res.status(500).send(error)
    }
  }

  async read(req, res) {

    

    try {

      
        res.status(200).send(foundcoupon);
      
    }

    catch (error) {

    
        res.status(500).send(error);
    }

}

  async update(req, res) { }
  async delete(req, res) { }


  async all(req, res) {

    try {

      const allfaq = await faqs.find();


      res.status(200).send(allfaq)
    }
    catch (error) {


      res.status(500).send(error)
    }
  }

}

module.exports = new FaqController;