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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getAllClients = exports.deleteUser = exports.newTattooArtist = exports.getAllAppointmentsByUserId = exports.getAppointmentsTakenByTattooArtistId = exports.addProfile = exports.getAllTattooArtists = exports.getAllAppointmentsByTattooArtistId = exports.updateUser = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Appointment_1 = require("../models/Appointment");
const Appointment_available_1 = require("../models/Appointment_available");
const Profile_1 = require("../models/Profile");
const typeorm_1 = require("typeorm");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone_number } = req.body;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        const phone_numberRegex = /^(?:\+(?:\d{1,3}))?(?:\d{8,15})$/;
        if (!emailRegex.test(email)) {
            return res.json({ message: 'Email is not valid' });
        }
        if (!passwordRegex.test(password)) {
            return res.json({
                success: true,
                message: 'Password is not valid. Your password must contain: 1 uppercase letter, 1 number, and at least 8 characters'
            });
        }
        else if (!phone_numberRegex.test(phone_number)) {
            return res.json({ message: 'Phone number is not valid' });
        }
        const encryptedPassword = bcrypt_1.default.hashSync(password, 10);
        const newUser = yield User_1.User.create({
            name,
            email,
            password: encryptedPassword,
            phone_number
        }).save();
        return res.json({
            success: true,
            message: `User ${newUser.name} created succesfully`
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "user cant be created",
            error: error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.json({ message: 'Email is not valid' });
        }
        const user = yield User_1.User.findOneBy({
            email
        });
        if (!user) {
            return res.json({
                success: true,
                message: 'User or password incorrect',
            });
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.json({
                success: true,
                message: 'User or password incorrect',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "3h",
        });
        return res.json({
            success: true,
            message: "User logged succesfully",
            token: token
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "users cant be logged",
            error: error
        });
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToUpdate = req.token.id;
        const userUpdated = yield User_1.User.update({ id: userToUpdate }, req.body);
        if (userUpdated.affected) {
            return res.json(`User updated successfully`);
        }
        return res.json('User cant be update');
    }
    catch (_a) {
        return res.json('User cant be update');
    }
});
exports.updateUser = updateUser;
const newTattooArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userToUpdate = req.body.id;
        const userUpdated = yield User_1.User.update({ id: userToUpdate }, req.body);
        if (userUpdated.affected) {
            return res.json(`New tattoo artist created`);
        }
        return res.json('User cant be update');
    }
    catch (_b) {
        return res.json('User cant be update');
    }
});
exports.newTattooArtist = newTattooArtist;
const getAllAppointmentsByTattooArtistId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield Appointment_available_1.Appointment_available.find({
            where: {
                tattoo_artist_id: req.token.id
            },
            select: {
                id: true,
                date: true,
                time: true,
                appointment: { purpose: true }
            },
            relations: ['appointment']
        });
        return res.json({
            success: true,
            message: "All appointments available retrieved as tattoo artist",
            data: appointments
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Appointments available cant be retrieved",
            error: error
        });
    }
});
exports.getAllAppointmentsByTattooArtistId = getAllAppointmentsByTattooArtistId;
const getAllAppointmentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield Appointment_1.Appointment.find({
            where: {
                user_id: req.token.id
            },
            select: {
                purpose: true,
                appointmentA: {
                    date: true,
                    time: true,
                    user: { name: true }
                }
            },
            relations: ['appointmentA', 'appointmentA.user']
        });
        return res.json({
            success: true,
            message: "Appointments by user retrieved",
            data: appointments
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Appointments cant by user retrieved",
            error: error
        });
    }
});
exports.getAllAppointmentsByUserId = getAllAppointmentsByUserId;
const getAppointmentsTakenByTattooArtistId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const appointmentsTaken = yield Appointment_available_1.Appointment_available.find({
            where: {
                tattoo_artist_id: req.token.id,
                is_available: false,
                date: (0, typeorm_1.MoreThanOrEqual)(today)
            },
            select: {
                date: true,
                time: true,
                appointment: {
                    purpose: true,
                    user: { name: true, phone_number: true }
                }
            },
            relations: ["appointment", "appointment.user"]
        });
        return res.json({
            success: true,
            message: "Appointments by user retrieved",
            data: appointmentsTaken
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Appointments cant by user retrieved",
            error: error
        });
    }
});
exports.getAppointmentsTakenByTattooArtistId = getAppointmentsTakenByTattooArtistId;
const getAllTattooArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tattooArtists = yield User_1.User.find({
            where: { role: "tattoo_artist" }
        });
        return res.json({
            success: true,
            message: "Tattoo artists retrieved",
            data: tattooArtists
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Tattoo artists cant be retrieved",
            error: error
        });
    }
});
exports.getAllTattooArtists = getAllTattooArtists;
const addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { birthdate, gender, address } = req.body;
        const id = req.token.id;
        const profile = yield Profile_1.Profile.create({
            birthdate,
            gender,
            address,
            user_id: id
        }).save();
        return res.json({
            success: true,
            message: "Profile created successfully",
            data: profile
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Profile cant be created",
            error: error
        });
    }
});
exports.addProfile = addProfile;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdToDelete = req.body.id;
        const userDeleted = yield User_1.User.delete({
            id: userIdToDelete
        });
        if (userDeleted.affected) {
            return res.send({
                success: true,
                message: 'User deleted successfully'
            });
        }
        return res.send('User cant be deleted');
    }
    catch (error) {
        return res.send(error);
    }
});
exports.deleteUser = deleteUser;
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield User_1.User.find({
            select: {
                id: true,
                name: true,
                email: true,
                is_active: true
            },
            where: { role: "user" }
        });
        return res.json({
            success: true,
            message: "Clients retrieved",
            data: clients
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Clients cant be retrieved",
            error: error
        });
    }
});
exports.getAllClients = getAllClients;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.token.id;
        const profileIdToUpdate = req.body.id;
        const profileToUpdate = yield Profile_1.Profile.findOneBy({ id: profileIdToUpdate });
        if (user !== (profileToUpdate === null || profileToUpdate === void 0 ? void 0 : profileToUpdate.user_id)) {
            return res.json({
                success: true,
                message: 'Profile not found'
            });
        }
        const profileUpdated = yield Profile_1.Profile.update({ id: profileIdToUpdate }, req.body);
        if (profileUpdated.affected) {
            return res.json(`Profile updated successfully`);
        }
        return res.json('Profile cant be update');
    }
    catch (_c) {
        return res.json('Profile cant be update');
    }
});
exports.updateProfile = updateProfile;
