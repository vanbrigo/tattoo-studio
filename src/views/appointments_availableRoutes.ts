import { Router } from "express"
import { deleteAppointmentAvailable, getAllAppointmentsA, getAllAppointmentsAvailable, newAppointmentAvailable, updateAppointmentAvailable } from "../controllers/appointments_availableControllers"
import { isTattooArtist } from "../middlewares/isTattooArtist"
import { auth } from "../middlewares/auth"

const router = Router()

router.get('/all',getAllAppointmentsAvailable)
router.get('/',auth,getAllAppointmentsA)
router.post('/new',auth,isTattooArtist,newAppointmentAvailable)
router.put('/update',auth,isTattooArtist,updateAppointmentAvailable)
router.delete('/delete/:id',auth,isTattooArtist,deleteAppointmentAvailable)

export { router }