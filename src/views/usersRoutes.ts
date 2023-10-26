import { Router } from "express";
import { register } from "../controllers/usersControllers";

const router = Router()

router.post('/register', register)
router.post('/login', )
router.post('/profile', )
router.get('/profile', )
router.get('/portfolio',)

export { router }