const schoolsReducer = (state = [], action) => {
  if (action.type === 'SET_SCHOOLS') {
    return action.payload;
  } else if (action.type === 'ADD_SCHOOL') {
    return [...state, action.payload];
  } else {
    return state;
  }
};

export default schoolsReducer;