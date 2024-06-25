import { configureStore } from '@reduxjs/toolkit';
import aestheticsReducer from '../features/aesthetics/aestheticsSlice';
import postsReducer from '../features/posts/postSlice';
import subredditReducer from '../features/subreddit/subredditSlice';
import commentsReducer from '../features/comments/commentsSlice';


export const store = configureStore({
  reducer: {
    subreddit: subredditReducer,
    aesthetics: aestheticsReducer,
    posts: postsReducer,
    comments: commentsReducer

    
  },
});
