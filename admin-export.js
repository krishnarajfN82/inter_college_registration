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

  const header = "id,full_name,email,phone,college,department,events,fee,checked_in,created_at\n";
  const lines = records.map((r) =>
    [r.id, r.fullName, r.email, r.phone, r.college, r.department, r.events.join("|"), r.fee, r.checkedIn, r.createdAt]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=registrations.csv",
    },
    body: header + lines.join("\n"),
  };
};
