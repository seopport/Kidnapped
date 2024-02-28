import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            // TODO: userId 중복될 때 추가 안되게 오류 수정해야 함
            const newUser = action.payload
            // 이미 존재하는 userId 인지 확인
            const isDuplicateUserId = state.users.some(user => user.userId === newUser.userId);
            if (!isDuplicateUserId) {
                state.users = [newUser, ...state.users];
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    }
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer; 