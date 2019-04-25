import axios from 'axios'
import * as Api from './apiConstant'

export function RequestLogin(payload) {

    return axios.post(Api.API_LOGIN, payload)
}

export function RequestLoginWithDynamicPassword(payload) {

    return axios.post(Api.API_LOGIN_WITH_DYNAMIC_PASSWORD, payload)

}
