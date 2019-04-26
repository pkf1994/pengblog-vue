import styled from 'vue-styled-components'
import store from '@/store'

export const SubCommentWrapper = styled('div',{isBeenDeleting:Boolean,isBanned:Boolean})`
        margin-left: 1rem;
        position: relative;
        align-items: stretch;
        border-top: solid 1px ${store.state.meta.metaBorderColor};
        filter: brightness(${props => props.isBeenDeleting ? '95%' : '100%'});
        background: ${props => props.isBanned ? '#F7F7F7' : 'white'};
        transition: all 0.4s ease;
    `

export const Content = styled('div',{isBanned:Boolean})`
        box-sizing: border-box;
        font-size: 0.9rem;
        line-height: 1.5;
        padding: 0.8rem 0;
        flex-grow: 1;    
        text-decoration: ${props => props.isBanned ? 'line-through' : 'none'};
        color: ${props => props.isBanned ? 'grey' : 'black'};
        @media(min-width: ${store.state.meta.maxMobileWidth}px) {
            padding-right: 0;
        }    
    `

export const SubCommentAuthor = styled.span`
        color: #175199;
    `

export const OperationRow = styled.div`
        color: #CCCCCC;
        padding: 0.8rem 1rem;
        padding-top: 0;
        font-size: 0.9rem;
        text-align: right;
    `


export const Platform = styled.span``

export const ReleaseTime = styled.span``


export const ReplyButton = styled.span`
        cursor: pointer;
        &:hover{
            color: black;
        }
    `

export const SubCommentEditorFixer = styled('div',{height: String,isBeenRefering: Boolean})`
        padding: 0 1rem;
        padding-bottom: ${props => props.isBeenRefering ? '1rem' : '0px'};
        transition: all .4s ease;
        overflow: hidden;
        height: ${props => props.isBeenRefering ? props.height : '0px'};
    `

export const DeleteButton = styled.span`
    `

export const DeleteButtonIcon = styled.i`
        cursor: pointer;
        &:hover{
            color: black
        }
    `

export const LoadingWrapper = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: #F7F7F7;
        opacity: 0.5;
    `