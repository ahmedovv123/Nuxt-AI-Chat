import { createProject } from "#layers/chat/server/repository/projectRepository";
import { CreateProjectSchema } from '../../schemas'

export default defineEventHandler(async (event) => {
  const { success, data } = await readValidatedBody(
    event,
    CreateProjectSchema.safeParse
  )

  if (!success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  return createProject(data)
})
