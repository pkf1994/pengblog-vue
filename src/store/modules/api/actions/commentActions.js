import {CommentRequest} from '../request'
import {
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_RESOVLE_TOP_COMMENT_LIST,
    ACTION_SUBMIT_COMMENT,
    ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT, ACTION_CHECK_CAPTCHA
} from "../constant";
import {MUTATION_TRIGGER_SHOW_NOTICE} from "../../notice/constant";
import {MUTATION_TRIGGER_SHOW_MODAL} from "../../modal/constant";

export default {

    //获取article对应的topCommentList
    async action_getTopCommentList(context,payload){

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
    async action_getSubCommentList(context,payload) {

        payload.loadingMoreSubComment = true

        const payload_ = {
            comment_id: payload.comment.comment_id,
            startIndex: payload.startIndex,
            pageScale: payload.pageScale
        }

        const res = await CommentRequest.RequestSubCommentList(payload_)

        payload.subCommentList = payload.subCommentList.concat(res.data.subCommentList)
        payload.maxPage = res.data.maxPage
        payload.startIndex = payload.startIndex + payload.pageScale
        payload.nextPage = payload.nextPage + 1
        payload.loadingMoreSubComment = false
    },

    //提交评论
    async action_trySubmitComment(context, payload) {


        context.dispatch(ACTION_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT,payload)
    },

    //查看提交评论时是否需要验证
    async action_checkWhetherNeedCaptchaToSubmitComment(context,payload) {

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
                ...payload
            }
            context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload_)

            payload.commentEditorVM.loading = false

        }

        catch(err) {

            const payload = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload)

        }

    },

    async action_submitComment(context,payload) {

        const payload_ = {
            comment_hostId: context.rootState.article.currentArticleId,
            comment_content: context.rootState[payload.commentEditorId].content.value,
            visitor_name: context.rootState[payload.commentEditorId].name.value,
            visitor_email: context.rootState[payload.commentEditorId].email.value,
            visitor_site: context.rootState[payload.commentEditorId].site.value,
            comment_platform: navigator.platform,
            captchaId: context.rootState.captcha.modal.captchaId,
            captchaCode: context.rootState.captcha.modal.captchaValue,
        }

        await CommentRequest.RequestSubmitComment(payload_)

    }

}
