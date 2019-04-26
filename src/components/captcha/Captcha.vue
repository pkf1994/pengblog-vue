<template>
    <CaptchaWrapper>
        <Input :value="captchaValue"
               :placeholder="placeholder"
               :ex=true
               :showWarn="showWarn"
               :warnMsg="warnMsg"
               @focus="focusHandler_"
               @input="appointCaptchaValue"/>

        <CaptchaImage @click="refreshCaptchaImage" :captchaImage="captchaImage">
            <LoadingWrapper v-if="loading">
                <i class="fa fa-spinner fa-pulse" />
            </LoadingWrapper>
        </CaptchaImage>
    </CaptchaWrapper>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";
    import Input from '../input/Input.vue'
    import {CaptchaWrapper,CaptchaImage,LoadingWrapper} from "./style";
    import {MUTATION_APPOINT_CAPTCHA} from "../../store/modules/mutation_types";
    import {ACTION_GET_CAPTCHA_IMAGE} from "../../store/modules/action_types";
    const uuidv4 = require('uuid/v4');

    export default {

        props: {
            captchaHost: String,
            placeholder: String,
            focusHandler: {
                type: Function,
                default: () => {}
            }
        },

        data() {
            return {
                captchaId: undefined,
                loading: false
            }
        },

        computed: {
            ...mapState({
                captchaImage(state) {
                    return state.captcha[this.captchaHost].captchaImage
                },
                captchaValue(state) {
                    return state.captcha[this.captchaHost].captchaValue
                },
                showWarn(state) {
                    return state.captcha[this.captchaHost].showWarn
                },
                warnMsg(state) {
                    return state.captcha[this.captchaHost].warnMsg
                }
            })
        },

        created() {
            if(!this.captchaImage) {
                this.init()
            }
        },
        beforeDestroy(){
            this.reset()
        },

        methods: {
            ...mapMutations({
                mutation_appointCaptcha: MUTATION_APPOINT_CAPTCHA
            }),
            ...mapActions({
                action_getCaptchaImage: ACTION_GET_CAPTCHA_IMAGE
            }),
            reset() {
                const payload = {
                    captchaHost: this.captchaHost,
                    captchaValue: '',
                    showWarn: false
                }
                this.mutation_appointCaptcha(payload)
            },
            focusHandler_() {
                const payload = {
                    captchaHost: this.captchaHost,
                    showWarn: false
                }
                this.mutation_appointCaptcha(payload)
                this.focusHandler()
            },
            init() {
                this.captchaId = uuidv4()

                const payload = {
                    captchaId: this.captchaId,
                    captchaHost: this.captchaHost,
                    captchaVM: this
                }

                this.action_getCaptchaImage(payload)
            },
            refreshCaptchaImage() {
                if(!this.loading){
                    this.init()
                }
            },
            appointCaptchaValue(event){
                const payload = {
                    captchaHost: this.captchaHost,
                    captchaValue: event.target.value
                }
                this.mutation_appointCaptcha(payload)
            }
        },

        components: {
            Input,
            CaptchaWrapper,
            CaptchaImage,
            LoadingWrapper
        }
    }
</script>

<style scoped>

</style>