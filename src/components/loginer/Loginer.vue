<template>
    <LoginerWrapper>
        <InputWrapper>
            <Input :ex="true"
                   placeholder="用户名"
                   :value="username.value"
                   :showWarn="username.showWarn"
                   :warnMsg="username.warnMsg"
                   @focus="focusHandler"
                   @input="(event) => inputHandler('username',event.target.value)"/>
        </InputWrapper>

        <InputWrapper>
            <Input :ex="true"
                   placeholder="密码"
                   :value="password.value"
                   :showWarn="password.showWarn"
                   :warnMsg="password.warnMsg"
                   @focus="focusHandler"
                   @input="(event) => inputHandler('password',event.target.value)"/>
        </InputWrapper>

        <CaptchaWrapper>
            <Captcha  placeholder="验证码"
                      captchaHost="loginPage"
                      :focus-handler="focusHandler"/>
        </CaptchaWrapper>

        <ButtonWrapper>
            <ButtonFixer>
                <Button backgroundColor='#CCFFCC'
                        borderColor='#CCFFCC'
                        color="#009900"
                        :disabled="loading"
                        v-on:click.native="tryToLogin">
                    <i class='fa fa-sign-in' v-if="!loading"/>&nbsp;&nbsp;
                    {{loading ? 'trying...' : '  登录  '}}&nbsp;&nbsp;
                </Button>
            </ButtonFixer>

        </ButtonWrapper>

        <LoadingWrapper v-if="loading">
        </LoadingWrapper>
    </LoginerWrapper>
</template>

<script>
    import {
        InputWrapper,
        CaptchaWrapper,
        ButtonWrapper,
        ButtonFixer,
        LoginerWrapper,
        LoadingWrapper} from './style'
    import {Button} from '../button'
    import Input from '../input/Input.vue'
    import Captcha from '../captcha/Captcha.vue'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_INPUT} from "../../store/modules/mutation_types";
    import {ACTION_CHECK_CAPTCHA, ACTION_LOGIN} from "../../store/modules/action_types";
    export default {
        computed: {
            ...mapState({
                username: state => state.login.common.username,
                password: state => state.login.common.password,
                loading: state => state.login.loading
            })
        },
        methods: {
            ...mapMutations({
                mutation_appointInput: MUTATION_APPOINT_INPUT
            }),
            ...mapActions({
                action_checkCaptcha: ACTION_CHECK_CAPTCHA,
                action_login: ACTION_LOGIN
            }),
            inputHandler(id,value) {
                const payload = {
                    loginMode: 'common',
                    id: id,
                    value: value
                }
                this.mutation_appointInput(payload)
            },
            focusHandler() {
                const payload = {
                    loginMode: 'common',
                    id: 'username',
                    showWarn: false
                }
                this.mutation_appointInput(payload)

                const payload_ = {
                    loginMode: 'common',
                    id: 'password',
                    showWarn: false
                }
                this.mutation_appointInput(payload_)
            },
            async tryToLogin() {

                if(
                    //审查各字段合法性
                    !(this.checkInput('username',this.username.value) &&
                        this.checkInput('password',this.password.value))
                ){
                    return
                }
                const payload = {
                    captchaHost: 'loginPage'
                }

                try{
                    await this.action_checkCaptcha(payload)
                }catch (err) {
                    //若发生异常，则中止
                    return
                }

                this.action_login()
            },
            checkInput(id,value) {
                switch (id) {
                    case 'username':
                        if(value.trim() === ''){
                            const payload = {
                                loginMode: 'common',
                                id: id,
                                showWarn: true,
                                warnMsg: '请填写用户名',
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        return true

                    case 'password':
                        if(value.trim() === '') {
                            const payload = {
                                loginMode: 'common',
                                id: id,
                                showWarn: true,
                                warnMsg: '请填写密码',
                            }
                            this.mutation_appointInput(payload)
                            return false
                        }
                        if(value.length > 100){
                            const payload_ = {
                                loginMode: 'common',
                                id: id,
                                showWarn: true,
                                warnMsg: '密码不可能有这么长',
                            }
                            this.mutation_appointInput(payload_)
                            return false
                        }
                        return true
                }

                return false
            }
        },
        components: {
            InputWrapper,
            CaptchaWrapper,
            LoginerWrapper,
            ButtonWrapper,
            Button,
            ButtonFixer,
            LoadingWrapper,
            Input,
            Captcha}
    }
</script>

<style scoped>

</style>