<template>

    <TableHeaderWrapper>

        <ArticleTitle :style="{justifyContent: 'center'}">
            文章标题
        </ArticleTitle>

        <ArticleAuthor>
            作者
        </ArticleAuthor>

        <ArticleLabel>
            标签
        </ArticleLabel>

        <ArticleReleaseTime>
            发布时间
        </ArticleReleaseTime>

        <MultiSelectBtn v-if="!multiSelecting && alreadyLogin">
            <span :style="{cursor:'pointer'}"
                  v-on:click="() => mutation_triggerMultiSelecting(true)">多选</span>
        </MultiSelectBtn>

        <MultiSelectOperation v-if="multiSelecting && alreadyLogin">

            <MultiDeleteBtn v-on:click="tryToDeleteArticleList">批量删除</MultiDeleteBtn>

            <Cancel v-on:click="() => mutation_triggerMultiSelecting(false)">取消</Cancel>

        </MultiSelectOperation>
    </TableHeaderWrapper>

</template>

<script>
    import {
        TableHeaderWrapper,
        ArticleTitle,
        ArticleAuthor,
        ArticleLabel,
        ArticleReleaseTime,
        MultiSelectBtn,
        MultiSelectOperation,
        MultiDeleteBtn,
        Cancel} from './style'
    import {Checkbox,Loading} from '@/components'
    import {DateFormat} from '@/exJs/dateFormatUtil'
    import {
        mapActions,
        mapMutations,
        mapState} from "vuex";
    import {
        MUTATION_TRIGGER_MULTI_SELECTING,
        MUTATION_TRIGGER_SHOW_MODAL
    } from "../../../../store/modules/mutation_types";
    import {
        ACTION_DELETE_ARTICLE_LIST
    } from "../../../../store/modules/action_types";
    export default {
        data() {
            return {
                beingHover: false,
                loading: false
            }
        },
        props: {
            article: Object,
            withHeader: Boolean
        },
        computed: {
            ...mapState({
                alreadyLogin: state => state.login.alreadyLogin,
                multiSelecting: state => state.manage.multiSelecting,
            })
        },
        methods: {
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL,
                mutation_triggerMultiSelecting: MUTATION_TRIGGER_MULTI_SELECTING,
            }),
            ...mapActions({
                action_deleteArticleList: ACTION_DELETE_ARTICLE_LIST,
            }),

            tryToDeleteArticleList() {
                const payload = {
                    context: 'deleteArticleList',
                    show: true,
                    modalContent: '将删除所选' + this.articleListSelected.length + '篇文章, 请确认。'
                }
                this.mutation_triggerShowModal(payload)
            },

        },
        components: {
            TableHeaderWrapper,
            Checkbox,Loading,
            ArticleTitle,
            ArticleAuthor,
            ArticleLabel,
            ArticleReleaseTime,
            MultiSelectBtn,
            MultiSelectOperation,
            MultiDeleteBtn,
            Cancel}
    }
</script>

<style scoped>

</style>