import {
    MUTATION_APPOINT_CONTEXT,
    MUTATION_APPOINT_SELECT_DATA,
    MUTATION_APPOINT_SELECTED_LABEL, MUTATION_RECORD_ARTICLE_JUST_DELETED,
    MUTATION_RESET_CENTRAL_CONTROLLER,
    MUTATION_RESOLVE_ARTICLE_CLASSIFICATION_DATA,
    MUTATION_RESOLVE_ARTICLE_FILING_DATA,
    MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    MUTATION_RESOLVE_FRESH_COMMENT_LIST_DATA,
    MUTATION_TRIGGER_IS_LOADING
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
        state.articleListDeleted.push(payload)
    }
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

