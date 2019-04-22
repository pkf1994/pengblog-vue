import {ImageRequest} from '../request'
import {
    MUTATION_APPOINT_EDITING_ARTICLE,
    MUTATION_TRIGGER_SHOW_NOTICE
} from "../../mutation_types";

import {ACTION_UPLOAD_IMAGE} from "../../action_types";


export default {

   async [ACTION_UPLOAD_IMAGE](context,payload) {

       try{

           const res = await ImageRequest.UploadImage(payload)

           const payload_ = {
               key: 'titleImageUrl',
               value: res.data.imgUrl
           }

           context.commit(MUTATION_APPOINT_EDITING_ARTICLE,payload_)

       }catch (err) {

           console.log(err)

           const payload__ = {
               show: true,
               noticeContent: 'ACTION_UPLOAD_IMAGE ERR: ' + (err.response ? err.response.data : err)
           }

           context(MUTATION_TRIGGER_SHOW_NOTICE,payload__)
       }

   }

}

