import styled from 'vue-styled-components'
import store from '@/store'

export const FreshCommentsWrapper = styled.div`
        border-top: solid 1px ${store.state.meta.metaBorderColor};
        padding-left: 2rem;
        padding-right: 1rem;
        padding-top: 1rem;
        flex-grow: 1;
        overflow-Y: scroll;
        margin-right: 2rem;
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
    `

export const Title = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    `

export const ForMoreWrapper = styled.div`
        height: 60px;
    `
