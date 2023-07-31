
import redisclient from '../../provider/redis';
import { Request,Response } from "express";
import otpGenerate from 'otp-generator'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import mailgen from 'mailgen'
import { userSchema } from "../../model/user";
dotenv.config()
export const otpMailGenerator=async (req:Request,res:Response,next:()=>void)=>{
    try{
        if(!req.body.otp){
            let emailAddress=await userSchema.findOne({
                where: { username: req.body.username},
                attributes: ['email'], // Specify the attributes you want to select
              })
            const emailId=JSON.parse(JSON.stringify(emailAddress))
            let otp=otpGenerate.generate(4,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false,digits:true})
            let config={
                service:'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            }
            const transport=nodemailer.createTransport(config)
            const mailGenerator=new mailgen({
                theme:"default",
                product:{
                    name:"Verification code",
                    link:"https://mail.google.com/mail/u/0/#inbox"
                }
            })
            const description={
                body:{
                    intro:`Your OTP is ${otp} and valid for 15 minutes`
                }
            }
            const mail=mailGenerator.generate(description)
            let message={
                from:process.env.EMAIL,
                to:`${emailId.email}`,
                subject:"Forget password OTP",
                html:mail
            }
            transport.sendMail(message).then(()=>{
                redisclient.setEx(`OTP${req.body.username}`,9000,`${otp}`)
                res.send("Mail Send Successfully")

            }).catch((err)=>{
                res.send(err)
            })
        }else{
            next()
        }
        // const message={
        //     from: "shashanksaxena226@gmail.com", // sender address
        //     to: "hello@gmail.com", // list of receivers
        //     subject: `Forget password opt`, // Subject line
        //     text: `Your Opt is valid for 15 minutes :${otp}`, // plain text body
        //     html: `<b>Your otp is ${otp}</b>`, // html body
        //   }
    }catch(error){
        res.json({error:error})
    }
}
export const fpController=async (req:Request,res:Response)=>{
    try{
        let otp=await redisclient.get(`OTP${req.body.username}`);
        if(req.body.otp==otp&& (req.body.password).length>=8){
            userSchema.update(
                {password:req.body.password},
                {where : {username : req.body.username}})
            redisclient.del(`OTP${req.body.id}`)
            res.status(201).send("Password changed successfully")
        }else{
            res.status(200).send("OTP Either invalid or expired")
        }
    }catch(error){
        res.status(400).send(error)
    }
}