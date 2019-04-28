import {timeout} from './articleActions'
import {
    ACTION_GET_TOP_COMMENT_LIST,
    ACTION_LOGIN,
    ACTION_LOGIN_WITH_DYNAMIC_PASSWORD,
    ACTION_LOGOUT
} from "../../action_types";
import {
    MUTATION_LAUNCH_PROGRASS_BAR, MUTATION_PUSH_PROGRASS_BAR_TO_END,
    MUTATION_RESOLVE_LOGIN_RESULT,
    MUTATION_RESOLVE_LOGOUT_RESULT,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_NOTICE
} from "../../mutation_types";
import {LoginRequest} from '../request'
import {exceptionNoticer} from "./index";


export default {
   async [ACTION_LOGIN](context) {

       try {

           context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

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

           await timeout(1000)

           const res = await LoginRequest.RequestLogin(payload_)

           //本地存储token
           storeToken(res.data.token,res.data.validTimeMillis,context.rootState.login.common.username.value)

           context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

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

           exceptionNoticer(err,ACTION_LOGIN,context)
       }

   },

    async [ACTION_LOGIN_WITH_DYNAMIC_PASSWORD](context) {

        try{

            context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

           const payload = {
               id: 'loginPage',
               loading: true
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

           const payload_ = {
               phoneNumber: context.rootState.login.dynamic.phoneNumber.value,
               password: context.rootState.login.dynamic.dynamicPassword.value,
           }

            await timeout(1000)

            const res = await LoginRequest.RequestLoginWithDynamicPassword(payload_)

           //本地存储token
            storeToken(res.data.token,res.data.validTimeMillis,context.rootState.login.dynamic.phoneNumber.value)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

            context.commit(MUTATION_RESOLVE_LOGIN_RESULT,context.rootState.login.dynamic.phoneNumber.value)

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

            exceptionNoticer(err,ACTION_LOGIN_WITH_DYNAMIC_PASSWORD,context)
        }


    },

    async [ACTION_LOGOUT](context) {

        context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

        const payload = {
            id: 'loginPage',
            loading: true
        }
        context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

        await timeout(1000)

        localStorage.removeItem('token')

        context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        context.commit(MUTATION_RESOLVE_LOGOUT_RESULT)

        const payload_= {
            id: 'loginPage',
            loading: false
        }
        context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

        const payload__ = {
            show: true,
            noticeContent: '登出成功'
        }
        context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload__)
    }
}

const storeToken = (token,validTime,username) => {
    let expTime = new Date().getTime() + validTime
    localStorage.setItem('token', JSON.stringify({token: token, expTime: expTime, username:username}))
}