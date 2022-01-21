import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [{
        id : 0,
        name: 'Loading...',
        date: Date('01/20/2022'),
        content: 'Loading...'
    }],
    postModal: false,
    newPost: {
        name: '',
        content: '',
    }

}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        addPostsFromServer: (state, action) => {
            state.posts = action.payload
        },
        startPostModal: state => {
            state.postModal = true
        },
        stopPostModal: state => {
            state.postModal = false
        },
        updateNewPost: (state, action) => {
            const type = action.payload.type
            const value = action.payload.value

            state.newPost[type] = value
        },
        clearNewPost: state => {
            state.newPost = { name: '', content: ''}
        }
    }
})

export const selectPosts = state => state.home.posts
export const selectPostModal = state => state.home.postModal
export const selectNewPost = state => state.home.newPost

export const { addPostsFromServer, startPostModal, stopPostModal, 
               updateNewPost, clearNewPost } = homeSlice.actions

export default homeSlice.reducer