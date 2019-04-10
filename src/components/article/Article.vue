<template>
    <ArticleWrapper>

        <!--题图-->
        <ArticleTitleImage v-if="refreshIndex && withTitleImage"
                           class="lazyload"
                           :data-src="article.article_titleImageUrl"
                           :src="defaultImageSrc"/>

        <ArticleMultiContent>
            <!--文章标题-->
            <ArticleTitle>{{article.article_title}}</ArticleTitle>

            <!--标签、作者信息-->
            <ArticleInfo>
            <span>
                [{{article.article_label}}]
            </span>
                &nbsp;| 作者:&nbsp;
                <span>
                {{article.article_author}}
            </span>
            </ArticleInfo>

            <!--文章内容-->
            <ArticleContent v-html="article.article_content">

            </ArticleContent>

            <!--发布日期-->
            <ArticleInfo>
                发布于: {{DateFormat('yyyy-MM-dd', new Date(article.article_releaseTime))}}
            </ArticleInfo>
        </ArticleMultiContent>



        <!--分享-->
        <!--<Share/>-->



    </ArticleWrapper>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import {DateFormat} from '@/exJs/dateFormatUtil'
    //import {Share} from './components'
    import {ArticleWrapper,
            ArticleTitleImage,
            ArticleTitle,
            ArticleInfo,
            ArticleContent,ArticleMultiContent} from './style'

    import {ACTION_GET_ARTICLE_DATA_ARTICLE} from "../../store/modules/api/actionTypeConstant";

    export default {

        props:['article_id'],

        data(){
            return {
                defaultImageSrc: window.defaultImageSrc,
                refreshIndex: true
            }
        },

        computed: {...mapState({
                article: state => state.article.article,
                isLoading: state => state.article.isLoading,
                withTitleImage: state => (state.article.article.article_titleImageUrl !== undefined) && (state.article.article.article_titleImageUrl !== '')
            }),
        },

        methods: {
            ...mapActions({
                actionGetArticleData: ACTION_GET_ARTICLE_DATA_ARTICLE
            }),
            DateFormat
        },


        created(){
            this.actionGetArticleData({article_id: this.article_id})
        },

        watch: {
            article_id(){
                this.actionGetArticleData({article_id: this.article_id})
                window.scrollTo(0,0)
            },
            article(){
                this.refreshIndex = false
                this.$nextTick(() => (this.refreshIndex = true))
            }
        },

        components: {
            ArticleWrapper,
            ArticleTitleImage,
            ArticleTitle,
            ArticleInfo,
            ArticleContent,ArticleMultiContent
        }
    }
</script>

<style scoped>

</style>