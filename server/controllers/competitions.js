const competitions = require("../schemas/competitions.js");

class CompetitionController {
  async create(req, res) {
    try {
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async randomPicks(req, res) {
    try {
      const totalItems = await competitions.count({
        dateFinishes: { $gte: Date.now() },
      });
      const selectedItems = new Set();
      if (totalItems > 3) {
        while (selectedItems.size < 3) {
          var random = Math.floor(Math.random() * totalItems);
          let newItem = await competitions.findOne().skip(random);
          selectedItems.add(newItem);
        }
      } else {
        let allCompetitions = await competitions.find({
          dateFinishes: { $gte: Date.now() },
        });
        selectedItems.add(allCompetitions);
      }

      res.status(200).send(...selectedItems);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async read(req, res) {
    const competitionID = req.params.id;

    try {
      const foundCompetition = await competitions.findById(competitionID);

      if (foundCompetition) {
        res.status(200).send(foundCompetition);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      y;
      res.status(500).send(error);
    }
  }

  async update(req, res) {
    try {
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    try {
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async all(req, res) {
    try {
      const allCompetitions = await competitions.find();
      res.status(200).send(allCompetitions);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async active(req, res) {
    try {
      const allCompetitions = await competitions.find({
        dateFinishes: { $gte: Date.now() },
      });

      res.status(200).send(allCompetitions);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async past(req, res) {
    try {
      const allCompetitions = await competitions.find({
        dateFinishes: { $lte: Date.now() },
      });

      res.status(200).send(allCompetitions);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async finished(req, res) {
    try {
      const allCompetitions = await competitions
        .find({ winner: { $ne: null } })
        .sort({ dateFinishes: -1 })
        .populate("winner");

      res.status(200).send(allCompetitions);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async recentWinners(req, res) {
    try {
      const allCompetitions = await competitions
        .find({ winner: { $ne: null } })
        .sort({ dateFinishes: -1 })
        .populate("winner")
        .limit(3);

      res.status(200).send(allCompetitions);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async nextDraw(req, res) {
    try {
      const lastCompetition = await competitions
        .find({ dateFinishes: { $gte: Date.now() } })
        .sort({ dateFinishes: 1 })
        .limit(1);

      res.status(200).send(lastCompetition);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async withEntries(req, res) {
    try {
      const allCompetitions = await competitions
        .find({ entriesURL: { $ne: null } })
        .sort({ dateFinishes: -1 });

      res.status(200).send(allCompetitions);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
module.exports = new CompetitionController();
