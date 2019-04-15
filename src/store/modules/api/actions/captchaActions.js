import {MUTATION_APPOINT_CAPTCHA} from "../../captcha/constant";
import {CaptchaRequest} from '../request'
import {MUTATION_TRIGGER_SHOW_NOTICE} from "../../notice/constant";
import {timeout} from './articleActions'


export default {
    async action_getCaptchaImage(context,payload) {

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

    async action_checkCaptcha(context,payload) {

        const payload_ = {
            captchaId: context.rootState.captcha[payload.captchaHost].captchaId,
            uncheckCaptchaCode: context.rootState.captcha[payload.captchaHost].captchaValue
        }

        const res = await CaptchaRequest.RequestCheckCaptcha(payload_)

        return res
    }
}