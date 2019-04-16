import {MUTATION_RESOVLE_ARTICLE_LIST_DATA_TO_HOME, MUTATION_TRIGGER_IS_LOADING} from "../mutation_types";

export default {
    [MUTATION_RESOVLE_ARTICLE_LIST_DATA_TO_HOME](state,payload){

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
}