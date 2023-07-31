import expess from 'express'

//controller

import { productFilterController } from '../../controller/productFilterController';

//Middleware
import {sessionCheck}  from '../../middleware/session';

const routes=expess();

routes.get('/filter',sessionCheck,productFilterController)


export default routes