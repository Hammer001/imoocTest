import React from 'react'
import { connect } from 'react-redux'
import { login,getUserData } from './auth-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

@connect(
    state=>state.auth,
    {login,getUserData}
)

class Auth extends React.Component{
    //以下是没有redux的时候使用的调用数据的方法
/*    constructor(props){
        super(props)
        this.state = {data:{}}
    }*/
    componentDidMount(){
        this.props.getUserData()
        // axios.get('/data')
        //     .then(res=>{
        //         if(res.status === 200){
        //             this.setState({data:res.data})
        //         }
        //     })
    }
    render(){
        return (
            <div>
                <h2>My Name is {this.props.user}, Age is {this.props.age}</h2>
                {this.props.isAuth? <Redirect to='/dashboard' /> : null}
                <h2>无权登录</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Auth