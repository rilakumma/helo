import React, {Component} from 'react';

export default class Auth extends Component {
    constructor(){
        super();
        this.state={
            username: '',
            password:''
        }
    }
    updateUsername(val){
        this.setState({
            username: val
        })
    }
    updatePassword(val){
        this.setState({
            password: val
        })
    }
    render(){
        return (
            <div>
            <div>Auth</div>
            <input onChange={e => this.updateUsername(e.target.value)} />
            <input onChange={e=> this.updatePassword(e.target.value)} />
            <button>Login</button>
            <button>Register</button>
            </div>
        )
    }
}