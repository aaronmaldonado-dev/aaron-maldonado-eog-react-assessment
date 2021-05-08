import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as graphReducer } from '../Features/DataProvider/reducerGraph';
import { reducer as metricsReducer } from '../Features/DataProvider/reducerMetrics';
import { reducer as measurementsReducer } from '../Features/DataProvider/reducerMeasurements';

export default {
  weather: weatherReducer,
  graph: graphReducer,
  metrics: metricsReducer,
  measurements: measurementsReducer,
};
