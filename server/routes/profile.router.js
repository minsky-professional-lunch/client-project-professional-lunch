const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all profiles
// Works in Postman
router.get('/', (req, res) => {
  pool
    .query(`SELECT * FROM "profiles"`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in getting profiles', error);
    });
});

// POST new profile
router.post('/', async (req, res) => {
  console.log('/profile POST route');
  try {
    const queryText = `INSERT INTO "profiles" ("user_id", "isMentor", "first_name", "last_name", "email", "gender", "school")
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    await pool.query(queryText, [
      req.body.user_id,
      req.body.isMentor,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.gender,
      req.body.school
    ]);
    const queryText2 = `UPDATE "user" SET "isMentor"=$1 WHERE "user".id=$2;`;
    await pool.query(queryText2, [req.body.isMentor, req.user.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log('Error in post profile', error);
    res.sendStatus(500);
  }
});

// PUT edit profile

// DELETE profile *need to ON DELETE CASCADE mentorships
router.delete('/', async (req, res) => {
  try {
    await pool.query(`DELETE FROM "profiles" WHERE id=$1`, [req.user.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(' error in deleting a profile', error);
    res.sendStatus(500);
  }
});
module.exports = router;
