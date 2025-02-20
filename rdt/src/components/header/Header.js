import React from 'react';
import { nextSubreddit, selectCurrentSubreddit } from '../../features/subreddit/subredditSlice';
import { aestheticsColor } from '../../features/aesthetics/aestheticsSlice';
import { useDispatch, useSelector } from 'react-redux';
import redditLogo from '../0img/redditlogo.png';
import { useState, useEffect } from 'react';
import { setLimit } from '../../features/posts/postSlice';

export function Header() {
    const dispatch = useDispatch();
    const currentSub = useSelector(selectCurrentSubreddit)
    const [subVisibility, setSubVisibility] = useState(false);
    
    let logoColor = useSelector(aestheticsColor);
    
    const nextSubredditClick = () => {
        dispatch(setLimit(25));
        dispatch(nextSubreddit())
        setSubVisibility(true);
    };

    useEffect(() => {
        if (subVisibility) {
            const timer = setTimeout(() => setSubVisibility(false), 2000);
            return () => clearTimeout(timer); 
        }
    }, [subVisibility])
    
    return (
        <header className="AppHeader">
            <div 
                className="logo" 
                id="redditLogo" 
                onClick={nextSubredditClick} 
                style={{backgroundColor:logoColor}}
            >
                <img src={redditLogo} alt="reddit logo" />
            </div>
            <h1 id='currentSub' style={{color: subVisibility? logoColor :'transparent', left: subVisibility? '2rem':'0rem', }}>{currentSub}</h1>
        </header>
    )
}