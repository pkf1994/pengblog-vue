<template>
    <FreshCommentItemWrapper>

    <CommentSubject>
        <Visitor>{{comment.comment_author.visitor_name}}</Visitor>:&nbsp;
        <Content>{{comment.comment_content}}</Content>
    </CommentSubject>

    <HostArticle>
        <HostArticleInner>
            <Label>[{{comment.comment_hostArticle.article_label}}]</Label>&nbsp;
            <Title>{{comment.comment_hostArticle.article_title}}</Title>
        </HostArticleInner>

    </HostArticle>


    <OperationColumn>

        <DeleteButton class="fa fa-minus-circle"/>

        <LiftedButton>lifted</LiftedButton>&nbsp;&nbsp;

        <BanButton class="fa fa-ban"/>

    </OperationColumn>


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
        BanButton} from './style'
    export default {
        props: {
            comment:Object
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
            BanButton
        }
    }
</script>

<style scoped>

</style>