import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieValue = req.cookies.get("testdrive_loggedin")?.value;

  if (cookieValue) {
    const [userId, token] = cookieValue.split(":");

    console.log("User ID:", userId);
    console.log("Login token:", token);
  }

  return NextResponse.next();
}
