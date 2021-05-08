import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { PayloadAction } from 'redux-starter-kit';
import { actions as MeasurementsActions, MultipleMeasurements } from './reducerMeasurements';

export type DataSetUnit = {
  x: number;
  y: number;
};

export type DataSet = {
  id: string;
  data: DataSetUnit[];
};

export type Data = DataSet[];

function* multipleMeasurementsReceived(action: PayloadAction<MultipleMeasurements[]>) {
  const data = action.payload.map((meas) => (
    {
      id: meas.metric,
      data: meas.measurements.map((item) => ({
        x: item.at,
        y: item.value
      }))
    }
  ));
}

export default function* watchSelection() {
  yield takeEvery(MeasurementsActions.multipleMeasurementsReceived.type, multipleMeasurementsReceived);
}