import axios from "axios";
import https from "https";

export async function POST(req) {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    console.log("🔍 ENV USERNAME:", process.env.FILEMAKER_API_USERNAME);
    console.log("🔍 ENV PASSWORD:", process.env.FILEMAKER_API_PASSWORD);

    // Step 1: Login to FileMaker API
    const loginResponse = await axios.post(
      "https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/sessions",
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
      "https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/records",
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
