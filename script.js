// Global variables
let tickerHistory = [];
let favoriteTickers = [];
let currentSymbol = null;
let currentTab = 'history';
let isAutoFlipping = false;
let autoFlipIntervalId = null;
const AUTO_FLIP_INTERVAL = 5000; // 5 seconds

// List of S&P 500 stocks - hard coded
const SP500_STOCKS = ["MMM", "AOS", "ABT", "ABBV", "ACN", "ADBE", "AMD", "AES", "AFL", "A", "APD", "ABNB", "AKAM", "ALB", "ARE", "ALGN", "ALLE", "LNT", "ALL", "GOOGL", "GOOG", "MO", "AMZN", "AMCR", "AEE", "AEP", "AXP", "AIG", "AMT", "AWK", "AMP", "AME", "AMGN", "APH", "ADI", "ANSS", "AON", "APA", "APO", "AAPL", "AMAT", "APTV", "ACGL", "ADM", "ANET", "AJG", "AIZ", "T", "ATO", "ADSK", "ADP", "AZO", "AVB", "AVY", "AXON", "BKR", "BALL", "BAC", "BAX", "BDX", "BRK.B", "BBY", "TECH", "BIIB", "BLK", "BX", "BK", "BA", "BKNG", "BWA", "BSX", "BMY", "AVGO", "BR", "BRO", "BF.B", "BLDR", "BG", "BXP", "CHRW", "CDNS", "CZR", "CPT", "CPB", "COF", "CAH", "KMX", "CCL", "CARR", "CAT", "CBOE", "CBRE", "CDW", "CE", "COR", "CNC", "CNP", "CF", "CRL", "SCHW", "CHTR", "CVX", "CMG", "CB", "CHD", "CI", "CINF", "CTAS", "CSCO", "C", "CFG", "CLX", "CME", "CMS", "KO", "CTSH", "CL", "CMCSA", "CAG", "COP", "ED", "STZ", "CEG", "COO", "CPRT", "GLW", "CPAY", "CTVA", "CSGP", "COST", "CTRA", "CRWD", "CCI", "CSX", "CMI", "CVS", "DHR", "DRI", "DVA", "DAY", "DECK", "DE", "DELL", "DAL", "DVN", "DXCM", "FANG", "DLR", "DFS", "DG", "DLTR", "D", "DPZ", "DOV", "DOW", "DHI", "DTE", "DUK", "DD", "EMN", "ETN", "EBAY", "ECL", "EIX", "EW", "EA", "ELV", "EMR", "ENPH", "ETR", "EOG", "EPAM", "EQT", "EFX", "EQIX", "EQR", "ERIE", "ESS", "EL", "EG", "EVRG", "ES", "EXC", "EXPE", "EXPD", "EXR", "XOM", "FFIV", "FDS", "FICO", "FAST", "FRT", "FDX", "FIS", "FITB", "FSLR", "FE", "FI", "FMC", "F", "FTNT", "FTV", "FOXA", "FOX", "BEN", "FCX", "GRMN", "IT", "GE", "GEHC", "GEV", "GEN", "GNRC", "GD", "GIS", "GM", "GPC", "GILD", "GPN", "GL", "GDDY", "GS", "HAL", "HIG", "HAS", "HCA", "DOC", "HSIC", "HSY", "HES", "HPE", "HLT", "HOLX", "HD", "HON", "HRL", "HST", "HWM", "HPQ", "HUBB", "HUM", "HBAN", "HII", "IBM", "IEX", "IDXX", "ITW", "INCY", "IR", "PODD", "INTC", "ICE", "IFF", "IP", "IPG", "INTU", "ISRG", "IVZ", "INVH", "IQV", "IRM", "JBHT", "JBL", "JKHY", "J", "JNJ", "JCI", "JPM", "JNPR", "K", "KVUE", "KDP", "KEY", "KEYS", "KMB", "KIM", "KMI", "KKR", "KLAC", "KHC", "KR", "LHX", "LH", "LRCX", "LW", "LVS", "LDOS", "LEN", "LII", "LLY", "LIN", "LYV", "LKQ", "LMT", "L", "LOW", "LULU", "LYB", "MTB", "MPC", "MKTX", "MAR", "MMC", "MLM", "MAS", "MA", "MTCH", "MKC", "MCD", "MCK", "MDT", "MRK", "META", "MET", "MTD", "MGM", "MCHP", "MU", "MSFT", "MAA", "MRNA", "MHK", "MOH", "TAP", "MDLZ", "MPWR", "MNST", "MCO", "MS", "MOS", "MSI", "MSCI", "NDAQ", "NTAP", "NFLX", "NEM", "NWSA", "NWS", "NEE", "NKE", "NI", "NDSN", "NSC", "NTRS", "NOC", "NCLH", "NRG", "NUE", "NVDA", "NVR", "NXPI", "ORLY", "OXY", "ODFL", "OMC", "ON", "OKE", "ORCL", "OTIS", "PCAR", "PKG", "PLTR", "PANW", "PARA", "PH", "PAYX", "PAYC", "PYPL", "PNR", "PEP", "PFE", "PCG", "PM", "PSX", "PNW", "PNC", "POOL", "PPG", "PPL", "PFG", "PG", "PGR", "PLD", "PRU", "PEG", "PTC", "PSA", "PHM", "PWR", "QCOM", "DGX", "RL", "RJF", "RTX", "O", "REG", "REGN", "RF", "RSG", "RMD", "RVTY", "ROK", "ROL", "ROP", "ROST", "RCL", "SPGI", "CRM", "SBAC", "SLB", "STX", "SRE", "NOW", "SHW", "SPG", "SWKS", "SJM", "SW", "SNA", "SOLV", "SO", "LUV", "SWK", "SBUX", "STT", "STLD", "STE", "SYK", "SMCI", "SYF", "SNPS", "SYY", "TMUS", "TROW", "TTWO", "TPR", "TRGP", "TGT", "TEL", "TDY", "TFX", "TER", "TSLA", "TXN", "TPL", "TXT", "TMO", "TJX", "TSCO", "TT", "TDG", "TRV", "TRMB", "TFC", "TYL", "TSN", "USB", "UBER", "UDR", "ULTA", "UNP", "UAL", "UPS", "URI", "UNH", "UHS", "VLO", "VTR", "VLTO", "VRSN", "VRSK", "VZ", "VRTX", "VTRS", "VICI", "V", "VST", "VMC", "WRB", "GWW", "WAB", "WBA", "WMT", "DIS", "WBD", "WM", "WAT", "WEC", "WFC", "WELL", "WST", "WDC", "WY", "WMB", "WTW", "WDAY", "WYNN", "XEL", "XYL", "YUM", "ZBRA", "ZBH", "ZTS"];


