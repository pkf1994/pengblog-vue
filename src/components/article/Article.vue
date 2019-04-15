<template>
    <ArticleWrapper>

        <!--题图-->
        <ArticleTitleImage v-if="withTitleImage"
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

            <Share/>

            <Comments :article_id="article_id"/>

            <TopCommentEditor/>

        </ArticleMultiContent>


    </ArticleWrapper>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {DateFormat} from '@/exJs/dateFormatUtil'
    import {Share,Comments,TopCommentEditor} from './components'
    import {ArticleWrapper,
            ArticleTitleImage,
            ArticleTitle,
            ArticleInfo,
            ArticleContent,ArticleMultiContent} from './style'

    import {
        ACTION_GET_ARTICLE_DATA_ARTICLE,
        MUTATION_RECORD_CURRENT_ARTICLE_ID_ARTICLE_FROM_API,
    } from "../../store/modules/api/constant";

    export default {

        props: {
            article_id: String
        },

        data(){
            return {
                refreshIndex: true
            }
        },

        computed: {...mapState({
                defaultImageSrc: state => state.meta.defaultImageSrc,
                article: state => state.article.article,
                withTitleImage: state => (state.article.article.article_titleImageUrl !== undefined) && (state.article.article.article_titleImageUrl !== '')
            }),
        },

        methods: {
            ...mapActions({
                action_GetArticleData: ACTION_GET_ARTICLE_DATA_ARTICLE,
            }),
            ...mapMutations({
                mutation_recordCurrentArticleId: MUTATION_RECORD_CURRENT_ARTICLE_ID_ARTICLE_FROM_API,
            }),
            DateFormat
        },


        created(){
            this.action_GetArticleData({article_id: this.article_id})
        },

        mounted(){
            window.scrollTo(0,0)
        },

        watch: {
            article_id(){
                this.action_GetArticleData({article_id: this.article_id})
            }
        },

        components: {
            Share,
            Comments,
            TopCommentEditor,
            ArticleWrapper,
            ArticleTitleImage,
            ArticleTitle,
            ArticleInfo,
            ArticleContent,
            ArticleMultiContent
        }
    }
</script>

<style scoped>

</style>