import {ArticleRequest} from '../request'
import {
    MUTATION_PUSH_PROGRASS_BAR_TO_END,
    MUTATION_RECORD_CURRENT_ARTICLE_ID,
    MUTATION_RESOLVE_ARTICLE,
    MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_HOME,
    MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_NOTICE,
    MUTATION_RESOLVE_ARTICLE_FILING_DATA,
    MUTATION_RESOLVE_ARTICLE_CLASSIFICATION_DATA,
    MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    MUTATION_APPOINT_PAGINATION,
    MUTATION_LAUNCH_PROGRASS_BAR,
    MUTATION_APPOINT_EDITING_ARTICLE,
    MUTATION_RESET,
    MUTATION_RESOLVE_DRAFT,
    MUTATION_RECORD_ARTICLE_JUST_DELETED,
    MUTATION_RESET_PAGINATION,
    MUTATION_TRIGGER_SHOW_MODAL,
    MUTATION_RECORD_ARTICLE_JUST_RECOVER,
    MUTATION_RECORD_ARTICLE_JUST_DESTROY
} from "../../mutation_types";
import {
    ACTION_GET_ARTICLE_DATA,
    ACTION_GET_ARTICLE_LIST_DATA,
    ACTION_GET_ARTICLE_FILING_DATA,
    ACTION_GET_ARTICLE_CLASSIFICATION_DATA,
    ACTION_GET_ARTICLE_LIST_DATA_OF_MANAGE_PAGE,
    ACTION_GET_ARTICLE_LIST_BY_KEYWORD,
    ACTION_GET_ARTICLE_LIST_BY_FILING,
    ACTION_GET_ARTICLE_LIST_BY_CLASSIFICATION,
    ACTION_GET_ARTICLE_LIST_OF_HOME_BY_KEYWORD,
    ACTION_GET_ARTICLE_LIST_OF_HOME_BY_FILING,
    ACTION_GET_ARTICLE_LIST_OF_HOME_BY_LABEL,
    ACTION_SAVE_ARTICLE,
    ACTION_GET_DRAFT,
    ACTION_APPOINT_EDITING_ARTICLE,
    ACTION_DELETE_ARTICLE,
    ACTION_DELETE_ARTICLE_LIST,
    ACTION_RECOVER_ARTICLE,
    ACTION_CLEAN_RECYCLEBIN,
    ACTION_DESTROY_ARTICLE
} from "../../action_types";
import {AXIOS_SOURCE_REQUEST_ARTICLE} from "../source_types";
import {throttleByDelay} from "../../../../exJs/throttle";
import router from '@/router'
import {exceptionNoticer} from "./index";


