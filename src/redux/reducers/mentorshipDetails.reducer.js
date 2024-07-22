const mentorshipDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_MENTORSHIP_DETAILS':
            return action.payload;
        case 'UNSET_MENTORSHIP_DETAILS':
            return [];
        default:
            return state;
    }
}

export default mentorshipDetails;