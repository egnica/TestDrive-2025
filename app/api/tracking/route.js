import axios from "axios";
import https from "https";
import { cookies } from "next/headers"; // <- app router cookie access

const agent = new https.Agent({ rejectUnauthorized: false });

async function loginToFileMaker() {
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

  return loginResponse.data.response.token;
}

export async function POST(req) {
  try {
    const token = await loginToFileMaker();

    // 1. Parse interaction from the request body
    const { interaction } = await req.json();

    // 2. Try to get user ID from the header
    let userId = req.headers.get("x-user-id");

    // 3. If header is missing, fall back to cookie
    if (!userId) {
      const cookieStore = cookies();
      const cookieValue = cookieStore.get("testdrive_loggedin")?.value;
      const mask = 3243423;

      if (cookieValue && cookieValue.includes(":")) {
        const [maskedUserId] = cookieValue.split(":");
        userId = parseInt(maskedUserId) - mask;
      } else {
        console.warn("⚠️ Cookie missing or malformed:", cookieValue);
        return new Response("Unauthorized", { status: 401 });
      }
    }

    if (!interaction) {
      return new Response("Missing interaction", { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
    });
    const log = `${timestamp} - ${interaction}`;

    await axios.post(
      "https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/records",
      {
        fieldData: {
          UserID: userId,
          InteractionLog: log,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent: agent,
      }
    );

    return new Response("Interaction logged", { status: 200 });
  } catch (err) {
    console.error("Error logging interaction (POST):", {
      message: err.message,
      responseStatus: err.response?.status,
      responseData: err.response?.data,
    });

    return new Response("Error", { status: 500 });
  }
}
