import {
    MUTATION_APPOINT_EDITING_ARTICLE
} from "../mutation_types";

export default {
    [MUTATION_APPOINT_EDITING_ARTICLE](state,payload) {
        state[payload.key] = payload.value
    }
}


