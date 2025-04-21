# S&P 500 Stock Explorer 🔎

A simple, interactive web tool designed for quickly viewing TradingView charts of randomly selected stocks from the S&P 500 index. It's perfect for discovering new stocks or performing rapid visual checks on index components.

**➡️ Try the live version:** https://random-snp-500-stock-explorer.netlify.app  ✨ Features

* **Random Stock Discovery:** Instantly loads a TradingView chart for a randomly chosen stock within the S&P 500 list.
* **New Stock Button (🎰):** Easily load a new random stock chart with a single click.
* **Interactive TradingView Chart:** Full charting capabilities provided by the TradingView widget, including tools, indicators (via widget controls), and symbol search.
* **History & Favorites Sidebar (📜):**
    * Tracks recently viewed stocks in the 'History' tab.
    * Allows users to mark stocks as favorites (★) which appear in the 'Favorites' tab.
    * Load any stock from history or favorites by clicking on it.
    * Option to clear viewing history.
* **Theme Toggle (☀️/🌙):** Switch between Light and Dark modes for optimal viewing comfort. Your preference is saved using cookies.
* **Auto-Flip Mode (▶️/⏸️):** Automatically load a new random stock chart every 5 seconds. Ideal for passive discovery.
* **Direct URL Loading:** Load a specific stock on startup by appending `?ticker=SYMBOL` to the URL (e.g., `...?ticker=MSFT`).
* **Hub Link:** Quick link back to the main [Market Shuffle Hub](https://market-shuffle.netlify.app/). * **Responsive Design:** Usable interface on both desktop and mobile devices.

## 🛠️ Technology Stack

* **HTML5:** For the basic structure of the page.
* **CSS3:** For styling, layout (Flexbox), theme variables, and responsiveness.
* **Vanilla JavaScript (ES6+):** For all client-side logic, including:
    * Random stock selection.
    * TradingView widget integration and updates.
    * Sidebar management (history, favorites).
    * Theme switching.
    * Auto-flip functionality.
    * Cookie management for persistence.
* **[TradingView Advanced Chart Widget](https://www.tradingview.com/widget/advanced-chart/):** Used to display the interactive stock charts.
* **Browser Cookies:** Used to store viewing history, favorite tickers, and the selected theme locally on the user's device.

## 🚀 Setup & Usage

**Setup (Local)**

This is a static front-end application. No build steps are required.

1.  Clone or download this repository.
2.  Open the `index.html` file directly in your web browser.

**Usage**

* The page loads with a chart for either a random S&P 500 stock or a specific stock if provided via the `ticker` URL parameter.
* Click the **🎰 (Slot Machine)** button in the bottom navigation to load a new random stock chart.
* Click the **📜 (Scroll)** button in the bottom navigation to open/close the History/Favorites sidebar.
* Inside the sidebar:
    * Use the 'History' and 'Favorites' tabs to switch views.
    * Click the star icon (☆/★) next to a stock ticker to add/remove it from Favorites.
    * Click on any stock ticker in the list to load its chart.
    * Click 'Clear History 🗑️' (visible on the History tab) to clear viewed stocks.
* Click the **☀️/🌙 (Sun/Moon)** button in the top header to toggle between Light and Dark themes.
* Click the **▶️/⏸️ (Play/Pause)** button in the bottom navigation to start or stop the Auto-Flip mode, which loads a new random chart every 5 seconds.

## 📝 S&P 500 List

The list of S&P 500 tickers used by the random generator is hardcoded within `script.js`. Please note that the composition of the S&P 500 index changes periodically, so this list may not always be perfectly up-to-date and might require manual updates to reflect the current index components accurately.

## 🙏 Acknowledgments

* Charts are powered by [TradingView](https://www.tradingview.com/).
