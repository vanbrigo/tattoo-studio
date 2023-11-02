import { Router } from "express";
import { addProfile,  
    deleteUser, 
    getAllAppointmentsByTattooArtistId, 
    getAllAppointmentsByUserId, getAllClients, getAllTattooArtists, 
    getAppointmentsTakenByTattooArtistId, 
    login, 
    newTattooArtist, 
    register, 
    updateUser } from "../controllers/usersControllers";
import { auth } from "../middlewares/auth";
import { cancelAppointment, newAppointmentTaken } from "../controllers/appointmentsControllers";
import { isTattooArtist } from "../middlewares/isTattooArtist";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { newProjectByTattooArtist } from "../controllers/portfolios";

const router = Router()

router.get('/profile', )
router.get('/portfolio',)
router.get('/tattooArtist/appointments',auth,getAllAppointmentsByTattooArtistId)
router.get('/tattooArtistsAvailable',getAllTattooArtists)
router.get('/tattooArtist/appointmentsTaken',auth,isTattooArtist,getAppointmentsTakenByTattooArtistId)
router.get('/myAppointments',auth,getAllAppointmentsByUserId )
router.get('/superAdmin/clients',auth,isSuperAdmin,getAllClients)
router.post('/register',register)
router.post('/login',login)
router.post('/profile',auth,addProfile)
router.post('/newAppointment',auth,newAppointmentTaken)
router.post('/tattooArtist/portfolio/new',auth,isTattooArtist,newProjectByTattooArtist)
router.put('/update',auth,updateUser)
router.put('/superAdmin/createNewTattooArtist',isSuperAdmin,newTattooArtist)
router.delete('/cancelAppointment',auth,cancelAppointment)
router.delete('/superAdmin/deleteUser',auth,isSuperAdmin,deleteUser)


export { router }