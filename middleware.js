import { NextResponse } from "next/server";

export function middleware(req) {
  const cookie = req.cookies.get("PHPSESSID")?.value;

  console.log(cookie);

  if (!cookie) {
    // If no PHPSESSID cookie, redirect to login page
    return NextResponse.redirect(
      new URL("https://mybarlow.barlowresearch.com/login.php")
    );
  }

  // If cookie exists, allow to continue
  return NextResponse.next();
}
