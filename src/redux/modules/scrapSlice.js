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
            // TODO: 계속 새 배열로 추가되는 오류 수정해야 함
            //return { ...state, scraps: [action.payload, ...state.scraps] }
            const { userId, scrapId } = action.payload;
            const userScrap = state.scraps.find(item => item.userId === userId);
            if (userScrap) {
                userScrap.scrapLists.push(scrapId);
            } else {
                state.scraps.push({ userId, scrapLists: [scrapId] });
            }
        },
        deleteScrap: (state, action) => {
            const { userId, scrapId } = action.payload;
            const userScrap = state.scraps.find(item => item.userId === userId);
            if (userScrap) {
                userScrap.scrapLists = userScrap.scrapLists.filter(id => id !== scrapId);
            }
        }
    }
});

export const { setScrap, addScrap, deleteScrap } = scrapSlice.actions;
export default scrapSlice.reducer;