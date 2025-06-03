import axios from "axios";
import https from "https";

export async function POST(req) {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    // Spoofed browser headers
    const spoofedHeaders = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    };

    // Step 1: Login to FileMaker API (with spoofed headers)
    const loginResponse = await axios.post(
      "https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/sessions",
      {},
      {
        auth: {
          username: "api_user",
          password: "pA!4rZu82&MxTqV9",
        },
        headers: spoofedHeaders,
        httpsAgent: agent,
      }
    );

    const token = loginResponse.data.response.token;

    // Step 2: Build the new log entry
    const userId = req.headers.get("x-user-id") || "unknown";
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
    });

    const interaction = `${timestamp} - Visited Home Page`;

    // Step 3: Create record in FileMaker (reuse spoofed headers + token)
    const createResponse = await axios.post(
      "https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/records",
      {
        fieldData: {
          UserID: userId,
          InteractionLog: interaction,
        },
      },
      {
        headers: {
          ...spoofedHeaders,
          Authorization: `Bearer ${token}`,
        },
        httpsAgent: agent,
      }
    );

    return new Response("Log entry created", { status: 200 });
  } catch (err) {
    console.error("Error logging homepage visit:", {
      message: err.message,
      code: err.code,
      responseData: err.response?.data,
      responseStatus: err.response?.status,
      requestData: err.config?.data,
      headers: err.config?.headers,
    });

    return new Response("Error", { status: 500 });
  }
}
