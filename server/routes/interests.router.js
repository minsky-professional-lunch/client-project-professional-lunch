const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET route for list of interests

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM interests ORDER BY interest;`;
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

router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log(`/interests POST route`);
  const queryText = `INSERT INTO "interests" ("interest") VALUES ($1);`;
  try {
    await pool.query(queryText, [req.body.interest]);
    res.sendStatus(200);
  } catch (error) {
    console.error(`Error in interests POST`, error)
    res.sendStatus(500);
  }
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`Interests PUT route`);
  const queryText = `UPDATE "interests" SET interest=$1 WHERE id=$2;`;
  pool.query(queryText, [req.body.interest, req.params.id])
    .then(() => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in interests PUT`, error);
      res.sendStatus(500);
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "interests" WHERE id=$1;`;
  pool.query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(`Error in DELETE interest`, error);
    res.sendStatus(500);
  })
})

// GET route for interests of logged in user
// router.get("/:id", (req, res) => {
//   const queryText = `SELECT profiles_interests.profile_id, interests.interest, profiles_interests.id FROM interests 
// 	                    JOIN profiles_interests ON interests.id=profiles_interests.interest_id
// 	                    WHERE profiles_interests.profile_id=$1;`;
//   pool
//     .query(queryText, [req.params.id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log("ERROR: Getting interests", err);
//       res.sendStatus(500);
//     });
// });

// router.get("/profile/:id", (req, res) => {
//   const queryText = `SELECT profiles_interests.profile_id, interests.interest, profiles_interests.id FROM interests 
//                           JOIN profiles_interests ON interests.id=profiles_interests.interest_id
//                           WHERE profiles_interests.profile_id=$1;`;
//   pool
//     .query(queryText, [req.params.id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log("ERROR: Getting interests", err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
