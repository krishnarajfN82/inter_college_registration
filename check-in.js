const { getStore } = require("@netlify/blobs");

const ADMIN_KEY = process.env.ADMIN_KEY || "changeme";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed." }) };
  }
  const key = event.headers["x-admin-key"] || (event.queryStringParameters || {}).key;
  if (key !== ADMIN_KEY) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid admin key." }) };
  }

  // path is .../functions/check-in/<registrationId>
  const parts = event.path.split("/").filter(Boolean);
  const regId = parts[parts.length - 1];

  const store = getStore("registrations");
  const record = await store.get(regId, { type: "json" });
  if (!record) return { statusCode: 404, body: JSON.stringify({ error: "No such registration." }) };

  record.checkedIn = true;
  record.checkedInAt = new Date().toISOString();
  await store.setJSON(regId, record);

  return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true }) };
};
