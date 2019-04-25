<template>
    <LoginerWrapper>
        <InputWrapper>
            <Input :ex="true"
                   placeholder="手机号码"
                   type="text"
                   :value="phoneNumber"
                   @input="(event) => appointInput('phoneNumber',event.target.value)"/>
        </InputWrapper>

        <InputWrapper>

            <Input :ex="true"
                   placeholder="动态密码"
                   type="password"
                   :value="dynamicPassword"
                   @input="(event) => appointInput('dynamicPassword',event.target.value)"/>
            <GetSmsButtonWrapper>
                <Button fontSize="0.8rem;"
                        backgroundColor="#EEEEEE"
                        :disabled="secondToNextGetting > 0"
                        borderColor="#EEEEEE"
                        @click="tryToGetSms">
                    {{secondToNextGetting > 0 ? '已发送（' + secondToNextGetting + 's）' : (haveGotSmsOnce ? '再试一次' : '获取动态密码')}}
                </Button>
            </GetSmsButtonWrapper>
        </InputWrapper>

        <ButtonWrapper>
            <ButtonFixer>
                <Button backgroundColor='#CCFFCC'
                        borderColor='#CCFFCC'
                        color="#009900">
                    <i class='fa fa-sign-in'/>&nbsp;&nbsp;登录&nbsp;&nbsp;
                </Button>
            </ButtonFixer>

        </ButtonWrapper>
    </LoginerWrapper>
</template>

<script>
    import {LoginerWrapper,InputWrapper,CaptchaWrapper,ButtonWrapper,ButtonFixer,GetSmsButtonWrapper} from './style'
    import {Button} from '../button'
    import Input from '../input/Input.vue'
    import Captcha from '../captcha/Captcha.vue'
    import {mapMutations, mapState} from "vuex";
    import {
        MUTATION_APPOINT_INPUT,
        MUTATION_APPOINT_SECOND_TO_NEXT_GETTING_SMS,
        MUTATION_COUNTDOWN_SECOND_TO_NEXT_GETTING_SMS
    } from "../../store/modules/mutation_types";
    export default {
        data() {
            return {
                countdownSecondToNextGettingTimer:undefined
            }
        },
        computed: {
            ...mapState({
                secondToNextGetting: state => state.login.dynamic.secondToNextGetting,
                haveGotSmsOnce: state => state.login.dynamic.haveGotSmsOnce,
                phoneNumber: state => state.login.dynamic.phoneNumber,
                dynamicPassword: state => state.login.dynamic.dynamicPassword
            })
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
            tryToGetSms() {
                this.mutation_appointSecondToNextGettingSms(59)
            },
            appointInput(key,value) {
                const payload = {
                    loginMode: 'dynamic',
                    key: key,
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
            GetSmsButtonWrapper}
    }
</script>

<style scoped>

</style>