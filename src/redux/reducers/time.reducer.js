const timeReducer = (state = [], action) => {
  if (action.type === "SET_TIMES") {
    return action.payload;
  } else {
    return state;
  }
};

export default timeReducer;
