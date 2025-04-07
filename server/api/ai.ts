import {
  createOpenAIModel,
  generateChatResponse,
} from "../services/ai-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { messages } = body;

  const id = messages.length.toString();

  const { openaiApiKey } = useRuntimeConfig();

  const openaiModel = createOpenAIModel(openaiApiKey);

  // TODO: Add ollama model
  // const ollamaModel = createOllamaModel();

  const response = await generateChatResponse(openaiModel, messages);

  return {
    id,
    role: "assistant",
    content: response,
  };
});
