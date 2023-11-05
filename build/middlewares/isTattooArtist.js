"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTattooArtist = void 0;
const isTattooArtist = (req, res, next) => {
    if (req.token.role == "user") {
        return res.json('You need special permissions');
    }
    next();
};
exports.isTattooArtist = isTattooArtist;
