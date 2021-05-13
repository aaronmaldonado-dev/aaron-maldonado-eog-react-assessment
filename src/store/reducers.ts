import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/DataProvider/reducerMetrics';
import { reducer as measurementsReducer } from '../Features/DataProvider/reducerMeasurements';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  measurements: measurementsReducer,
};
