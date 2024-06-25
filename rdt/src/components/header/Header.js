import React from 'react';
import { Search } from '../../features/search/Search';
import { changeColour, aestheticsColor, aestheticsDownColor } from '../../features/aesthetics/aestheticsSlice';
import { useDispatch, useSelector } from 'react-redux';
import redditLogo from '../0img/redditlogo.png';

export function Header() {
    const dispatch = useDispatch();
    
    let logoColor = useSelector(aestheticsColor);
    let downColor = useSelector(aestheticsDownColor);
    
    const changeAestheticsColor = () => {
        dispatch(changeColour());
        
    };

    
    return (
        <header className="AppHeader">
            <div 
                className="logo" 
                id="redditLogo" 
                onClick={changeAestheticsColor} 
                style={{backgroundColor:logoColor}}
            >
                <img src={redditLogo} alt="reddit logo" />
            </div>
            <div>
                <h2 id="rdtHeading" style={{color:logoColor}}>rdt<span style={{color:downColor}}>.</span></h2>
                <Search />
            </div>
            <div 
                className="logo" 
                id="JP"
                style={{backgroundColor:logoColor}}
                onClick={changeAestheticsColor} 
            >

            </div>
        </header>
    )
}