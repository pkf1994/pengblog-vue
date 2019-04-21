export default {
    articleList: [],
    pageScale: 6,
    loading: false,
    context: 'common',
    articleFiling: {
        filingMap: {},
        selectedYear: undefined,
        selectedMonth: undefined,
        loading: false
    },
    articleClassification: {
        labelMap: [],
        loading: true,
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