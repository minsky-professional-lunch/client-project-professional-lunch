import axios from "axios";
import { put, take, takeLatest } from "redux-saga/effects";

function* checkforProfile() {
  try {
    const result = yield axios.get("/api/check");
    yield put({ type: "SET_PROFILE_CHECK_RESULT", payload: result.data });
  } catch (error) {
    console.log("error in checking for profile", error);
  }
}
function* profileCheckSaga() {
  yield takeLatest("CHECK_FOR_PROFILE", checkforProfile);
}

export default profileCheckSaga;
