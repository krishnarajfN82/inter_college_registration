const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const id = event.path.split("/").pop();
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: "Missing registration id." }) };

  const store = getStore("registrations");
  const record = await store.get(id, { type: "json" });
  if (!record) return { statusCode: 404, body: JSON.stringify({ error: "No such registration." }) };

  return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) };
};
