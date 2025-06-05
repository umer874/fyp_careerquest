import classNames from "classnames";
import ProfileSettings from "components/profileSettings";
import { GetCookieUser } from "utils/server-side-helper";
import styles from "./style.module.scss";

const DashboardProfileSettings = async () => {
  const user = await GetCookieUser();
  return (
    <div className={classNames(styles.settingsContainer)}>
      <ProfileSettings userCookie={user} />
    </div>
  );
};

export default DashboardProfileSettings;
