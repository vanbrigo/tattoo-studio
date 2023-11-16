import { Request, Response } from "express"
import { Appointment } from "../models/Appointment"
import { Appointment_available } from "../models/Appointment_available"
import { MoreThanOrEqual } from "typeorm"


const newAppointmentTaken = async (req: Request, res: Response) => {
    try {
        const {appointment_available_id,purpose} = req.body
        const user_id = req.token.id
        if(purpose!=="tattoo" && purpose !=="piercing"){
            return res.json('You need to insert a valid purpose. Tattoo or piercing.')
        }

        const appointmentToTake= await Appointment_available.findOneBy({id:appointment_available_id})
        if(!appointmentToTake?.is_available){
            console.log(appointmentToTake)
            return res.json({
                success:true,
                message:'This appointment is not available'
            })
        }
        const newAppointment = await Appointment.create({
            appointment_available_id,
            purpose,
            user_id
        }).save()
        const appointmentTaken= await Appointment_available.update({id:appointment_available_id},{is_available:false})

        return res.json({
            success: true,
            message: `Appointment taken successfully`,
            data: appointmentToTake
        })
    } catch (error) {
        return res.json(
            {
                success: false,
                message: "Appointment cant be taken",
                error: error
            }
        )
    }
}

const cancelAppointment = async(req:Request, res:Response)=>{
    try {
        const appointmentIdToCancel = req.body.id
        const user_id= req.token.id
        const appointmentToCancel = await Appointment.findOne(
            {
              where: {
                id: appointmentIdToCancel
              },
              relations: {
                appointmentA: true
              }
            }
          )
        
        if(user_id !== appointmentToCancel!.user_id){
            console.log(appointmentToCancel!.user_id)
            return res.json({
                success:true,
                message:'Appointment not found'
            })
        }
        const appointmentCanceled = await Appointment.delete(
            {
            id:appointmentIdToCancel
            }
        )
        if(appointmentCanceled.affected){
            await Appointment_available.update({id:appointmentToCancel?.appointment_available_id},{is_available:true})
            return res.json({
                success:true,
                message:'Appointment canceled successfully'
            })
        }
        
        return res.send('Appointment cant be cancel') 

    } catch (error) {
        return res.send(error)
    }
}

const getAllAppointmentsBooked = async(req:Request, res:Response)=>{
    try {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const appointmentsBooked = await Appointment_available.find({
            where: {
                is_available:false,
                date: MoreThanOrEqual(today)},
            select:{
                id:true,
                date:true,
                time:true,
                user:{name:true},
                appointment:{purpose:true,user:{name:true,phone_number:true,email:true}}
                },
                relations:['user','appointment','user.appointments'],
                order:{date:'ASC'}
            
        })
        
        
        return res.json({success: true,
            message: `Appointments booked retrieved successfully`,
            data: appointmentsBooked})
    } catch (error) {
        return res.json({
            success: false,
            message: "Appointments booked cant be retrieved",
            error: error
          })
    }
}

export {newAppointmentTaken,cancelAppointment,getAllAppointmentsBooked}
