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
    console.log(result.error)
    if(result.error)
    {
        res.status(400).send("Enter the valid details");
    }
    else
    {
        console.log("Move to next")
        next();
    }
}

export const loginValidation=(req:Request,res:Response,next:()=>void)=>{
      const isValid=Joi.object({
        name:Joi.string().required(),
        password:Joi.string().min(8).required()
      })
      let result=isValid.validate(req.body)
      result.error?res.status(400).send(result):next();
}