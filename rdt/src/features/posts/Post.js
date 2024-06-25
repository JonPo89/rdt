import React, { useState, useEffect, useRef} from "react";
import { selectPostById, selectIsPostLoading } from "./postSlice";
import { useSelector } from "react-redux";
import './post.css';
import { aestheticsColor, aestheticsDownColor } from '../../features/aesthetics/aestheticsSlice';
import { Comments } from "../comments/Comments";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export function Post( {id} ) {
    const post = useSelector(selectPostById(id));
    const upColour = useSelector(aestheticsColor);
    const downColour = useSelector(aestheticsDownColor);
    const [minimise, setMinimise] = useState(true);
    const [opacitySet, setOpacitySet] = useState(1);
    const [locationSet, setLocationSet] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [ voteColour, setVoteColour ] = useState("black");
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [canMinimise, setCanMinimise] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const isLoading = useSelector(selectIsPostLoading);
    

    const contentRef = useRef(null);

    const downVoteColor = downvoted ? downColour : "rgb(245, 245, 245)";
    const upVoteColor = upvoted? upColour : "rgb(245, 245, 245)";

    const postHeight = minimise ? "200px" : "1000px";

    useEffect(() => {
        setMinimise(true);
    }, [post.id])

    useEffect(() => {
        if (isLoading) {
            setOpacitySet(0);
            setLocationSet(-1000);
        } else {
            setOpacitySet(1);
            setLocationSet(0);
        }
    },[isLoading]);

    useEffect(() => {
        if (contentRef.current) {
            setCanMinimise(contentRef.current.scrollHeight > 200);
        }
    }, [imageLoaded, post.id])

    const minimiseContent = () => {
        if (canMinimise){
            setMinimise(!minimise);
        
        }
    }

    const upvote = () => {
        if (!upvoted) {
            setUpvoteCount(1);
            setVoteColour(upColour);
        } else {
            setUpvoteCount(0);
            setVoteColour("black");
        }
        setUpvoted(!upvoted);
        setDownvoted(false);
        
    };

    const downvote = () => {
        if (!downvoted) {
            setUpvoteCount(-1);
            setVoteColour(downColour);
        } else {
            setUpvoteCount(0);
            setVoteColour("black");
        }
        setDownvoted(!downvoted);
        setUpvoted(false);
        
        
    };  

    if (!post){
        return null;
    }

    return (
        <div className="post" style={{opacity:opacitySet, left:locationSet}}>
            <div className="postBox" key={id}>
                <div className="votes">
                    <FaAngleUp className="vote" style={{backgroundColor:upVoteColor, border:`1px solid ${upColour}`}} onClick={upvote}/>
                    <h4 className="voteCount" style={{color:voteColour}}>{post.upvotes + upvoteCount}</h4>
                    <FaAngleDown className="vote" style={{backgroundColor:downVoteColor, border:`1px solid ${downColour}`}} onClick={downvote}/>  
                </div>
                <div className="mainContent" >
                    <div className="postHeading">
                        <h4 className="postPrimary">{post.title}</h4>
                        <h4 className="postSecondary" style={{color: upColour}}>u/{post.author}</h4>
                    </div>
                    <div ref = {contentRef} className = {`content ${minimise && canMinimise ? 'overlay' : ''}`} style={{maxHeight:postHeight}} onClick={minimiseContent} >
                        {post.image ? 
                            <img 
                                className="postImage" 
                                src={post.image} 
                                alt={`Post ${post.title}`}  
                                onLoad={() => setImageLoaded(true)}  
                            />
                        :
                            <p className="postText">{post.selfText}</p>
                        }
                    </div>
                    <Comments id={id}/>
                </div>
                
                
                
            </div>
        </div>
    );
}

