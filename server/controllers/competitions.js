const competitions = require("../schemas/competitions.js"),
  cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "big-boss-competitions",
  api_key: "775334544597853",
  api_secret: "4K-yJpKviBSrMeVllihf7cmuF2U",
});

class CompetitionController {
  async create(req, res) {
    let { competition } = req.body;
    try {
      competition.entriesDate = new Date(competition.entriesDate);
      competition.dateFinishes = new Date(competition.dateFinishes);
      competition.maxTickets = parseInt(competition.maxTickets);
      console.log(competition);
      await competitions.create(competition);
      console.log("lemon");
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async randomPicks(req, res) {
    try {
      const totalItems = await competitions.countDocuments({
        dateFinishes: { $gte: Date.now() },
      });
      const selectedItems = new Set();
      if (totalItems > 3) {
        while (selectedItems.size < 3) {
          var random = Math.floor(Math.random() * totalItems);
          let newItem = await competitions
            .find({ dateFinishes: { $gte: Date.now() } })
            .skip(random);
          selectedItems.add(newItem[0]);
        }
        res.status(200).send([...selectedItems]);
      } else {
        let allCompetitions = await competitions.find({
          dateFinishes: { $gte: Date.now() },
        });
        res.status(200).send(allCompetitions);
      }
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
    let { competition } = req.body;
    competition.pictures[competition.pictures.length - 1] === "" &&
      competition.pictures.pop();
    try {
      let found = await competitions.findOne({ _id: competition._id });
      found.title = competition.title;
      found.description = competition.description;
      found.pictures.map(async (item, idx) => {
        if (competition.pictures[idx] !== item) {
          let url = item;
          let slashArr = [];
          let dotArr = [];
          while (url.includes("/")) {
            let idx = url.indexOf("/");
            slashArr.push(idx);
            url = url.slice(0, idx) + url.slice(idx + 1);
          }
          while (url.includes(".")) {
            let idx = url.indexOf(".");
            dotArr.push(idx);
            url = url.slice(0, idx) + url.slice(idx + 1);
          }
          let public_id = url.slice(
            slashArr[slashArr.length - 1] - dotArr.length + 1,
            dotArr[dotArr.length - 1]
          );
          await cloudinary.v2.api.delete_resources([public_id]);
        }
      });
      found.pictures = competition.pictures;
      found.ticketPrice = competition.ticketPrice;
      found.prize = competition.prize;
      found.winnerPic = competition.winnerPic;
      found.facebookURL = competition.facebookURL;
      found.entriesURL = competition.entriesURL;
      found.__v = competition.__v;
      found.ticketsSold = competition.ticketsSold;
      found.entriesDate = new Date(competition.entriesDate);
      found.dateFinishes = new Date(competition.dateFinishes);
      found.maxTickets = parseInt(competition.maxTickets);
      found.winner = mongoose.Types.ObjectId(competition.winner);
      found._id = mongoose.Types.ObjectId(competition._id);
      await found.save();
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    let { competition } = req.body;
    try {
      await competitions.deleteOne({ _id: competition._id });
      res.status(200).send({ ok: true });
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
      const allCompetitions = await competitions
        .find({
          dateFinishes: { $lte: Date.now() },
        })
        .populate("winner");
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
      console.log(allCompetitions);
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

  async updateWinnerImg(req, res) {
    let { competition } = req.body;
    try {
      let found = await competitions.findOne({ _id: competition._id });
      if (competition.winnerPic === "") {
        let url = found.winnerPic;
        let slashArr = [];
        let dotArr = [];
        while (url.includes("/")) {
          let idx = url.indexOf("/");
          slashArr.push(idx);
          url = url.slice(0, idx) + url.slice(idx + 1);
        }
        while (url.includes(".")) {
          let idx = url.indexOf(".");
          dotArr.push(idx);
          url = url.slice(0, idx) + url.slice(idx + 1);
        }
        let public_id = url.slice(
          slashArr[slashArr.length - 1] - dotArr.length + 1,
          dotArr[dotArr.length - 1]
        );
        await cloudinary.v2.api.delete_resources([public_id]);
        console.log("lemon2");
      }
      found.winnerPic = competition.winnerPic;
      await found.save();
      res.status(200).send({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async updateWinner(req, res) {
    let { competition } = req.body;
    try {
      let found = await competitions.findOne({ _id: competition._id });
      if (competition.winner.email === "") {
        found.winner = null;
      } else {
        found.winner = mongoose.Types.ObjectId(competition.winner._id);
      }
      console.log(found);
      await found.save();
      res.status(200).send({ ok: true });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
module.exports = new CompetitionController();
