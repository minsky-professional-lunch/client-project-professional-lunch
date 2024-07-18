// const initialState = {
//     profileExists: false
// }

const profileCheck = (state = false, action) => {
  if (action.type === "SET_PROFILE_CHECK_RESULT") {
    return action.payload;
  } else {
    return state;
  }
};

export default profileCheck;
