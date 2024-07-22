const mentDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MENT_DETAILS':
            return action.payload;
        case 'CLEAR_MENT_DETAILS':
            return {};
        default:
            return state;
        }
    }
    
export default mentDetails;