const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM "profiles" WHERE user_id=$1;`, [req.user.id])
    .then((result) => {
      res.send(result.rows);
      console.log(req.user.id);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

module.exports = router;
