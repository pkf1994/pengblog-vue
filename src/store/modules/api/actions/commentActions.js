import {CommentRequest} from '../request'
import {
    MUTATION_APPEND_COMMENT_JUST_SUBMIT,
    MUTATION_APPOINT_CAPTCHA, MUTATION_APPOINT_REFERING_COMMENT,
    MUTATION_RESOVLE_TOP_COMMENT_LIST,
    MUTATION_TRIGGER_IS_LOADING, MUTATION_TRIGGER_SHOW_MODAL,
    MUTATION_TRIGGER_SHOW_NOTICE,
    MUTATION_RESOVLE_SUB_COMMENT_LIST_DATA,
    MUTATION_RESOVLE_FRESH_COMMENT_LIST_DATA
} from "../../mutation_types";
import {
    ACTION_CHECK_CAPTCHA,
    ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT,
    ACTION_GET_SUB_COMMENT_LIST,
    ACTION_GET_TOP_COMMENT_LIST,
    ACTION_SUBMIT_COMMENT,
    ACTION_TRY_SUBMIT_COMMENT,
    ACTION_GET_FRESH_COMMENT_LIST
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
                countOfAllComment: res.data.countOfComment,
                maxPage: res.data.maxPage
            }

            context.commit(MUTATION_RESOVLE_TOP_COMMENT_LIST,payload___)

            //关闭loading状态
            const payload____ = {
                id: 'article_forMore',
                loading: false
            }

            context.commit(MUTATION_TRIGGER_IS_LOADING, payload____)

        }catch(err){

            console.log(err)

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

            context.commit(MUTATION_RESOVLE_SUB_COMMENT_LIST_DATA,payload__)

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


                        try{
                            //进行验证
                            const payload__ = {
                                captchaHost: 'modal'
                            }
                            await context.dispatch(ACTION_CHECK_CAPTCHA,payload__)

                        }catch(err) {
                            console.log(err)
                            if(err.response){
                                const payload = {
                                    captchaHost: 'modal',
                                    showWarn: true,
                                    warnMsg: err.response.data
                                }
                                context.commit(MUTATION_APPOINT_CAPTCHA,payload)
                            }
                            return
                        }

                        //验证通过，打开modal的loading状态
                        const payload___ = {
                            id: 'modal',
                            loading: true
                        }
                        context.commit(MUTATION_TRIGGER_IS_LOADING,payload___)

                        const payload____ = {
                            commentEditorId: payload.commentEditorId
                        }

                        await context.dispatch(ACTION_SUBMIT_COMMENT,payload____)

                    }catch (err) {
                        console.log(err)

                        const payload = {
                            show: true,
                            noticeContent: err.response ? err.response.data : err
                        }

                        context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload)

                        //关闭modal
                        const payload__ = {
                            show: false
                        }
                        context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload__)

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

        const res = await CommentRequest.RequestSubmitComment(payload_)

        //关闭modal
        const payload__ = {
            show: false
        }
        context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload__)


        const payload___ = {
            id: 'modal',
            loading: false
        }
        context.commit(MUTATION_TRIGGER_IS_LOADING,payload___)

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
                id: 'freshComments'
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

            context.commit(MUTATION_RESOVLE_FRESH_COMMENT_LIST_DATA,payload__)

        }catch (err) {

            console.log(err)

            const payload__ = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload__)

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