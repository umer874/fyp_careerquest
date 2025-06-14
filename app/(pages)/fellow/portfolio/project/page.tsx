import ProjectList from "components/fellow/portfolio/project";
import { GetProjectsServerCall } from "services/project";
import { GetCookieUser, GetTokensFromCookies } from "utils/server-side-helper";

const Porfolios = async () => {
  // const { token, refreshToken } = await GetTokensFromCookies();
  // const user = await GetCookieUser();

  // const { response, updatedToken } = await GetProjectsServerCall({
  //   token,
  //   refreshToken,
  //   id: user?.id,
  //   page: 1,
  //   limit: 9,
  // });

  return (
    // <ProjectList
    //   list={response?.data?.data}
    //   meta={response?.data?.meta}
    //   updatedToken={updatedToken}
    // />
  <></>
  );
};

export default Porfolios;
