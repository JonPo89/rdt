import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Search.css';
import { FaSearch } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { searchFor, loadPostsBySubreddit } from "../posts/postSlice";
import { selectCurrentSubreddit } from '../subreddit/subredditSlice';

export function Search() {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const currentSubreddit = useSelector(selectCurrentSubreddit);
    const [toggleSearch, setToggleSearch] = useState(true);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (search.length > 0) {
            dispatch(searchFor(search));
            setSearch("");
            setToggleSearch(false);
        }
    }

    const onReturn = () => {
        setToggleSearch(true);
        dispatch(loadPostsBySubreddit(currentSubreddit));
    }


    return (
        <div className="search">
            <input type="text" placeholder="Search" id="searchBar" value={search} onChange={handleChange}/>
            {toggleSearch ? 
            <FaSearch className="searchButton" onClick={onSubmit}/>
            :
            <TiCancel className="searchButton" onClick={onReturn}/>
            }
        </div>
    )
}