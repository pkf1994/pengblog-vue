<template>
    <FreshCommentsWrapper>

        <Title>最近评论</Title>

        <transition-group name="slide-up-fade">
            <FreshCommentItem v-for="comment in commentList"
                              :comment=comment
                              :key="comment.comment_id"/>
        </transition-group>


            <ForMoreWrapper>
                <ForMore :noMore="nextPage > maxPage"
                         :moreDataGetter="action_getFreshCommentList"
                         :loading="loading"/>
            </ForMoreWrapper>

    </FreshCommentsWrapper>
</template>

<script>
    import {FreshCommentItem} from "./components";
    import {ForMore} from '@/components'
    import {FreshCommentsWrapper,Title,ForMoreWrapper} from './style'
    import {ACTION_GET_FRESH_COMMENT_LIST} from "../../store/modules/action_types";
    import {mapActions, mapState} from "vuex";
    export default {
        computed: {
            ...mapState({
                nextPage: state => state.manage.freshComments.nextPage,
                maxPage: state => state.manage.freshComments.maxPage,
                loading: state => state.manage.freshComments.loading,
                commentList: state => state.manage.freshComments.commentList
            })
        },
        created() {
            this.action_getFreshCommentList()
        },
        methods: {
            ...mapActions({
                action_getFreshCommentList: ACTION_GET_FRESH_COMMENT_LIST
            })
        },
        components: {
            FreshCommentItem,FreshCommentsWrapper,Title,ForMoreWrapper,ForMore
        }
    }
</script>

<style scoped>

    .slide-up-fade-enter-active {
        transition: all .4s ease;
    }

    .slide-up-fade-enter, .slide-up-fade-leave-to {
        transform: translateY(50px);
        opacity: 0;
    }
</style>