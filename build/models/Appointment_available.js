"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment_available = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Appointment_1 = require("./Appointment");
let Appointment_available = class Appointment_available extends typeorm_1.BaseEntity {
};
exports.Appointment_available = Appointment_available;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment_available.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Appointment_available.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment_available.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appointment_available.prototype, "tattoo_artist_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Appointment_available.prototype, "is_available", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.appointment_available),
    (0, typeorm_1.JoinColumn)({ name: "tattoo_artist_id" }),
    __metadata("design:type", User_1.User)
], Appointment_available.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Appointment_1.Appointment, (appointment) => appointment.appointmentA),
    __metadata("design:type", Appointment_1.Appointment)
], Appointment_available.prototype, "appointment", void 0);
exports.Appointment_available = Appointment_available = __decorate([
    (0, typeorm_1.Entity)("appointments_available")
], Appointment_available);
