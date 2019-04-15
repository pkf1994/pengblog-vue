export default {
    mutation_appointCaptcha(state,payload) {

        let target = state[payload.captchaHost]

        payload.captchaImage && (target.captchaImage = payload.captchaImage)

        payload.captchaValue && (target.captchaValue = payload.captchaValue)

        payload.captchaId &&  (target.captchaId = payload.captchaId)

        payload.showWarn !== undefined && (target.showWarn = payload.showWarn)

        payload.warnMsg && (target.warnMsg = payload.warnMsg)
    }
}