import {createSlice} from '@reduxjs/toolkit'

interface TrackListState {
    tracks: TrackModel[]
}

const initialState: TrackListState = {
    tracks
}

const ordersSlice = createSlice({
    name: 'orders',
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

export const { selectTracks } = ordersSlice.selectors
export const { toggleLike } = ordersSlice.actions;
export default ordersSlice.reducer;