"use server";
import cookie from "cookie";
import { jwtDecode } from "jwt-decode";
import { getAuthentication } from "routes/helper";
import { BaseURL, Endpoint } from "./endpoints";
import { cookies } from "next/headers";
import axios from "axios";

export const SERVER_HTTP_CLIENT = axios.create({
  baseURL: BaseURL,
  timeout: 30000,
});

function parseCookies(req: any) {
  return cookie.parse(
    req
      ? req.headers.cookie || req.headers.get("cookie") || "" || ""
      : document.cookie
  );
}

const getDataFromCookies = (req: any, key: string) => {
  if (Object.keys(req).includes(key)) {
    return JSON.parse(req[key]);
  } else {
    return { isLoggedIn: false };
  }
};

const redirectBasedOnRole = async (req: any, pathName: string) => {
  if (req) {
    const persistState = getDataFromCookies(parseCookies(req), "user");

    const isAuthenticated = await getAuthentication(
      persistState.isLoggedIn,
      pathName
    );

    return isAuthenticated;
  }
};


const RefreshTokensService = (payload: { refreshToken: string }) => {
  return fetch(BaseURL + Endpoint.auth.refreshToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

async function apiCallWithToken(
  url: string,
  token: string,
  refreshToken: string,
  options: RequestInit = {}
) {
  let updatedToken = token,
    updatedRefreshToken = refreshToken,
    is_token_updated = false,
    status = 200;

  if (token) {
    const response = await refreshServerToken(token, refreshToken);
    updatedToken = response.updatedToken;
    updatedRefreshToken = response.updatedRefreshToken;
    is_token_updated = response.is_token_updated;
    status = response.status;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${updatedToken}`,
    },
  });

  let responseJson;

  try {
    // Only try to parse as JSON if content-type is JSON
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      responseJson = await res.json();
    } else {
      const text = await res.text(); // log it for debugging
      throw new Error(
        `Expected JSON but received: ${text.slice(0, 100)}...`
      );
    }
  } catch (error) {
    console.error("Error parsing response JSON:", error);
    throw error; // rethrow for caller to handle
  }

  return {
    updatedToken: {
      token: updatedToken,
      refreshToken: updatedRefreshToken,
      is_token_updated,
      status,
    },
    response: responseJson,
  };
}


const refreshServerToken = async (token: string, refreshToken: string) => {
  let decodedToken: any = jwtDecode(token);
  let currentDate = new Date();
  if (decodedToken?.exp * 1000 < currentDate.getTime()) {
    if (refreshToken) {
      const response = await RefreshTokensService({ refreshToken });
      if (response.ok) {
        const { data } = await response.json();
        return {
          status: 200,
          is_token_updated: true,
          updatedToken: data?.accessToken,
          updatedRefreshToken: data?.refreshToken,
        };
      } else {
        return {
          status: 401,
          is_token_updated: false,
          error: "Token refresh failed",
          updatedToken: token,
          updatedRefreshToken: refreshToken,
        };
      }
    } else {
      return {
        status: 401,
        is_token_updated: false,
        error: "No refresh token available",
        updatedToken: token,
        updatedRefreshToken: refreshToken,
      };
    }
  } else {
    return {
      status: 200,
      is_token_updated: false,
      updatedToken: token,
      updatedRefreshToken: refreshToken,
    };
  }
};

// async function GetCookieUser() {
//   const nextCookies = await cookies();
//   const userCookie = nextCookies.get("user");
//   const user = JSON.parse(userCookie?.value ? userCookie.value : "{}");

//   console.log("===== Server-Side User Cookie =====");
//   console.log("User Cookie Value:", userCookie?.value);
//   console.log("Parsed User Object:", user);
//   console.log("===================================");

//   return user;
// }

async function getUserIdFromToken(token: string) {
  try {
    //const decoded: any = jwtDecode(token);
    //return decoded.id; // Ensure your JWT contains user ID
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
}

async function GetTokensFromCookies() {
  const nextCookies = await cookies();
  const tokenCookie = nextCookies.get("token");
  const refreshTokenCookie = nextCookies.get("refreshToken");

  const token = tokenCookie?.value ?? "";
  const refreshToken = refreshTokenCookie?.value ?? "";

  console.log("===== Server-Side Cookie Values =====");
  console.log("Access Token:", token);
  console.log("Refresh Token:", refreshToken);
  console.log("=====================================");

  return { token, refreshToken };
}

export {
  redirectBasedOnRole,
  apiCallWithToken,
  refreshServerToken,
  getUserIdFromToken,
  //GetCookieUser,
  GetTokensFromCookies,
};
