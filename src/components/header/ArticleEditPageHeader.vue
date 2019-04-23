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

            <SavingArticle v-if="savingArticle">
                <img :src=loadingSpin alt="Loading icon" :style="{transform:'scale(0.7)'}"/>
                发布中...
            </SavingArticle>

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
        ArticleEditInfo,
        SavingArticle} from "./style"
    import {Logo} from './components'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {ACTION_SAVE_ARTICLE} from "../../store/modules/action_types";
    import loadingSpin from '@/assets/svg/loading-spin.svg'
    import {MUTATION_RESET, MUTATION_TRIGGER_IS_LOADING} from "../../store/modules/mutation_types";
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
            ...mapMutations({
                mutation_reset: MUTATION_RESET,
                mutation_triggerIsLoading: MUTATION_TRIGGER_IS_LOADING
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
                    const payload_ = {
                        id: 'articleEditPage'
                    }
                    _this.mutation_reset(payload_)

                    const payload__ = {
                        loading: false,
                        id: 'articleEdit_savingArticle'
                    }
                    _this.mutation_triggerIsLoading(payload__)
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
            ArticleEditInfo,
            SavingArticle
        }
    }
</script>

<style scoped>

</style>