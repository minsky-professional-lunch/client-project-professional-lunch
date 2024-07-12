const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// GET mentee's meetings
router.get('/mentee', rejectUnauthenticated, (req, res) => {
  console.log('/meetings/mentee GET route');
  console.log('user', req.user);
  const queryText = `SELECT * FROM "meetings" JOIN "mentorships" ON meetings.mentorship_id=mentorships.id
	                    WHERE mentorships.mentee_id=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in getting profiles', error);
    });
});

// GET mentor's meetings
router.get('/mentor', rejectUnauthenticated, (req, res) => {
  console.log('/meetings/mentor GET route');
  console.log('user', req.user);
  const queryText = `SELECT * FROM "meetings" JOIN "mentorships" ON meetings.mentorship_id=mentorships.id
	                    WHERE mentorships.mentor_id=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in getting profiles', error);
    });
});

// POST
router.post('/:id', rejectUnauthenticated, (req, res) => {
  console.log('/meetings POST route');
  //   const queryText = ``;
});

// PUT
router.put('/:id', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `UPDATE "meetings" SET "date"=$1, "start"=$2, "end"=$3, "link"=$4, "location"=$5, "notes"=$6 
        WHERE meetings.mentorship_id=(SELECT "id" FROM "mentorships" WHERE "mentorships"."mentee_id"=$7 AND "mentorships"."mentor_id"=$8);`,
      [
        req.body.date,
        req.body.start,
        req.body.end,
        req.body.link,
        req.body.location,
        req.body.notes,
        req.user.id,
        req.params.id
      ]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in editing the mentor meeting details', error);
      res.sendStatus(500);
    });
});

// DELETE
router.delete('/', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `DELETE FROM "meetings" WHERE (mentee_id=$1 AND mentor_id=$2) OR (mentor_id=$1 AND mentee_id=$2)`,
      [req.user.id, req.body.otherparty_id]
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in deleting a meeting', error);
      res.sendStatus(500);
    });
});

module.exports = router;
