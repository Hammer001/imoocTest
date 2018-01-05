import axios from 'axios'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'

const initState = {
    isAuth: false,
    user: 'Amy',
    age: 24
}

export function auth(state = initState, action) {
    console.log(state, action)
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true }
        case LOGOUT:
            return {...state, isAuth: false }
        default:
            return state
    }
}

export function getUserData() {
    //dispatch 用来通知用户修改
    return dispatch => {
        axios.get('/data')
            .then(res => {
                if (res.status === 200) {
                    dispatch(UserData(res.data))
                }
            })
    }
}
export function UserData(data) {
    return { type: USER_DATA, payload: data }
}
export function login() {
    return { type: LOGIN }
}
export function logout() {
    return { type: LOGOUT }
}