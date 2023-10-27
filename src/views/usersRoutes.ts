import { Router } from "express";
import { login, register, updateUser } from "../controllers/usersControllers";
import { auth } from "../middlewares/auth";

const router = Router()

router.get('/profile', )
router.get('/portfolio',)
router.post('/register',register)
router.post('/login',login)
router.post('/profile',)
router.put('/update',auth,updateUser)


export { router }