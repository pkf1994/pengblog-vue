<template>
    <SubCommentWrapper :isBeenDeleting="isBeenDeleting"
                       :isBanned="isBanned">

            <Content ref="commentContentRef"
                     :isBanned="isBanned">
                <SubCommentAuthor>
                    {{comment.comment_author.visitor_name}}
                </SubCommentAuthor>
                {{comment.comment_content}}
            </Content>


            <OperationRow>

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


    </SubCommentWrapper>
</template>

<script>
    import {GetDateDiff} from '@/exJs/getDateDiff'
    import {SubCommentWrapper,
            SubCommentAuthor,
            Content,
            OperationRow,
            Platform,
            ReleaseTime,
            ReplyButton,
            SubCommentEditorFixer} from './style'
    import SubCommentEditor from '../subCommentEditor/SubCommentEditor.vue'
    import {MUTATION_APPOINT_REFERING_COMMENT} from "../../../../../../store/modules/mutation_types";
    import {mapMutations, mapState} from "vuex";

    export default {

        props: {
            comment: Object
        },

        data(){
            return {
                isBeenDeleting: false,
                heightOfSubCommentEdior: '0px'
            }
        },

        computed: {
            ...mapState({
                referingComment: state => state.subCommentEditor.referingComment
            }),
            isBanned() {
                return this.comment.comment_ip ? this.comment.comment_ip.ip_isBanned : false
            },
            isBeenRefering() {
                return this.referingComment === this.comment
            }

        },

        mounted() {
            this.recordHeightOfSubCommentEdior()
        },

        methods: {
            ...mapMutations({
                mutation_appointReferingComment: MUTATION_APPOINT_REFERING_COMMENT
            }),

            GetDateDiff: GetDateDiff,

            recordHeightOfSubCommentEdior() {
                this.heightOfSubCommentEdior = window.getComputedStyle(this.$refs.subCommentEditor.$el).height
            },

            refer() {
                const payload = {
                    comment: this.comment
                }
                this.mutation_appointReferingComment(payload)
            },

            cancelRefer() {
                const payload = {
                    comment: undefined
                }
                this.mutation_appointReferingComment(payload)
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

        },
        components: {
            SubCommentWrapper,
            SubCommentAuthor,
            Content,
            OperationRow,
            Platform,
            ReleaseTime,
            ReplyButton,
            SubCommentEditor,
            SubCommentEditorFixer
        }
    }
</script>

<style scoped>
    .fade-enter-active,.fade-leave-active {
        transition: all .4s ease;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0.5;
    }
</style>