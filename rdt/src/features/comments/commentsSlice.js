import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiRoot = 'https://www.reddit.com';

export const loadComments = createAsyncThunk(
    "comments/loadComments",
    async ( {id, subreddit} ) => {

            const response = await fetch(`${apiRoot}/r/${subreddit}/comments/${id}.json`);
            if (response.ok) {
                const json = await response.json();
                return {
                    id,
                    comments: json[1].data.children.map(comment => ({
                    
                        comment: comment.data.body,
                        author: comment.data.author,
                        id: comment.data.id              
            })

                )}
            }

        
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {},
        isLoading: false,
        hasError: false
    },
    reducers: {
        clearComments: (state) => {
            state.comments = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadComments.fulfilled, (state, action) =>{
                const { id, comments} = action.payload;
                state.isLoading = false;
                state.hasError = false;
                state.comments[id] = comments;
            })
            .addCase(loadComments.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
})

export const selectCommentsById = (id) => (state) => state.comments.comments[id]
export const selectCommentIsLoading = (state) => state.comments.comments.isLoading;
export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
