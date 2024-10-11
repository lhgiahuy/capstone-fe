import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;

    if (pathname !== "/admin" && req.nextauth.token?.roleName === "admin") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        if (pathname.startsWith("/admin")) {
          return token?.roleName === "admin";
        }
        return true;
      },
    },
    pages: {
      signIn: "/admin/dang-nhap",
      error: "/error",
    },
  }
);

// Middleware to handle redirect for admins

export const config = { matcher: ["/admin", "/"] };
