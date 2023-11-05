"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const database_1 = require("./database");
const usersRoutes_1 = require("./views/usersRoutes");
const appointments_availableRoutes_1 = require("./views/appointments_availableRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 6000;
app.use('/user', usersRoutes_1.router);
app.use('/appointment_available', appointments_availableRoutes_1.router);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running ${PORT}`);
    });
})
    .catch(error => {
    console.log(error);
});
