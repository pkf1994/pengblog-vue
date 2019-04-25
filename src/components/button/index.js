import styled from 'vue-styled-components'

const buttonProps = {
    width: String,
    fontSize: String,
    margin: String,
    disabled: Boolean,
    backgroundColor: String,
    color: String,
    borderColor: String
}

export const Button = styled('button',buttonProps)`
        flex-grow: 1;
        font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
        display: inline-block;
        margin: ${props => props.margin ? props.margin : "0"};
        border: 1px solid ${props => props.disabled ? '#CCCCCC' : (props.borderColor ? props.borderColor : "gray")};
        outline: none;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        padding: 0.4rem 0.6rem;
        background-color: ${props => props.backgroundColor ? props.backgroundColor : "white"};
        filter:brightness(1);
        color: ${props => props.disabled ? '#CCCCCC' : (props.color ? props.color : "black")};
        border-radius: .25rem;
        position: relative;
        transition: all 0.2s ease;
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
        ${props => props.disabled ? '' : `
             &:hover {
             filter:brightness(0.9);
            }
        `};
       
    `