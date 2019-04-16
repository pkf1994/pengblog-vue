<template>
    <TopCommentEditorWrapper>

        <Title>
            <span class="iconfont" :style="{fontSize:'1.6rem'}">&#xe632;</span>&nbsp;说点什么
        </Title>

        <Content>
            <TextArea :value="content.value"
                      placeholder="开始编辑你的评论"
                      :rows="4"
                      :showWarn="content.showWarn"
                      :warnMsg="content.warnMsg"
                      @input="(event) => inputHandler('content',event)"
                      @focus="() => shutdownWarnMsg('content')"/>
        </Content>

        <VisitorInfo>
            <InputWrapper :withMarginRight=true>
                <Input placeholder="你的名字"
                       type="text"
                       :value="name.value"
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
                       :showWarn="site.showWarn"
                       :warnMsg="site.warnMsg"
                       :iconClassName="site.iconClassName"
                       @input="(event) => inputHandler('site',event)"
                       @focus="() => {shutdownWarnMsg('site')}"/>
            </InputWrapper>

        </VisitorInfo>

        <SubmitButtonWrapper>

            <SubmitTextBtn v-on:click="tryToSubmitComment">
                <i class="fa fa-send-o"/>
               {{loading ? 'trying...' : 'submit'}}
            </SubmitTextBtn>

            <SubmitButton v-on:click="tryToSubmitComment">
                submit
            </SubmitButton>
        </SubmitButtonWrapper>

        <transition name="fade">
            <LoadingWrapper v-if="loading">
                <Loading :showTitle=false />
            </LoadingWrapper>
        </transition>

    </TopCommentEditorWrapper>
</template>

<script>
    import {Input, TextArea, Loading} from '@/components'
    import {TopCommentEditorWrapper,
            Name,
            Title,
            Content,
            VisitorInfo,
            InputWrapper,
            SubmitButtonWrapper,
            SubmitButton,
            SubmitTextBtn,
            LoadingWrapper} from './style'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_INPUT} from "../../../../store/modules/topCommentEditor/constant";
    import {CountLength} from "@/exJs/countStringLength";
    import {DeleteCookie,SetCookie,ReadCookie} from "@/exJs/cookieUtil";
    import {ACTION_TRY_SUBMIT_COMMENT, MUTATION_TRIGGER_IS_LOADING} from "../../../../store/modules/api/constant";


    const EMAIL_REGULAR = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const SITE_ADDRESS_REGULAR = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})(www\.){0,1}(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/

    export default {
        data() {
            return {
                loading: false
            }
        },

        computed: {
            ...mapState({
                name: state => state.topCommentEditor.name,
                content: state => state.topCommentEditor.content,
                email: state => state.topCommentEditor.email,
                site: state => state.topCommentEditor.site,
            })
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

                //loading
                const payload = {
                    id: 'topCommentEditor',
                    loading: true
                }
                this.mutation_triggerIsLoading(payload)

                //将数据存入cookie
                this.rememberMe(this.name.value,this.email.value,this.site.value)

                const payload_ = {
                    commentEditorId: 'topCommentEditor'
                }

                this.action_trySubmitComment(payload_)

            },
            //更新元素
            inputHandler(id, event) {
                const payload = {
                    id: id,
                    value: id === 'content' ? event : event.target.value,
                    commentEditorId: 'topCommentEditor'
                }
                this.mutation_appointInput(payload)
            },
            //关闭警告
            shutdownWarnMsg(id) {
                const payload = {
                    id: id,
                    showWarn: false,
                    commentEditorId: 'topCommentEditor'
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
            //从cookie读取数据
            writeVisitorInfoSilently() {
                let cookieMap = ReadCookie()

                if(cookieMap.name){
                    const payload = {
                        id: 'name',
                        value: cookieMap.name,
                        commentEditorId: 'topCommentEditor'
                    }
                    this.mutation_appointInput(payload)
                }

                if(cookieMap.email){
                    const payload = {
                        id: 'email',
                        value: cookieMap.email,
                        commentEditorId: 'topCommentEditor'
                    }
                    this.mutation_appointInput(payload)
                }

                if(cookieMap.site){
                    const payload = {
                        id: 'site',
                        value: cookieMap.site,
                        commentEditorId: 'topCommentEditor'
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
                                commentEditorId: 'topCommentEditor'
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
                                commentEditorId: 'topCommentEditor'
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        if(CountLength(value) > 14){
                            const payload_ = {
                                id: id,
                                showWarn: true,
                                warnMsg: '昵称太长',
                                commentEditorId: 'topCommentEditor'
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
                                commentEditorId: 'topCommentEditor'
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        if(value.match(EMAIL_REGULAR) == null){
                            const payload_ = {
                                id: id,
                                showWarn: true,
                                warnMsg: '非法的邮件地址',
                                commentEditorId: 'topCommentEditor'
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
                                commentEditorId: 'topCommentEditor'
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        return true
                }
            },
            ...mapMutations({
                mutation_appointInput: MUTATION_APPOINT_INPUT,
                mutation_triggerIsLoading: MUTATION_TRIGGER_IS_LOADING
            }),
            ...mapActions({
                action_trySubmitComment: ACTION_TRY_SUBMIT_COMMENT
            })
        },
        components: {
            Input,
            Title,
            TextArea,
            TopCommentEditorWrapper,
            Name,
            Content,
            VisitorInfo,
            InputWrapper,
            SubmitButtonWrapper,
            SubmitButton,
            SubmitTextBtn,
            LoadingWrapper,
            Loading
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

</style>