import { Request, Response } from "express"
import { Portfolio } from "../models/Portfolio"

const newProjectByTattooArtist = async (req: Request, res: Response) => {
    try {
        const {title,image_url} = req.body
        const user_id = req.token.id

        const ProjectToPost= await Portfolio.create({
            title,
            image_url,
            user_id
        }).save()

        return res.json({
            success: true,
            message: `Project posted successfully`,
            data: ProjectToPost
        })
    } catch (error) {
        return res.json(
            {
                success: false,
                message: "Project cant be posted",
                error: error
            }
        )
    }
}

export {newProjectByTattooArtist}