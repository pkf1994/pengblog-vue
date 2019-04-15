export default {

    mutation_triggerShowModal(state,payload){
        state.show = payload.show
        state.context = payload.context
        payload.postHandler && (state.postHandler = payload.postHandler)
        if(state.context === 'modal'){
            state.commentEditorVM = payload.commentEditorVM
            state.commentEditorId = payload.commentEditorId
        }
    },

    mutation_triggerIsLoading(state,payload){
        if(payload.id === 'modal'){
            state.loading = payload.loading
        }
    }

}
