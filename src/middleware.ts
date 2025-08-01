import { NextResponse, NextRequest } from "next/server";
import { validateToken } from "./lib/api/server/auth/validateToken";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;

  if (token) {
    const isAuthed = await validateToken(token);

    if (!isAuthed) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }

    const unAuthorizedPathnames = ["/login", "/signup"];
    const isUnAuthorized = unAuthorizedPathnames.some(
      (path) => pathname === path,
    );
    if (isUnAuthorized) {
      return NextResponse.redirect(new URL("/home/overview", request.url));
    }
  }

  if (!token) {
    const protectedPathnames = ["/home"];
    const isProtected = protectedPathnames.some((path) =>
      pathname.startsWith(path),
    );
    if (isProtected)
      return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/login", "/signup"],
};
