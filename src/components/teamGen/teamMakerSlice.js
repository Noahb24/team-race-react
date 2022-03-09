import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teamSize: 0,
    racers: [
        {
        name: '',
        minute: 0,
        second: 0,
        ms: 0,
        id: 0}
    ],
    teams: []
}

export const teamGenSlice = createSlice ({
    name: 'teamGen',
    initialState,
    reducers: {
        teamSizeChange: (state, action) => {
            state.teamSize = action.payload
        },
        addRacer: (state, action) => {
            state.racers.push({
                name: "",
                minute: 0,
                second: 0,
                ms: 0,
                id: state.racers.length
            })
        },
        deleteRacer: (state, action) => {
            state.teams = []
            state.racers = [
                ...state.racers.slice(0, action.payload),
                ...state.racers.slice(action.payload + 1)]
        },
        racerChange: (state, action) => {
            const type = action.payload.type
            const value = action.payload.value
            const num = action.payload.num
            state.racers[num][type] = value
        },
        getTeams: (state, action) => {
            state.teams = action.payload
        }
    }
})

export const selectRacers = state => state.teamGen.racers
export const selectTeamSize = state => state.teamGen.teamSize
export const selectTeams = state => state.teamGen.teams

export const { addRacer, racerChange, deleteRacer, getTeams, teamSizeChange } = teamGenSlice.actions

export default teamGenSlice.reducer