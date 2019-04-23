import {ImageRequest} from '../request'
import {
    MUTATION_APPOINT_EDITING_ARTICLE, MUTATION_TRIGGER_IS_LOADING,
    MUTATION_TRIGGER_SHOW_NOTICE
} from "../../mutation_types";

import {ACTION_APPOINT_EDITING_ARTICLE, ACTION_DELETE_COMMENT, ACTION_UPLOAD_IMAGE} from "../../action_types";


export default {

   async [ACTION_UPLOAD_IMAGE](context,payload) {

       try{

           const payload_ = {
               loading: true,
               id: payload.id
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload_)

           const res = await ImageRequest.UploadImage(payload.img)

           const payload__ = {
               key: 'titleImageUrl',
               value: res.data.imgUrl
           }

           context.dispatch(ACTION_APPOINT_EDITING_ARTICLE,payload__)

           const payload___ = {
               loading: false,
               id: payload.id
           }
           context.commit(MUTATION_TRIGGER_IS_LOADING,payload___)

       }catch (err) {

           console.log(err)

           const payload___ = {
               show: true,
               noticeContent: 'ACTION_UPLOAD_IMAGE ERR: ' + (err.response ? err.response.data : err)
           }

           context(MUTATION_TRIGGER_SHOW_NOTICE,payload___)
       }

   },

    async [ACTION_DELETE_COMMENT](context,payload) {

       try{



       }catch (err) {

       }

    }

}

