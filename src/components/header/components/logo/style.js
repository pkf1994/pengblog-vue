import styled from 'vue-styled-components'
import store from '@/store'

export const LogoWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `

export const CharactersUpper = styled.div`
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-family: SimSun, Arial;
    `

export const BigOne = styled.span`
        font-size: 1.8rem;
        font-weight: bold;
        color: ${store.state.meta.metaColor};
    `

export const SmallOther = styled.span`
         font-size: 1.35rem;
    `

export const CharLower = styled.div`
        font-size: 0.9rem;
        font-family: 'Source Sans Pro', SimSun, Arial;
        border-top: solid 1px ${store.state.meta.metaColor};
    `
