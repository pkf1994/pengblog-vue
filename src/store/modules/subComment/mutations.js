import {MUTATION_APPEND_COMMENT_JUST_SUBMIT, MUTATION_RESOVLE_SUB_COMMENT_LIST_DATA} from "../mutation_types";
import {uniqueCommentList} from "../article/mutations";

export default {
    [MUTATION_RESOVLE_SUB_COMMENT_LIST_DATA](state,payload) {

        state.subCommentListMap[payload.hostCommentId] = uniqueCommentList(state.subCommentListMap[payload.hostCommentId] ? state.subCommentListMap[payload.hostCommentId].concat(payload.subCommentList) : payload.subCommentList)

    },

    [MUTATION_APPEND_COMMENT_JUST_SUBMIT](state,payload) {

        const insertIndex = state.subCommentListMap[payload.comment_referComment].indexOf(payload.comment_appendTo)

        state.subCommentListMap[payload.comment_referComment].splice(insertIndex + 1, 0, payload.comment)

    }


}