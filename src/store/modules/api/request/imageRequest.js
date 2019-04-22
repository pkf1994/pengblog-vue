import axios from 'axios'
import * as Api from './apiConstant'

export function UploadImage(payload) {
    var form = new FormData()
    form.append('img',payload)

    let token = getToken()

    let config = {
        headers:{
            'Content-Type':'multipart/form-data',
            Authorization: token
        }
    }
    return axios.post(Api.API_POST_IMAGE,form,config);
}

export const getToken = () => {
    let tokenObj = JSON.parse(localStorage.getItem('token'))
    let token = tokenObj ? tokenObj.token : null
    return token
}