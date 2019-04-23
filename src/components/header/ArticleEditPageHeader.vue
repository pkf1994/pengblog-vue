<template>
    <HeaderWrapper>

        <Inner>
            <Logo v-on:click.native="() => goTo('/')"/>
            <GapLineVertical/>
            <Title>新增</Title>

            <ArticleEditInfo v-if="!savingDraft && alreadySave">
                草稿已保存
            </ArticleEditInfo>

            <ArticleEditInfo v-if="savingDraft">
                草稿保存中. . .
            </ArticleEditInfo>
        </Inner>

    </HeaderWrapper>
</template>

<script>
    import {HeaderWrapper,NavList,Title,Inner,GapLineVertical,ArticleEditInfo} from "./style"
    import {Logo} from './components'
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                alreadySave: false
            }
        },
        computed: {
            ...mapState({
                savingDraft: state => state.articleEdit.savingDraft
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
            goTo(path) {
                this.$router.push({path:path})
            }
        },
        components:{
            HeaderWrapper,
            Logo,
            NavList,
            Title,
            Inner,
            GapLineVertical,
            ArticleEditInfo
        }
    }
</script>

<style scoped>

</style>