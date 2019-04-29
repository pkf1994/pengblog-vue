import styled from 'vue-styled-components'
import store from '@/store'

export const NotFoundPageWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(${store.state.meta.heightOfWindow}px - ${store.state.meta.heightOfHeader});
    `

export const NotFoundImage = styled('img',{imageUrlReady:Boolean})`
        width: 300px;
        height: auto;
        transition: all 1s ease;
        opacity: ${props => props.imageUrlReady ? '1' : '0'};
    `

export const Title = styled.div`
        font-size: 2rem;
        font-weight: 100;
        margin-top: 1.5rem;
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        height: 100%;
        weight: 100%;
    `

