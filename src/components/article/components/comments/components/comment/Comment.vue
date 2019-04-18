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

            </OperationRow>

            <SubCommentEditorFixer :height="heightOfSubCommentEdior"
                                   :isBeenRefering="isBeenRefering">
                <SubCommentEditor ref="subCommentEditor"/>
            </SubCommentEditorFixer>

            <transition-group name="slide-in">
                <SubComment v-if="subCommentListMap[$data._this.comment.comment_id]"
                            v-for="comment in subCommentListMap[$data._this.comment.comment_id]"
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
            Gap,GapH,
            MultiContent,
            ContentWrapper,
            Content,
            OperationRow,
            ShowAll,
            Platform,
            ReleaseTime,
            ReplyButton,
            ForMoreWrapper,
            SubCommentEditorFixer} from './style'
    import {mapActions, mapMutations, mapState} from "vuex";
    import SubCommentEditor from '../subCommentEditor/SubCommentEditor'
    import SubComment from '../subComment/SubComment.vue'
    import ForMore from '../../../../../forMore/ForMore.vue'
    import {ACTION_GET_SUB_COMMENT_LIST} from "../../../../../../store/modules/action_types";
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
                pageScale: 4,
                startIndex: 0,
                nextPage: 1,
                maxPage: 1,
                heightOfSubCommentEdior: '0px'
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
                subCommentListMap: state => state.subComment.subCommentListMap
            }),
            subCommentList () {
                return this.subCommentListMap[this.comment.comment_id]
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
                SubComment,
                ForMore,
                ForMoreWrapper,
                SubCommentEditor,SubCommentEditorFixer
        },

        methods: {
            ...mapActions({
                action_getSubCommentList: ACTION_GET_SUB_COMMENT_LIST
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

            colorPicker: GenerateFeatureColor

        }
    }
</script>

<style scoped>
    .slide-in-enter-active,.slide-in-leave-active{
        transition: all .4s ease;
    }

    .slide-in-enter,.slide-in-leave-to{
        transform: translateY(30px);
        opacity: 0;
    }

    .fade-enter-active,.fade-leave-active{
        transition: all .4s ease;
    }

    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
</style>