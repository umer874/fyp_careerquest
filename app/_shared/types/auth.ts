type LoginType = {
  email: string;
  password: string;
};

type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phone: string;
  coordinates?: number[];
  checked: boolean;
  file: File | null;
};


type CreatePasswordType = {
  password: string;
  confirmPassword: string;
};

type UpdatePasswordType = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

type UpdateProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  address: string;
  phone: string;
  coordinates: number[];
  file: File | null;
  profileAsset: string;
};

type UpdateEducationType = {
  educations: EducationType[] | [];
};

type UpdateExperienceType = {
  exps: ExperienceType[] | [];
};

type RefreshToken = {
  status: number;
  is_token_updated: boolean;
  token: string;
  refreshToken: string;
};

type RefreshWrapperType = {
  url: string;
  method: string;
  payload?: any;
};
