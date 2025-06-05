"use client";
import classNames from "classnames";
import CustomButton from "components/common/customButton";
import { useRouter } from "next13-progressbar";
import { useSelector } from "react-redux";
import { routeConstant } from "routes/constants";
import styles from "./style.module.scss";

const SignUpButton = () => {
  const { auth } = useSelector((state: any) => state.root);
  const router = useRouter();

  const handleClick = () => {
    if (auth?.isLoggedIn) {
    } else {
      router.push(routeConstant.login.path);
    }
  };

  return (
    <>
      <CustomButton
        title="Sign Up for This Event"
        onClick={handleClick}
        containerStyle={classNames(styles.signUpButton)}
      />
    </>
  );
};

export default SignUpButton;
