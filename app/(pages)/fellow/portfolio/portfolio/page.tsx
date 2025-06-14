import PortfolioList from "components/fellow/portfolio/porfolio";
import { GetPortfoliosServerCall } from "services/portfolio";
import { GetCookieUser, GetTokensFromCookies } from "utils/server-side-helper";

const Porfolios = async () => {
  // const { token, refreshToken } = await GetTokensFromCookies();
  // const user = await GetCookieUser();

  // const { response, updatedToken } = await GetPortfoliosServerCall({
  //   token,
  //   refreshToken,
  //   id: user?.id,
  //   page: 1,
  //   limit: 9,
  // });

  return (
    // <PortfolioList
    //   list={response?.data?.data}
    //   meta={response?.data?.meta}
    //   updatedToken={updatedToken}
    // />
    <div></div>
  );
};

export default Porfolios;
