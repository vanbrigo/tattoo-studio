import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt"


const register = async (req: Request, res: Response) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password
      const phone_number = req.body.phone_number
  
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
      const phone_numberRegex = /^(?:\+(?:\d{1,3}))?(?:\d{8,15})$/
  
      if (!emailRegex.test(email)) {
        return res.json({ message: 'Email is not valid' })
      }if (!passwordRegex.test(password)){
        return res.json({ message: 'Password is not valid. Your password must contain: 1 uppercase letter, 1 number, and at least 8 characters'})
      } else if(!phone_numberRegex.test(phone_number)){
        return res.json({ message: 'Phone number is not valid' })
      }
      const encryptedPassword = bcrypt.hashSync(password, 10)
      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
        phone_number
      }).save()
  
      return res.json({
        success: true,
        message: "User created succesfully",
        data: newUser
      })
    } catch (error) {
      return res.json(
        {
          success: false,
          message: "user cant be created",
          error: error
        }
      )
    }
  }
export {register}