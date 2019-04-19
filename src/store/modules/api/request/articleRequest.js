import axios from 'axios'
import * as Api from './apiConstant'

export function RequestArticleList(payload) {

    let config = {
        params: payload
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LIMITINDEX, config)
}


export const RequestArticle = (article_id) => {

    window.RequestArticleAxiosSource = axios.CancelToken.source();

    let config = {
        cancelToken: window.RequestArticleAxiosSource.token,
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