const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for list of days
router.get('/days', (req, res) => {
    const queryText = `SELECT * FROM days`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
    });
});

// GET route for list of times
router.get('/times', (req, res) => {
    const queryText = `SELECT * FROM times`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
    });
});

// GET route for availability of logged in user
router.get('/:id', (req, res) => {
  const queryText = `SELECT profiles_availability.profile_id, availability."day", availability."time", profiles_availability.id FROM availability
	                    JOIN profiles_availability ON availability.id=profiles_availability.availability_id
	                    WHERE profiles_availability.profile_id=$1;`;
    pool.query(queryText, [req.params.id])
        .then(result => {
        res.send(result.rows);
        })
        .catch(err => {
        console.log('ERROR: Getting interests', err);
        res.sendStatus(500)
    })
});

// GET route for availability of clicked on profile
router.get('/profile/:id', (req, res) => {
    const queryText = `SELECT profiles_interests.profile_id, interests.interest, profiles_interests.id FROM interests 
                          JOIN profiles_interests ON interests.id=profiles_interests.interest_id
                          WHERE profiles_interests.profile_id=$1;`;
      pool.query(queryText, [req.params.id])
          .then(result => {
          res.send(result.rows);
          })
          .catch(err => {
          console.log('ERROR: Getting interests', err);
          res.sendStatus(500)
      })
  });

module.exports = router;