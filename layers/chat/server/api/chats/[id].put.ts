import { updateChat, getChatByIdForUser } from '../../repository/chatRepository'
import { UpdateChatSchema } from '../../schemas'
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

  const { success, data } = await readValidatedBody(
    event,
    UpdateChatSchema.safeParse
  )

  if (!success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  const storage = useStorage('db')
  await storage.setItem(`chats:has-new-chat:${userId}`, true)

  return updateChat(id, data)
})
