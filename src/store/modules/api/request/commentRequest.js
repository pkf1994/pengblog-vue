import axios from 'axios'
import * as Api from './apiConstant'
import {getToken} from "./imageRequest";

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

export const RequestSubmitComment = (payload) => {

    return axios.post(Api.API_POST_SUBMIT_COMMENT,payload)

}

export const RequestFreshCommentListData = (payload) => {

    let config = {
        params: payload
    }

    return axios.get(Api.API_GET_FRESH_COMMENT_LIST, config)

}

export function RequestDeleteComment(payload) {

    let token = getToken()

    let config = {
        params: {
            comment_id: payload
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_DELETE_COMMENT, config)
}

export function RequestBanIP(payload) {

    const token = getToken()

    let config = {
        params: {
            ip: payload
        },
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_BAN_IP, config)
}

export function RequestLiftedIP(payload) {

    const token = getToken()

    let config = {
        params: {
            ip: payload
        },
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_LIFTED_IP, config)
}