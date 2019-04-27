<template>
    <FreshCommentItemWrapper>

        <CommentSubject v-on:click="redirect">
            <Visitor>{{comment.comment_author.visitor_name}}</Visitor>:&nbsp;
            <Content>{{comment.comment_content}}</Content>
        </CommentSubject>

        <HostArticle>
            <HostArticleInner v-on:click="redirect">
                <Label>[{{comment.comment_hostArticle.article_label}}]</Label>&nbsp;
                <Title>{{comment.comment_hostArticle.article_title}}</Title>
            </HostArticleInner>

        </HostArticle>


        <OperationColumn>

            <DeleteButton class="fa fa-minus-circle"
                          v-on:click="deleteComment"/>

            <LiftedButton>lifted</LiftedButton>&nbsp;&nbsp;

            <BanButton class="fa fa-ban"/>

        </OperationColumn>

        <LoadingWrapper v-if="loading">
            <Loading/>
        </LoadingWrapper>

    </FreshCommentItemWrapper>
</template>

<script>
    import {
        FreshCommentItemWrapper,
        CommentSubject,
        Visitor,
        Content,
        HostArticle,
        HostArticleInner,
        Label,
        Title,
        OperationColumn,
        DeleteButton,
        LiftedButton,
        BanButton,
        LoadingWrapper} from './style'
    import {Loading} from '@/components'
    import {ACTION_DELETE_COMMENT} from "../../../../../../store/modules/action_types";
    import {mapActions} from "vuex";
    export default {
        data() {
            return {
                loading: false
            }
        },
        props: {
            comment:Object
        },
        methods: {
            ...mapActions({
                action_deleteComment: ACTION_DELETE_COMMENT
            }),
            deleteComment() {

                this.loading = true

                this.action_deleteComment(this.comment.comment_id)

            },
            redirect() {
                this.$router.push({path:'/article/' + this.comment.comment_hostArticle.article_id})
            }
        },
        components: {
            FreshCommentItemWrapper,
            CommentSubject,
            Visitor,
            Content,
            HostArticle,
            HostArticleInner,
            Label,
            Title,
            OperationColumn,
            DeleteButton,
            LiftedButton,
            BanButton,
            LoadingWrapper,
            Loading
        }
    }
</script>

<style scoped>

</style>