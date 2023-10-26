import { Router } from "express";
import { login, register } from "../controllers/usersControllers";

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.post('/profile', )
router.get('/profile', )
router.get('/portfolio',)

export { router }