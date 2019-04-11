export default {

    mutation_resolveArticle(state,payload){

        payload.article.article_content = generateArticleContentWithLazyloadImage(payload.article.article_content)

        if(state.article.article_id === payload.article.article_id){
            return
        }

        state.article = payload.article

    },

    mutation_resolveTopCommentListOfSpecificArticle(state,payload){

        state.commentList = uniqueCommentList(state.commentList.concat(payload.commentList))

        state.maxPage = payload.maxPage

        state.countOfAllComment = payload.countOfAllComment

        state.startIndex = state.startIndex + state.pageScale

        state.nextPage = state.nextPage + 1

    },

    mutation_recordCurrentArticleId(state, payload){
        state.currentArticleId = payload.currentArticleId
    },

    mutation_resetPaginationIndexOfTopCommentListOfSpecificArticle(state){

        console.log('reset')

        state.startIndex = resetState.startIndex

        state.nextPage = resetState.nextPage

        state.maxPage = resetState.maxPage
    }

}

const generateArticleContentWithLazyloadImage = (htmlStr) => {

    let virtualElement = document.createElement('div')
    virtualElement.innerHTML = htmlStr

    let imgs = virtualElement.getElementsByTagName("img")

    if(imgs.length > 0) {
        for(let i = 0; i < imgs.length; i++){
            let src = imgs.item(i).getAttribute('src')
            imgs.item(i).setAttribute('data-src',src)
            imgs.item(i).setAttribute('class','lazyload')
            imgs.item(i).setAttribute('src',window.defaultImageSrc)
        }
    }

    return virtualElement.innerHTML

}

const uniqueCommentList = (commentList) => {

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