import {
  updateProject,
  getProjectById
} from "#layers/chat/server/repository/projectRepository";
import { UpdateProjectSchema } from '../../schemas'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { success, data } = await readValidatedBody(
    event,
    UpdateProjectSchema.safeParse
  )

  const project = await getProjectById(id)
  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: 'Project Not Found'
    })
  }

  if (!success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  return updateProject(id, data)
})
