import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';


const onRequestDetails = async (bookingCode) =>{
    try{
     return fetch(`https://bv-online-assessment.herokuapp.com/api/bookings/${bookingCode}`)
    .then(res => res.json())
    .then(res => res)
    } catch(error){
        return error
    }
}
const updateDetails = async(payload) =>{
    await fetch(`https://bv-online-assessment.herokuapp.com/api/bookings/${payload.bookingCode}/update-eta`,{
        method: "PUT",
        body: JSON.stringify({arrival_time: payload.updatedData})
        })
        .then(res => res.json())
        .then(res => res)
        .catch(error => error)
}

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

function* setDetail({payload}) {
    try{
        const update = yield call( updateDetails,payload)
    } catch (error) {
        console.log(error)
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_GUEST, requestDetails),
        takeEvery(actions.UPDATE_GUEST, setDetail)
    ]);
  }