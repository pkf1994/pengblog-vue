import {CommentRequest} from '../request'
import {
    MUTATION_APPEND_COMMENT_JUST_SUBMIT,
    MUTATION_APPOINT_REFERING_COMMENT,
    MUTATION_RESOLVE_TOP_COMMENT_LIST,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_MODAL,
    MUTATION_RESOLVE_SUB_COMMENT_LIST_DATA,
    MUTATION_RESOLVE_FRESH_COMMENT_LIST_DATA,
    MUTATION_PUSH_PROGRASS_BAR_TO_END,
    MUTATION_RECORD_COMMENT_JUST_DELETE,
    MUTATION_RESET,
} from "../../mutation_types";
import {
    ACTION_CHECK_CAPTCHA,
    ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT,
    ACTION_GET_SUB_COMMENT_LIST,
    ACTION_GET_TOP_COMMENT_LIST,
    ACTION_SUBMIT_COMMENT,
    ACTION_TRY_SUBMIT_COMMENT,
    ACTION_GET_FRESH_COMMENT_LIST,
    ACTION_DELETE_COMMENT
} from "../../action_types";
import {checkToken} from "./articleActions";
import {exceptionNoticer} from "./index";


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

            if(err.message === 'Cancel') {
                context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)
                return
            }

            exceptionNoticer(err,ACTION_GET_TOP_COMMENT_LIST,context)

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
            payload.count = res.data.count
            payload.startIndex = payload.startIndex + payload.pageScale
            payload.nextPage = payload.nextPage + 1
            payload.loadingMoreSubComment = false

            const payload__ = {
                hostCommentId: payload.comment.comment_id,
                subCommentList: res.data.subCommentList
            }

            context.commit(MUTATION_RESOLVE_SUB_COMMENT_LIST_DATA,payload__)

        }catch (err) {

            exceptionNoticer(err,ACTION_GET_SUB_COMMENT_LIST,context)

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

                            //trigger modal的loading状态
                            const payload____ = {
                                id: 'modal',
                                loading: false
                            }
                            context.commit(MUTATION_TRIGGER_IS_LOADING,payload____)

                            //发生异常则中止
                            return

                        }

                        //trigger modal的loading状态
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

                        //trigger Editor loading
                        const payload_______ = {
                            id: payload.commentEditorId,
                            loading: true
                        }
                        context.commit(MUTATION_TRIGGER_IS_LOADING,payload_______)

                        const payload________ = {
                            commentEditorId: payload.commentEditorId
                        }

                        await context.dispatch(ACTION_SUBMIT_COMMENT,payload________)

                        //trigger Editor loading
                        const payload_________ = {
                            id: payload.commentEditorId,
                            loading: false
                        }
                        context.commit(MUTATION_TRIGGER_IS_LOADING,payload_________)

                        //重置editor
                        const payload__________ = {
                            id: payload.commentEditorId
                        }
                        context.commit(MUTATION_RESET,payload__________)

                        //重置captcha
                        const payload___________ = {
                            id: 'captcha',
                            captchaHost: 'modal'
                        }
                        context.commit(MUTATION_RESET,payload___________)
                    }catch (err) {

                        exceptionNoticer(err,ACTION_SUBMIT_COMMENT,context)

                        //关闭modal
                        const payload____________ = {
                            show: false
                        }

                        context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload____________)

                    }
                }
            }
            context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload_)

        }

        catch(err) {

            exceptionNoticer(err,ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT,context)

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

            exceptionNoticer(err,ACTION_GET_FRESH_COMMENT_LIST,context)

        }
    },

    async [ACTION_DELETE_COMMENT](context,payload) {

        checkToken()

        try{

            await CommentRequest.RequestDeleteComment(payload)

            context.commit(MUTATION_RECORD_COMMENT_JUST_DELETE,payload)

        }catch (err) {

            exceptionNoticer(err,ACTION_DELETE_COMMENT,context)

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