<template>
    <SubCommentEditorWrapper>

        <Content>
            <TextArea :value="content.value"
                      placeholder="开始编辑你的评论"
                      :rows="4"
                      :max-length="300"
                      :showWarn="content.showWarn"
                      :warnMsg="content.warnMsg"
                      @input="(event) => inputHandler('content',event)"
                      @focus="() => shutdownWarnMsg('content')"/>

            <EmojiPickerFixer>
                <EmojiPicker :post-handler="appendEmoji"/>
            </EmojiPickerFixer>
        </Content>

        <VisitorInfo>
            <InputWrapper :withMarginRight=true>
                <Input placeholder="你的名字"
                       type="text"
                       :value="name.value"
                       :max-length="12"
                       :showWarn="name.showWarn"
                       :warnMsg="name.warnMsg"
                       :iconClassName="name.iconClassName"
                       @input="(event) => inputHandler('name',event)"
                       @focus="() => {shutdownWarnMsg('name')}"/>
            </InputWrapper>

            <InputWrapper>
                <Input placeholder="你的邮箱"
                       type="text"
                       :value="email.value"
                       :max-length="30"
                       :showWarn="email.showWarn"
                       :warnMsg="email.warnMsg"
                       :iconClassName="email.iconClassName"
                       @input="(event) => inputHandler('email',event)"
                       @focus="() => {shutdownWarnMsg('email')}"/>
            </InputWrapper>

            <InputWrapper :withMarginRight=true>
                <Input placeholder="你的个人网站？"
                       type="text"
                       :value="site.value"
                       :max-length="30"
                       :showWarn="site.showWarn"
                       :warnMsg="site.warnMsg"
                       :iconClassName="site.iconClassName"
                       @input="(event) => inputHandler('site',event)"
                       @focus="() => {shutdownWarnMsg('site')}"/>
            </InputWrapper>

            <SubmitButtonWrapper>

                <SubmitButton v-on:click="tryToSubmitComment">
                    <i v-if="isMobile" class="fa fa-send-o submit-btn-icon"/>
                    <span v-if="!isMobile">submit</span>
                </SubmitButton>

            </SubmitButtonWrapper>

        </VisitorInfo>



        <transition name="fade">
            <LoadingWrapper v-if="loading">
                <Loading :showTitle=false />
            </LoadingWrapper>
        </transition>

    </SubCommentEditorWrapper>
</template>

