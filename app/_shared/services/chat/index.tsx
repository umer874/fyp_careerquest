import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
import { apiCallWithToken } from "utils/server-side-helper";
import { ListingInterface } from "_shared/types/pagination";

const GetConversationsServerCall = async ({
  token,
  refreshToken,
  id,
}: {
  token: string;
  refreshToken: string;
  id?: string;
}) => {
  let url =
    BaseURL + Endpoint.chat.getAllConversation + `${id ? "?id=" + id : ""}`;
  return await apiCallWithToken(url, token ?? "", refreshToken ?? "", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
};

const SendMessageService = (payload: any) => {
  return refreshTokenWrapper({
    url: Endpoint.chat.sendMessage,
    method: HTTP_METHODS.POST,
    payload,
  });
};

const GetMessagesService = (id: string) => {
  return refreshTokenWrapper({
    url: Endpoint.chat.getMessages.replace(":id", id),
    method: HTTP_METHODS.GET,
  });
};

const GetConversationsSevice = ({ page, limit, search }: ListingInterface) => {
  return refreshTokenWrapper({
    url:
      Endpoint.chat.getAllConversation +
      `?page=${page ?? 1}${limit ? `&limit=${limit}` : ""}${
        search ? `&search=${search}` : ""
      }`,
    method: HTTP_METHODS.GET,
  });
};

export {
  GetConversationsServerCall,
  SendMessageService,
  GetMessagesService,
  GetConversationsSevice,
};
