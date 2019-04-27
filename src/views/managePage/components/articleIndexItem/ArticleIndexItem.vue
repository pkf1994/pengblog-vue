<template>
    <ArticleItemWrapper  v-on:mouseenter.native="() => triggerIsBeingHover(true)"
           v-on:mouseleave.native="() => triggerIsBeingHover(false)"
           :hasBeenDeleted="hasBeenDeleted">

        <CheckBoxWrapper v-if="multiSelecting && !hasBeenDeleted">
            <Checkbox :selected="beingMultiSeleted"
                      :selectHandler="checkboxSelectHandler"
                      :cancelHandler="checkboxCancelHandler" />
        </CheckBoxWrapper>

        <ArticleTitle :multiSelecting="multiSelecting && !hasBeenDeleted"
                      :hasBeenDeleted="hasBeenDeleted">

            <ArticleTitleInner v-on:click="() => goTo('/article/' + article.article_id)">
                {{article.article_title}}
            </ArticleTitleInner>

            <OperationButton v-if="beingHover && alreadyLogin && !loading">
                <DeleteBtnIcon v-if="!hasBeenDeleted"
                               class="fa fa-trash-o"
                               v-on:click="tryToDelete"
                               title="删除"/>

                <RecycleBtnIcon v-if="hasBeenDeleted"
                                class="fa fa-recycle"
                                v-on:click="tryToRecoverArticle"
                                title="还原"/>

                <span v-if="hasBeenDeleted">&nbsp;</span>

                <DestroyBtnIcon v-if="hasBeenDeleted"
                                class="iconfont"
                                v-on:click="tryToDestroyArticle"
                                title="清除">&#xe628;
                </DestroyBtnIcon>
            </OperationButton>

        </ArticleTitle>

        <ArticleAuthor>
            {{article.article_author}}
        </ArticleAuthor>

        <ArticleLabel>
            {{article.article_label}}
        </ArticleLabel>

        <ArticleReleaseTime>
            {{DateFormat('yy-MM-dd', new Date(article.article_releaseTime))}}
        </ArticleReleaseTime>

        <transition name="fade">
            <LoadingWrapper v-if="loading">
                <Loading/>
            </LoadingWrapper>
        </transition>


    </ArticleItemWrapper>
</template>

<script>
    import {
        ArticleItemWrapper,
        CheckBoxWrapper,
        ArticleTitle,
        ArticleTitleInner,
        OperationButton,
        ArticleAuthor,
        ArticleLabel,
        ArticleReleaseTime,
        LoadingWrapper,
        DeleteBtnIcon,
        RecycleBtnIcon,
        DestroyBtnIcon} from './style'
    import {Checkbox,Loading} from '@/components'
    import {DateFormat} from '@/exJs/dateFormatUtil'
    import {
        mapActions,
        mapMutations,
        mapState} from "vuex";
    import {
        MUTATION_APPOINT_ARTICLE_LIST_SELECTED,
        MUTATION_TRIGGER_MULTI_SELECTING,
        MUTATION_TRIGGER_SHOW_MODAL
    } from "../../../../store/modules/mutation_types";
    import {
        ACTION_DELETE_ARTICLE,
        ACTION_DELETE_ARTICLE_LIST, ACTION_DESTROY_ARTICLE,
        ACTION_RECOVER_ARTICLE
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
                articleListSelected: state => state.manage.articleListSelected,
                beingMultiSeleted(state) {
                    return state.manage.articleListSelected.some((item) => {
                        return item === this.article.article_id
                    })
                }
            }),
            hasBeenDeleted() {
                return this.article.isDeleted
            }
        },
        methods: {
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL,
                mutation_triggerMultiSelecting: MUTATION_TRIGGER_MULTI_SELECTING,
                mutation_appointArticleListSelected: MUTATION_APPOINT_ARTICLE_LIST_SELECTED
            }),
            ...mapActions({
                action_deleteArticle: ACTION_DELETE_ARTICLE,
                action_deleteArticleList: ACTION_DELETE_ARTICLE_LIST,
                action_recoverArticle: ACTION_RECOVER_ARTICLE,
                action_destroyArticle: ACTION_DESTROY_ARTICLE
            }),
            DateFormat,
            goTo(path) {
                this.$router.push({path: path})
            },
            triggerIsBeingHover(flag) {
                this.beingHover = flag
            },
            async tryToDelete() {

                this.loading = true

                await this.action_deleteArticle(this.article.article_id)

                this.loading = false
            },
            async tryToRecoverArticle() {
                this.loading = true

                await this.action_recoverArticle(this.article.article_id)

                this.loading = false
            },
            tryToDeleteArticleList() {
                const payload = {
                    context: 'deleteArticleList',
                    show: true,
                    modalContent: '将删除所选' + this.articleListSelected.length + '篇文章, 请确认。'
                }
                this.mutation_triggerShowModal(payload)
            },

            async tryToDestroyArticle() {
                this.loading = true

                await this.action_destroyArticle(this.article.article_id)



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
            CheckBoxWrapper,
            Checkbox,
            Loading,
            ArticleTitle,
            ArticleTitleInner,
            OperationButton,
            ArticleAuthor,
            ArticleLabel,
            ArticleReleaseTime,
            LoadingWrapper,
            DeleteBtnIcon,
            RecycleBtnIcon,
            DestroyBtnIcon}
    }
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{
    transition: all .4s ease;
}

.fade-enter,.fade-leave-to{
    opacity: 0;
}

</style>