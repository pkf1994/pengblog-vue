import styled from 'vue-styled-components'
import store from '@/store'

export const NotFoundPageWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(${store.state.meta.heightOfWindow}px - ${store.state.meta.heightOfHeader});
    `

export const NotFoundImage = styled.img`
        width: 300px;
        height: auto;
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

