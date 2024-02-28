import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = payload.action
            return { ...state, users: [action.payload, ...state.users] };
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    }
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;