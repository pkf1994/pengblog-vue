<template>
    <ArticleFilingWrapper>

        <ArticleFilingTitle v-if="withTitle">归档</ArticleFilingTitle>

        <ArticleFilinger>
            <DateSelector>
                <Select :optionList="years"
                        :value="selectedYear"
                        :valueAppointer="selectedYearAppointer"
                        width="4.2rem"/>&nbsp;年&nbsp;
                <Select :optionList="months"
                        :value="selectedMonth"
                        :value-appointer="selectedMonthAppointer"
                        width="3.2rem"/>&nbsp;月&nbsp;

            </DateSelector>
            <SubmitButton year="year" v-on:click="articleFilingPostHandler">Go!</SubmitButton>
        </ArticleFilinger>

        <LoadingWrapper v-if="loading">
            <Loading/>
        </LoadingWrapper>
    </ArticleFilingWrapper>
</template>

<script>
    import {
        ArticleFilingWrapper,
        ArticleFilingTitle,
        ArticleFilinger,
        DateSelector,
        SubmitButton,
        LoadingWrapper} from './style'
    import Select from '../select/Select.vue'
    import Loading from '../loading/Loading.vue'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_SELECT_DATA} from "../../store/modules/mutation_types";
    import {ACTION_GET_ARTICLE_FILING_DATA} from "../../store/modules/action_types";
    export default {
        props: {
            articleFilingPostHandler: Function,
            withTitle: Boolean,
            articleFilingId: String
        },
        computed: {
            ...mapState({
                years: function(state) {return this.generateYearArray(state[this.articleFilingId].articleFiling.filingMap)},
                months: function(state) {return this.generateMonthArray(state[this.articleFilingId].articleFiling.filingMap, state[this.articleFilingId].articleFiling.selectedYear)},
                selectedYear:  function(state) {return state[this.articleFilingId].articleFiling.selectedYear},
                selectedMonth: function(state) {return state[this.articleFilingId].articleFiling.selectedMonth},
                loading: function (state) {return state[this.articleFilingId].articleFiling.loading}
            })
        },
        created(){
            this.action_getArticleFilingData()
        },
        methods: {
            generateYearArray(filingMap){
                let years = []
                Object.keys(filingMap).forEach((key) => {
                    years.push(key)
                })
                return years
            },
            generateMonthArray(filingMap,selectedYear){
                return filingMap[selectedYear]
            },
            selectedYearAppointer(item) {
                const payload = {
                    articleFilingId: this.articleFilingId,
                    selectId: 'selectedYear',
                    value: item
                }
                this.mutation_appointSelectData(payload)
            },
            selectedMonthAppointer(item) {
                const payload = {
                    articleFilingId: this.articleFilingId,
                    selectId: 'selectedMonth',
                    value: item
                }
                this.mutation_appointSelectData(payload)
            },
            ...mapMutations({
                mutation_appointSelectData: MUTATION_APPOINT_SELECT_DATA
            }),
            ...mapActions({
                action_getArticleFilingData: ACTION_GET_ARTICLE_FILING_DATA
            })
        },
        components: {
            ArticleFilingWrapper,
            ArticleFilingTitle,
            ArticleFilinger,
            DateSelector,
            SubmitButton,
            Select,
            LoadingWrapper,
            Loading
        }
    }
</script>

<style scoped>

</style>