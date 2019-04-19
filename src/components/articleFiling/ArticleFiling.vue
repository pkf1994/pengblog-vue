<template>
    <ArticleFilingWrapper>

        <ArticleFilingTitle>归档</ArticleFilingTitle>

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
            <SubmitButton year="year">Go!</SubmitButton>
        </ArticleFilinger>
    </ArticleFilingWrapper>
</template>

<script>
    import {
        ArticleFilingWrapper,
        ArticleFilingTitle,
        ArticleFilinger,
        DateSelector,
        SubmitButton} from './style'
    import Select from '../select/Select.vue'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_SELECT_DATA} from "../../store/modules/mutation_types";
    import {ACTION_GET_ARTICLE_FILING_DATA} from "../../store/modules/action_types";
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapState({
                years: function(state){return this.generateYearArray(state.manage.articleFiling.filingMap)},
                months: function(state){return this.generateMonthArray(state.manage.articleFiling.filingMap, state.manage.articleFiling.selectedYear)},
                selectedYear: state => state.manage.articleFiling.selectedYear,
                selectedMonth: state => state.manage.articleFiling.selectedMonth
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
                    id: 'selectedYear',
                    value: item
                }
                this.mutation_appointSelectData(payload)
            },
            selectedMonthAppointer(item) {
                const payload = {
                    id: 'selectedMonth',
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
            Select
        }
    }
</script>

<style scoped>

</style>