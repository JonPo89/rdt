import './comments.css';
import React, { useState, useEffect } from "react";
import { loadComments, selectCommentsById, clearComments } from "./commentsSlice";
import { selectPostById } from "../posts/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { aestheticsColor } from '../aesthetics/aestheticsSlice';
import { FaRegCommentAlt } from "react-icons/fa";


export function Comments( {id} ) {
    const [toggleComments, setToggleComments] = useState(false);
    const [contentStatus, setContentStatus] = useState('hidden');
    const post = useSelector(selectPostById(id));
    const comments = useSelector(selectCommentsById(post.id));
    const upColour = useSelector(aestheticsColor);
    const colour = toggleComments? upColour : "black";

    const dispatch = useDispatch();

    useEffect(() => {
        if (toggleComments) {
            dispatch(loadComments( { id: post.id, subreddit: post.subreddit}));
        }
    }, [toggleComments, dispatch, post]);

    useEffect(() => {
        if (!toggleComments) {
            setContentStatus('hidden');
        } else if (toggleComments && !comments) {
            setContentStatus('loading');
        } else if (toggleComments && comments){
            setContentStatus('loaded');
        } else{
            setContentStatus('error');
            }
    }, [toggleComments, comments]);

    useEffect(() => {
        setToggleComments(false);
        dispatch(clearComments());
    }, [post, dispatch])

    const handleClick = () => {
        setToggleComments(!toggleComments);
    }

    const content = () => {
        switch (contentStatus) {
            case 'loaded':
                return (
                    <div className="commentsList">
                    {comments ? Object.values(comments).slice(0,10).map(comment => (
                        <div className="comment" key={comment.id}>
                            <h4 className="commentAuthor" style={{color:upColour}}>u/{comment.author}</h4>
                            <p className="commentBody">{comment.comment}</p>
                        </div>
                    )): <p>No Comments Available</p>}
                    </div>
                    
                )
            case 'loading':
                return <p>Loading...</p>;
            default:
                return null
        }
    }

    if(!post) {
        return null;
    }

    return(
        <>
            <div className="comments" onClick={handleClick}>
                <div className="commentCount" >
                    <FaRegCommentAlt className="commentLogo" />
                    <h4 className="postPrimary" style={{color:colour}}>{post.commentCount}</h4>
                </div>
                <h4 className="postSecondary" style={{color: upColour}}>{`r/${post.subreddit}`}</h4>    
            </div>
            
            {content()}
            
        </>
    )

}
