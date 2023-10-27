import { Router } from "express"
import { deleteAppointmentAvailable, newAppointmentAvailable, updateAppointmentAvailable } from "../controllers/appointments_availableControllers"
import { isTattooArtist } from "../middlewares/isTattooArtist"
import { auth } from "../middlewares/auth"

const router = Router()

router.post('/new',auth,isTattooArtist,newAppointmentAvailable)
router.put('/update',auth,isTattooArtist,updateAppointmentAvailable)
router.delete('/delete',auth,isTattooArtist,deleteAppointmentAvailable)

export { router }