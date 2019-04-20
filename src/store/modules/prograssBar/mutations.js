import {MUTATION_PUSH_PROGRASS_BAR_TO_END,MUTATION_LAUNCH_PROGRASS_BAR} from "../mutation_types";

export default {

    [MUTATION_PUSH_PROGRASS_BAR_TO_END](state) {
        state.prograssBarGoToTheEnd()
    },

    [MUTATION_LAUNCH_PROGRASS_BAR](state) {
        state.nanobarGoToMilePost()
    }
}
