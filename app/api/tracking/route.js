import axios from "axios";
import https from "https";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("*******/api/tracking route triggered");

  try {
    const res = await axios.post(
      "https://mybarlow.barlowresearch.com/mybarlow/amplify-proxy.php",
      {}, // no body needed
      {
        withCredentials: true,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    if (res.data.success) {
      console.log("✅ Record created through PHP proxy.");
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.error("*********Proxy returned error:", res.data.error);
      return NextResponse.json(
        { success: false, error: res.data.error || "Unknown proxy error" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("********Network/Server error:", err.message);
    return NextResponse.json(
      { success: false, error: "Network error calling proxy" },
      { status: 500 }
    );
  }
}
