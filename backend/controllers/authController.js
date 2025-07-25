import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken"  ;

export const registerController = async (req,res) => {
      try{
            const {name,email,password,phone,answer} = req.body;
            //validation
            if(!name){
                return res.send({message:'Name is Required'});
            }
            if(!email){
                return res.send({message:'Email is Required'});
            }
            if(!password){
                return res.send({message:'Password is Required'});
            }
            if(!phone){
                return res.send({message:'Phone no is Required'});
            }
            if(!answer){
                return res.send({message:'Answer is Required'});
            }

            //check user
            const existinguser = await userModel.findOne({email});
            //existing user
            if(existinguser){
                return res.status(200).send({
                    success:false,
                    message:'Already Register, please login',
                });
            }
            //register user
            const hashedPassword = await hashPassword(password);

             // Capture the user's IP address
        const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        
            //save
            const user = await new userModel({
                name,
                email,
                phone,
                password: hashedPassword,
                answer,
                ipAddress: userIp  
            }).save();

            res.status(201).send({
                success:true,
                message:'User Register Successfully',
                user,
            });
      }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registetration',
            error,
        });
      }
 };

  //POST LOGIN
  export const loginController = async (req,res) => {
    try{
        const { email, password } = req.body;
         //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not register'
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            });
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login succcessfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        });
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        });
    }
  };

//forgotPasswordController

 export const forgotPasswordController = async (req,res) => {
    try {
       const {email,answer, newPassword} = req.body
       if(!email){
        res.status(400).send({message:'Email is required'})
       }
       if(!answer){
        res.status(400).send({message:'answer is required'})
       }
       if(!newPassword){
        res.status(400).send({message:'New Password is required'})
       }
       //check
       const user = await userModel.findOne({email,answer});
       //validation
       if(!user){
        return res.status(404).send({
            success:false,
            message:'Wrong Email or Answer'
        });
       }

        // Hash the new password and update
       const hashed = await hashPassword(newPassword)
       await userModel.findByIdAndUpdate(user._id, { password: hashed});
       res.status(200).send({
        success: true,
        message: "Password Reset Auccessfully",
       });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'something went wrong',
            error
        });
    }
 };
    
  //test controller
  export const testController = (req,res) => {
    try {
    res.send("protected Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
