var global_country = document.getElementById("global-country");
global_year = document.getElementById("global-year");
var global_search_btn = document.getElementById("global-search-btn");
let current_city;
var selectedCountryCode = "";
var selectedYear = 2026;
var borders = "";
let cites;
let page_title = document.getElementById("page-title");
var page_subtitle = document.getElementById("page-subtitle");
var asideLinks = document.querySelectorAll(".sidebar-nav a");
let today = new Date().toISOString().split('T')[0];
let current_datetime = document.getElementById("current-datetime");
let stat_holidays = document.getElementById("stat-holidays");
let stat_events = document.getElementById("stat-events");
let stat_saved = document.getElementById("stat-saved");
var holidays_events_longweekends = JSON.parse(localStorage.getItem("allCards")) || [];
var holidays_events_longweekends_class = document.querySelectorAll(".holidays_events_longweekends");
var filter_holiday_count = document.getElementById("filter-holiday-count");

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");

function toggleSidebar() {
    sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("hidden");
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener("click", toggleSidebar);

asideLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 1024) toggleSidebar();
    });
});

function getFormattedDateTime() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return now.toLocaleString('en-US', options);
}
current_datetime.innerText = getFormattedDateTime();
setInterval(() => { current_datetime.innerText = getFormattedDateTime(); }, 60000);

getAllCountries();

async function getAllCountries() {
    console.log("Fetching all countries...");
    let response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
    countriesData = await response.json();
    displayCountries(countriesData);
}

