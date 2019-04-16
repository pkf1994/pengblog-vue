import {CaptchaRequest} from '../request'
import {timeout} from './articleActions'
import {MUTATION_APPOINT_CAPTCHA, MUTATION_TRIGGER_SHOW_NOTICE} from "../../mutation_types";
import {ACTION_CHECK_CAPTCHA, ACTION_GET_CAPTCHA_IMAGE} from "../../action_types";


export default {
    async [ACTION_GET_CAPTCHA_IMAGE](context,payload) {

        try{
            //打开loading状态
            payload.captchaVM.loading = true

            const payload__ = {
                captchaId: payload.captchaId
            }

            const res = await CaptchaRequest.RequestCaptchaImage(payload__)

            const payload___ = {
                captchaId: payload.captchaId,
                captchaImage: res.data,
                captchaHost: payload.captchaHost
            }

            context.commit(MUTATION_APPOINT_CAPTCHA,payload___)

            //关闭loading状态
            payload.captchaVM.loading = false

        }catch(err){

            const payload = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload)

        }

    },

    async [ACTION_CHECK_CAPTCHA](context,payload) {

        const payload_ = {
            captchaId: context.rootState.captcha[payload.captchaHost].captchaId,
            uncheckCaptchaCode: context.rootState.captcha[payload.captchaHost].captchaValue
        }

        const res = await CaptchaRequest.RequestCheckCaptcha(payload_)

        return res
    }
}