import styled from 'vue-styled-components'


export const CommentWrapper = styled('div',{isBeenDeleting:Boolean,isBanned:Boolean})`
        position: relative;
        display: flex;
        align-items: stretch;
        filter: brightness(${props => props.isBeenDeleting ? '95%' : '100%'});
        background: ${props => props.isBanned ? '#F7F7F7' : 'white'};
        transition: all 0.4s ease;
        margin: 0 2rem;
        @media(max-width: ${window.maxMobileWidth}px) {
            margin: 0 1rem;
        }
    `

export const VisitorInfo = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        width: 90px;
        @media(max-width: ${window.maxMobileWidth}px) {
            width: 65px;
        }
    `

export const AvatarWrapper = styled.div`
        margin-top: 0.8rem;
        width: 55px;
        height: 55px;
        border: solid 1px #F7F7F7;
        border-radius: 0.4rem;
        background: #EEEEEE;
    `

export const Avatar = styled('div',{metaColor: String})`
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        font-weight: bold;
        color: ${props => props.metaColor};
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: solid 0.2rem ${props => props.metaColor};
    `

export const Name = styled('div',{isBanned: Boolean})`
        width: 100%;
        
        font-size: 0.9rem;
        line-height: 1.2;
        text-align: center;
        word-wrap: break-word 
        text-decoration: ${props => props.isBanned ? 'line-through' : 'none'};
        color: ${props => props.isBanned ? 'grey' : 'black'};
        
        margin: 1rem 0;
        padding: 0 1rem;
    `

export const Gap = styled.div`
        width: 1px;
        margin: 1rem 0;
        border-right: solid 1px #F7F7F7;
    `

export const MultiContent = styled.div`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    `

export const ContentWrapper = styled('div',{showAll:String,heightOfCommentContent:Number})`
        max-height: ${props => props.showAll ? props.heightOfCommentContent + 'px' : '210px'};
        transition: all 0.4s ease;
        overflow: hidden;
    `

export const Content = styled('div',{isBanned:Boolean})`
        font-size: 0.9rem;
        line-height: 1.5;
        padding: 0.8rem 1rem;
        flex-grow: 1;    
        text-decoration: ${props => props.isBanned ? 'line-through' : 'none'};
        color: ${props => props.isBanned ? 'grey' : 'black'};
        @media(min-width: ${window.maxMobileWidth}px) {
            padding-right: 0;

        }    
    `

export const OperationRow = styled.div`
        color: #CCCCCC;
        padding: 0.8rem 1rem;
        font-size: 0.9rem;
        text-align: right;
    `