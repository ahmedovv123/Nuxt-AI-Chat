import type { H3Event } from "h3";

export const getAuthenticatedUserId = async (
  event: H3Event
): Promise<string> => {
  const session = await requireUserSession(event)

  if (!session.databaseUserId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not authenticated',
    })
  }

  return session.databaseUserId as string
}
