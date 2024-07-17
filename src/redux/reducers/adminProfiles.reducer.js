const adminProfiles = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADMIN_PROFILES':
      return action.payload;
      default:
        return state;
  }
}

export default adminProfiles;