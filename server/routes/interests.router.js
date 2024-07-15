const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET route for list of interests
router.get("/list", (req, res) => {
  const queryText = `SELECT * FROM interests`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// GET route for interests of logged in user
router.get("/:id", (req, res) => {
  const queryText = `SELECT profiles_interests.profile_id, interests.interest, profiles_interests.id FROM interests 
	                    JOIN profiles_interests ON interests.id=profiles_interests.interest_id
	                    WHERE profiles_interests.profile_id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Getting interests", err);
      res.sendStatus(500);
    });
});

router.get("/profile/:id", (req, res) => {
  const queryText = `SELECT profiles_interests.profile_id, interests.interest, profiles_interests.id FROM interests 
                          JOIN profiles_interests ON interests.id=profiles_interests.interest_id
                          WHERE profiles_interests.profile_id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Getting interests", err);
      res.sendStatus(500);
    });
});

module.exports = router;
