export default {
    articleFiling: {
        filingMap: {},
        selectedYear: undefined,
        selectedMonth: undefined
    },
    articleClassification: {
        labelMap: [],
        selectedLabel: undefined
    },
    freshComments: {
        commentList: [],
        startIndex: 0,
        nextPage: 1,
        maxPage: 1,
        pageScale: 5,
        loading: false
    }
}