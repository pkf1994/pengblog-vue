import styled from 'vue-styled-components'
import store from '@/store'


export const ArticleClassificationWrapper = styled.div`
        padding: 1rem 2rem;
        border-top: solid 1px ${store.state.meta.metaBorderColor};
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            padding: 1rem;
        }
    `

export const Title = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    `

export const Tags = styled.div`
        display: flex;
        flex-wrap: wrap;
        max-height: 6.4rem;
        overflow-Y: scroll;
         ${props => props.browser !== 'Safari' ? `

        &::-webkit-scrollbar{
            width:2px;
            height:1px;
        }
        &::-webkit-scrollbar-thumb{
            background: #DDDDDD;
        }
        &::-webkit-scrollbar-track{
        
        }`
    : ''}
        
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            width: calc(${store.state.meta.widthOfWindow}px - 2rem);
        }
        
         @media(max-width:${store.state.meta.maxMobileWidth}px){
            flex-wrap: nowrap;
            display: block;
            overflow-X: scroll;
            white-space:nowrap;
        }
    `

export const TagItem = styled('div',{selected:Boolean})`
        padding: 0.5rem;
        margin-right: 0.3rem;
        margin-bottom: 0.3rem;
        font-size: 0.8rem;
        border: solid 1px grey;
        border-radius: 0.4rem;
        cursor: pointer;
        background: ${props => props.selected ? '#F7F7F7' : 'white'};
        &:hover{
            background: #F7F7F7;
        }
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            height: 100%;
            display: inline-block;
            font-size: 1rem;
            padding: 0.6rem 0.8rem;
            margin-bottom: 0;
        }
        
    `

