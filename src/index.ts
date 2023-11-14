import express  from "express"
import cors from 'cors'
import 'dotenv/config'
import { AppDataSource } from "./database"
import { router as routerUsers} from "./views/usersRoutes"
import { router as routerAppointmentsAvailable } from "./views/appointments_availableRoutes"


const app=express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000 

app.use('/user', routerUsers)
app.use('/appointment_available', routerAppointmentsAvailable)

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
