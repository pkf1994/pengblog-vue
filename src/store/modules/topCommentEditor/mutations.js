export default {
    mutation_appointInput(state,payload){


        let targetInput = state[payload.id]

        payload.value !== undefined && (targetInput.value = payload.value)

        payload.showWarn !== undefined && (targetInput.showWarn = payload.showWarn)

        payload.warnMsg !== undefined && (targetInput.warnMsg = payload.warnMsg)

    }
}

