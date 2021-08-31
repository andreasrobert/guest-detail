import actions from './actions';
import produce from 'immer';

const initState = {
    guestData:[],
    isError: undefined
};

//using immerJS to handle immutable state

export default function reducer(state = initState, action) {
    switch(action.type){
        case actions.SET_GUEST:
            return produce(state, draft =>{
                    draft.guestData = action.payload
            })
            
        case actions.SET_STATUS:
            return{
                ...state,
                isError: action.payload
            }

        default:
            return state;
    }
}