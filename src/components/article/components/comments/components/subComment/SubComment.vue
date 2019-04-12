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

                <ReplyButton>
                    <i class="fa fa-reply"/>&nbsp;
                </ReplyButton>

            </OperationRow>

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
            ReplyButton} from './style'

    export default {

        props: {
            comment: Object
        },

        data(){
            return {
                isBeenDeleting: false,
            }
        },

        computed: {
            isBanned() {
                return this.comment.comment_ip ? this.comment.comment_ip.ip_isBanned : false
            }
        },


        methods: {

            GetDateDiff:GetDateDiff,

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
            ReplyButton
        }
    }
</script>

<style scoped>

</style>