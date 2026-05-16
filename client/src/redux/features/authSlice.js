import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index.js';

export const signin = createAsyncThunk('auth/signin', async ({ formData, navigate }, { rejectWithValue }) => {
    try {
        const { data } = await api.signIn(formData);
        navigate('/');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const signup = createAsyncThunk('auth/signup', async ({ formData, navigate }, { rejectWithValue }) => {
    try {
        const { data } = await api.signUp(formData);
        navigate('/');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk('auth/updateUser', async ({ id, formData, navigate }, { rejectWithValue }) => {
    try {
        const { data } = await api.updateUser(id, formData);
        navigate('/profile');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: null,
        error: null,
    },
    reducers: {
        auth: (state, action) => {
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            state.authData = action.payload;
        },
        logout: (state) => {
            localStorage.clear();
            state.authData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.fulfilled, (state, action) => {
                localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
                state.authData = action.payload;
                state.error = null;
            })
            .addCase(signin.rejected, (state, action) => {
                state.error = action.payload.message;
            })
            .addCase(signup.fulfilled, (state, action) => {
                localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
                state.authData = action.payload;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = action.payload.message;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const profile = JSON.parse(localStorage.getItem('profile'));
                const updatedProfile = { ...profile, result: action.payload };
                localStorage.setItem('profile', JSON.stringify(updatedProfile));
                state.authData = updatedProfile;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload.message;
            });
    },
});

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
