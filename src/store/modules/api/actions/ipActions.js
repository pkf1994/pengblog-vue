import {checkToken, timeout} from './articleActions'
import {ACTION_BAN_IP, ACTION_GET_IP_LIST, ACTION_LIFTED_IP} from "../../action_types";
import {IPRequest} from "../request";
import {
    MUTATION_APPOINT_PAGINATION, MUTATION_LAUNCH_PROGRASS_BAR, MUTATION_PUSH_PROGRASS_BAR_TO_END,
    MUTATION_RECORD_COMMENT_JUST_BAN,
    MUTATION_RECORD_COMMENT_JUST_LIFTED, MUTATION_RESOLVE_IP_LIST_DATA, MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_NOTICE
} from "../../mutation_types";
import {exceptionNoticer} from "./index";

export default {
    async [ACTION_BAN_IP](context,payload) {

        checkToken()

        try{

            await IPRequest.RequestBanIP(payload)

            context.commit(MUTATION_RECORD_COMMENT_JUST_BAN,payload)

        }catch (err) {
            console.log(err)

            const payload_ = {
                show:true,
                noticeContent: 'ACTION_BAN_IP ERR: ' + (err.response ? err.response.data : err)
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload_)
        }
    },

    async [ACTION_LIFTED_IP](context,payload) {
        try{

            await IPRequest.RequestLiftedIP(payload)

            context.commit(MUTATION_RECORD_COMMENT_JUST_LIFTED,payload)

        }catch (err) {
            console.log(err)

            const payload_ = {
                show:true,
                noticeContent: 'ACTION_LIFTED_IP ERR: ' + (err.response ? err.response.data : err)
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload_)
        }
    },

    async [ACTION_GET_IP_LIST](context) {

        checkToken()

        try{

            const payload = {
                id: 'ipManagePage',
                loading: true
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

            context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

            const payload_ = {
                startIndex: context.rootState.pagination.ipManagePage.startIndex,
                pageScale: context.rootState.pagination.ipManagePage.pageScale
            }

            const res = await IPRequest.RequestIPList(payload_)

            context.commit(MUTATION_RESOLVE_IP_LIST_DATA,res.data.ipList)

            const payload__ = {
                paginationId: 'ipManagePage',
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_APPOINT_PAGINATION,payload__)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

            const payload___ = {
                id: 'ipManagePage',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload___)

        }catch (err) {

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

            exceptionNoticer(err,ACTION_GET_IP_LIST,context)

        }

    }

}

