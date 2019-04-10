import {MUTATION_TRIGGER_IS_LOADING} from "../api/mutationTypeConstant";

export default {
    mutation_resolveArticleListDataToHome_api(state,payload){

        state.articleList = state.articleList.concat(payload.articleList)

        state.maxPage = payload.maxPage

        state.startIndex = state.startIndex + state.pageScale

        state.nextPage = state.nextPage + 1

        state.loadingMore = false

    },

    mutation_triggerIsLoading(state,payload){
        if(payload.id === 'home_article'){
            state.loadingArticleDetail = payload.loading
        }
        if(payload.id === 'home_forMore'){
            state.loadingMore = payload.loading
        }
    },
}