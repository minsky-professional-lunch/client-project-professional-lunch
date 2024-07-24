const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// GET All Meetings
router.get('/all', rejectUnauthenticated, async (req, res) => {
  console.log('/meetings GET ALL route');
  try {
    const result = await pool.query(
      `SELECT 
                        meetings.id AS meeting_id,
                        meetings.date AS meeting_date,
                        meetings.start AS meeting_start,
                        meetings."end" AS meeting_end,
                        meetings.link AS meeting_link,
                        meetings.location AS meeting_location,
                        meetings.notes AS meeting_notes,
                        meetings.status AS meeting_status,
                        mentee_profile.first_name AS mentee_first_name,
                        mentee_profile.last_name AS mentee_last_name,
                        mentee_profile.email AS mentee_email,
                        mentor_profile.first_name AS mentor_first_name,
                        mentor_profile.last_name AS mentor_last_name,
                        mentor_profile.email AS mentor_email
                    FROM 
                        meetings
                    JOIN 
                        mentorships ON meetings.mentorship_id = mentorships.id
                    JOIN 
                        profiles AS mentee_profile ON mentorships.mentee_id = mentee_profile.id
                    JOIN 
                        profiles AS mentor_profile ON mentorships.mentor_id = mentor_profile.id
                    JOIN 
                        "user" AS mentee_user ON mentee_profile.user_id = mentee_user.id
                    JOIN 
                        "user" AS mentor_user ON mentor_profile.user_id = mentor_user.id
                    ORDER BY meeting_date, meeting_start;`
    );
    res.send(result.rows);
  } catch (error) {
    console.log(`Error in getting all meetings`, error);
    res.sendStatus(500);
  }

})

// GET meetings based on mentor status 
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('/meetings GET route');
  console.log('user', req.user);
  if (req.user.isMentor === false) {
    queryText = `SELECT 
                        meetings.id AS meeting_id,
                        meetings.date AS meeting_date,
                        meetings.start AS meeting_start,
                        meetings."end" AS meeting_end,
                        meetings.link AS meeting_link,
                        meetings.location AS meeting_location,
                        meetings.notes AS meeting_notes,
                        meetings.status AS meeting_status,
                        mentee_profile.first_name AS mentee_first_name,
                        mentee_profile.last_name AS mentee_last_name,
                        mentee_profile.email AS mentee_email,
                        mentor_profile.first_name AS mentor_first_name,
                        mentor_profile.last_name AS mentor_last_name,
                        mentor_profile.email AS mentor_email,
                        mentor_profile.avatar AS mentor_avatar,
                        mentee_profile.avatar AS mentee_avatar
                    FROM 
                        meetings
                    JOIN 
                        mentorships ON meetings.mentorship_id = mentorships.id
                    JOIN 
                        profiles AS mentee_profile ON mentorships.mentee_id = mentee_profile.id
                    JOIN 
                        profiles AS mentor_profile ON mentorships.mentor_id = mentor_profile.id
                    JOIN 
                        "user" AS mentee_user ON mentee_profile.user_id = mentee_user.id
                    JOIN 
                        "user" AS mentor_user ON mentor_profile.user_id = mentor_user.id
                    WHERE 
                        mentee_user.id = $1;`;
  } else {
    queryText = `SELECT 
                        meetings.id AS meeting_id,
                        meetings.date AS meeting_date,
                        meetings.start AS meeting_start,
                        meetings."end" AS meeting_end,
                        meetings.link AS meeting_link,
                        meetings.location AS meeting_location,
                        meetings.notes AS meeting_notes,
                        meetings.status AS meeting_status,
                        mentee_profile.first_name AS mentee_first_name,
                        mentee_profile.last_name AS mentee_last_name,
                        mentee_profile.email AS mentee_email,
                        mentor_profile.first_name AS mentor_first_name,
                        mentor_profile.last_name AS mentor_last_name,
                        mentor_profile.email AS mentor_email,
                        mentor_profile.avatar AS mentor_avatar,
                        mentee_profile.avatar AS mentee_avatar
                    FROM 
                        meetings
                    JOIN 
                        mentorships ON meetings.mentorship_id = mentorships.id
                    JOIN 
                        profiles AS mentee_profile ON mentorships.mentee_id = mentee_profile.id
                    JOIN 
                        profiles AS mentor_profile ON mentorships.mentor_id = mentor_profile.id
                    JOIN 
                        "user" AS mentee_user ON mentee_profile.user_id = mentee_user.id
                    JOIN 
                        "user" AS mentor_user ON mentor_profile.user_id = mentor_user.id
                    WHERE 
                        mentor_user.id = $1;`;
  }
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      console.log('meetings data', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in getting meetings', error);
    });
});

// POST
router.post('/:id', rejectUnauthenticated, (req, res) => {
    console.log('/meetings POST route');
    console.log('req.body', req.body.newMeeting);
    if (req.user.isMentor === false) {
        queryText = `INSERT INTO "meetings" ("mentorship_id", "date", "start", "end", "link", "location", "notes")
	                VALUES ($1, $2, $3, $4, $5, $6, $7);`
    } else {
        queryText = `INSERT INTO "meetings" ("mentorship_id", "date", "start", "end", "link", "location", "notes")
	                VALUES ((SELECT "id" FROM "mentorships" WHERE "mentorships"."mentor_id"=$1 AND "mentorships"."mentee_id"=$2), $3, $4, $5, $6, $7, $8);`
    }
    pool.query(queryText, [
        req.body.newMeeting.mentorship_id,
        req.body.newMeeting.date,
        req.body.newMeeting.start,
        req.body.newMeeting.end,
        req.body.newMeeting.link,
        req.body.newMeeting.location,
        req.body.newMeeting.notes
    ])
    .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log('error in posting meeting', error);
      });
  });

// Accept meeting
router.put('/accept/:id', rejectUnauthenticated, (req, res) => {
  queryText = `UPDATE "meetings" SET "status"='accepted' WHERE "meetings".id=$1;`;
  pool.query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('error accepting meeting', error);
    res.sendStatus(500);
  });
});

// PUT
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('user', req.user);
    if (req.user.isMentor === false) {
        queryText = `UPDATE "meetings" SET "date"=$1, "start"=$2, "end"=$3, "link"=$4, "location"=$5, "notes"=$6 
        WHERE meetings.mentorship_id=(SELECT "id" FROM "mentorships" WHERE "mentorships"."mentee_id"=$7 AND "mentorships"."mentor_id"=$8);`
    } else {
        queryText= `UPDATE "meetings" SET "date"=$1, "start"=$2, "end"=$3, "link"=$4, "location"=$5, "notes"=$6 
        WHERE meetings.mentorship_id=(SELECT "id" FROM "mentorships" WHERE "mentorships"."mentor_id"=$7 AND "mentorships"."mentee_id"=$8);`
    }
    pool.query(
      queryText,
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

// DELETE or deny meeting
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  pool
    .query(
      `DELETE FROM "meetings" WHERE "meetings".id=$1;`,
      [req.params.id]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in deleting meeting', error);
      res.sendStatus(500);
    });
});

module.exports = router;
