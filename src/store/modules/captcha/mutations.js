import {MUTATION_APPOINT_CAPTCHA} from "../mutation_types";

export default {
    [MUTATION_APPOINT_CAPTCHA](state,payload) {

        let target = state[payload.captchaHost]

        payload.captchaImage && (target.captchaImage = payload.captchaImage)

        payload.captchaValue !== undefined && (target.captchaValue = payload.captchaValue)

        payload.captchaId &&  (target.captchaId = payload.captchaId)

        payload.showWarn !== undefined && (target.showWarn = payload.showWarn)

        payload.warnMsg && (target.warnMsg = payload.warnMsg)
    }


}