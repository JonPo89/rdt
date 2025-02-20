import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { aestheticsColor } from '../../features/aesthetics/aestheticsSlice';
import { Post } from '../../features/posts/Post';
import { selectPosts, loadPostsBySubreddit, selectIsPostLoading, selectLimit, setLimit } from '../../features/posts/postSlice';
import { selectCurrentSubreddit } from '../../features/subreddit/subredditSlice';
import './body.css';
import { loadSubreddits } from '../../features/subreddit/subredditSlice';
import redditLogo from '../0img/redditlogo.png';

export function Body() {
    const dispatch = useDispatch();
    const currentSubreddit = useSelector(selectCurrentSubreddit);
    const posts= useSelector(selectPosts);
    const bgColor = useSelector(aestheticsColor);
    const isLoading = useSelector(selectIsPostLoading);
    const [rotate, setRotate] = useState(0);
    const limit = useSelector(selectLimit);

    useEffect(() => {
        if (currentSubreddit) {
            dispatch(loadPostsBySubreddit({subreddit: currentSubreddit, limit}));
    }
    }, [dispatch, currentSubreddit, limit])
    
    useEffect(() => {
            dispatch(loadSubreddits());
        },[dispatch])

    setTimeout(() => {
        setRotate((rotate+1));
    }, 5);

    
    if (!posts) {       
        return null;
    }
    
    return (
        <div id="body" style={{backgroundColor:bgColor}}>
            
            {Object.keys(posts).map(id => (
                <Post key={id} id={id} />
            ))}
            {limit <100 || isLoading? 
            <div className="morePosts">
                {!isLoading ? 
                    <button onClick={() => dispatch(setLimit(limit + 25))} style={{color:bgColor}}>Load More</button>
                :
                    <>
                    <img src={redditLogo} style={{transform:`rotate(${rotate}deg`}}  alt="reddit logo" />
                    </>
                }
            </div>
            :
            null    
            }
            <div className="hiddenFlexItem">

            </div>
            <div className="hiddenFlexItem">
                
            </div>
            <div className="hiddenFlexItem">
                
            </div>
            <div className="hiddenFlexItem">
                
            </div>
            

        </div>
    );
}