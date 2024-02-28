import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUSer: (state, action) => {
            return { ...state, users: [action.payload, ...state.users] }
        }
    }
});

export const { addUSer, addScrap, deleteScrap } = userSlice.actions;
export default userSlice.reducer;