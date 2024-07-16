import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiRoot = 'https://www.reddit.com'
export const loadPostsBySubreddit = createAsyncThunk(
    "posts/loadPostsBySubreddit",
    async (subreddit) => {
        try{
            const response = await fetch(`${apiRoot}/${subreddit}.json`);
            if (response.ok) {
                const json = await response.json();
                return json.data.children.map(post => (
                    {
                        id: post.data.id,
                        type: post.data.domain,
                        author: post.data.author,
                        title: post.data.title,
                        subreddit: post.data.subreddit,
                        image: post.data.url_overridden_by_dest,
                        selfText: post.data.selftext_html,
                        upvotes: post.data.ups,
                        video: post.data.media  ,
                        comments: [],
                        commentCount: post.data.num_comments -1,
                        commentShow: false
                    }

                ));
            }

        } catch (err) {
            console.log(err);
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        search: []
    },
    reducers: {
        searchFor: {
            reducer: (state, action) => {
                state.posts = state.posts.filter(post => post.title.toLowerCase().includes(action.payload.toLowerCase()));
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPostsBySubreddit.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadPostsBySubreddit.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.posts = action.payload;
            })
            .addCase(loadPostsBySubreddit.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }

})

export const {searchFor} = postSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export const selectPostById = (id) => (state) => state.posts.posts[id];
export const selectIsPostLoading = (state) => state.posts.isLoading;
export default postSlice.reducer;