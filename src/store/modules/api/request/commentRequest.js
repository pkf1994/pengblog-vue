import axios from 'axios'
import * as Api from './apiConstant'

export function RequestTopCommentList(payload) {

    window.RequestTopCommentListOfSpecificArticleAxiosSource = axios.CancelToken.source();

    let config = {
        cancelToken: window.RequestTopCommentListOfSpecificArticleAxiosSource.token,
        params: payload
    }

    return axios.get(Api.API_GET_TOP_LEVEL_COMMENT_LIST_BY_LIMITINDEX, config)
}