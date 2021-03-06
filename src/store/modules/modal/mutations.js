import {MUTATION_TRIGGER_IS_LOADING, MUTATION_TRIGGER_SHOW_MODAL} from "../mutation_types";

export default {

    [MUTATION_TRIGGER_SHOW_MODAL](state,payload){

        if(payload.context && (state.context !== payload.context)){
            state.postHandler = () => {}
            state.cancelHandler = () => {}
            state.modalContent = undefined
        }

        state.show = payload.show
        payload.context && (state.context = payload.context)
        payload.postHandler && (state.postHandler = payload.postHandler)
        payload.cancelHandler && (state.cancelHandler = payload.cancelHandler)
        payload.modalContent && (state.modalContent = payload.modalContent)
        payload.meta && (state[payload.meta.key] = payload.meta.value)
    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload){
        if(payload.id === 'modal'){
            state.loading = payload.loading
        }
    }

}
