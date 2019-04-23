import styled from 'vue-styled-components'
import store from '@/store'

export const ArticleEditPageWrapper = styled.div`
        display: flex;
        justify-content: center;
    `

export const MainArea = styled.div`
        width: 650px;
        max-width: 100%;
    `


export const TitleImageWrapper = styled.div`
        width: 100%;
        margin-top: 2rem;
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            margin-top: 0;
        }
    `

export const TitleTextareaWrapper = styled.div`
       
    `

export const ArticleInfo = styled.div`
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        padding: 0 0.5rem;
    `

export const Gap = styled.span`
        font-size: 1.6rem;
        line-height: 1.5;
        color: #BBBBBB; 
    `

export const TitleLengthWarn = styled('div',{show:Boolean})`
        height: ${props => props.show ? '3rem' : '0px'};
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        transition: all .4s ease;
        color: ${store.state.meta.metaGray};
    `

export const Cover = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
        background: white;
        opacity: 0.4;
    `

export const ArticleEditorWrapper = styled.div`
        margin-bottom: 10rem;
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: white;
        opacity: 0.5;
    `