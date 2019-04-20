import {MUTATION_APPOINT_SEARCHBAR} from "../mutation_types";

export default {
    [MUTATION_APPOINT_SEARCHBAR](state,payload) {

        let target = state[payload.searchBarId]

        target.value = payload.value
    }
}