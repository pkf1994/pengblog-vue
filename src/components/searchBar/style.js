import styled from 'vue-styled-components'
import store from '@/store'

export const SearchBarWrapper = styled.div`
        position: relative;
        padding: 1rem 2rem;
        background: white;
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
    `

export const SubmitButton = styled('button',{isFocus: Boolean})`
        -webkit-appearance:none;
        padding: 0 ${props => props.isFocus ? '0.6rem' : '0'};
        outline: none;
        cursor: pointer;
        position: absolute;
        right: 2rem;
        color: white;
        height: calc(100% - 2rem);
        width: ${props => props.isFocus ? '3rem' : '0'};
        background: ${props => props.isFocus ? store.state.meta.metaColor : 'gray'};
        border: none;
        border-radius: 0.4rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        transition: all 0.4s ease;
        transition-delay: 0.3s;
         &:hover{
            filter:brightness(80%);
         }
          @media(max-width: ${store.state.meta.maxMobileWidth}px){
            right: 1rem;
        }
    `

export const SearchTitle = styled.div`
        cursor: pointer;
        color: grey;
        font-size: 1.2rem;
        position: absolute;
        height: calc(100% - 2rem);
        right: 0rem;
        top: 1rem;
        width: calc(16% + 2rem);
        
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: ${props => props.isFocus ? '0' : '1'};
        transition: all 0.4s ease;
        &:hover{
            color: black;
        }
    `
