import { NextResponse } from "next/server";

export function middleware(req) {
  const allCookies = req.cookies.getAll();

  console.log("All cookies:", allCookies);

  const sessionCookie = req.cookies.get("PHPSESSID")?.value;
  console.log("PHPSESSID cookie:", sessionCookie);

  return NextResponse.next();
}
