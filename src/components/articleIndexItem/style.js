import styled from 'vue-styled-components'
import store from '@/store'

export const Header = styled.div`
        position: relative;
        display:flex;
        color: ${store.state.meta.metaGray};
        border-bottom: solid 2px ${store.state.meta.metaBorderColor};
    `

export const Body = styled('div',{selected: Boolean,deleted: Boolean,hasBeenDeleted:Boolean})`
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

export const ArticleTitle = styled('div',{multiSelecting:Boolean})`
        width: 55%;
        display: flex;
        align-items: center;
        padding: 1rem;
        padding-left: ${props => props.multiSelecting ? '3rem' : '2rem'};
        padding-right:3rem;
        line-height: 1.4;
        position: relative;
        justify-content: flex-start;
        transition: all .4s ease;
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

export const DeleteButton = styled.div`
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
         ${store.state.meta.browser === 'Safari' ? '' : `
             &:hover{
                color: #3367d6;
            }     
         `}
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
        width: 20%;
    `


export const ArticleItemWrapper = styled.div`
       
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