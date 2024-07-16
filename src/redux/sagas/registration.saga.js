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

function* fetchInterests(action) {
  try {
    const response = yield axios.get("/api/interests/list");
    yield put({ type: "SET_INTERESTS", payload: response.data });
  } catch (error) {
    console.log("error in fetching registration interests");
  }
}

// function* fetchSchools(action) {
//   try {
//     const response = yield axios.get("/api/schools");
//     yield put({ type: "SET_SCHOOLS", payload: response.data });
//     yield put({ type: 'FETCH_GENDERS' })
//   } catch (error) {
//     console.log("error in fetching registration interests");
//   }
// }

// function* fetchGenders(action) {
//   try {
//     const response = yield axios.get("/api/genders");
//     yield put({ type: "SET_GENDERS", payload: response.data });
//   } catch (error) {
//     console.log("error in fetching registration interests");
//   }
// }

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
  yield takeLatest("FETCH_INTERESTS", fetchInterests);
  // yield takeLatest("FETCH_SCHOOLS", fetchSchools);
  // yield takeLatest("FETCH_GENDERS", fetchGenders)
}

export default registrationSaga;
