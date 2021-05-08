import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = string[];

export type ApiErrorAction = {
  error: string;
};

const initialState: Metrics = [];

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsSelected: (state, action: PayloadAction<Metrics>) => {
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
