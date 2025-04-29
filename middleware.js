import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieValue = req.cookies.get("testdrive_loggedin")?.value;

  if (cookieValue) {
    const [maskedUserId, token] = cookieValue.split(":");

    const mask = 3243423; // Must match your PHP code
    const realUserId = parseInt(maskedUserId) - mask;

    console.log("Real User ID:", realUserId);
    console.log("Token:", token);
  }

  return NextResponse.next();
}
