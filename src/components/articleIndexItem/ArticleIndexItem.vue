<template>
    <ArticleItemWrapper>

        <Header v-if="withHeader">

            <ArticleTitle :style="{justifyContent: 'center'}">
                文章标题
            </ArticleTitle>

            <ArticleAuthor>
                作者
            </ArticleAuthor>

            <ArticleLabel>
                标签
            </ArticleLabel>

            <ArticleReleaseTime>
                发布时间
            </ArticleReleaseTime>
        </Header>

        <Body>
            <!--<CheckBoxWrapper>
                <CheckBox/>
            </CheckBoxWrapper>-->

            <ArticleTitle>

                <ArticleTitleInner v-on:click="() => goTo('/article/' + article.article_id)">
                    {{article.article_title}}
                </ArticleTitleInner>

                <!--<DeleteButton>
                    <i class="fa fa-trash-o"/>
                </DeleteButton>-->


            </ArticleTitle>

            <ArticleAuthor>
                {{article.article_author}}
            </ArticleAuthor>

            <ArticleLabel>
                {{article.article_label}}
            </ArticleLabel>

            <ArticleReleaseTime>
                {{DateFormat('yyyy-MM-dd', new Date(article.article_releaseTime))}}
            </ArticleReleaseTime>

        </Body>

    </ArticleItemWrapper>
</template>

<script>
    import {
        ArticleItemWrapper,
        Header,
        Body,
        CheckBoxWrapper,
        ArticleTitle,
        ArticleTitleInner,
        DeleteButton,
        ArticleAuthor,
        ArticleLabel,
        ArticleReleaseTime} from './style'
    import Checkbox from '../checkbox/Checkbox.vue'
    import {DateFormat} from '@/exJs/dateFormatUtil'
    export default {
        props: {
            article: Object,
            withHeader: Boolean
        },
        methods: {
            DateFormat,
            goTo(path) {
                this.$router.push({path: path})
            }
        },
        components: {
            ArticleItemWrapper,
            Header,Body,
            CheckBoxWrapper,
            Checkbox,
            ArticleTitle,
            ArticleTitleInner,
            DeleteButton,
            ArticleAuthor,
            ArticleLabel,
            ArticleReleaseTime}
    }
</script>

<style scoped>

</style>