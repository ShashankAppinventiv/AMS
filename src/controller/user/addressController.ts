import {addressSchema} from '../../model/address'
import { Request,Response } from 'express'


export const addAddressController=async (req:Request,res:Response)=>{
    try{
        let data=await addressSchema.create({
            userId:req.body.id,
            house_no:req.body.house_no,
            street_no:req.body.street_no,
            area:req.body.area,
            landmark:req.body.landmark,
            city:req.body.city,
            zipcode:req.body.zipcode,
            address_type:req.body.address_type
        })
        console.log(data)
        res.status(201).send(data)
    }catch(error){
        res.send(error)
    }
}