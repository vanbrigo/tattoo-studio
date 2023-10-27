import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Appointment } from "../models/Appointment"
import { Appointment_available } from "../models/Appointment_available"


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
        } if (!passwordRegex.test(password)) {
            return res.json({
                success: true,
                message: 'Password is not valid. Your password must contain: 1 uppercase letter, 1 number, and at least 8 characters'
            })
        } else if (!phone_numberRegex.test(phone_number)) {
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
            message: `User ${newUser.name} created succesfully`
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

const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!emailRegex.test(email)) {
            return res.json({ message: 'Email is not valid' })
        }
        const user = await User.findOneBy(
            {
                email
            }
        )
        if (!user) {
            return res.json(
                {
                    success: true,
                    message: 'User or password incorrect',
                }
            )
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.json(
                {
                    success: true,
                    message: 'User or password incorrect',
                }
            )
        }
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                email: user.email
            },
            "secreto",
            {
                expiresIn: "3h",
            }
        )
        return res.json(
            {
                success: true,
                message: "User logged succesfully",
                token: token
            }
        )
    } catch (error) {
        return res.json(
            {
                success: false,
                message: "users cant be logged",
                error: error
            }
        )
    }
}

const updateUser = async(req: Request, res: Response) => {
    try {
        const userToUpdate=req.token.id
        const userUpdated= await User.update({id:userToUpdate}, req.body)
    if (userUpdated.affected) {
        return res.json(`User successfully updated`) 
      }
      return res.json('User cant be update')  

    }catch{}
}

const getAllAppointmentsByTattooArtistId = async(req: Request, res: Response) => {
    try {
      const appointments = await Appointment_available.findBy(
        {
          tattoo_artist_id: req.token.id
        }
      )
      return res.json({
        success: true,
        message: "Appointments by user retrieved",
        data: appointments
      })
    } catch (error) {
      return res.json({
        success: false,
        message: "Appointments cant by user retrieved",
        error: error
      })
    }
  }

export {register,login,updateUser,getAllAppointmentsByTattooArtistId}