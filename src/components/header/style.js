import styled from 'vue-styled-components'
import store from '@/store'

export const HeaderWrapper = styled.div`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        z-index: 1;
        background: white;
        padding: 0 2rem; 
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: ${store.state.meta.heightOfHeader};
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
        @media(max-width: ${store.state.meta.maxMobileWidth}px){
            padding: 0 1rem;
        }
    `

export const NavList = styled.div`
        display: flex;
    `

export const Item = styled('div',{disabled:Boolean})`
        display: flex;
        align-items: center;
        margin-left: 1rem;
        color: ${props => props.disabled ? '#F7F7F7' :store.state.meta.metaGray};
        ${props => props.disabled ? '' : `
            cursor: pointer;
            &:hover{
                color: black;
            }
        `}
        
    `

export const Inner = styled.div`
        display: flex;
    `

export const GapLineVertical = styled.div`
        width: 2px;
        padding: 1rem 0;
        margin: 1rem;
        margin-right: 0;
        border-left: solid 1px #EEEEEE;
    `

export const Title = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin-left: 1rem;
        color: ${store.state.meta.metaGray};
    `

export const ArticleEditInfo = styled(Title)`
        font-size: 1rem;
        font-weight: normal;
    `

export const SavingArticle = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `