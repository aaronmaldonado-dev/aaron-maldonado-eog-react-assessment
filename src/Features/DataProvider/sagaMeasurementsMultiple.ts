import { takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { PayloadAction } from 'redux-starter-kit';
import { actions as MeasurementsActions, MultipleMeasurements } from './reducerMeasurements';
import { actions as GraphActions } from './reducerGraph';

function* multipleMeasurementsReceived(action: PayloadAction<MultipleMeasurements[]>) {
  const data = action.payload.map((meas) => (
    {
      id: meas.metric,
      data: meas.measurements.map((item) => ({
        x: new Date(item.at),
        y: item.value
      }))
    }
  ));
  yield put({ type: GraphActions.graphDataFormatted.type, payload: data });
}

export default function* watchSelection() {
  yield takeEvery(MeasurementsActions.multipleMeasurementsReceived.type, multipleMeasurementsReceived);
}