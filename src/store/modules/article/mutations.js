export default {

    mutation_resolveArticle_api(state,payload){

        payload.article.article_content = generateArticleContentWithLazyloadImage(payload.article.article_content)

        if(state.article.article_id === payload.article.article_id){
            return
        }

        state.article = payload.article

    },

    mutation_recordCurrentArticleId_article_api(state, payload){
        state.currentArticleId = payload.currentArticleId
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