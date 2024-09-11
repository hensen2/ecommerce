import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: { types: [], scents: [], sort: "featured" },
  reducers: {
    resetAllFilters: (state) => {
      state.types = new Array(0);
      state.scents = new Array(0);
    },
    resetTypeFilters: (state) => {
      state.types = new Array(0);
    },
    resetScentFilters: (state) => {
      state.scents = new Array(0);
    },
    setTypesCategory: (state, action) => {
      if (state.types.includes(action.payload)) {
        state.types = state.types.filter((type) => type !== action.payload);
      } else {
        state.types.push(action.payload);
      }
    },
    setScentsCategory: (state, action) => {
      if (state.scents.includes(action.payload)) {
        state.scents = state.scents.filter((scent) => scent !== action.payload);
      } else {
        state.scents.push(action.payload);
      }
    },
    setSortFilter: (state, action) => {
      switch (action.payload) {
        case "titleAsc":
          state.sort = "titleAsc";
          break;
        case "titleDesc":
          state.sort = "titleDesc";
          break;
        case "priceAsc":
          state.sort = "priceAsc";
          break;
        case "priceDesc":
          state.sort = "priceDesc";
          break;
        default:
          state.sort = "featured";
      }
    },
  },
});

export const {
  resetAllFilters,
  resetTypeFilters,
  resetScentFilters,
  setTypesCategory,
  setScentsCategory,
  setSortFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;
