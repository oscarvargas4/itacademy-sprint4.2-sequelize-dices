const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

router.get("/", async (req, res) => {
  try {
    const players = await Player.findAll();
    res.send(players);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    try {
      const anonim = await Player.create({
        name: "ANONIM",
      });

      res.status(201).send(anonim);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      const player = await Player.create({
        name: req.body.name,
      });

      res.status(201).json(player);
    } catch (error) {
      if (error.errors[0].message) {
        res.status(400).send(error.errors[0].message);
      } else {
        res.status(400).send(error);
      }
    }
  }
});

router.put("/", async (req, res) => {
  if (req.body.name && req.body.newName) {
    try {
      const player = await Player.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (player === null) {
        res.status(404).send("User not found");
      } else {
        await player.update({ name: req.body.newName });
        res.status(200).send(player);
      }
    } catch (error) {
      if (error.errors[0].message) {
        res.status(400).send(error.errors[0].message);
      } else {
        res.status(400).send(error);
      }
    }
  } else {
    res
      .status(400)
      .send("You must indicate an username & the new username for update");
  }
});

module.exports = router;
