import styled from 'vue-styled-components'
import { Button } from '@/components'
import store from '@/store'

export const TopCommentEditorWrapper = styled.div`
        position: relative;
        background: white;
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

export const EmojiButton = styled.div`
        font-size: 1.2rem;
        position: absolute;
        bottom: 1.2rem;
        right: 2.4em;
        &:hover{
            filter:brightness(0.8);
           
        }
    `


export const EmojiPickerWrapper = styled.div`
        z-index:1;
        position: absolute;
        top: -10%;
        right: 10%;
    `


export const VisitorInfo = styled.div`
        margin-bottom: 1rem;    
        display:flex;
        flex-wrap: wrap;
    `

export const Space = styled.div`
        width: 2rem;
    `

export const InputWrapper = styled('div',{withMarginRight: Boolean})`
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
        position: absolute;
        right: 0;
        top: 0.5rem;
        width: auto;
       
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            position: static;
            margin-bottom: 1rem;
        }
    `

export const SubmitButton = styled(Button)`
         width: 100%;
         @media(max-width:${store.state.meta.maxMobileWidth}px){
            padding: 0.5rem;
         }
         @media(min-width:${store.state.meta.maxMobileWidth}px){
            display: none;
        } 
    `

export const SubmitTextBtn = styled.span`
        color: #0066AA;
        cursor: pointer;
        text-decoration: underline;
        &:hover{
            color: black;
            
        }
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            display: none;
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