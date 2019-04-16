export default {

    mutation_triggerShowModal(state,payload){
        state.show = payload.show
        payload.context && (state.context = payload.context)
        payload.postHandler && (state.postHandler = payload.postHandler)

    },

    mutation_triggerIsLoading(state,payload){
        if(payload.id === 'modal'){
            state.loading = payload.loading
        }
    }

}
