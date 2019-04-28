import styled from 'vue-styled-components'
import store from '@/store'

export const Title = styled.div`
        padding: 1rem 2rem;
        padding-bottom: 0;
        font-size: 1.5rem;
        font-weight: 100;
        align-self: flex-start;
    `

export const IpManagePageWrapper = styled.div`
        min-height: calc(${store.state.meta.heightOfWindow}px - ${store.state.meta.heightOfHeader});
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    `

export const MainArea = styled.div`
        padding 1rem 2rem;
        width: 500px;
        max-width: 100%;
    `

export const PaginationFixer = styled.div`
        z-index:1;
        margin-bottom: 1rem;
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: white;
        opacity: 0.4;
    `

export const Cover = styled(LoadingWrapper)`
        background: white;
        opacity: 0.5;
    `
