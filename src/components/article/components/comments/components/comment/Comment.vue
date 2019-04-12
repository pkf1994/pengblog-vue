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

                <ReplyButton>
                    <i class="fa fa-reply"/>&nbsp;
                </ReplyButton>

            </OperationRow>

            <transition-group name="slide-in">
                <SubComment v-if="subCommentList.length > 0"
                            v-for="comment in subCommentList"
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
    import SparkMD5 from 'spark-md5'
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
            ForMoreWrapper} from './style'
    import {mapActions} from "vuex";
    import {ACTION_GET_SUB_COMMENT_LIST} from "../../../../../../store/modules/api/constant";
    import SubComment from '../subComment/SubComment.vue'
    import ForMore from '../../../../../forMore/ForMore.vue'
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
                subCommentList: []
            }
        },

        computed: {
            featureString() {
                return this.comment.comment_author.visitor_name.substring(0,2)
            },
            metaColor() {
                return this.colorPicker(this.comment.comment_author.visitor_name)
            },
            isBanned() {
                return this.comment.comment_ip ? this.comment.comment_ip.ip_isBanned : false
            }
        },

        created() {
            if(this.comment.comment_haveSubComment) {
                this.action_getSubCommentList(this)
            }
        },

        mounted() {
            this.computeHeightOfCommentContent()
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
                ForMoreWrapper
        },

        methods: {
            ...mapActions({
                action_getSubCommentList: ACTION_GET_SUB_COMMENT_LIST
            }),

            GetDateDiff:GetDateDiff,

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

            colorPicker(md5String) {

                const firtCharOfMd5 = SparkMD5.hash(md5String).substring(0,1)

                if(48 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 51){
                    return '#B3B3B3'
                }
                if(52 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 55){
                    return '#7A00CC'
                }
                if(56 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 57){
                    return '#CC00CC'
                }
                if(97 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 100){
                    return '#EE0000'
                }
                if(101 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 104){
                    return '#EE8F00'
                }
                if(105 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 108){
                    return '#EEEE00'
                }
                if(109 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 112){
                    return '#A3CC00'
                }
                if(113 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 116){
                    return '#07C607'
                }
                if(117 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 120){
                    return '#00CCCC'
                }
                if(121 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 122){
                    return '#007ACC'
                }
            }

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