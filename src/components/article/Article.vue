<template>
    <transition name="slide-up-fade">
        <ArticleWrapper v-if="refreshIndex && article.article_id">

            <!--题图-->
            <ArticleTitleImage v-if="withTitleImage"
                               :src="article.article_titleImageUrl"/>

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
    </transition>


</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import {DateFormat} from '@/exJs/dateFormatUtil'
    import {Share,Comments,TopCommentEditor} from './components'
    import {Loading} from '@/components'
    import {ArticleWrapper,
            ArticleTitleImage,
            ArticleTitle,
            ArticleInfo,
            ArticleContent,ArticleMultiContent,LoadingWrapper} from './style'


    import {
        MUTATION_RECORD_CURRENT_ARTICLE_ID,
        MUTATION_RESET_STORE
    } from "../../store/modules/mutation_types";
    import {ACTION_GET_ARTICLE_DATA} from "../../store/modules/action_types";

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
                withTitleImage: state => (state.article.article.article_titleImageUrl !== undefined) && (state.article.article.article_titleImageUrl !== ''),
                loading: state => state.home.loadingArticleDetail
            }),
        },

        watch: {
            async article_id(){
                await this.action_GetArticleData({article_id: this.article_id})
                window.scrollTo(0,0)
                this.refresh()
            },
            article() {
                document.title = this.article.article_title
            }
        },

        beforeDestroy() {
            this.mutation_resetStore({id: 'article'})
        },

        created(){
            this.action_GetArticleData({article_id: this.article_id})
        },


        methods: {
            refresh() {
                this.refreshIndex = false
                this.$nextTick(() => {
                    this.refreshIndex = true
                })
            },
            ...mapActions({
                action_GetArticleData: ACTION_GET_ARTICLE_DATA,
            }),
            ...mapMutations({
                mutation_recordCurrentArticleId: MUTATION_RECORD_CURRENT_ARTICLE_ID,
                mutation_resetStore: MUTATION_RESET_STORE
            }),
            DateFormat
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
            ArticleMultiContent,Loading,LoadingWrapper
        }
    }
</script>

<style scoped>
    .slide-up-fade-enter-active,.slide-up-fade-leave-active {
        transition: all .4s ease;
    }

    .slide-up-fade-enter, .slide-up-fade-leave-to {
        transform: translateY(50px);
        opacity: 0;
        filter: brightness(70%);
    }

    .fade-enter-active {
        transition: all .4s ease;
    }
    .fade-leave-active {
    }
    .fade-enter, .fade-leave-to {
        opacity: 0.5;
    }
</style>