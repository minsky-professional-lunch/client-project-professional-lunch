const gendersReducer = (state = [], action) => {
  if (action.type === 'SET_GENDERS') {
    return action.payload;
  } else if (action.type === 'ADD_GENDER') {
    return [...state, action.payload];
  } else {
    return state;
  }
};

export default gendersReducer;
