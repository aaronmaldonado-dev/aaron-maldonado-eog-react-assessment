import { createSlice, PayloadAction } from 'redux-starter-kit';

export type GraphDataPoint = {
  x: Date;
  y: number;
};

export type GraphDataPointIndex = {
  index: number;
  point: GraphDataPoint;
};

export type GraphDataSet = {
  id: string;
  data: GraphDataPoint[];
};

export type GraphDataSets = GraphDataSet[];

const initialState: GraphDataSets = [];

const slice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    graphDataFormatted: (state, action: PayloadAction<GraphDataSets>) => {
      return action.payload;
    },
    askForPushPoint: (state, action: PayloadAction<GraphDataPointIndex>) => {
      return state;
    },
    pushSinglePoint: (state, action: PayloadAction<GraphDataPointIndex>) => {
      const { index, point } = action.payload;
      const { x, y } = point;

      if (index > -1 && state[index] && x && y) {
        state[index].data.push({ x, y });
      }
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
