import { getIngredientsApi } from '@api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TIngredient } from '@utils-types'
// let ingredients: TIngredient[]
export const fetchIngredients = createAsyncThunk('ingredients/getAll',
    async () => {
        const ingredients = await getIngredientsApi();
        return ingredients;
    }
);  
// const fetchIngredients = async () => {
//     try {
//     return await getIngredientsApi()
//     } catch (error) {
//       console.error('Ошибка при получении ингредиентов:', error);
//     }
// };
// const ingredients: Promise<TIngredient[] | undefined> = fetchIngredients()
// console.log(ingredients)

// getIngredientsApi()
// .then((data) => {
//     console.log(data)
// })
// console.log(ingredients)
interface IngredientsListState {
    ingredients: {}
    isLoading: boolean
    isContain: boolean
}

const initialState: IngredientsListState = {
    ingredients: fetchIngredients,
    isLoading: false,
    isContain: false
}
console.log(initialState)   

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        // toggleLike: (state, action: PayLoadAction<TrackModel>) => {
        //     const currentArr: TrackModel[] = state.tracks.filter(track => track.id === action.payload.id)
        //     const [currentTrack] = currentArr
        //     currentTrack.isLiked = (!currentTrack.isLiked)
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending,
        (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchIngredients.fulfilled,
        (state, action) => {
            state.isLoading = false;
            state.ingredients = action.payload;
            state.isContain = true;
        });
    },
    selectors: {
        getIngredients: (state) => state.ingredients,
        getContainStatus: (state) => state.isContain,
        getLoadingStatus: (state) => state.isLoading
    }
})

export const { getIngredients, getContainStatus, getLoadingStatus } = ingredientsSlice.selectors
// export const { toggleLike } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;