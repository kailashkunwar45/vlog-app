import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index.js';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    try {
        const { data } = await api.fetchPosts();
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    try {
        const { data } = await api.createPost(post);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, post }) => {
    try {
        const { data } = await api.updatePost(id, post);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    try {
        await api.deletePost(id);
        return id;
    } catch (error) {
        console.log(error);
    }
});

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
    try {
        const { data } = await api.likePost(id);
        return data;
    } catch (error) {
        console.log(error);
    }
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => post._id !== action.payload);
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
            });
    },
});

export default postSlice.reducer;
