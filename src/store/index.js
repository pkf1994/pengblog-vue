import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import {articleStore,apiStore,homeStore,modalStore,noticeStore} from './modules'


export default new Vuex.Store ({
    modules: {
        article: articleStore,
        api: apiStore,
        home: homeStore,
        modal: modalStore,
        notice: noticeStore
    }
})

