import {
    MUTATION_APPOINT_EDITING_ARTICLE, MUTATION_RESET, MUTATION_RESOLVE_DRAFT, MUTATION_TRIGGER_IS_LOADING
} from "../mutation_types";

export default {
    [MUTATION_APPOINT_EDITING_ARTICLE](state,payload) {

        if(payload.key === 'titleImageUrl'){
            state.titleImageEditor.titleImageUrl = payload.value
            return
        }

        state.draftCache[payload.key] = state[payload.key]

        state[payload.key] = payload.value

        if(checkItemLength(state.title, 0, 50)
            && checkItemLength(state.author, 1, 15)
            && checkItemLength(state.label, 1, 10)
            && checkItemLength(state.content, 20, 20000)){
            state.submitableAsArticle = true
            return
        }
        state.submitableAsArticle = false
    },

    [MUTATION_TRIGGER_IS_LOADING](state,payload) {
        if(payload.id === 'titleImageEditor') {
            state.titleImageEditor.loading = payload.loading
        }
        if(payload.id === 'articleEdit_savingDraft') {
            state.savingDraft = payload.loading
        }
        if(payload.id === 'articleEdit_savingArticle') {
            state.savingArticle = payload.loading
        }
    },

    [MUTATION_RESOLVE_DRAFT](state,payload) {
        state.id = payload.article_id
        state.title = payload.article_title
        state.label = payload.article_label
        state.author = payload.article_author
        state.content = payload.article_content
        state.titleImageEditor.titleImageUrl = payload.article_titleImageUrl
        state.titleCache = payload.article_title
        state.editor.cmd.do('insertHTML',  payload.article_content)
        state.resolveDraftFlag = true
        state.draftCache = {...payload}
    },

    [MUTATION_RESET](state,payload) {

        if(payload.id === 'articleEditPage') {
            state.id = undefined
            state.title = undefined
            state.label = undefined
            state.author = undefined
            state.content = undefined
            state.titleImageEditor.titleImageUrl = undefined
        }

    }
}

const checkItemLength = (item, leftPoint, rightPoint) => {
    if(!item){
        return false
    }
    return item.length > leftPoint && item.length <= rightPoint
}

