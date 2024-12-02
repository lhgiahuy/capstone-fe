import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;
    if (
      !pathname.startsWith("/admin") &&
      req.nextauth.token?.roleName === "admin"
    ) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    if (req.nextauth.token && pathname.startsWith("/dang-nhap")) {
      return Response.redirect(new URL("/", req.url));
    }
    if (
      !pathname.startsWith("/moderator") &&
      req.nextauth.token?.roleName === "moderator" &&
      pathname !== "/thong-tin-ca-nhan"
    ) {
      url.pathname = "/moderator";
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/admin") && pathname !== "/admin/dang-nhap") {
          return token?.roleName === "admin";
        }
        if (
          pathname.startsWith("/moderator") &&
          pathname !== "/admin/dang-nhap"
        ) {
          return token?.roleName === "moderator";
        }
        if (
          pathname.startsWith("/organizer") &&
          pathname !== "/organizer/dang-ky"
        ) {
          return token?.roleName === "organizer";
        }
        return true;
      },
    },
    pages: {
      signIn: "/dang-nhap",
      error: "/error",
    },
  }
);

// Middleware to handle redirect for admins

export const config = {
  matcher: ["/((?!api|_next/static|_next/images|favicon.ico|.*\\..*).*)"],
};
