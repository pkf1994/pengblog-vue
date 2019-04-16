import {MUTATION_TRIGGER_SHOW_NOTICE} from "../mutation_types";

export default {

    [MUTATION_TRIGGER_SHOW_NOTICE](state,payload){

        state.show = payload.show

        if(payload.noticeContent){
            state.noticeContent = payload.noticeContent
        }
    }

}
