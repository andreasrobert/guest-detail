const actions = {
    GET_GUEST: 'GET_GUEST',
    SET_GUEST: 'SET_GUEST',
    GET_ALL_GUEST:'GET_ALL_GUEST',
    UPDATE_GUEST: 'UPDATE_GUEST',
    SET_STATUS: 'SET_STATUS',
    SET_MISSING: 'SET_MISSING',


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