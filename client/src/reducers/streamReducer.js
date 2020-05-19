import {
    CREATE_STREAM, 
    FETCH_STREAMS, 
    FETCH_STREAM, 
    DELETE_STREAM, 
    EDIT_STREAM
} from '../action/types';

const createNewStreamObject = (data, parameter) => {
    // convert 
    // [ { "title": "First", "id": 1 }, { "title": "Second", "id": 2 } ]
    // to
    // { "1": { "title": "First", "id": 1 }, "2": { "title": "Second", "id": 2 } }
    let newData = {};
    data.forEach(values => {
        newData[values[parameter]] = values;
    });
    return newData;
};

export default (state={}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
            return { ...state, ...createNewStreamObject(action.payload, 'id') };
        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            // let newState = {...state };
            // newState[action.payload.id] = action.payload;
            // return newState;  This 3 lines are same as below.
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            let newState = {...state};
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};