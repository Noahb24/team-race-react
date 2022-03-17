import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    statsTableParams: {
        racer: 'all',
        lap: 'all',
        team: 'all',
        race: 'all',
        year: 'all',
        race_type: 'all',
    },
    stats: []
}

export const statsSlice = createSlice({ 
    name: 'stats',
    initialState,
    reducers: {
        updateStatsTableParams: (state, action) => {
            state.statsTableParams[action.payload.type] = action.payload.value
        },
        updateStats: (state, action) => {
            state.stats = action.payload
        }
    }
})

export const {updateStatsTableParams, updateStats} = statsSlice.actions

export const selectStats = state => state.history.stats
export const selectStatsTableParams = state => state.history.statsTableParams

export default statsSlice.reducer