// Cookie functions
function setCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    // Use SameSite=Lax for better security; Secure needed if site is HTTPS
    const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${d.toUTCString()};path=/; SameSite=Lax${secureFlag}`;
}

function getCookie(name) {
    const cname = name + "=";
    try {
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(cname) === 0) {
                try {
                    return JSON.parse(c.substring(cname.length, c.length));
                } catch (e) {
                    console.error("Error parsing cookie:", name, e);
                    return null;
                }
            }
        }
    } catch (e) {
        console.error("Error decoding cookie string:", e);
    }
    return null;
}

function loadDataFromCookies() {
    tickerHistory = getCookie('tickerHistory') || [];
    favoriteTickers = getCookie('favoriteTickers') || [];
    // Ensure they are arrays, even if cookie was corrupted
    if (!Array.isArray(tickerHistory)) tickerHistory = [];
    if (!Array.isArray(favoriteTickers)) favoriteTickers = [];
}

// Get random stock
function getRandomStock() {
    if (SP500_STOCKS.length === 0) {
        console.error("SP500_STOCKS array is empty!");
        return "AAPL"; // Fallback
    }
    return SP500_STOCKS[Math.floor(Math.random() * SP500_STOCKS.length)];
}

// Load Chart
function loadChart(symbol = null) {
    console.log("Load chart requested for:", symbol || "random");
    let newSymbol;

    // Determine the symbol to load
    if (symbol) {
        newSymbol = symbol.toUpperCase(); // Ensure uppercase
    } else {
        newSymbol = getRandomStock();
        console.log("No specific symbol, picked random:", newSymbol);
    }

    // Add PREVIOUS symbol to history only if it changed and wasn't just loaded
    if (currentSymbol && currentSymbol !== newSymbol) {
        // Remove the old symbol if it exists, then add to the end (most recent)
        tickerHistory = tickerHistory.filter(item => item !== currentSymbol);
        tickerHistory.push(currentSymbol);
        // Optional: Limit history size
        // const MAX_HISTORY = 50;
        // if (tickerHistory.length > MAX_HISTORY) {
        //   tickerHistory = tickerHistory.slice(tickerHistory.length - MAX_HISTORY);
        // }
        setCookie('tickerHistory', tickerHistory);
        console.log("Added to history:", currentSymbol);
    }

    // Update current symbol *before* initializing widget
    currentSymbol = newSymbol;
    console.log("Current symbol set to:", currentSymbol);

    // Remove old widget and error message if they exist
    const container = document.getElementById("chart-container");
    if (!container) {
        console.error("Chart container not found!");
        return;
    }
    const oldWidget = document.getElementById("tradingview-widget");
    if (oldWidget) oldWidget.remove();
    const errorMessage = container.querySelector('p.error-message');
    if (errorMessage) errorMessage.remove();

    // Create new container div for the widget
    const newWidgetDiv = document.createElement("div");
    newWidgetDiv.id = "tradingview-widget";
    container.appendChild(newWidgetDiv);

    // Determine theme
    const chartTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';

    // Initialize TradingView Widget
    try {
        console.log(`Initializing TradingView for symbol: ${currentSymbol}, theme: ${chartTheme}`);
        if (typeof TradingView === 'undefined' || !TradingView || !TradingView.widget) {
           throw new Error("TradingView library is not loaded.");
        }

        new TradingView.widget({
            "container_id": "tradingview-widget",
            "autosize": true,
            "symbol": currentSymbol, // Use the determined symbol
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": chartTheme,
            "style": "1", // Candlesticks
            "locale": "en",
            "toolbar_bg": chartTheme === 'dark' ? "#3a3f44" : "#f1f3f6", // Adjusted colors slightly
            "enable_publishing": false,
            "allow_symbol_change": true, // Allows user to type new symbols
            "withdateranges": true,
            "hide_side_toolbar": false, // Show drawing tools etc.
            "details": true, // Show Details window
            "hotlist": true, // Show Hotlist
            "calendar": true, // Show Economic Calendar
            "news": ["headlines"], // Show news headlines
            "show_popup_button": true,
            "popup_width": 1000,
            "popup_height": 650,
            "hide_volume": false, // Often useful to show volume
            "studies": [], // No default studies
        });
    } catch (e) {
        console.error("Error initializing TradingView Widget:", e);
        const errorP = document.createElement('p');
        errorP.classList.add('error-message');
        errorP.textContent = `Could not load chart for ${currentSymbol}. Please try again or select another symbol. Error: ${e.message}`;
        container.appendChild(errorP);
    }

    // Update sidebar *after* potential history change
    updateSidebarDisplay();
}

// Toggle Favorite
function toggleFavorite(ticker) {
    if (!ticker) return;
    const index = favoriteTickers.indexOf(ticker);
    if (index === -1) {
        // Add to favorites, maybe limit size
        favoriteTickers.push(ticker);
    } else {
        // Remove from favorites
        favoriteTickers.splice(index, 1);
    }
    setCookie('favoriteTickers', favoriteTickers);
    updateSidebarDisplay(); // Update UI to reflect change
}

// Clear History
function clearHistory() {
    if (confirm("Are you sure you want to clear the history? This action cannot be undone.")) {
        tickerHistory = [];
        setCookie('tickerHistory', tickerHistory);
        updateSidebarDisplay(); // Update UI
    }
}

// Update Sidebar Display
function updateSidebarDisplay() {
    const list = document.getElementById("sidebar-list");
    if (!list) return;
    list.innerHTML = ""; // Clear current list

    let displayList = (currentTab === 'history') ? tickerHistory : favoriteTickers;

    // Show/hide clear history button
    const clearHistoryContainer = document.querySelector(".clear-history-container");
    if (clearHistoryContainer) {
        clearHistoryContainer.style.display = currentTab === 'history' && tickerHistory.length > 0 ? 'block' : 'none';
    }

    // Handle empty list state
     if (displayList.length === 0) {
        const li = document.createElement("li");
        li.textContent = `No ${currentTab === 'history' ? 'history' : 'favorites'} yet.`;
        li.style.textAlign = 'center';
        li.style.color = '#6c757d';
        li.style.cursor = 'default';
        li.style.padding = '20px 0';
        list.appendChild(li);
        return; // Stop here if list is empty
    }

    // Populate list (most recent first for history, maybe alphabetical for favorites?)
    // For history: Reverse is correct (most recent at top)
    // For favorites: Maybe sort alphabetically?
    if (currentTab === 'favorites') {
        displayList = [...favoriteTickers].sort(); // Sort favorites alphabetically
    } else {
         displayList = [...tickerHistory].reverse(); // Show most recent history first
    }


    displayList.forEach(ticker => {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = ticker;
        textSpan.style.flexGrow = "1";
        textSpan.style.marginRight = "10px";
        textSpan.style.overflow = "hidden";
        textSpan.style.textOverflow = "ellipsis"; // Prevent long names overflowing

        // Click on list item (not the star) loads chart
        li.onclick = (e) => {
            // Only trigger if the click is not on the star itself
            if (e.target !== star) {
                stopAutoFlip(); // Stop auto-flip if running
                loadChart(ticker);
                // Optionally close sidebar on selection
                // const sidebar = document.getElementById("history-sidebar");
                // if (sidebar && sidebar.classList.contains('open')) {
                //   toggleSidebar();
                // }
            }
        };

        // Star icon for favorites
        const star = document.createElement("span");
        star.classList.add("star");
        const isFavorite = favoriteTickers.includes(ticker);
        star.innerText = isFavorite ? "★" : "☆"; // Solid star if favorite
        star.style.color = isFavorite ? "#FFD700" : "inherit"; // Gold for favorite

        // Click on star toggles favorite status
        star.onclick = (e) => {
            e.stopPropagation(); // Prevent li click event from firing
            toggleFavorite(ticker);
        };

        li.appendChild(textSpan);
        li.appendChild(star);
        list.appendChild(li);
    });
}

// Toggle Sidebar
function toggleSidebar() {
    document.getElementById("history-sidebar")?.classList.toggle("open");
}

// Switch Sidebar Tab
function switchTab(tabName) {
    currentTab = tabName;
    document.getElementById("history-tab")?.classList.toggle("active", tabName === 'history');
    document.getElementById("favorites-tab")?.classList.toggle("active", tabName === 'favorites');
    updateSidebarDisplay(); // Update list content
}

// Theme Logic
function updateThemeIcon() {
    const themeToggleButton = document.getElementById('nav-theme');
    if (themeToggleButton) {
        themeToggleButton.innerText = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
        themeToggleButton.title = `Switch to ${document.body.classList.contains('dark-mode') ? 'Light' : 'Dark'} Mode`;
        themeToggleButton.setAttribute('aria-label', themeToggleButton.title);
    }
}

function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    updateThemeIcon();
    // Re-load chart with current symbol to apply new theme
    if (currentSymbol && typeof TradingView !== 'undefined') {
        const chartContainer = document.getElementById("chart-container");
        // Only reload if a chart widget actually exists or the container is present
        if (chartContainer && (chartContainer.querySelector('#tradingview-widget') || chartContainer.querySelector('iframe'))) {
            console.log("Applying theme change to chart for:", currentSymbol);
            // Small delay to allow theme transition CSS to potentially apply first
            setTimeout(() => loadChart(currentSymbol), 50);
        } else {
             console.log("Theme applied, but no chart currently loaded to update.");
        }
    } else {
         console.log("Theme applied, no current symbol or TradingView library not ready.");
    }
}

function toggleTheme() {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme); // Save preference
    applyTheme(newTheme);
    stopAutoFlip(); // Stop auto flip when changing theme manually
}

// Auto-Flip Functions
function updateAutoFlipButton() {
    const button = document.getElementById('nav-auto-flip');
    if (button) {
        button.innerText = isAutoFlipping ? '⏸️' : '▶️';
        button.title = isAutoFlipping ? 'Stop Auto-Flip' : `Start Auto-Flip (every ${AUTO_FLIP_INTERVAL / 1000}s)`;
        button.setAttribute('aria-pressed', isAutoFlipping);
        button.classList.toggle('active', isAutoFlipping);
    }
}

function startAutoFlip() {
    if (!isAutoFlipping) {
        isAutoFlipping = true;
        loadChart(); // Load the first random one immediately
        // Ensure any previous interval is cleared before starting a new one
        if (autoFlipIntervalId) clearInterval(autoFlipIntervalId);
        autoFlipIntervalId = setInterval(() => loadChart(), AUTO_FLIP_INTERVAL);
        console.log("Auto-flip started. Interval ID:", autoFlipIntervalId);
        updateAutoFlipButton();
    }
}

function stopAutoFlip() {
    if (isAutoFlipping) {
        clearInterval(autoFlipIntervalId);
        autoFlipIntervalId = null;
        isAutoFlipping = false;
        console.log("Auto-flip stopped.");
        updateAutoFlipButton();
    }
}

function toggleAutoFlip() {
    if (isAutoFlipping) {
        stopAutoFlip();
    } else {
        startAutoFlip();
    }
}


// --- DOMContentLoaded Event Listener ---
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed.");

    // Load data from cookies first
    loadDataFromCookies();

    // Check for URL Parameter to load a specific ticker initially
    const urlParams = new URLSearchParams(window.location.search);
    const tickerFromUrl = urlParams.get('ticker');
    let initialSymbol = null;

    if (tickerFromUrl) {
        initialSymbol = tickerFromUrl.toUpperCase().trim();
        console.log(`Ticker symbol found in URL: ${initialSymbol}`);
        // Optional validation against your list
        if (!SP500_STOCKS.includes(initialSymbol)) {
             console.warn(`Ticker ${initialSymbol} from URL is not in the predefined S&P 500 list. Attempting to load anyway.`);
             // You could choose to clear initialSymbol here if you only want list stocks
             // initialSymbol = null;
        }
    } else {
        console.log("No ticker in URL, will load random on initial call.");
    }

    // Apply Theme (needs to happen before chart load for correct theme)
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    console.log(`Applying initial theme: ${initialTheme}`);
    applyTheme(initialTheme); // Apply theme without reloading chart yet

    // Load Initial Chart (only after theme is applied)
    // Pass the symbol from URL (if found) or null (to trigger random)
    // Ensure TradingView library is loaded or wait for it? Usually it's fast enough.
     if (typeof TradingView !== 'undefined') {
         loadChart(initialSymbol);
     } else {
         console.warn("TradingView library not immediately available. Chart loading might be delayed or fail if library load fails.");
         // Optionally, set a timeout or interval to check for TradingView and then load chart
         // This can get complex, usually relying on the script load order is sufficient.
         // If issues persist, consider explicitly waiting for the library.
         // For now, we assume it loads quickly after the custom script due to placement.
         setTimeout(() => {
             if (typeof TradingView !== 'undefined') {
                loadChart(initialSymbol);
             } else {
                 console.error("TradingView library failed to load in time.");
                 // Display an error message to the user in the chart container
                 const container = document.getElementById("chart-container");
                 if(container) {
                     const errorP = document.createElement('p');
                     errorP.classList.add('error-message');
                     errorP.textContent = 'Error: TradingView library failed to load. Please refresh the page.';
                     container.innerHTML = ''; // Clear container
                     container.appendChild(errorP);
                 }
             }
         }, 500); // Wait 500ms as a fallback check
     }


    // Initial UI updates
    updateSidebarDisplay();
    switchTab('history'); // Default to history tab
    updateAutoFlipButton(); // Set initial state of auto-flip button

    // --- Attach Event Listeners ---
    const navHistoryBtn = document.getElementById('nav-history');
    const navLoadChartBtn = document.getElementById('nav-load-chart');
    const navAutoFlipBtn = document.getElementById('nav-auto-flip');
    const navThemeBtn = document.getElementById('nav-theme');
    const historyTab = document.getElementById('history-tab');
    const favoritesTab = document.getElementById('favorites-tab');
    const clearHistoryBtn = document.getElementById("clear-history-btn");

    if (navHistoryBtn) navHistoryBtn.addEventListener('click', toggleSidebar);
    if (navLoadChartBtn) navLoadChartBtn.addEventListener('click', () => {
        stopAutoFlip(); // Stop auto if running
        loadChart(); // Load a new random chart
    });
    if (navAutoFlipBtn) navAutoFlipBtn.addEventListener('click', toggleAutoFlip);
    if (navThemeBtn) navThemeBtn.addEventListener('click', toggleTheme);
    if (historyTab) historyTab.addEventListener('click', () => switchTab('history'));
    if (favoritesTab) favoritesTab.addEventListener('click', () => switchTab('favorites'));
    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearHistory);

    // Listen for system theme changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.addEventListener) { // Modern way
        darkModeMediaQuery.addEventListener('change', event => {
            if (!localStorage.getItem('theme')) { // Only apply if no user preference is saved
                console.log("System theme changed, applying:", event.matches ? 'dark' : 'light');
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });
    } else if (darkModeMediaQuery.addListener) { // Older way for compatibility
         darkModeMediaQuery.addListener(event => {
            if (!localStorage.getItem('theme')) {
                console.log("System theme changed, applying:", event.matches ? 'dark' : 'light');
                applyTheme(event.matches ? 'dark' : 'light');
            }
         });
    }


    // Stop auto-flip when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isAutoFlipping) {
            stopAutoFlip();
            console.log("Auto-flip automatically paused (page hidden).");
        }
    });

     console.log("Event listeners attached.");
});
