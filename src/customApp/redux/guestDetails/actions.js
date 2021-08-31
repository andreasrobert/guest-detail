const actions = {
    GET_GUEST: 'GET_GUEST',
    SET_GUEST: 'SET_GUEST',
    GET_ALL_GUEST:'GET_ALL_GUEST',
    UPDATE_GUEST: 'UPDATE_GUEST',
    SET_STATUS: 'SET_STATUS',
    SET_MISSING: 'SET_MISSING',

getGuest:(bookingCode,x) => ({
    type: actions.GET_GUEST,
    payload: bookingCode,
    addon: x
}),

setGuest:(data,x)=>({
    type: actions.SET_GUEST,
    payload: data,
    addon:x
}),

getAllGuest:()=>({
    type: actions.GET_ALL_GUEST
}),

updateGuest:(updatedData)=>({
    type: actions.UPDATE_GUEST,
    payload: updatedData
}),

setStatus:(newStatus)=>({
    type: actions.SET_STATUS,
    payload: newStatus
}),

setMissing:()=>({
    type: actions.SET_MISSING
})
 
}

export default actions;