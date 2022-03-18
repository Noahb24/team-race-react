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
    stats: [],
    sortType: 'asc',
    sortColumn: 'racer',

}

export const statsSlice = createSlice({ 
    name: 'stats',
    initialState,
    reducers: {
        update: (state, action) => {
            state[action.payload.type] = action.payload.value
        },
        updateStatsTableParams: (state, action) => {
            state.statsTableParams[action.payload.type] = action.payload.value
        },
        updateStats: (state, action) => {
            state.stats = action.payload
        },
        sortStats: state => {
            const sortColumn = state.sortColumn
            const sortType = state.sortType
            const stats = state.stats

            const sortAsc = (a,b) => {
                if(a[sortColumn] < b[sortColumn]){
                    return -1
                }
                if(a[sortColumn] > b[sortColumn]){
                    return 1
                }
                return 0
            }
            const sortDsc = (a,b) => {
                if(a[sortColumn] < b[sortColumn]){
                    return 1
                }
                if(a[sortColumn] > b[sortColumn]){
                    return -1
                }
                return 0
            }

            if(sortType === '' || sortColumn === ''){
                return
            }else if(sortType ==='asc'){
                state.stats = stats.sort(sortAsc)
            } else if (sortType === 'dsc'){
                state.stats = stats.sort(sortDsc)
            }
        }
    }
})

export const {updateStatsTableParams, updateStats, update, sortStats} = statsSlice.actions

export const selectStats = state => state.history.stats
export const selectStatsTableParams = state => state.history.statsTableParams
export const selectSortType = state => state.history.sortType
export const selectSortColumn = state => state.history.sortColumn

export default statsSlice.reducer