import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'
import { Users1698173399028 } from "./migration/1698173399028-users"
import { AppointmentsAvailable1698174598963 } from "./migration/1698174598963-appointments_available"
import { Appointments1698175689683 } from "./migration/1698175689683-appointments"
import { Portfolios1698177531860 } from "./migration/1698177531860-portfolios"
import { Profiles1698178031977 } from "./migration/1698178031977-profiles"
import { User } from "./models/User"
import { Profile } from "./models/Profile"
import { Portfolio } from "./models/Portfolio"
import { Appointment } from "./models/Appointment"
import { Appointment_available } from "./models/Appointment_available"

export const AppDataSource = new DataSource({
type: "mysql",
host: process.env.HOST,
port: 3306,
username: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
entities: [User,Profile,Portfolio,Appointment,Appointment_available],
migrations:[Users1698173399028,AppointmentsAvailable1698174598963,Appointments1698175689683,Portfolios1698177531860,Profiles1698178031977],
synchronize: false,
logging: false,
})