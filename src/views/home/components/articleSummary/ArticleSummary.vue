<template>
    <ArticleSummaryWrapper v-bind:class="{active: isActive}"
                           v-on:click="goToTheArticle">

        <Title :hasBeenDeleted="article.isDeleted">
            <Label :color="featureLabelColor">
                [{{article.article_label}}]
            </Label>
            {{article.article_title}}
        </Title>

        <ContentAndImage>
            <Content withPreviewImage="withPreviewImage">
                {{article.article_summary}}
            </Content>
            <PreviewImage v-if="withPreviewImage"
                          class="lazyload"
                          :data-src="article.article_previewImageUrl"
                          :src="defaultImageSrc"/>
        </ContentAndImage>

        <Info>
            <InfoItem>
                <i class="fa fa-pencil"/>&nbsp;{{article.article_author}}
            </InfoItem>
            &nbsp;&nbsp;
            <InfoItem>
                {{DateFormat('yyyy-MM-dd',new Date(article.article_releaseTime))}}
            </InfoItem>
            &nbsp;|&nbsp;
            <InfoItem>
                <span class="iconfont">&#xe634;</span>&nbsp;
                {{article.article_countOfAllComment}}
            </InfoItem>
        </Info>

    </ArticleSummaryWrapper>
</template>

<script>
    import {DateFormat} from "../../../../exJs/dateFormatUtil";
    import {GenerateFeatureColor} from '@/exJs/generateFeatureColor'
    import {ArticleSummaryWrapper,
            Title,
            Label,
            ContentAndImage,
            Content,
            PreviewImage,
            Info,
            InfoItem} from './style'
    import {mapState} from "vuex";

    export default {
        props: {
            article: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                featureLabelColor: "black"
            }
        },
        created() {
            this.generateFeatureLabelColor()
        },
        computed: {
            ...mapState({
                defaultImageSrc: state => state.meta.defaultImageSrc,
                currentArticleId: state => state.article.currentArticleId,
                maxMobileWidth: state => state.meta.maxMobileWidth
            }),
            withPreviewImage(){
                return (this.article.article_previewImageUrl !== undefined) && (this.article.article_previewImageUrl !== '')
            },
            isActive(){
                return this.article.article_id.toString() === this.currentArticleId && window.innerWidth > this.maxMobileWidth
            }
        },
        methods: {
            DateFormat,
            generateFeatureLabelColor() {
                this.featureLabelColor = GenerateFeatureColor(this.article.article_label)
            },
            goToTheArticle() {
                if(window.innerWidth > this.maxMobileWidth) {
                    this.$router.push({path: '/home/article/' + this.article.article_id})
                }else{
                    this.$router.push({path: '/article/' + this.article.article_id})
                }
            }
        },
        components: {
            ArticleSummaryWrapper,
            Title,
            Label,
            ContentAndImage,
            Content,
            PreviewImage,
            Info,
            InfoItem
        }
    }
</script>

<style scoped>
.active{
    background: #F0F0F0;
}
</style>