"use server";
//import { UserType } from "utils/enum";
import {
  publicRoutes,
  fellowRoutes,
  coachMentorRoutes,
  participantRoutes,
} from "./authRoutes";
import { routeConstant } from "./constants";

const getAuthentication = async (isLoggedIn: boolean, pathName: string) => {
  switch (isLoggedIn) {
    case true:
      switch (1) {
       
        default:
          return {
            path: routeConstant.fellow.dashboard.path,
            isAutherized: validatePath(participantRoutes, pathName),
          };
      }
    case false:
      return {
        path: routeConstant.home.path,
        isAutherized: validatePath(publicRoutes, pathName),
      };
    default:
      return {
        path: routeConstant.home.path,
        isAutherized: validatePath(publicRoutes, pathName),
      };
  }
};
const validatePath = (routeArr: [any], pathName: string) => {
  // Split the input path into segments
  const pathSegments = pathName.split("/").filter(Boolean);

  let match = true;

  for (let route of routeArr) {
    // Split the route path into segments
    const routeSegments = route.path.split("/").filter(Boolean);

    // If the input path has fewer segments than the route, skip this route
    if (pathSegments.length < routeSegments.length) {
      continue;
    }

    // Check if each segment matches, considering dynamic segments
    match = true;
    for (let i = 0; i < routeSegments.length; i++) {
      if (
        routeSegments[i] !== pathSegments[i] &&
        !routeSegments[i].startsWith(":")
      ) {
        match = false;
        break;
      }
    }

    if (
      routeSegments.length !== pathSegments.length &&
      routeSegments.length === 0
    ) {
      match = false;
    }

    // If the path matches the route pattern, return true
    if (match) {
      return true;
    }
  }

  // If no match is found, return false
  return false;
};
export { getAuthentication };
