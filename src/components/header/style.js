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
        height: 4.5rem;
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
    `

export const NavList = styled.div``

export const Item = styled.div`
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        margin-left: 1rem;
        cursor: pointer;
        color: ${store.state.meta.metaGray};
        &:hover{
            color: black;
        }
    `
