const profiles = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILES':
            return action.payload;
        default:
            return state;
    }
}

export default profiles;