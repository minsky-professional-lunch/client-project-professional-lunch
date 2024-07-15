const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "schools";`;
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
  console.log(`/schools POST route`);
  const queryText = `INSERT INTO "schools" ("school") VALUES ($1);`;
  try {
    await pool.query(queryText, [req.body.school]);
    res.sendStatus(200);
  } catch (error) {
    console.error(`Error in schools post`, error)
    res.sendStatus(500);
  }
})

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`/schools PUT route`);
  const queryText = `UPDATE "schools" SET school=$1 WHERE id=$2;`;
  pool.query(queryText, [req.body.school, req.params.id]).then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log(`Error in PUT`, error);
    res.sendStatus(500);
  })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "schools" WHERE id=$1;`;
  pool.query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log(`Error in DELETE school`, error);
    res.sendStatus(500);
  })
})

module.exports = router;
