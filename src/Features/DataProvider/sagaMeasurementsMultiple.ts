import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { PayloadAction } from 'redux-starter-kit';
import { actions as MeasurementsActions, MultipleMeasurements } from './reducerMeasurements';

function* multipleMeasurementsReceived(action: PayloadAction<MultipleMeasurements>) {
  console.log(action.payload);  
  // yield call(toast.error, `Error Received: ${action.payload.error}`);
}

export default function* watchSelection() {
  yield takeEvery(MeasurementsActions.multipleMeasurementsReceived.type, multipleMeasurementsReceived);
}