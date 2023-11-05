"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
require("dotenv/config");
const _1698173399028_users_1 = require("./migration/1698173399028-users");
const _1698174598963_appointments_available_1 = require("./migration/1698174598963-appointments_available");
const _1698175689683_appointments_1 = require("./migration/1698175689683-appointments");
const _1698177531860_portfolios_1 = require("./migration/1698177531860-portfolios");
const _1698178031977_profiles_1 = require("./migration/1698178031977-profiles");
const User_1 = require("./models/User");
const Profile_1 = require("./models/Profile");
const Portfolio_1 = require("./models/Portfolio");
const Appointment_1 = require("./models/Appointment");
const Appointment_available_1 = require("./models/Appointment_available");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User_1.User, Profile_1.Profile, Portfolio_1.Portfolio, Appointment_1.Appointment, Appointment_available_1.Appointment_available],
    migrations: [_1698173399028_users_1.Users1698173399028, _1698174598963_appointments_available_1.AppointmentsAvailable1698174598963, _1698175689683_appointments_1.Appointments1698175689683, _1698177531860_portfolios_1.Portfolios1698177531860, _1698178031977_profiles_1.Profiles1698178031977],
    synchronize: false,
    logging: false,
});
