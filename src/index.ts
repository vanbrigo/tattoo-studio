import express  from "express"
import { AppDataSource } from "./database"

const app=express()
app.use(express.json())
const PORT = process.env.PORT || 6000

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
