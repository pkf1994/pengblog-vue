import {CommentRequest} from '../request'
import {
    MUTATION_APPEND_COMMENT_JUST_SUBMIT,
    MUTATION_APPOINT_CAPTCHA,
    MUTATION_APPOINT_REFERING_COMMENT,
    MUTATION_RESOLVE_TOP_COMMENT_LIST,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_MODAL,
    MUTATION_TRIGGER_SHOW_NOTICE,
    MUTATION_RESOLVE_SUB_COMMENT_LIST_DATA,
    MUTATION_RESOLVE_FRESH_COMMENT_LIST_DATA,
    MUTATION_PUSH_PROGRASS_BAR_TO_END,
    MUTATION_RECORD_COMMENT_JUST_DELETE,
    MUTATION_RESET
} from "../../mutation_types";
import {
    ACTION_CHECK_CAPTCHA,
    ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT,
    ACTION_GET_SUB_COMMENT_LIST,
    ACTION_GET_TOP_COMMENT_LIST,
    ACTION_SUBMIT_COMMENT,
    ACTION_TRY_SUBMIT_COMMENT,
    ACTION_GET_FRESH_COMMENT_LIST, ACTION_DELETE_COMMENT
} from "../../action_types";


export default {

    //获取article对应的topCommentList
    async [ACTION_GET_TOP_COMMENT_LIST](context,payload){

        //trigger forMore组件为loading状态
        const payload_ = {
            id: 'article_forMore',
            loading: true
        }

        context.commit(MUTATION_TRIGGER_IS_LOADING, payload_)

        //如果此时存在未完成的同类请求，取消它
        if(window.RequestTopCommentListOfSpecificArticleAxiosSource){
            window.RequestTopCommentListOfSpecificArticleAxiosSource.cancel('Cancel')
        }

        try{

            const payload__ = {
                article_id: payload.article_id,
                startIndex: context.rootState.article.startIndex,
                pageScale: context.rootState.article.pageScale
            }

            const res = await CommentRequest.RequestTopCommentList(payload__)

            window.RequestTopCommentListOfSpecificArticleAxiosSource = undefined

            const payload___ = {
                commentList: res.data.commentList,
                count: res.data.count,
                countOfAllComment: res.data.countOfAllComment,
                maxPage: res.data.maxPage
            }

            context.commit(MUTATION_RESOLVE_TOP_COMMENT_LIST,payload___)

            //关闭loading状态
            const payload____ = {
                id: 'article_forMore',
                loading: false
            }

            context.commit(MUTATION_TRIGGER_IS_LOADING, payload____)

        }catch(err){

            console.log(err)

            if(err.message === 'Cancel') {
                context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)
                return
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,({
                noticeContent: '获取评论数据失败',
                show: true
            }))

        }

    },

    //获取subCommentList
    async [ACTION_GET_SUB_COMMENT_LIST](context,payload) {

        payload.loadingMoreSubComment = true

        const payload_ = {
            comment_id: payload.comment.comment_id,
            startIndex: payload.startIndex,
            pageScale: payload.pageScale
        }

        try{

            const res = await CommentRequest.RequestSubCommentList(payload_)
            payload.maxPage = res.data.maxPage
            payload.startIndex = payload.startIndex + payload.pageScale
            payload.nextPage = payload.nextPage + 1
            payload.loadingMoreSubComment = false

            const payload__ = {
                hostCommentId: payload.comment.comment_id,
                subCommentList: res.data.subCommentList
            }

            context.commit(MUTATION_RESOLVE_SUB_COMMENT_LIST_DATA,payload__)

        }catch (err) {

            console.log(err)

            const payload___ = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload___)

        }

    },

    //提交评论
    async [ACTION_TRY_SUBMIT_COMMENT](context, payload) {

        context.dispatch(ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT,payload)

    },

    //查看提交评论时是否需要验证
    async [ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT](context,payload) {

        try{
            const res = await CommentRequest.CheckWhetherNeedCaptcha()

            const needCaptcha = res.data

            //如果不需要验证，直接提交
            if(!needCaptcha){
                await context.dispatch(ACTION_SUBMIT_COMMENT,payload)
                return
            }

            //否则进行验证
            const payload_ = {
                show: true,
                context: 'captcha',
                postHandler: async () => {
                    try{

                        //打开modal的loading状态
                        const payload__ = {
                            id: 'modal',
                            loading: true
                        }
                        context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

                        //进行验证
                        try {

                            const payload___ = {
                                captchaHost: 'modal'
                            }
                            await context.dispatch(ACTION_CHECK_CAPTCHA,payload___)

                        }catch (err) {

                            //打开modal的loading状态
                            const payload____ = {
                                id: 'modal',
                                loading: false
                            }
                            context.commit(MUTATION_TRIGGER_IS_LOADING,payload____)

                            //发生异常则中止
                            return

                        }


                        const payload_____ = {
                            id: 'modal',
                            loading: false
                        }
                        context.commit(MUTATION_TRIGGER_IS_LOADING,payload_____)

                        //关闭modal
                        const payload______ = {
                            show: false
                        }
                        context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload______)

                        const payload_______ = {
                            commentEditorId: payload.commentEditorId
                        }

                        await context.dispatch(ACTION_SUBMIT_COMMENT,payload_______)

                        //重置editor
                        const payload________ = {
                            id: payload.commentEditorId
                        }
                        context.commit(MUTATION_RESET,payload________)

                        //重置captcha
                        const payload_________ = {
                            id: 'captcha',
                            captchaHost: payload.captchaHost
                        }
                        context.commit(MUTATION_RESET,payload_________)
                    }catch (err) {

                        console.log(err)

                        const payload__________ = {
                            show: true,
                            noticeContent: err.response ? err.response.data : err
                        }

                        context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload__________)

                        //关闭modal
                        const payload___________ = {
                            show: false
                        }

                        context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload___________)

                    }
                }
            }
            context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload_)

        }

        catch(err) {
            console.log(err)

            const payload = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload)

        }

    },

    async [ACTION_SUBMIT_COMMENT](context,payload) {

        const payload_ = {
            comment_hostId: context.rootState.article.currentArticleId,
            comment_content: context.rootState[payload.commentEditorId].content.value,
            comment_referComment: payload.commentEditorId === 'subCommentEditor' ? (context.rootState.subCommentEditor.referingComment.comment_referComment ? context.rootState.subCommentEditor.referingComment.comment_referComment.comment_id : context.rootState.subCommentEditor.referingComment.comment_id) : undefined,
            visitor_name: context.rootState[payload.commentEditorId].name.value,
            visitor_email: context.rootState[payload.commentEditorId].email.value,
            visitor_site: context.rootState[payload.commentEditorId].site.value,
            comment_platform: navigator.platform,
            captchaId: context.rootState.captcha.modal.captchaId,
            captchaCode: context.rootState.captcha.modal.captchaValue,
        }

        console.log(payload_)

        const res = await CommentRequest.RequestSubmitComment(payload_)

        const commentJustSubmit = constructComment(payload_,res.data.commentIdJustSubmit)

        //关闭commentEditor loading状态
        const payload____ = {
            id: payload.commentEditorId,
            loading: false
        }
        context.commit(MUTATION_TRIGGER_IS_LOADING,payload____)
        //挂载comment
        const payload_____ = {
            comment_referComment: payload_.comment_referComment,
            comment_appendTo: context.rootState.subCommentEditor.referingComment,
            comment: commentJustSubmit,
            commentEditorId: payload.commentEditorId
        }

        context.commit(MUTATION_APPEND_COMMENT_JUST_SUBMIT,payload_____)

        //关闭subCommentEditor
        if(payload.commentEditorId === 'subCommentEditor') {
            const payload______ = {
                comment: undefined
            }
            context.commit(MUTATION_APPOINT_REFERING_COMMENT,payload______)
        }
    },

    //获取freshCommentList
    async [ACTION_GET_FRESH_COMMENT_LIST](context) {

        try{

            //trigger loading 状态
            const payload = {
                loading: true,
                id: 'manage_freshComments'
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

            const payload_ = {
                startIndex: context.rootState.manage.freshComments.startIndex,
                pageScale: context.rootState.manage.freshComments.pageScale
            }

            const res = await CommentRequest.RequestFreshCommentListData(payload_)

            const payload__ = {
                commentList: res.data.commentList,
                maxPage: res.data.maxPage
            }

            context.commit(MUTATION_RESOLVE_FRESH_COMMENT_LIST_DATA,payload__)

        }catch (err) {

            console.log(err)

            const payload__ = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload__)

        }
    },

    async [ACTION_DELETE_COMMENT](context,payload) {


        try{

            await CommentRequest.RequestDeleteComment(payload)

            context.commit(MUTATION_RECORD_COMMENT_JUST_DELETE,payload)

        }catch (err) {

            console.log(err)

            const payload_ = {
                show:true,
                noticeContent: 'ACTION_DELETE_COMMENT ERR: ' + (err.response ? err.response.data : err)
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload_)

        }

    }

}

const constructComment = (payload,comment_id) => {

    const date = new Date()

    const comment = {
        comment_author: {
            visitor_name: payload.visitor_name,
            visitor_siteAddress: payload.visitor_siteAddress,
            visitor_email: payload.visitor_email
        },
        comment_hostArticle: {
            article_id: payload.article_id,
        },
        comment_referComment: {
            comment_id: payload.comment_referComment
        },
        comment_id: comment_id,
        comment_content: payload.comment_content,
        comment_releaseTime: date.toString(),
        comment_platform: payload.comment_platform
    }

    return comment
}