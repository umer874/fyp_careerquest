import { EducationType,ExperienceType } from "./general";

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  address:string;
  email: string;
  dob: string;
  phone: string;
  coordinates?: number[];
  checked: boolean;
  file: File | null;
};

export type CreatePasswordType = {
  password: string;
  confirmPassword: string;
};

export type UpdatePasswordType = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type UpdateProfileType = {
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

export type UpdateEducationType = {
  educations: EducationType[] | [];
};

export type UpdateExperienceType = {
  exps: ExperienceType[] | [];
};

export type RefreshToken = {
  status: number;
  is_token_updated: boolean;
  token: string;
  refreshToken: string;
};

export type RefreshWrapperType = {
  url: string;
  method: string;
  payload?: any;
};
