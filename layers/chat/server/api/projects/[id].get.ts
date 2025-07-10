import { getProjectByIdForUser } from "#layers/chat/server/repository/projectRepository";
import { getAuthenticatedUserId } from "#layers/auth/server/utils/auth";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const userId = await getAuthenticatedUserId(event)
  // Ensure the project exists and belongs to the user
  const project = await getProjectByIdForUser(id, userId)

  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: 'Project not found'
    })
  }

  return project
})
