export default {
    articleList: [],
    nextPage: 1,
    pageScale: 8,
    maxPage: 1,
    startIndex: 0,
    loadingArticleDetail: false,
    loadingMore: false,
    context: 'common',
    articleFiling: {
        filingMap: {},
        selectedYear: undefined,
        selectedMonth: undefined,
        loading: false
    },
    articleClassification: {
        labelMap: ['...'],
        loading: true,
        selectedLabel: undefined
    }
}