import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";
//import { apiCallWithToken } from "utils/server-side-helper";

const UpdateProfileService = (payload: any) => {
  return refreshTokenWrapper({
    url: Endpoint.user.update,
    method: HTTP_METHODS.POST,
    payload,
  });
};

// const ApplyFellowShipService = (payload: ApplyFellowShipType) => {
//   let obj: any = {
//     reason: payload.reason,
//   };
//   return refreshTokenWrapper({
//     url: Endpoint.user.applyFellowship,
//     method: HTTP_METHODS.POST,
//     payload: obj,
//   });
// };

const GetUpdateUserService = () => {
  return refreshTokenWrapper({
    url: Endpoint.user.getUpdatedUser,
    method: HTTP_METHODS.GET,
  });
};

// const AddUpdateResumeService = (payload: any) => {
//   return refreshTokenWrapper({
//     url: Endpoint.user.addUpdateResume,
//     method: HTTP_METHODS.PATCH,
//     payload,
//   });
// };

// const DeleteResumeService = () => {
//   return refreshTokenWrapper({
//     url: Endpoint.user.deleteResume,
//     method: HTTP_METHODS.DELETE,
//   });
// };

const GetUserDetailServerCall = async ({
  token,
  userId,
  refreshToken,
}: {
  token: string;
  userId: string;
  refreshToken: string;
}) => {
  let url = BaseURL + Endpoint.user.getUser.replace(":id", userId.toString());
  // return await apiCallWithToken(url, token ?? "", refreshToken ?? "", {
  //   method: "POST",
  //   headers: {
  //     Authorization: "Bearer " + token,
  //     "Content-Type": "application/json",
  //   },
  //   cache: "no-store",
  // });
};

const AddFcmTokenService = (payload: { fcm_token: string }) => {
  return refreshTokenWrapper({
    url: Endpoint.user.addFcmToken,
    method: HTTP_METHODS.PATCH,
    payload,
  });
};

export {
  // AddUpdateResumeService,
  // ApplyFellowShipService,
  // DeleteResumeService,
  GetUpdateUserService,
  GetUserDetailServerCall,
  UpdateProfileService,
  AddFcmTokenService,
};
