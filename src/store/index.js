import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {articleStore,
        apiStore,
        homeStore,
        modalStore,
        noticeStore,
        topCommentEditorStore,
        subCommentEditorStore,
        captchaStore,
        metaStore,
        prograssBarStore,
        subCommentStore,
        manageStore,
        paginationStore,
        searchBarStore,
        articleEditStore,
    loginStore,
    ipManageStore} from './modules'

export default new Vuex.Store ({
    modules: {
        article: articleStore,
        api: apiStore,
        home: homeStore,
        modal: modalStore,
        notice: noticeStore,
        topCommentEditor: topCommentEditorStore,
        subCommentEditor: subCommentEditorStore,
        captcha: captchaStore,
        meta: metaStore,
        prograssBar: prograssBarStore,
        subComment: subCommentStore,
        manage: manageStore,
        pagination: paginationStore,
        searchBar: searchBarStore,
        articleEdit: articleEditStore,
        login: loginStore,
        ipManage: ipManageStore
    }
})

