import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scraps: []
};

const scrapSlice = createSlice({
    name: 'scraps',
    initialState,
    reducers: {
        addScrap: (state, action) => {
            return { ...state, scraps: [action.payload], ...state.scraps }
        }
    }
});

export const { addScrap } = scrapSlice.actions;
export default scrapSlice.reducer;