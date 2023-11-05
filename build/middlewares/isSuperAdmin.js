"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = void 0;
const isSuperAdmin = (req, res, next) => {
    if (req.token.role !== "super_admin") {
        return res.json('Necesitas permisos');
    }
    next();
};
exports.isSuperAdmin = isSuperAdmin;
