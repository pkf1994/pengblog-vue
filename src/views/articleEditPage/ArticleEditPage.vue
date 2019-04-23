<template>
        <ArticleEditPageWrapper>
            <MainArea>
                <TitleImageWrapper>
                    <TitleImageEditor/>
                </TitleImageWrapper>

                <TitleTextareaWrapper>

                <textarea id="title-textarea"
                          rows="1"
                          :value="title"
                          v-on:keydown="keydownHandler"
                          v-on:input="(event) => appointEditingArticle('title',event.target.value)"
                          placeholder="请输入标题"/>

                    <TitleLengthWarn :show="30 < lengthOfTitle">
                        <span v-if="lengthOfTitle < 51">还可以输入{{50 - lengthOfTitle}}个字</span>

                        <span v-if="lengthOfTitle > 50" :style="{color:'red'}">已超出{{lengthOfTitle - 50}}个字</span>
                    </TitleLengthWarn>

                    <ArticleInfo>
                        <Input elId='labelInput'
                               :value="label"
                               v-on:input="(event) => appointEditingArticle('label',event.target.value)"
                               placeholder="标签"
                               type="text"
                               fontSize="22px"
                               :maxLength=11
                               :inputStyle="{width:'100px'}"
                               backgroundColor="rgba(0, 132, 255, 0.1)"
                               :disableFocusStyle=true
                               borderColor="rgba(0, 132, 255, 0.1)"
                               iconClassName="fa fa-tag"
                               iconColor="rgba(0, 132, 255, 1)"
                               fontColor="rgba(0, 132, 255, 1)" />

                        <Gap>&nbsp;&nbsp;</Gap>


                        <Input elId='authorInput'
                               :value="author"
                               v-on:input="(event) => appointEditingArticle('author',event.target.value)"
                               placeholder="署名"
                               type="text"
                               fontSize="22px"
                               :maxLength=11
                               :inputStyle="{width:'100px'}"
                               borderColor="rgba(0, 255, 132, 0.1)"
                               backgroundColor="rgba(0, 255, 132, 0.1)"
                               :disableFocusStyle=true
                               iconClassName="fa fa-pencil"
                               iconColor="#44BB44"
                               fontColor="#44BB44"/>

                    </ArticleInfo>
                </TitleTextareaWrapper>

                <ArticleEditorWrapper>
                    <ArticleEditor/>
                </ArticleEditorWrapper>
            </MainArea>

            <LoadingWrapper v-if="savingArticle">
                <Loading/>
            </LoadingWrapper>
        </ArticleEditPageWrapper>

</template>

<script>
    import {
        ArticleEditPageWrapper,
        MainArea,
        TitleImageWrapper,
        TitleTextareaWrapper,
        ArticleInfo,
        TitleLengthWarn,
        Gap,
        ArticleEditorWrapper,
        LoadingWrapper} from './style'
    import {TitleImageEditor,Input,ArticleEditor,Loading} from '@/components'
    import {MUTATION_APPOINT_EDITING_ARTICLE} from "../../store/modules/mutation_types";
    import {mapActions, mapMutations, mapState} from "vuex";
    import {AutoTextarea} from "../../exJs/autoTextarea";
    import {AutoInput} from "../../exJs/autoInput";
    import {ACTION_APPOINT_EDITING_ARTICLE, ACTION_GET_DRAFT} from "../../store/modules/action_types";
    import {DispatchUIEvent} from "../../exJs/dispatchEvent";

    export default {
        mounted() {
            this.initTitleTextarea()
            this.initMetaInput()
        },
        computed: {
            ...mapState({
                title: state => state.articleEdit.title,
                label: state => state.articleEdit.label,
                author: state => state.articleEdit.author,
                lengthOfTitle: state => state.articleEdit.title ? state.articleEdit.title.length : 0,
                savingArticle: state => state.articleEdit.savingArticle,
                resolveDraftFlag: state => state.articleEdit.resolveDraftFlag
            })
        },
        created() {
            this.initData()
        },
        watch: {
            label(newOne,oldOne){
                if(oldOne === undefined) {
                    this.$nextTick(() => {
                        this.DispatchUIEvent('labelInput','keyup')
                    })
                }
            },
            author(newOne,oldOne){
                if(oldOne === undefined) {
                    this.$nextTick(() => {
                        this.DispatchUIEvent('authorInput','keyup')
                    })
                }
            },
            title(newOne,oldOne){
                if(oldOne === undefined) {
                    this.$nextTick(() => {
                        this.DispatchUIEvent('title-textarea','focus')
                    })
                }
            }
        },
        methods: {
            ...mapActions({
                action_getDraft: ACTION_GET_DRAFT,
                action_appointEditingArticle: ACTION_APPOINT_EDITING_ARTICLE
            }),
            appointEditingArticle(key,value) {
                const payload = {
                    key: key,
                    value: value
                }
                this.action_appointEditingArticle(payload)
            },
            keydownHandler(event) {
                if(event.keyCode === 13){
                    if (window.event) {
                        window.event.returnValue = false;
                    } else {
                        event.preventDefault(); //for firefox
                    }
                }
            },
            initTitleTextarea() {
                let titleTextarea = document.getElementById("title-textarea")
                AutoTextarea(titleTextarea)
            },
            initMetaInput() {
                let labelInput = document.getElementById('labelInput')
                let authorInput = document.getElementById('authorInput')
                AutoInput(labelInput,22)
                AutoInput(authorInput,22)
            },
            initData() {
                this.action_getDraft()
            },
            DispatchUIEvent
        },
        components: {
            ArticleEditPageWrapper,
            MainArea,
            TitleImageWrapper,
            TitleImageEditor,
            TitleTextareaWrapper,
            TitleLengthWarn,
            ArticleInfo,
            Input,
            Gap,
            ArticleEditor,
            ArticleEditorWrapper,
            LoadingWrapper,
            Loading
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

#title-textarea{
    width: 100%;
    margin: 1rem 0;
    padding: 0 0.5rem;
    min-height:2rem;
    font-size:2rem;
    line-height: 1.5;
    word-break: break-all;
    font-weight: bold;
    font-family: Microsoft YaHei;
    overflow: hidden;
    display: block;
    outline: none;
    border: none;
    resize: none;
    transition: all .4s ease;
}
#title-textarea::-webkit-scrollbar {
    display: none;
    transition: all .4s ease;
}
#title-textarea::-webkit-input-placeholder{
    color:#BBBBBB;
}
</style>