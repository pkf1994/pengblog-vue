import {MUTATION_APPOINT_SEARCHBAR, MUTATION_RESET_CENTRAL_CONTROLLER} from "../mutation_types";

export default {
    [MUTATION_APPOINT_SEARCHBAR](state,payload) {

        let target = state[payload.searchBarId]

        target.value = payload.value
    },

    [MUTATION_RESET_CENTRAL_CONTROLLER](state,payload){
        if(payload !== 'search'){
            state.value = ''
        }
    }
}