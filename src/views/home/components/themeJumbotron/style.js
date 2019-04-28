import styled from 'vue-styled-components'
import store from '@/store'

export const ThemeJumbotronWrapper = styled.div`
        position: relative;
    `

export const ThemeJumbotron = styled('div',{minHeightOfJumbotron:String,background:String,themeImage_Ready:Boolean})`
        box-sizing: border-box;
        min-height: ${props => props.minHeightOfJumbotron};
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
        background:url(${props => props.background}) no-repeat center;
        background-size: cover;
        transition: all 1s ease;
        opacity: ${props => props.themeImage_Ready ? '1' : '0'};
    `

export const Inner = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    `

export const ThemeImageWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 350px;
        max-width: 80%;
    `

export const ThemeImage = styled.img`
        box-sizing: border-box;
        width: 80%;
        object-fit: contain;
        margin-bottom: 1rem;
        padding: 0 1rem;
        @media(max-width:800px){
           width: 100%;
        }
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
        @media(max-width:800px){
            display: none;
        }
    `

export const VueLogo = styled.img`
        width: 65%;
    `

export const Title = styled.div`
        text-align: center;
        margin-top: 1rem;
        font-size: 1.6rem;
    `