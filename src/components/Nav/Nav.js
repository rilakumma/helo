import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


function Nav(props){

    // const { user } = this.props;
    return(
        <div>
        {/* <img src = {props.picture} />
        <div> {props.name} </div> */}
        <Link to='/dashboard'>Home</Link>
        <Link to='/post/:postid'>New Post</Link>
        <Link to='/'>Logout</Link>
        {console.log(props)}
        
        </div>
    )
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(Nav);
