const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "genders";`;
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
  console.log(`/genders POST route`);
  const queryText = `INSERT INTO "genders" ("gender") VALUES ($1);`;
  try {
    await pool.query(queryText, [req.body.gender]);
    res.sendStatus(200);
  } catch (error) {
    console.error(`Error in genders post`, error);
    res.sendStatus(500);
  }
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`/genders PUT route`);
  const queryText = `UPDATE "genders" SET gender=$1 WHERE id=$2;`;
  pool
    .query(queryText, [req.body.gender, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error in genders PUT`, error);
      res.sendStatus(500);
    });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`/genders DELETE route`);
  const queryText = `DELETE FROM "genders" WHERE id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error in DELETE gender`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
