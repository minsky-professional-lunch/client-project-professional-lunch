const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(`SELECT * FROM "profiles" WHERE user_id=$1;`, [req.user.id])
    .then((result) => {
      if (result.rows.length > 0) {
        res.send(true);
      } else if (result.rows.length === 0) {
        res.send(false);
      }
      // res.send(result.rows);
      console.log(req.user.id);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

module.exports = router;
