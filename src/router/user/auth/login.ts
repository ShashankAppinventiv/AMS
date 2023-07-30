import expess from 'express'

//controller

import {loginController} from '../../../controller/user/loginController'

//Middleware
import {loginValidation}  from '../../../middleware/joiValidation';
const routes=expess();

routes.post('/signin',loginValidation,loginController)
routes.post('/signin/:a',loginValidation,(req,res)=>{
})


export default routes