import styled from 'vue-styled-components'
import store from '@/store'

export const ArticleFilingWrapper = styled.div`
        padding: 1rem 2rem;
        @media(max-width:${store.state.meta.maxMobileWidth}px){
        }
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            padding: 1rem;
        }
    `

export const ArticleFilingTitle = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    `

export const ArticleFilinger = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
    `

export const DateSelector = styled.div`
        display: flex;
        align-items: center;
    `


export const SubmitButton = styled('button',{year: Boolean})`
        -webkit-appearance:none;
        padding: 0 0.6rem;
        outline: none;
        cursor: ${props => props.year ? 'pointer' : 'default'};
        color: white;
        background: gray;
        border: solid 1px gray;
        border-radius: 0.4rem;
        transition: all 0.4s ease;
        ${props => props.year ? ` 
        &:hover{
            background: ${store.state.meta.metaColor};
            border: 1px solid ${store.state.meta.metaColor};
        }` : ''};
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            font-size: 1rem;
            padding: 0 1rem;
        }
    `

export const Option = styled.option`
        color: blue;
          outline: none;
    
    `