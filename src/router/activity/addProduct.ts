import expess from 'express'

//controller

import {addProductController,categories,subCategories} from '../../controller/addProduct'
import {addressController} from '../../controller/addressController'

//Middleware
import {sessionCheck}  from '../../middleware/session';
import { productValidator } from '../../middleware/joiValidation';
const routes=expess();

routes.post('/add',sessionCheck,categories)
routes.post('/add/:categorie',sessionCheck,subCategories)
routes.post('/add/:categorie/:subCategorie',sessionCheck,addressController)
routes.post('/add/:categorie/:subCategorie/:address',sessionCheck,productValidator,addProductController)


export default routes