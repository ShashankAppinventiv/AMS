import expess from 'express'

//controller

import {getProfileController} from '../../../controller/user/getProfileController'

//Middleware
import {sessionCheck}  from '../../../middleware/session';
const routes=expess();

routes.get('/profile',sessionCheck,getProfileController)


export default routes