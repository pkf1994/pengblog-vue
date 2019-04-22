import styled from 'vue-styled-components'
import store from '@/store'

export const ArticleWrapper = styled.div`
        position: relative;
    `

export const ArticleTitleImage = styled.img`
        width: 100%;
        object-fit: cover;
        max-height: 320px;
    `

export const ArticleMultiContent = styled.div`
        padding: 0 2rem;
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            padding: 0 1rem;
        }
    `

export const ArticleTitle = styled.div`
        font-size: 2rem;
        line-height: 1.5;
        font-weight: bold;
        margin-bottom: 0.5rem;
        margin-top: 1rem;
    `

export const ArticleInfo = styled.div`
         line-height: 2;
         color: grey;
         margin-bottom: 1rem;
    `

export const ArticleContent = styled.div`
        line-height: 1.7;
        word-wrap: break-word;
    `

export const LoadingWrapper = styled.div`
        position: absolute;
        height: calc(${window.innerHeight}px - ${store.state.meta.heightOfHeader});
        width: 100%;
        top: 0;
        background: white;
        @media(min-width:${store.state.meta.maxMobileWidth}px){
            display: none;
        }
    `

