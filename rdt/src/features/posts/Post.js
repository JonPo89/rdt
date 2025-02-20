import React, { useRef, useEffect} from "react";
import { selectPostById, setActivePost, selectActivePost, selectPosts } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";
import './post.css';
import { aestheticsColor } from '../../features/aesthetics/aestheticsSlice';
import parse from 'html-react-parser';
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export function Post( {id} ) {
    const dispatch = useDispatch();
    const post = useSelector(selectPostById(id));
    const upColour = useSelector(aestheticsColor);
    const activePost = useSelector(selectActivePost);
    const posts= useSelector(selectPosts);
    
    const contentRef = useRef(null);
    
    const changePostClick = (no) => {
        if ((no) < 0 || (no) >= posts.length) return;
        dispatch(setActivePost(posts[no].id));
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (activePost !== null && activePost === post.id){
                if (event.key === "ArrowRight") {
                    changePostClick(Number(id)+1)
                } else if (event.key === "ArrowLeft") {
                    changePostClick(Number(id)-1)
                } else if (event.key === "Escape") {
                    dispatch(setActivePost(null))
                }
            }
            
        }
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    
    },[activePost, id, posts, dispatch, changePostClick, post.id])


    const parsedSelfText = typeof post.selfText === 'string' ? parse(post.selfText.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")) : null;
    
    

    if (!post){
        return null;
    }    

    return (
        <div className={`post ${post.id === activePost? "active" : ""}`}  
            style={{transition: activePost === null ? 'all 0.5s;' : 'all 0s'}}
        >
            {post.id === activePost ?
                <div onClick={()=>changePostClick(Number(id)-1)}>
                    <IoIosArrowDropleft className="arrow" style={{color:id<1?'white':''}}/>
                </div>
                    :
                    null
                
            }
            
            <div ref = {contentRef} 
                className = {`content ${post.id === activePost? "active" : ""}`} 
                onClick={()=> dispatch(setActivePost(post.id === activePost? null : post.id))}
                style={{transition: activePost === null ? 'all 0.5s;' : 'all 0s'}}
                >
            {post.id === activePost || (post.type !== 'i.redd.it' && post.type !== 'v.redd.it') ?
                            <h4 style={{color:upColour}}>{post.title}</h4>
                        
                    : null
                    }
                
                {post.image && post.type ==='i.redd.it' ? 
                    <>
                    
                    <img 
                        className={`postImage ${post.id === activePost? "active" : ""}` }
                        src={post.image} 
                        alt={`Post ${post.title}`}  
                    />
                    
                    </>
                    :
                    post.video && post.type === 'v.redd.it'?
                    <>
                    
                    <video
                        className={`postVideo  ${post.id === activePost? "active" : ""}`}
                        controls
                        src={post.video.reddit_video.fallback_url.replace('?source=fallback','')}
                        alt={`Post ${post.title}`}
                    />
                    
                    </>
                    :
                    post.selfText ?
                    <>
                        
                        <div className={`postText ${post.id === activePost? "active" : ""}`}>
                            {parsedSelfText}
                            
                        </div>
                            
                         
                    </>
                    :
                    <>
                        
                        <a
                            href={post.url}
                            className={`postLink ${post.id === activePost? "active" : ""}` }
                            target="_blank" 
                            rel="noreferrer"
                        >
                            {post.thumbnail.includes(".jpg"||".png")?
                                <img src={post.thumbnail} alt={`${post.title}`}/>
                            :null}
                            
                            <FaExternalLinkAlt style={{color:'upColour'}}/>
                        </a>
                            
                        
                    </>   
                }
                
                
            </div>
            <div onClick={()=>changePostClick(Number(id)+1)}>
            {post.id === activePost ?
                    <IoIosArrowDropright className="arrow" style={{color:id>(posts.length -2)?'white':''}}/>
                    :
                    null
                }
            </div>
        </div>
    );
}

