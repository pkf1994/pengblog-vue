import styled from 'vue-styled-components'
import store from '@/store'

export const MobileHeaderWrapper = styled.div`
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        box-sizing: border-box;
        background: white;
        padding: 0 1rem; 
        padding-right: 0;
        display: flex;
        height: ${store.state.meta.heightOfHeader};
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
      
    `

export const MainArea = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    `

export const Logo = styled.div`
        font-family: SimSun, Arial;
        font-size: 2rem;
        font-weight: bold;
        color: ${store.state.meta.metaColor};
    `

export const MenuButtonWrapper = styled('div',{showMenuList:Boolean})`
        padding-right: ${props => props.showMenuList ? '0':'1rem'};;
        color: ${props => props.showMenuList ? 'black':'grey'};
        transition: all 0.4s ease;
    `

export const Button = styled.span`
        
    `

export const MenuListWrapper = styled('div',{showMenuList:Boolean,heightOfMenuList:String})`
        position: absolute;
        top: calc(100% + 1px);
        left: 0;
        right: 0;
        height: ${props => props.showMenuList ? props.heightOfMenuList : '0px'};
        transition: all .4s ease;
        overflow: hidden;
    `

export const MenuList = styled.div`
        background: white;
        border-bottom: solid 2px gray;
    `

export const MenuItem = styled.div`
        color: grey;
        font-size: 1.2rem;
        height: 4rem;
        margin: 0 1rem;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #F0F0F0;
        &:hover{
            background: #F7F7F7;
        }
    `

export const Cover = styled.div`
        position: fixed;
        top: ${store.state.meta.heightOfHeader};
        bottom: 0;
        right: 0;
        left: 0;
        background: black;
        opacity: 0.2;
    `