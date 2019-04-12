import styled from 'vue-styled-components'
import { Button } from '@/components'

export const TopCommentEditorWrapper = styled.div`
        position: relative;
        background: white;
    `


export const Title = styled.div`
        font-size: 1.3rem;
        font-weight: bold;
    `

export const Name = styled.div`
        margin-bottom: 1rem;
        @media(max-width: ${window.maxMobileWidth}px) {
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
        justify-content: space-between;
        @media(max-width:${window.maxMobileWidth}px){
           display:default;
        }
    `

export const Space = styled.div`
        width: 2rem;
    `

export const InputWrapper = styled.div`
        width: 47.5%;
        margin-bottom: 1rem;
        @media(max-width:${window.maxMobileWidth}px){
           width:100%;
        }
    `

