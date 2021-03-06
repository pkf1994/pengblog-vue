import styled from 'vue-styled-components'
import {Button} from '../../../../../button/index'
import store from '@/store'

export const SubCommentEditorWrapper = styled.div`
        position: relative;
        background: white;
        border-top: solid 1px ${store.state.meta.metaBorderColor};
    `


export const Title = styled.div`
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        font-weight: bold;
    `

export const Name = styled.div`
        margin-bottom: 1rem;
        @media(max-width: ${store.state.meta.maxMobileWidth}px) {
            width: 100%;
        }
    `

export const Content = styled.div`
        margin-top: 1rem;
        position: relative;
    `


export const VisitorInfo = styled.div`
        margin-bottom: 1rem;    
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
    `


export const InputWrapper = styled('div',{withMarginRight: Boolean})`
        width: 47%;
        margin: 1rem 0;
        margin-bottom: 0;
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            width: 100%;
        }
         ${props => props.withMarginRight ? `
            @media(min-width:${store.state.meta.maxMobileWidth}px){
                margin-right: 1rem;
            }
        ` : ''}
    `

export const SubmitButtonWrapper = styled.div`
       width: 47%;
       margin-top: 1rem;
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            position: static;
            margin-bottom: 0;
            width: 100%;
        }
    `

export const SubmitButton = styled(Button)`
         width: 100%;
         padding: 0.5rem;
         @media(max-width:${store.state.meta.maxMobileWidth}px){
            padding: 1rem;
         }
       
    `


export const LoadingWrapper = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        opacity: 0.5
    `

export const EmojiPickerFixer = styled.div`
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    `