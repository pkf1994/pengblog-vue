import {ArticleRequest,CommentRequest} from './request'
import {
    MUTATION_RESOVLE_ARTICLE_FROM_API,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_RESOVLE_ARTICLE_LIST_DATA_TO_HOME_FROM_API,
    MUTATION_RECORD_CURRENT_ARTICLE_ID_ARTICLE_FROM_API,
    MUTATION_RESOVLE_TOP_COMMENT_LIST
} from "./constant";
import {MUTATION_TRIGGER_SHOW_NOTICE} from "../notice/constant";

export default {

    //获取文章详情
    async action_getArticleData_article(context,payload) {

        if(parseInt(payload.article_id) === context.rootState.article.article.article_id){
            return
        }

        //打开loading状态
        const payload_ = {
            id: 'home_article',
            loading: true
        }

        context.commit(MUTATION_TRIGGER_IS_LOADING, payload_)


        //记录currentArticleId
        const payload__ = {
            currentArticleId: payload.article_id
        }
        context.commit(MUTATION_RECORD_CURRENT_ARTICLE_ID_ARTICLE_FROM_API, payload__)

        //如果此时存在未完成的同类请求，取消它
        if(window.RequestArticleAxiosSource){
            window.RequestArticleAxiosSource.cancel('Cancel')
        }

        try{

            const res = await ArticleRequest.RequestArticle(payload.article_id)

            window.RequestArticleAxiosSource = undefined

            const payload___ = {
                article: res.data
            }

            context.commit(MUTATION_RESOVLE_ARTICLE_FROM_API,payload___)

            //关闭loading状态
            const payload____ = {
                id: 'home_article',
                loading: false
            }

            context.commit(MUTATION_TRIGGER_IS_LOADING, payload____)

        }catch(err){

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,({
                noticeContent: '获取文章数据失败',
                show: true
            }))

        }

    },

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

    //获取home页面文章列表数据
    async action_getArticleListData_home(context){

        //trigger forMore组件为loading状态
        const payload = {
            id: 'home_forMore',
            loading: true
        }

        context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

        try{

            const payload_ = {
                startIndex: context.rootState.home.startIndex,
                pageScale: context.rootState.home.pageScale
            }

            const res = await ArticleRequest.RequestArticleList(payload_)

            const payload__ = {
                articleList: res.data.articleList,
                maxPage: res.data.maxPage
            }

            context.commit(MUTATION_RESOVLE_ARTICLE_LIST_DATA_TO_HOME_FROM_API,payload__)

        }catch(err){

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,({
                noticeContent: '获取文章列表数据失败',
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
    }
}


const timeout = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}