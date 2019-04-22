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
        labelMap: [{article_label:'...',number: 0}],
        loading: false,
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