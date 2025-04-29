import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieValue = req.cookies.get("testdrive_loggedin")?.value;
  const mask = 3243423;

  if (cookieValue && cookieValue.includes(":")) {
    const [maskedUserId, token] = cookieValue.split(":");
    const realUserId = parseInt(maskedUserId) - mask;

    console.log("Raw cookie value:", cookieValue);
    console.log("Real User ID:", realUserId);
    console.log("Token:", token);

    // ✅ Let request proceed
    return NextResponse.next();
  } else {
    console.log("testdrive_loggedin cookie missing or malformed:", cookieValue);
    return NextResponse.redirect(
      new URL("https://mybarlow.barlowresearch.com/login.php")
    );
  }
}
