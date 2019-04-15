import styled from 'vue-styled-components'
import store from '@/store'

export const HeaderWrapper = styled.div`
        position: sticky;
        top: 0;
        z-index: 2;
        background: white;
        padding: 0 2rem; 
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 4.5rem;
        border-bottom: solid 1px ${store.state.meta.metaBorderColor};
    `

