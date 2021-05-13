import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

export type Measurement = {
  metric: string;
  value: number;
  unit: string;
  at: number;
};

export type MultipleMeasurements = {
  measurements: Measurement[];
  metric: string;
};

const initialState: {[metric: string]: Measurement[]} = {};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    multipleMeasurementsReceived: (state, action: PayloadAction<MultipleMeasurements[]>) => {
      const payload = action.payload;
      for (let i = 0; i < payload.length; i++) {
        const m = payload[i];
        state[m.metric] = m.measurements;
      }
    },
    singleMeasurementReceived: (state, action: PayloadAction<Measurement>) => {
      const { metric, at, value, unit } = action.payload;
      state[metric] = state[metric] || [];
      state[metric].shift();
      state[metric].push({
        metric,
        value, 
        unit,
        at, 
      });
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
