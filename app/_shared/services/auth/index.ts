import { Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
import { HTTP_CLIENT } from "utils/interceptor";

// const LoginService = (payload: LoginType) => {
//   return HTTP_CLIENT.post(Endpoint.auth.login, payload);
// };

// const LoginService = (payload: LoginType) => {
//   return HTTP_CLIENT.post("/api/auth/login", payload); // Now points to your own route
// };


const LoginService = (payload: LoginType) => {
  return HTTP_CLIENT.post("https://dev-career-labs.upworkdeveloper.com/api/auth/login", payload);
};

const RegisterService = (payload: any) => {
  return HTTP_CLIENT.post(Endpoint.auth.register, payload);
};

const ForgotPasswordService = (payload: { email: string }) => {
  return HTTP_CLIENT.post(Endpoint.auth.resetRequest, payload);
};

const ResetPasswordService = (payload: { password: string; token: string }) => {
  return HTTP_CLIENT.post(Endpoint.auth.resetPassword, payload);
};

const UpdatePasswordService = (payload: {
  current_password: string;
  password: string;
}) => {
  return refreshTokenWrapper({
    url: Endpoint.auth.updatePassword,
    method: HTTP_METHODS.PATCH,
    payload,
  });
};

export {
  LoginService,
  RegisterService,
  ForgotPasswordService,
  ResetPasswordService,
  UpdatePasswordService,
};
