import styled from 'vue-styled-components'
import store from '@/store'

export const EmojiPickerWrapper = styled.div`
       
    `

export const Cover = styled.div`
        z-index: 2;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    `

export const Inner = styled.div`
         position: relative;
    `

export const PickerButton = styled.div`
        cursor: pointer;
        &:hover{
            filter: brightness(80%);
        }
    `

export const Pane = styled.div`
        z-index: 999;
        position: absolute;
        top: -4rem;
        left: -280px;
        
        border: solid 1px ${store.state.meta.metaBorderColor};
        border-radius: .4rem;
        background: white;
    `

export const Catalog = styled.div`
        display: flex;
        justify-content: center;
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
    `

export const CatalogItem = styled.div`
        padding: 0.8rem;
        cursor: pointer;
        fill: #CCCCCC;
        &:hover{
            fill: black;
        }
    `

export const EmojiList = styled.div`
        overflow: auto;
    `

export const People = styled.div`
        height: 150px;
        width: 235px;
        display: flex;
        flex-wrap: wrap;
        padding: 0.5rem;
    `

export const Nature = styled(People)``

export const Objects = styled(People)``

export const Places = styled(People)``

export const Symbols = styled(People)``

export const Item = styled.div`
        margin: 0.25rem;
        font-size: 1.4rem;
        cursor: pointer;
        &:hover{
            filter: brightness(80%);
        }
    `