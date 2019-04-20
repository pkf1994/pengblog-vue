import {MUTATION_APPOINT_PAGINATION,MUTATION_RESET_PAGINATION} from "../mutation_types";

export default {
    [MUTATION_APPOINT_PAGINATION](state,payload) {

        let target = state[payload.paginationId]

        if(payload.currentPage !== undefined) {
            target.startIndex = target.startIndex + (payload.currentPage - target.currentPage) * target.pageScale
            target.currentPage = payload.currentPage
            target.currentPage > 0 && target.startIndex < 0 && (target.startIndex = 0)
        }

        if(payload.maxPage !== undefined) {
            target.maxPage = payload.maxPage
        }
    },
    [MUTATION_RESET_PAGINATION](state,payload) {

        let target = state[payload]

        target.currentPage = 0
        target.startIndex = getStartIndex()

    }

}

const getStartIndex = () => {
    return window.innerWidth < 500 ? - 8 : - parseInt((window.innerHeight - 200)/54)
}