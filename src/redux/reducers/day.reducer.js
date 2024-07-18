const dayReducer = (state = [], action) => {
  if (action.type === "SET_DAYS") {
    return action.payload;
  } else {
    return state;
  }
};

export default dayReducer;