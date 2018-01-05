import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user-redux'
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if(res.status === 200){
                    if(res.data === 0){
                        //有登录信息的
                        this.props.loadData(res.data.data)
                    }else{
                        this.props.history.push('/login')
                         //console.log(this.props.history)因为该文件不带路由功能，所以要新添加
                    }
                }
            })
        /*是否登录
        现在的url地址
        login不需要跳转
        用户的type，是牛人还是boss
        用户是否完善信息（选择头像，或是个人简介）*/
    }
    render (){
        return null
    }
}

export default AuthRoute