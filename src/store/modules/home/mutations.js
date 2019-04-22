import {
    MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_HOME,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_APPOINT_CONTEXT, MUTATION_RESET
} from "../mutation_types";

export default {

    [MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_HOME](state,payload){

        state.articleList = state.articleList.concat(payload.articleList)

        state.maxPage = payload.maxPage

        state.startIndex = state.startIndex + state.pageScale

        state.nextPage = state.nextPage + 1

        state.loadingMore = false

    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload){
        if(payload.id === 'home_article'){
            state.loadingArticleDetail = payload.loading
        }
        if(payload.id === 'home_forMore'){
            state.loadingMore = payload.loading
        }
    },

    [MUTATION_APPOINT_CONTEXT](state,payload) {
        if(payload.id === 'home'){

            if(payload !== state.context){
                state.startIndex = 0
                state.nextPage = 1
                state.articleList = []
            }

            state.context = payload.context
        }

    },

    [MUTATION_RESET](state,payload) {
        if(payload.id === 'home') {
            state.startIndex = 0
            state.nextPage = 1
            state.articleList = []
        }
    }
}