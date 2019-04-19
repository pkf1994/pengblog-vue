import styled from 'vue-styled-components'
import store from '@/store'

export const ManagePageWrapper = styled.div``

export const CentralController = styled.div`
        position: fixed;
        z-index: 2;
        top: ${store.state.meta.heightOfHeader};
        bottom: 0;
        left: 0;
        width: 300px;
        border-right: solid 1px #EEEEEE;
        
        display: flex;
        flex-direction: column;
        
        @media(max-width:${store.state.meta.maxMobileWidth}px){
            display:none
        }
    `