import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { MyContext } from "utils/myContext";
import classNames from "classnames";
import styles from "../style.module.scss";
import Link from "next/link";
import { routeConstant } from "routes/constants";
import { useSelector } from "react-redux";
import CustomButton from "components/common/customButton";
import ProfileDropdown from "components/common/headerComponents/profileDropdown";
import { Icons } from "assets";
import BecomeFellowModal from "modals/becomeFellowModal";
import { useRouter } from "next13-progressbar";
//import { UserType } from "utils/enum";

const DynamicActions = () => {
  const {
    auth: { isLoggedIn, user },
  } = useSelector((state: any) => state.root);
  const router = useRouter();
  const [becomeFellowModal, setBecomeFellowModal] = useState(false);

  const openFellowModal = () => {
    setBecomeFellowModal(true);
  };

  const closeFellowModal = () => {
    setBecomeFellowModal(false);
  };

  const handleNavigation = () => {
    
      router.push(routeConstant.fellow.dashboard.path);
    
  };

  return (
    <>
      <div
        className={classNames(
          styles.actionContainer,
          "gap-3 items-center flex"
        )}
      >
        {isLoggedIn ? (
          <>
            <ProfileDropdown
              user={{
                name: user?.first_name + " " + user?.last_name,
                email: user?.email,
                avatar: user?.profile_asset?.full_path,
              }}
            />
            <div className="hidden sm:block">
             
                <CustomButton
                  title="Go to Dashboard"
                  containerStyle="outlined-button-secondary"
                  onClick={handleNavigation}
                />
              
            </div>
          </>
        ) : (
          <>
            <Link
              href={routeConstant.login.path}
              className={classNames(styles.loginButton)}
            >
              Login
            </Link>
            <CustomButton
              title="Sign Up"
              containerStyle={classNames("xs:flex hidden text-nowrap")}
              onClick={() => {
                router.push(routeConstant.signUp.path);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(DynamicActions), {
  ssr: false,
  loading: () => {
    const value = useContext(MyContext);
    const { user } = value;

    return (
      <div
        className={classNames(
          styles.actionContainer,
          "gap-3 items-center hidden sm:flex"
        )}
      >
        {user?.isLoggedIn ? (
          <>
            <ProfileDropdown
              user={{
                name: user?.first_name + " " + user?.last_name,
                email: user?.email,
                avatar: user?.profile_asset,
              }}
            />
            <div className="hidden sm:block">
                <CustomButton
                  title="Go to Dashboard"
                  containerStyle="outlined-button-secondary"
                />
            </div>
          </>
        ) : (
          <>
            <Link
              href={routeConstant.login.path}
              className={classNames(styles.loginButton)}
            >
              Login
            </Link>
            <CustomButton
              title="Sign Up"
              containerStyle={classNames("xs:flex hidden text-nowrap")}
            />
          </>
        )}
      </div>
    );
  },
});
