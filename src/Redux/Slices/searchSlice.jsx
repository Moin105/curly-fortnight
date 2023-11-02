// // searchSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const searchSlice = createSlice({
//   name: 'search',
//   initialState: '',
//   reducers: {
//     setSearchQuery: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const { setSearchQuery } = searchSlice.actions;
// export default searchSlice.reducer;
// // 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchData: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    clearSearchData: (state) => {
      state.searchData = null;
    },
  },
});

export const { setSearchData, clearSearchData } = searchSlice.actions;
export default searchSlice.reducer;