import { Router } from "express";
import { addProfile, getAllAppointmentsByTattooArtistId, getAllTattooArtists, login, register, updateUser } from "../controllers/usersControllers";
import { auth } from "../middlewares/auth";
import { cancelAppointment, newAppointmentTaken } from "../controllers/appointmentsControllers";

const router = Router()

router.get('/profile', )
router.get('/portfolio',)
router.get('/tattooArtist/appointments',auth,getAllAppointmentsByTattooArtistId)
router.get('/tattooArtistsAvailable',getAllTattooArtists)
router.post('/register',register)
router.post('/login',login)
router.post('/profile',auth,addProfile)
router.post('/newAppointment',auth,newAppointmentTaken)
router.put('/update',auth,updateUser)
router.delete('/cancelAppointment',auth,cancelAppointment)


export { router }