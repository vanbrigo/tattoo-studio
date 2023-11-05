"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAppointmentsAvailable = exports.deleteAppointmentAvailable = exports.updateAppointmentAvailable = exports.newAppointmentAvailable = void 0;
const Appointment_available_1 = require("../models/Appointment_available");
const User_1 = require("../models/User");
const newAppointmentAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { date, time, tattoo_artist_id } = req.body;
        const appointmentDate = new Date(date);
        if (appointmentDate < today) {
            return res.json({
                success: true,
                message: 'You need to insert a valid date'
            });
        }
        const tattooArtist = yield User_1.User.findOneBy({ id: tattoo_artist_id });
        if ((tattooArtist === null || tattooArtist === void 0 ? void 0 : tattooArtist.role) !== 'tattoo_artist') {
            return res.json({
                success: true,
                message: 'This user is not a tattoo artist'
            });
        }
        const newAppointment = yield Appointment_available_1.Appointment_available.create({
            date,
            time,
            tattoo_artist_id
        }).save();
        return res.json({
            success: true,
            message: `New appointment created successfully`,
            data: newAppointment
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "New appointment cant be created",
            error: error
        });
    }
});
exports.newAppointmentAvailable = newAppointmentAvailable;
const updateAppointmentAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, tattoo_artist_id, id, is_available } = req.body;
        const appointmentAvailableUpdated = yield Appointment_available_1.Appointment_available.update({
            id
        }, {
            date,
            time,
            tattoo_artist_id,
            is_available
        });
        if (appointmentAvailableUpdated.affected) {
            return res.json(`Appointment successfully updated`);
        }
        return res.json('Appointment cant be update');
    }
    catch (_a) { }
});
exports.updateAppointmentAvailable = updateAppointmentAvailable;
const deleteAppointmentAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentAvailableIdToDelete = req.body.id;
        const appointmentAvailableDeleted = yield Appointment_available_1.Appointment_available.delete({
            id: appointmentAvailableIdToDelete
        });
        if (appointmentAvailableDeleted.affected) {
            return res.send({
                success: true,
                message: 'Appointment deleted successfully',
                data: appointmentAvailableDeleted
            });
        }
        return res.send('Appointment cant be deleted');
    }
    catch (error) {
        return res.send(error);
    }
});
exports.deleteAppointmentAvailable = deleteAppointmentAvailable;
const getAllAppointmentsAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentsAvailable = yield Appointment_available_1.Appointment_available.find();
        const appointmentAvailable = appointmentsAvailable.filter(appointment => appointment.is_available);
        if (appointmentAvailable)
            return res.send(appointmentAvailable);
    }
    catch (error) {
        return res.send('error');
    }
});
exports.getAllAppointmentsAvailable = getAllAppointmentsAvailable;
