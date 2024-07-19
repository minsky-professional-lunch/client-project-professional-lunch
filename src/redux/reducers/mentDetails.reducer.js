const mentDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MENT_DETAILS':
            return action.payload;
        default:
            return state;
        }
    }
    
export default mentDetails;