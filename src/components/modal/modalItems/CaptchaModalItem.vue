<template>
    <ModalItemWrapper>
        <ModalTitle>
            频繁发言，请验证
        </ModalTitle>

        <CaptchaWrapper>
            <Captcha captchaHost="modal" />
        </CaptchaWrapper>

        <OperationColumn>

            <ConfirmButton v-on:click="postHandler">
                确定
            </ConfirmButton>

            <CancelButton v-on:click="closeModal">
                取消
            </CancelButton>

        </OperationColumn>

        <LoadingWrapper v-if="loading">
            <Loading/>
        </LoadingWrapper>

    </ModalItemWrapper>
</template>

<script>
    import {ModalItemWrapper,
            ModalTitle,
            OperationColumn,
            ConfirmButton,
            CancelButton,LoadingWrapper} from "../style"
    import {CaptchaWrapper} from './style'
    import Captcha from '../../captcha/Captcha.vue'
    import {mapActions, mapMutations, mapState} from "vuex";
    import Loading from '../../loading/Loading.vue'
    import {MUTATION_TRIGGER_SHOW_MODAL} from "../../../store/modules/modal/constant";
    import {
        ACTION_CHECK_CAPTCHA,
        ACTION_SUBMIT_COMMENT,
        MUTATION_TRIGGER_IS_LOADING
    } from "../../../store/modules/api/constant";
    import {MUTATION_APPOINT_CAPTCHA} from "../../../store/modules/captcha/constant";
    export default {
        computed: {
            ...mapState({
                loading: state => state.modal.loading,
                captchaValue: state => state.captcha.modal.captchaValue,
                commentEditorVM: state => state.modal.commentEditorVM,
                commentEditorId: state => state.modal.commentEditorId
            })
        },
        methods: {
            async postHandler() {

                //先检查是否未填写
                if(!this.preCheckCaptchaValue()){
                    return
                }

                try{
                    //进行验证
                    const payload = {
                        captchaHost: 'modal'
                    }

                    await this.action_checkCaptcha(payload)

                    //验证通过，打开loading状态
                    const payload_ = {
                        id: 'modal'
                    }
                    this.mutation_triggerIsLoading(payload_)

                    const payload__ = {
                        commentEditorVM: this.commentEditorVM,
                        commentEditorId: this.commentEditorId
                    }

                    await this.action_submitComment(payload__)

                }catch (err) {
                    if(err.response){
                        const payload = {
                            captchaHost: 'modal',
                            showWarn: true,
                            warnMsg: err.response.data
                        }
                        this.mutation_appointCaptcha(payload)
                    }
                }
            },
            preCheckCaptchaValue() {
                if(this.captchaValue.trim() === ''){
                    const payload = {
                        captchaHost: 'modal',
                        showWarn: true,
                        warnMsg: '尚未填写'
                    }
                    this.mutation_appointCaptcha(payload)

                    return false
                }
                return true
            },
            closeModal() {
                const payload = {
                    show: false
                }
                this.mutation_triggerShowModal(payload)
            },
            ...mapMutations({
                mutation_triggerShowModal: MUTATION_TRIGGER_SHOW_MODAL,
                mutation_appointCaptcha: MUTATION_APPOINT_CAPTCHA,
                mutation_triggerIsLoading: MUTATION_TRIGGER_IS_LOADING
            }),
            ...mapActions({
                action_checkCaptcha: ACTION_CHECK_CAPTCHA,
                action_submitComment: ACTION_SUBMIT_COMMENT
            })
        },
        components: {
            Captcha,
            ModalItemWrapper,
            ModalTitle,
            CaptchaWrapper,
            OperationColumn,
            ConfirmButton,
            CancelButton,
            Loading,
            LoadingWrapper
        }
    }
</script>

<style scoped>

</style>