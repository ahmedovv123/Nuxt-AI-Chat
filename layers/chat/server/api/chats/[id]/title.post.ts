import { updateChat } from "#layers/chat/server/repository/chatRepository";
import {
  createOpenAIModel,
  generateChatTitle
} from "#layers/chat/server/services/ai-service";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const body = await readBody(event)

  const model = createOpenAIModel(useRuntimeConfig().openaiApiKey)
  const title = await generateChatTitle(model, body.message)

  return updateChat(id, { title })
})