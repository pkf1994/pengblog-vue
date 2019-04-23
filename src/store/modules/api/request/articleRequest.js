import axios from 'axios'
import * as Api from './apiConstant'
import {AXIOS_SOURCE_REQUEST_ARTICLE} from "../source_types";
import {getToken} from "./imageRequest";

export function RequestArticleList(payload) {

    let config = {
        params: payload
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LIMITINDEX, config)
}


export const RequestArticle = (article_id) => {

    window[AXIOS_SOURCE_REQUEST_ARTICLE] = axios.CancelToken.source();

    let config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE].token,
        params: {
            article_id: article_id
        }
    }
    return axios.get(Api.API_GET_ARTICLE_BY_ID, config)
}

export const RequestArticleFilingData = () => {
    return axios.get(Api.API_GET_ARTICLE_FILING)
}

export const RequestArticleClassificationData = () => {
    return axios.get(Api.API_GET_ARTICLE_LABEL)
}

export const RequestArticleListDataBykeyword = (payload) => {

    let config = {
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            searchString: payload.searchString
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_SEARCH, config)
}

export const RequestArticleListDataByFiling = (payload) => {

    let config = {
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            selectedYear: payload.selectedYear,
            selectedMonth: payload.selectedMonth
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_FILING, config)
}

export const RequestArticleListDataByLabel = (payload) => {
    let config = {
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            article_label: payload.article_label
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LABEL, config)
}

export const SaveArticle = (payload) => {

    let token = getToken()

    let config = {
        headers:{
            Authorization: token
        }
    }

    return axios.post(Api.API_SAVE_ARTICLE,payload,config)
}

export const RequestDraftData = () => {
    let token = getToken()

    let config = {
        headers:{
            Authorization: token
        }
    }
    return axios.get(Api.API_GET_DRAFT,config)
}
