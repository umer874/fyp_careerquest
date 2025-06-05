//import CareerChatsClient from "components/fellow/chat/chatClient";
import { GetConversationsServerCall } from "services/chat";
import { GetTokensFromCookies } from "utils/server-side-helper";

const CareerChats = async () => {
  const { token, refreshToken } = await GetTokensFromCookies();
  const { response, updatedToken } = await GetConversationsServerCall({
    token,
    refreshToken,
  });

  return (
    <>
      {/* <CareerChatsClient
        data={response?.data?.data}
        updatedToken={updatedToken} */}
      
      
    </>
  );
};

export default CareerChats;
