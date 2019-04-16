import {MUTATION_TRIGGER_IS_LOADING, MUTATION_TRIGGER_SHOW_MODAL} from "../mutation_types";

export default {

    [MUTATION_TRIGGER_SHOW_MODAL](state,payload){
        state.show = payload.show
        payload.context && (state.context = payload.context)
        payload.postHandler && (state.postHandler = payload.postHandler)

    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload){
        if(payload.id === 'modal'){
            state.loading = payload.loading
        }
    }

}
