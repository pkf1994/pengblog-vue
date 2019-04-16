import styled from 'vue-styled-components'
import store from '@/store'

export const ThemeJumbotron = styled.div`
        box-sizing: border-box;
        min-height: calc(${window.innerHeight}px - ${store.state.meta.heightOfHeader});
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
    `

export const Inner = styled.div`
        max-width: 100%;
        width: 650px;
        display: flex;
        margin-bottom: 5%;
        justify-content: center;
        align-items: center;
    `

export const ThemeImageWrapper = styled.div`
        width: 70%;
        padding-right: 2rem;
        margin-right: 2rem;
        border-right: solid 1px grey; 
    `

export const ThemeImage = styled.img`
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 1rem;
        padding: 0 1rem;
    `

export const Gap = styled.div`
        width: 0;
        border-right: solid 1px ${store.state.meta.metaBorderColor};
        align-self: stretch;
    `

export const PoweredBy = styled.div`
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
    `

export const VueLogo = styled.img`
        width: 65%;
    `

export const Title = styled.div`
        text-align: center;
        margin-top: 1rem;
        font-size: 1.6rem;
    `