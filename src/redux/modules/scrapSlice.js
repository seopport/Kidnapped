import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scraps: []
};

const scrapSlice = createSlice({
    name: 'scraps',
    initialState,
    reducers: {
        setScrap: (state, action) => {
            return { ...state, scraps: action.payload }
        },
        addScrap: (state, action) => {
            return { ...state, scraps: [action.payload, ...state.scraps] }
        },
        deleteScrap: (state, action) => {
            // TODO: 수정 필요
            const scrapListId = action.payload;
            return;
        }

    }
});

export const { setScrap, addScrap, deleteScrap } = scrapSlice.actions;
export default scrapSlice.reducer;