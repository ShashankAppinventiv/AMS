import expess from 'express'

//controller

import {addPicController} from '../../../controller/user/addProfilePic'
import { upload } from '../../../middleware/multerFileUploading'
//Middleware
import {sessionCheck}  from '../../../middleware/session';
const routes=expess();

routes.patch('/profile_pic',sessionCheck,upload,addPicController)


export default routes