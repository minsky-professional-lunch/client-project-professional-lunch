import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });

    // passes the username and password from the payload to the server
    yield axios.post("/api/user/register", action.payload);

    // automatically log a user in after registration
    yield put({ type: "LOGIN", payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: "SET_TO_LOGIN_MODE" });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* registerProfile(action) {
  try {
    yield axios.post("/api/profile", {
      first_name: action.payload.first_name,
      last_name: action.payload.last_name,
      email: action.payload.email,
      gender: action.payload.gender,
      school: action.payload.school,
      bio: action.payload.bio,
      linkedin: action.payload.linkedin

    });
  } catch (error) {
    console.log('error in registering profile', error)
  }
}

function* fetchDayAvailability() {
  try {
    const response = yield axios.get("/api/availability/days");
    yield put({ type: "SET_DAYS", payload: response.data });
    yield put({ type: "FETCH_TIMES" });
  } catch (error) {
    console.log("error in fetching days");
  }
}

function* fetchTimeAvailability() {
  try {
    const response = yield axios.get("/api/availability/times");
    yield put({ type: "SET_TIMES", payload: response.data });
  } catch (error) {
    console.log("error in fetching times");
  }
}

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
  yield takeLatest("FETCH_DAYS", fetchDayAvailability);
  yield takeLatest("FETCH_TIMES", fetchTimeAvailability);
  yield takeLatest("REGISTER_PROFILE", registerProfile)
}

export default registrationSaga;
