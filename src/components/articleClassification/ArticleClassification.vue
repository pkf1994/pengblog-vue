<template>
    <ArticleClassificationWrapper>

        <Title v-if="withTitle">TAG</Title>

        <Tags :loading="loading">
            <TagItem v-for="item in labelMap"
                     class="slide-up-fade"
                     v-on:click="() => clickHandler(item.article_label)"
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
    import {MUTATION_APPOINT_SELECTED_LABEL} from "../../store/modules/mutation_types";

    export default {
        props: {
            articleClassificationPostHandler: Function,
            withTitle: Boolean,
            articleClassificationId: String
        },
        computed: {
            ...mapState({
                labelMap: function(state){return state[this.articleClassificationId].articleClassification.labelMap},
                selectedLabel: function(state){return state[this.articleClassificationId].articleClassification.selectedLabel},
                loading: function(state){return state[this.articleClassificationId].articleClassification.loading}
            })
        },
        created() {
            this.action_getArticleClassificationData()
        },
        methods: {
            ...mapActions({
                action_getArticleClassificationData: ACTION_GET_ARTICLE_CLASSIFICATION_DATA
            }),
            ...mapMutations({
                mutation_appointSelectedLabel: MUTATION_APPOINT_SELECTED_LABEL
            }),
            clickHandler(label){
                const payload = {
                    articleClassificationId: this.articleClassificationId,
                    value: label
                }
                this.mutation_appointSelectedLabel(payload)
                this.articleClassificationPostHandler()
            }
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