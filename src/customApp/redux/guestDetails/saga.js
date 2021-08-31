import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';

//functions to fetch the api and update the data, and when finished get the new updated data
function* requestDetails({payload}) {
    try{
        yield put(actions.setStatus("validating"))
        const details = yield call(onRequestDetails, payload)
        if(details){
            yield put(actions.setGuest(details))
            yield put(actions.setStatus(undefined))

        } else {
            yield put(actions.setGuest())
        }
    } catch (error) {
        yield put(actions.setStatus("warning"))
        console.log(error)
    }
}

const onRequestDetails = async (bookingCode) =>{
    try{
     return fetch(`https://bv-online-assessment.herokuapp.com/api/bookings/${bookingCode}`)
    .then(res => res.json())
    .then(res => res)
    } catch(error){
        return error
    }
}

//functions to fetch the api and return the data
function* setDetail({payload}) {
    try{
        const update = yield call( updateDetails,payload)
        yield put(actions.getGuest(payload.bookingCode))
    } catch (error) {
        console.log(error)
    }
}

const updateDetails = async(payload) =>{
    console.log(payload)
    await fetch(`https://bv-online-assessment.herokuapp.com/api/bookings/${payload.bookingCode}/update-eta`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        body: JSON.stringify({arrival_time: payload.updatedData})
        })
        .then(res => res.json())
        .then(res => res)
        .catch(error => error)
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_GUEST, requestDetails),
        takeEvery(actions.UPDATE_GUEST, setDetail)
    ]);
  }