<template>
    <HeaderWrapper>

        <Inner>
            <Logo v-on:click.native="() => goTo('/')"/>
            <GapLineVertical/>
            <Title>写文章</Title>

            <ArticleEditInfo v-if="!savingDraft && alreadySave">
                草稿已保存
            </ArticleEditInfo>

            <ArticleEditInfo v-if="savingDraft">
                草稿保存中. . .
            </ArticleEditInfo>
        </Inner>


        <Item :disabled="!submitableAsArticle" v-on:click="submitArticle">
            <span v-if="!savingArticle">
                <span class="iconfont"
                      :style="{fontSize:'1.4rem'}">&#xe600;</span>发布
            </span>

            <span v-if="savingArticle">
                <img :src=loadingSpin alt="Loading icon" :style="{transform:'scale(0.7)'}"/>
                <span class="iconfont"
                      :style="{fontSize:'1.4rem'}">&#xe600;</span>发布中...
            </span>

        </Item>

    </HeaderWrapper>
</template>

<script>
    import {
        HeaderWrapper,
        NavList,
        Title,
        Inner,
        Item,
        GapLineVertical,
        ArticleEditInfo} from "./style"
    import {Logo} from './components'
    import {mapActions, mapState} from "vuex";
    import {ACTION_SAVE_ARTICLE} from "../../store/modules/action_types";
    import loadingSpin from '@/assets/svg/loading-spin.svg'
    export default {
        data() {
            return {
                alreadySave: false,
                loadingSpin
            }
        },
        computed: {
            ...mapState({
                savingDraft: state => state.articleEdit.savingDraft,
                savingArticle: state => state.articleEdit.savingArticle,
                submitableAsArticle: state => state.articleEdit.submitableAsArticle
            })
        },
        watch: {
            savingDraft(newOne,oldOne){
                if(newOne === false && oldOne === true) {
                    this.alreadySave = true
                }
            }
        },
        methods: {
            ...mapActions({
                action_saveArticle: ACTION_SAVE_ARTICLE
            }),
            goTo(path) {
                this.$router.push({path:path})
            },
            async submitArticle() {
                const _this = this

                const payload = {
                    article_type: 'article'
                }
                await this.action_saveArticle(payload)

                setTimeout(() => {
                    _this.$router.push({path:'/'})
                },2000)
            }
        },
        components:{
            HeaderWrapper,
            Logo,
            NavList,
            Title,
            Inner,
            Item,
            GapLineVertical,
            ArticleEditInfo
        }
    }
</script>

<style scoped>

</style>