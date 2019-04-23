<template>
    <TitleImageEditorWrapper :heightOfTitleImageEdit="heightOfTitleImageEdit">
        <Label for="titleImageInput">
            <input id="titleImageInput"
                       v-on:input="changeHandler"
                       type="file" accept=".jpeg, .jpg, .png"/>

            <ButtonIcon>
                <i v-if="!loading" class="fa fa-camera fa-2x" />
            </ButtonIcon>
        </Label>

        <TitleImageFrame :src="titleImageUrl"
                         ref="titleImageFrame"/>

        <DeleteBtn title="删除" v-if="titleImageUrl!==undefined" v-on:click="deleteTitleImage">
            <span class="iconfont" :style="{fontSize:'1.4rem'}">&#xe60c;</span>
        </DeleteBtn>

        <loadingWrapper v-if="loading">
            <Loading/>
        </loadingWrapper>
    </TitleImageEditorWrapper>
</template>

<script>
    import {
        TitleImageEditorWrapper,
        Label,
        FileInput,
        ButtonIcon,
        TitleImageFrame,
        DeleteBtn,
        loadingWrapper} from "./style";
    import {Loading} from '@/components'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {ACTION_APPOINT_EDITING_ARTICLE, ACTION_UPLOAD_IMAGE} from "../../store/modules/action_types";
    import {MUTATION_APPOINT_EDITING_ARTICLE} from "../../store/modules/mutation_types";

    export default {
        data() {
            return {
                heightOfTitleImageEdit: '240px'
            }
        },
        computed: {
            ...mapState({
                titleImageUrl: state => state.articleEdit.titleImageEditor.titleImageUrl,
                loading: state => state.articleEdit.titleImageEditor.loading
            })
        },
        mounted() {
            this.recordHeightOfTitleImageEdit()
        },
        watch: {
            titleImageUrl(newOne,oldOne) {
                if(!newOne) {
                    this.heightOfTitleImageEdit = '240px'
                }
            }
        },
        methods: {
            ...mapActions({
                action_uploadImage: ACTION_UPLOAD_IMAGE,
                action_appointEditingArticle: ACTION_APPOINT_EDITING_ARTICLE
            }),
            async changeHandler(event){
                const payload = {
                    id: 'titleImageEditor',
                    img: event.target.files[0]
                }
                await this.action_uploadImage(payload)
                const _this = this
                setTimeout(() => {
                    _this.recordHeightOfTitleImageEdit()
                },500)
            },
            recordHeightOfTitleImageEdit() {
                if(!this.titleImageUrl){
                    return
                }
                this.heightOfTitleImageEdit = window.getComputedStyle(this.$refs.titleImageFrame.$el).height
            },
            deleteTitleImage() {
                const payload = {
                    key: 'titleImageUrl',
                    value: undefined
                }
                this.action_appointEditingArticle(payload)
            }
        },
        components: {
            TitleImageEditorWrapper,
            Label,
            FileInput,
            ButtonIcon,
            TitleImageFrame,
            DeleteBtn,
            loadingWrapper,
            Loading
        }
    }
</script>

<style scoped>
#titleImageInput{
    display: none;
}
</style>