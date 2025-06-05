import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";

const GetAllNotificationsService = ({ page, limit }: ListingInterface) => {
  return refreshTokenWrapper({
    url: Endpoint.notification.get + "?page=" + page + "&limit=" + limit,
    method: HTTP_METHODS.GET,
  });
};

const GetUnReadNotificationCountService = () => {
  return refreshTokenWrapper({
    url: Endpoint.notification.unReadCount,
    method: HTTP_METHODS.GET,
  });
};

const MarkNotificationsAsReadService = () => {
  return refreshTokenWrapper({
    url: Endpoint.notification.markRead,
    method: HTTP_METHODS.POST,
  });
};

export {
  GetAllNotificationsService,
  GetUnReadNotificationCountService,
  MarkNotificationsAsReadService,
};
