import expess from 'express'

//controller

import {loginController} from '../../controller/loginController'

//Middleware
import {loginValidation}  from '../../middleware/joiValidation';
const routes=expess();

routes.post('/signin',loginValidation,loginController)


export default routes