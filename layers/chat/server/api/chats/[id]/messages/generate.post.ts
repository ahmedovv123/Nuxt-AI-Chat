import {
  getMessagesByChatId,
  createMessageForChat,
} from "#layers/chat/server/repository/chatRepository";

import {
  createOpenAIModel,
  generateChatResponse
} from "#layers/chat/server/services/ai-service";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const history = getMessagesByChatId(id)

  const openai = createOpenAIModel(useRuntimeConfig().openaiApiKey)
  const reply = await generateChatResponse(openai, history)

  return createMessageForChat({
    chatId: id,
    content: reply,
    role: "assistant",
  })
})