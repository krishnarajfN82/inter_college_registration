const { getStore } = require("@netlify/blobs");

const ADMIN_KEY = process.env.ADMIN_KEY || "changeme";

exports.handler = async (event) => {
  const key = event.headers["x-admin-key"] || (event.queryStringParameters || {}).key;
  if (key !== ADMIN_KEY) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid admin key." }) };
  }

  const store = getStore("registrations");
  const { blobs } = await store.list();
  const records = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
  records.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(records) };
};
