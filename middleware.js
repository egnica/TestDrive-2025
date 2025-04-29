import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieValue = req.cookies.get("testdrive_loggedin")?.value;
  console.log("Raw cookie value:", cookieValue);

  if (cookieValue) {
    const [maskedUserId, token] = cookieValue.split(":");
    const realUserId = parseInt(maskedUserId) - 3243423;

    console.log("Real User ID:", realUserId);
    console.log("Token:", token);
  } else {
    console.log("No testdrive_loggedin cookie found.");
  }

  return NextResponse.next();
}
