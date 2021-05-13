import { spawn, all } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsErrorSaga from '../Features/DataProvider/sagaMetricsError';
import measurementsErrorSaga from '../Features/DataProvider/sagaMeasurementsError';

export default function* root() {
  yield all([
    spawn(weatherSaga),
    spawn(metricsErrorSaga),
    spawn(measurementsErrorSaga),
  ]);
}
