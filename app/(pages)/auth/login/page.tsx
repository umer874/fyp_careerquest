"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import CustomInput from "components/common/customInput";
import Link from "next/link";
import CustomButton from "components/common/customButton";
import { Icons } from "assets";
import { useRouter } from "next13-progressbar";
import { routeConstant } from "routes/constants";
import { useDispatch } from "react-redux";
import { setAuthReducer } from "redux/reducers/authSlice";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import { LoginVS } from "utils/validation";
import AuthPageHeading from "components/auth/authPageHeading";
import { LoginService } from "services/auth";
import { handleErrors } from "utils/helper";
import axios from "axios";

//import { UserType } from "utils/enum";

const initialValues: LoginType = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: LoginVS,
    onSubmit: (values, actions) => {
      handleLogin(values);
    },
  });

  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
  } = formik;

 
const handleLogin = (values: LoginType) => {
  setSubmitting(true);

  // Simulated/fake user data
  const mockUser = {
    id: "123",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    type: "fellow",
    profile_asset: { full_path: "/images/profile.jpg" },
    resume_asset: { full_path: "/docs/resume.pdf" },
  };

  const mockAccessToken = "fakeAccessToken123";
  const mockRefreshToken = "fakeRefreshToken456";

  // Fake authentication check
  if (values.email === "anashamid992@gmail.com" && values.password === "#punjabians123") {
    dispatch(
      setAuthReducer({
        isLoggedIn: true,
        user: mockUser,
        token: mockAccessToken,
        refreshToken: mockRefreshToken,
      })
    );

    setCookie(
      "user",
      JSON.stringify({
        isLoggedIn: true,
        id: mockUser.id,
        first_name: mockUser.first_name,
        last_name: mockUser.last_name,
        email: mockUser.email,
        role: mockUser.type,
        profile_asset: mockUser.profile_asset.full_path,
        resume_asset: mockUser.resume_asset.full_path,
      }),
      {
        path: "/test",
        maxAge: 3600 * 24 * 30,
        sameSite: true,
      }
    );

    setCookie("token", mockAccessToken, {
      path: "/test",
      maxAge: 3600 * 24 * 30,
      sameSite: true,
    });

    setCookie("refreshToken", mockRefreshToken, {
      path: "/test",
      maxAge: 3600 * 24 * 30,
      sameSite: true,
    });

    router.push(routeConstant.test.path);
  } else {
    handleErrors({ message: "Invalid email or password." });
  }

  setSubmitting(false);
};



  return (
    <div className={classNames(styles.auth_page_container, "h-full")}>
      <div>
        <AuthPageHeading
          heading="Welcome back 👋🏼"
          desc="Please login to access exclusive features and make the most of your stay."
        />
        <div className={classNames(styles.auth_content_container)}>
          <form onSubmit={handleSubmit}>
            <div>
              <CustomInput
                required
                label="Email Address"
                type="email"
                name="email"
                Icon={Icons.Email}
                placeholder="e.g. abc@example.com"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                value={values.email}
                error={touched.email && errors.email ? errors.email : ""}
                onChange={handleChange("email")}
              />
              <CustomInput
                required
                label="Password"
                type="password"
                name="password"
                isPassword
                Icon={Icons.LockIcon}
                placeholder="Enter password"
                customInputStyle="white-bg-input"
                customInputContainer="white-bg-input-max-height"
                value={values.password}
                error={
                  touched.password && errors.password ? errors.password : ""
                }
                onChange={handleChange("password")}
              />
            </div>
            <div className="text-right">
              <Link href={routeConstant.forgotPassword.path}>
                Forgot password?
              </Link>
            </div>
            <div className="mt-4">
              <CustomButton
                title="Login"
                containerStyle="w-full bg-blue maxHeighted_btn"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </div>
          </form>
          <div className={classNames(styles.link_container)}>
            <p>Don’t have an account?</p>
            <Link href={routeConstant.signUp.path}>Sign Up</Link>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
