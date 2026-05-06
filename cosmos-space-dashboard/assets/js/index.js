// WRITE YOUR JS CODE HERE
const sections = document.querySelectorAll("section");
const navBtn = document.querySelectorAll("nav a");
const dateInput = document.getElementById("apod-date-input");
const imageElement = document.getElementById("apod-image");
const loadingElement = document.getElementById("apod-loading");
const searchBtn = document.getElementById("load-date-btn");
const todayBtn = document.getElementById("today-apod-btn");
let textDate = document.getElementById("selected-date");
let todayDate = new Date().toISOString().split("T")[0];
if (dateInput) dateInput.value = todayDate;
const today = new Date().toISOString().split("T")[0];
dateInput.max = today;

// ! ============================= Nav Btn =============================
navBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    sections.forEach((sec) => sec.classList.add("hidden"));
    document.getElementById(btn.dataset.section).classList.remove("hidden");
    navBtn.forEach((b) => {
      b.classList.remove("bg-blue-500/10", "text-blue-400");
      b.classList.add("text-slate-300");
    });
    btn.classList.add("bg-blue-500/10", "text-blue-400");
    btn.classList.remove("text-slate-300");
  });
});

// ! ============================= Get Space =============================
async function getSpace(date) {
  try {
    if (loadingElement) loadingElement.classList.remove("hidden");
    if (imageElement) imageElement.classList.add("hidden");

    document.getElementById("apod-explanation").innerHTML = "loading...";
    document.getElementById("apod-date-detail").innerHTML = `<span><i class="far fa-calendar mr-2"></i>loading...</span>`;
    document.getElementById("apod-date-info").innerHTML = "loading...";
    document.getElementById("apod-date").innerHTML = `Astronomy Picture of the Day - loading...`;
    document.getElementById("apod-title").innerHTML = "";

    const respons = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=RB7HpZfR4cjJIPdLD24s4zjf750o28R677LLY4rw&date=${date}`
    );
    const data = await respons.json();

    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    imageElement.onload = () => {
      if (loadingElement) loadingElement.classList.add("hidden");
      if (imageElement) imageElement.classList.remove("hidden");
      document.getElementById("apod-explanation").innerHTML = data.explanation || "";
      document.getElementById("apod-date-detail").innerHTML = `<span><i class="far fa-calendar mr-2"></i>${data.date}</span>`;
      document.getElementById("apod-date-info").innerHTML = data.date || "";
      document.getElementById("apod-date").innerHTML = `Astronomy Picture of the Day - ${formattedDate}`;
      document.getElementById("apod-title").innerHTML = data.title || "";
      document.getElementById("show-image").href = data.hdurl || data.url || "#";
    };

    if (data && data.hdurl) {
      imageElement.setAttribute("src", data.hdurl);
    } else if (data && data.url && data.media_type === "image") {
      imageElement.setAttribute("src", data.url);
    } else {
      if (imageElement) imageElement.setAttribute("src", "./assets/images/video-placeholder.png");
      if (loadingElement) loadingElement.classList.add("hidden");
      if (imageElement) imageElement.classList.remove("hidden");
      document.getElementById("apod-explanation").innerHTML = data?.explanation || "";
      document.getElementById("apod-date-detail").innerHTML = `<span><i class="far fa-calendar mr-2"></i>${data?.date || date}</span>`;
      document.getElementById("apod-date-info").innerHTML = data?.date || date;
      document.getElementById("apod-date").innerHTML = `Astronomy Picture of the Day - ${formattedDate}`;
      document.getElementById("apod-title").innerHTML = data?.title || "";
      document.getElementById("show-image").href = data?.url || "#";
    }
  } catch (err) {
    console.error("getSpace error:", err);
    if (loadingElement) loadingElement.classList.add("hidden");
    document.getElementById("apod-explanation").innerHTML = "Failed to load APOD.";
  }
}
getSpace(todayDate);

// ! ============================= Get Dated Space =============================
textDate.innerHTML = dateInput.value;
function getTextDate() {
  dateInput.addEventListener("change", () => {
    textDate.innerHTML = dateInput.value;
  });
}
getTextDate();

if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    getSpace(dateInput?.value || todayDate);
  });
}

// ! ============================= Get Today Space =============================
if (todayBtn) {
  todayBtn.addEventListener("click", function () {
    getSpace(todayDate);
    dateInput.value = todayDate;
    textDate.innerHTML = dateInput.value;
  });
}

// ! ============================= Helper for Like Buttons =============================
function setupLikeButtons() {
  // صمم دالة واحدة لتطبيق التأثير على جميع الأزرار التي تحمل أيقونة القلب
  const likeBtns = document.querySelectorAll(
    '#featured-launch .icons button:first-child, .launch-card .icons button:first-child, .launch-card button:has(.fa-heart), .bg-slate-700 .fa-heart'
  );
  // أسلوب بديل: البحث عن أي زر يحتوي على <i class="... fa-heart ...">
  const allHeartButtons = document.querySelectorAll('button i.fa-heart');
  allHeartButtons.forEach(icon => {
    const btn = icon.parentElement;
    if (btn && !btn.hasAttribute('data-like-listener')) {
      btn.setAttribute('data-like-listener', 'true');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (icon.classList.contains('far')) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          icon.style.color = '#ef4444'; // لون أحمر للـ Like
          // إضافة مؤقت بسيط: إظهار رسالة عائمة بسيطة أو مجرد تغيير.
          // نضيف تأثير "Liked!" مؤقت قريب من الزر
          const tempMsg = document.createElement('span');
          tempMsg.textContent = '👍 Liked!';
          tempMsg.style.position = 'absolute';
          tempMsg.style.backgroundColor = '#1e293b';
          tempMsg.style.color = '#fff';
          tempMsg.style.padding = '2px 8px';
          tempMsg.style.borderRadius = '20px';
          tempMsg.style.fontSize = '12px';
          tempMsg.style.whiteSpace = 'nowrap';
          tempMsg.style.pointerEvents = 'none';
          tempMsg.style.zIndex = '1000';
          const rect = btn.getBoundingClientRect();
          tempMsg.style.left = rect.left + 'px';
          tempMsg.style.top = (rect.top - 25) + 'px';
          document.body.appendChild(tempMsg);
          setTimeout(() => tempMsg.remove(), 800);
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
          icon.style.color = '';
        }
      });
    }
  });
}

// ! ============================= Get Launches =============================
async function getLaunches() {
  try {
    const respons = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`);
    const data = await respons.json();
    let launchImageHtml = "";
    if (data && data.results && data.results[0] && data.results[0].image) {
      const img = data.results[0].image.image_url || data.results[0].image.url || "./assets/images/launch-placeholder.png";
      launchImageHtml = `<img src="${img}" class="h-full w-full object-cover" alt="Launch Image" onerror="this.onerror=null;this.src='./assets/images/launch-placeholder.png'"/>`;
    } else {
      launchImageHtml = `<img src="./assets/images/launch-placeholder.png" class="h-full w-full object-cover" alt="Launch Placeholder"/>`;
    }

    const net = data.results[0].net;
    const launchTime = new Date(net);
    const launchTimeUTC = launchTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
    const launchDate = new Date(net);
    const launchDateFormatted = launchDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    displayLaunches(data.results);

    document.getElementById("featured-launch").innerHTML = `
      <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
        <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          <div class="flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"><i class="fas fa-star"></i> Featured Launch</span>
                <span class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">${data.results[0].status.abbrev}</span>
              </div>
              <h3 class="text-3xl font-bold mb-3 leading-tight">${data.results[0].name}</h3>
              <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                <div class="flex items-center gap-2"><i class="fas fa-building"></i><span>SpaceX</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-rocket"></i><span>Starship</span></div>
              </div>
              <div class="grid xl:grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-900/50 rounded-xl p-4"><p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-calendar"></i> Launch Date</p><p class="font-semibold">${launchDateFormatted}</p></div>
                <div class="bg-slate-900/50 rounded-xl p-4"><p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-clock"></i> Launch Time</p><p class="font-semibold">${launchTimeUTC} UTC</p></div>
                <div class="bg-slate-900/50 rounded-xl p-4"><p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-map-marker-alt"></i> Location</p><p class="font-semibold text-sm">${data.results[0].pad.location.name}</p></div>
                <div class="bg-slate-900/50 rounded-xl p-4"><p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-globe"></i> Country</p><p class="font-semibold">${data.results[0].pad.location.country.name}</p></div>
              </div>
              <p class="text-slate-300 leading-relaxed mb-6">${data.results[0].mission.description}</p>
            </div>
            <div class="flex flex-col md:flex-row gap-3">
              <button class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"><i class="fas fa-info-circle"></i> View Full Details</button>
              <div class="icons self-end md:self-center">
                <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"><i class="far fa-heart"></i></button>
                <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"><i class="fas fa-bell"></i></button>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
              ${launchImageHtml}
              <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    setupLikeButtons(); // إعادة ربط أزرار الإعجاب بعد إضافة المحتوى الديناميكي
  } catch (err) {
    console.error("getLaunches error:", err);
    const el = document.getElementById("featured-launch");
    if (el) el.innerHTML = `<div class="p-6 bg-slate-800/50 rounded-xl">Failed to load launches.</div>`;
  }
}
getLaunches();

function displayLaunches(launches) {
  let markUp = "";
  for (let i = 1; i < launches.length; i++) {
    const net = launches[i].net;
    const d = new Date(net);
    const cardDate = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    const cardTime = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "UTC" }) + " UTC";
    const imgUrl = launches[i].image ? launches[i].image.image_url : "./assets/images/launch-placeholder.png";

    markUp += `
      <div class="launch-card bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
        <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
          <img src="${imgUrl}" class="h-full w-full object-cover" alt="Launch Placeholder" onerror="this.src='./assets/images/launch-placeholder.png'" />
          <div class="absolute top-3 right-3"><span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">${launches[i].status.abbrev}</span></div>
        </div>
        <div class="p-5">
          <div class="mb-3"><h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">${launches[i].name}</h4><p class="text-sm text-slate-400 flex items-center gap-2"><i class="fas fa-building text-xs"></i> ${launches[i].launch_service_provider.name}</p></div>
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm"><i class="fas fa-calendar text-slate-500 w-4"></i><span class="text-slate-300">${cardDate}</span></div>
            <div class="flex items-center gap-2 text-sm"><i class="fas fa-clock text-slate-500 w-4"></i><span class="text-slate-300">${cardTime}</span></div>
            <div class="flex items-center gap-2 text-sm"><i class="fas fa-rocket text-slate-500 w-4"></i><span class="text-slate-300">${launches[i].rocket.configuration.name}</span></div>
            <div class="flex items-center gap-2 text-sm"><i class="fas fa-map-marker-alt text-slate-500 w-4"></i><span class="text-slate-300 line-clamp-1">${launches[i].pad.name}</span></div>
          </div>
          <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
            <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">Details</button>
            <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"><i class="far fa-heart"></i></button>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById("launches-grid").innerHTML = markUp;
  setupLikeButtons(); // تفعيل أزرار الإعجاب داخل البطاقات الجديدة
}

