import axios from 'axios'
import * as Api from './apiConstant'
import {AXIOS_SOURCE_REQUEST_ARTICLE} from "../source_types";
import {getToken} from "./imageRequest";

export function RequestArticleList(payload) {

    const token = getToken()

    let config = {
        params: payload,
        headers: {
            Authorization: token
        }
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

    const token = getToken()

    const config = {
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_FILING,config)
}

export const RequestArticleClassificationData = () => {

    const token = getToken()

    const config = {
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LABEL,config)
}

export const RequestArticleListDataBykeyword = (payload) => {

    const token = getToken()

    const config = {
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            searchString: payload.searchString
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_SEARCH, config)
}

export const RequestArticleListDataByFiling = (payload) => {

    const token = getToken()

    let config = {
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            selectedYear: payload.selectedYear,
            selectedMonth: payload.selectedMonth
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_FILING, config)
}

export const RequestArticleListDataByLabel = (payload) => {

    const token = getToken()

    let config = {
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            article_label: payload.article_label
        },
        headers: {
            Authorization: token
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

export const RequestDeleteArticle = (payload) => {

    let token = getToken()

    let config = {
        params: {
            article_id: payload
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_DELETE_ARTICLE, config)
}

export const RequestDeleteArticleList = (payload) => {

    let token = getToken()

    let deleteArticleListData = {
        articleIdListString: JSON.stringify(payload)
    }

    let config = {
        headers: {
            Authorization: token
        }
    }

    return axios.post(Api.API_DELETE_ARTICLE_LIST, deleteArticleListData, config)

}

export const RequestRecoverArticle = (payload) => {
    let token = getToken()

    let config = {
        params: {
            article_id: payload
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_RECOVER_ARTICLE, config)
}

export const RequestDestroyAllArticleDeleted = () => {

    let token = getToken()

    let config = {
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_DESTROY_ALL_DELETED_ARTICLE, config)

}

export const RequestDestroyArticle = (payload) => {

    let token = getToken()

    let config = {
        params: {
            article_id: payload
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_DESTROY_ARTICLE, config)

}

