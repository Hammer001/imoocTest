const ADD = 'add'
const MINUS = 'minus'

//reducer
export function counter(state = 10, action) {
    switch (action.type) {
        case ADD:
            return state + 1
        case MINUS:
            return state - 1
        default:
            return state
    }
}

//action creator
export function Add() {
    return { type: ADD }
}
export function Minus() {
    return { type: MINUS }
}
export function AddAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(Add())
        }, 2000)
    }
}