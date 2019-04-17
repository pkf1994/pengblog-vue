import styled from 'vue-styled-components'
import store from '@/store'

const backgroundColor = '#F7F7F7'

export const InputWrapper = styled.div`
        position: relative;
        display: flex;
    `

export const Inputer = styled('input',{fontColor: String,backgroundColor:String,fontSize:String,padding:String,showWarn:Boolean,disableFocusStyle:Boolean})`
        flex-grow: 1;
        color:${props => props.fontColor ? props.fontColor : 'black'};
        position: relative;
        background: ${props => props.backgroundColor ? props.backgroundColor : '#F7F7F7'};
        font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
        outline: none;
        padding: ${props => props.padding ? props.padding : (window.innerWidth < store.state.meta.maxMobileWidth ? '0.8rem' : '0.5rem')};
        padding-left: 2rem;
        border: solid 1px ${props => props.showWarn ? 'red' : backgroundColor};
        border-radius: 0.4rem;
        transition: all 0.2s ease;
        ${props => props.disableFocusStyle ? '' : `
         &:focus{
            box-shadow: 1px 1px 2px #999999 inset;
            border: solid 1px #E6E6E6;
         }
        `}
    
`

export const IconFixer = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        padding-left: 0.8em;
        pointer-events: none;
    `

export const Icon = styled('div',{iconColor:String})`
       color:${props => props.iconColor ? props.iconColor : '#BBBBBB'};
    `

export const WarnPopover = styled.div`
        position: absolute;
        bottom: calc(100% + 0.5rem);
        color: #BB0000;
        font-size: 0.8rem;
        padding: 0.6rem 1rem;
        background: ${backgroundColor};
        border: 1px solid rgba(0,0,0,.2);
        border-radius: .3rem;
        @media(min-width: ${store.state.meta.maxMobileWidth}px){
            left: 0;
        }
        @media(max-width: ${store.state.meta.maxMobileWidth}px){
            right: 0;
        }
    `

export const PopoverArrow = styled.div`
        position: absolute;
        overflow: hidden;
        left: 0.4rem;
        top: 100%;
        width: 2rem;
        height: 1rem;
        &:after{
            content: '';
            position: absolute;
            top: -60%;
            left: 0.6rem;
            box-sizing: border-box;
            width: 24px;
            height: 24px;
            margin: -12px;
            border: 1px solid rgba(0,0,0,.2);
            background: ${backgroundColor};
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            pointer-events: auto;
        }
    `

export const TheLine = styled.div`
        position: relative;    
        width: 100%;
        height: 1px;
        border-bottom: solid 1px #F0F0F0;
    `

export const Color = styled('div',{isFocus: Boolean,lineColor: String})`
        position: absolute;
        width: ${props => props.isFocus ? '100%' : '0'};
        height: 1px;
        border-bottom: solid 1px ${props => props.lineColor ? props.lineColor : store.state.meta.metaColor};
        transition: all 0.5s ease;
    `