<template>
    <ArticlePageWrapper>
        <ArticleDetailFixer>
            <Article :article_id="article_id"/>
        </ArticleDetailFixer>

        <transition name="fade">
            <LoadingWrapper v-if="loading">
                <Loading/>
            </LoadingWrapper>
        </transition>
    </ArticlePageWrapper>
</template>
<script>
import {Loading,ForMore,ThemeJumbotron,Footer,Article} from '@/components'
import {ArticlePageWrapper,ArticleDetailFixer,LoadingWrapper} from './style'
import {mapState} from "vuex";

export default {
    props: {
        article_id: String
    },

    computed: {
        ...mapState({
            loading: state => state.home.loadingArticleDetail,
            prograssBarManager: state => state.prograssBar
        })
    },

    created() {
        this.prograssBarManager.nanobarGoToMilePost()
    },


    components: {
        ArticlePageWrapper,ArticleDetailFixer,LoadingWrapper,Loading,Article
    }
}
</script>

<style scoped>
    .fade-enter-active,.fade-leave-active {
        transition: all .4s ease;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0.5;
    }

</style>
