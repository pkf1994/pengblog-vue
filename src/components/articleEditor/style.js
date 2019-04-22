import styled from 'vue-styled-components'
import store from '@/store'

export const ArticleEditorWrapper = styled.div`

    `

export const ToolBarWrapper = styled.div`
        background: white;
        z-index: 1;
        padding: 0.5rem 0;
        margin-bottom: 1rem;
        border-top: 1px solid #EBEBEB;    
        border-bottom: 1px solid #EBEBEB;
        ${store.state.meta.widthOfWindow < store.state.meta.maxMobileWidth ? `
            position: fixed;
            bottom: 0;
            width: 100%;
            margin-bottom: 0;
        ` :
    `position: sticky;
             top: ${store.state.meta.heightOfHeader};`}
    `

export const ToolBar = styled.div`
        font-size: ${store.state.meta.widthOfWindow < store.state.meta.maxMobileWidth ? '1.4rem' : '1rem'};
        display: flex;
        justify-content: ${store.state.meta.widthOfWindow < store.state.meta.maxMobileWidth ? 'flex-end' : 'center'};
    `

export const TextArea = styled.div`
        min-height: 300px;
    `