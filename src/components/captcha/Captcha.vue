<template>
    <CaptchaWrapper>
        <Input :value="captchaStore[captchaHost].captchaValue"
               :ex=true
               :showWarn="captchaStore[captchaHost].showWarn"
               :warnMsg="captchaStore[captchaHost].warnMsg"
               @focus="focusHandler"
               @input="appointCaptchaValue"/>

        <CaptchaImage @click="refreshCaptchaImage" :captchaImage="captchaStore[captchaHost].captchaImage">
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
    import {ACTION_GET_CAPTCHA_IMAGE} from "../../store/modules/api/constant";
    import {MUTATION_APPOINT_CAPTCHA} from "../../store/modules/captcha/constant";
    const uuidv4 = require('uuid/v4');

    export default {

        props: {
            captchaHost: String
        },

        data() {
            return {
                captchaId: undefined,
                loading: false
            }
        },

        computed: {
            ...mapState({
                captchaStore: state => state.captcha,
            })
        },

        created() {
            this.init()
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
                console.log('reset')
                this.mutation_appointCaptcha(payload)
            },
            focusHandler() {
                const payload = {
                    captchaHost: this.captchaHost,
                    showWarn: false
                }
                this.mutation_appointCaptcha(payload)
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