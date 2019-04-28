import {timeout} from './articleActions'
import {ACTION_GET_SMS} from "../../action_types";
import {
    MUTATION_RESOLVE_SMS, MUTATION_TRIGGER_IS_LOADING
} from "../../mutation_types";
import {SmsRequest} from '../request'
import {exceptionNoticer} from "./index";


export default {
    async [ACTION_GET_SMS](context) {

        try{

            const payload = {
                loading: true,
                id: 'sms'
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload)


            const phoneNumber = context.rootState.login.dynamic.phoneNumber.value

            await SmsRequest.RequestSms(phoneNumber)

            context.commit(MUTATION_RESOLVE_SMS)

            const payload_ = {
                loading: false,
                id: 'sms'
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

        }catch (err) {

            exceptionNoticer(err,ACTION_GET_SMS,context)

        }


    }
}
