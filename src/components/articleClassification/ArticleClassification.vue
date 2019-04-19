<template>
    <ArticleClassificationWrapper>

        <Title>TAG</Title>

        <Tags>
            <TagItem v-for="item in labelMap"
                     :key="item.article_label"
                     :selected="item.article_label===selectedLabel">
                {{item.article_label}}({{item.number}})
            </TagItem>
        </Tags>

    </ArticleClassificationWrapper>
</template>

<script>
    import {ArticleClassificationWrapper,Title,Tags,TagItem} from './style'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {ACTION_GET_ARTICLE_CLASSIFICATION_DATA} from "../../store/modules/action_types";
    export default {
        computed: {
            ...mapState({
                labelMap: state => state.manage.articleClassification.labelMap,
                selectedLabel: state => state.manage.articleClassification.selectedLabel
            })
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
            ArticleClassificationWrapper,Title,Tags,TagItem
        }
    }
</script>

<style scoped>

</style>