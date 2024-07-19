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
                  `SELECT 
                mentorships.id, 
                mentorships.mentee_id AS mentee_id, 
                mentorships.mentor_id AS mentor_id, 
                mentorships.status, 
                mentor.first_name AS mentor_first_name, 
                mentor.last_name AS mentor_last_name, 
                mentor.email AS mentor_email, 
                mentor.gender AS mentor_gender, 
                mentor.bio AS mentor_bio, 
                mentor.linkedin AS mentor_linkedin, 
                mentor.calendar_link AS mentor_calendar_link, 
                mentor.avatar AS mentor_avatar, 
                mentee.first_name AS mentee_first_name, 
                mentee.last_name AS mentee_last_name, 
                mentee.email AS mentee_email, 
                mentee.bio AS mentee_bio, 
                mentee.linkedin AS mentee_linkedin, 
                mentee.school AS mentee_school, 
                mentee.calendar_link AS mentee_calendar_link, 
                mentee.avatar AS mentee_avatar,
                mentee_user.id AS mentee_user_id,
                mentor_user.id AS mentor_user_id
            FROM 
                mentorships 
            JOIN 
                profiles AS mentee ON mentorships.mentee_id = mentee.id
            JOIN 
                profiles AS mentor ON mentorships.mentor_id = mentor.id
            JOIN 
                "user" AS mentee_user ON mentee.user_id = mentee_user.id
            JOIN 
                "user" AS mentor_user ON mentor.user_id = mentor_user.id
            WHERE 
                mentee_user.id = $1 OR mentor_user.id = $1;`,
      [req.user.id]
    );
    res.send(result.rows);
  } catch (error) {
    console.log('error in getting mentorship', error);
    res.sendStatus(500);
  }
});

router.get('/all', rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT mentorships.id, mentorships.mentee_id AS mentee_id, mentorships.mentor_id AS mentor_id, mentorships.status, mentor.first_name AS mentor_first_name, 
        mentor.last_name AS mentor_last_name, mentor.email AS mentor_email, mentor.gender AS mentor_gender, mentor.bio AS mentor_bio, mentor.linkedin AS mentor_linkedin, 
        mentor.calendar_link AS mentor_calendar_link, mentor.avatar AS mentor_avatar, mentee.first_name AS mentee_first_name, mentee.last_name AS mentee_last_name, 
        mentee.email AS mentee_email, mentee.bio AS mentee_bio, mentee.linkedin AS mentee_linkedin, mentee.school AS mentee_school, mentee.calendar_link AS mentee_calendar_link, mentee.avatar AS mentee_avatar,
        genders.gender, schools.school
        FROM "mentorships" 
        JOIN profiles AS mentee ON mentorships.mentee_id = mentee.id
        JOIN profiles AS mentor ON mentorships.mentor_id = mentor.id
        JOIN genders on genders.id=mentee.gender
		JOIN schools on schools.id=mentee.school;`
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
      [req.body.menteeId, req.params.id]
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
      `UPDATE "mentorships" SET status='accepted' WHERE mentorships.id=$1;`,
      [req.body.mentorshipId]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log('error in accepting this mentorship', error);
    res.sendStatus(500);
  }
});

// DELETE route for terminating a mentorship
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    queryText = `DELETE FROM "mentorships" WHERE mentorships.id=$1;`;
  try {
    await pool.query(queryText, [req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log('error in terminating mentorship', error);
    res.sendStatus(500);
  }
});

module.exports = router;
