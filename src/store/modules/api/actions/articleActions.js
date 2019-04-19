import {ArticleRequest} from '../request'
import {
    MUTATION_PUSH_PROGRASS_BAR_TO_END,
    MUTATION_RECORD_CURRENT_ARTICLE_ID,
    MUTATION_RESOVLE_ARTICLE,
    MUTATION_RESOVLE_ARTICLE_LIST_DATA_TO_HOME,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_NOTICE,
    MUTATION_RESOVLE_ARTICLE_FILING_DATA,
    MUTATION_RESOVLE_ARTICLE_CLASSIFICATION_DATA
} from "../../mutation_types";
import {ACTION_GET_ARTICLE_DATA,
    ACTION_GET_ARTICLE_LIST_DATA,
    ACTION_GET_ARTICLE_FILING_DATA,
    ACTION_GET_ARTICLE_CLASSIFICATION_DATA} from "../../action_types";


export default {

    //获取文章详情
    async [ACTION_GET_ARTICLE_DATA](context,payload) {

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
        context.commit(MUTATION_RECORD_CURRENT_ARTICLE_ID, payload__)

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

            context.commit(MUTATION_RESOVLE_ARTICLE,payload___)

            //关闭loading状态
            const payload____ = {
                id: 'home_article',
                loading: false
            }

            context.commit(MUTATION_TRIGGER_IS_LOADING, payload____)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,({
                noticeContent: '获取文章数据失败, err:' + err.response ? err.response.data : err,
                show: true
            }))

        }

    },

    //获取home页面文章列表数据
    async [ACTION_GET_ARTICLE_LIST_DATA](context){

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

            context.commit(MUTATION_RESOVLE_ARTICLE_LIST_DATA_TO_HOME,payload__)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){

            console.log(err)

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,({
                noticeContent: '获取文章列表数据失败,err:' + err.response ? err.response.data : err,
                show: true
            }))

        }

    },

    //获取归档数据
    async [ACTION_GET_ARTICLE_FILING_DATA](context,payload) {

        try{

            const res = await ArticleRequest.RequestArticleFilingData()

            const payload = {
                filingMap: res.data
            }

            context.commit(MUTATION_RESOVLE_ARTICLE_FILING_DATA,payload)

        }catch (err) {
            console.log(err)

            const payload_ = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload_)
        }
    },

    //获取文章分类数据
    async [ACTION_GET_ARTICLE_CLASSIFICATION_DATA](context,payload) {

        try{

            const res = await ArticleRequest.RequestArticleClassificationData()

            const payload = {
                labelMap: res.data
            }

            context.commit(MUTATION_RESOVLE_ARTICLE_CLASSIFICATION_DATA,payload)

        }catch (err) {
            console.log(err)

            const payload_ = {
                show: true,
                noticeContent: err.response ? err.response.data : err
            }

            context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload_)
        }

    }


}


export const timeout = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}