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
            <a href="https://jonporterfolio.com" target="_blank" rel="norefferer">
                <div 
                    className="logo" 
                    id="JP"
                    style={{border: "2px solid " + logoColor}}
                    onClick={changeAestheticsColor} 
                >
                    <h3 style={{color:logoColor}}>Jon Porter</h3>
                </div>
            </a>
        </header>
    )
}