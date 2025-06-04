import axios from "axios";
import https from "https";

const agent = new https.Agent({ rejectUnauthorized: false });

async function loginToFileMaker() {
  console.log("🧪 FM Username:", process.env.FILEMAKER_API_USERNAME);

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

function extractUserIdFromCookie(req) {
  const mask = 3243423;
  const cookieHeader = req.headers.get("cookie");
  let userId = "unknown";

  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => c.trim().split("="))
    );

    const cookieValue = cookies["testdrive_loggedin"];

    if (cookieValue && cookieValue.includes(":")) {
      const [maskedUserId] = cookieValue.split(":");
      userId = parseInt(maskedUserId) - mask;
    }
  }

  return userId;
}

export async function POST(req) {
  try {
    const token = await loginToFileMaker();
    const userId = extractUserIdFromCookie(req);

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
    });
    const interaction = `${timestamp} - Visited Home Page`;

    await axios.post(
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
    console.error("Error logging homepage visit (POST):", {
      message: err.message,
      responseStatus: err.response?.status,
      responseData: err.response?.data,
    });

    return new Response("Error", { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const token = await loginToFileMaker();
    const { interaction } = await req.json();
    const userId = extractUserIdFromCookie(req);

    if (!userId || !interaction) {
      return new Response("Missing user ID or interaction", { status: 400 });
    }

    // Step 1: Find latest record by UserID
    const findResponse = await axios.post(
      "https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/_find",
      {
        query: [{ UserID: userId }],
        sort: [{ fieldName: "CreationTimestamp", sortOrder: "descend" }],
        limit: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent: agent,
      }
    );

    const record = findResponse.data.response.data?.[0];
    const recordId = record?.recordId;

    if (!recordId) {
      return new Response("No matching record found", { status: 404 });
    }

    const previousLog = record.fieldData.InteractionLog || "";
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
    });
    const newLog = `${previousLog}\n${timestamp} - ${interaction}`;

    console.log(`********RecordID -> ${recordId}`);
    console.log(
      "🔧 PATCH URL:",
      `https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/records/${recordId}`
    );
    console.log("📝 New Log Preview:", newLog);

    // Step 2: Patch the record
    await axios.patch(
      `https://tdengine.barlowresearch.com/fmi/data/vLatest/databases/TestDrive2025Users/layouts/TestDrive2025Users/records/${recordId}`,
      {
        fieldData: {
          InteractionLog: newLog,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        httpsAgent: agent,
      }
    );

    return new Response("Interaction updated", { status: 200 });
  } catch (err) {
    console.error("Error updating interaction (PATCH):", {
      message: err.message,
      responseStatus: err.response?.status,
      responseData: err.response?.data,
    });

    return new Response(
      JSON.stringify({
        message: err.message,
        responseStatus: err.response?.status,
        responseData: err.response?.data,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
