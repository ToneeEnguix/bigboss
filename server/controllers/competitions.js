const competitions = require("../schemas/competitions.js");


class CompetitionController {


    async create(req, res) {

        try {

            res.status(200).send();
        }

        catch (error) {


            res.status(500).send(error);
        }

    }

    async randomPicks(req, res) {




        try {

            res.status(200).send();
        }

        catch (error) {


            res.status(500).send(error);
        }

    }

    async read(req, res) {




        try {

            res.status(200).send();
        }

        catch (error) {


            res.status(500).send(error);
        }

    }

    async update(req, res) {




        try {

            res.status(200).send();
        }

        catch (error) {


            res.status(500).send(error);
        }

    }

    async delete(req, res) {




        try {

            res.status(200).send();
        }

        catch (error) {


            res.status(500).send(error);
        }

    }

    async all(req, res) {


        try {
            const allCompetitions = await competitions.find({"dateFinishes": {"$gte": Date.now()}})
          

            res.status(200).send(allCompetitions);
        }

        catch (error) {

            console.log(error)
            res.status(500).send(error);
        }

    }

}
module.exports = new CompetitionController;