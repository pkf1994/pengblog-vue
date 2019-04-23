import {
    MUTATION_APPOINT_EDITING_ARTICLE, MUTATION_RESOLVE_DRAFT, MUTATION_TRIGGER_IS_LOADING
} from "../mutation_types";

export default {
    [MUTATION_APPOINT_EDITING_ARTICLE](state,payload) {

        if(payload.key === 'titleImageUrl'){
            state.titleImageEditor.titleImageUrl = payload.value
            return
        }

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
        if(payload.id === 'articleEdit_saveDraft') {
            state.savingDraft = payload.loading
        }
        if(payload.id === 'articleEdit_saveArticle') {
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
        state.resolveDraftFlag = true
        state.draftCache = {
            id:payload.article_id,
            title:payload.article_title,
            label:payload.article_label,
            author:payload.article_author,
            content:payload.article_content,
        }
        state.editor.cmd.do('insertHTML',  payload.article_content)
    }
}

const checkItemLength = (item, leftPoint, rightPoint) => {
    if(!item){
        return false
    }
    return item.length > leftPoint && item.length <= rightPoint
}

