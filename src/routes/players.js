const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

router.post("/", async (req, res) => {
  try {
    const player = await Player.create({
      name: req.body.name,
    });

    res.json(player);
  } catch (error) {
      res.send(error);
  }
});

// router.post('/', (req, res) => {
//     Player.create({
//         name: req.body.name
//     }).then(player => {
//         res.json(player);
//     }).catch(error => {
//         res.send(error);
//     })
// });

module.exports = router;
