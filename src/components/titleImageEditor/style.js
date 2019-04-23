import styled from 'vue-styled-components'
import store from '@/store'

export const TitleImageEditorWrapper = styled('div',{heightOfTitleImageEdit: String})`
        background-color: #F7F7F7;
        position: relative;
        height: ${props => props.heightOfTitleImageEdit};
        transition: all 0.4s ease;
        overflow: hidden;
        ::before{
            pointer-events: none;
            color: rgb(179, 179, 179);
            width: 100%;
            content:'添加题图';
            text-align: center;
            position: absolute;
            left: 0;
            bottom: 30%;
            opacity: 0;
            transform: translateY(-12px);
            transition: all 0.2s ease 0s;
        }
         &:hover::before{
            opacity: 1;
            transform: translateY(0);
        }
    `

export const TitleImageFrame = styled.img`
        pointer-events: none;
        position: absolute;
        width: 100%;
        max-height: 800px;
        left: 0;
        top: 0;
        object-fit: cover;
    `

export const ButtonIcon = styled.div`
       
    `

export const FileInput = styled.input`
        display: none;
    `

export const Label = styled.label`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: ${store.state.meta.metaGray};
    `

export const DeleteBtn = styled.div`
        position: absolute;
        bottom: 0;
        right: 0;
        width: 4rem;
        height: 3rem;
       
        background: rgba(0,0,0,0.3);
        color: white;
        display:flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `

export const loadingWrapper = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: white;
        opacity: 0.5;
    `