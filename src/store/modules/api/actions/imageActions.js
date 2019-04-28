import {ImageRequest} from '../request'
import { MUTATION_TRIGGER_IS_LOADING,
} from "../../mutation_types";

import {
    ACTION_APPOINT_EDITING_ARTICLE,
    ACTION_UPLOAD_IMAGE
} from "../../action_types";
import {checkToken} from "./articleActions";
import {exceptionNoticer} from "./index";


export default {

   async [ACTION_UPLOAD_IMAGE](context,payload) {

       checkToken()

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

           exceptionNoticer(err,ACTION_UPLOAD_IMAGE,context)
       }

   }

}

