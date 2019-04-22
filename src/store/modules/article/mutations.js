import {
    MUTATION_APPEND_COMMENT_JUST_SUBMIT,
    MUTATION_RECORD_CURRENT_ARTICLE_ID,
    MUTATION_RESET_PAGINATION_INDEX_OF_TOP_COMMENT_LIST,
    MUTATION_RESET_STORE,
    MUTATION_RESOLVE_ARTICLE,
    MUTATION_RESOLVE_TOP_COMMENT_LIST,
    MUTATION_TRIGGER_IS_LOADING
} from "../mutation_types";

export default {

    [MUTATION_RESOLVE_ARTICLE](state,payload){

        payload.article.article_content = generateArticleContentWithLazyloadImage(payload.article.article_content,'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/default.png')

        if(state.article.article_id === payload.article.article_id){
            return
        }

        state.article = payload.article

    },

    [MUTATION_RESOLVE_TOP_COMMENT_LIST](state,payload){

        state.commentList = uniqueCommentList(state.commentList.concat(payload.commentList))

        state.maxPage = payload.maxPage

        state.countOfAllComment = payload.countOfAllComment

        state.startIndex = state.startIndex + state.pageScale

        state.nextPage = state.nextPage + 1

    },

    [MUTATION_RECORD_CURRENT_ARTICLE_ID](state, payload){
        state.currentArticleId = payload.currentArticleId
    },

    [MUTATION_RESET_PAGINATION_INDEX_OF_TOP_COMMENT_LIST](state){

        state.startIndex = resetState.startIndex

        state.nextPage = resetState.nextPage

        state.maxPage = resetState.maxPage

        state.commentList = resetState.commentList
    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload) {
        if(payload.id === 'article_forMore'){
            state.loadingMoreComment = payload.loading
        }
    },

    [MUTATION_APPEND_COMMENT_JUST_SUBMIT](state,payload) {
        if(payload.commentEditorId === "topCommentEditor") {
            state.commentList.push(payload.comment)
        }
    },

    [MUTATION_RESET_STORE](state,payload) {

        if(payload.id === 'article'){
            for (var i in resetState) {
                state[i] = resetState[i] // 递归赋值
            }

        }
    }
}

const generateArticleContentWithLazyloadImage = (htmlStr,defaultImageSrc) => {

    let virtualElement = document.createElement('div')
    virtualElement.innerHTML = htmlStr

    let imgs = virtualElement.getElementsByTagName("img")

    if(imgs.length > 0) {
        for(let i = 0; i < imgs.length; i++){
            let src = imgs.item(i).getAttribute('src')
            imgs.item(i).setAttribute('data-src',src)
            imgs.item(i).setAttribute('class','lazyload')
            imgs.item(i).setAttribute('src',defaultImageSrc)
        }
    }

    return virtualElement.innerHTML

}

export const uniqueCommentList = (commentList) => {

    let uniqueCommentList = []

    commentList.forEach((listItem) => {
        if(uniqueCommentList.every((uniqueListItem) => {
            return uniqueListItem.comment_id !== listItem.comment_id
        })){
            uniqueCommentList.push(listItem)
        }
    })

    return uniqueCommentList
}

const resetState = {
    article: {},
    currentArticleId: undefined,

    commentList: [],
    countOfAllComment: 0,
    maxPage: 1,
    nextPage: 1,
    startIndex: 0,
    pageScale: 5,
}