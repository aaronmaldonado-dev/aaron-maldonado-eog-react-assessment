import { createSlice, PayloadAction } from 'redux-starter-kit';
export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type MeasurementData  = {
  index: number;
  measurement: Measurement;
};

export type MultipleMeasurements = {
  metric: string;
  measurements: Measurement[];
};

export type ApiErrorAction = {
  error: string;
};

const initialState: MultipleMeasurements[] = [];

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    multipleMeasurementsReceived: (state, action: PayloadAction<MultipleMeasurements[]>) => {
      return action.payload;
    },
    singleMeasurementReceived: (state, action: PayloadAction<MeasurementData>) => {
      if (action.payload.index > -1) {
        state[action.payload.index].measurements.push(action.payload.measurement);
      }      
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
