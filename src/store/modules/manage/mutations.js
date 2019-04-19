import {
    MUTATION_APPOINT_SELECT_DATA, MUTATION_RESOVLE_ARTICLE_CLASSIFICATION_DATA,
    MUTATION_RESOVLE_ARTICLE_FILING_DATA, MUTATION_RESOVLE_FRESH_COMMENT_LIST_DATA, MUTATION_TRIGGER_IS_LOADING
} from "../mutation_types";

export default {
    [MUTATION_APPOINT_SELECT_DATA](state,payload) {
        state.articleFiling[payload.id] = payload.value
    },

    [MUTATION_RESOVLE_ARTICLE_FILING_DATA](state,payload) {
        state.articleFiling.filingMap = payload.filingMap
    },

    [MUTATION_RESOVLE_ARTICLE_CLASSIFICATION_DATA](state,payload) {
        state.articleClassification.labelMap = payload.labelMap
    },

    [MUTATION_RESOVLE_FRESH_COMMENT_LIST_DATA](state,payload) {
        state.freshComments.startIndex = state.freshComments.startIndex + state.freshComments.pageScale
        state.freshComments.nextPage = state.freshComments.nextPage + 1
        state.freshComments.commentList = state.freshComments.commentList.concat(payload.commentList)
        state.freshComments.maxPage = payload.maxPage
        state.freshComments.loading = false
    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload) {

        if(payload.id === 'freshComments') {
            state.freshComments.loading = payload.loading
        }

    }
}

