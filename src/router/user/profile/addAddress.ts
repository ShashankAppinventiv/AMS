import expess from 'express'

//controller

import {addAddressController} from '../../../controller/user/addressController'
import {addressValidation} from '../../../middleware/joiValidation'
//Middleware
import {sessionCheck}  from '../../../middleware/session';
const routes=expess();

routes.put('/add_address',sessionCheck,addressValidation,addAddressController)


export default routes