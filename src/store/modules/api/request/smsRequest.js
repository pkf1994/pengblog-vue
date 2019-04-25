import axios from 'axios'
import * as Api from './apiConstant'

export function RequestSms(payload) {
    let config = {
        params: {
            phoneNumber: payload
        }
    }
    return axios.get(Api.API_GET_SMS, config)
}