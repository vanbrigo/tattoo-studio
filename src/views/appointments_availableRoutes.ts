import { Router } from "express"
import { deleteAppointmentAvailable, getAllAppointmentsAvailable, newAppointmentAvailable, updateAppointmentAvailable } from "../controllers/appointments_availableControllers"
import { isTattooArtist } from "../middlewares/isTattooArtist"
import { auth } from "../middlewares/auth"

const router = Router()

router.get('/getAllAppointmentsAvailable',getAllAppointmentsAvailable)
router.post('/new',auth,isTattooArtist,newAppointmentAvailable)
router.put('/update',auth,isTattooArtist,updateAppointmentAvailable)
router.delete('/delete',auth,isTattooArtist,deleteAppointmentAvailable)

export { router }