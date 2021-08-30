import actions from './actions';

const initState = {
    guestData:[],
    isError: undefined
};

export default function reducer(state = initState, action) {
    switch(action.type){
        case actions.SET_GUEST:
            return{
                ...state,
                guestData: action.payload
            }

        case actions.SET_STATUS:
            return{
                ...state,
                isError: action.payload
            }

        default:
            return state;
    }
}