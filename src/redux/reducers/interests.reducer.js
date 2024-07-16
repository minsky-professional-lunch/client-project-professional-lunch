const interestsReducer = (state = [], action) => {
  if (action.type === 'SET_INTERESTS') {
    return action.payload;
  } else if (action.type === 'ADD_INTEREST') {
    return [...state, action.payload];
  } else {
    return state;
  }
};

export default interestsReducer;