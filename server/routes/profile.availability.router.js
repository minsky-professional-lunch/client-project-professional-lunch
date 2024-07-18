const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();



router.post("/", async (req, res) => {
  const availabilityInfo = req.body;
  try {
    for (let availability of availabilityInfo) {
      pool.query(
        `INSERT INTO availability (user_id, day, time) VALUES($1, $2, $3);`,
        [req.user.id, Number(availability.day), Number(availability.time)]
      );
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

module.exports = router;
