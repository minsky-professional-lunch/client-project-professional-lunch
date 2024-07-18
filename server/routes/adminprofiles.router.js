const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, async (req, res) => {
  pool
    .query(`WITH interests_cte AS (
    SELECT
        profiles_interests.profile_id,
        string_agg(DISTINCT interests.interest, ', ') AS interests
    FROM
        profiles_interests
    JOIN
        interests ON profiles_interests.interest_id = interests.id
    GROUP BY
        profiles_interests.profile_id
),
availability_cte AS (
    SELECT
        profiles_availability.profile_id,
        string_agg(DISTINCT CONCAT(days.day, ' ', times.time), ', ') AS availability
    FROM
        profiles_availability
    JOIN
        availability ON profiles_availability.availability_id = availability.id
    JOIN
        days ON availability.day = days.id
    JOIN
        times ON availability.time = times.id
    GROUP BY
        profiles_availability.profile_id
)
SELECT
    profiles.id,
    profiles.user_id,
    profiles.avatar,
    profiles.first_name,
    profiles.last_name,
    profiles.email,
    profiles.linkedin,
    profiles.bio,
    profiles."isMentor",
    genders.gender,
    schools.school,
    interests_cte.interests,
    availability_cte.availability
FROM
    profiles
JOIN
    genders ON genders.id = profiles.gender
LEFT JOIN
    schools ON schools.id = profiles.school
LEFT JOIN
    interests_cte ON profiles.id = interests_cte.profile_id
LEFT JOIN
    availability_cte ON profiles.id = availability_cte.profile_id;`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in getting profiles', error);
    });
});


module.exports = router;