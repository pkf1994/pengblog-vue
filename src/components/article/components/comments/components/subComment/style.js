import styled from 'vue-styled-components'
import store from '@/store'

export const SubCommentWrapper = styled('div',{isBeenDeleting:Boolean,isBanned:Boolean})`
        position: relative;
        align-items: stretch;
        border-top: solid 1px ${store.state.meta.metaBorderColor};
        filter: brightness(${props => props.isBeenDeleting ? '95%' : '100%'});
        background: ${props => props.isBanned ? '#F7F7F7' : 'white'};
        transition: all 0.4s ease;
        margin: 0 1rem;
    `

export const Content = styled('div',{isBanned:Boolean})`
        box-sizing: border-box;
        font-size: 0.9rem;
        line-height: 1.5;
        padding: 0.8rem 1rem;
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

export const ReplyButton = styled.span``