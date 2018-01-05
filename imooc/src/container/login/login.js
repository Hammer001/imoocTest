import React from 'react'
import Logo from '../../component/logo/logo'
import { List,InputItem,WingBlank,WhiteSpace,Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user-redux'
import { Redirect } from 'react-router-dom'
import immocForm from '../../component/immoc-form/immoc-form.js'

@connect(
    state=>state.user,
    {login}
)
@immocForm
class Login extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     user:'',
        //     pwd:''
        // }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    register(){
        console.log(this.props)
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!=='/login')? <Redirect to={this.props.redirectTo} /> :null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem
                         onChange={v=>this.props.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('pwd',v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login