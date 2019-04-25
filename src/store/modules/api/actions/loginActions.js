import {timeout} from './articleActions'
import {ACTION_GET_SMS, ACTION_LOGIN, ACTION_LOGIN_WITH_DYNAMIC_PASSWORD, ACTION_LOGOUT} from "../../action_types";
import {
    MUTATION_RESOLVE_LOGIN_RESULT, MUTATION_RESOLVE_LOGOUT_RESULT, MUTATION_RESOLVE_SMS,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_NOTICE
} from "../../mutation_types";
import {LoginRequest,SmsRequest} from '../request'


export default {
   async [ACTION_LOGIN](context) {

       try {

           const payload = {
               id: 'loginPage',
               loading: true
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

           const payload_ = {
               username: context.rootState.login.common.username.value,
               password: context.rootState.login.common.password.value,
               captchaId: context.rootState.captcha.loginPage.captchaId,
               captchaCode: context.rootState.captcha.loginPage.captchaValue,
           }

           const res = await LoginRequest.RequestLogin(payload_)

           //本地存储token
           storeToken(res.data.token,res.data.validTimeMillis,context.rootState.login.common.username.value)

           context.commit(MUTATION_RESOLVE_LOGIN_RESULT,context.rootState.login.common.username.value)

           const payload__ = {
               id: 'loginPage',
               loading: false
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

       }catch (err) {

           const payload__ = {
               id: 'loginPage',
               loading: false
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

           console.log(err)

           const payload___ = {
               show: true,
               noticeContent: 'ACTION_LOGIN ERR: ' + (err.response ? err.response.data : err)
           }

           context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload___)
       }

   },

    async [ACTION_LOGIN_WITH_DYNAMIC_PASSWORD](context) {

       try{

           const payload = {
               id: 'loginPage',
               loading: true
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

           const payload_ = {
               phoneNumber: context.rootState.login.dynamic.phoneNumber.value,
               password: context.rootState.login.dynamic.password.value,
           }

           const res = await LoginRequest.RequestLoginWithDynamicPassword(payload_)

           //本地存储token
           storeToken(res.data.token,res.data.validTimeMillis,context.rootState.login.common.username.value)

           context.commit(MUTATION_RESOLVE_LOGIN_RESULT,context.rootState.login.common.username.value)

           const payload__ = {
               id: 'loginPage',
               loading: false
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

       }catch (err) {

           const payload__ = {
               id: 'loginPage',
               loading: false
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

           console.log(err)

           const payload___ = {
               show: true,
               noticeContent: 'ACTION_LOGIN_WITH_DYNAMIC_PASSWORD ERR: ' + (err.response ? err.response.data : err)
           }

           context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload___)
       }


    },

    async [ACTION_LOGOUT](context) {

        const payload = {
            id: 'managePage',
            loading: true
        }
        context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

        localStorage.removeItem('token')

        await timeout(1000)

        context.commit(MUTATION_RESOLVE_LOGOUT_RESULT)

        const payload_= {
            id: 'managePage',
            loading: true
        }
        context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

        const payload__ = {
            show: true,
            noticeContent: '登录成功'
        }
        context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload__)
    },

    async [ACTION_GET_SMS](context) {
        const phoneNumber = context.rootState.login.phoneNumber.value

        await SmsRequest.RequestSms(phoneNumber)

        context.commit(MUTATION_RESOLVE_SMS)
    }
}

const storeToken = (token,validTime,username) => {
    let expTime = new Date().getTime() + validTime
    localStorage.setItem('token', JSON.stringify({token: token, expTime: expTime, username:username}))
}