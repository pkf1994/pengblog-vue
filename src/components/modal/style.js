import styled from 'vue-styled-components'
import store from '@/store'


export const ModalWrapper = styled.div`
        z-index: 2;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    `

export const BackgroundCover = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.1);
        transition: all 0.4s ease;
        pointer-events: auto;
    `

export const ModalBody = styled.div`
        width: 350px;
        max-width: 90%;
        position: relative;
        background: white;
        margin-bottom: 3rem;
        box-shadow: 0 5px 25px rgba(0,0,0,.1);
        border-radius: 0.4rem;
        border: 1px solid rgba(0,0,0,.1);
        pointer-events: auto;
    `


const closeButtonProps = {
    loading: Boolean
}

export const CloseButton = styled('div',closeButtonProps)`
        position: absolute;
        transform: scale(1.5);
        top: 1rem;
        right: 1rem;
        cursor: pointer;
        color: #EEEEEE;
        pointer-events: ${props => props.loading ? 'none' : 'default'};
        &:hover{
            color: grey;
        }
    `

export const ModalItemWrapper = styled.div`
        position: relative;
        background: white;
        box-shadow: 0 5px 25px rgba(0,0,0,.1);
        border-radius: 0.4rem;
        border: none;
        pointer-events: auto;
    `

export const ModalTitle = styled.div`
        font-size: 1.2rem;
        font-weight: bold;
        padding: 1rem 2rem;
        border-bottom: solid 1px #F0F0F0;
    `

export const ModalContent = styled.div`
         padding: 1rem 2rem;
         font-size: 1rem;
         line-height: 1.5;
    `

export const OperationColumn = styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 0.5rem;
        padding-right: 1rem;
        border-top: solid 1px #F0F0F0;
    `

export const ConfirmButton = styled('div',{browser: String})`
        height: 2rem;
        padding: 0 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-left: 1rem;
        border: solid 1px ${store.state.meta.metaBorderColor};
        border-radius: 0.4rem;
        color: #00AA00;
        transition: all 0.4s ease;
        ${props => props.browser === 'Safari' ? '' : `
            &:hover{
                background: #F7F7F7;
            }
        `}
    `

export const CancelButton = styled(ConfirmButton)`
        color: #AA0000;
        transition: all 0.4s ease;
    `

export const LoadingWrapper = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        opacity: 0.5;
    `


export const WechatQrcodeWrapper = styled.div`
        display: flex;
        justify-content: center;
    `

export const WechatQrcode = styled.img`
        width: 180px;
        height: 180px;
        margin-bottom: 1rem;
    `

export const Email = styled.div`
        padding: 1rem 2rem;
        padding-top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `
