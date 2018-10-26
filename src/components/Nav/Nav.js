import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav(){
    
    return(
        <div>
        <div>Nav</div>
        <Link to='/dashboard'>Home</Link>
        <Link to='/post/:postid'>New Post</Link>
        <Link to='/'>Logout</Link>
        </div>
    )
}