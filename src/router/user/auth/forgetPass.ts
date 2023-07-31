import expess from 'express'

//controller
import {fpController} from '../../../controller/user/forgetPasswordController'

//Middleware
import { sessionCheck } from '../../../middleware/session';
import {otpMailGenerator} from '../../../middleware/otpMiddleware'

const routes=expess();

routes.patch('/forget_password',otpMailGenerator,fpController)


export default routes