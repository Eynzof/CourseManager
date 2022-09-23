import * as types from "../actions/actionTypes";
import initialState from "./initialState";

// 取倒数8位字符串
function actionTypeEndsInSuccess(type) {
    console.log("Action Success")
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(
  state = initialState.apiCallInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
      // false -> true
    return state + 1;
  } else if (action.type == types.API_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
