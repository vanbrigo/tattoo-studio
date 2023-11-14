import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Appointment } from "../models/Appointment"
import { Appointment_available } from "../models/Appointment_available"
import { Profile } from "../models/Profile"
import { MoreThanOrEqual } from 'typeorm'


const register = async (req: Request, res: Response) => {
    try {
        const {name,email,password,phone_number} = req.body

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
            process.env.JWT_SECRET as string,
            {
                expiresIn: "3h",
            }
        )
        return res.json(
            {
                success: true,
                message: "User logged succesfully",
                token: token,
                data:user.name
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
    const userToUpdate = req.token.id
    const userUpdated = await User.update({ id: userToUpdate }, req.body)
    if (userUpdated.affected) {
      return res.json(`User updated successfully`)
    }
    return res.json('User cant be update')

  } catch (error){
    return res.json('User cant be update')
  }
     
}

const newTattooArtist = async(req: Request, res: Response) => {
  try {
    const userToUpdate = req.body.id
    const userRole=req.body.role
    const userUpdated = await User.update({ id: userToUpdate }, req.body)
    if (userUpdated.affected) {
      return res.json(`New tattoo artist created`)
    }
    return res.json('User cant be update')

  } catch (error){
    return res.json('User cant be update')
    
  }
}

const getAllAppointmentsByTattooArtistId = async(req: Request, res: Response) => {
    try {
      const appointments = await Appointment_available.find({
        where:{
          tattoo_artist_id: req.token.id
        },
        select:{
          id:true,
          date:true,
          time:true,
          appointment:{purpose:true}
        },
        relations:['appointment'],
        order:{date:'ASC'}
    })
      return res.json({
        success: true,
        message: "All appointments available retrieved as tattoo artist",
        data: appointments
      })
    } catch (error) {
      return res.json({
        success: false,
        message: "Appointments available cant be retrieved",
        error: error
      })
    }
  }

  const getAllAppointmentsByUserId = async(req: Request, res: Response) => {
    try {
      const appointments = await Appointment.find({
        where:{
          user_id: req.token.id
        },
        select:{
          id:true,
          purpose:true,
          appointmentA:{
            date:true,
            time:true,
            user:{name:true}
          }
        },
        relations:['appointmentA','appointmentA.user']
    })
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

  const getAppointmentsTakenByTattooArtistId= async(req: Request, res: Response) => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const appointmentsTaken = await Appointment_available.find({
        where:{ 
          tattoo_artist_id: req.token.id,
          is_available: false,
          date: MoreThanOrEqual(today)
        },
        select:{
          date:true,
          time:true,
          appointment:{
            purpose:true,
            user:{name:true,phone_number:true}
          }
        },
        relations: ["appointment","appointment.user"]
    })
      return res.json({
        success: true,
        message: "Appointments by user retrieved",
        data:appointmentsTaken
      })
    } catch (error) {
      return res.json({
        success: false,
        message: "Appointments cant by user retrieved",
        error: error
      })
    }
  }

  const getAllTattooArtists = async (req: Request, res: Response) => {
    try {
      const tattooArtists = await User.find({
        select:{name:true,
                phone_number:true},
        where:{role:"tattoo_artist"}
      })
  
      return res.json(
        {
          success: true,
          message: "Tattoo artists retrieved",
          data: tattooArtists
        }
      )
  
    } catch (error) {
      return res.json(
        {
          success: false,
          message: "Tattoo artists cant be retrieved",
          error: error
        }
      )
    }
  }

  const addProfile = async(req: Request, res: Response) => {
    try {
      const {birthdate,gender,address}=req.body
      const id=req.token.id

      const profile = await Profile.create(
        {
          birthdate,
          gender,
          address,
          user_id:id
        }
      ).save()
  
      return res.json(
        {
          success: true,
          message: "Profile created successfully",
          data: profile
        }
      )
      
    } catch (error) {
      console.log(error)
      return res.json(
        {
          success: false,
          message: "Profile cant be created",
          error: error
        }
      )
    }
  }

  const deleteUser = async(req:Request, res:Response)=>{
    try {
        const userIdToDelete = req.body.id
        const userDeleted = await User.delete(
            {
            id:userIdToDelete
            }
        )
        if(userDeleted.affected){
            return res.send({
                success:true,
                message:'User deleted successfully'
            })
        }
        return res.send('User cant be deleted') 

    } catch (error) {
        return res.send(error)
    }
}

const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await User.find({
      select:{
        id:true,
        name:true,
        email:true,
        is_active:true
      },
      where:{role:"user"}
    })

    return res.json(
      {
        success: true,
        message: "Clients retrieved",
        data: clients
      }
    )

  } catch (error) {
    return res.json(
      {
        success: false,
        message: "Clients cant be retrieved",
        error: error
      }
    )
  }
}

const updateProfile = async(req: Request, res: Response) => {
  try {
    const user= req.token.id
    const profileIdToUpdate = req.body.id
    const profileToUpdate = await Profile.findOneBy({id:profileIdToUpdate})
    if (user !== profileToUpdate?.user_id){
      return res.json({
        success:true,
        message: 'Profile not found'
      })
    }
    const profileUpdated = await Profile.update({ id: profileIdToUpdate}, req.body)
    if (profileUpdated.affected) {
      return res.json(`Profile updated successfully`)
    }
    return res.json('Profile cant be update')

  } catch {
    return res.json('Profile cant be update')

  }
     
}
  
  

export {
  register,
  login,
  updateUser,
  getAllAppointmentsByTattooArtistId,
  getAllTattooArtists, addProfile,
  getAppointmentsTakenByTattooArtistId,
  getAllAppointmentsByUserId,
  newTattooArtist,
  deleteUser,
  getAllClients,
  updateProfile
}