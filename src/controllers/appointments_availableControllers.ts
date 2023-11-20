import { Request, Response } from "express";
import { Appointment_available } from "../models/Appointment_available";
import { User } from "../models/User"
import { MoreThanOrEqual } from 'typeorm'



const newAppointmentAvailable = async (req: Request, res: Response) => {
    try {
        const today = new Date()
        const todaySpain=new Date(today.toLocaleString("en-US", { timeZone: "Europe/Madrid" }))
        todaySpain.setHours(0, 0, 0, 0)
        const { date,time}=req.body
        const tattoo_artist_id=req.token.id
        
        const appointmentDate=new Date(date)
        if(appointmentDate<today){
            return res.json({
                success:true,
                message:'You need to insert a valid date'
            })
        }
        const tattooArtist= await User.findOneBy({id:tattoo_artist_id})
        if(tattooArtist?.role !== 'tattoo_artist'){
            return res.json({
                success:true,
                message:'This user is not a tattoo artist'
            })
        }
        const newAppointment = await Appointment_available.create({
            date,
            time,
            tattoo_artist_id
        }).save()


        return res.json({
            success: true,
            message: `New appointment created successfully`,
            data: newAppointment
        })
    } catch (error) {
        return res.json(
            {
                success: false,
                message: "New appointment cant be created",
                error: error
            }
        )
    }
}

const updateAppointmentAvailable = async(req: Request, res: Response) => {
    try {
        const {time,id}=req.body
        const appointmentAvailableUpdated= await Appointment_available.update(
            {
                id
            }, 
            {
                time
            })
    if (appointmentAvailableUpdated.affected) {
        return res.json(`Appointment successfully updated`) 
      }
      return res.json('Appointment cant be update')  

    }catch{}
}

const deleteAppointmentAvailable = async(req:Request, res:Response)=>{
    try {
        const appointmentAvailableIdToDelete = req.params.id
        const appointmentAvailableDeleted = await Appointment_available.delete(
            {
            id:parseInt(appointmentAvailableIdToDelete)
            }
        )
        if(appointmentAvailableDeleted.affected){
            return res.send({
                success:true,
                message:'Appointment deleted successfully',
                data:appointmentAvailableDeleted
            })
        }
        return res.send('Appointment cant be deleted') 

    } catch (error) {
        return res.send(error)
    }
}

const getAllAppointmentsAvailable = async(req:Request, res:Response)=>{
    try {
        const appointmentsAvailable = await Appointment_available.find()
        const appointmentAvailable= appointmentsAvailable.filter(appointment=>appointment.is_available)
        if(appointmentAvailable)
        return res.send(appointmentAvailable)
    } catch (error) {
        return res.send('error')
    }
}
const getAllAppointmentsA = async(req:Request, res:Response)=>{
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const appointmentsAvailable = await Appointment_available.find({
            where: {
                is_available:true,
                date: MoreThanOrEqual(today)},
            select:{
                id:true,
                date:true,
                time:true,
                is_available:true,
                user:{name:true}
                },
                relations:['user'],
                order:{date:'ASC'}
            
        })
        
        
        return res.json({success: true,
            message: `Appointments available retrieved successfully`,
            data: appointmentsAvailable})
    } catch (error) {
        return res.json({
            success: false,
            message: "Appointments available cant be retrieved",
            error: error
          })
    }
}


export {newAppointmentAvailable,
        updateAppointmentAvailable,
        deleteAppointmentAvailable,
        getAllAppointmentsAvailable,
        getAllAppointmentsA}
