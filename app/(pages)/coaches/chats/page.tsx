import CoachChatClient from "components/coaches/chat/chatClient";
import { GetConversationsServerCall } from "services/chat";
import { GetTokensFromCookies } from "utils/server-side-helper";

const CareerChats = async ({ searchParams }: any) => {
  const { id } = await searchParams;

  const { token, refreshToken } = await GetTokensFromCookies();
  const { response, updatedToken } = await GetConversationsServerCall({
    token,
    refreshToken,
    id,
  });

  return (
    <CoachChatClient
      data={response?.data?.data}
      updatedToken={updatedToken}
      meta={response?.data?.meta}
    />
  );
};

export default CareerChats;
