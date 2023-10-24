import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users1698173399028 } from "./migration/1698173399028-users"
import { AppointmentsAvailable1698174598963 } from "./migration/1698174598963-appointments_available"
import { Appointments1698175689683 } from "./migration/1698175689683-appointments"
import { Portfolios1698177531860 } from "./migration/1698177531860-portfolios"
import { Profiles1698178031977 } from "./migration/1698178031977-profiles"

export const AppDataSource = new DataSource({
type: "mysql",
host: "localhost",
port: 3306,
username: "root",
password: "Ana1940++",
database: "tattoo-studio",
entities: [],
migrations:[Users1698173399028,AppointmentsAvailable1698174598963,Appointments1698175689683,Portfolios1698177531860,Profiles1698178031977],
synchronize: false,
logging: false,
})