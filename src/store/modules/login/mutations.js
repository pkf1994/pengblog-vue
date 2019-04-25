import {
    MUTATION_APPOINT_INPUT,
    MUTATION_APPOINT_LOGIN_MODE,
    MUTATION_APPOINT_SECOND_TO_NEXT_GETTING_SMS,
    MUTATION_COUNTDOWN_SECOND_TO_NEXT_GETTING_SMS
} from "../mutation_types";

export default {

    [MUTATION_APPOINT_LOGIN_MODE](state,payload) {
        state.loginMode = payload
    },

    [MUTATION_COUNTDOWN_SECOND_TO_NEXT_GETTING_SMS](state,payload) {
        state.dynamic.secondToNextGetting = state.dynamic.secondToNextGetting - 1
    },

    [MUTATION_APPOINT_SECOND_TO_NEXT_GETTING_SMS](state,payload) {
        state.dynamic.secondToNextGetting = payload
    },

    [MUTATION_APPOINT_INPUT](state,payload) {
        if(payload.loginMode === 'common') {
            state.common[payload.key] = payload.value
        }

        if(payload.loginMode === 'dynamic') {
            state.dynamic[payload.key] = payload.value
        }
    }
}



