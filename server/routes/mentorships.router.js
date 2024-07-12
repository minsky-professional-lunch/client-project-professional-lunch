const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "mentorships" WHERE mentee_id=$1 OR mentor_id=$1;`,
      [req.user.id]
    );
    res.send(result.rows);
  } catch (error) {
    console.log('error in getting mentorship', error);
    res.sendStatus(500);
  }
});

// POST route
router.post('/:id', rejectUnauthenticated, async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO "mentorships" (mentee_id, mentor_id) VALUES ($1, $2);`,
      [req.user.id, req.params.id]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log('error in requesting a mentorship', error);
    res.sendStatus(500);
  }
});

// PUT route for updating a mentorship to approved
router.put('/:id', rejectUnauthenticated, async (req, res) => {
  try {
    await pool.query(
      `UPDATE "mentorships" SET status='accepted' WHERE mentor_id=$1 AND mentorships.id=$2;`,
      [req.user.id, req.params.id]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log('error in accepting this mentorship', error);
    res.sendStatus(500);
  }
});

// DELETE route for terminating a mentorship
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  if (req.user.isMentor === true) {
    queryText = `DELETE FROM "mentorships" WHERE mentor_id=$1 AND mentorships.id=$2;`;
  } else {
    queryText = `DELETE FROM "mentorships" WHERE mentee_id=$1 AND mentorships.id=$2;`;
  }
  try {
    await pool.query(queryText, [req.user.id, req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log('error in terminating mentorship', error);
    res.sendStatus(500);
  }
});

module.exports = router;
