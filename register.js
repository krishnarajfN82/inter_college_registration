const { getStore } = require("@netlify/blobs");
const QRCode = require("qrcode");
const crypto = require("crypto");

function makeRegistrationId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `TN26-${stamp}-${rand}`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed." }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { fullName, email, phone, college, department, events, fee } = body;

    if (!fullName || !email || !phone || !college || !Array.isArray(events) || events.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields." }) };
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Enter a valid email." }) };
    }

    const id = makeRegistrationId();
    const record = {
      id,
      fullName,
      email,
      phone,
      college,
      department: department || "",
      events,
      fee: Number.isFinite(fee) ? fee : 0,
      checkedIn: false,
      checkedInAt: null,
      createdAt: new Date().toISOString(),
    };

    const store = getStore("registrations");
    await store.setJSON(id, record);

    const qrPayload = JSON.stringify({ id, name: fullName, events });
    const qrCode = await QRCode.toDataURL(qrPayload, { margin: 1, width: 320 });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId: id, qrCode }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Something went wrong. Please try again." }) };
  }
};
