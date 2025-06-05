import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
//import { apiCallWithToken } from "utils/server-side-helper";

const CreateProjectService = (payload: any) => {
  return refreshTokenWrapper({
    url: Endpoint.project.create,
    method: HTTP_METHODS.POST,
    payload,
  });
};

const UpdateProjectService = (id: string, payload: any) => {
  return refreshTokenWrapper({
    url: Endpoint.project.update.replace(":id", id),
    method: HTTP_METHODS.PATCH,
    payload,
  });
};

const DeleteProjectService = (id: string) => {
  return refreshTokenWrapper({
    url: Endpoint.project.delete.replace(":id", id),
    method: HTTP_METHODS.DELETE,
  });
};

interface GetProjectsServerCallInterface extends ListingInterface {
  refreshToken?: string;
  token?: string;
  id: string;
}

const GetProjectsServerCall = async ({
  refreshToken,
  token,
  page,
  limit,
  id,
}: GetProjectsServerCallInterface) => {
  let url =
    BaseURL +
    Endpoint.project.getUserProjects.replace(":id", id) +
    `?page=${page ?? 1}&limit=${limit ?? 10}`;
  // return await apiCallWithToken(url, token ?? "", refreshToken ?? "", {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // });
};

const GetProjectsService = async ({
  page,
  limit,
  id,
}: GetProjectsServerCallInterface) => {
  return refreshTokenWrapper({
    url:
      Endpoint.project.getUserProjects.replace(":id", id) +
      `?page=${page ?? 1}&limit=${limit ?? 10}`,
    method: HTTP_METHODS.GET,
  });
};

const GetProjectDetailServerCall = async ({
  refreshToken,
  token,
  id,
}: {
  refreshToken: string;
  token: string;
  id: string;
}) => {
  let url = BaseURL + Endpoint.project.get.replace(":id", id);

  // return await apiCallWithToken(url, token ?? "", refreshToken ?? "", {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // });
};

export {
  CreateProjectService,
  UpdateProjectService,
  DeleteProjectService,
  GetProjectsServerCall,
  GetProjectsService,
  GetProjectDetailServerCall,
};
