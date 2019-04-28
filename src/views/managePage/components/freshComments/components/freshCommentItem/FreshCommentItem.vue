<template>
    <FreshCommentItemWrapper :isBanned="comment.comment_ip.ip_isBanned">

        <CommentSubject v-on:click="redirect">
            <Visitor :isBanned="comment.comment_ip.ip_isBanned">{{comment.comment_author.visitor_name}}</Visitor>:&nbsp;
            <Content>{{comment.comment_content}}</Content>
        </CommentSubject>

        <HostArticle>
            <HostArticleInner v-on:click="redirect">
                <Label>[{{comment.comment_hostArticle.article_label}}]</Label>&nbsp;
                <Title>{{comment.comment_hostArticle.article_title}}</Title>
            </HostArticleInner>

        </HostArticle>


        <OperationColumn v-if="alreadyLogin">

            <DeleteButton class="fa fa-minus-circle"
                          v-on:click="deleteComment"/>

            <LiftedButton v-if="alreadyLogin && comment.comment_ip.ip_isBanned"
                          v-on:click="liftedIP">lifted</LiftedButton>&nbsp;&nbsp;

            <BanButton v-if="alreadyLogin && !comment.comment_ip.ip_isBanned"
                       class="fa fa-ban"
                       v-on:click="banIP"/>

        </OperationColumn>

        <transition name="fade">
            <LoadingWrapper v-if="loading">
                <Loading/>
            </LoadingWrapper>
        </transition>
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
    import {ACTION_BAN_IP, ACTION_DELETE_COMMENT, ACTION_LIFTED_IP} from "../../../../../../store/modules/action_types";
    import {mapActions, mapState} from "vuex";
    export default {
        data() {
            return {
                loading: false
            }
        },
        props: {
            comment:Object
        },
        computed: {
            ...mapState({
                alreadyLogin: state => state.login.alreadyLogin
            })
        },
        methods: {
            ...mapActions({
                action_deleteComment: ACTION_DELETE_COMMENT,
                action_banIP: ACTION_BAN_IP,
                action_liftedIP: ACTION_LIFTED_IP
            }),
            deleteComment() {

                this.loading = true

                this.action_deleteComment(this.comment.comment_id)

            },
            async banIP() {

                this.loading = true

                await this.action_banIP(this.comment.comment_ip.ip_ip)

                this.loading = false

            },
            async liftedIP() {

                this.loading = true

                await this.action_liftedIP(this.comment.comment_ip.ip_ip)

                this.loading = false

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
.fade-enter-active,.fade-leave-active{
    transition: all .4s ease;
}

.fade-enter,.fade-leave-to{
    opacity: 0;
}
</style>