import expess from 'express'

//controller

import {updateProfileController} from '../../../controller/user/updateProfile'
import {updateValidation} from '../../../middleware/joiValidation'
//Middleware
import {sessionCheck}  from '../../../middleware/session';
const routes=expess();

routes.patch('/update',updateValidation,sessionCheck,updateProfileController)

export default routes