import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieValue = req.cookies.get("testdrive_loggedin")?.value;
  const mask = 3243423;

  if (cookieValue && cookieValue.includes(":")) {
    const [maskedUserId, token] = cookieValue.split(":");
    const realUserId = parseInt(maskedUserId) - mask;

    return NextResponse.next();
  } else {
    console.log("testdrive_loggedin cookie missing or malformed:", cookieValue);

    const loginUrl = new URL("https://mybarlow.barlowresearch.com/login.php");

    // Force rd2 to use the production base domain
    const productionUrl = new URL(req.nextUrl.href);
    productionUrl.hostname = "testdrive2025.barlowresearch.com";
    productionUrl.protocol = "https:";
    productionUrl.port = ""; // remove :3000 if present

    loginUrl.searchParams.set("rd2", productionUrl.toString());

    return NextResponse.redirect(loginUrl);
  }
}
