import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            posts: [],
            search:'',
            userposts: true
        }
    }
    componentDidMount(id){
        axios.get(`/api/posts/${id}`).then( res => {
            this.setState({
                posts: res.data
            })
        })
    }

    updateSearch(val){
        this.setState({
            search: val
        })
    }
    render(){
        const { user } = this.props;
        const displayPosts = this.state.posts.map(post =>{
            return (
                <div>
                <h1>{post.title}</h1>
                <h2>{post.author}</h2>
                <img src = {post.profilePic} />
                </div>
            )
        })
        return (
            <div>
                <div>Dashboard</div>
                <input onChange={e=> this.updateSearch(e.target.value)} />
                <button>Search</button>
                <button>Reset</button>
                <div>My Posts</div>
                <input type='checkbox' />
                {displayPosts}
            </div>

        )
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(Dashboard);