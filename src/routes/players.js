const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Game = require('../models/Game');
const { request } = require("express");

router.get("/", async (req, res) => {
  try {
    const players = await Player.findAll();
    res.send(players);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:id/games', async (req, res) => {
  try {
    const games = await Game.findAll({ where: { PlayerId: req.params.id }});
    let average = 0;
    for (let i = 0; i <= games.length; i++) {
      average += games[i];
    }
    average = average / average.length;

    // ! res.status(200).send(JSON.parse(games[0]));
  } catch (error) {
    res.status(404).send(error);
  }
})

router.post("/", async (req, res) => {
  if (!req.body.name || req.body.name == "ANONIM") {
    try {
      const anonim = await Player.create({
        name: "ANONIM",
      });

      res.status(201).send(anonim);
    } catch (error) {
      res.status(400).send(error);
    }
  } else if (req.body.name) {
    try {
      const player = await Player.findOne({ where: { name: req.body.name }});
      if (player) {
        res.status(400).send("User already exists");
      } else {
        const player = await Player.create({
          name: req.body.name,
        });

        res.status(200).json(player);
      }
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

router.post('/:id/games', async (req, res) => {
  try {
    const dices = Math.random() * (12 - 2) + 2;
    const game = await Game.create({
      gameResult: Math.round(dices),
      PlayerId: req.params.id
    });
    res.status(200).send(game);
  } catch (error) {
    if (error.name == "SequelizeForeignKeyConstraintError") {
      res.status(400).send("User id not found");
    } else {
      res.status(400).send(error);
    }
    
  }
});

module.exports = router;