<script>
    import {Loading} from '@/components'
    import Input from '../../../../../input/Input.vue'
    import TextArea from '../../../../../textArea/TextArea.vue'
    import EmojiPicker from '../../../../../emojiPicker/EmojiPicker.vue'
    import {SubCommentEditorWrapper,
            Name,
            Title,
            Content,
            VisitorInfo,
            InputWrapper,
            SubmitButtonWrapper,
            SubmitButton,
            LoadingWrapper,
        EmojiPickerFixer} from './style'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {DeleteCookie,SetCookie,ReadCookie} from "@/exJs/cookieUtil";
    import {
        MUTATION_APPEND_TO_COMMENT_EDITOR,
        MUTATION_APPOINT_INPUT,
        MUTATION_TRIGGER_IS_LOADING
    } from "../../../../../../store/modules/mutation_types";
    import {ACTION_TRY_SUBMIT_COMMENT} from "../../../../../../store/modules/action_types";


    const EMAIL_REGULAR = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const SITE_ADDRESS_REGULAR = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})(www\.){0,1}(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/

    export default {

        computed: {
            ...mapState({
                name: state => state.subCommentEditor.name,
                content: state => state.subCommentEditor.content,
                email: state => state.subCommentEditor.email,
                site: state => state.subCommentEditor.site,
                loading: state => state.subCommentEditor.loading,
                maxMobileWidth: state => state.meta.maxMobileWidth
            }),
            isMobile() {
                return window.innerWidth < this.maxMobileWidth
            }
        },

        created() {
            //从cookie读取数据
            this.writeVisitorInfoSilently()
        },

        methods: {
            tryToSubmitComment() {
                if(
                    //审查各字段合法性
                    !(this.checkInput('content',this.content.value) &&
                    this.checkInput('name',this.name.value) &&
                    this.checkInput('email',this.email.value) &&
                    this.checkInput('site',this.site.value))
                ){
                    return
                }

                //将数据存入cookie
                this.rememberMe(this.name.value,this.email.value,this.site.value)

                const payload_ = {
                    commentEditorId: 'subCommentEditor'
                }

                this.action_trySubmitComment(payload_)

            },
            //更新元素
            inputHandler(id, event) {
                const payload = {
                    id: id,
                    value: id === 'content' ? event : event.target.value,
                    commentEditorId: 'subCommentEditor'
                }
                this.mutation_appointInput(payload)
            },
            //关闭警告
            shutdownWarnMsg(id) {
                const payload = {
                    id: id,
                    showWarn: false,
                    commentEditorId: 'subCommentEditor'
                }
                this.mutation_appointInput(payload)
            },
            //记录信息到cookie
            rememberMe(name,email,site) {
                DeleteCookie('name')
                DeleteCookie('email')
                DeleteCookie('site')

                SetCookie('name',name,30)
                SetCookie('email',email,30)
                SetCookie('site',site,30)
            },
            appendEmoji(value) {
                const payload = {
                    commentEditorId: 'subCommentEditor',
                    value: value
                }
                this.mutation_appendToCommentEditor(payload)
            },
            //从cookie读取数据
            writeVisitorInfoSilently() {
                let cookieMap = ReadCookie()

                if(cookieMap.name){
                    const payload = {
                        id: 'name',
                        value: cookieMap.name,
                        commentEditorId: 'subCommentEditor'
                    }
                    this.mutation_appointInput(payload)
                }

                if(cookieMap.email){
                    const payload = {
                        id: 'email',
                        value: cookieMap.email,
                        commentEditorId: 'subCommentEditor'
                    }
                    this.mutation_appointInput(payload)
                }

                if(cookieMap.site){
                    const payload = {
                        id: 'site',
                        value: cookieMap.site,
                        commentEditorId: 'subCommentEditor'
                    }
                    this.mutation_appointInput(payload)
                }

            },
            //检查
            checkInput(id,value) {
                switch (id) {
                    case 'content':
                        if(value.trim() === ''){
                            const payload = {
                                id: id,
                                showWarn: true,
                                warnMsg: '您还未填写任何内容',
                                commentEditorId: 'subCommentEditor'
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        return true

                    case 'name':
                        if(value.trim() === '') {
                            console.log('name')
                            const payload = {
                                id: id,
                                showWarn: true,
                                warnMsg: '昵称不能为空',
                                commentEditorId: 'subCommentEditor'
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        if(value.length > 14){
                            const payload_ = {
                                id: id,
                                showWarn: true,
                                warnMsg: '昵称太长',
                                commentEditorId: 'subCommentEditor'
                            }
                            this.mutation_appointInput(payload_)
                            return false
                        }
                        return true
                    case 'email':
                        if(value.trim() === '') {
                            const payload = {
                                id: id,
                                showWarn: true,
                                warnMsg: '邮件不能为空',
                                commentEditorId: 'subCommentEditor'
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        if(value.match(EMAIL_REGULAR) == null){
                            const payload_ = {
                                id: id,
                                showWarn: true,
                                warnMsg: '非法的邮件地址',
                                commentEditorId: 'subCommentEditor'
                            }
                            this.mutation_appointInput(payload_)
                            return false
                        }
                        return true
                    case 'site':
                        if(value.trim() === ''){
                            return true
                        }
                        if(value.match(SITE_ADDRESS_REGULAR) == null){
                            const payload = {
                                id: id,
                                showWarn: true,
                                warnMsg: '请填写正确格式的网址',
                                commentEditorId: 'subCommentEditor'
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        return true
                }
            },
            ...mapMutations({
                mutation_appointInput: MUTATION_APPOINT_INPUT,
                mutation_triggerIsLoading: MUTATION_TRIGGER_IS_LOADING,
                mutation_appendToCommentEditor: MUTATION_APPEND_TO_COMMENT_EDITOR
            }),
            ...mapActions({
                action_trySubmitComment: ACTION_TRY_SUBMIT_COMMENT
            })
        },
        components: {
            Input,
            Title,
            TextArea,
            SubCommentEditorWrapper,
            Name,
            Content,
            VisitorInfo,
            InputWrapper,
            SubmitButtonWrapper,
            SubmitButton,
            LoadingWrapper,
            Loading,
            EmojiPicker,
            EmojiPickerFixer
        }
    }
</script>

<style scoped>
    .fade-enter-active,.fade-leave-active{
        transition: all .4s ease;
    }

    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
    .submit-btn-icon{
        transform: scale(1.5);
    }

</style>