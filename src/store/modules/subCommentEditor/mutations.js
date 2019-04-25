import {
    MUTATION_APPOINT_INPUT,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_APPOINT_REFERING_COMMENT,
    MUTATION_RESET
} from "../mutation_types";

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
    },
    [MUTATION_APPOINT_REFERING_COMMENT](state,payload) {
        state.referingComment = payload.comment
        payload.comment && (state.content.value = '回复  ' + payload.comment.comment_author.visitor_name + ' : ')
    },
    [MUTATION_RESET](state,payload) {
        if(payload.id === 'subCommentEditor')
            state.content.value = ''
    }
}

