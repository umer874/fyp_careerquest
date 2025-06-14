"use client";
import { AxiosResponse } from "axios";
import { toastMessage } from "components/common/toast";
import { jwtDecode } from "jwt-decode";
import { resetAuthReducer, setAuthReducer } from "redux/reducers/authSlice";
import { store } from "redux/store";
import { routeConstant } from "routes/constants";
import { Endpoint } from "./endpoints";
import { HTTP_METHODS, SUPPORTED_FORMATS } from "./enum";
import { HTTP_CLIENT } from "./interceptor";
import { RefreshWrapperType } from "_shared/types/auth";

function normalizePath(path: string): string {
  return path.split("?")[0].replace(/\/$/, "");
}

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  } else {
    return {
      width: 0,
      height: 0,
    };
  }
}

function isImage(filetype: string): boolean {
  if (SUPPORTED_FORMATS.includes(filetype)) {
    return true;
  } else {
    return false;
  }
}

function findScreenTitle(
  pathname: string,
  routesArr: {
    path: string;
    title: string;
  }[]
): string {
  const normalizedPath = normalizePath(pathname);

  const matchedRoute = Object.values(routesArr).find(
    (item) => item.path === normalizedPath
  );

  if (!matchedRoute) {
    console.warn(`No matching route found for pathname: ${normalizedPath}`);
    return "";
  }

  return matchedRoute.title || "Untitled";
}

const resetRedux = () => {
  const stateBefore = store.getState().root.auth;

  console.log("Before reset:");
  console.log("isLoggedIn:", stateBefore?.isLoggedIn);
  console.log("token:", stateBefore?.token);
  console.log("refreshToken:", stateBefore?.refreshToken);

  if (stateBefore?.isLoggedIn || stateBefore?.token) {
    store.dispatch(resetAuthReducer());

    // Clear cookies
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }

    const stateAfter = store.getState().root.auth;

    console.log("After reset:");
    console.log("isLoggedIn:", stateAfter?.isLoggedIn);
    console.log("token:", stateAfter?.token);
    console.log("refreshToken:", stateAfter?.refreshToken);
  } else {
    console.log("No token or login found to reset.");
  }
};



function getTopPosition(divElement: HTMLElement) {
  const rect = divElement.getBoundingClientRect();
  const top = rect.top - document.documentElement.clientTop;
  return top;
}

function getLeftPosition(divElement: HTMLElement) {
  const rect = divElement.getBoundingClientRect();
  const left = rect.left - document.documentElement.clientLeft;
  return left;
}

function handleErrors(err: any) {
  if (typeof err?.response?.data.message === "object") {
    for (let i = 0; i < err?.response?.data.message.length; i++) {
      toastMessage("error", err?.response?.data.message[i]);
    }
  } else {
    toastMessage("error", err?.response?.data.message);
  }
}

const formatTime = (time: string) => {
  let [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert to 12-hour format
  return `${hour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
};

function convertTime(startTime: string, endTime: string) {
  // Create a function to format time

  // Format both times
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  // Combine into desired format
  return `${formattedStartTime.split(" ")[0]} - ${formattedEndTime}`;
}

const RefreshTokensServiceClient = async (payload: {
  refreshToken: string;
}) => {
  return HTTP_CLIENT.post(Endpoint.auth.refreshToken, payload);
};

async function GenerateRequest({
  url,
  method,
  payload,
}: RefreshWrapperType): Promise<AxiosResponse<any, any>> {
  if (method === HTTP_METHODS.GET) {
    return HTTP_CLIENT.get(url);
  } else if (method === HTTP_METHODS.POST) {
    return HTTP_CLIENT.post(url, payload);
  } else if (method === HTTP_METHODS.PUT) {
    return HTTP_CLIENT.put(url, payload);
  } else if (method === HTTP_METHODS.DELETE) {
    return HTTP_CLIENT.delete(url);
  } else if (method === HTTP_METHODS.PATCH) {
    return HTTP_CLIENT.patch(url, payload);
  } else {
    return HTTP_CLIENT.get(url);
  }
}

async function refreshTokenWrapper({
  url,
  method,
  payload,
}: RefreshWrapperType): Promise<AxiosResponse<any, any>> {
  const {
    auth: { token, refreshToken, user },
  } = store.getState().root;
  if (token) {
    let decodedToken: any = jwtDecode(token);
    let currentDate = new Date();
    if (decodedToken?.exp * 1000 < currentDate.getTime()) {
      const {
        status,
        data: { data },
      } = await RefreshTokensServiceClient({
        refreshToken,
      });
      if (!status) {
        resetRedux();
      } else {
        const refreshTokenAge = 3600 * 24;
        const accessTokenAge = 3600;
        store.dispatch(
          setAuthReducer({
            isLoggedIn: true,
            user: user,
            token: data?.accessToken,
            refreshToken: data?.refreshToken,
          })
        );
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify({
            isLoggedIn: true,
            id: user?.id,
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            role: user?.type,
            profile_asset: user?.profile_asset?.full_path ?? "",
          })
        )}; path=/; max-age=${refreshTokenAge}; sameSite=${true}`;

        document.cookie = `token=${
          data?.accessToken
        }; path=/; max-age=${accessTokenAge}; sameSite=${true}`;

        document.cookie = `refreshToken=${
          data?.refreshToken
        }; path=/; max-age=${refreshTokenAge}; sameSite=${true}`;
      }

      return GenerateRequest({ url, method, payload });
    } else {
      return GenerateRequest({ url, method, payload });
    }
  } else {
    return GenerateRequest({ url, method, payload });
  }
}

function setTokens(token: string, refreshToken: string) {
  const {
    auth: { user },
  } = store.getState().root;
  const refreshTokenAge = 3600 * 24;
  const accessTokenAge = 3600;
  store.dispatch(
    setAuthReducer({
      isLoggedIn: true,
      user: user,
      token: token,
      refreshToken: refreshToken,
    })
  );
  document.cookie = `user=${encodeURIComponent(
    JSON.stringify({
      isLoggedIn: true,
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      role: user?.type,
      profile_asset: user?.profile_asset?.full_path ?? "",
    })
  )}; path=/; max-age=${refreshTokenAge}; sameSite=${true}`;

  document.cookie = `token=${token}; path=/; max-age=${accessTokenAge}; sameSite=${true}`;

  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${refreshTokenAge}; sameSite=${true}`;
}

const handleGetFilteredPathname = (newParams: Record<string, string>) => {
  const url = new URL(window.location.href);
  const queryParams = url.searchParams;

  // Convert searchParams to an object
  const queryObject = Object.fromEntries(queryParams.entries());

  // Merge existing query params with the new params
  const mergedQueryObject = { ...queryObject, ...newParams };

  // Build the query string
  const queryString = Object.entries(mergedQueryObject)
    .filter(
      ([_, value]) => value !== null && value !== undefined && value !== "" // Skip empty values
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return url.pathname + (queryString ? "?" + queryString : "");
};

export {
  convertTime,
  findScreenTitle,
  getLeftPosition,
  getTopPosition,
  getWindowDimensions,
  handleErrors,
  isImage,
  refreshTokenWrapper,
  resetRedux,
  setTokens,
  handleGetFilteredPathname,
  formatTime,
};