// ! ============================= Get Plants =============================
let planets = [];
getPlants();
async function getPlants() {
  const respons = await fetch(`https://solar-system-opendata-proxy.vercel.app/api/planets`);
  const data = await respons.json();
  planets = data.bodies;
  displayPlanets(data.bodies);
  return data.bodies;
}

function displayPlanets(planets) {
  let htmlMarkUp = "";
  for (let i = 0; i < planets.length; i++) {
    htmlMarkUp += `
      <div onClick="displayPlanetDetails(${i})" class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group" data-planet-id="${planets[i].name}" style="--planet-color: #eab308" onmouseover="this.style.borderColor = '#eab30880'" onmouseout="this.style.borderColor = '#334155'">
        <div class="relative mb-3 h-24 flex items-center justify-center">
          <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform" src="${planets[i].image}" alt="${planets[i].name}" />
        </div>
        <h4 class="font-semibold text-center text-sm">${planets[i].name}</h4>
        <p class="text-xs text-slate-400 text-center">0.39 AU</p>
      </div>
    `;
  }
  document.getElementById("planets-grid").innerHTML = htmlMarkUp;
}

function displayPlanetDetails(i) {
  const planet = planets[i];
  document.getElementById("planet-detail-image").setAttribute("src", planet.image);
  document.getElementById("planet-detail-name").innerHTML = planet.name;
  document.getElementById("planet-detail-description").innerHTML = planet.description;
  document.getElementById("planet-distance").innerHTML = `${planet.semimajorAxis.toFixed(1)}M km`;
  document.getElementById("planet-radius").innerHTML = `${planet.meanRadius} km`;
  document.getElementById("planet-mass").innerHTML = `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;
  document.getElementById("planet-density").innerHTML = `${planet.density} g/cm³`;
  document.getElementById("planet-orbital-period").innerHTML = `${planet.sideralOrbit.toFixed(2)} days`;
  document.getElementById("planet-rotation").innerHTML = `${planet.sideralRotation} hours`;
  document.getElementById("planet-moons").innerHTML = planet.moons ? planet.moons.length : 0;
  document.getElementById("planet-gravity").innerHTML = `${planet.gravity} m/s²`;
  document.getElementById("planet-discoverer").innerHTML = planet.discoveredBy || "Known since antiquity";
  document.getElementById("planet-discovery-date").innerHTML = planet.discoveryDate || "Ancient times";
  document.getElementById("planet-body-type").innerHTML = planet.bodyType || "—";
  document.getElementById("planet-volume").innerHTML = `${planet.vol.volValue} × 10^${planet.vol.volExponent} km³`;
  document.getElementById("planet-facts").innerHTML = `
    <li class="flex items-start"><span class="text-slate-300">Mass: ${planet.mass.massValue} × 10^${planet.mass.massExponent} kg</span></li>
    <li class="flex items-start"><span class="text-slate-300">Surface gravity: ${planet.gravity} m/s²</span></li>
    <li class="flex items-start"><span class="text-slate-300">Density: ${planet.density} g/cm³</span></li>
    <li class="flex items-start"><span class="text-slate-300">Axial tilt: ${planet.axialTilt}°</span></li>
  `;
  document.getElementById("planet-perihelion").innerHTML = `${(planet.perihelion / 1_000_000).toFixed(1)}M km`;
  document.getElementById("planet-aphelion").innerHTML = `${(planet.aphelion / 1_000_000).toFixed(1)}M km`;
  document.getElementById("planet-eccentricity").innerHTML = planet.eccentricity;
  document.getElementById("planet-inclination").innerHTML = `${planet.inclination}°`;
  document.getElementById("planet-axial-tilt").innerHTML = `${planet.axialTilt}°`;
  document.getElementById("planet-temp").innerHTML = `${planet.avgTemp}°C`;
  document.getElementById("planet-escape").innerHTML = `${(planet.escape / 1000).toFixed(1)} km/s`;
}