<template>
    <CommentWrapper :isBeenDeleting="isBeenDeleting" :isBanned="isBanned">

        <VisitorInfo>
            <AvatarWrapper>
                <Avatar :metaColor="metaColor">
                    {{featureString}}
                </Avatar>
            </AvatarWrapper>

            <Name :isBanned="isBanned">
                {{comment.comment_author.visitor_name}}
            </Name>
        </VisitorInfo>

        <Gap/>

        <MultiContent>
            <ContentWrapper :showAll="showAll" :heightOfCommentContent="heightOfCommentContent">
                <Content ref="commentContentRef"
                         :isBanned="isBanned">
                    {{comment.comment_content}}
                </Content>
            </ContentWrapper>

            <OperationRow>

                <span v-if="!showAll && heightOfCommentContent > 210">
                     <ShowAll v-on:click="triggerShowAll">
                          显示全部
                     </ShowAll>
                     &nbsp;|&nbsp;
                </span>


                <Platform>
                    <i :class="generatePlatformIconClass(comment.comment_platform)"/>
                </Platform>
                &nbsp;|&nbsp;

                <ReleaseTime>
                    {{GetDateDiff(comment.comment_releaseTime)}}
                </ReleaseTime>
                &nbsp;|&nbsp;

                <ReplyButton v-if="!isBeenRefering" v-on:click="refer">
                    <i class="fa fa-reply"/>
                </ReplyButton>

                <ReplyButton v-if="isBeenRefering" v-on:click="cancelRefer">
                    <i class="fa fa-chevron-up"/>
                </ReplyButton>

                <DeleteButton v-if="alreadyLogin">
                    &nbsp;|&nbsp;
                    <DeleteButtonIcon v-on:click="deleteComment"
                                      class="fa fa-trash-o"/>
                </DeleteButton>

            </OperationRow>

            <SubCommentEditorFixer :height="heightOfSubCommentEdior"
                                   :isBeenRefering="isBeenRefering">
                <SubCommentEditor ref="subCommentEditor"/>
            </SubCommentEditorFixer>

            <transition-group name="slide-in">
                <SubComment v-for="comment in subCommentList"
                            class="slide-in-item"
                            :comment="comment"
                            :key="comment.comment_id"/>
            </transition-group>

            <transition name="fade">
                <ForMoreWrapper v-if="comment.comment_haveSubComment && nextPage - 1 < maxPage">
                    <ForMore :noMore="nextPage - 1 === maxPage"
                             :loading="loadingMoreSubComment"
                             font-size="0.9rem"
                             for-more-text=". . ."
                             no-more-text="it's all"
                             :moreDataGetter="() => {action_getSubCommentList($data._this)}"/>
                </ForMoreWrapper>
            </transition>

        </MultiContent>

        <LoadingWrapper v-if="loading">
            <Loading/>
        </LoadingWrapper>

    </CommentWrapper>
</template>

