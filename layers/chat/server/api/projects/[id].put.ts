import {
  updateProject,
  getProjectByIdForUser
} from "#layers/chat/server/repository/projectRepository";
import { UpdateProjectSchema } from '../../schemas'
import { getAuthenticatedUserId } from "#layers/auth/server/utils/auth";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const userId = await getAuthenticatedUserId(event)

  const project = await getProjectByIdForUser(id, userId)
  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: 'Project Not Found'
    })
  }

  const { success, data } = await readValidatedBody(
    event,
    UpdateProjectSchema.safeParse
  )

  if (!success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  return updateProject(id, data)
})
