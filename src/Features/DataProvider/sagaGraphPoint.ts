import { takeEvery, put } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import { actions as LoadingActions } from './reducerLoadingMeasurements';
import { actions as GraphActions, GraphDataPointIndex } from './reducerGraph';

function* singlePointReceived(action: PayloadAction<GraphDataPointIndex>) {
  yield put({ type: LoadingActions.setLoadingState.type, payload: true });
  yield put({ type: GraphActions.pushSinglePoint.type, payload: action.payload });
  yield put({ type: LoadingActions.setLoadingState.type, payload: false });
}

export default function* watchSelection() {
  yield takeEvery(GraphActions.askForPushPoint.type, singlePointReceived);
}