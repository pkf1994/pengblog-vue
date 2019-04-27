import styled from 'vue-styled-components'
import store from '@/store'

export const ArticleSummaryWrapper = styled.div`
        padding: 0.5rem 2rem;
        background: white;
        border-bottom: 1px solid ${store.state.meta.metaBorderColor};
        &:hover{
            background: #F7F7F7;
        }
         @media(max-width: ${store.state.meta.maxMobileWidth}px){
            padding: 1rem;
        }
    `

export const Title = styled('div',{hasBeenDeleted: Boolean})`
        font-size: 1.2rem;
        line-height: 1.4; 
        font-weight: bold;
        cursor: pointer;
        text-decoration: ${props => props.hasBeenDeleted ? 'line-through' : 'none'};
    `

export const Label = styled('span',{color: String})`
        color: ${props => props.color};
    `

export const ContentAndImage = styled.div`
        position: relative;
        padding: 0.4rem 0;
        cursor: pointer;
    `

const ContentProps = {
    withPreviewImage: String
}

export const Content = styled('div',ContentProps)`
        font-size: ${store.state.meta.widthOfWindow < store.state.meta.maxMobileWidth ? '1rem' : '0.8rem'};
        width: ${props => props.withPreviewImage ? '68%' : '100%'};
        line-height:1.5;
        cursor: pointer;
        
        display: -webkit-box;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${store.state.meta.innerWidth > store.state.meta.bigScreenWidth ? '4' : '3'};
        overflow: hidden;
        
        
    `

export const PreviewImage = styled.img`
        position: absolute;
        right: 0;
        top: 5%;
        height: 90%;
        width: 30%;
        object-fit: cover;
        border-radius: 0.4rem;
    `

export const Info = styled.div`
        color: ${store.state.meta.metaGray};
        display: flex;
        flex-wrap: wrap;
        line-height: 1.7    ;
        align-items: center;
        @media(min-width:${store.state.meta.maxMobileWidth}px){
            font-size: 0.8rem;
        }
    `

export const InfoItem = styled.span`
        
    `