<script>
    import {GetDateDiff} from '@/exJs/getDateDiff'
    import {GenerateFeatureColor} from '@/exJs/generateFeatureColor'
    import {CommentWrapper,
            VisitorInfo,
            AvatarWrapper,
            Avatar,
            Name,
            Gap,
            GapH,
            MultiContent,
            ContentWrapper,
            Content,
            OperationRow,
            ShowAll,
            Platform,
            ReleaseTime,
            ReplyButton,
            DeleteButton,
            DeleteButtonIcon,
            ForMoreWrapper,
            SubCommentEditorFixer,
            LoadingWrapper} from './style'
    import Loading from '../../../../../loading/Loading.vue'
    import {mapActions, mapMutations, mapState} from "vuex";
    import SubCommentEditor from '../subCommentEditor/SubCommentEditor'
    import SubComment from '../subComment/SubComment.vue'
    import ForMore from '../../../../../forMore/ForMore.vue'
    import {ACTION_DELETE_COMMENT, ACTION_GET_SUB_COMMENT_LIST} from "../../../../../../store/modules/action_types";
    import {MUTATION_APPOINT_REFERING_COMMENT} from "../../../../../../store/modules/mutation_types";
    export default {

        props: {
            comment: Object
        },

        data(){
            return {
                _this: this,
                isBeenDeleting: false,
                showAll: false,
                heightOfCommentContent: 210,
                loadingMoreSubComment: false,
                pageScale: 2,
                startIndex: 0,
                nextPage: 1,
                maxPage: 1,
                count: 0,
                heightOfSubCommentEdior: '0px',
                loading: false
            }
        },

        computed: {
            isBeenRefering() {
                return this.referingComment === this.comment
            },
            featureString() {
                return this.comment.comment_author.visitor_name.substring(0,2)
            },
            metaColor() {
                return this.colorPicker(this.comment.comment_author.visitor_name)
            },
            isBanned() {
                return this.comment.comment_ip ? this.comment.comment_ip.ip_isBanned : false
            },
            ...mapState({
                referingComment: state => state.subCommentEditor.referingComment,
                subCommentList(state) {
                    return state.subComment.subCommentListMap[this.comment.comment_id]
                },
                lengthOfSubCommentList(state) {
                    if(!state.subComment.subCommentListMap[this.comment.comment_id]) {
                        return 0
                    }
                    return state.subComment.subCommentListMap[this.comment.comment_id].length
                },
                alreadyLogin: state => state.login.alreadyLogin,
            })
        },

        watch: {
            lengthOfSubCommentList(newOne,oldOne) {
                if(oldOne - newOne === 1) {
                    this.startIndex = this.startIndex - 1
                    this.count = this.count - 1
                    if(Math.ceil(this.count/this.pageScale) < this.maxPage) {
                        this.maxPage = Math.ceil(this.count/this.pageScale)
                        this.nextPage = this.nextPage - 1
                    }
                }
            }
        },

        created() {
            if(this.comment.comment_haveSubComment) {
                this.action_getSubCommentList(this)
            }
        },

        mounted() {
            this.computeHeightOfCommentContent()
            this.recordHeightOfSubCommentEdior()
        },

        methods: {
            ...mapActions({
                action_getSubCommentList: ACTION_GET_SUB_COMMENT_LIST,
                action_deleteComment: ACTION_DELETE_COMMENT
            }),
            ...mapMutations({
                mutation_appointReferingComment: MUTATION_APPOINT_REFERING_COMMENT
            }),

            GetDateDiff:GetDateDiff,

            recordHeightOfSubCommentEdior() {
                this.heightOfSubCommentEdior = window.getComputedStyle(this.$refs.subCommentEditor.$el).height
            },
            cancelRefer() {
                const payload = {
                    comment: undefined
                }
                this.mutation_appointReferingComment(payload)
            },

            refer() {
                const payload = {
                    comment: this.comment
                }
                this.mutation_appointReferingComment(payload)
            },

            triggerShowAll() {
                this.showAll = true
            },

            computeHeightOfCommentContent() {
                this.heightOfCommentContent = parseInt(window.getComputedStyle(this.$refs.commentContentRef.$el).height)
            },

            generatePlatformIconClass(platform) {
                if(platform === undefined){
                    return ''
                } else if(platform.toLowerCase().indexOf('win') !== -1){
                    return 'fa fa-windows'
                }else if(platform.toLowerCase().indexOf('ios') !== -1){
                    return 'fa fa-apple'
                }else if(platform.toLowerCase().indexOf('ipad') !== -1){
                    return 'fa fa-apple'
                }else if(platform.toLowerCase().indexOf('iphone') !== -1){
                    return 'fa fa-apple'
                }else if(platform.toLowerCase().indexOf('mac') !== -1){
                    return 'fa fa-apple'
                }else if(platform.toLowerCase().indexOf('arm') !== -1){
                    return 'fa fa-android'
                }else if(platform.toLowerCase().indexOf('linux') !== -1){
                    return 'fa fa-linux'
                }else if(platform.toLowerCase().indexOf('android') !== -1){
                    return 'fa fa-android'
                }
            },


            deleteComment() {

                this.loading = true

                this.action_deleteComment(this.comment.comment_id)

            },

            colorPicker: GenerateFeatureColor,

        },

        components: {
            CommentWrapper,
            VisitorInfo,
            AvatarWrapper,
            Avatar,
            Name,
            Gap,
            GapH,
            MultiContent,
            ContentWrapper,
            Content,
            OperationRow,
            ShowAll,
            Platform,
            ReleaseTime,
            ReplyButton,
            DeleteButton,
            DeleteButtonIcon,
            SubComment,
            ForMore,
            ForMoreWrapper,
            SubCommentEditor,
            SubCommentEditorFixer,
            LoadingWrapper,
            Loading
        }
    }
</script>

<style scoped>
    .slide-in-enter-active{
        transition: all .4s ease;
    }
    .slide-in-leave-active{
        position: absolute;
        transition: all .4s ease;
    }
    .slide-in-enter{
        transform: translateY(30px);
        opacity: 0;
    }
    .slide-in-leave-to{
        transform: translateX(30px);
        opacity: 0;
    }

    .slide-in-item{
        transition: all .4s ease;
    }

    .fade-enter-active,.fade-leave-active{
        transition: all .4s ease;
    }

    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
</style>