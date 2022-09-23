import * as types from '../actions/actionTypes'
import initialState from './initialState';

// Reducer 根据传入的action修改state
// 默认状态的 state 是空 array
export default function authorReducer(state = initialState.authors, action) {
    // 匹配 action
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            // console.log("Load Authors successed")
            return action.authors;
        default:
            // console.log("Load Authors failed")
            return state;
    }
} 