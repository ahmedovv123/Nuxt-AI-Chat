import { getChatById, getChatByIdForUser } from "#layers/chat/server/repository/chatRepository";
import { getAuthenticatedUserId } from "#layers/auth/server/utils/auth";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const userId = await getAuthenticatedUserId(event)

  // Ensure the chat exists and belongs to the user
  const chat = await getChatByIdForUser(id, userId)

  if (!chat) {
    return createError({
      statusCode: 404,
      statusMessage: 'Chat not found'
    })
  }

  return getChatById(id)
})
