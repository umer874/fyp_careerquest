import { redirectBasedOnRole } from "utils/server-side-helper";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  let hasAccess: any = redirectBasedOnRole(request, request.nextUrl.pathname);
  if (!hasAccess.isAutherized && hasAccess.path !== request.nextUrl.pathname) {
    return NextResponse.redirect(new URL(hasAccess.path, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    
    // "/",
    // "/general/insights",
    // "/general/jobs/:path*",
    // "/general/events",
    // "/general/events/:path*",
    // "/general/contact",
    // "/general/profileSettings",
    // "/auth/login",
    // "/auth/forgotPassword",
    // "/auth/resetPassword",
    // "/auth/signUp",
    // "/fellow/chats",
    //"/fellow/portfolio/portfolio",
    //"/fellow/portfolio/project",
    //"/fellow/portfolio/resume",
    //"/fellow/portfolio/portfolio/:path*",
    //"/fellow/portfolio/project/:path*",
    // "/fellow/jobs",
    // "/fellow/jobs/:path*",
    // "/fellow/events",
    // "/fellow/events/:path*",
    // "/fellow/contact",
    // "/fellow/profileSettings",
    // "/coaches/chats",
    // "/coaches/fellow/:path*",
    // "/coaches/portfolio/:path*",
    // "/coaches/project/:path*",
    // "/coaches/profileSettings",
    // "/coaches/contact",
  ],
};
