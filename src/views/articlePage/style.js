import styled from 'vue-styled-components'
import store from '@/store'

export const ArticlePageWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;    
    `

export const ArticleDetailFixer = styled.div`
        margin-top: ${store.state.meta.heightOfHeader};
        width: 600px;
        max-width: 100%;
        
        @media(min-width:${store.state.meta.milePost}px){
            width: 650px;
        }
        
         @media(min-width:${store.state.meta.bigScreenWidth}px){
            width: 850px;
        }
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: white;
    `
