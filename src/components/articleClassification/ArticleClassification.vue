<template>
    <ArticleClassificationWrapper>

        <Title>TAG</Title>

        <Tags>
            <TagItem v-for="item in labelMap"
                     class="slide-up-fade"
                     :key="item.article_label"
                     :selected="item.article_label===selectedLabel">
                {{item.article_label}}({{item.number}})
            </TagItem>
        </Tags>

        <LoadingWrapper v-if="loading">
            <Loading/>
        </LoadingWrapper>

    </ArticleClassificationWrapper>
</template>

<script>
    import {ArticleClassificationWrapper,Title,Tags,TagItem,LoadingWrapper} from './style'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {Loading} from '@/components'
    import {ACTION_GET_ARTICLE_CLASSIFICATION_DATA} from "../../store/modules/action_types";

    export default {
        computed: {
            ...mapState({
                labelMap: state => state.manage.articleClassification.labelMap,
                selectedLabel: state => state.manage.articleClassification.selectedLabel,
                loading: state => state.manage.articleClassification.loading
            })
        },
        watch: {
            loading(){

            }
        },
        created() {
            this.action_getArticleClassificationData()
        },
        methods: {
            ...mapActions({
                action_getArticleClassificationData: ACTION_GET_ARTICLE_CLASSIFICATION_DATA
            })
        },
        components: {
            ArticleClassificationWrapper,Title,Tags,TagItem,Loading,LoadingWrapper
        }
    }
</script>

<style scoped>

    .slide-up-fade{
        animation: slide-up-fade-animation .4s ease forwards;
    }

    @keyframes slide-up-fade-animation {
        0%{
            opacity: 0;
            transform: translateY(10px);
        }

        100%{
            opacity: 1;
        }
    }

</style>