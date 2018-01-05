import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import { logout } from './auth-redux.js'

function Num1(){
    return <h3>Number1</h3>
}
function Num2(){
    return <h3>Number2</h3>
}

@connect(
    state=>state.auth,
    {logout}
)
class Dashboard extends React.Component{
    render(){
        console.log(this.props)
        const match = this.props.match
        console.log(match)
        const redirectToLogin = <Redirect to='/login' />
        const app = (
        <div>
            {this.props.isAuth? <button onClick={this.props.logout}>注销</button> : null}
           <ul>
                <li>
                    <Link to={`${match.url}`}>数字0</Link>
                </li>
                <li>
                    <Link to={`${match.url}/num1`}>数字1</Link>
                </li>
                <li>
                    <Link to={`${match.url}/num2`}>数字2</Link>
                </li>
            </ul> 
            <Route path={`${match.url}`} exact component={App}></Route> 
            <Route path={`${match.url}/num1`} component={Num1}></Route>
            <Route path={`${match.url}/num2`} component={Num2}></Route>
        </div>
        )
        return this.props.isAuth ? app:redirectToLogin
    }
}

export default Dashboard

//使用match.url因为，param 中可能会带有参数