import {createSlice} from '@reduxjs/toolkit'

interface TrackListState {
    tracks: TrackModel[]
}

const initialState: TrackListState = {
    tracks
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleLike: (state, action: PayLoadAction<TrackModel>) => {
            const currentArr: TrackModel[] = state.tracks.filter(track => track.id === action.payload.id)
            const [currentTrack] = currentArr
            currentTrack.isLiked = (!currentTrack.isLiked)
        }
    },
    selectors: {
        selectTracks: (sliceState) => {
            return sliceState.tracks
        }
    }
})

export const { selectTracks } = userSlice.selectors
export const { toggleLike } = userSlice.actions;
export default userSlice.reducer;