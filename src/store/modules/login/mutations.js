import {
    MUTATION_APPOINT_INPUT,
    MUTATION_APPOINT_LOGIN_MODE,
    MUTATION_APPOINT_SECOND_TO_NEXT_GETTING_SMS,
    MUTATION_COUNTDOWN_SECOND_TO_NEXT_GETTING_SMS,
    MUTATION_RESOLVE_LOGIN_RESULT,
    MUTATION_RESOLVE_LOGOUT_RESULT, MUTATION_RESOLVE_SMS,
    MUTATION_TRIGGER_IS_LOADING
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

            let targetInput = state.common[payload.id]

            payload.value !== undefined && (targetInput.value = payload.value)

            payload.showWarn !== undefined && (targetInput.showWarn = payload.showWarn)

            payload.warnMsg !== undefined && (targetInput.warnMsg = payload.warnMsg)
        }

        if(payload.loginMode === 'dynamic') {

            let targetInput = state.dynamic[payload.id]

            payload.value !== undefined && (targetInput.value = payload.value)

            payload.showWarn !== undefined && (targetInput.showWarn = payload.showWarn)

            payload.warnMsg !== undefined && (targetInput.warnMsg = payload.warnMsg)
        }
    },

    [MUTATION_RESOLVE_LOGIN_RESULT](state,payload) {
        state.alreadyLogin = true
        state.currentUser = payload
    },

    [MUTATION_RESOLVE_LOGOUT_RESULT](state) {
        state.alreadyLogin = false
    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload) {
        if(payload.id === 'loginPage') {
            state.loading = payload.loading
        }
        if(payload.id === 'sms') {
            state.dynamic.loading = payload.loading
        }
    },

    [MUTATION_RESOLVE_SMS](state) {
        state.dynamic.secondToNextGetting = 59
    }
}



