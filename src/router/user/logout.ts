import expess from 'express'

//controller

import {logoutController} from '../../controller/logoutController'

//Middleware
import {loginValidation}  from '../../middleware/joiValidation';
const routes=expess();

routes.patch('/logout',logoutController)


export default routes