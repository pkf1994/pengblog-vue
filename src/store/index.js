import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import {articleStore,apiStore,homeStore} from './modules'


export default new Vuex.Store ({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
    modules: {
        article: articleStore,
        api: apiStore,
        home: homeStore
    }
})

