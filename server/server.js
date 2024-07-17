const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profile.router');
const resourcesRouter = require('./routes/resources.router');
const meetingsRouter = require('./routes/meetings.router');
const mentorshipsRouter = require('./routes/mentorships.router');
const interestsRouter = require('./routes/interests.router');
const availabilityRouter = require('./routes/availability.router');
const genderRouter = require('./routes/gender.router');
const schoolsRouter = require('./routes/schools.router');
const adminProfilesRouter = require('./routes/adminProfiles.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/meetings', meetingsRouter);
app.use('/api/mentorships', mentorshipsRouter);
app.use('/api/interests', interestsRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/genders', genderRouter);
app.use('/api/schools', schoolsRouter);
app.use('/api/adminProfiles', adminProfilesRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
