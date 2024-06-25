import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { aestheticsColor, aestheticsDownColor } from '../../features/aesthetics/aestheticsSlice';
import { loadPostsBySubreddit } from '../../features/posts/postSlice';
import { selectSubreddits, loadSubreddits, changeSubreddit, selectCurrentSubreddit } from '../../features/subreddit/subredditSlice';
import redditLogo from '../0img/redditlogo.png';
import './footer.css';

export function Footer() {
    const [subredditToggle, setSubredditToggle] = useState(false);
    const [minSubs, setMinSubs] = useState(0);
    const [maxSubs, setMaxSubs] = useState(5);
    const [subredditLocation, setSubredditLocation] = useState(0);
    const [windowWidthNo, setWindowWidthNo] = useState(5);
    const [ subOpacity, setSubOpacity] = useState(1);

    const color = useSelector(aestheticsColor);
    const downColor = useSelector(aestheticsDownColor);
    const dispatch = useDispatch();
    const currentSub = useSelector(selectCurrentSubreddit);

    const subreddits = useSelector(selectSubreddits);

    useEffect(() => {
        dispatch(loadSubreddits());
    },[dispatch])


    
    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth;
            if (width < 700){
                setWindowWidthNo(3);
            } else if (width < 800){
                setWindowWidthNo(4);
            } else {
                setWindowWidthNo(5);
            }
        };
        
        updateWidth();
        
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
        },[])

    if (!subreddits) {
        return <div>Loading...</div>
    };

    const handleToggle = () => {
        setSubredditToggle(!subredditToggle);
    }

    const handleSubmit = (subreddit) => {
        dispatch(changeSubreddit(subreddit.name));
        dispatch(loadPostsBySubreddit(subreddit.name));
    }

    const leftSubs = () => {
        if (minSubs > 0) {
            setSubredditLocation(50);
            setSubOpacity(0);
            setTimeout(() => {
                setMinSubs(minSubs - windowWidthNo);
                setMaxSubs(minSubs);
                setSubredditLocation(-50);
                setTimeout(() => {
                    setSubredditLocation(0);
                    setSubOpacity(1);
                }, 50);
            }, 500);
        }
    };

    const rightSubs = () => {
        if (maxSubs < subreddits.length) {
            setSubredditLocation(50);
            setSubOpacity(0);
            setTimeout(() => {
                setMinSubs(minSubs + windowWidthNo);
                setMaxSubs(minSubs + (2 * windowWidthNo));
                setSubredditLocation(-50);
                setTimeout(() => {
                    setSubredditLocation(0);
                    setSubOpacity(1);
                }, 50);
            }, 500);
        }
    };

    const leftArrowColour = (minSubs > 0) ? color : "rgb(245,245,245)";
    const rightArrowColour = (maxSubs < subreddits.length) ? color : "rgb(245,245,245)";

    return (
        <div id="footerBox">
            <div id="footerHeading" onClick={handleToggle}>
                <h2 style={{ color: color }}>{currentSub}<span style={{ color: downColor }}>.</span></h2>
            </div>
            {subredditToggle ?
                <div id="subredditList">
                    <FaAngleLeft id="subLeft" className="changeSub" onClick={leftSubs} style={{ color: leftArrowColour }} />
                    {subreddits.slice(minSubs, (minSubs + windowWidthNo)).map(subreddit => (
                        <div className="sub" key={subreddit.name} onClick={() => handleSubmit(subreddit)} style={{ left: subredditLocation, opacity: subOpacity}}>
                            <img
                                className="subredditLogo"
                                src={subreddit.icon ? subreddit.icon : redditLogo}
                                alt={`${subreddit.name} logo`}
                                
                            />
                            <h5 style={{color:subreddit.name === currentSub ? color : "black"}}>{subreddit.name}</h5>
                        </div>
                    ))}
                    <FaAngleRight id="subRight" className="changeSub" onClick={rightSubs} style={{ color: rightArrowColour }} />
                </div>
                :
                null
            }
        </div>
    );
}