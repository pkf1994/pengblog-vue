<template>
    <CommentsWrapper>
        <Title>
            <CommentsIcon class="iconfont">&#xe625;</CommentsIcon>&nbsp;{{count}}条留言
        </Title>

        <Comment v-for="comment in commentList"
                 :comment=comment
                 :key="comment.comment_id"/>

    </CommentsWrapper>
</template>

<script>
    import {CommentsWrapper,Title,CommentsIcon} from './style'
    import {Comment} from './components'
    import {mapState} from "vuex";

    export default {
        computed: {
            ...mapState({
                commentList: state => state.article.commentList,
                count: state => state.article.countOfAllComment
            })
        },
        components: {
            CommentsWrapper,
            Title,
            CommentsIcon,
            Comment
        }
    }
</script>

<style scoped>

</style>