import articleActions from './articleActions'
import commentActions from './commentActions'
import captchaActions from './captchaActions'
import imageActions from './imageActions'
import loginActions from './loginActions'
import smsActions from './smsActions'
import ipActions from './ipActions'
import {MUTATION_PUSH_PROGRASS_BAR_TO_END, MUTATION_TRIGGER_SHOW_NOTICE} from "../../mutation_types";

export default Object.assign(smsActions,articleActions,commentActions,captchaActions,imageActions,loginActions,ipActions)

export const exceptionNoticer = (err,action,context) => {

    if(err.message === 'Cancel') {
        context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)
        return
    }

    console.log(err)

    const payload_ = {
        show:true,
        noticeContent: action + ' ERR: ' + (err.response ? err.response.data : err)
    }

    context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload_)

}