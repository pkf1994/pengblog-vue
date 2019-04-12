import styled from 'vue-styled-components'

export const ForMoreWrapper = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `

export const NoMore = styled('div',{fontSize: String})`
        color:'#BB0025';
        font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
    `

export const ClickToGetMore = styled('div',{fontSize: String})`
        color: rgb(23, 81, 153);
        font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    `

export const LoadingIcon = styled.img``
