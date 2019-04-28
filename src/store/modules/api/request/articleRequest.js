import axios from 'axios'
import * as Api from './apiConstant'
import {
    AXIOS_SOURCE_REQUEST_ARTICLE, AXIOS_SOURCE_REQUEST_ARTICLE_CLASSIFICATION_DATA,
    AXIOS_SOURCE_REQUEST_ARTICLE_FILING_DATA,
    AXIOS_SOURCE_REQUEST_ARTICLE_LIST
} from "../source_types";
import {getToken} from "./imageRequest";

export function RequestArticleList(payload) {

    if(window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST]){
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].cancel('Cancel')
    }

    window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = axios.CancelToken.source();

    const token = getToken()

    let config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].token,
        params: payload,
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LIMITINDEX, config).then((res) => {
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = undefined
        return res
    })
}


export const RequestArticle = (article_id) => {

    if(window[AXIOS_SOURCE_REQUEST_ARTICLE]){
        window[AXIOS_SOURCE_REQUEST_ARTICLE].cancel('Cancel')
    }

    window[AXIOS_SOURCE_REQUEST_ARTICLE] = axios.CancelToken.source();

    let config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE].token,
        params: {
            article_id: article_id
        }
    }

    return axios.get(Api.API_GET_ARTICLE_BY_ID, config).then((res) => {
        window[AXIOS_SOURCE_REQUEST_ARTICLE] = undefined
        return res
    })
}

export const RequestArticleFilingData = () => {

    if(window[AXIOS_SOURCE_REQUEST_ARTICLE_FILING_DATA]){
        window[AXIOS_SOURCE_REQUEST_ARTICLE_FILING_DATA].cancel('Cancel')
    }

    window[AXIOS_SOURCE_REQUEST_ARTICLE_FILING_DATA] = axios.CancelToken.source();

    const token = getToken()

    const config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE_FILING_DATA].token,
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_FILING,config).then((res) => {
        window[AXIOS_SOURCE_REQUEST_ARTICLE_FILING_DATA] = undefined

        return res
    })
}

export const RequestArticleClassificationData = () => {

    if(window[AXIOS_SOURCE_REQUEST_ARTICLE_CLASSIFICATION_DATA]){
        window[AXIOS_SOURCE_REQUEST_ARTICLE_CLASSIFICATION_DATA].cancel('Cancel')
    }

    window[AXIOS_SOURCE_REQUEST_ARTICLE_CLASSIFICATION_DATA] = axios.CancelToken.source();

    const token = getToken()

    const config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE_CLASSIFICATION_DATA].token,
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LABEL,config).then((res) => {
        window[AXIOS_SOURCE_REQUEST_ARTICLE_CLASSIFICATION_DATA] = undefined

        return res
    })
}

export const RequestArticleListDataBykeyword = (payload) => {

    if(window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST]){
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].cancel('Cancel')
    }

    window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = axios.CancelToken.source();

    const token = getToken()

    const config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].token,
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            searchString: payload.searchString
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_SEARCH, config).then((res) => {
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = undefined

        return res
    })
}

export const RequestArticleListDataByFiling = (payload) => {

    if(window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST]){
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].cancel('Cancel')
    }

    window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = axios.CancelToken.source();

    const token = getToken()

    let config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].token,
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

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_FILING, config).then((res) => {
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = undefined

        return res
    })
}

export const RequestArticleListDataByLabel = (payload) => {

    if(window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST]){
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].cancel('Cancel')
    }

    window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = axios.CancelToken.source();

    const token = getToken()

    let config = {
        cancelToken: window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST].token,
        params: {
            startIndex: payload.startIndex,
            pageScale: payload.pageScale,
            article_label: payload.article_label
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LABEL, config).then((res) => {
        window[AXIOS_SOURCE_REQUEST_ARTICLE_LIST] = undefined

        return res
    })
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

