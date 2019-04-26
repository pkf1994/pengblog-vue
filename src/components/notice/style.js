import styled from 'vue-styled-components'

export const NoticeWrapper = styled.div`
        z-index:4;
        position:fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        display: flex;
        justify-content: center;
    `

export const NoticePositioner = styled.div`
        box-sizing: border-box;
        width: auto;
        max-width: 80%;
        margin: 5rem auto;
        padding: 0 2rem;
    `

export const NoticeBody = styled.div`
        word-wrap:break-word;
        max-width: 100%;
        line-height: 1.5;
        text-align: center;
        padding: 1rem 4rem;
        background: white;
        border-radius: 0.2rem;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    `