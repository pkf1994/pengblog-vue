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
            <ContentWrapper showAll="showAll">
                <Content :isBanned="isBanned">
                    {{comment.comment_content}}
                </Content>
            </ContentWrapper>
        </MultiContent>

        <OperationRow>

        </OperationRow>

    </CommentWrapper>
</template>

<script>
    import SparkMD5 from 'spark-md5'
    import {CommentWrapper,
            VisitorInfo,
            AvatarWrapper,
            Avatar,
            Name,
            Gap,
            MultiContent,
            ContentWrapper,
            Content,
            OperationRow} from './style'
    export default {

        props: {
            comment: Object
        },

        data(){
            return {
                isBeenDeleting: false,
                showAll: false
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

        methods: {

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

        },
        components: {
            CommentWrapper,
            VisitorInfo,
            AvatarWrapper,
            Avatar,
            Name,
            Gap,
            MultiContent,
            ContentWrapper,
            Content,
            OperationRow
        }
    }
</script>

<style scoped>

</style>