const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    await pool.query(
      `SELECT * FROM "mentorships" WHERE mentee_id=$1 OR mentor_id=$1;`,
      [req.user.id]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log('error in getting mentorship', error);
  }
});

// POST route

router.post('/', rejectUnauthenticated, async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO "mentorships" (mentee_id, mentor_id) VALUES ($1, $2);`,
      [req.user.id, req.body.mentor_id]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log('error in requesting a mentorship', error);
    res.sendStatus(500);
  }
});

// PUT route for updating a mentorship to approved

router.put('/', rejectUnauthenticated, async (req, res) => {
  try {
    await pool.query(
      `UPDATE "mentorships" SET status='accepted' WHERE mentor_id=$1 AND mentee_id=$2;`,
      [req.user.id, req.body.mentee_id]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log('error in accepting this mentorship', error);
    res.sendStatus(500);
  }
});

// DELETE route for terminating a mentorship
router.delete('/', rejectUnauthenticated, async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM "mentorships" WHERE (mentor_id=$1 AND mentee_id=$2) OR (mentee_id=$1 AND mentor_id=$2);`,
      [req.user.id, req.body.otherparty_id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log('error in terminating mentorship', error);
    res.sendStatus(500);
  }
});

module.exports = router;
