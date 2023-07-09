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
    },
    sandBaggerYear: new Date().getFullYear(),
    sandBaggerList: [],
    powerPointsList: [],
	points: {},
	podcasts: [],
	drone: [],
	highlight_podcast: '',
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        update: (state, action) => {
            state[action.payload.type] = action.payload.value
        },
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
export const selectSandBaggerYear = state => state.home.sandBaggerYear
export const selectSandBaggerList = state => state.home.sandBaggerList
export const selectCurrentPoints = state => state.home.points
export const selectPodcasts = state => state.home.podcasts
export const selectDrone = state => state.home.drone
export const selectHighlightPodcast = state => state.home.highlight_podcast
export const selectPowerPointsList = state => state.home.powerPointsList

export const { addPostsFromServer, startPostModal, stopPostModal,
               updateNewPost, clearNewPost, update } = homeSlice.actions

export default homeSlice.reducer
