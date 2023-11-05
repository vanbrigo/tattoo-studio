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
exports.cancelAppointment = exports.newAppointmentTaken = void 0;
const Appointment_1 = require("../models/Appointment");
const Appointment_available_1 = require("../models/Appointment_available");
const newAppointmentTaken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointment_available_id, purpose } = req.body;
        const user_id = req.token.id;
        const appointmentToTake = yield Appointment_available_1.Appointment_available.findOneBy({ id: appointment_available_id });
        if (!(appointmentToTake === null || appointmentToTake === void 0 ? void 0 : appointmentToTake.is_available)) {
            console.log(appointmentToTake);
            return res.json({
                success: true,
                message: 'This appointment is not available'
            });
        }
        const newAppointment = yield Appointment_1.Appointment.create({
            appointment_available_id,
            purpose,
            user_id
        }).save();
        const appointmentTaken = yield Appointment_available_1.Appointment_available.update({ id: appointment_available_id }, { is_available: false });
        return res.json({
            success: true,
            message: `Appointment taken successfully`,
            data: appointmentToTake
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Appointment cant be taken",
            error: error
        });
    }
});
exports.newAppointmentTaken = newAppointmentTaken;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentIdToCancel = req.body.id;
        const user_id = req.token.id;
        const appointmentToCancel = yield Appointment_1.Appointment.findOne({
            where: {
                id: appointmentIdToCancel
            },
            relations: {
                appointmentA: true
            }
        });
        if (user_id !== appointmentToCancel.user_id) {
            console.log(appointmentToCancel.user_id);
            return res.json({
                success: true,
                message: 'Appointment not found'
            });
        }
        const appointmentCanceled = yield Appointment_1.Appointment.delete({
            id: appointmentIdToCancel
        });
        if (appointmentCanceled.affected) {
            yield Appointment_available_1.Appointment_available.update({ id: appointmentToCancel === null || appointmentToCancel === void 0 ? void 0 : appointmentToCancel.appointment_available_id }, { is_available: true });
            return res.json({
                success: true,
                message: 'Appointment canceled successfully'
            });
        }
        return res.send('Appointment cant be cancel');
    }
    catch (error) {
        return res.send(error);
    }
});
exports.cancelAppointment = cancelAppointment;
