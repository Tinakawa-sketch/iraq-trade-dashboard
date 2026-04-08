# 🇮🇶 Iraq Trade Intelligence Dashboard
# منصة الاستخبارات التجارية العراقية

A full agentic AI-powered trade intelligence platform for Iraqi merchants, investors, and policymakers. Features 10 years of trade data (2015-2024), 34 products with HS codes, 15+ partner countries, a 6-agent AI pipeline, auto risk alerts, and bilingual Arabic/English support.

## ✨ Features

### 📊 Data Coverage
- **10 years** of trade data (2015-2024)
- **14 export products** with HS codes (crude oil, refined petroleum, dates, aluminum, gold, etc.)
- **20 import products** with HS codes and tariff rates (machinery, vehicles, food, pharma, etc.)
- **15 partner countries** with 10-year trend data
- **GDP, oil production, oil revenue** tracked annually

### 🤖 Agentic AI (6-Agent Pipeline)
1. **📥 Data Loader** — Validates dataset structure and completeness
2. **🔍 Quality Checker** — Flags anomalies, outliers, missing data
3. **✅ Source Validator** — Cross-references against World Bank, WTO, EIA, OPEC
4. **📊 Trade Analyst** — Computes CAGR, concentration indices, growth rankings
5. **⚠️ Risk & Opportunity** — Flags sector changes >20%, concentration risks
6. **📝 Report Writer** — Executive summary, key findings, actionable recommendations

### 🔔 Auto Risk Alerts
- Flags oil concentration risk (99.4% of exports)
- Partner dependency monitoring (top-2 buyers = 62.6%)
- Import surge alerts (>20% YoY threshold)
- Food security warnings ($12B+ annual food imports)
- Escalation rules with human review checkpoints

### 💬 AI Chat Advisor
- Ask questions in English or Arabic
- Trained on full 10-year dataset
- Returns specific HS codes, tariffs, growth rates

### 🌐 Bilingual (Arabic/English)
- One-click language toggle
- Full RTL support for Arabic
- Noto Kufi Arabic font

---

## 🚀 Deploy to Vercel (Free)

### Step 1: Prerequisites
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier works)
- An [Anthropic API key](https://console.anthropic.com/) for AI features

### Step 2: Upload to GitHub
```bash
# Create a new repo on GitHub, then:
git init
git add .
git commit -m "Iraq Trade Intelligence Dashboard"
git remote add origin https://github.com/YOUR-USERNAME/iraq-trade-dashboard.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `iraq-trade-dashboard` repo
4. Vercel auto-detects Vite — click **Deploy**
5. Wait ~60 seconds for build to complete

### Step 4: Add API Key
1. In Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add: `ANTHROPIC_API_KEY` = `sk-ant-api03-your-key-here`
3. Click **Save** → **Redeploy**

### Step 5: Share Your Dashboard
Your dashboard is now live at `https://iraq-trade-dashboard.vercel.app` (or your custom domain). Share this URL with anyone — **no login required**.

---

## 🔄 How to Automate Data Updates

### Phase 1: Manual (Current)
Upload new data by editing the arrays in `src/App.jsx`

### Phase 2: Semi-Automated
1. Add a Supabase database (free) to store trade data
2. Create a simple admin page to upload CSV files
3. Dashboard reads from Supabase instead of hardcoded arrays

### Phase 3: Fully Automated
1. Create a GitHub Action that runs monthly
2. The action pulls latest data from:
   - **UN Comtrade API** (free, needs API key): `comtrade.un.org/data/dev/portal`
   - **World Bank API** (free): `api.worldbank.org/v2/country/IRQ`
3. Data is cleaned, validated, and pushed to Supabase
4. Dashboard auto-updates on next page load

Example GitHub Action (`.github/workflows/update-data.yml`):
```yaml
name: Monthly Data Update
on:
  schedule:
    - cron: '0 6 1 * *'  # 1st of every month at 6am UTC
  workflow_dispatch:  # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: node scripts/fetch-trade-data.js
        env:
          UN_COMTRADE_KEY: ${{ secrets.UN_COMTRADE_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
```

---

## 📚 Data Sources

| Source | URL | Data Provided |
|--------|-----|---------------|
| World Bank WITS | wits.worldbank.org | Trade by HS code, partner, year |
| UN Comtrade | comtrade.un.org | Bilateral trade, downloadable |
| OEC | oec.world/en/profile/country/irq | Interactive trade viz |
| WTO | ttd.wto.org | Tariffs, trade flows |
| U.S. EIA | eia.gov/international/analysis/country/irq | Oil production, exports |
| OPEC | opec.org | Monthly oil market reports |
| Trading Economics | tradingeconomics.com/iraq | Exports/imports by category |
| Iraq Central Bank | cbi.iq | Official monetary/trade stats |
| Macrotrends | macrotrends.net | Historical charts |
| Shafaq News | shafaq.com/en/Economy | Latest Iraq economic news |
| Iraqi Customs | customs.mof.gov.iq | ASYCUDA declarations portal |
| Volza | volza.com | Shipment-level trade data |

---

## 🏗 Project Structure

```
iraq-trade-dashboard/
├── api/
│   └── chat.js              # Vercel serverless function (proxies Claude API)
├── public/
├── src/
│   ├── main.jsx             # React entry point
│   └── App.jsx              # Main dashboard component (all data + UI)
├── .env.example             # Environment variables template
├── .gitignore
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── vercel.json              # Vercel deployment config
├── vite.config.js           # Vite build config
└── README.md                # This file
```

---

## ⚠️ Disclaimer

Data is compiled from public sources for informational purposes only. Figures may differ between sources due to methodology (goods vs goods+services, reporting lags, exchange rate fluctuations). Always verify with official Iraqi customs data before making investment decisions. This dashboard does not constitute financial advice.

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

Built with React, Recharts, Vite, and Claude AI by Anthropic.
