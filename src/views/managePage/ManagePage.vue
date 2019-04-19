<template>

  <ManagePageWrapper>

    <CentralController>

      <SearchBar searchBarId="managePage"/>

      <ArticleFiling/>

      <ArticleClassification/>
      <!--<ArticleClassification/>

      <FreshComments/>-->
      <FreshComments/>

    </CentralController>

  </ManagePageWrapper>

</template>

<script>
import {mapActions, mapState} from 'vuex'
import {ManagePageWrapper,CentralController} from './style'
import {SearchBar,ArticleFiling,ArticleClassification,FreshComments} from '@/components'


export default {
    components: {
        ManagePageWrapper,CentralController,SearchBar,ArticleFiling,ArticleClassification,FreshComments
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
