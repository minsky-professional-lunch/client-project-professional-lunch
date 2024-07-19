import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import resources from './resources.reducer';
import profiles from './profiles.reducer';
import profileDetails from './profileDetails.reducer';
import registrationReducer from './registration.reducer';
import mentorships from './mentorship.reducer';
import mentorshipDetails from './mentorshipDetails.reducer';
import gendersReducer from './genders.reducer';
import schoolsReducer from './schools.reducer';
import interestsReducer from './interests.reducer';
import meetings from './meetings.reducer';
import dayReducer from "./day.reducer";
import timeReducer from "./time.reducer";
import profileCheck from './profile.check.reducer';
import adminProfiles from './adminProfiles.reducer';
import menteeSearchProfiles from './menteesearch.reducer';
import mentDetails from './mentDetails.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  resources,
  profiles,
  profileDetails,
  registrationReducer,
  mentorships,
  mentorshipDetails,
  gendersReducer,
  schoolsReducer,
  interestsReducer,
  meetings,
  dayReducer,
  timeReducer,
  profileCheck,
  adminProfiles,
  menteeSearchProfiles,
  mentDetails
});

export default rootReducer;
