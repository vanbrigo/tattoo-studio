import { Request, Response } from "express"
import { Appointment } from "../models/Appointment"
import { Appointment_available } from "../models/Appointment_available"


const newAppointmentTaken = async (req: Request, res: Response) => {
    try {
        const appointment_available_id = req.body.appointmentAvailable
        const user_id = req.token.id

        const appointmentToTake= await Appointment_available.findOneBy({id:appointment_available_id})
        if(!appointmentToTake?.is_available){
            return res.json({
                success:true,
                message:'This appointment is not available'
            })
        }
        const newAppointment = await Appointment.create({
            appointment_available_id,
            user_id
        }).save()
        console.log(newAppointment)

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
export {newAppointmentTaken}
