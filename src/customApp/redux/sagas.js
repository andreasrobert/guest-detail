import { all } from 'redux-saga/effects';
import githubSearchSagas from './githubSearch/sagas';
import guestDetailsSaga from './guestDetails/saga';

export default function* devSaga() {
  yield all([githubSearchSagas(), guestDetailsSaga()]);
}
