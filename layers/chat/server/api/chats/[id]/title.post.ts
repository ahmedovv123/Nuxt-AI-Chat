import { updateChat } from "#layers/chat/server/repository/chatRepository";
import { createOpenAIModel, generateChatTitle } from "#layers/chat/server/services/ai-service";
import { UpdateChatTitleSchema} from "#layers/chat/server/schemas";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { success, data } = await readValidatedBody(
    event,
    UpdateChatTitleSchema.safeParse
  )

  if (!success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request'
    })
  }

  const model = createOpenAIModel(
    useRuntimeConfig().openaiApiKey
  )
  const title = await generateChatTitle(model, data.message)

  return updateChat(id, { title })
})
