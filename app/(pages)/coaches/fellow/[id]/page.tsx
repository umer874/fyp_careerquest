import classNames from "classnames";
import FellowPortfolios from "components/coaches/fellow/lists";
import UserInfoCard from "components/coaches/fellow/userInfo";
import { redirect } from "next/navigation";
import { routeConstant } from "routes/constants";
import { GetUserDetailServerCall } from "services/user";
import { GetTokensFromCookies } from "utils/server-side-helper";
import styles from "./style.module.scss";

const FellowDetail = async ({ searchParams, params }: any) => {
  const { tab } = await searchParams;
  const { id } = await params;

  if (!id) {
    redirect(routeConstant.coach.chat.path);
  }

  let viewTab = "portfolio";
  if (tab) {
    viewTab = tab;
  }

  const { token, refreshToken } = await GetTokensFromCookies();

  const { response, updatedToken } = await GetUserDetailServerCall({
    token,
    refreshToken,
    userId: id,
  });

  if (!response?.data) {
    redirect(routeConstant.coach.chat.path);
  }

  return (
    <div className={classNames(styles.customContainer)}>
      <UserInfoCard user={response?.data} updatedToken={updatedToken} />
      <FellowPortfolios user={response?.data} />
    </div>
  );
};

export default FellowDetail;
