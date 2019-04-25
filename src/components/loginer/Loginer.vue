<template>
    <LoginerWrapper>
        <InputWrapper>
            <Input :ex="true" placeholder="用户名"/>
        </InputWrapper>

        <InputWrapper>
            <Input :ex="true" placeholder="密码"/>
        </InputWrapper>

        <CaptchaWrapper>
            <Captcha  placeholder="验证码" captchaHost="loginPage" />
        </CaptchaWrapper>

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
    import {LoginerWrapper,InputWrapper,CaptchaWrapper,ButtonWrapper,ButtonFixer} from './style'
    import {Button} from '../button'
    import Input from '../input/Input.vue'
    import Captcha from '../captcha/Captcha.vue'
    import {mapMutations, mapState} from "vuex";
    import {MUTATION_APPOINT_INPUT} from "../../store/modules/mutation_types";
    export default {
        computed: {
            ...mapState({
                username: state => state.login.common.username,
                password: state => state.login.common.password
            })
        },
        methods: {
            ...mapMutations({
                mutation_appointInput: MUTATION_APPOINT_INPUT
            })
        },
        components: {
            LoginerWrapper,
            InputWrapper,
            CaptchaWrapper,
            ButtonWrapper,
            Button,ButtonFixer,
            Input,
            Captcha}
    }
</script>

<style scoped>

</style>