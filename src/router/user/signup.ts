import expess from 'express'

//controller

import {signUpController} from '../../controller/signUpController'

//Middleware
import {newUserValidate} from '../../middleware/joiValidation'
const routes=expess();

routes.post('/signup',newUserValidate,signUpController)


export default routes