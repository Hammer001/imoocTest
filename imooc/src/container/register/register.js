import React from 'react'
import Logo from '../../component/logo/logo'
import { List,InputItem,WingBlank,Radio,WhiteSpace,Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user-redux'
import immocForm from '../../component/immoc-form/immoc-form.js'

@connect(
    state=>state.user,
    {register}
)
@immocForm
class Register extends React.Component {
    constructor(props){
        super(props)
        // this.props.state = {
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:'genius' //OR boss
        // }
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    handleRegister(){
        this.props.register(this.props.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} /> :null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem
                    onChange={v=>this.props.handleChange('user',v)}
                    >用户</InputItem>
                        <WhiteSpace />
                    <InputItem
                    type='password'
                    onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                        <WhiteSpace />
                    <InputItem
                    type='password'
                    onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                        <WhiteSpace />
                    <RadioItem 
                    checked={this.props.state.type === 'genius'}
                    onChange={()=>this.props.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                        <WhiteSpace />
                    <RadioItem 
                    checked={this.props.state.type === 'boss'}
                    onChange={()=>this.props.handleChange('type','boss')}
                    >
                        BOSS
                    </RadioItem>
                        <WhiteSpace />
                    <WingBlank>
                        <Button onClick={this.handleRegister} type='primary'>注册</Button>
                    </WingBlank>
                </List>
            </div>
        )
    }
}

export default Register