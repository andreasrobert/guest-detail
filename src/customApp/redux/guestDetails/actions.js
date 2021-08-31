const actions = {
    GET_GUEST: 'GET_GUEST',
    SET_GUEST: 'SET_GUEST',
    GET_ALL_GUEST:'GET_ALL_GUEST',
    UPDATE_GUEST: 'UPDATE_GUEST',
    SET_STATUS: 'SET_STATUS',
    SET_MISSING: 'SET_MISSING',

// ? there is a bug in the api where if you update the arrival time, the key and value will disappear ? Sorry if i'm mistaken
// the time parameter is given from the update function in saga.js while it has the data for the new updated arrival time to combat the problem  
getGuest:(bookingCode,time) => ({
    type: actions.GET_GUEST,
    payload: bookingCode,
    addon: time
}),

setGuest:(data,time)=>({
    type: actions.SET_GUEST,
    payload: data,
    addon:time
}),

getAllGuest:()=>({
    type: actions.GET_ALL_GUEST
}),

updateGuest:(updatedData)=>({
    type: actions.UPDATE_GUEST,
    payload: updatedData
}),

//state for the input validation 
setStatus:(newStatus)=>({
    type: actions.SET_STATUS,
    payload: newStatus
}),
 
}

export default actions;