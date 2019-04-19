import styled from 'vue-styled-components'
import store from '@/store'

export const ThemeJumbotron = styled('div',{minHeightOfJumbotron:String})`
        box-sizing: border-box;
        min-height: ${props => props.minHeightOfJumbotron};
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
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70%;
        padding-right: 2rem;
        margin-right: 2rem;
        border-right: solid 1px ${store.state.meta.metaBorderColor}; 
        @media(max-width:800px){
            padding-right: 0;
            margin-right: 0;
            border-right: none; 
        }
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