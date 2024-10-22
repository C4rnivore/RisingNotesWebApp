import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    value:{
        genre : [],
        genreOrAnd: 'and',
        language : [],
        languageOrAnd: 'and',
        similar : [],
        similarOrAnd: 'and',
        mood : [],
        moodOrAnd: 'and',
        duration : 'any',
        extra: {
                explicit : "Disabled",
                removed : "Disabled"}
    }
} 

export const filtersSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        updateFilterValue: (state, action) =>{
            let filterId = action.payload.filterId
            let value = action.payload.filterValue
            let predicate = action.payload.filterOrAnd

            switch(filterId){
                case "genre":
                    state.value.genre = value
                    state.value.genreOrAnd = predicate
                    break
                case "language":
                    state.value.language = value
                    state.value.languageOrAnd = predicate
                    break
                case "similar":
                    state.value.similar = value
                    state.value.similarOrAnd = predicate
                    break
                case "mood":
                    state.value.mood = value
                    state.value.moodOrAnd = predicate
                    break
                case "duration":
                    state.value.duration = value
                    break
                case "extra":
                    state.value.extra = value
                    break
                default:
                    break
            }
        },
        setDefaultFilterValue: (state) => {
            state.value.genre = [];
            state.value.language = [];
            state.value.similar = [];
            state.value.mood = [];
            state.value.genreOrAnd = 'and';
            state.value.languageOrAnd = 'and';
            state.value.similarOrAnd = 'and';
            state.value.moodOrAnd = 'and';
            state.value.duration = 'any';
            state.value.extra.explicit = "Disabled";
            state.value.extra.removed = "Disabled";
        }
    }
})

export const {updateFilterValue, setDefaultFilterValue} = filtersSlice.actions

export default filtersSlice.reducer