import {MUTATION_APPOINT_CAPTCHA, MUTATION_RESET} from "../mutation_types";

export default {
    [MUTATION_APPOINT_CAPTCHA](state,payload) {

        let target = state[payload.captchaHost]

        payload.captchaImage && (target.captchaImage = payload.captchaImage)

        payload.captchaValue !== undefined && (target.captchaValue = payload.captchaValue)

        payload.captchaId &&  (target.captchaId = payload.captchaId)

        payload.showWarn !== undefined && (target.showWarn = payload.showWarn)

        payload.warnMsg && (target.warnMsg = payload.warnMsg)
    },

    [MUTATION_RESET](state,payload) {
        if(payload.id === 'captcha') {
            let targetCaptcha = state[payload.captchaHost]
            targetCaptcha.captchaImage = undefined
            targetCaptcha.captchaValue = undefined
            targetCaptcha.showWarn = false
            targetCaptcha.captchaId = undefined
        }
    }

}