import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiRoot = 'https://www.reddit.com';

export const loadSubreddits = createAsyncThunk(
    'subreddit/loadSubreddits',
    async () => {
        try{
            const response = await fetch(`${apiRoot}/subreddits/popular.json`);
            if (response.ok) {
                const json = await response.json();
                return json.data.children.map(subreddit => ({
                    id: subreddit.data.id,
                    name: subreddit.data.display_name_prefixed,
                    icon: subreddit.data.icon_img,
                    noPrefix: subreddit.data.display_name
                }));
            }
        }
        catch(error){
            console.log(error);
        }
        
        
    }
)

const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        subreddits: [],
        currentSubreddit: 'r/funny',
        isLoading: false,
        hasError: false
    },
    reducers: {
        changeSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSubreddits.pending, (state) =>{
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadSubreddits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.subreddits = action.payload;
            })
            .addCase(loadSubreddits.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    } 

})

export const selectSubreddits = (state) => state.subreddit.subreddits;
export const selectCurrentSubreddit = (state) => state.subreddit.currentSubreddit;
export const { changeSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;
