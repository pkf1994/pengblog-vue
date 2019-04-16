import styled from 'vue-styled-components'

export const FooterWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        background: #eeeeee;
    `

export const Row1 = styled.div`
        font-size: 0.8rem;
        color: grey;
        margin: 0.2rem 0;
    `

export const Row2 = styled.div`
        font-size: 0.8rem;
        color: grey;
        margin: 0.2rem 0;
        border-top: solid 1px grey; 
        padding-top: 0.2rem;
    `

export const ContactMe = styled.span`
        cursor: pointer;
        &:hover{
            color: black;
        }
    `