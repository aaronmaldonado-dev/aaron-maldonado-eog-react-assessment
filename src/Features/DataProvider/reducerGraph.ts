import { createSlice, PayloadAction } from 'redux-starter-kit';
import { MultipleMeasurements } from './reducerMeasurements';

export type GraphDataPoint = {
  x: number;
  y: number;
}

export type GraphDataSet = {
  id: string;
  data: GraphDataPoint[]
};

export type GraphDataSets = GraphDataSet[];

export type ApiErrorAction = {
  error: string;
};

const initialState: GraphDataSets = [];

const slice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    graphDataFormatted: (state, action: PayloadAction<MultipleMeasurements>) => {},
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
