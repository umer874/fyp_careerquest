import { Icons } from "assets";
import classNames from "classnames";
import BottomActions from "components/fellow/portfolio/bottomActions";
import moment from "moment";
import Image from "next/image";
import { redirect } from "next/navigation";
import { routeConstant } from "routes/constants";
import { GetPortfolioDetailServerCall } from "services/portfolio";
import { GetTokensFromCookies } from "utils/server-side-helper";
import styles from "./style.module.scss";
import AssetPreview from "components/common/assetPreview";

const PortfolioDetail =  ({ params }: any) => {
  const { id } =  params;
  if (!id) {
    redirect(routeConstant.fellow.portfolios.path);
  }
  //const { token, refreshToken } = await GetTokensFromCookies();
  // const { response, updatedToken } = await GetPortfolioDetailServerCall({
  //   token,
  //   refreshToken,
  //   id,
  // });

  // if (!response?.data) {
  //   redirect(routeConstant.fellow.portfolios.path);
  // }

  // const portfolioItem = response?.data;

  return (
    <>
      <div className={classNames(styles.customContainer)}>
        <div className={classNames(styles.eventDetailContainer)}>
          <div className={classNames(styles.portfolioContent)}>
            {/* <AssetPreview {...portfolioItem.portfolio_asset} /> */}

            <div
              className={classNames(
                styles.iconContainer,
                "flex items-center xs:gap-2 gap-1"
              )}
            >
              <span>
                <Icons.Calendar />
              </span>
              {/* <p>{moment(portfolioItem?.created_at).format("DD MMMM, YYYY")}</p> */}
            </div>
            {/* <div className={classNames(styles.heading)}>
              <h3 className={classNames(styles.title)}>
                {portfolioItem.title}
              </h3>
              <p>{portfolioItem.description}</p>
            </div> */}
            {/* <BottomActions updatedToken={updatedToken} item={portfolioItem} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioDetail;
