import {MUTATION_APPOINT_WINDOW_SIZE} from "../mutation_types";

export default {

    [MUTATION_APPOINT_WINDOW_SIZE](state,payload) {
        state.widthOfWindow = payload.widthOfWindow
        state.heightOfWindow = payload.heightOfWindow
    }
}

