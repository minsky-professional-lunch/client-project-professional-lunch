const meetings = (state = [], action) => {
    switch (action.type) {
        case 'SET_MEETINGS':
            return action.payload;
        case 'SET_ALL_MEETINGS':
            return action.payload;
        case 'UNSET_MEETINGS':
            return [];
        default:
            return state;
    }
}

export default meetings;