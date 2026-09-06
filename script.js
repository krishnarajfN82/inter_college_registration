// ============================================================
// EDIT THIS BLOCK to configure your own symposium.
// ============================================================
const CONFIG = {
  apiBase: "/api",
  symposiumName: "TECHNOVA'26",
  baseFee: 100,
  includedEvents: 2,
  extraEventFee: 50,
  events: [
    { id: "hackathon", title: "Hackathon", cat: "tech", icon: "laptop", desc: "Build a working prototype against a themed problem statement in 12 hours.", fee: 150, timing: "9:00 AM", team: "Up to 4" },
    { id: "circuit-debugging", title: "Circuit Debugging", cat: "tech", icon: "bug", desc: "Spot and fix faults in a live circuit against the clock.", fee: 100, timing: "11:00 AM", team: "2" },
    { id: "tech-quiz", title: "Tech Quiz", cat: "tech", icon: "brain", desc: "Team-based quiz spanning general and departmental knowledge.", fee: 100, timing: "2:00 PM", team: "2" },
    { id: "paper-presentation", title: "Paper Presentation", cat: "tech", icon: "presentation", desc: "Present an original technical paper to a panel of judges.", fee: 100, timing: "10:00 AM", team: "2" },

    { id: "poster-designing", title: "Poster Designing", cat: "creative", icon: "palette", desc: "Design a poster on the theme announced on the day.", fee: 100, timing: "12:00 PM", team: "1" },
    { id: "photography", title: "Photography", cat: "creative", icon: "camera", desc: "Capture the day's best moments across campus.", fee: 100, timing: "All day", team: "1" },
    { id: "short-film", title: "Short Film Making", cat: "creative", icon: "film", desc: "Submit a short film on a prompt released a week in advance.", fee: 150, timing: "Submission", team: "Up to 5" },
    { id: "ad-mad", title: "Ad Mad Show", cat: "creative", icon: "megaphone", desc: "Pitch a mock ad campaign live on stage, props and all.", fee: 100, timing: "3:00 PM", team: "Up to 4" },

    { id: "bgmi", title: "BGMI", cat: "gaming", icon: "crosshair", desc: "Squad tournament, bracket-style knockout. Separate entry fee.", fee: 400, timing: "4:00 PM", team: "4" },
    { id: "free-fire", title: "Free Fire", cat: "gaming", icon: "target", desc: "Squad tournament, bracket-style knockout. Separate entry fee.", fee: 400, timing: "4:00 PM", team: "4" },
    { id: "smash-karts", title: "Smash Karts", cat: "gaming", icon: "kart", desc: "Fast-paced kart racing, knockout rounds on rotating tracks.", fee: 100, timing: "1:00 PM", team: "1" },
    { id: "chess", title: "Chess", cat: "gaming", icon: "chess", desc: "Rapid-format knockout bracket, standard FIDE rules.", fee: 50, timing: "10:00 AM", team: "1" },
  ],
};
// ============================================================

const CATEGORY_META = {
  tech: { label: "Technical", accent: "var(--cyan)" },
  creative: { label: "Creative", accent: "var(--magenta)" },
  gaming: { label: "Gaming", accent: "var(--amber)" },
};

// Small hand-drawn icon set (no external images, no third-party logos)
const ICONS = {
  laptop: `<path d="M4 5h16v10H4z" stroke="currentColor" stroke-width="1.6"/><path d="M2 18h20l-2 3H4l-2-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,
  bug: `<path d="M12 8a4 4 0 0 1 4 4v3a4 4 0 1 1-8 0v-3a4 4 0 0 1 4-4Z" stroke="currentColor" stroke-width="1.6"/><path d="M9 8 7 5m8 3 2-3M4 12h3m10 0h3M9 18l-2 3m8-3 2 3M12 8V5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  brain: `<path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-1 5.6V15a3 3 0 0 0 3 3h1M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 1 5.6V15a3 3 0 0 1-3 3h-1M9 4v14M15 4v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  presentation: `<path d="M3 4h18M12 16v4m-4 0h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4" stroke="currentColor" stroke-width="1.6"/><path d="M8 11l3-3 2 2 3-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  palette: `<path d="M12 3a9 8 0 1 0 0 16c1.5 0 2-1 2-2s-1-1.5-1-2.5S13.5 13 15 13h2a4 3.5 0 0 0 4-3.5C21 5.5 17 3 12 3Z" stroke="currentColor" stroke-width="1.6"/><circle cx="7.5" cy="10.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="7" r="1.1" fill="currentColor"/><circle cx="14" cy="7" r="1.1" fill="currentColor"/>`,
  camera: `<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.4" stroke="currentColor" stroke-width="1.6"/>`,
  film: `<rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16" stroke="currentColor" stroke-width="1.6"/>`,
  megaphone: `<path d="M3 10v4a1 1 0 0 0 1 1h2l1 4h2l-1-4h1l9 4V6l-9 4H4a1 1 0 0 0-1 1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M19 9a3 3 0 0 1 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  crosshair: `<circle cx="12" cy="12" r="7.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="currentColor"/>`,
  target: `<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="1" fill="currentColor"/>`,
  kart: `<circle cx="7" cy="17" r="2.2" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="17" r="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M4 17h1.5M17.5 17H20l-1.5-5H14l-2-3H7L5 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9l1.5 3h5L14 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  chess: `<path d="M9 20h6M8 20l1-4h6l1 4M10 16l-.5-3h5l-.5 3M9.5 13c-1-1-1-2.5 0-3.5S11 8 11 6.5c0-.8-.3-1.3-.7-1.7M14.5 13c1-1 1-2.5 0-3.5S13 8 13 6.5c0-.8.3-1.3.7-1.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const state = { selectedEvents: new Set(), submitting: false };

const $ = (sel) => document.querySelector(sel);
const eventGrid = $("#eventGrid");
const eventPicker = $("#eventPicker");
const feeTotal = $("#feeTotal");
const regForm = $("#regForm");
const formError = $("#formError");
const submitBtn = $("#submitBtn");
const downloadBtn = $("#downloadBtn");
const modal = $("#eventModal");

function iconSvg(name) {
  return `<svg viewBox="0 0 24 24" fill="none">${ICONS[name] || ICONS.crosshair}</svg>`;
}

function renderEventGrid(filter = "all") {
  const items = CONFIG.events.filter((e) => filter === "all" || e.cat === filter);
  eventGrid.innerHTML = items
    .map((e) => {
      const meta = CATEGORY_META[e.cat];
      return `
      <button class="event-card" style="--accent:${meta.accent}" data-id="${e.id}">
        <div class="event-card__art">${iconSvg(e.icon)}</div>
        <div class="event-card__body">
          <p class="event-card__cat">${meta.label}</p>
          <p class="event-card__title">${e.title}</p>
          <p class="event-card__desc">${e.desc}</p>
          <div class="event-card__foot"><span>₹${e.fee}</span><span>${e.timing}</span></div>
        </div>
      </button>`;
    })
    .join("");

  eventGrid.querySelectorAll(".event-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.id));
  });
}

