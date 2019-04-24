<template>
    <CommentsWrapper>
        <Title>
            <CommentsIcon class="iconfont">&#xe625;</CommentsIcon>&nbsp;{{count}}条留言
        </Title>

        <transition-group name="slide-in">
            <Comment v-for="comment in commentList"
                     :comment=comment
                     :key="comment.comment_id"/>
        </transition-group>

        <ForMoreWrapper>
            <ForMore :loading="loadingMoreComment"
                     forMoreText="更多评论"
                     :moreDataGetter="() => {action_GetCommentListData({article_id: article_id})}"
                     :noMore="noMore"/>
        </ForMoreWrapper>

    </CommentsWrapper>
</template>

<script>
    import {ForMore} from '@/components'
    import {CommentsWrapper,Title,CommentsIcon,ForMoreWrapper} from './style'
    import {Comment} from './components'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {ACTION_GET_TOP_COMMENT_LIST} from "../../../../store/modules/action_types";
    import {MUTATION_RESET_PAGINATION_INDEX_OF_TOP_COMMENT_LIST} from "../../../../store/modules/mutation_types";


    export default {
        props: {
            article_id: String
        },
        created() {
            this.action_GetCommentListData({article_id: this.article_id})
        },
        computed: {
            ...mapState({
                commentList: state => state.article.commentList,
                count: state => state.article.countOfAllComment,
                loadingMoreComment: state => state.article.loadingMoreComment,
                noMore: state => (state.article.nextPage - 1 === state.article.maxPage)
            })
        },
        watch: {
            article_id(){
                this.mutation_resetPaginationIndexOfTopCommentListOfSpecificArticle()
            }
        },
        methods: {
            ...mapActions({
                action_GetCommentListData: ACTION_GET_TOP_COMMENT_LIST
            }),
            ...mapMutations({
                mutation_resetPaginationIndexOfTopCommentListOfSpecificArticle: MUTATION_RESET_PAGINATION_INDEX_OF_TOP_COMMENT_LIST
            }),
        },
        components: {
            CommentsWrapper,
            Title,
            CommentsIcon,
            Comment,
            ForMore,
            ForMoreWrapper
        }
    }
</script>

<style scoped>

.slide-in-enter-active,.slide-in-leave-active{
    transition: all .4s ease;
}

.slide-in-enter{
    transform: translateY(30px);
    opacity: 0;
}

.slide-in-leave-to{
    transform: scale(0.7);
    opacity: 0;
}

</style>