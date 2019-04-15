import styled from 'vue-styled-components'
import store from '@/store'

export const CommentsWrapper = styled.div``

export const Title = styled.div`
        font-size: 1.3rem;
        font-weight: bold;
        padding: 1rem 0;
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
    `

export const CommentsIcon = styled.span`
        font-size: 1.6rem;
    `

export const ForMoreWrapper = styled.div`
        height: 100px;
    `