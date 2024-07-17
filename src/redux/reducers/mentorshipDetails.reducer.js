const mentorshipDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_MENTORSHIP_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default mentorshipDetails;