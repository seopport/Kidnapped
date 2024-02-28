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
        },
        deleteScrap: (state, action) => {
            console.log(action.payload)
            const scrapIdToDelete = action.payload;
            // 스크랩 목록에서 해당 ID를 가진 스크랩을 찾아 삭제
            state.scraps = state.scraps.filter(scrap => scrap.id !== scrapIdToDelete);
        }
    }
});

export const { addScrap, deleteScrap } = scrapSlice.actions;
export default scrapSlice.reducer;