import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
//import { apiCallWithToken } from "utils/server-side-helper";

const CreatePortfolioService = (payload: any) => {
  return refreshTokenWrapper({
    url: Endpoint.porfolio.create,
    method: HTTP_METHODS.POST,
    payload,
  });
};

const UpdatePortfolioService = (id: string, payload: any) => {
  return refreshTokenWrapper({
    url: Endpoint.porfolio.update.replace(":id", id),
    method: HTTP_METHODS.PATCH,
    payload,
  });
};

const DeletePortfolioService = (id: string) => {
  return refreshTokenWrapper({
    url: Endpoint.porfolio.delete.replace(":id", id),
    method: HTTP_METHODS.DELETE,
  });
};

interface GetPortfoliosServerCallInterface extends ListingInterface {
  refreshToken?: string;
  token?: string;
  id: string;
}

const GetPortfoliosServerCall = async ({
  refreshToken,
  token,
  page,
  limit,
  id,
}: GetPortfoliosServerCallInterface) => {
  let url =
    BaseURL +
    Endpoint.porfolio.getUserPortfolios.replace(":id", id) +
    `?page=${page ?? 1}&limit=${limit ?? 10}`;

  // return await apiCallWithToken(url, token ?? "", refreshToken ?? "", {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // });
};

const GetPortfoliosService = async ({
  page,
  limit,
  id,
}: GetPortfoliosServerCallInterface) => {
  return refreshTokenWrapper({
    url:
      Endpoint.porfolio.getUserPortfolios.replace(":id", id) +
      `?page=${page ?? 1}&limit=${limit ?? 10}`,
    method: HTTP_METHODS.GET,
  });
};

const GetPortfolioDetailServerCall = async ({
  refreshToken,
  token,
  id,
}: {
  refreshToken: string;
  token: string;
  id: string;
}) => {
  let url = BaseURL + Endpoint.porfolio.get.replace(":id", id);

  // return await apiCallWithToken(url, token ?? "", refreshToken ?? "", {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // });
};

export {
  CreatePortfolioService,
  UpdatePortfolioService,
  DeletePortfolioService,
  GetPortfoliosServerCall,
  GetPortfolioDetailServerCall,
  GetPortfoliosService,
};
