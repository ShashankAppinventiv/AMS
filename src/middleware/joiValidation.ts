import {Request,Response} from "express";
import Joi, { date } from "joi";

//Fucntion for user validation
export const newUserValidate=(req:Request,res:Response,next: () => void)=>{
    
    const userSchema=Joi.object({
    username:Joi.string().required(),
    first_name:Joi.string().required(),
    last_name:Joi.string().required(),
    email:Joi.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    password:Joi.string().min(8).required(),
    number:Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
    gender:Joi.string().equal(...['male','female']).required(),
    DOB:Joi.date().required()
  });
    const result=userSchema.validate(req.body)
    if(result.error)
    {
        res.status(400).send(result.error);
    }
    else
    {
        next();
    }
}

export const productValidator=(req:Request,res:Response,next: () => void)=>{
    
    const productSchema=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    title:Joi.string().required(),
    base_price:Joi.number().required()
  });
    const result=productSchema.validate({
        name:req.body.name,
        description:req.body.description,
        title:req.body.title,
        base_price:req.body.base_price
    })
    if(result.error)
    {
        res.status(400).send(result.error);
    }
    else
    {
        next();
    }
}

export const loginValidation=(req:Request,res:Response,next:()=>void)=>{
      const isValid=Joi.object({
        username:Joi.string().required(),
        password:Joi.string().min(8).required()
      })
      let result=isValid.validate(req.body)
      result.error?res.status(400).send(result):next();
}

export const addressValidation=(req:Request,res:Response,next: () => void)=>{
    
    const addressSchema=Joi.object({
    userId:Joi.number().required(),
    house_no:Joi.string().required(),
    street_no:Joi.string().required(),
    area:Joi.string().required(),
    landmark:Joi.string().allow('').optional(),
    city:Joi.string().required(),
    zipcode:Joi.number().required(),
    address_type:Joi.valid('home','office','other').required()
  });
    const result=addressSchema.validate({
        userId:req.body.id,
        house_no:req.body.house_no,
        street_no:req.body.street_no,
        area:req.body.area,
        landmark:req.body.landmark,
        city:req.body.city,
        zipcode:req.body.zipcode,
        address_type:req.body.address_type
    })
    if(result.error)
    {
        res.status(400).send(result.error);
    }
    else
    {
        next();
    }
}
export const updateValidation=(req:Request,res:Response,next:()=>void)=>{
    const userSchema=Joi.object({
        first_name:Joi.string().min(1).optional(),
        last_name:Joi.string().min(1).optional(),
        email:Joi.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).optional(),
        Mob_number:Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).optional(),
        gender:Joi.string().equal(...['male','female']).optional(),
        DOB:Joi.date().optional()
      });
      const result=userSchema.validate(req.body);
      (result.error)?res.status(404).send(result.error):next()
}
export const DeleteUserValidation=(req:Request,res:Response,next:()=>void)=>{
    const userSchema=Joi.object({
        username:Joi.string().min(1).required(),
        otp:Joi.number().min(4).optional(),
        password:Joi.string().min(8).optional(),
      });
      const result=userSchema.validate(req.body);
      (result.error)?res.status(404).send(result.error):next()
}