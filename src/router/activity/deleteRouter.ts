import expess from 'express'

//controller

import {list,deleteProduct} from '../../controller/deleteProduct'

//Middleware
import {sessionCheck}  from '../../middleware/session';

const routes=expess();

routes.delete('/delete',sessionCheck,list)
routes.delete('/delete/:productId',sessionCheck,deleteProduct)


export default routes