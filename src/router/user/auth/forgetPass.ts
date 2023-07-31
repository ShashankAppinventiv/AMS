import expess from 'express'

//controller
import {fpController,otpMailGenerator} from '../../../controller/user/forgetPasswordController'

const routes=expess();

//middleware

import {DeleteUserValidation} from '../../../middleware/joiValidation'

routes.patch('/forget_password',DeleteUserValidation,otpMailGenerator)
routes.patch('/forget_password/verify',DeleteUserValidation,fpController)


export default routes