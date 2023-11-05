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
exports.deleteProject = exports.newProjectByTattooArtist = void 0;
const Portfolio_1 = require("../models/Portfolio");
const newProjectByTattooArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, image_url } = req.body;
        const user_id = req.token.id;
        const ProjectToPost = yield Portfolio_1.Portfolio.create({
            title,
            image_url,
            user_id
        }).save();
        return res.json({
            success: true,
            message: `Project posted successfully`,
            data: ProjectToPost
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Project cant be posted",
            error: error
        });
    }
});
exports.newProjectByTattooArtist = newProjectByTattooArtist;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectIdToDelete = req.body.id;
        const user_id = req.token.id;
        const projectToDelete = yield Portfolio_1.Portfolio.findOne({
            where: {
                id: projectIdToDelete
            }
        });
        if (user_id !== projectToDelete.user_id) {
            return res.json({
                success: true,
                message: 'Project not found'
            });
        }
        const projectDeleted = yield Portfolio_1.Portfolio.delete({
            id: projectIdToDelete
        });
        if (projectDeleted.affected) {
            return res.json({
                success: true,
                message: 'Project deleted successfully'
            });
        }
        return res.send('Project cant be deleted');
    }
    catch (error) {
        return res.send(error);
    }
});
exports.deleteProject = deleteProject;
