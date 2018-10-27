import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { loginUser } from '../../ducks/reducer';

class Auth extends Component {
    constructor(){
        super();
        this.state= {
            loading: true,
            error: null
        }
      }
      
      componentDidMount(){
        axios.get('/api/user').then(res => {
            console.log(res)
          this.props.loginUser(res.data);
        }).catch(error=>{
            this.setState({error})
        }).then( ()=> {this.setState({ loading: false }) })
      }

    // login = () => {
    //     const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    //     const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    //     window.location = url;
    // }
    render(){
        console.log(this.props);
        const { loading, error } = this.state;
        const { user } = this.props;
        const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;

        return (
            <div>
                <h1>Auth</h1>
                {loading? 
                <div>Loading...</div> 
                : error 
                    ? <div>There was an error loading</div>
                    : user
                        ?<div>
                            <div>Name: {user.name}</div>
                            <img src ={user.picture} alt='user' />
                        </div>
                        : <div>You need to <a href={url}>login</a></div>
            }
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {loginUser})(Auth);