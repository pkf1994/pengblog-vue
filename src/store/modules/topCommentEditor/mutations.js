import {
    MUTATION_APPEND_TO_COMMENT_EDITOR,
    MUTATION_APPOINT_INPUT, MUTATION_RESET,
    MUTATION_TRIGGER_IS_LOADING
} from "../mutation_types";

export default {
    [MUTATION_APPOINT_INPUT](state,payload){

        if(payload.commentEditorId !== 'topCommentEditor'){
            return
        }

        let targetInput = state[payload.id]

        payload.value !== undefined && (targetInput.value = payload.value)

        payload.showWarn !== undefined && (targetInput.showWarn = payload.showWarn)

        payload.warnMsg !== undefined && (targetInput.warnMsg = payload.warnMsg)

    },
    [MUTATION_TRIGGER_IS_LOADING](state,payload) {
        if(payload.id === 'topCommentEditor') {
            state.loading = payload.loading
        }
    },
    [MUTATION_APPEND_TO_COMMENT_EDITOR](state, payload) {
        if(payload.commentEditorId === 'topCommentEditor') {
            state.content.value = state.content.value + payload.value
        }
    },
    [MUTATION_RESET](state,payload) {
        if(payload.id === 'topCommentEditor')
        state.content.value = ''
    }
}

