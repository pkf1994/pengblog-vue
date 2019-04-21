import styled from 'vue-styled-components'
import store from '@/store'

export const ManagePageWrapper = styled.div``

export const CentralController = styled.div`
        position: fixed;
        z-index: 2;
        top: ${store.state.meta.heightOfHeader};
        bottom: 0;
        left: 0;
        width: 300px;
        border-right: solid 1px #EEEEEE;
        
        display: flex;
        flex-direction: column;
        
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            display:none
        }
    `

export const ArticleListWrapper = styled.div`
        display: flex;
        justify-content: center;
        padding-left: 1rem;
        padding-right: 1rem;
        box-sizing: border-box;
        margin-left: 300px;
        width: calc(100% - 300px);
    
    `

export const ArticleListFixer = styled.div`
        position: relative;
        min-height: calc(${store.state.meta.heightOfWindow}px - ${store.state.meta.heightOfHeader});
        width: 1000px;
        max-width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
         @media(max-width:${store.state.meta.maxMobileWidth}px){
            width: 100%;
        }
    `

export const PaginationFixer = styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        top: ${store.state.meta.heightOfHeader};
        left: 300px;
        right: 0;
        bottom: 0;
        background: white;
        opacity: 0.7;
    `

export const SearchBarWrapper = styled.div`
        padding: 1rem 2rem;
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
    `