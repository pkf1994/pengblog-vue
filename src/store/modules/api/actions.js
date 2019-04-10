import {ArticleRequest} from './request'
import {MUTATION_RESOVLE_ARTICLE_FROM_API,
        MUTATION_TRIGGER_IS_LOADING,
        MUTATION_RESOVLE_ARTICLE_LIST_DATA_TO_HOME_FROM_API,
        MUTATION_RECORD_CURRENT_ARTICLE_ID_ARTICLE_FROM_API} from "./mutationTypeConstant";

export default {

    //获取文章详情
    async action_getArticleData_article(context,payload) {

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
            console.log(err)
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
            console.log(err)
        }

    }
}