import React from 'react'
import { List,InputItem,NavBar,Icon,Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList,sendMsg,recvMsg,readMsg } from '../../redux/chat-redux'
import { getChatId } from '../../utilityy';
const socket = io('ws://localhost:9090')

@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {text:'',msg:[]}
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        // socket.on('recvmsg',(data)=>{
        //     this.setState({msg:[...this.state.msg,data.text]})
        // })
    }
    componentWillUnmount(){ //解决在聊天页面接收到的消息也算做未读，该组件离开页面再加载
        const to = this.props.match.params.user  
        this.props.readMsg(to)
    }
    fixCarousel(){
        setTimeout(function(){      //ant mobile中 isCarousel的一个官方bug，用这种方法进行修复
            window.dispatchEvent(new Event('resize'))
        },0) 
    }
    handlerSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        //this.setState({text:''})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg =this.state.text
        this.props.sendMsg(from,to,msg)
        this.setState({
            text:'',
            showEmoji:false
        })
    }
    render(){
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)

        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
                        .split(' ')
                        .filter(v=>v) //防止有两个空格
                        .map(v=>({text:v}))
        return (
            <div id='chat-page'>
                <NavBar 
                  mode='dark'
                  icon={<Icon type='left' />}
                  onLeftClick={()=>{
                      this.props.history.goBack()
                  }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsg.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from===userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item 
                                className='chat-me'
                                extra={<img src={avatar} alt=''/>}
                            >{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginTop:15}}
                                        onClick={()=>{
                                            this.setState({
                                                showEmoji:!this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }}    
                                    >😀</span>
                                    <span onClick={()=>this.handlerSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>    
                    </List>
                    {this.state.showEmoji?<Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }}
                    />:null}
                    
                </div>
            </div>
            
        )
    }
}

export default Chat