import { createSlice, PayloadAction } from 'redux-starter-kit';

const initialState: boolean = true;

const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
