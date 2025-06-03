import axios from "axios";
import https from "https";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("📌 /api/tracking route triggered");

  // Setup agent to bypass SSL verification (temporary dev workaround)
  const agent = new https.Agent({ rejectUnauthorized: false });

  // Extract user ID from header or fallback
  const userId = req.headers.get("x-user-id") || 99999;

  try {
    const createResponse = await axios.post(
      "https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/records",
      {
        fieldData: {
          user_id: userId,
        },
      },
      {
        httpsAgent: agent,
        auth: {
          // username: process.env.FILEMAKER_API_USERNAME,
          // password: process.env.FILEMAKER_API_PASSWORD,
          username: "api_user",
          password: "pA!4rZu82&MxTqV9",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Record created:", createResponse.data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error in /api/tracking:", {
      message: error.message,
      response: error.response?.data || {},
      status: error.response?.status,
      headers: error.config?.headers,
      dataSent: JSON.stringify(error.config?.data),
    });

    return NextResponse.json(
      { success: false, error: "Failed to create record" },
      { status: 500 }
    );
  }
}
