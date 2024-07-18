// const initialState = {
//     profileExists: false
// }

const profileCheck = (state = false, action) => {
  if (action.type === "SET_PROFILE_CHECK_RESULT") {
    return action.payload;
  }
  if (action.type === "CLEAR_PROFILE_CHECK") {
    return state;
  } else {
    return state;
  }
};

export default profileCheck;
