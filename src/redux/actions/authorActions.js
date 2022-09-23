import * as types from './actionTypes';
import * as authorApi from "../../api/authorApi"
import { beginApiCall } from './apiStatusActions';
// action
export function loadAuthorSuccess(authors) {
    // debugger;
    return { type: types.LOAD_AUTHORS_SUCCESS, authors};
}

// Action dispatcher
// Action -> Reducer -> React
export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall);
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorSuccess(authors));
        }).catch(error => {
            throw error;
        })
    }
}
