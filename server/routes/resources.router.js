const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(`/resources GET route`);
  const queryText = `SELECT * from "resources";`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
})

// POST
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log(`/resources POST route`);
    const queryText = `INSERT INTO "resources" ("title", "image", "url", "about", "category", "notes")
                        VALUES ($1, $2, $3, $4, $5, $6);`;
  try {
    await pool.query(queryText, [
    req.body.title, 
    req.body.image, 
    req.body.url, 
    req.body.about, 
    req.body.category, 
    req.body.notes
  ]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})

// PUT
router.put('/:id', async (req, res) => {
    console.log(`/resources PUT route`);
    const queryText = `UPDATE "resources" SET title=$1, image=$2, url=$3, about=$4, category=$5, notes=$6 WHERE id=$7;`;
    await pool.query(queryText, [
      req.body.title, 
      req.body.image, 
      req.body.url, 
      req.body.about, 
      req.body.category, 
      req.body.notes,
      req.params.id
    ]).then(() => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(`Error in put:`, error);
      res.sendStatus(500);
    })
})

// DELETE
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "resources" WHERE id=$1;`;
    pool.query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error in DELETE resourse`, error);
      res.sendStatus(500);
    })
})

module.exports = router;