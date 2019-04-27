import styled from 'vue-styled-components'
import store from '@/store'

export const TableHeaderWrapper = styled.div`
        position: relative;
        display:flex;
        color: ${store.state.meta.metaGray};
        border-bottom: solid 2px ${store.state.meta.metaBorderColor};
    `

export const ArticleTitle = styled('div',{multiSelecting:Boolean,hasBeenDeleted: Boolean})`
        box-sizing: border-box;
        width: 65%;
        display: flex;
        align-items: center;
        padding: 1rem;
        padding-left: ${props => props.multiSelecting ? '3rem' : '2rem'};
        padding-right:${props => props.hasBeenDeleted ? '4rem' : '3rem'};
        line-height: 1.4;
        position: relative;
        justify-content: flex-start;
        transition: all .4s ease;
    `

export const ArticleAuthor = styled.div`
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        padding-left: 0;
        line-height: 1.4;
    `

export const ArticleLabel = styled(ArticleAuthor)`
        width: 10%;
        
    `

export const ArticleReleaseTime = styled(ArticleAuthor)`
        width: 15%;
    `

export const MultiSelectBtn = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        height: 100%;
        left: 0;
        color: ${store.state.meta.metaLinkColor};
        &:hover{
            color: black;
        }
    `

export const MultiSelectOperation = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        height: 100%;
        left: 0;
    `


export const MultiDeleteBtn = styled.span`
        cursor: pointer;
        margin-right: 1rem;
        color: ${store.state.meta.metaLinkColor};
        &:hover{
            color: black;
        }
    `

export const Cancel = styled(MultiDeleteBtn)``

export const LoadingWrapper = styled.div`
        transition: all .4s ease;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: #F7F7F7;
        opacity: 0.5;
    `
