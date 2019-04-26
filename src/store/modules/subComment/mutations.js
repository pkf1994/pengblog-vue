import {
    MUTATION_APPEND_COMMENT_JUST_SUBMIT, MUTATION_RECORD_COMMENT_JUST_DELETE,
    MUTATION_RESOLVE_SUB_COMMENT_LIST_DATA
} from "../mutation_types";
import {uniqueCommentList} from "../article/mutations";
import Vue from 'vue'

export default {
    [MUTATION_RESOLVE_SUB_COMMENT_LIST_DATA](state,payload) {

        if(!state.subCommentListMap[payload.hostCommentId]) {

            Vue.set(state.subCommentListMap,payload.hostCommentId,payload.subCommentList)

        }else{

            state.subCommentListMap[payload.hostCommentId] = state.subCommentListMap[payload.hostCommentId].concat(payload.subCommentList)

        }

    },

    [MUTATION_APPEND_COMMENT_JUST_SUBMIT](state,payload) {

        if(!state.subCommentListMap[payload.comment_referComment]){
            return
        }

        const insertIndex = state.subCommentListMap[payload.comment_referComment].indexOf(payload.comment_appendTo)

        state.subCommentListMap[payload.comment_referComment].splice(insertIndex + 1, 0, payload.comment)

    },

    [MUTATION_RECORD_COMMENT_JUST_DELETE](state,payload) {

        for(var key in state.subCommentListMap) {

            state.subCommentListMap[key].forEach((item,index) => {
                if(item.comment_id === payload) {
                    state.subCommentListMap[key].splice(index,1)
                }
            })

        }
    }

}