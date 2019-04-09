export default {

    mutation_resolveArticle_api(state,payload){
        state.article = payload.article
        state.isLoading = false
    },

    mutation_triggerIsLoading(state,payload){
        if(payload.id === 'article'){
            state.isLoading = payload.isLoading
        }
    }
}