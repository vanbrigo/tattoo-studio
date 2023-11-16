import { Router } from "express";
import { addProfile,  
    deleteUser, 
    getAllAppointmentsByTattooArtistId, 
    getAllAppointmentsByUserId, getAllClients, getAllTattooArtists, 
    getAppointmentsTakenByTattooArtistId, 
    getTattooArtistAppointments, 
    getUserProfile, 
    login, 
    newTattooArtist, 
    register, 
    updateProfile, 
    updateUser } from "../controllers/usersControllers";
import { auth } from "../middlewares/auth";
import { cancelAppointment, getAllAppointmentsBooked, newAppointmentTaken } from "../controllers/appointmentsControllers";
import { isTattooArtist } from "../middlewares/isTattooArtist";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { deleteProject, getAllWorks, newProjectByTattooArtist } from "../controllers/portfoliosControllers";

const router = Router()

router.get('/profile',auth, getUserProfile)
router.get('/portfolio',)
router.get('/tattooArtist/appointments',auth,getAllAppointmentsByTattooArtistId)
router.get('/tattooArtistsAvailable',getAllTattooArtists)
router.get('/tattooArtist/appointmentsTaken',auth,isTattooArtist,getAppointmentsTakenByTattooArtistId)
router.get('/tattooArtist/my-schedule',auth,getTattooArtistAppointments)
router.get('/myAppointments',auth,getAllAppointmentsByUserId )
router.get('/superAdmin/clients',auth,isSuperAdmin,getAllClients)
router.get('/all-appointments-booked',auth,isSuperAdmin,getAllAppointmentsBooked)
router.get('/tattooArtist/gallery',getAllWorks)
router.post('/register',register)
router.post('/login',login)
router.post('/profile',auth,addProfile)
router.post('/newAppointment',auth,newAppointmentTaken)
router.post('/tattooArtist/portfolio/new',auth,isTattooArtist,newProjectByTattooArtist)
router.put('/update',auth,updateUser)
router.put('/profile/update',auth,updateProfile)
router.put('/superAdmin/createNewTattooArtist',auth,isSuperAdmin,newTattooArtist)
router.delete('/cancelAppointment',auth,cancelAppointment)
router.delete('/superAdmin/deleteUser',auth,isSuperAdmin,deleteUser)
router.delete('/tattooArtist/portfolio/delete',auth,isTattooArtist,deleteProject)


export { router }