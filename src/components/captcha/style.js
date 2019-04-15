import styled from 'vue-styled-components'

export const CaptchaWrapper = styled.div`
        padding: 1rem 2rem;
        display: flex;
        align-items: stretch;
    `

export const CaptchaImage = styled('div',{loading: Boolean,captchaImage:String})`
        position: relative;
        margin-left: 1rem;
        width: 7rem;
        cursor: pointer;
        filter: brightness(${props => props.loading ? '90%' : '100%'});
        background: url(data:image/jpeg;base64,${props => props.captchaImage}) no-repeat;
        background-size: 100% 100%;
    `

export const LoadingWrapper = styled.div`
        position: absolute;
        transform: scale(1.4);
        width: 1.5rem;
        height: 1.5rem;
        left: calc(50% - 0.75rem);
        top: calc(50% - 0.75rem);
        display: flex;
        justify-content: center;
        align-items: center;
    `