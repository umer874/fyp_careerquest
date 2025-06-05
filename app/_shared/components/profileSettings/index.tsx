import classNames from "classnames";
import BasicSettings from "./basic";
import Education from "./education";
import Experience from "./experience";
import PasswordSettings from "./password";
import styles from "./style.module.scss";

interface ProfileSettingsProps {
  userCookie: any;
}

function ProfileSettings({ userCookie }: ProfileSettingsProps) {
  return (
    <div className={classNames(styles.settingsWrapper)}>
      <div className={classNames(styles.settingsContainer)}>
        <h4>Settings</h4>
        {/* Basic */}
        <BasicSettings userCookie={userCookie} />
        {/* Education */}
        <Education />
        {/* Experience */}
        <Experience />
        {/* Password */}
        <PasswordSettings />
      </div>
    </div>
  );
}

export default ProfileSettings;
