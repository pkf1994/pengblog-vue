import axios from 'axios'
import * as Api from './apiConstant'

export const RequestCaptchaImage = (payload) => {
    let config = {
        params: {
            captchaId: payload.captchaId
        }
    }
    return axios.get(Api.API_GET_CAPTCHA, config)
}

export const RequestCheckCaptcha = (payload) => {

    let config = {
        params: {
            captchaId: payload.captchaId,
            uncheckCaptchaCode: payload.uncheckCaptchaCode
        }
    }

    return axios.get(Api.API_CHECK_CAPTCHA, config)

}