function createCustomCountryDropdown() {
    const originalSelect = document.getElementById("global-country");
    if (!originalSelect || document.querySelector(".custom-country-wrapper")) return;
    
    const countriesList = [];
    
    const wrapper = document.createElement("div");
    wrapper.className = "custom-country-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    
    originalSelect.style.display = "none";
    
    const button = document.createElement("button");
    button.type = "button";
    button.className = "form-select dropdown-btn";
    button.style.cssText = "width:100%; display:flex; align-items:center; justify-content:space-between; cursor:pointer; background:white;";
    button.innerHTML = '<span>Select Country</span><i class="fa-solid fa-chevron-down"></i>';
    wrapper.appendChild(button);
    
    const dropdown = document.createElement("div");
    dropdown.className = "custom-dropdown-list";
    dropdown.style.cssText = "position:absolute; top:100%; left:0; right:0; max-height:300px; overflow-y:auto; background:white; border:1px solid #e5e7eb; border-radius:8px; margin-top:4px; z-index:1000; display:none; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);";
    
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "🔍 Search country...";
    searchInput.style.cssText = "width:100%; padding:10px 12px; border:none; border-bottom:1px solid #e5e7eb; outline:none;";
    dropdown.appendChild(searchInput);
    
    const itemsContainer = document.createElement("div");
    dropdown.appendChild(itemsContainer);
    wrapper.appendChild(dropdown);
    
    async function loadCountries() {
        const res = await fetch('https://date.nager.at/api/v3/AvailableCountries');
        const data = await res.json();
        
        for (const item of data) {
            try {
                const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${item.countryCode}`);
                const countryData = await countryRes.json();
                const country = countryData[0];
                countriesList.push({
                    code: item.countryCode,
                    name: country.name.common,
                    flag: country.flags.png
                });
            } catch(e) {}
        }
        
        countriesList.sort((a,b) => a.name.localeCompare(b.name));
        renderItems("");
        
        originalSelect.innerHTML = '<option value="">Select Country</option>';
        countriesList.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.code;
            opt.textContent = c.name;
            originalSelect.appendChild(opt);
        });
    }
    
    function renderItems(filter) {
        itemsContainer.innerHTML = "";
        const filtered = countriesList.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
        
        filtered.forEach(country => {
            const item = document.createElement("div");
            item.style.cssText = "display:flex; align-items:center; gap:10px; padding:10px 12px; cursor:pointer; transition:background 0.2s;";
            item.onmouseenter = () => item.style.background = "#f3f4f6";
            item.onmouseleave = () => item.style.background = "white";
            
            const flag = document.createElement("img");
            flag.src = country.flag;
            flag.style.cssText = "width:24px; height:18px; border-radius:3px; object-fit:cover;";
            item.appendChild(flag);
            
            const name = document.createTextNode(country.name);
            item.appendChild(name);
            
            item.onclick = () => {
                button.innerHTML = `<span style="display:flex; align-items:center; gap:8px;"><img src="${country.flag}" style="width:24px;height:18px;border-radius:3px;">${country.name}</span><i class="fa-solid fa-chevron-down"></i>`;
                dropdown.style.display = "none";
                originalSelect.value = country.code;
                originalSelect.dispatchEvent(new Event("change"));
            };
            
            itemsContainer.appendChild(item);
        });
        
        if (filtered.length === 0) {
            const noResult = document.createElement("div");
            noResult.style.cssText = "padding:12px; text-align:center; color:#9ca3af;";
            noResult.textContent = "No countries found";
            itemsContainer.appendChild(noResult);
        }
    }
    
    searchInput.addEventListener("input", (e) => renderItems(e.target.value));
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        if (dropdown.style.display === "block") searchInput.focus();
    });
    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) dropdown.style.display = "none";
    });
    
    originalSelect.parentNode.insertBefore(wrapper, originalSelect);
    loadCountries();
}

function displayCountries(countries) {
    var cartona = `<option value="" selected>Select Country</option>`;
    for (var i = 0; i < countries.length; i++) {
        cartona += `<option value="${countries[i].countryCode}">${countries[i].name}</option>`;
    }
    global_country.innerHTML = cartona;
    
    setTimeout(() => createCustomCountryDropdown(), 100);

    global_country.addEventListener("change", async function () {
        selectedCountryCode = global_country.value;
        if (selectedCountryCode) {
            var selectedCountryname = global_country.options[global_country.selectedIndex].text;
            await updateSelectedDestinationOnly(selectedCountryCode, selectedCountryname);
        }
    });

    global_year.addEventListener("change", function () {
        selectedYear = global_year.value;
    });
}

async function updateSelectedDestinationOnly(countryCode, countryName) {
    let response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    let data = await response.json();
    cites = data;
    let capital = data[0].capital[0];
    current_city = capital;
    
    const selectedDest = document.getElementById("selected-destination");
    if (selectedDest) {
        selectedDest.style.display = "flex";
        selectedDest.innerHTML = `
            <div class="selected-flag">
                <img src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" style="width: 40px; border-radius: 8px;">
            </div>
            <div class="selected-info">
                <span class="selected-country-name"><strong>${countryName}</strong></span>
                <span class="selected-city-name">• ${capital}</span>
            </div>
            <button class="clear-selection-btn" onclick="clearSelection()"><i class="fa-solid fa-xmark"></i></button>
        `;
    }
    
    const citySelect = document.getElementById("global-city");
    citySelect.innerHTML = `<option value="${capital}">${capital}</option>`;
    
    const dashboardInfo = document.getElementById("dashboard-country-info-section");
    if (dashboardInfo) dashboardInfo.style.display = "none";
    
    showNoCountryMessageForSection("holidays-content", "public holidays");
    showNoCountryMessageForSection("events-content", "events");
    showNoCountryMessageForSection("weather-content", "weather");
    showNoCountryMessageForSection("lw-content", "long weekends");
    showNoCountryMessageForSection("sun-times-content", "sun times");
}

const selectedDest = document.getElementById("selected-destination");
if (selectedDest) selectedDest.style.display = "none";
const dashboardInfo = document.getElementById("dashboard-country-info-section");
if (dashboardInfo) dashboardInfo.style.display = "none";

function showNoCountryMessageForSection(sectionContentId, sectionName) {
    const container = document.getElementById(sectionContentId);
    if (container && (!selectedCountryCode || selectedCountryCode === "" || dashboardInfo.style.display === "none")) {
        container.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 60px 20px;">
                <div class="empty-icon"><i class="fa-solid fa-globe" style="font-size: 48px; color: #9ca3af;"></i></div>
                <h3 style="margin-top: 16px;">No Country Selected</h3>
                <p style="color: #6b7280; margin-top: 8px;">Select a country from the Dashboard to explore ${sectionName}.</p>
                <button class="btn-primary go-to-dashboard-btn" style="margin-top: 20px;">
                    <i class="fa-solid fa-arrow-right"></i> Go to Dashboard
                </button>
            </div>
        `;
        const goBtn = container.querySelector(".go-to-dashboard-btn");
        if (goBtn) {
            goBtn.addEventListener("click", () => {
                document.querySelector('[data-view="dashboard-view"]').click();
            });
        }
    }
}

async function getAllCity(countryCode, selectedCountryname) {
    console.log("Fetching all city...");
    let response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    cites = await response.json();
    console.log(cites);
    
    if (selectedDest) selectedDest.style.display = "flex";
    selectedDest.innerHTML = ` 
    <div class="selected-flag">
        <img id="selected-country-flag" src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" alt="country-flag">
    </div>
    <div class="selected-info">
        <span class="selected-country-name" id="selected-country-name">${selectedCountryname}</span>
        <span class="selected-city-name" id="selected-city-name">• ${cites[0].capital[0]}</span>
    </div>
    <button class="clear-selection-btn" id="clear-selection-btn">
        <i class="fa-solid fa-xmark"></i>
    </button>`;
    
    document.getElementById("global-city").innerHTML = `<option value="${cites[0].capital[0]}">${cites[0].capital[0]}</option>`;
    current_city = cites[0].capital[0];
    
    if (dashboardInfo) dashboardInfo.style.display = "block";
    
    const dashboardFlag = document.getElementById("dashboard-country-flag");
    if (dashboardFlag) {
        dashboardFlag.src = cites[0].flags.png;
        dashboardFlag.alt = cites[0].flags.alt;
    }
    
    updateAllSectionBadges(selectedCountryname, countryCode, current_city, selectedYear);
}

function updateAllSectionBadges(countryName, countryCode, cityName, year) {
    const flagUrl = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
    const badgeHtml = `
        <div class="current-selection-badge">
            <img src="${flagUrl}" alt="${countryName}" class="selection-flag" style="width: 24px; height: 18px; border-radius: 4px;">
            <span>${countryName}</span>
            <span class="selection-year">${year}</span>
            <span class="selection-city">• ${cityName}</span>
        </div>
    `;
    
    const holidaySelection = document.getElementById("holidays-selection");
    if (holidaySelection) holidaySelection.innerHTML = badgeHtml;
    
    const eventsSelection = document.querySelector("#events-view .view-header-selection");
    if (eventsSelection) eventsSelection.innerHTML = badgeHtml;
    
    const weatherSelection = document.querySelector("#weather-view .view-header-selection");
    if (weatherSelection) weatherSelection.innerHTML = badgeHtml;
    
    const lwSelection = document.querySelector("#long-weekends-view .view-header-selection");
    if (lwSelection) lwSelection.innerHTML = badgeHtml;
    
    const sunSelection = document.querySelector("#sun-times-view .view-header-selection");
    if (sunSelection) sunSelection.innerHTML = badgeHtml;
    
    const eventsSubtitle = document.querySelector("#events-view .view-header-content p");
    if (eventsSubtitle) eventsSubtitle.innerText = `Discover concerts, sports, theatre and more in ${cityName}`;
    
    const weatherSubtitle = document.querySelector("#weather-view .view-header-content p");
    if (weatherSubtitle) weatherSubtitle.innerText = `Check 7-day weather forecasts for ${cityName}`;
}

async function global_search_btnF(hamada = 1) {
    if (hamada == 1 && cites) {
        console.log(cites);
        
        if (dashboardInfo) dashboardInfo.style.display = "block";
        
        if (cites[0].borders && cites[0].borders.length > 0) {
            borders = "";
            for (let index = 0; index < cites[0].borders.length; index++) {
                const borderCode = cites[0].borders[index];
                try {
                    const neighborRes = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
                    const neighborData = await neighborRes.json();
                    const neighborCountry = neighborData[0];
                    const neighborName = neighborCountry.name.common;
                    const neighborFlag = neighborCountry.flags.png;
                    
                    borders += `<span class="extra-tag border-tag neighbor-country" 
                        data-country-code="${borderCode}" 
                        data-country-name="${neighborName}" 
                        data-country-flag="${neighborFlag}" 
                        style="cursor: pointer; background: #e5e7eb; padding: 4px 12px; border-radius: 20px; margin: 4px; display: inline-flex; align-items: center; gap: 6px;">
                        <img src="${neighborFlag}" style="width: 20px; height: 15px; border-radius: 3px;"> ${neighborName}
                    </span>`;
                } catch(e) {
                    borders += `<span class="extra-tag border-tag neighbor-country" 
                        data-country-code="${borderCode}" 
                        style="cursor: pointer; background: #e5e7eb; padding: 4px 12px; border-radius: 20px; margin: 4px; display: inline-block;">
                        ${borderCode}
                    </span>`;
                }
            }
        } else {
            borders = `<span class="extra-tag">No neighboring countries</span>`;
        }

        const currencies = cites[0].currencies;
        const currencyKey = Object.keys(currencies)[0];
        const currencyName = currencies[currencyKey].name;
        const currencySymbol = currencies[currencyKey].symbol;

        function getTimeByTimezone(offsetString) {
            const offset = parseInt(offsetString.replace("UTC", ""));
            const now = new Date();
            const utcDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
            const targetDate = new Date(utcDate.getTime() + (offset * 3600000));
            return targetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        }

        const timezoneFromAPI = cites[0].timezones[0];

        if (window.timeInterval) clearInterval(window.timeInterval);
        window.timeInterval = setInterval(() => {
            const currentTime = getTimeByTimezone(timezoneFromAPI);
            if (document.querySelector('#country-local-time')) {
                document.querySelector('#country-local-time').innerText = currentTime;
            }
        }, 1000);

        if (dashboardInfo) dashboardInfo.innerHTML = ` 
     <div class="section-header">
              <h2><i class="fa-solid fa-flag"></i> Country Information</h2>
            </div>
            <div id="dashboard-country-info" class="dashboard-country-info">
              
              <div class="dashboard-country-header">
                     <img id="dashboard-country-flag" src="${cites[0].flags.png}" alt="${cites[0].flags.alt}" class="dashboard-country-flag">
                <div class="dashboard-country-title">
                  <h3 id="dashboard-country-name">${cites[0].name.common}</h3>
                  <p id="official-name" class="official-name">${cites[0].name.official}</p>
                  <span id="region" class="region"><i class="fa-solid fa-location-dot"></i> ${cites[0].continents[0]} • ${cites[0].subregion}</span>
                </div>
              </div>
              
              <div class="dashboard-local-time">
                <div class="local-time-display">
                  <i class="fa-solid fa-clock"></i>
                  <span class="local-time-value" id="country-local-time">${getTimeByTimezone(timezoneFromAPI)}</span>
                  <span id="local-time-zone" class="local-time-zone">${cites[0].timezones[0]}</span>
                </div>
              </div>
              
              <div class="dashboard-country-grid">
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-building-columns"></i>
                  <span class="label">Capital</span>
                  <span id="Capital" class="value">${cites[0].capital[0]}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-users"></i>
                  <span class="label">Population</span>
                  <span id="Population" class="value">${cites[0].population.toLocaleString()}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-ruler-combined"></i>
                  <span class="label">Area</span>
                  <span id="Area" class="value">${cites[0].area.toLocaleString()} km²</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-globe"></i>
                  <span class="label">Continent</span>
                  <span id="Continent" class="value">${cites[0].continents[0]}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-phone"></i>
                  <span class="label">Calling Code</span>
                  <span id="Calling_Code" class="value">${cites[0].idd.root}${cites[0].idd.suffixes ? cites[0].idd.suffixes[0] : ''}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-car"></i>
                  <span class="label">Driving Side</span>
                  <span id="Driving_Side" class="value">${cites[0].car.side}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-calendar-week"></i>
                  <span class="label">Week Starts</span>
                  <span id="Week_Starts" class="value">${cites[0].startOfWeek}</span>
                </div>
              </div>
              
              <div class="dashboard-country-extras">
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-coins"></i> Currency</h4>
                  <div class="extra-tags">
                    <span id="Currency" class="extra-tag"> ${currencyName} (${currencyKey} ${currencySymbol})</span>
                  </div>
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-language"></i> Languages</h4>
                  <div class="extra-tags">
                    <span id="Languages" class="extra-tag">${Object.values(cites[0].languages).join(', ')}</span>
                  </div>
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
                  <div id="Neighbors" class="extra-tags">
                  ${borders}
                  </div>
                </div>
              </div>
              
              <div class="dashboard-country-actions">
                <a href="${cites[0].maps.googleMaps}" target="_blank" class="btn-map-link">
                  <i class="fa-solid fa-map"></i> View on Google Maps
                </a>
              </div>
              
            </div>
        `;
        
        document.querySelectorAll('.neighbor-country').forEach(el => {
            el.removeEventListener('click', neighborClickHandler);
            el.addEventListener('click', neighborClickHandler);
        });
        
        loadHolidays();
        loadEvents(12);
        loadLong_weekends();
        if (cites) loadWeather(cites[0].capitalInfo.latlng[0], cites[0].capitalInfo.latlng[1], current_city);
        if (cites) loadSun_Times(cites[0].capitalInfo.latlng[0], cites[0].capitalInfo.latlng[1], today);
        loadCurrency();
    }
}

async function neighborClickHandler(e) {
    const neighborCode = this.getAttribute('data-country-code');
    const neighborName = this.getAttribute('data-country-name');
    const neighborFlag = this.getAttribute('data-country-flag');
    
    if (neighborCode) {
        global_country.value = neighborCode;
        selectedCountryCode = neighborCode;
        
        let response = await fetch(`https://restcountries.com/v3.1/alpha/${neighborCode}`);
        let neighborData = await response.json();
        let capital = neighborData[0].capital[0];
        
        const flagUrl = neighborFlag || `https://flagcdn.com/w40/${neighborCode.toLowerCase()}.png`;
        if (selectedDest) {
            selectedDest.style.display = "flex";
            selectedDest.innerHTML = `
                <div class="selected-flag">
                    <img src="${flagUrl}" style="width: 40px; border-radius: 8px;">
                </div>
                <div class="selected-info">
                    <span class="selected-country-name"><strong>${neighborName || neighborCode}</strong></span>
                    <span class="selected-city-name">• ${capital}</span>
                </div>
                <button class="clear-selection-btn" onclick="clearSelection()"><i class="fa-solid fa-xmark"></i></button>
            `;
        }
        
        document.getElementById("global-city").innerHTML = `<option value="${capital}">${capital}</option>`;
        current_city = capital;
        
        cites = neighborData;
        
        if (dashboardInfo) dashboardInfo.style.display = "none";
        showNoCountryMessageForSection("holidays-content", "public holidays");
        showNoCountryMessageForSection("events-content", "events");
        showNoCountryMessageForSection("weather-content", "weather");
        showNoCountryMessageForSection("lw-content", "long weekends");
        showNoCountryMessageForSection("sun-times-content", "sun times");
        
        updateAllSectionBadges(neighborName || neighborCode, neighborCode, capital, selectedYear);
        
        Swal.fire({
            icon: 'success',
            title: 'Country Selected',
            text: `Now selected ${neighborName || neighborCode}. Click Explore to see details.`,
            timer: 2000,
            showConfirmButton: false
        });
    }
}

global_search_btn.addEventListener("click", function () {
    if (!selectedCountryCode || selectedCountryCode === "") {
        Swal.fire('Warning', 'Please select a country first', 'warning');
        return;
    }
    if (!current_city || current_city === "") {
        const citySelect = document.getElementById("global-city");
        if (citySelect.value && citySelect.value !== "") {
            current_city = citySelect.value;
        } else {
            Swal.fire('Warning', 'Please select a city first', 'warning');
            return;
        }
    }
    getAllCity(selectedCountryCode, global_country.options[global_country.selectedIndex].text);
    global_search_btnF();
});

function clearSelection() {
    const selectedDest = document.getElementById("selected-destination");
    if (selectedDest) selectedDest.style.display = "none";
    const dashboardInfo = document.getElementById("dashboard-country-info-section");
    if (dashboardInfo) dashboardInfo.style.display = "none";
    selectedCountryCode = "";
    current_city = "";
    cites = null;
    document.getElementById("global-city").innerHTML = '<option value="" selected disabled>Select a city</option>';
    
    showNoCountryMessageForSection("holidays-content", "public holidays");
    showNoCountryMessageForSection("events-content", "events");
    showNoCountryMessageForSection("weather-content", "weather");
    showNoCountryMessageForSection("lw-content", "long weekends");
    showNoCountryMessageForSection("sun-times-content", "sun times");
    
    updateAllSectionBadges("", "", "", "");
}

async function loadHolidays() {
    if (!selectedCountryCode || selectedCountryCode === "") {
        showNoCountryMessageForSection("holidays-content", "public holidays");
        return;
    }
    
    page_title.innerText = "Holidays";
    page_subtitle.innerText = `Explore public holidays around the world`;
    document.getElementById("loading-overlay").classList.remove("hidden");
    document.getElementById("holidays-content").innerHTML = '<div class="text-center p-5"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p>Loading holidays...</p></div>';
    
    try {
        let countryCodeShort = selectedCountryCode.slice(0, 2);
        let response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/${countryCodeShort}`);
        let holidays = await response.json();
        var cartona = ``;

        if (holidays.length > 0) {
            stat_holidays.innerText = holidays.length;
            for (let index = 0; index < holidays.length; index++) {
                let dateStr = holidays[index].date;
                let dateObj = new Date(dateStr);
                let day = dateObj.getDate();
                let monthName = dateObj.toLocaleString('en-US', { month: 'long' });
                let weekDay = dateObj.toLocaleString('en-US', { weekday: 'long' });

                cartona += `
        <div class="holiday-card">
              <div class="holiday-card-header">
                <div class="holiday-date-box"><span class="day">${day}</span><span class="month">${monthName}</span></div>
              <button class="holiday-action-btn">
    <i class="fa-regular fa-heart holidays_events_longweekends" 
       onclick="toggleFavorite(this, {localName: '${holidays[index].localName.replace(/'/g, "\\'")}', name: '${holidays[index].name.replace(/'/g, "\\'")}', type: 'holiday'})">
    </i>
</button>
              </div>
              <h3>${holidays[index].localName}</h3>
              <p class="holiday-name">${holidays[index].name}</p>
              <div class="holiday-card-footer">
                <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${weekDay}</span>
                ${holidays[index].global ? `<span class="holiday-type-badge">Public</span>` : `<span class="holiday-type-badge">Not Public</span>`}
              </div>
            </div>
        `;
            }
        } else {
            stat_holidays.innerText = 0;
            cartona = `<p class="d-flex justify-content-center align-item-center p-5">No holidays found for this country.</p>`;
        }
        document.getElementById("holidays-content").innerHTML = cartona;
    } catch (error) {
        document.getElementById("holidays-content").innerHTML = `<p class="d-flex justify-content-center align-item-center p-5 text-danger">Error loading holidays. Please try again.</p>`;
    }
    document.getElementById("loading-overlay").classList.add("hidden");
}

async function loadEvents(size) {
    if (!selectedCountryCode || selectedCountryCode === "") {
        showNoCountryMessageForSection("events-content", "events");
        return;
    }
    
    page_title.innerText = "Events";
    let cityForDisplay = current_city || selectedCountryCode;
    page_subtitle.innerText = `Find concerts, sports, and entertainment in ${cityForDisplay}`;
    document.getElementById("loading-overlay").classList.remove("hidden");
    document.getElementById("events-content").innerHTML = '<div class="text-center p-5"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p>Loading events...</p></div>';
    
    try {
        const apiKey = "VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y";
        let countryCodeShort = selectedCountryCode.slice(0, 2);
        
        let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&countryCode=${countryCodeShort}&size=${size}`;
        if (current_city && current_city !== "") {
            url += `&city=${encodeURIComponent(current_city)}`;
        }
        
        console.log("Fetching events from:", url);
        let response = await fetch(url);
        let data = await response.json();
        
        let cartona = ``;
        
        if (data._embedded && data._embedded.events && data._embedded.events.length > 0) {
            stat_events.innerText = data._embedded.events.length;
            for (let index = 0; index < Math.min(data._embedded.events.length, size); index++) {
                const ev = data._embedded.events[index];
                let eventDate = ev.dates.start.localDate || 'Date TBA';
                let venueName = ev._embedded?.venues?.[0]?.name || 'Venue TBA';
                let imageUrl = ev.images?.[0]?.url || 'https://via.placeholder.com/400x200?text=Event+Image';
                let category = ev.classifications?.[0]?.segment?.name || 'Event';
                
                cartona += `
                    <div class="event-card">
                        <div class="event-card-image">
                            <img src="${imageUrl}" alt="Event Image" style="width: 100%; height: 160px; object-fit: cover;">
                            <span class="event-card-category">${category}</span>
                            <button class="event-card-save" onclick="toggleFavorite(this, {name: '${ev.name.replace(/'/g, "\\'")}', type: 'event', date: '${eventDate}', venue: '${venueName.replace(/'/g, "\\'")}'})">
                                <i class="fa-regular fa-heart"></i>
                            </button>
                        </div>
                        <div class="event-card-body">
                            <h3>${ev.name}</h3>
                            <div class="event-card-info">
                                <div><i class="fa-regular fa-calendar"></i> ${eventDate}</div>
                                <div><i class="fa-solid fa-location-dot"></i> ${venueName}</div>
                            </div>
                            <div class="event-card-footer">
                                <button class="btn-event" onclick="toggleFavorite(this, {name: '${ev.name.replace(/'/g, "\\'")}', type: 'event'})">
                                    <i class="fa-regular fa-heart"></i> Save
                                </button>
                                <a href="${ev.url}" target="_blank" class="btn-buy-ticket">
                                    <i class="fa-solid fa-ticket"></i> Buy Tickets
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else {
            stat_events.innerText = 0;
            cartona = `
                <div class="empty-state" style="text-align: center; padding: 60px 20px;">
                    <div class="empty-icon">
                        <i class="fa-solid fa-ticket" style="font-size: 64px; color: #9ca3af; margin-bottom: 20px;"></i>
                    </div>
                    <h3 style="font-size: 24px; font-weight: 600; color: #374151; margin-bottom: 8px;">No Events Found</h3>
                    <p style="color: #6b7280; font-size: 16px;">No events found for ${cityForDisplay}.</p>
                    <p style="color: #9ca3af; font-size: 14px; margin-top: 8px;">Try selecting a different city or country.</p>
                </div>
            `;
        }
        document.getElementById("events-content").innerHTML = cartona;
    } catch (error) {
        console.error("Error loading events:", error);
        document.getElementById("events-content").innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 60px 20px;">
                <div class="empty-icon">
                    <i class="fa-solid fa-ticket" style="font-size: 64px; color: #9ca3af; margin-bottom: 20px;"></i>
                </div>
                <h3 style="font-size: 24px; font-weight: 600; color: #374151; margin-bottom: 8px;">No Events Found</h3>
                <p style="color: #6b7280; font-size: 16px;">Unable to load events for ${cityForDisplay}.</p>
                <p style="color: #9ca3af; font-size: 14px; margin-top: 8px;">Please check your connection and try again.</p>
            </div>
        `;
    }
    document.getElementById("loading-overlay").classList.add("hidden");
}

async function loadWeather(lat, lon, cityName) {
    if (!selectedCountryCode || selectedCountryCode === "") {
        showNoCountryMessageForSection("weather-content", "weather");
        return;
    }
    
    page_title.innerText = "Weather";
    page_subtitle.innerText = `Check forecasts for any destination`;
    document.getElementById("loading-overlay").classList.remove("hidden");
    document.getElementById("weather-content").innerHTML = '<div class="text-center p-5"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p>Loading weather...</p></div>';
    
    try {
        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`);
        let weather = await response.json();

        const currentCode = getWeatherInfo(weather.current.weather_code);
        let localTime = new Date(weather.current.time);
        let actualTime = localTime.toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });
        
        let hourlyHtml = '';
        for (let i = 0; i < 8; i++) {
            let hourTime = new Date(weather.hourly.time[i]);
            let hourLabel = i === 0 ? 'Now' : hourTime.getHours() + (hourTime.getHours() >= 12 ? ' PM' : ' AM');
            let hourCode = getWeatherInfo(weather.hourly.weather_code[i]);
            hourlyHtml += `
                <div class="hourly-item ${i === 0 ? 'now' : ''}">
                  <span class="hourly-time">${hourLabel}</span>
                  <div class="hourly-icon"><i class="fa-solid ${hourCode.icon}"></i></div>
                  <span class="hourly-temp">${Math.round(weather.hourly.temperature_2m[i])}°</span>
                </div>`;
        }
        
        let forecastHtml = '';
        let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let todayDate = new Date();
        
        for (let i = 0; i < 7; i++) {
            let forecastDate = new Date();
            forecastDate.setDate(todayDate.getDate() + i);
            let dayLabel = i === 0 ? 'Today' : dayNames[forecastDate.getDay()];
            let dayNum = forecastDate.getDate();
            let forecastCode = getWeatherInfo(weather.daily.weather_code[i]);
            let precipitation = weather.daily.precipitation_probability_max[i] || 0;
            
            forecastHtml += `
                <div class="forecast-day ${i === 0 ? 'today' : ''}">
                  <div class="forecast-day-name"><span class="day-label">${dayLabel}</span><span class="day-date">${dayNum} ${forecastDate.toLocaleString('en-US', { month: 'short' })}</span></div>
                  <div class="forecast-icon"><i class="fa-solid ${forecastCode.icon}"></i></div>
                  <div class="forecast-temps"><span class="temp-max">${Math.round(weather.daily.temperature_2m_max[i])}°</span><span class="temp-min">${Math.round(weather.daily.temperature_2m_min[i])}°</span></div>
                  <div class="forecast-precip">${precipitation > 0 ? `<i class="fa-solid fa-droplet"></i><span>${precipitation}%</span>` : ''}</div>
                </div>`;
        }
        
        var cartona = ` <div class="weather-hero-card ${currentCode.bgClass}">
              <div class="weather-location">
                <i class="fa-solid fa-location-dot"></i>
                <span>${cityName}</span>
                <span class="weather-time">${actualTime}</span>
              </div>
              <div class="weather-hero-main">
                <div class="weather-hero-left">
                  <div class="weather-hero-icon"><i class="fa-solid ${currentCode.icon}"></i></div>
                  <div class="weather-hero-temp">
                    <span class="temp-value">${Math.round(weather.current.temperature_2m)}</span>
                    <span class="temp-unit">${weather.current_units.temperature_2m}</span>
                  </div>
                </div>
                <div class="weather-hero-right">
                  <div class="weather-condition">${currentCode.text}</div>
                  <div class="weather-feels">Feels like ${Math.round(weather.current.apparent_temperature)}${weather.current_units.apparent_temperature}</div>
                  <div class="weather-high-low">
                    <span class="high"><i class="fa-solid fa-arrow-up"></i> ${Math.round(weather.daily.temperature_2m_max[0])}°</span>
                    <span class="low"><i class="fa-solid fa-arrow-down"></i> ${Math.round(weather.daily.temperature_2m_min[0])}°</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="weather-details-grid">
              <div class="weather-detail-card">
                <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Humidity</span>
                  <span class="detail-value">${weather.current.relative_humidity_2m}${weather.current_units.relative_humidity_2m}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">${weather.current.wind_speed_10m} ${weather.current_units.wind_speed_10m}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
                <div class="detail-info">
                  <span class="detail-label">UV Index</span>
                  <span class="detail-value">${weather.daily.uv_index_max[0]}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Precipitation</span>
                  <span class="detail-value">${weather.daily.precipitation_probability_max[0]}%</span>
                </div>
              </div>
            </div>

            <div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-clock"></i> Hourly Forecast</h3>
              <div class="hourly-scroll">
                ${hourlyHtml}
              </div>
            </div>
            
            <div class="weather-section">
              <h3 class="weather-section-title"><i class="fa-solid fa-calendar-week"></i> 7-Day Forecast</h3>
              <div class="forecast-list">
                ${forecastHtml}
              </div>
            </div>`;
        document.getElementById("weather-content").innerHTML = cartona;
    } catch (error) {
        console.error("Error loading weather:", error);
        document.getElementById("weather-content").innerHTML = `<p class="d-flex justify-content-center align-item-center p-5 text-danger">Error loading weather. Please try again.</p>`;
    }
    document.getElementById("loading-overlay").classList.add("hidden");
}

function getWeatherInfo(code) {
    if (code === 0) return { text: "Clear Sky", icon: "fa-sun", bgClass: "weather-sunny" };
    else if (code <= 3) return { text: "Partly Cloudy", icon: "fa-cloud-sun", bgClass: "weather-cloudy" };
    else if (code >= 51 && code <= 67) return { text: "Rainy", icon: "fa-cloud-showers-heavy", bgClass: "weather-rainy" };
    else if (code >= 71 && code <= 77) return { text: "Snowy", icon: "fa-snowflake", bgClass: "weather-snowy" };
    else if (code >= 95) return { text: "Thunderstorm", icon: "fa-cloud-bolt", bgClass: "weather-storm" };
    else return { text: "Overcast", icon: "fa-cloud", bgClass: "weather-cloudy" };
}

async function loadLong_weekends() {
    if (!selectedCountryCode || selectedCountryCode === "") {
        showNoCountryMessageForSection("lw-content", "long weekends");
        return;
    }
    
    page_title.innerText = "Long Weekends";
    page_subtitle.innerText = `Find the perfect mini-trip opportunities`;
    document.getElementById("loading-overlay").classList.remove("hidden");
    document.getElementById("lw-content").innerHTML = '<div class="text-center p-5"><i class="fa-solid fa-spinner fa-spin fa-2x"></i><p>Loading long weekends...</p></div>';
    
    try {
        let countryCodeShort = selectedCountryCode.slice(0, 2);
        let response = await fetch(`https://date.nager.at/api/v3/LongWeekend/${selectedYear}/${countryCodeShort}`);
        let Long_weekends = await response.json();
        
        if (Long_weekends.length > 0 && !Long_weekends.status) {
            displayLongWeekends(Long_weekends);
        } else {
            document.getElementById("lw-content").innerHTML = `<p class="d-flex justify-content-center align-item-center p-5">No long weekends found for this country.</p>`;
        }
    } catch (error) {
        document.getElementById("lw-content").innerHTML = `<p class="d-flex justify-content-center align-item-center p-5 text-danger">Please select a country from Dashboard first.</p>`;
    }
    document.getElementById("loading-overlay").classList.add("hidden");
}

function displayLongWeekends(holidaysArray) {
    const container = document.getElementById('lw-content');
    container.innerHTML = "";
    holidaysArray.forEach((holiday, index) => {
        const start = new Date(holiday.startDate);
        const end = new Date(holiday.endDate);
        const dateRange = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        
        container.innerHTML += `
            <div class="lw-card">
              <div class="lw-card-header">
                <span class="lw-badge"><i class="fa-solid fa-calendar-days"></i> ${holiday.dayCount} Days</span>
                <button class="holiday-action-btn"><i class="fa-regular fa-heart holidays_events_longweekends" onclick="toggleFavorite(this, {name: 'Long Weekend #${index + 1}', type: 'longweekend', startDate: '${holiday.startDate}', endDate: '${holiday.endDate}'})"></i></button>
              </div>
              <h3>Long Weekend #${index + 1}</h3>
              <div class="lw-dates"><i class="fa-regular fa-calendar"></i> ${dateRange}</div>
              <div class="lw-info-box ${holiday.needBridgeDay ? 'warning' : 'success'}">
                <i class="fa-solid ${holiday.needBridgeDay ? 'fa-info-circle' : 'fa-check-circle'}"></i> 
                ${holiday.needBridgeDay ? 'Requires taking a bridge day off' : 'No extra days off needed!'}
              </div>
            </div>
        `;
    });
}

let allCurrencies = {};

async function loadCurrency() {
    page_title.innerText = "Currency";
    page_subtitle.innerText = `Convert currencies with live exchange rates`;
    document.getElementById("loading-overlay").classList.remove("hidden");
    
    try {
        let response = await fetch(`https://open.er-api.com/v6/latest/USD`);
        let currencyData = await response.json();
        allCurrencies = currencyData.rates;
        
        let popularCurrencies = ['EUR', 'GBP', 'EGP', 'AED', 'SAR', 'JPY', 'CAD', 'INR'];
        let popularMarkup = `<div class="popular-currencies-grid">`;
        for (let code of popularCurrencies) {
            let flagCode = code === 'EUR' ? 'eu' : code === 'GBP' ? 'gb' : code === 'EGP' ? 'eg' : code === 'AED' ? 'ae' : code === 'SAR' ? 'sa' : code === 'JPY' ? 'jp' : code === 'CAD' ? 'ca' : 'in';
            popularMarkup += `<div class="popular-currency-card"><img src="https://flagcdn.com/w40/${flagCode}.png" class="flag"><div class="info"><div class="code">${code}</div></div><div class="rate">${allCurrencies[code].toFixed(4)}</div></div>`;
        }
        popularMarkup += `</div>`;
        document.getElementById("Quick_Convert_Currency").innerHTML = `<div class="section-header"><h2><i class="fa-solid fa-star"></i> Quick Convert</h2></div>${popularMarkup}`;
        
        let currencyOptions = '';
        for (let code in allCurrencies) currencyOptions += `<option value="${code}">${code}</option>`;
        document.getElementById("currency-from").innerHTML = currencyOptions;
        document.getElementById("currency-to").innerHTML = currencyOptions;
        
        if (cites && cites[0] && cites[0].currencies) {
            let countryCurrency = Object.keys(cites[0].currencies)[0];
            if (allCurrencies[countryCurrency]) document.getElementById("currency-from").value = countryCurrency;
        }
        document.getElementById("currency-to").value = "USD";
        
        document.getElementById("convert-btn").onclick = performCurrencyConversion;
        document.getElementById("swap-currencies-btn").onclick = swapCurrencies;
        document.getElementById("currency-amount").oninput = performCurrencyConversion;
        document.getElementById("currency-from").onchange = performCurrencyConversion;
        document.getElementById("currency-to").onchange = performCurrencyConversion;
        performCurrencyConversion();
        
    } catch (error) {
        console.error(error);
    }
    document.getElementById("loading-overlay").classList.add("hidden");
}

function performCurrencyConversion() {
    const amount = parseFloat(document.getElementById("currency-amount")?.value) || 0;
    const fromCurrency = document.getElementById("currency-from")?.value;
    const toCurrency = document.getElementById("currency-to")?.value;
    if (!allCurrencies[fromCurrency] || !allCurrencies[toCurrency]) return;
    
    const convertedAmount = (amount / allCurrencies[fromCurrency]) * allCurrencies[toCurrency];
    document.getElementById("currency-result").innerHTML = `
        <div class="conversion-display">
            <div class="conversion-from"><span class="amount">${amount.toFixed(2)}</span><span class="currency-code">${fromCurrency}</span></div>
            <div class="conversion-equals"><i class="fa-solid fa-equals"></i></div>
            <div class="conversion-to"><span class="amount">${convertedAmount.toFixed(2)}</span><span class="currency-code">${toCurrency}</span></div>
        </div>
        <div class="exchange-rate-info"><p>1 ${fromCurrency} = ${(allCurrencies[toCurrency]/allCurrencies[fromCurrency]).toFixed(4)} ${toCurrency}</p></div>
    `;
}

function swapCurrencies() {
    const fromSelect = document.getElementById("currency-from");
    const toSelect = document.getElementById("currency-to");
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    performCurrencyConversion();
}

async function loadSun_Times(lat, lon, today) {
    if (!selectedCountryCode || selectedCountryCode === "") {
        showNoCountryMessageForSection("sun-times-content", "sun times");
        return;
    }
    
    page_title.innerText = "Sun Times";
    page_subtitle.innerText = `Check sunrise and sunset times worldwide`;
    document.getElementById("loading-overlay").classList.remove("hidden");
    
    try {
        let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=${today}&formatted=0`);
        let Sun_Times = await response.json();
        let localTime = new Date();
        let formattedDate = localTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        let dayName = localTime.toLocaleDateString('en-US', { weekday: 'long' });
        const sunData = Sun_Times.results;
        
        function formatSunTime(isoString) {
            if (!isoString) return '--:--';
            return new Date(isoString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        }
        
        const hours = Math.floor(sunData.day_length / 3600);
        const minutes = Math.floor((sunData.day_length % 3600) / 60);
        const dayLength = `${hours}h ${minutes}m`;
        const dayLengthPercentage = ((sunData.day_length / 86400) * 100).toFixed(1);
        
        var cartona = `
            <div class="sun-main-card">
              <div class="sun-main-header">
                <div class="sun-location"><h2><i class="fa-solid fa-location-dot"></i> ${current_city}</h2><p>Sun times for your selected location</p></div>
                <div class="sun-date-display"><div class="date">${formattedDate}</div><div class="day">${dayName}</div></div>
              </div>
              <div class="sun-times-grid">
                <div class="sun-time-card dawn"><div class="icon"><i class="fa-solid fa-moon"></i></div><div class="label">Dawn</div><div class="time">${formatSunTime(sunData.civil_twilight_begin)}</div><div class="sub-label">Civil Twilight</div></div>
                <div class="sun-time-card sunrise"><div class="icon"><i class="fa-solid fa-sun"></i></div><div class="label">Sunrise</div><div class="time">${formatSunTime(sunData.sunrise)}</div><div class="sub-label">Golden Hour Start</div></div>
                <div class="sun-time-card noon"><div class="icon"><i class="fa-solid fa-sun"></i></div><div class="label">Solar Noon</div><div class="time">${formatSunTime(sunData.solar_noon)}</div><div class="sub-label">Sun at Highest</div></div>
                <div class="sun-time-card sunset"><div class="icon"><i class="fa-solid fa-sun"></i></div><div class="label">Sunset</div><div class="time">${formatSunTime(sunData.sunset)}</div><div class="sub-label">Golden Hour End</div></div>
                <div class="sun-time-card dusk"><div class="icon"><i class="fa-solid fa-moon"></i></div><div class="label">Dusk</div><div class="time">${formatSunTime(sunData.civil_twilight_end)}</div><div class="sub-label">Civil Twilight</div></div>
                <div class="sun-time-card daylight"><div class="icon"><i class="fa-solid fa-hourglass-half"></i></div><div class="label">Day Length</div><div class="time">${dayLength}</div><div class="sub-label">Total Daylight</div></div>
              </div>
            </div>
            <div class="day-length-card">
              <h3><i class="fa-solid fa-chart-pie"></i> Daylight Distribution</h3>
              <div class="day-progress"><div class="day-progress-bar"><div class="day-progress-fill" style="width: ${dayLengthPercentage}%"></div></div></div>
              <div class="day-length-stats">
                <div class="day-stat"><div class="value">${dayLength}</div><div class="label">Daylight</div></div>
                <div class="day-stat"><div class="value">${dayLengthPercentage}%</div><div class="label">of 24 Hours</div></div>
              </div>
            </div>
        `;
        document.getElementById("sun-times-content").innerHTML = cartona;
    } catch (error) {
        document.getElementById("sun-times-content").innerHTML = `<p class="text-center p-5 text-danger">Error loading sun times.</p>`;
    }
    document.getElementById("loading-overlay").classList.add("hidden");
}

function toggleFavorite(element, itemData) {
    console.log("Toggling favorite for:", itemData);
    let isCurrentlyFavorite = holidays_events_longweekends.some(item => item.name === itemData.name);
    
    if (!isCurrentlyFavorite) {
        if (element) {
            element.classList.add('active-heart', 'fa-solid');
            element.classList.remove('fa-regular');
            element.style.color = 'red';
        }
        holidays_events_longweekends.push(itemData);
    } else {
        if (element) {
            element.classList.remove('active-heart', 'fa-solid');
            element.classList.add('fa-regular');
            element.style.color = '';
        }
        holidays_events_longweekends = holidays_events_longweekends.filter(item => item.name !== itemData.name);
    }
    
    localStorage.setItem("allCards", JSON.stringify(holidays_events_longweekends));
    updateAllStats();
}

function updateAllStats() {
    if (stat_saved) stat_saved.innerText = holidays_events_longweekends.length;
    const holidayCount = holidays_events_longweekends.filter(item => item.type === 'holiday').length;
    const eventCount = holidays_events_longweekends.filter(item => item.type === 'event').length;
    const lwCount = holidays_events_longweekends.filter(item => item.type === 'longweekend').length;
    
    const holidayFilterSpan = document.getElementById("filter-holiday-count");
    const eventFilterSpan = document.getElementById("filter-event-count");
    const lwFilterSpan = document.getElementById("filter-lw-count");
    const allFilterSpan = document.getElementById("filter-all-count");
    
    if (holidayFilterSpan) holidayFilterSpan.innerText = holidayCount;
    if (eventFilterSpan) eventFilterSpan.innerText = eventCount;
    if (lwFilterSpan) lwFilterSpan.innerText = lwCount;
    if (allFilterSpan) allFilterSpan.innerText = holidays_events_longweekends.length;
}

let currentFilter = 'all';

function applyFilter() {
    let filteredItems = currentFilter === 'all' ? holidays_events_longweekends : holidays_events_longweekends.filter(item => item.type === currentFilter);
    loadMy_plansWithFilter(filteredItems);
}

async function loadMy_plans() {
    loadMy_plansWithFilter(holidays_events_longweekends);
}

function loadMy_plansWithFilter(filteredPlans) {
    page_title.innerText = "My Plans";
    page_subtitle.innerText = `Manage your saved travel highlights`;
    let container = document.getElementById("plans-content");
    updateAllStats();
    
    if (filteredPlans.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="empty-icon"><i class="fa-solid fa-heart-crack"></i></div><h3>No Saved Plans Yet</h3><p>Start exploring and save items you like!</p></div>`;
        return;
    }
    
    let cartona = `<div class="plans-grid">`;
    filteredPlans.forEach((item, index) => {
        let itemType = item.type || 'saved';
        let typeIcon = itemType === 'holiday' ? 'fa-calendar-check' : (itemType === 'event' ? 'fa-ticket' : 'fa-umbrella-beach');
        let typeColor = itemType === 'holiday' ? '#10b981' : (itemType === 'event' ? '#8b5cf6' : '#f59e0b');
        
        cartona += `
            <div class="holiday-card" data-type="${itemType}">
                <div class="holiday-card-header">
                    <div class="holiday-date-box" style="background: ${typeColor};"><span class="day">${index + 1}</span><span class="month" style="font-size: 10px;">${itemType.toUpperCase()}</span></div>
                    <button class="holiday-action-btn" onclick="removeFromPlans('${item.name.replace(/'/g, "\\'")}')"><i class="fa-solid fa-heart" style="color: red;"></i></button>
                </div>
                <h3>${item.localName || item.name}</h3>
                <p class="holiday-name"><i class="fa-solid ${typeIcon}"></i> ${itemType}</p>
                <div class="holiday-card-footer"><button onclick="removeFromPlans('${item.name.replace(/'/g, "\\'")}')" style="background:none; border:none; color:#ff4d4d; cursor:pointer;"><i class="fa-solid fa-circle-xmark"></i> Remove</button></div>
            </div>
        `;
    });
    cartona += `</div>`;
    container.innerHTML = cartona;
}

function removeFromPlans(itemName) {
    Swal.fire({
        title: 'Are you sure?', text: "Do you want to remove this from your plans?", icon: 'warning', showCancelButton: true,
        confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
        if (result.isConfirmed) {
            holidays_events_longweekends = holidays_events_longweekends.filter(item => item.name !== itemName);
            localStorage.setItem("allCards", JSON.stringify(holidays_events_longweekends));
            if (stat_saved) stat_saved.innerText = holidays_events_longweekends.length;
            loadMy_plans();
            Swal.fire('Deleted!', 'Item has been removed.', 'success');
        }
    });
}

function clearAllPlans() {
    Swal.fire({
        title: 'Clear All Plans?', text: "This will remove everything you have saved!", icon: 'warning', showCancelButton: true,
        confirmButtonText: 'Yes, clear all', confirmButtonColor: '#ff4d4d', cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            holidays_events_longweekends = [];
            localStorage.setItem("allCards", JSON.stringify(holidays_events_longweekends));
            if (stat_saved) stat_saved.innerText = 0;
            updateAllStats();
            loadMy_plans();
            Swal.fire('Cleared!', 'Your plans are empty.', 'success');
        }
    });
}

function setupPlanFilters() {
    const filterButtons = document.querySelectorAll('.plan-filter');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            applyFilter();
        });
    });
}

