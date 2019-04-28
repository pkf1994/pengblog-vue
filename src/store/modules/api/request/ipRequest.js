import axios from 'axios'
import * as Api from './apiConstant'
import {getToken} from "./imageRequest";

export function RequestBanIP(payload) {

    const token = getToken()

    let config = {
        params: {
            ip: payload
        },
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_BAN_IP, config)
}

export function RequestLiftedIP(payload) {

    const token = getToken()

    let config = {
        params: {
            ip: payload
        },
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_LIFTED_IP, config)
}

export function RequestIPList(payload) {

    const token = getToken()

    let config = {
        params: payload,
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_IP_LIST, config)

}