function openModal(id) {
  const e = CONFIG.events.find((ev) => ev.id === id);
  if (!e) return;
  const meta = CATEGORY_META[e.cat];
  $("#modalCat").textContent = meta.label;
  $("#modalCat").style.color = meta.accent;
  $("#modalTitle").textContent = e.title;
  $("#modalDesc").textContent = e.desc;
  $("#modalFee").textContent = `₹${e.fee}`;
  $("#modalTiming").textContent = e.timing;
  $("#modalTeam").textContent = e.team;
  $("#modalRegister").onclick = () => {
    closeModal();
    document.querySelector("#register").scrollIntoView({ behavior: "smooth" });
    const cb = eventPicker.querySelector(`input[value="${id}"]`);
    if (cb && !cb.checked) { cb.checked = true; cb.dispatchEvent(new Event("change")); }
  };
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (ev) => { if (ev.target === modal) closeModal(); });
document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") closeModal(); });

function renderEventPicker() {
  eventPicker.innerHTML = CONFIG.events
    .map((e) => `<label data-id="${e.id}"><input type="checkbox" name="events" value="${e.id}">${e.title}</label>`)
    .join("");
}

function updateFee() {
  const n = state.selectedEvents.size;
  const extra = Math.max(0, n - CONFIG.includedEvents);
  const total = CONFIG.baseFee + extra * CONFIG.extraEventFee;
  feeTotal.textContent = `₹${total}`;
  return total;
}

function updateBadgePreview() {
  $("#badgeName").textContent = $("#fullName").value.trim() || "Your name";
  $("#badgeCollege").textContent = $("#college").value.trim() || "Your college";
  const chosen = CONFIG.events.filter((e) => state.selectedEvents.has(e.id));
  $("#badgeEvents").innerHTML = chosen.map((e) => `<span>${e.title}</span>`).join("");
}

document.querySelectorAll(".event-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".event-tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderEventGrid(tab.dataset.cat);
  });
});

eventPicker.addEventListener("change", (ev) => {
  const target = ev.target;
  if (target.name !== "events") return;
  const label = target.closest("label");
  if (target.checked) { state.selectedEvents.add(target.value); label.classList.add("is-checked"); }
  else { state.selectedEvents.delete(target.value); label.classList.remove("is-checked"); }
  updateFee();
  updateBadgePreview();
});

["fullName", "college"].forEach((id) => $(`#${id}`).addEventListener("input", updateBadgePreview));

regForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  formError.textContent = "";

  if (state.selectedEvents.size === 0) {
    formError.textContent = "Pick at least one event.";
    return;
  }

  const payload = {
    fullName: $("#fullName").value.trim(),
    email: $("#email").value.trim(),
    phone: $("#phone").value.trim(),
    college: $("#college").value.trim(),
    department: $("#department").value.trim(),
    events: Array.from(state.selectedEvents),
    fee: updateFee(),
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Generating…";

  try {
    const res = await fetch(`${CONFIG.apiBase}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed. Try again.");

    $("#badgeStatus").textContent = "Confirmed";
    $("#badgeStatus").classList.add("is-confirmed");
    $("#badgeId").textContent = data.registrationId;
    $("#badgeQr").innerHTML = `<img src="${data.qrCode}" alt="Registration QR code">`;
    downloadBtn.hidden = false;
    submitBtn.textContent = "Registered ✓";
  } catch (err) {
    formError.textContent = err.message;
    submitBtn.disabled = false;
    submitBtn.textContent = "Generate my badge";
  }
});

downloadBtn.addEventListener("click", async () => {
  if (typeof html2canvas !== "function") return;
  const canvas = await html2canvas($("#badge"), { backgroundColor: null, scale: 2 });
  const link = document.createElement("a");
  link.download = `${CONFIG.symposiumName.replace(/[^a-z0-9]/gi, "-")}-badge.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// ---- effects: count-up stats + scroll reveal ----
function animateCount(el) {
  const target = Number(el.dataset.count || 0);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".stat__num").forEach(animateCount);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
const statsBlock = document.querySelector(".hero__stats");
if (statsBlock) statObserver.observe(statsBlock);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

renderEventGrid();
renderEventPicker();
updateFee();
updateBadgePreview();
