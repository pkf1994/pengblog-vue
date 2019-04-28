import {
    MUTATION_APPOINT_CONTEXT,
    MUTATION_APPOINT_ARTICLE_LIST_SELECTED,
    MUTATION_APPOINT_SELECT_DATA,
    MUTATION_APPOINT_SELECTED_LABEL,
    MUTATION_RECORD_ARTICLE_JUST_DELETED,
    MUTATION_RESET_CENTRAL_CONTROLLER,
    MUTATION_RESOLVE_ARTICLE_CLASSIFICATION_DATA,
    MUTATION_RESOLVE_ARTICLE_FILING_DATA,
    MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    MUTATION_RESOLVE_FRESH_COMMENT_LIST_DATA,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_MULTI_SELECTING,
    MUTATION_RECORD_COMMENT_JUST_DELETE,
    MUTATION_RECORD_ARTICLE_JUST_RECOVER,
    MUTATION_RECORD_ARTICLE_JUST_DESTROY,
    MUTATION_RECORD_COMMENT_JUST_BAN,
    MUTATION_RECORD_COMMENT_JUST_LIFTED
} from "../mutation_types";

export default {
    [MUTATION_APPOINT_SELECT_DATA](state,payload) {
        if(payload.articleFilingId === 'manage'){
            state.articleFiling[payload.selectId] = payload.value
        }
    },

    [MUTATION_RESOLVE_ARTICLE_FILING_DATA](state,payload) {
        state.articleFiling.filingMap = payload.filingMap
    },

    [MUTATION_RESOLVE_ARTICLE_CLASSIFICATION_DATA](state,payload) {
        state.articleClassification.labelMap = payload.labelMap
    },

    [MUTATION_RESOLVE_FRESH_COMMENT_LIST_DATA](state,payload) {
        state.freshComments.startIndex = state.freshComments.startIndex + state.freshComments.pageScale
        state.freshComments.nextPage = state.freshComments.nextPage + 1
        state.freshComments.commentList = state.freshComments.commentList.concat(payload.commentList)
        state.freshComments.maxPage = payload.maxPage
        state.freshComments.loading = false
        state.freshComments.count = payload.count
    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload) {

        if(payload.id === 'manage_freshComments') {
            state.freshComments.loading = payload.loading
        }

        if(payload.id === 'manage_articleClassification') {
            state.articleClassification.loading = payload.loading
        }

        if(payload.id === 'managePage') {
            state.loading = payload.loading
        }

        if(payload.id === 'manage_articleFiling') {
            state.articleFiling.loading = payload.loading
        }

    },

    [MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE](state,payload) {
        state.articleList = payload.articleList
    },

    [MUTATION_APPOINT_CONTEXT](state,payload){
        if(payload.id === 'managePage'){
            state.context = payload.context
        }

    },

    [MUTATION_APPOINT_SELECTED_LABEL](state,payload){
        if(payload.articleClassificationId === 'manage'){
            state.articleClassification.selectedLabel = payload.value
        }
    },

    [MUTATION_RESET_CENTRAL_CONTROLLER](state,payload){
        if(payload !== 'articleFiling'){
            state.articleFiling.selectedYear = undefined
            state.articleFiling.selectedMonth = undefined
        }
        if(payload !== 'articleClassification'){
            state.articleClassification.selectedLabel = undefined
        }
    },

    [MUTATION_RECORD_ARTICLE_JUST_DELETED](state,payload) {
        state.articleList.forEach((item) => {
            if(item.article_id === payload) {
                item.isDeleted = true
            }
        })
    },

    [MUTATION_RECORD_ARTICLE_JUST_RECOVER](state,payload) {
        state.articleList.forEach((item) => {
            if(item.article_id === payload) {
                item.isDeleted = false
            }
        })
    },

    [MUTATION_APPOINT_ARTICLE_LIST_SELECTED](state,payload) {
        if(payload.select) {
            state.articleListSelected.push(payload.article_id)
        }
        if(!payload.select) {
            const index = state.articleListSelected.indexOf(payload.article_id)
            if(index > -1) {
                state.articleListSelected.splice(index,1)
            }
        }
    },

    [MUTATION_TRIGGER_MULTI_SELECTING](state,payload) {
        state.multiSelecting = payload
    },

    [MUTATION_RECORD_COMMENT_JUST_DELETE](state,payload) {

        let deleteArray = []

        state.freshComments.commentList.forEach((item) => {
            if(item.comment_id === payload || (item.comment_referComment && item.comment_referComment.comment_id === payload)) {
                deleteArray.push(item)
            }
        })

        for(let i = 0; i < deleteArray.length; i++) {
            state.freshComments.commentList.forEach((item,index) => {
                if(item.comment_id === deleteArray[i].comment_id) {
                    state.freshComments.commentList.splice(index,1)
                }
            })
        }

        state.freshComments.startIndex = state.freshComments.startIndex - deleteArray.length

        state.freshComments.count = state.freshComments.count - deleteArray.length

        if(Math.ceil(state.freshComments.count/state.freshComments.pageScale) < state.freshComments.maxPage) {
            state.freshComments.maxPage = Math.ceil(state.freshComments.count/state.freshComments.pageScale)
            state.freshComments.nextPage = state.freshComments.nextPage - 1
        }
    },

    [MUTATION_RECORD_ARTICLE_JUST_DESTROY](state,payload) {

        state.articleList.forEach((item,index) => {
            if(item.article_id === payload) {
                state.articleList.splice(index,1)
            }
        })

    },

    [MUTATION_RECORD_COMMENT_JUST_BAN](state,payload) {

        state.freshComments.commentList.forEach((item,index) => {
            if(item.comment_ip.ip_ip === payload) {
                item.comment_ip.ip_isBanned = true
            }
        })

    },

    [MUTATION_RECORD_COMMENT_JUST_LIFTED](state,payload) {

        state.freshComments.commentList.forEach((item,index) => {
            if(item.comment_ip.ip_ip === payload) {
                item.comment_ip.ip_isBanned = false
            }
        })
    },
}

const resetState = {
    articleList: [],
    pageScale: 6,
    loading: false,
    context: 'common',
    articleFiling: {
        filingMap: {},
        selectedYear: undefined,
        selectedMonth: undefined,
        loading: false
    },
    articleClassification: {
        labelMap: [],
        loading: true,
        selectedLabel: undefined
    },
    freshComments: {
        commentList: [],
        startIndex: 0,
        nextPage: 1,
        maxPage: 1,
        pageScale: 5,
        loading: false
    }
}