setTimeout(() => { setupPlanFilters(); }, 500);

asideLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        asideLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
        let targetId = this.getAttribute("data-view");
        document.querySelectorAll("section").forEach(section => section.classList.remove("active"));
        document.getElementById(targetId).classList.add("active");
        
        if (selectedCountryCode && selectedCountryCode !== "" && dashboardInfo && dashboardInfo.style.display === "none") {
            Swal.fire({
                icon: 'info',
                title: 'Explore First',
                text: 'Please click "Explore" button to load data for this country.',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }
        
        if (targetId == "holidays-view") loadHolidays();
        else if (targetId == "events-view") { if (cites && current_city) loadEvents(12); else showNoCountryMessageForSection("events-content", "events"); }
        else if (targetId == "weather-view") { if (cites && current_city) loadWeather(cites[0].capitalInfo.latlng[0], cites[0].capitalInfo.latlng[1], current_city); else showNoCountryMessageForSection("weather-content", "weather"); }
        else if (targetId == "long-weekends-view") loadLong_weekends();
        else if (targetId == "currency-view") loadCurrency();
        else if (targetId == "sun-times-view") { if (cites && current_city) loadSun_Times(cites[0].capitalInfo.latlng[0], cites[0].capitalInfo.latlng[1], today); else showNoCountryMessageForSection("sun-times-content", "sun times"); }
        else if (targetId == "my-plans-view") loadMy_plans();
    });
});

updateAllStats();