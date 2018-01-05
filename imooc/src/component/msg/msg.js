import React from 'react'
import { connect } from 'react-redux'
import { List,Badge } from 'antd-mobile'

@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length - 1]
    }
    render(){
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        //根据chartid进行分组
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })

        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        // console.log([1,5,6,3,9].sort(function(a,b){
        //     return a - b  正序
        //     return b - a  倒序
        // }))
        //{aaa[bbb]}  [..]当中的值是key
        return (
            <div>
                    {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from===userid?v[0].to:v[0].from  //v此时是个数组，需要提取出来
                        const unreadNum = v.filter(v=>!v.read && v.to===userid).length
                        if(!userinfo[targetId]){
                            return null
                        }
                        const name = userinfo[targetId] ? userinfo[targetId].name : ''
                        const avatar = userinfo[targetId] ? userinfo[targetId].avatar : ''
                        return(
                            <List>
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    key={lastItem._id}
                                    thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                {lastItem.connect}
                                <Brief>{userinfo[targetId].name}</Brief>
                                </Item> 
                            </List>
                        )
                    })}
            </div>
            
        )
    }
}

export default Msg