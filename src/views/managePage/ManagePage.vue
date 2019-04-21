<template>

  <ManagePageWrapper>

    <CentralController>

      <SearchBar searchBarId="managePage"
                 :searchBarPostHandler="searchBarPostHandler"/>

      <ArticleFiling :articleFilingPostHandler="articleFilingPostHandler"/>

      <ArticleClassification :articleClassificationPostHandler="articleClassificationPostHandler"/>
      <!--<ArticleClassification/>

      <FreshComments/>-->
      <FreshComments/>

    </CentralController>

    <ArticleListWrapper>

      <ArticleListFixer>

        <transition-group name="slide-up-fade">
          <ArticleIndexItem v-for="(article,index) in articleList"
                            :withHeader="index === 0"
                            :article="article"
                            :key="article.article_id"/>
        </transition-group>


        <PaginationFixer>
          <Pagination paginationId="managePage"/>
        </PaginationFixer>

        <transition name="fade">
          <LoadingWrapper v-if="loading">
            <Loading/>
          </LoadingWrapper>
        </transition>

      </ArticleListFixer>



    </ArticleListWrapper>
  </ManagePageWrapper>

</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex'
import {
    ManagePageWrapper,
    CentralController,
    ArticleListWrapper,
    ArticleListFixer,
    PaginationFixer,
    LoadingWrapper} from './style'
import {
    SearchBar,
    ArticleFiling,
    ArticleClassification,
    FreshComments,
    ArticleIndexItem,
    Pagination,
    Loading} from '@/components'
    import {
        ACTION_GET_ARTICLE_LIST_BY_CLASSIFICATION,
        ACTION_GET_ARTICLE_LIST_BY_FILING,
        ACTION_GET_ARTICLE_LIST_BY_KEYWORD,
        ACTION_GET_ARTICLE_LIST_DATA_OF_MANAGE_PAGE
    } from "../../store/modules/action_types";
import {MUTATION_RESET_PAGINATION,MUTATION_APPOINT_MANAGE_PAGE_CONTEXT} from "../../store/modules/mutation_types";

export default {
    computed: {
        ...mapState({
            articleList: state => state.manage.articleList,
            currentPage: state => state.pagination.managePage.currentPage,
            loading: state => state.manage.loading,
            context: state => state.manage.context
        })
    },
    watch: {
        currentPage() {
            if(this.currentPage !== 0){
                this.getArticleListData()
            }

        }
    },
    methods: {
        ...mapActions({
            action_getArticleListDataOfManagePage: ACTION_GET_ARTICLE_LIST_DATA_OF_MANAGE_PAGE,
            action_getArticleListDataByKeyword: ACTION_GET_ARTICLE_LIST_BY_KEYWORD,
            action_getArticleListDataByFiling: ACTION_GET_ARTICLE_LIST_BY_FILING,
            action_getArticleListDataByClassification: ACTION_GET_ARTICLE_LIST_BY_CLASSIFICATION
        }),
        ...mapMutations({
            mutation_resetPagination: MUTATION_RESET_PAGINATION,
            mutation_appointManagePageContext: MUTATION_APPOINT_MANAGE_PAGE_CONTEXT
        }),
        searchBarPostHandler() {
            if(this.context === 'search'){
                this.mutation_resetPagination('managePage')
            }else{
                this.mutation_appointManagePageContext('search')
                this.mutation_resetPagination('managePage')
            }
        },
        articleFilingPostHandler() {
            if(this.context === 'articleFiling'){
                this.mutation_resetPagination('managePage')
            }else{
                this.mutation_appointManagePageContext('articleFiling')
                this.mutation_resetPagination('managePage')
            }
        },
        articleClassificationPostHandler() {
            if(this.context === 'articleClassification'){
                this.mutation_resetPagination('managePage')
            }else{
                this.mutation_appointManagePageContext('articleClassification')
                this.mutation_resetPagination('managePage')
            }
        },
        getArticleListData() {
            if(this.context === 'common'){
                this.action_getArticleListDataOfManagePage()
            }else if(this.context === 'search'){
                this.action_getArticleListDataByKeyword()
            }else if(this.context === 'articleFiling'){
                this.action_getArticleListDataByFiling()
            }else if(this.context === 'articleClassification'){
                this.action_getArticleListDataByClassification()
            }
        }
    },
    components: {
        ManagePageWrapper,
        CentralController,
        SearchBar,
        ArticleFiling,
        ArticleClassification,
        FreshComments,
        ArticleListWrapper,
        ArticleListFixer,
        ArticleIndexItem,
        Pagination,
        PaginationFixer,
        LoadingWrapper,
        Loading
    }
}
</script>

<style scoped>

  .slide-up-fade-enter-active {
    transition: all .4s ease;
  }

  .slide-up-fade-enter,
  .slide-up-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }

  .fade-leave-active {
    transition: all .4s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
