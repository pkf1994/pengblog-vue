<template>

  <HomeWrapper>

    <!--侧边栏文章列表-->
    <ArticleList>
      <transition-group name="slide-up-fade">
        <ArticleSummary :article=article
                        v-for="article in articleList"
                        :key="article.article_id"/>
      </transition-group>

      <ForMoreWrapper v-if="articleList.length!==0">
        <ForMore :noMore="noMore"
                 :loading="loadingMore"
                 :moreDataGetter="actionGetArticleListOfHome"/>
      </ForMoreWrapper>

      <!--loading文章列表-->
      <LoadingArticleSummary v-if="articleList.length===0">
        <Loading/>
      </LoadingArticleSummary>
    </ArticleList>

    <!--文章详情-->
    <transition name="slide-up-fade">
      <ArticleDetail v-if="currentRoute === 'home_article'">
        <ArticleDetailFixer>
            <RouterView></RouterView>
        </ArticleDetailFixer>
      </ArticleDetail>
    </transition>

    <transition name="slide-up-fade">
      <Theme v-if="currentRoute !== 'home_article'">
        <ThemeJumbotron/>
        <Footer/>
      </Theme>
    </transition>

    <!--loading文章详情-->
      <LoadingWrapper v-show="loadingArticleDetail"
                      :opaque="!article.article_id">
        <Loading/>
      </LoadingWrapper>



  </HomeWrapper>

</template>

<script>
    import {mapActions, mapState} from 'vuex'
import Article from '@/components/article/Article.vue'
import ArticleSummary from '@/components/articleSummary/ArticleSummary.vue'
import {Loading,ForMore,ThemeJumbotron,Footer} from '@/components'
import {HomeWrapper,
        ArticleList,
        LoadingArticleSummary,
        ArticleDetail,
        LoadingWrapper,
        ArticleDetailFixer,Theme,
        ForMoreWrapper} from './style'
import {ACTION_GET_ARTICLE_LIST_DATA} from "../../store/modules/action_types";


export default {

    created() {
        this.actionGetArticleListOfHome()
        this.prograssBarManager.nanobarGoToMilePost()
    },

    computed: {
        currentRoute(){
            return this.$route.name
        },
        ...mapState({
            articleList: state => state.home.articleList,
            article: state => state.article.article,
            loadingArticleDetail: state => state.home.loadingArticleDetail,
            noMore: state => (state.home.nextPage === state.home.maxPage),
            loadingMore: state => state.home.loadingMore,
            prograssBarManager: state => state.prograssBar
        })
    },

    methods: {
        ...mapActions({
            actionGetArticleListOfHome: ACTION_GET_ARTICLE_LIST_DATA
        })
    },

    components: {
        Article,
        ArticleSummary,
        LoadingArticleSummary,
        HomeWrapper,
        ArticleList,
        ArticleDetail,
        Theme,
        Loading,
        ForMore,
        LoadingWrapper,
        ArticleDetailFixer,
        ForMoreWrapper,
        ThemeJumbotron,
        Footer
    }
}
</script>

<style scoped>

  .slide-up-fade-enter-active {
    transition: all .4s ease;
  }

  .slide-up-fade-enter, .slide-up-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
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
