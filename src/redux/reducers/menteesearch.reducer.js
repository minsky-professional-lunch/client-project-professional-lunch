const menteeSearchProfiles = (state = [], action) => {
  switch (action.type) {
    case 'SET_INTEREST_PROFILES':
      return action.payload;
    case 'SET_GENDER_PROFILES':
      return action.payload;
    default:
      return state;
  }
}

export default menteeSearchProfiles;