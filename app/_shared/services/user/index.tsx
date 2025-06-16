import { BaseURL, Endpoint } from "utils/endpoints";
import { HTTP_METHODS } from "utils/enum";
import { refreshTokenWrapper } from "utils/helper";

interface UserWithSkillsResponse {
  _id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_asset?: string | null;
  skills: string[]; // Explicitly include skills
  // ... other user fields
}

const UpdateProfileService = (payload: any) => {
  return refreshTokenWrapper({
    url: Endpoint.user.update,
    method: HTTP_METHODS.POST,
    payload,
  });
};

const GetUpdateUserService = () => {
  return refreshTokenWrapper({
    url: Endpoint.user.getUpdatedUser,
    method: HTTP_METHODS.GET,
  });
};

// New function to get user with skills
const GetUserWithSkills = (userId: string) => {
  return refreshTokenWrapper({
    url: `${Endpoint.user.getUser.replace(":id", userId)}?includeSkills=true`,
    method: HTTP_METHODS.GET,
  });
};

const AddFcmTokenService = (payload: { fcm_token: string }) => {
  return refreshTokenWrapper({
    url: Endpoint.user.addFcmToken,
    method: HTTP_METHODS.PATCH,
    payload,
  });
};

export {
  GetUpdateUserService,
  UpdateProfileService,
  AddFcmTokenService,
  GetUserWithSkills // Export the new function
};