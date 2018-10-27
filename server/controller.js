const axios = require('axios');
module.exports ={
    logout: (req,res)=>{
        res.session.destroy();
        res.status.json({message: 'Successfully logged out, see ya next time!'});
    },
    getUser: (req,res) =>{
            res.status(200).json(req.session.user);
        
    },
    getPosts: (req,res)=>{
        return req.app.get('db').get_posts().then(posts=>{
            res.status(200).json(posts);
        })
    },
    getPost: (req,res)=>{
        const { author_id } = req.params;
        return req.app.get('db').get_post({author_id: author_id}).then(posts=>{
            res.status(200).json(posts);
        })
    },
    handleLogin: (req,res) =>{
        exchangeCodeForAccessToken()
            .then(exchangeAccessTokenForInfo)
            .then(storeUserInfoInDatabase)
            .catch(error=>{
                console.error('Problem occured in login 0.0', error);
                res.status(500).send('An unexpected error has occured');
            })
        function exchangeCodeForAccessToken(){
            const payload = {
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code: req.query.code,
                grant_type: 'authorization_code',
                redirect_uri: `http://${req.headers.host}/auth/callback`
            };
            // console.log('payload', payload);
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
        }
        function exchangeAccessTokenForInfo(accessTokenRes){
            const accessToken = accessTokenRes.data.access_token;
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
        }
        function storeUserInfoInDatabase(userDataRes){
            const userData = userDataRes.data;
            return req.app.get('db').get_user({auth0_id: userData.sub}).then(users=>{
                if(users.length){
                    const user=users[0];
                    req.session.user = user;
                    res.redirect('/dashboard');
                } else {
                    return req.app.get('db').add_user({auth0_id: userData.sub, name: userData.name, picture: userData.picture})
                    .then(newUsers=>{
                        const newUser = newUsers[0];
                        req.session.user = newUser;
                        res.redirect('/dashboard');
                    }).catch(error=>{
                        console.error('Error storing user in database', error);
                        res.status(500).send('Error on server')
                    })
                }
            })
    }
}
}