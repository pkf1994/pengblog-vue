import styled from 'vue-styled-components'
import store from '@/store'



export const LoginerWrapper = styled.div`
        box-sizing: border-box;
        width: 400px;
        min-height: 350px;
        margin-bottom: 4rem;
        padding: 4rem 3rem;
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        @media(max-height:600px){
            margin-bottom: 0;
            padding: 1rem 3rem;
            padding-top: 1.5rem;
        }
    `

export const InputWrapper = styled.div`
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
    `

export const GetSmsButtonWrapper = styled.div`
        padding-left: 1rem;
        width: 6rem;
        display: flex;
        justify-content: center;
        align-items: stretch;
    `

export const CaptchaWrapper = styled.div`
        margin-bottom: 2rem;
        display: flex;
    `



export const ButtonWrapper = styled.div`
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `

export const ButtonFixer = styled.div`
        display:flex;
        width: 6rem;
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            width: 100%;
        }
    `

export const Item = styled.li`
        cursor: pointer;
        padding: 1rem 1rem;
        color: grey;
        
        ${props => props.active ? `
            border: solid 1px #dee2e6;
            border-radius: 0.4rem;
            font-weight: bold;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: solid 1px white;
        ` : `
            border: solid 1px white;
            border-bottom: solid 1px #dee2e6;
        `}
        
    `

export const LoadingWrapper = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: white;
        opacity: 0.2;
    `


//logout
export const LogouterWrapper = styled.div`
        box-sizing: border-box;
        width: 400px;
        min-height: 350px;
        margin-bottom: 4rem;
        padding: 4rem 3rem;
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        @media(max-height:600px){
            margin-bottom: 0;
            padding: 1rem 3rem;
        }
    
    `

export const Title = styled.div`
         font-size: 1.2rem;
        font-weight: bold;
        padding-bottom: 0.8rem;
        border-bottom: solid 1px #f0f0f0;
    `

export const Info = styled.div`
        display: flex;
        justify-content: space-between;
        color: grey;
        padding-bottom: 0.5rem;
    `

export const CurrentAutoInfo = styled.div`
        padding: 1rem 0;
    `