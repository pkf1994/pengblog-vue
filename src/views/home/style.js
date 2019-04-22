import styled from 'vue-styled-components'
import store from '@/store'

export const HomeWrapper = styled.div``

export const ArticleList = styled.div`
        position: fixed;
        top: ${store.state.meta.heightOfHeader};
        bottom: 0;
        left: 0;
        width: 300px;
        border-right: solid 1px ${store.state.meta.metaBorderColor};
        overflow-y: ${store.state.meta.browser === 'Edge' ? 'auto' : 'overlay'};
        ${store.state.meta.browser !== 'Safari' &&  store.state.meta.widthOfWindow > store.state.meta.maxMobileWidth && `
        &::-webkit-scrollbar{
            width:2px;
            height:1px;
        }
        &::-webkit-scrollbar-thumb{
            background: #DDDDDD;
        }
        &::-webkit-scrollbar-track{
        
        }` }
        
        @media(min-width:${store.state.meta.milePost}px){
            width: 350px;
        }
        
         @media(min-width:${store.state.meta.bigScreenWidth}px){
            width: 450px;
        }
        
        @media(max-width:${store.state.meta.maxMobileWidth}px) {
            width: 100%;
        }
    `

export const LoadingArticleSummary = styled.div`
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
    `

export const ArticleDetail = styled.div`
        display: flex;
        justify-content: center;
        margin-left: 300px;
        
        @media(min-width:${store.state.meta.milePost}px) {
            margin-left: 350px;
        }
        
         @media(min-width:${store.state.meta.bigScreenWidth}px) {
            margin-left: 450px;
        }
        
        @media(max-width:${store.state.meta.maxMobileWidth}px) {
            display: none
        }
    `

export const Theme = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 300px;
        
        @media(min-width:${store.state.meta.milePost}px){
            margin-left: 350px;
        }
        
         @media(min-width:${store.state.meta.bigScreenWidth}px){
            margin-left: 450px;
        }
        
         @media(max-width:${store.state.meta.maxMobileWidth}px) {
            display: none
        }
    `

export const ArticleDetailFixer = styled.div`
        width: 600px;
        max-width: 100%;
        
        @media(min-width:${store.state.meta.milePost}px){
            width: 650px;
        }
        
         @media(min-width:${store.state.meta.bigScreenWidth}px){
            width: 850px;
        }
    `

const loadingWrapperProps = {
    opaque: Boolean
}
export const LoadingWrapper = styled('div',loadingWrapperProps)`
        position: fixed;
        top: ${store.state.meta.heightOfHeader};
        left: 300px;
        bottom: 0;
        right: 0;
        background: white;
        opacity: ${props => props.opaque ? '1' : '0.5'};
         @media(min-width:${store.state.meta.milePost}px){
            left: 350px;
        }
        
         @media(min-width:${store.state.meta.bigScreenWidth}px){
            left: 450px;
        }
        
        @media(max-width:${store.state.meta.maxMobileWidth}px) {
            display: none
        }
    `

export const ForMoreWrapper = styled.div`
        height: 100px;
        background: #F0F0F0;
    `

export const SearchBarWrapper = styled('div',{showCentralController:Boolean})`
        z-index: 2;
        background: white;
        position: sticky;
        top: 0;
        padding: 1rem 2rem;
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
        @media(max-width:${store.state.meta.maxMobileWidth}px) {
            padding: 1rem;
        }
        ${store.state.meta.browser === 'Edge' ? 'z-index: 2;' : ''}
    `

export const SearchBarFixer = styled('div',{showCentralController:Boolean})`
        transition: all .4s ease;
        @media(max-width:${store.state.meta.maxMobileWidth}px) {
            width: ${props => props.showCentralController ? '100%' : 'calc(100% - 2rem)'};
        }
    `

export const MoreCondition = styled('div',{showCentralController:Boolean})`
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 2rem;
        justify-content: flex-start;
        align-items: center;
        transition: all .4s ease;
        opacity: ${props => props.showCentralController ? '0' : '1'};
        color: ${store.state.meta.metaGray};
        display: none;
        
         @media(max-width:${store.state.meta.maxMobileWidth}px) {
            display: flex;

        }
    `

export const CentralController = styled.div`
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
         box-sizing: border-box;
    `

export const CentralControllerFixer = styled('div',{showCentralController: Boolean,heightOfCentralController:String})`
        height: ${props => props.showCentralController ? props.heightOfCentralController : '0px'};
        transition: all .4s ease;
        overflow: ${props => props.showCentralController ? 'visible' : 'hidden'};
        opacity: ${props => props.showCentralController ? '1' : '0'};
    `

export const Retract = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        color: ${store.state.meta.metaGray};
    `