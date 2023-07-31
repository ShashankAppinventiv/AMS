import expess from 'express'

//controller

import {list} from '../../controller/viewAllProduct'
import { viewProductDetails } from '../../controller/buyProduct';

//Middleware
import {sessionCheck}  from '../../middleware/session';

const routes=expess();

routes.get('/buy',sessionCheck,list)
routes.get('/buy/:productId',sessionCheck,viewProductDetails)


export default routes