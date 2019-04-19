import styled from 'vue-styled-components'
import store from '@/store'

export const FreshCommentsWrapper = styled.div`
        border-top: solid 1px ${store.state.meta.metaBorderColor};
        padding: 1rem 2rem;
        padding-top: 0;
        flex-grow: 1;
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
    `

export const Title = styled.div`
        z-index:2;
        position: sticky;
        top: 0;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 1rem 0;
        background: white;
    `

export const ForMoreWrapper = styled.div`
        height: 60px;
    `
