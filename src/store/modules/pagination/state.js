import {getStartIndex} from "./mutations";

export default {
    managePage: {
        startIndex: getStartIndex(window.innerHeight - 200,54),
        pageScale: - getStartIndex(window.innerHeight - 200,54),
        currentPage: 0,
        maxPage: 1
    },
    ipManagePage: {
        startIndex: getStartIndex(window.innerHeight - 200,50),
        pageScale: - getStartIndex(window.innerHeight - 200,54),
        currentPage: 0,
        maxPage: 1
    }
}