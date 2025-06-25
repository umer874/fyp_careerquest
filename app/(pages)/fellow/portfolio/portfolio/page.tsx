import PortfolioList from "components/fellow/portfolio/porfolio";
import { GetPortfoliosServerCall } from "services/portfolio";
import { GetTokensFromCookies, getUserIdFromToken } from "utils/server-side-helper";
import classNames from "classnames";
import { Icons } from "assets";


const Porfolios = async () => {

  

  // const { token, refreshToken } = await GetTokensFromCookies();

  // // Get user ID directly from token
  // const userId = token ? await getUserIdFromToken(token) : null;

  // const { response, updatedToken } = await GetPortfoliosServerCall({
  //   token,
  //   refreshToken,
  //   id: userId, // Use the decoded user ID
  //   page: 1,
  //   limit: 9,
  // });
  return (
    <PortfolioList
     
    />
  );
};

// Icons


  


export default Porfolios;
