import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { aestheticsColor } from '../../features/aesthetics/aestheticsSlice';
import { Post } from '../../features/posts/Post';
import { selectPosts, loadPostsBySubreddit } from '../../features/posts/postSlice';
import { selectCurrentSubreddit } from '../../features/subreddit/subredditSlice';
import './body.css';

export function Body() {
    const dispatch = useDispatch();
    const currentSubreddit = useSelector(selectCurrentSubreddit);
    const posts= useSelector(selectPosts);
    const bgColor = useSelector(aestheticsColor);

    useEffect(() => {
        if (currentSubreddit) {
            dispatch(loadPostsBySubreddit(currentSubreddit));
    }
    }, [dispatch, currentSubreddit])

    if (!posts) {       
        return null;
    }
    
    return (
        <div id="body" style={{backgroundColor:bgColor}}>
            {Object.keys(posts).map(id => (
                <Post key={id} id={id} />
                
            ))}

        </div>
    );
}