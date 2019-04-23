<template>
    <ArticleEditorWrapper>
        <ToolBarWrapper>
            <ToolBar ref="toolBar"/>
        </ToolBarWrapper>

        <TextArea ref="textArea">

       </TextArea>
    </ArticleEditorWrapper>
</template>

<script>
    import {
        ArticleEditorWrapper,
        ToolBarWrapper,
        ToolBar,
        TextArea} from "./style";

    import E from 'wangeditor'
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_EDITING_ARTICLE} from "../../store/modules/mutation_types";
    import {API_UPLOAD_IMAGE} from "../../store/modules/api/request/apiConstant";
    import {getToken} from "../../store/modules/api/request/imageRequest";

    export default {
        computed: {
            ...mapState({
                content: state => state.articleEdit.content,
                widthOfWindow: state => state.meta.widthOfWindow,
                maxMobileWidth: state => state.meta.widthOfWindow
            })
        },
        mounted() {
            this.init()
        },
        methods: {
            ...mapMutations({
                mutation_appointEditingArticle: MUTATION_APPOINT_EDITING_ARTICLE
            }),
            appointEditingArticle(key,value) {
                const payload = {
                    key: key,
                    value: value
                }
                this.mutation_appointEditingArticle(payload)
            },
            init() {
                const articleEditor = new E(this.$refs.toolBar.$el,this.$refs.textArea.$el)

                articleEditor.customConfig.onchange = (html) => {
                    this.appointEditingArticle('content',html)
                }

                let allMenus = [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'image',  // 插入图片
                    'code',  // 插入代码
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'justify',  // 对齐方式
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'quote',  // 引用
                    'video',  // 插入视频
                    'undo',  // 撤销
                    'table',  // 表格
                    'list',  // 列表
                ]

                if(this.maxMobileWidth > this.widthOfWindow){
                    allMenus = [
                        'image',
                        'video'
                    ]
                }

                articleEditor.customConfig.menus = allMenus

                articleEditor.customConfig.uploadImgServer = API_UPLOAD_IMAGE

                articleEditor.customConfig.uploadFileName = 'img'

                articleEditor.customConfig.uploadImgHeaders = {
                    'Authorization': getToken()
                }

                articleEditor.customConfig.uploadImgHooks = {

                    fail: function (xhr, editor, result) {
                       console.log(result)
                    },

                    customInsert: function (insertImg, result, editor) {
                        var url = result.imgUrl
                        insertImg(url)
                    }
                }

                articleEditor.customConfig.customAlert = function (info) {
                    this.notify({show:true,noticeContent: "上传图片失败，请查看控制台"})
                }

                articleEditor.customConfig.zIndex = 1

                articleEditor.create()

                const payload = {
                    key:'editor',
                    value: articleEditor
                }

                this.mutation_appointEditingArticle(payload)
            }
        },
        components: {
            ArticleEditorWrapper,
            ToolBarWrapper,
            ToolBar,
            TextArea
        }
    }
</script>

<style scoped>

</style>