export default {

    //获取文章详情
    async [ACTION_GET_ARTICLE_DATA](context,payload) {



        if(parseInt(payload.article_id) === context.rootState.article.article.article_id){
            return
        }

        context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

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

        try{

            const res = await ArticleRequest.RequestArticle(payload.article_id)

            const payload___ = {
                article: res.data
            }

            context.commit(MUTATION_RESOLVE_ARTICLE,payload___)

            //关闭loading状态
            const payload____ = {
                id: 'home_article',
                loading: false
            }

            context.commit(MUTATION_TRIGGER_IS_LOADING, payload____)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){


            exceptionNoticer(err,ACTION_GET_ARTICLE_DATA,context)

            throw new Error()
        }

    },

    //获取home页面文章列表数据
    async [ACTION_GET_ARTICLE_LIST_DATA](context){

        context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

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

            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_HOME,payload__)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){

            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_DATA,context)

        }

    },

    //获取managePage页面文章列表数据
    async [ACTION_GET_ARTICLE_LIST_DATA_OF_MANAGE_PAGE](context){

        context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

        const payload = {
            id: 'managePage',
            loading: true
        }

        context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

        try{

            const payload_ = {
                startIndex: context.rootState.pagination.managePage.startIndex,
                pageScale: context.rootState.pagination.managePage.pageScale
            }

            const res = await ArticleRequest.RequestArticleList(payload_)

            const payload__ = {
                articleList: res.data.articleList,
            }
            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,payload__)

            const payload___ = {
                paginationId: 'managePage',
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_APPOINT_PAGINATION,payload___)

            const payload = {
                id: 'managePage',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){

            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_DATA_OF_MANAGE_PAGE,context)

        }

    },

    //获取归档数据
    async [ACTION_GET_ARTICLE_FILING_DATA](context) {

        try{

            const payload = {
                id: 'manage_articleFiling',
                loading: true
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

            const res = await ArticleRequest.RequestArticleFilingData()

            const payload_ = {
                filingMap: res.data
            }

            context.commit(MUTATION_RESOLVE_ARTICLE_FILING_DATA,payload_)

            const payload__ = {
                id: 'manage_articleFiling',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

        }catch (err) {

            exceptionNoticer(err,ACTION_GET_ARTICLE_FILING_DATA,context)

        }
    },

    //获取文章分类数据
    async [ACTION_GET_ARTICLE_CLASSIFICATION_DATA](context) {

        try{

            const payload_ = {
                id: 'manage_articleClassification',
                loading: true
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

            const res = await ArticleRequest.RequestArticleClassificationData()

            const payload__ = {
                labelMap: res.data
            }

            context.commit(MUTATION_RESOLVE_ARTICLE_CLASSIFICATION_DATA,payload__)

            const payload___ = {
                id: 'manage_articleClassification',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload___)

        }catch (err) {

            exceptionNoticer(err,ACTION_GET_ARTICLE_CLASSIFICATION_DATA,context)

        }

    },

    //搜索文章
    async [ACTION_GET_ARTICLE_LIST_BY_KEYWORD](context,payload) {

        try{

            context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

            const payload_ = {
                id: 'managePage',
                loading: true
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

            const payload__ = {
                searchString: context.rootState.searchBar.managePage.value,
                startIndex: context.rootState.pagination.managePage.startIndex,
                pageScale: context.rootState.pagination.managePage.pageScale
            }

            const res = await ArticleRequest.RequestArticleListDataBykeyword(payload__)

            const payload___ = {
                articleList: res.data.articleList,
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,payload___)

            const payload____ = {
                paginationId: 'managePage',
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_APPOINT_PAGINATION,payload____)

            const payload_____ = {
                id: 'managePage',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_____)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch (err) {

            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_BY_KEYWORD,context)

        }

    },

    //根据归档搜索文章
    async [ACTION_GET_ARTICLE_LIST_BY_FILING](context,payload) {

        try{

            context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

            const payload_ = {
                id: 'managePage',
                loading: true
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

            const payload__ = {
                selectedYear: context.rootState.manage.articleFiling.selectedYear,
                selectedMonth: context.rootState.manage.articleFiling.selectedMonth,
                startIndex: context.rootState.pagination.managePage.startIndex,
                pageScale: context.rootState.pagination.managePage.pageScale
            }

            console.log(payload__)

            const res = await ArticleRequest.RequestArticleListDataByFiling(payload__)

            const payload___ = {
                articleList: res.data.articleList,
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,payload___)

            const payload____ = {
                paginationId: 'managePage',
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_APPOINT_PAGINATION,payload____)

            const payload_____ = {
                id: 'managePage',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_____)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch (err) {
            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_BY_FILING,context)
        }

    },

    //根据label搜索文章
    async [ACTION_GET_ARTICLE_LIST_BY_CLASSIFICATION](context,payload) {

        try{

            context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

            const payload_ = {
                id: 'managePage',
                loading: true
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

            const payload__ = {
                article_label: context.rootState.manage.articleClassification.selectedLabel,
                startIndex: context.rootState.pagination.managePage.startIndex,
                pageScale: context.rootState.pagination.managePage.pageScale
            }

            const res = await ArticleRequest.RequestArticleListDataByLabel(payload__)

            const payload___ = {
                articleList: res.data.articleList,
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,payload___)

            const payload____ = {
                paginationId: 'managePage',
                maxPage: res.data.maxPage
            }
            context.commit(MUTATION_APPOINT_PAGINATION,payload____)

            const payload_____ = {
                id: 'managePage',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_____)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch (err) {
            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_BY_CLASSIFICATION,context)
        }

    },

    async [ACTION_GET_ARTICLE_LIST_OF_HOME_BY_KEYWORD](context){

        context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

        //trigger forMore组件为loading状态
        const payload = {
            id: 'home_forMore',
            loading: true
        }

        context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

        try{

            const payload_ = {
                searchString: context.rootState.searchBar.home.value,
                startIndex: context.rootState.home.startIndex,
                pageScale: context.rootState.home.pageScale
            }

            const res = await ArticleRequest.RequestArticleListDataBykeyword(payload_)

            const payload__ = {
                articleList: res.data.articleList,
                maxPage: res.data.maxPage
            }

            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_HOME,payload__)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){

            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_OF_HOME_BY_KEYWORD,context)

        }
    },

    async [ACTION_GET_ARTICLE_LIST_OF_HOME_BY_FILING](context){

        context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

        //trigger forMore组件为loading状态
        const payload = {
            id: 'home_forMore',
            loading: true
        }

        context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

        try{

            const payload_ = {
                selectedYear: context.rootState.manage.articleFiling.selectedYear,
                selectedMonth: context.rootState.manage.articleFiling.selectedMonth,
                startIndex: context.rootState.home.startIndex,
                pageScale: context.rootState.home.pageScale
            }

            const res = await ArticleRequest.RequestArticleListDataByFiling(payload_)

            const payload__ = {
                articleList: res.data.articleList,
                maxPage: res.data.maxPage
            }

            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_HOME,payload__)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){

            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_OF_HOME_BY_FILING,context)

        }
    },

    async [ACTION_GET_ARTICLE_LIST_OF_HOME_BY_LABEL](context){

        context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

        //trigger forMore组件为loading状态
        const payload = {
            id: 'home_forMore',
            loading: true
        }

        context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

        try{

            const payload_ = {
                article_label: context.rootState.manage.articleClassification.selectedLabel,
                startIndex: context.rootState.home.startIndex,
                pageScale: context.rootState.home.pageScale
            }

            const res = await ArticleRequest.RequestArticleListDataByLabel(payload_)

            const payload__ = {
                articleList: res.data.articleList,
                maxPage: res.data.maxPage
            }

            context.commit(MUTATION_RESOLVE_ARTICLE_LIST_DATA_TO_HOME,payload__)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch(err){

            exceptionNoticer(err,ACTION_GET_ARTICLE_LIST_OF_HOME_BY_LABEL,context)

        }
    },

    //提交文章
    async [ACTION_SAVE_ARTICLE](context,payload) {

        checkToken()

        try{

            if(payload.article_type === 'article'){
                const payload_ = {
                    id: 'articleEdit_savingArticle',
                    loading: true
                }
                context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

                context.commit(MUTATION_LAUNCH_PROGRASS_BAR)
            }

            if(payload.article_type === 'draft'){
                const payload__ = {
                    id: 'articleEdit_savingDraft',
                    loading: true
                }
                context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)
            }

            let articleData = {
                article_id: context.rootState.articleEdit.id,
                article_title: context.rootState.articleEdit.title,
                article_author: context.rootState.articleEdit.author,
                article_label: context.rootState.articleEdit.label,
                article_content: context.rootState.articleEdit.content,
                article_type: payload.article_type,
                article_titleImageUrl: context.rootState.articleEdit.titleImageEditor.titleImageUrl,
            }

            const res = await ArticleRequest.SaveArticle(articleData)

            //记录id
            const payload___ = {
                key:'id',
                value: res.data
            }

            context.commit(MUTATION_APPOINT_EDITING_ARTICLE,payload___)

            if(payload.article_type === 'article'){

                //重置home
                context.commit(MUTATION_RESET,'home')
                context.dispatch(ACTION_GET_ARTICLE_LIST_DATA)

                //通知窗口提示提交成功
                const payload_______ = {
                    show: true,
                    noticeContent: '提交文章成功，即将跳转。'
                }
                context.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload_______)

                context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

                context.commit(MUTATION_RESET_PAGINATION,'managePage')

            }

            if(payload.article_type === 'draft'){
                const payload________ = {
                    id: 'articleEdit_savingDraft',
                    loading: false
                }
                context.commit(MUTATION_TRIGGER_IS_LOADING,payload________)
            }

        }catch (err) {
            exceptionNoticer(err,ACTION_SAVE_ARTICLE,context)
        }

    },

    async [ACTION_GET_DRAFT](context,payload) {

        checkToken()

        try{

            context.commit(MUTATION_LAUNCH_PROGRASS_BAR)

            const payload_ = {
                id: 'articleEditPage',
                loading: true
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

            const res = await ArticleRequest.RequestDraftData()

            context.commit(MUTATION_RESOLVE_DRAFT,res.data)

            const payload__ = {
                id: 'articleEditPage',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

            context.commit(MUTATION_PUSH_PROGRASS_BAR_TO_END)

        }catch (err) {

            const payload__ = {
                id: 'articleEditPage',
                loading: false
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

            exceptionNoticer(err,ACTION_GET_DRAFT,context)
        }
    },

    async [ACTION_APPOINT_EDITING_ARTICLE](context,payload) {


        try{

            context.commit(MUTATION_APPOINT_EDITING_ARTICLE,payload)

            if(payload.key === 'title' && payload.value === context.rootState.articleEdit.titleCache) {
                return
            }

            if(payload.value === context.rootState.articleEdit.draftCache[payload.key]){
                return
            }

            throttleByDelay(() => {
                const payload_ = {
                    article_type: 'draft',
                }

                context.dispatch(ACTION_SAVE_ARTICLE,payload_)

            },1000,{page:'articleEditPage'})



        }catch (err) {
            exceptionNoticer(err,ACTION_APPOINT_EDITING_ARTICLE,context)
        }

    },

    async [ACTION_DELETE_ARTICLE](context,payload) {

        checkToken()

        try{

            await ArticleRequest.RequestDeleteArticle(payload)

            context.commit(MUTATION_RECORD_ARTICLE_JUST_DELETED,payload)

            /*setTimeout(() => {
                context.commit(MUTATION_RESET_PAGINATION,'managePage')
            },1000)*/

        }catch (err) {

            const payload__ = {
                show: false
            }

            context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload__)

            exceptionNoticer(err,ACTION_DELETE_ARTICLE,context)
        }

    },

    async [ACTION_DELETE_ARTICLE_LIST](context) {

        checkToken()

        try{

            const payload = context.rootState.manage.articleListSelected

            await ArticleRequest.RequestDeleteArticleList(payload)

            payload.forEach((item) => {
                context.commit(MUTATION_RECORD_ARTICLE_JUST_DELETED,item)
            })

            /*setTimeout(() => {
                context.commit(MUTATION_RESET_PAGINATION,'managePage')
            },1000)*/
        }catch (err) {

            const payload___ = {
                show: false
            }

            context.commit(MUTATION_TRIGGER_SHOW_MODAL,payload___)

            exceptionNoticer(err,ACTION_DELETE_ARTICLE_LIST,context)
        }
    },

    async [ACTION_RECOVER_ARTICLE](context,payload) {

        try{

            await ArticleRequest.RequestRecoverArticle(payload)

            context.commit(MUTATION_RECORD_ARTICLE_JUST_RECOVER, payload)

        }catch (err) {

            exceptionNoticer(err,ACTION_RECOVER_ARTICLE,context)

        }

    },

    async [ACTION_CLEAN_RECYCLEBIN](context) {
        try{

            const payload = {
                loading: true,
                id: 'managePage_header'
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload)

            await ArticleRequest.RequestDestroyAllArticleDeleted()

            const payload_ = {
                loading: false,
                id: 'managePage_header'
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

            context.commit(MUTATION_RESET_PAGINATION,'managePage')

        }catch (err) {

            const payload__ = {
                loading: false,
                id: 'managePage_header'
            }
            context.commit(MUTATION_TRIGGER_IS_LOADING,payload__)

            exceptionNoticer(err,ACTION_CLEAN_RECYCLEBIN,context)
        }
    },

    async [ACTION_DESTROY_ARTICLE](context,payload) {

        try{

            await ArticleRequest.RequestDestroyArticle(payload)

            context.commit(MUTATION_RECORD_ARTICLE_JUST_DESTROY,payload)

        }catch (err) {

            exceptionNoticer(err,ACTION_DESTROY_ARTICLE,context)

        }

    }

}


export const timeout = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export function checkToken(){

    if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
        router.push({path:'/login'})
        return
    }

    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null){
        let tokenObj = JSON.parse(localStorage.getItem('token'))
        let expTime = tokenObj.expTime

        if(expTime < new Date().getTime()){
            router.push({path:'/login'})
        }
    }
}