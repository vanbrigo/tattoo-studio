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

const deleteProject = async(req:Request, res:Response)=>{
    try {
        const projectIdToDelete = req.body.id
        const user_id= req.token.id
        const projectToDelete = await Portfolio.findOne(
            {
              where: {
                id: projectIdToDelete
              }
            }
          )
        
        if(user_id !== projectToDelete!.user_id){
            return res.json({
                success:true,
                message:'Project not found'
            })
        }
        const projectDeleted = await Portfolio.delete(
            {
            id:projectIdToDelete
            }
        )
        if(projectDeleted.affected){
            return res.json({
                success:true,
                message:'Project deleted successfully'
            })
        }
        
        return res.send('Project cant be deleted') 

    } catch (error) {
        return res.send(error)
    }
}
const getAllWorks = async (req: Request, res: Response) => {
    try {
      const portfolios = await Portfolio.find({
        select:{
          id:true,
          title:true,
          image_url:true,
          user_id:true,
          user:{name:true}
        },
        relations:{user:true}
      })
      return res.json(
        {
          success: true,
          message: "Works retrieved",
          data: portfolios
        }
      )
  
    } catch (error) {
      return res.json(
        {
          success: false,
          message: "Works cant be retrieved",
          error: error
        }
      )
    }
  }

export {newProjectByTattooArtist,
    deleteProject,
    getAllWorks
}