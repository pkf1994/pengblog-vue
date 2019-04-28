import {MUTATION_RESOLVE_IP_LIST_DATA, MUTATION_TRIGGER_IS_LOADING} from "../mutation_types";

export default {

    [MUTATION_RESOLVE_IP_LIST_DATA](state,payload) {

        state.ipList = payload

    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload) {
        payload.id === 'ipManagePage' && (state.loading = payload.loading)
    }
}
