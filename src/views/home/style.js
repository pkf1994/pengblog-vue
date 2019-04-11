import styled from 'vue-styled-components'


export const HomeWrapper = styled.div``

export const ArticleList = styled.div`
        position: fixed;
        top: ${window.heightOfHeader};
        bottom: 0;
        left: 0;
        width: 300px;
        border-right: solid 1px ${window.metaBorderColor};
        overflow-y: ${window.browserEdit === 'Edge' ? 'auto' : 'overlay'};
        ${window.browserEdit !== 'Safari' ? `
        &::-webkit-scrollbar{
            width:2px;
            height:1px;
        }
        &::-webkit-scrollbar-thumb{
            background: #DDDDDD;
        }
        &::-webkit-scrollbar-track{
        
        }` : ''}
        
        @media(min-width:${window.milePost}px){
            width: 350px;
        }
        
         @media(min-width:${window.bigScreenWidth}px){
            width: 450px;
        }
    `

export const LoadingArticleSummary = styled.div`
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;
    `

export const ArticleDetail = styled.div`
        display: flex;
        justify-content: center;
        margin-left: 300px;
        
        @media(min-width:${window.milePost}px){
            margin-left: 350px;
        }
        
         @media(min-width:${window.bigScreenWidth}px){
            margin-left: 450px;
        }
    `

export const ArticleDetailFixer = styled.div`
        width: 700px;
        max-width: 100%;
        
        @media(min-width:${window.milePost}px){
            width: 750px;
        }
        
         @media(min-width:${window.bigScreenWidth}px){
            width: 850px;
        }
    `

const loadingWrapperProps = {
    opaque: Boolean
}
export const LoadingWrapper = styled('div',loadingWrapperProps)`
        position: fixed;
        top: ${window.heightOfHeader};
        left: 300px;
        bottom: 0;
        right: 0;
        background: white;
        opacity: ${props => props.opaque ? '1' : '0.5'};
         @media(min-width:${window.milePost}px){
            left: 350px;
        }
        
         @media(min-width:${window.bigScreenWidth}px){
            left: 450px;
        }
    `

export const ForMoreWrapper = styled.div`
        height: 100px;
        background: #F0F0F0;
    `