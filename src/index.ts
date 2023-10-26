import express  from "express"
import { AppDataSource } from "./database"
import { router as routerUsers} from "./views/usersRoutes"

const app=express()
app.use(express.json())
const PORT = process.env.PORT || 6000

app.use('/user', routerUsers)

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
