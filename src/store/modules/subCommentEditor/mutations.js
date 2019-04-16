import {MUTATION_APPOINT_INPUT, MUTATION_TRIGGER_IS_LOADING} from "../mutation_types";

export default {
    [MUTATION_APPOINT_INPUT](state,payload){

        if(payload.commentEditorId !== 'subCommentEditor'){
            return
        }

        let targetInput = state[payload.id]

        payload.value !== undefined && (targetInput.value = payload.value)

        payload.showWarn !== undefined && (targetInput.showWarn = payload.showWarn)

        payload.warnMsg !== undefined && (targetInput.warnMsg = payload.warnMsg)

    },
    [MUTATION_TRIGGER_IS_LOADING](state,payload) {
        if(payload.id === 'subCommentEditor') {
            state.loading = payload.loading
        }
    }
}

