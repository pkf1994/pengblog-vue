<template>

  <ManagePageWrapper>

    <CentralController>

      <SearchBarWrapper>
        <SearchBar searchBarId="managePage"
                   :searchBarPostHandler="searchBarPostHandler"/>
      </SearchBarWrapper>


      <ArticleFiling :withTitle=true
                     articleFilingId="manage"
                     :articleFilingPostHandler="articleFilingPostHandler"/>

      <ArticleClassification :withTitle=true
                             articleClassificationId="manage"
                             :articleClassificationPostHandler="articleClassificationPostHandler"/>
      <!--<ArticleClassification/>

      <FreshComments/>-->
      <FreshComments/>

    </CentralController>

    <ArticleListWrapper>

      <ArticleListFixer>

        <TableHeader/>
        <transition-group name="slide-up-fade" tag="div" :style="{position:'relative'}">
          <ArticleIndexItem v-for="(article,index) in articleList"
                            :withHeader="index === 0"
                            class="slide-up-fade-item"
                            :article="article"
                            :key="article.article_id"/>
        </transition-group>


        <PaginationFixer v-show="maxPage > 1">
          <Pagination paginationId="managePage"/>
        </PaginationFixer>

        <transition name="fade">
          <LoadingWrapper v-if="loading">
            <Loading/>
          </LoadingWrapper>
        </transition>

      </ArticleListFixer>



    </ArticleListWrapper>

    <Cover v-if="cleaningRecycleBin">

    </Cover>

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
    LoadingWrapper,
    SearchBarWrapper,Cover} from './style'
import {
    ArticleClassification,
    ArticleFiling,
    SearchBar,
    Pagination,
    Loading} from '@/components'
import {
    ArticleIndexItem,
    FreshComments,
    TableHeader} from './components'

    import {
        ACTION_GET_ARTICLE_LIST_BY_CLASSIFICATION,
        ACTION_GET_ARTICLE_LIST_BY_FILING,
        ACTION_GET_ARTICLE_LIST_BY_KEYWORD,
        ACTION_GET_ARTICLE_LIST_DATA_OF_MANAGE_PAGE
    } from "../../store/modules/action_types";
    import {
        MUTATION_RESET_PAGINATION,
        MUTATION_RESET_CENTRAL_CONTROLLER, MUTATION_APPOINT_CONTEXT
    } from "../../store/modules/mutation_types";

export default {
    computed: {
        ...mapState({
            articleList: state => state.manage.articleList,
            currentPage: state => state.pagination.managePage.currentPage,
            loading: state => state.manage.loading,
            context: state => state.manage.context,
            cleaningRecycleBin: state => state.manage.header.loading,
            maxPage: state => state.pagination.managePage.maxPage
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
            mutation_appointContext: MUTATION_APPOINT_CONTEXT,
            mutation_resetCentralController: MUTATION_RESET_CENTRAL_CONTROLLER
        }),
        searchBarPostHandler() {
            if(this.context === 'search'){
                this.mutation_resetPagination('managePage')
            }else{
                this.mutation_resetCentralController('search')
                const payload = {
                    id: 'managePage',
                    context: 'search'
                }
                this.mutation_appointContext(payload)
                this.mutation_resetPagination('managePage')

            }
        },
        articleFilingPostHandler() {
            if(this.context === 'articleFiling'){
                this.mutation_resetPagination('managePage')
            }else{
                this.mutation_resetCentralController('articleFiling')
                const payload = {
                    id: 'managePage',
                    context: 'articleFiling'
                }
                this.mutation_appointContext(payload)
                this.mutation_resetPagination('managePage')
            }
        },
        articleClassificationPostHandler() {
            if(this.context === 'articleClassification'){
                this.mutation_resetPagination('managePage')
            }else{
                this.mutation_resetCentralController('articleClassification')
                const payload = {
                    id: 'managePage',
                    context: 'articleClassification'
                }
                this.mutation_appointContext(payload)
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
        Loading,
        SearchBarWrapper,
        Cover,
        TableHeader
    }
}
</script>

<style scoped>

  .slide-up-fade-enter-active {
    transition: all .4s ease;
  }

  .slide-up-fade-leave-active {
    position: absolute;
  }

  .slide-up-fade-enter{
    transform: translateY(50px);
    opacity: 0;
  }

  .slide-up-fade-leave-to {
    opacity: 0;
  }


  .slide-up-fade-item{
    transition: all .4s ease;
  }


  .fade-leave-active {
    transition: all .4s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
