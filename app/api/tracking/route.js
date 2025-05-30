import axios from "axios";
import https from "https";

export async function POST(req) {
  console.log("📌 /api/tracking route triggered");
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    // Step 1: Login to FileMaker API
    const loginResponse = await axios.post(
      "https://database.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/sessions",
      {},
      {
        auth: {
          username: process.env.FILEMAKER_API_USERNAME,
          password: process.env.FILEMAKER_API_PASSWORD,
        },
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

    // Step 3: Create record in FileMaker
    const createResponse = await axios.post(
      "https://database.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/records",
      {
        fieldData: {
          UserID: userId,
          InteractionLog: interaction,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent: agent,
      }
    );

    return new Response("Log entry created", { status: 200 });
  } catch (err) {
    console.error("🔥 Error in /api/tracking:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      headers: err.config?.headers,
      dataSent: err.config?.data,
    });

    return new Response("Internal Server Error", { status: 500 });
  }
}
