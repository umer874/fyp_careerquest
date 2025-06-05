import classNames from "classnames";
import ProfileSettings from "components/profileSettings";
import { GetCookieUser } from "utils/server-side-helper";
import styles from "./style.module.scss";

async function GeneralProfileSettings() {
  const user = GetCookieUser();
  return (
    <div className={classNames(styles.settingsWrapper)}>
      <div className={classNames(styles.customContainer)}>
        <div className={classNames(styles.sectionContainer)}>
          <ProfileSettings userCookie={user} />
        </div>
      </div>
    </div>
  );
}

export default GeneralProfileSettings;
