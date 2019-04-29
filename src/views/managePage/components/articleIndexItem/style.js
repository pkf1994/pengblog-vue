import styled from 'vue-styled-components'
import store from '@/store'

export const ArticleItemWrapper = styled('div',{selected: Boolean,deleted: Boolean,hasBeenDeleted:Boolean})`
        position: relative;
        padding-left: ${props => props.selected ? '1rem' : '0'};
        display: flex;
        margin-top: 1rem;
        color: grey;
        margin-top: 0;
        margin-bottom: 0;
        background: white;
        transition: all 0.4s ease;
        text-decoration: ${props => props.hasBeenDeleted ? 'line-through' : 'none'};
        ${props => props.deleted ? 'text-decoration:line-through' : ''};
        ${store.state.meta.browser === 'Safari' ? '' : `
            &:hover{
                background:linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,0,0.05), rgba(255,255,255,1));
            }
        `}
    `

export const ArticleTitle = styled('div',{multiSelecting:Boolean,hasBeenDeleted: Boolean})`
        box-sizing: border-box;
        width: 55%;
        display: flex;
        align-items: center;
        padding: 1rem;
        padding-left: ${props => props.multiSelecting ? '3rem' : '2rem'};
        padding-right:${props => props.hasBeenDeleted ? '4rem' : '3rem'};
        line-height: 1.4;
        position: relative;
        justify-content: flex-start;
        transition: all .4s ease;
        flex-shrink: 0;
        @media(max-width:800px){
            padding-left: ${props => props.multiSelecting ? '2rem' : '1rem'};
        }
    `

export const ArticleTitleInner = styled.span`
        color: black;
        cursor: pointer;
        ${store.state.meta.browser === 'Safari' ? '' : `
          &:hover{
            color: #3367d6;
            }
        `}
    `

export const OperationButton = styled.div`
        position: absolute;
        box-sizing: border-box;
        height: 100%;
        top: 0;
        right: 1rem;
        display: flex;
        padding: 0.5rem;
        align-items: center;
        color: black;  
        font-size: 1.2rem;
        
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
        flex-grow: 2;
    `

export const CheckBoxWrapper = styled.div`
        z-index: 2;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 1rem;
        display: flex;
        align-items: center;
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

export const DeleteBtnIcon = styled.i`
        cursor: pointer;
         ${store.state.meta.browser === 'Safari' ? '' : `
             &:hover{
                color: #3367d6;
            } 
            `   
         }`


export const RecycleBtnIcon = styled(DeleteBtnIcon)``

export const DestroyBtnIcon = styled.span`
        cursor: pointer;
        ${store.state.meta.browser === 'Safari' ? '' : `
             &:hover{
                color: #3367d6;
            }`   
         }`