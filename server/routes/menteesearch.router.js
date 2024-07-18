const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// Need to figure out how to get the mentors based on req.user.id not profile_id
router.get('/', rejectUnauthenticated, async (req, res) => {
  console.log(`Get mentors based on specific mentees interests`);
  const queryText = `SELECT DISTINCT p2.*, i2.interest, i2.id 
FROM profiles p2
JOIN profiles_interests pi2 ON p2.id = pi2.profile_id
JOIN interests i2 ON pi2.interest_id = i2.id
WHERE p2."isMentor" = true
AND i2.id IN (
    SELECT i.id 
    FROM interests i
    JOIN profiles_interests pi ON i.id = pi.interest_id
    WHERE pi.profile_id = $1
)
ORDER BY p2.id;`;
try {
 const result= await pool.query(queryText, [req.user.id]);
  res.send(result.rows);
} catch (error) {
  console.log(`Error in GET Mentors for specific mentee`, error);
  res.sendStatus(500);
}
})

module.exports = router;