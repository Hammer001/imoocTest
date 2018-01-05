//组件间的通信最好保持耦合,统一在index中间加入./这样的外部组件，内部最好只用组件和组件间的通信
import React from 'react'
import { connect } from 'react-redux'
import { Add, Minus, AddAsync } from './index-redux'

// const mapStatetoProps = (state)=>{
//     return {num:state}
// }
// const actionCreators = { Add, Minus, AddAsync }

@connect(
    state=>({num:state.counter}),
    { Add, Minus, AddAsync }
    // mapStatetoProps, actionCreators
)
//这一步直接简化掉整个state,和action之间的定义，都在一个connect中间完成；    
//它负责第一部接受state，并且在下一步使用方法，自动dispatch出去
class App extends React.Component {

    render() {
        // const num = this.props.num
        // const Add = this.props.Add
        // const Minus = this.props.Minus
        // const AddAsync = this.props.AddAsync
        return (
          <div>
              <h3 > now we 're being {this.props.num} </h3>
              <button onClick={this.props.Add}> + + </button>
              <button onClick={this.props.Minus}> - - </button>
              <button onClick={this.props.AddAsync}>AsyncAdd</button>
          </div>
        )
    }
}
export default App


/*
const mapStatetoProps = (state)=>{
    return {num:state}
}
const actionCreators = { Add, Minus, AddAsync }

App = connect(mapStatetoProps, actionCreators)(App)*/  //标准装饰器的作用

