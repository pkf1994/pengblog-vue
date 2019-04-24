<template>
    <ArticleItemWrapper>

        <Header v-if="withHeader">

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

            <MultiSelectBtn v-if="!multiSelecting">
                <span :style="{cursor:'pointer'}"
                      v-on:click="() => mutation_triggerMultiSelecting(true)">多选</span>
            </MultiSelectBtn>

            <MultiSelectOperation v-if="multiSelecting">

                <MultiDeleteBtn v-on:click="tryToDeleteArticleList">批量删除</MultiDeleteBtn>

                <Cancel v-on:click="() => mutation_triggerMultiSelecting(false)">取消</Cancel>

            </MultiSelectOperation>
        </Header>

        <Body  v-on:mouseenter.native="() => triggerIsBeingHover(true)"
               v-on:mouseleave.native="() => triggerIsBeingHover(false)"
               :hasBeenDeleted="hasBeenDeleted">

            <CheckBoxWrapper v-if="multiSelecting">
                <Checkbox :selected="beingMultiSeleted"
                          :selectHandler="checkboxSelectHandler"
                          :cancelHandler="checkboxCancelHandler" />
            </CheckBoxWrapper>

            <ArticleTitle :multiSelecting="multiSelecting">

                <ArticleTitleInner v-on:click="() => goTo('/article/' + article.article_id)">
                    {{article.article_title}}
                </ArticleTitleInner>

                <DeleteButton v-if="beingHover" v-on:click="tryToDelete">
                    <i :style="{cursor:'pointer'}" class="fa fa-trash-o"/>
                </DeleteButton>


            </ArticleTitle>

            <ArticleAuthor>
                {{article.article_author}}
            </ArticleAuthor>

            <ArticleLabel>
                {{article.article_label}}
            </ArticleLabel>

            <ArticleReleaseTime>
                {{DateFormat('yyyy-MM-dd', new Date(article.article_releaseTime))}}
            </ArticleReleaseTime>

        </Body>

    </ArticleItemWrapper>
</template>

<script>
    import {
        ArticleItemWrapper,
        Header,
        Body,
        CheckBoxWrapper,
        ArticleTitle,
        ArticleTitleInner,
        DeleteButton,
        ArticleAuthor,
        ArticleLabel,
        ArticleReleaseTime,
        MultiSelectBtn,
        MultiSelectOperation,
        MultiDeleteBtn,
        Cancel} from './style'
    import Checkbox from '../checkbox/Checkbox.vue'
    import {DateFormat} from '@/exJs/dateFormatUtil'
    import {ACTION_DELETE_ARTICLE} from "../../store/modules/action_types";
    import {mapActions, mapMutations, mapState} from "vuex";
    import {
        MUTATION_APPOINT_ARTICLE_LIST_SELECTED,
        MUTATION_TRIGGER_MULTI_SELECTING,
        MUTATION_TRIGGER_SHOW_MODAL
    } from "../../store/modules/mutation_types";
    export default {
        data() {
            return {
                beingHover: false
            }
        },
        props: {
            article: Object,
            withHeader: Boolean
        },
        computed: {
            ...mapState({
                multiSelecting: state => state.manage.multiSelecting,
                articleListSelected: state => state.manage.articleListSelected,
                beingMultiSeleted(state) {
                    return state.manage.articleListSelected.some((item) => {
                        return item === this.article.article_id
                    })
                },
                hasBeenDeleted(state) {
                    let articleListDeleted = state.manage.articleListDeleted

                    return articleListDeleted.some((item) => {
                        return item === this.article.article_id
                    })
                }
            })
        },
        methods: {
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL,
                mutation_triggerMultiSelecting: MUTATION_TRIGGER_MULTI_SELECTING,
                mutation_appointArticleListSelected: MUTATION_APPOINT_ARTICLE_LIST_SELECTED
            }),
            DateFormat,
            goTo(path) {
                this.$router.push({path: path})
            },
            triggerIsBeingHover(flag) {
                this.beingHover = flag
            },
            tryToDelete() {
                if(this.hasBeenDeleted) {
                    return
                }
                const payload = {
                    context: 'deleteArticle',
                    show: true,
                    meta: {
                        key: 'deletingArticleId',
                        value: this.article.article_id
                    },
                    modalContent: '将删除文章: “' + this.article.article_title + '”, 请确认。'
                }
                this.mutation_triggerShowModal(payload)
            },
            tryToDeleteArticleList() {
                const payload = {
                    context: 'deleteArticleList',
                    show: true,
                    modalContent: '将删除所选' + this.articleListSelected.length + '篇文章, 请确认。'
                }
                this.mutation_triggerShowModal(payload)
            },
            checkboxSelectHandler() {
                const payload = {
                    article_id: this.article.article_id,
                    select: true
                }
                this.mutation_appointArticleListSelected(payload)
            },
            checkboxCancelHandler() {
                const payload = {
                    article_id: this.article.article_id,
                    select: false
                }
                this.mutation_appointArticleListSelected(payload)
            }
        },
        components: {
            ArticleItemWrapper,
            Header,Body,
            CheckBoxWrapper,
            Checkbox,
            ArticleTitle,
            ArticleTitleInner,
            DeleteButton,
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