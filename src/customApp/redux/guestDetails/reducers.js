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
                if(action.payload.arrival_time){
                    draft.guestData = action.payload
                }
                else if(action.addon){
                    draft.guestData = action.payload
                    draft.guestData["arrival_time"] = action.addon
                }
                else{
                    draft.guestData = action.payload
                    draft.guestData["arrival_time"] = ""
                    console.log(action.addon)
                }
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