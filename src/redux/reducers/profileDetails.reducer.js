const profileDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'UNSET_PROF_DETAILS':
            return {};
        default:
            return state;
        }
    }
    
export default profileDetails;