export default {

    mutation_triggerShowNotice(state,payload){

        state.show = payload.show

        if(payload.noticeContent){
            state.noticeContent = payload.noticeContent
        }
    }

}
