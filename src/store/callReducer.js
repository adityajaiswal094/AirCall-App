import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  normalCalls: [],
  archivedCalls: [],
  totalCalls: [],
  showArchivedCalls: false,
};

const callsSlice = createSlice({
  name: "calls",
  initialState: initialState,
  reducers: {
    StoreCalls: (state, action) => {
      const data = action.payload;

      const archivedCalls = data.filter((call) => call.is_archived === true);
      const normalCalls = data.filter((call) => call.is_archived === false);

      console.log("archivedCalls: ", archivedCalls);
      console.log("normalCalls: ", normalCalls);
      return {
        ...state,
        normalCalls: normalCalls,
        archivedCalls: archivedCalls,
        totalCalls: data.length,
      };
    },

    UpdateCallStatus: (state, action) => {},

    ShowArchivedCalls: (state, action) => {
      const value = action.payload;
      return { ...state, showArchivedCalls: value };
    },
  },
});

export const { StoreCalls, UpdateCallStatus, ShowArchivedCalls } =
  callsSlice.actions;
export default callsSlice.reducer;
