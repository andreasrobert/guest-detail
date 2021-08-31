import actions from './actions';
import produce from 'immer';

const initState = {
    guestData:[],
    isError: undefined
};

export default function reducer(state = initState, action) {
    switch(action.type){
        case actions.SET_GUEST:
            return produce(state, draft =>{
                if(action.payload.arrival_time){
                    draft.guestData = action.payload
                }
                else if(action.x){
                    draft.guestData = action.payload
                    draft.guestData["arrival_time"] = action.x
                }
                else{
                    draft.guestData = action.payload
                    draft.guestData["arrival_time"] = ""
                    console.log(action.x)
                }
            })
            // return{
            //     ...state,
            //     guestData: action.payload
            // }

        case actions.SET_STATUS:
            return{
                ...state,
                isError: action.payload
            }

        case actions.SET_MISSING:
            return{

            }
        
        default:
            return state;
    }
}