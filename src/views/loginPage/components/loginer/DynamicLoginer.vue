<template>
    <LoginerWrapper>
        <InputWrapper>
            <Input :ex="true"
                   placeholder="手机号码"
                   type="text"
                   :value="phoneNumber"
                   :style="{flexGrow:'1'}"
                   @input="(event) => inputHandler('phoneNumber',event.target.value)"/>
        </InputWrapper>

        <InputWrapper>

            <Input :ex="true"
                   placeholder="动态密码"
                   type="password"
                   :value="dynamicPassword"
                   :style="{flexGrow:'1'}"
                   @input="(event) => inputHandler('dynamicPassword',event.target.value)"/>
            <GetSmsButtonWrapper>
                <Button fontSize="0.8rem;"
                        backgroundColor="#EEEEEE"
                        :disabled="secondToNextGetting > 0 || gettingSms"
                        borderColor="#EEEEEE"
                        @click="tryToGetSms">
                    {{buttonStr}}
                </Button>
            </GetSmsButtonWrapper>
        </InputWrapper>

        <ButtonWrapper>
            <ButtonFixer>
                <Button backgroundColor='#CCFFCC'
                        borderColor='#CCFFCC'
                        color="#009900"
                        :disabled="loading"
                        v-on:click="tryToLoginWithDynamicPassword">
                    <i class='fa fa-sign-in' v-if="!loading"/>&nbsp;&nbsp;
                    {{loading ? 'trying...' : '登录'}}&nbsp;&nbsp;
                </Button>
            </ButtonFixer>

        </ButtonWrapper>

        <LoadingWrapper v-if="loading">

        </LoadingWrapper>
    </LoginerWrapper>
</template>

<script>
    import {LoginerWrapper,InputWrapper,CaptchaWrapper,ButtonWrapper,ButtonFixer,GetSmsButtonWrapper,LoadingWrapper} from './style'
    import {Button,Input,Captcha} from '@/components'
    import {mapActions, mapMutations, mapState} from "vuex";
    import {
        MUTATION_APPOINT_INPUT,
        MUTATION_APPOINT_SECOND_TO_NEXT_GETTING_SMS,
        MUTATION_COUNTDOWN_SECOND_TO_NEXT_GETTING_SMS
    } from "../../../../store/modules/mutation_types";
    import {ACTION_GET_SMS, ACTION_LOGIN_WITH_DYNAMIC_PASSWORD} from "../../../../store/modules/action_types";
    export default {
        data() {
            return {
                countdownSecondToNextGettingTimer:undefined
            }
        },
        computed: {
            ...mapState({
                loading: state => state.login.loading,
                secondToNextGetting: state => state.login.dynamic.secondToNextGetting,
                haveGotSmsOnce: state => state.login.dynamic.haveGotSmsOnce,
                phoneNumber: state => state.login.dynamic.phoneNumber.value,
                dynamicPassword: state => state.login.dynamic.dynamicPassword.value,
                gettingSms: state => state.login.dynamic.loading
            }),
            buttonStr() {
                if(this.gettingSms) {
                    return 'trying...'
                }
                if(this.secondToNextGetting > 0) {
                    return '已发送（' + this.secondToNextGetting + 's）'
                }
                if(this.haveGotSmsOnce) {
                    return '再试一次'
                }
                return '获取动态密码'
            }
        },
        watch: {
            secondToNextGetting(newOne,oldOne) {
                const _this = this
                if(newOne === 59) {
                    this.countdownSecondToNextGettingTimer = setInterval(() => {
                        _this.mutation_countDownSecondToNextGettingSms()
                    },1000)
                }
                if(newOne === 0) {
                    window.clearInterval(this.countdownSecondToNextGettingTimer)
                }
            }
        },
        methods: {
            ...mapMutations({
                mutation_countDownSecondToNextGettingSms: MUTATION_COUNTDOWN_SECOND_TO_NEXT_GETTING_SMS,
                mutation_appointSecondToNextGettingSms: MUTATION_APPOINT_SECOND_TO_NEXT_GETTING_SMS,
                mutation_appointInput: MUTATION_APPOINT_INPUT
            }),
            ...mapActions({
                action_getSms: ACTION_GET_SMS,
                action_loginWithDynamicPassword: ACTION_LOGIN_WITH_DYNAMIC_PASSWORD
            }),
            tryToGetSms() {

                this.action_getSms()

            },
            tryToLoginWithDynamicPassword() {

                this.action_loginWithDynamicPassword()

            },
            inputHandler(id,value) {
                const payload = {
                    loginMode: 'dynamic',
                    id: id,
                    value: value
                }
                this.mutation_appointInput(payload)
            }
        },
        components: {
            LoginerWrapper,
            InputWrapper,
            CaptchaWrapper,
            ButtonWrapper,
            Button,
            ButtonFixer,
            Input,
            Captcha,
            GetSmsButtonWrapper,
            LoadingWrapper}
    }
</script>

<style scoped>

</style>