<template>

  <HomeWrapper>

    <!--侧边栏文章列表-->
    <ArticleList>

      <SearchBarWrapper :showCentralController="showCentralController">

        <SearchBarFixer :showCentralController="showCentralController">
          <SearchBar searchBarId="home"
                     :searchBarPostHandler="searchBarPostHandler"/>
        </SearchBarFixer>

        <MoreCondition :showCentralController="showCentralController">
          <span class="iconfont" v-on:click="() => triggerShow(true)">&#xe609;</span>
        </MoreCondition>

      </SearchBarWrapper>

      <CentralControllerFixer :heightOfCentralController="heightOfCentralController"
                              :showCentralController="showCentralController">
        <CentralController ref="centralController">
          <ArticleFiling articleFilingId="manage"
                         :articleFilingPostHandler="articleFilingPostHandler"/>
          <ArticleClassification articleClassificationId="manage"
                                 :articleClassificationPostHandler="articleClassificationPostHandler"/>
          <Retract>
            <span class="iconfont" v-on:click="() => triggerShow(false)">&#xe627;</span>
          </Retract>
        </CentralController>

      </CentralControllerFixer>


      <transition-group name="slide-up-fade">
        <ArticleSummary :article=article
                        v-for="article in articleList"
                        :key="article.article_id"/>
      </transition-group>

      <ForMoreWrapper v-if="articleList.length!==0 && maxPage > 1">
        <ForMore :noMore="noMore"
                 :loading="loadingMore"
                 :moreDataGetter="getData"/>
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
    import {mapActions, mapMutations, mapState} from 'vuex'
import Article from '@/components/article/Article.vue'
import ArticleSummary from '@/components/articleSummary/ArticleSummary.vue'
import {Loading,ForMore,ThemeJumbotron,Footer,SearchBar,ArticleFiling,ArticleClassification} from '@/components'
import {
    HomeWrapper,
    ArticleList,
    LoadingArticleSummary,
    ArticleDetail,
    LoadingWrapper,
    ArticleDetailFixer,
    Theme,
    ForMoreWrapper,
    SearchBarWrapper,
    MoreCondition,
    CentralController,
    CentralControllerFixer,
    Retract,
    SearchBarFixer} from './style'
    import {
        ACTION_GET_ARTICLE_LIST_DATA,
        ACTION_GET_ARTICLE_LIST_OF_HOME_BY_FILING,
        ACTION_GET_ARTICLE_LIST_OF_HOME_BY_KEYWORD, ACTION_GET_ARTICLE_LIST_OF_HOME_BY_LABEL
    } from "../../store/modules/action_types";
    import {MUTATION_APPOINT_CONTEXT} from "../../store/modules/mutation_types";


export default {

    data() {
        return {
            heightOfCentralController: '0px',
            showCentralController: false
        }
    },

    created() {
        this.getData()
    },

    mounted() {
        this.recordHeightOfCentralController()
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
            context: state => state.home.context,
            maxPage: state => state.home.maxPage
        })
    },

    methods: {
        ...mapActions({
            action_getArticleListOfHome: ACTION_GET_ARTICLE_LIST_DATA,
            action_getArticleListOfHomeByKeyword: ACTION_GET_ARTICLE_LIST_OF_HOME_BY_KEYWORD,
            action_getArticleListOfHomeByFiling: ACTION_GET_ARTICLE_LIST_OF_HOME_BY_FILING,
            action_getArticleListOfHomeByLabel: ACTION_GET_ARTICLE_LIST_OF_HOME_BY_LABEL
        }),
        ...mapMutations({
           mutation_appointContext: MUTATION_APPOINT_CONTEXT
        }),
        getData() {
            switch (this.context) {
                case 'common':
                    this.action_getArticleListOfHome()
                    break
                case 'search':
                    this.action_getArticleListOfHomeByKeyword()
                    break

            }
        },
        searchBarPostHandler() {
            const payload = {
                id: 'home',
                context: 'search'
            }
            this.mutation_appointContext(payload)
            this.action_getArticleListOfHomeByKeyword()
        },
        articleFilingPostHandler() {
            const payload = {
                id: 'home',
                context: 'articleFiling'
            }
            this.mutation_appointContext(payload)
            this.action_getArticleListOfHomeByFiling()
        },
        articleClassificationPostHandler() {
            const payload = {
                id: 'home',
                context: 'articleClassification'
            }
            this.mutation_appointContext(payload)
            this.action_getArticleListOfHomeByLabel()
        },
        recordHeightOfCentralController() {
            const _this = this
            setTimeout(() => {
                _this.heightOfCentralController = window.getComputedStyle(_this.$refs.centralController.$el).height
            },500)
        },
        triggerShow(flag) {
            if(this.heightOfCentralController === '0px'){
                return
            }
            this.showCentralController = flag
        }
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
        Footer,
        SearchBar,
        SearchBarWrapper,
        MoreCondition,
        ArticleFiling,
        ArticleClassification,
        CentralController,
        CentralControllerFixer,
        Retract,
        SearchBarFixer
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
