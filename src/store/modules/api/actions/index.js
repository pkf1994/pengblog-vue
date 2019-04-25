import articleActions from './articleActions'
import commentActions from './commentActions'
import captchaActions from './captchaActions'
import imageActions from './imageActions'
import loginActions from './loginActions'
import smsActions from './smsActions'

export default Object.assign(smsActions,articleActions,commentActions,captchaActions,imageActions,loginActions)