export default {
    mutation_appointInput(state,payload){

        if(payload.commentEditorId !== 'subCommentEditor'){
            return
        }

        let targetInput = state[payload.id]

        payload.value !== undefined && (targetInput.value = payload.value)

        payload.showWarn !== undefined && (targetInput.showWarn = payload.showWarn)

        payload.warnMsg !== undefined && (targetInput.warnMsg = payload.warnMsg)

    },
    mutation_triggerIsLoading(state,payload) {
        if(payload.id === 'subCommentEditor') {
            state.loading = payload.loading
        }
    }
}

