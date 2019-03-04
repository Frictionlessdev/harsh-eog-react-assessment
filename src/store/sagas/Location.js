import { takeEvery, call, put, cancel, all, race, fork } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function delay(duration) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), duration)
    });
    return promise;
}

function* watchFetchDrone(action){
    while(true){
        yield call(delay, 5000);
        const { error, data } = yield call(
            API.findLocation
        );
        if (error){
            yield put({ type: actions.API_ERROR, code: error.code });
            yield cancel();
            return;
        }
        if (!data){
            yield put({ type: actions.API_ERROR});
            yield cancel();
            return;
        }
        yield put({ type: actions.DRONE_LOCATION_RECEIVED, data: data });
    }
}

function* watchDroneLocationReceived(action){
    console.log("Fetching weather...")
    const {data} = action.data;
    const location = data[data.length - 1];
    const {latitude, longitude} = location;
    yield put({type: actions.FETCH_WEATHER, latitude, longitude})
}

function* watchLocationLoad() {
    //while(true){
        //yield call(delay, 5000);
        yield all([
            takeEvery(actions.FETCH_DRONE_LOCATION, watchFetchDrone),
            takeEvery(actions.DRONE_LOCATION_RECEIVED, watchDroneLocationReceived)
        ]);
    //}
}

export default [watchLocationLoad]