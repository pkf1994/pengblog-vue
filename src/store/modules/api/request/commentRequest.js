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

export function RequestSubCommentList(payload) {

    let config = {
        params: payload
    }

    return axios.get(Api.API_GET_SUB_COMMENT_LIST, config)
}

export const CheckWhetherNeedCaptcha = () => {
    return axios.get(Api.API_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT)
}