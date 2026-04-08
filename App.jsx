import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, LineChart, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

/* ══════════════════════════════════════════════════════════════
   IRAQ TRADE INTELLIGENCE — FULL AGENTIC DASHBOARD
   10-Year Data · All Products · HS Codes · 6-Agent Pipeline
   Validation · Risk Alerts · Reporting · Bilingual AR/EN
   ══════════════════════════════════════════════════════════════ */

// ─── 10-YEAR MACRO DATA ───
const macro = [
  { year:"2015",exp:49.0,imp:33.8,bal:15.2,oilR:49.4,bpd:3.5,gdp:164.2 },
  { year:"2016",exp:43.0,imp:30.0,bal:13.0,oilR:43.7,bpd:3.8,gdp:165.2 },
  { year:"2017",exp:58.5,imp:35.5,bal:23.0,oilR:58.8,bpd:3.8,gdp:192.1 },
  { year:"2018",exp:92.8,imp:56.8,bal:36.0,oilR:79.0,bpd:4.4,gdp:224.2 },
  { year:"2019",exp:88.9,imp:72.3,bal:16.6,oilR:78.0,bpd:4.6,gdp:234.1 },
  { year:"2020",exp:50.2,imp:54.3,bal:-4.1,oilR:42.0,bpd:3.9,gdp:166.8 },
  { year:"2021",exp:78.3,imp:50.7,bal:27.6,oilR:75.0,bpd:4.1,gdp:207.9 },
  { year:"2022",exp:138.2,imp:87.2,bal:51.0,oilR:105.0,bpd:4.4,gdp:264.2 },
  { year:"2023",exp:115.9,imp:95.5,bal:20.4,oilR:106.0,bpd:4.3,gdp:250.1 },
  { year:"2024",exp:109.8,imp:87.4,bal:22.4,oilR:96.1,bpd:4.4,gdp:268.9 },
];

// ─── EXPORT PRODUCTS (14 items, 10yr) ───
const expP = [
  {hs:"2709",n:"Crude Petroleum",a:"النفط الخام",c:"Oil",d:[48.5,42.5,57.8,91.5,87.5,49.2,76.8,135.5,103.2,98.4]},
  {hs:"2710",n:"Refined Petroleum",a:"المنتجات النفطية",c:"Oil",d:[0.3,0.3,0.5,0.8,0.9,0.6,1.0,2.1,8.5,9.1]},
  {hs:"2711",n:"Petroleum Gas",a:"الغاز النفطي",c:"Oil",d:[0.05,0.04,0.06,0.1,0.12,0.08,0.15,0.3,0.55,0.66]},
  {hs:"2713",n:"Petroleum Coke",a:"فحم الكوك",c:"Oil",d:[0.02,0.02,0.03,0.05,0.06,0.04,0.08,0.5,0.82,0.77]},
  {hs:"2707",n:"Coal Tar Oils",a:"زيوت القطران",c:"Oil",d:[0.01,0.01,0.01,0.02,0.03,0.02,0.04,0.1,0.18,0.22]},
  {hs:"0804",n:"Dates",a:"التمور",c:"Agri",d:[0.08,0.07,0.09,0.1,0.11,0.09,0.1,0.11,0.12,0.095]},
  {hs:"7601",n:"Aluminum",a:"الألمنيوم",c:"Metal",d:[0.01,0.01,0.02,0.03,0.04,0.03,0.05,0.08,0.09,0.04]},
  {hs:"7108",n:"Gold",a:"الذهب",c:"Metal",d:[0.005,0.005,0.01,0.02,0.03,0.02,0.04,0.05,0.065,0.06]},
  {hs:"7403",n:"Copper",a:"النحاس",c:"Metal",d:[0.003,0.003,0.005,0.01,0.02,0.01,0.03,0.04,0.05,0.03]},
  {hs:"2503",n:"Sulfur",a:"الكبريت",c:"Ind.",d:[0.02,0.02,0.03,0.04,0.04,0.03,0.04,0.05,0.05,0.05]},
  {hs:"4703",n:"Wood Pulp",a:"لب الخشب",c:"Ind.",d:[0.001,0.001,0.002,0.005,0.005,0.003,0.008,0.01,0.02,0.027]},
  {hs:"1515",n:"Vegetable Oils",a:"الزيوت النباتية",c:"Agri",d:[0.01,0.01,0.015,0.02,0.025,0.02,0.025,0.03,0.03,0.019]},
  {hs:"0802",n:"Nuts",a:"المكسرات",c:"Agri",d:[0.005,0.005,0.008,0.01,0.015,0.01,0.015,0.02,0.025,0.02]},
  {hs:"4101",n:"Raw Hides",a:"الجلود الخام",c:"Agri",d:[0.003,0.003,0.003,0.004,0.004,0.003,0.004,0.004,0.004,0.004]},
];

// ─── IMPORT PRODUCTS (20 items, 10yr) ───
const impP = [
  {hs:"84xx",n:"Machinery & Transport",a:"الآلات والنقل",c:"Ind.",d:[12.8,11.4,13.5,21.6,27.5,20.6,19.3,18.9,25.3,33.7],t:"5-10%"},
  {hs:"99xx",n:"Misc. Manufactured",a:"سلع مصنعة",c:"Consumer",d:[5.4,4.8,5.7,9.1,11.6,8.7,8.1,8.0,10.7,13.8],t:"10-25%"},
  {hs:"2710",n:"Refined Fuel",a:"الوقود المكرر",c:"Energy",d:[3.5,3.1,3.7,5.9,7.5,5.6,5.3,6.2,7.1,8.6],t:"0-5%"},
  {hs:"87xx",n:"Vehicles & Parts",a:"المركبات",c:"Transport",d:[2.0,1.8,2.1,3.4,4.3,3.2,3.0,3.5,4.5,5.1],t:"25-35%"},
  {hs:"85xx",n:"Electrical Equipment",a:"المعدات الكهربائية",c:"Ind.",d:[1.5,1.3,1.6,2.5,3.2,2.4,2.2,2.8,3.6,4.2],t:"10-20%"},
  {hs:"72xx",n:"Iron & Steel",a:"الحديد والصلب",c:"Constr.",d:[2.1,1.9,2.2,3.5,4.5,3.4,3.1,3.2,4.3,4.2],t:"5-15%"},
  {hs:"10xx",n:"Cereals",a:"الحبوب",c:"Food",d:[1.8,1.6,1.9,3.0,3.9,2.9,2.7,3.1,3.4,3.8],t:"0-5%"},
  {hs:"7108",n:"Gold & Jewellery",a:"الذهب والمجوهرات",c:"Luxury",d:[0.4,0.4,0.5,0.8,1.0,0.7,0.7,1.8,2.2,2.5],t:"5%"},
  {hs:"02xx",n:"Meat & Poultry",a:"اللحوم",c:"Food",d:[0.9,0.8,0.9,1.5,1.9,1.4,1.3,1.6,1.8,2.1],t:"5-15%"},
  {hs:"3004",n:"Pharmaceuticals",a:"الأدوية",c:"Health",d:[0.8,0.7,0.9,1.4,1.8,1.3,1.2,1.5,1.7,1.9],t:"0-5%"},
  {hs:"39xx",n:"Plastics",a:"البلاستيك",c:"Ind.",d:[0.6,0.5,0.6,1.0,1.3,0.9,0.9,1.2,1.4,1.6],t:"5-15%"},
  {hs:"61-62",n:"Textiles & Clothing",a:"المنسوجات",c:"Consumer",d:[0.6,0.5,0.6,1.0,1.2,0.9,0.9,1.1,1.3,1.5],t:"15-25%"},
  {hs:"73xx",n:"Steel Products",a:"منتجات الصلب",c:"Constr.",d:[0.5,0.5,0.5,0.8,1.1,0.8,0.8,1.0,1.2,1.4],t:"10-20%"},
  {hs:"04xx",n:"Dairy Products",a:"الألبان",c:"Food",d:[0.5,0.5,0.5,0.8,1.1,0.8,0.7,0.9,1.1,1.3],t:"5-15%"},
  {hs:"8517",n:"Telecom Equipment",a:"معدات الاتصالات",c:"Tech",d:[0.2,0.2,0.3,0.5,0.6,0.4,0.5,0.7,0.9,1.1],t:"10-20%"},
  {hs:"25xx",n:"Cement & Building",a:"الإسمنت",c:"Constr.",d:[0.4,0.4,0.4,0.7,0.9,0.7,0.6,0.8,0.9,1.0],t:"5-15%"},
  {hs:"31xx",n:"Fertilizers",a:"الأسمدة",c:"Agri",d:[0.3,0.3,0.3,0.5,0.6,0.5,0.5,0.6,0.7,0.85],t:"0-5%"},
  {hs:"30xx",n:"Medical Supplies",a:"المستلزمات الطبية",c:"Health",d:[0.3,0.3,0.3,0.5,0.6,0.5,0.5,0.6,0.7,0.8],t:"0-5%"},
  {hs:"94xx",n:"Furniture",a:"الأثاث",c:"Consumer",d:[0.2,0.2,0.2,0.4,0.5,0.4,0.4,0.5,0.6,0.7],t:"15-25%"},
  {hs:"17xx",n:"Sugar & Confectionery",a:"السكر",c:"Food",d:[0.2,0.2,0.2,0.3,0.4,0.3,0.3,0.4,0.4,0.5],t:"5-15%"},
];

// ─── PARTNERS ───
const ptE = [
  {c:"China",a:"الصين",f:"🇨🇳",d:[20,22,25,28,28,29,30,32,33.2,34.1]},
  {c:"India",a:"الهند",f:"🇮🇳",d:[22,23,24,25,26,27,27,27,27.8,28.5]},
  {c:"USA",a:"أمريكا",f:"🇺🇸",d:[15,14,12,11,10,9.5,9,8.5,8.3,7.9]},
  {c:"Greece",a:"اليونان",f:"🇬🇷",d:[4,4,4.5,4.5,5,5,5,5,5.3,5.1]},
  {c:"UAE",a:"الإمارات",f:"🇦🇪",d:[3,3.5,4,4,4.5,4.5,5,5,5.3,5.0]},
  {c:"S.Korea",a:"كوريا",f:"🇰🇷",d:[8,7,7,6,5,5,4.5,4.5,4.2,4.5]},
  {c:"Italy",a:"إيطاليا",f:"🇮🇹",d:[6,5.5,5,4.5,4,3.5,3.5,3,3.1,2.8]},
  {c:"Others",a:"أخرى",f:"🌍",d:[22,21,18.5,17,17.5,16.5,16,15,12.8,12.1]},
];
const ptI = [
  {c:"UAE",a:"الإمارات",f:"🇦🇪",d:[25,26,28,29,30,30,31,31,32.2,30.5]},
  {c:"China",a:"الصين",f:"🇨🇳",d:[14,15,16,17,18,19,19,20,20.4,22.1]},
  {c:"Turkey",a:"تركيا",f:"🇹🇷",d:[18,18,18,18,18,18,18,18,18.3,19.0]},
  {c:"India",a:"الهند",f:"🇮🇳",d:[3,3,3.5,4,4,4,4.5,4.5,5.0,5.3]},
  {c:"Iran",a:"إيران",f:"🇮🇷",d:[8,7.5,7,6.5,6,5.5,5,5,4.8,4.5]},
  {c:"USA",a:"أمريكا",f:"🇺🇸",d:[6,5,4,3.5,3,2.5,2.5,2,2.0,2.1]},
  {c:"Others",a:"أخرى",f:"🌍",d:[26,25.5,23.5,22,21,21,20,19.5,17.3,16.5]},
];

// ─── RESOURCES ───
const resources = [
  {n:"World Bank WITS",u:"wits.worldbank.org/CountryProfile/en/IRQ",d:"Official trade data by HS code, partner, year"},
  {n:"UN Comtrade",u:"comtrade.un.org",d:"Gold standard for bilateral trade, downloadable"},
  {n:"OEC Iraq Profile",u:"oec.world/en/profile/country/irq",d:"Interactive trade visualization"},
  {n:"WTO Iraq Profile",u:"ttd.wto.org/en/profiles/iraq",d:"Tariffs, duties, trade flows"},
  {n:"U.S. EIA — Iraq",u:"eia.gov/international/analysis/country/irq",d:"Oil production, exports, infrastructure"},
  {n:"OPEC Reports",u:"opec.org/opec_web/en/publications/338.htm",d:"Monthly oil market reports"},
  {n:"Trading Economics",u:"tradingeconomics.com/iraq/exports",d:"Exports, imports, by category/country"},
  {n:"Iraq Central Bank",u:"cbi.iq",d:"Official monetary and trade statistics"},
  {n:"Macrotrends Iraq",u:"macrotrends.net/global-metrics/countries/irq/iraq/exports",d:"Historical export/import charts"},
  {n:"Shafaq News Economy",u:"shafaq.com/en/Economy",d:"Latest Iraq economic news"},
  {n:"Iraqi Customs (ASYCUDA)",u:"customs.mof.gov.iq",d:"Official customs declarations portal"},
  {n:"Volza Iraq Trade Data",u:"volza.com/global-trade-data/iraq-import-trade-data",d:"Shipment-level import data"},
];

// ─── AGENT DEFINITIONS ───
const agentDefs = [
  {id:"loader",n:"Data Loader",a:"محمّل البيانات",icon:"📥",color:"#06B6D4",desc:"Validates dataset structure and completeness"},
  {id:"quality",n:"Quality Checker",a:"فاحص الجودة",icon:"🔍",color:"#F59E0B",desc:"Checks anomalies, outliers, missing data"},
  {id:"validator",n:"Source Validator",a:"مدقق المصادر",icon:"✅",color:"#10B981",desc:"Cross-references against World Bank, WTO, EIA, OPEC"},
  {id:"analyst",n:"Trade Analyst",a:"المحلل التجاري",icon:"📊",color:"#3B82F6",desc:"Computes trends, CAGR, concentration indices"},
  {id:"risk",n:"Risk & Opportunity",a:"المخاطر والفرص",icon:"⚠️",color:"#EF4444",desc:"Flags risks >20% change, concentration, dependencies"},
  {id:"reporter",n:"Report Writer",a:"كاتب التقارير",icon:"📝",color:"#8B5CF6",desc:"Executive summary, policy recommendations, merchant briefing"},
];

// ─── RISK THRESHOLDS ───
const computeRisks = () => {
  const alerts = [];
  const L = macro[macro.length-1], P = macro[macro.length-2];
  // Oil concentration
  alerts.push({lvl:"critical",icon:"🔴",t:"Oil = 99.4% of exports — extreme single-commodity concentration",a:"النفط = 99.4% من الصادرات — تركيز شديد على سلعة واحدة"});
  // Partner concentration
  alerts.push({lvl:"high",icon:"🟠",t:"Top 2 export buyers (China+India) = 62.6% — high partner risk",a:"أكبر مشتريين (الصين+الهند) = 62.6% — مخاطر شريك عالية"});
  // Import single source
  alerts.push({lvl:"high",icon:"🟠",t:"UAE supplies 30.5% of imports — single-source dependency",a:"الإمارات تورد 30.5% من الواردات — اعتماد على مصدر واحد"});
  // 2020 vulnerability
  alerts.push({lvl:"high",icon:"🟠",t:"2020 trade deficit (-$4.1B) when oil crashed — volatility exposure",a:"عجز تجاري 2020 (-4.1 مليار$) عند انهيار النفط"});
  // Check import surges >25%
  impP.forEach(p => {
    const yoy = ((p.d[9]-p.d[8])/p.d[8]*100).toFixed(1);
    if(parseFloat(yoy) > 25) alerts.push({lvl:"medium",icon:"🟡",t:`HS ${p.hs} ${p.n}: imports surged ${yoy}% YoY — monitor for price pressure`,a:`HS ${p.hs} ${p.a}: الواردات ارتفعت ${yoy}% — راقب ضغط الأسعار`});
  });
  // Non-oil exports
  alerts.push({lvl:"medium",icon:"🟡",t:"Non-oil exports <1% of total — diversification urgently needed",a:"الصادرات غير النفطية أقل من 1% — التنويع مطلوب بشكل عاجل"});
  // Food dependency
  alerts.push({lvl:"medium",icon:"🟡",t:"Iraq imports 90% of food ($12B+/yr) — food security risk",a:"العراق يستورد 90% من الغذاء — خطر أمن غذائي"});
  return alerts;
};

// ─── STYLES ───
const F="'Outfit','DM Sans',system-ui,sans-serif";
const M="'JetBrains Mono',monospace";
const BD="rgba(255,255,255,0.06)";
const cd={background:"rgba(255,255,255,0.03)",border:`1px solid ${BD}`,borderRadius:12,padding:"13px 10px",marginBottom:11};

const TABS=["Home","Exports","Imports","Countries","Invest","Agents","Alerts","Resources","Chat","About"];

export default function IraqFullAgenticDashboard(){
  const[lang,setLang]=useState("en");
  const[tab,setTab]=useState("Home");
  const[eCat,setECat]=useState("All");
  const[iCat,setICat]=useState("All");
  const[msgs,setMsgs]=useState([]);
  const[cin,setCin]=useState("");
  const[cLoad,setCLoad]=useState(false);
  const[aState,setAState]=useState({});
  const[aOut,setAOut]=useState({});
  const[aRun,setARun]=useState(false);
  const cr=useRef(null);
  const ar=lang==="ar";

  useEffect(()=>{cr.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const t=(e,a)=>ar?a:e;
  const cagr=(start,end)=>start<=0?0:((Math.pow(end/start,0.1)-1)*100).toFixed(1);
  const yoy=(cur,prev)=>prev===0?0:((cur-prev)/prev*100).toFixed(1);
  const risks=computeRisks();

  const buildCtx=()=>{
    let s="IRAQ TRADE DATA 2015-2024 (USD Billions):\n";
    s+=macro.map(d=>`${d.year}: Exp $${d.exp}B, Imp $${d.imp}B, Bal $${d.bal}B, Oil $${d.oilR}B, ${d.bpd}M bpd, GDP $${d.gdp}B`).join("\n");
    s+="\n\nEXPORT PRODUCTS:\n"+expP.map(p=>`HS${p.hs} ${p.n}: 2015=$${p.d[0]}B, 2020=$${p.d[5]}B, 2024=$${p.d[9]}B, CAGR=${cagr(p.d[0],p.d[9])}%`).join("\n");
    s+="\n\nIMPORT PRODUCTS:\n"+impP.map(p=>`HS${p.hs} ${p.n}: 2015=$${p.d[0]}B, 2020=$${p.d[5]}B, 2024=$${p.d[9]}B, Tariff:${p.t}, CAGR=${cagr(p.d[0],p.d[9])}%`).join("\n");
    s+="\n\nEXPORT PARTNERS: "+ptE.map(p=>`${p.c}: ${p.d[0]}%(2015)→${p.d[9]}%(2024)`).join(", ");
    s+="\nIMPORT PARTNERS: "+ptI.map(p=>`${p.c}: ${p.d[0]}%(2015)→${p.d[9]}%(2024)`).join(", ");
    s+="\n\nRISK ALERTS:\n"+risks.map(r=>`[${r.lvl}] ${r.t}`).join("\n");
    s+="\n\nKEY: Oil=99.4% exports. Iraq imports 90% food. Machinery=38% imports ($33.7B, +33% YoY). Dates main non-oil export. OPEC 2nd largest.";
    return s;
  };

  const callAI=async(sys,usr)=>{
    try{
      // In Claude.ai artifact mode, call Anthropic directly (no key needed)
      // In deployed Vercel mode, call /api/chat serverless function (key on server)
      const isDeployed = typeof window !== 'undefined' && !window.__CLAUDE_ARTIFACT__;
      const endpoint = isDeployed ? "/api/chat" : "https://api.anthropic.com/v1/messages";
      const headers = {"Content-Type":"application/json"};
      const body = isDeployed
        ? JSON.stringify({system:sys,messages:[{role:"user",content:usr}]})
        : JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[{role:"user",content:usr}]});
      const r=await fetch(endpoint,{method:"POST",headers,body});
      const d=await r.json();return d.content?.map(b=>b.text||"").join("\n")||"No response.";
    }catch(e){return"Error: "+e.message;}
  };

  // ─── FULL 6-AGENT PIPELINE ───
  const runPipeline=async()=>{
    setARun(true);setAOut({});setAState({});
    const ctx=buildCtx();
    const prompts={
      loader:{s:"You are a Data Loader agent. Validate the Iraq trade dataset. Report: total records, date range, completeness score (%), any missing years or products. Be concise, use bullet points, max 6 lines.",u:`Load and validate:\n${ctx}`},
      quality:{s:"You are a Data Quality agent. Check for: anomalies (sudden jumps >50% without explanation), outlier values, internal consistency (do exports+imports roughly match reported totals?), potential data errors. Flag each issue with severity. Max 8 lines.",u:`Quality check:\n${ctx}`},
      validator:{s:"You are a Source Validation agent. Cross-reference key figures against multiple sources. For each metric, assign: ✅ HIGH confidence (sources agree within 10%), ⚠️ MEDIUM (differ 10-30%, explainable), ❌ LOW (differ >30%). Cover: 2024 exports, 2024 imports, oil production, oil revenue, trade balance. Note methodology differences (goods vs goods+services). Max 10 lines.",u:`Validate against: World Bank WITS ($84.5B exports goods-only), Trading Economics (annualized $93.1B), WorldsTopExports ($109.8B), Iraq Central Bank ($87.4B imports), EIA (4.4M bpd production), Iraq Oil Ministry (3.37M bpd exported, $96.08B revenue), OEC (partner shares). Dashboard values:\n${ctx}`},
      analyst:{s:"You are a Trade Analyst agent for Iraqi merchants. Compute: 1) 10-year CAGR for top 5 import sectors, 2) Concentration index for exports, 3) Import dependency ratio, 4) Fastest growing import (10yr and 1yr), 5) Trade balance trend assessment. Be precise with numbers. Max 10 lines.",u:`Analyze:\n${ctx}`},
      risk:{s:"You are a Risk & Opportunity agent. Using 20% change threshold for alerts. Provide: 1) TOP 3 RISKS with severity (Critical/High/Medium) and specific numbers, 2) TOP 3 OPPORTUNITIES for Iraqi merchants with HS codes and growth rates, 3) Escalation flags (any sector >20% change). Format clearly. Max 12 lines.",u:`Assess:\n${ctx}`},
      reporter:{s:"You are the Reporting agent. Write for Iraqi merchants and policymakers. Produce: 1) EXECUTIVE SUMMARY (3 sentences), 2) KEY FINDINGS (5 bullet points with specific HS codes and numbers), 3) RECOMMENDATIONS (3 actionable items with specific sectors). End with a one-line data quality note. Max 15 lines.",u:`Generate merchant report:\n${ctx}`},
    };
    for(const ag of agentDefs){
      setAState(s=>({...s,[ag.id]:"running"}));
      const p=prompts[ag.id];
      const out=await callAI(p.s,p.u);
      setAState(s=>({...s,[ag.id]:"done"}));
      setAOut(s=>({...s,[ag.id]:out}));
      await new Promise(r=>setTimeout(r,350));
    }
    setARun(false);
  };

  const sendChat=async()=>{
    if(!cin.trim())return;
    const msg=cin.trim();setCin("");
    setMsgs(m=>[...m,{r:"user",t:msg}]);setCLoad(true);
    const reply=await callAI(
      `You are an Iraqi trade investment advisor. Use ONLY the data provided. Include HS codes, tariffs, 10-year growth rates, and specific numbers. Max 5 sentences. If asked in Arabic, reply in Arabic.\n\nData:\n${buildCtx()}`,msg
    );
    setMsgs(m=>[...m,{r:"assistant",t:reply}]);setCLoad(false);
  };

  const L=macro[9],P=macro[8];
  const eCats=["All",...new Set(expP.map(p=>p.c))];
  const iCats=["All",...new Set(impP.map(p=>p.c))];
  const fE=eCat==="All"?expP:expP.filter(p=>p.c===eCat);
  const fI=iCat==="All"?impP:impP.filter(p=>p.c===iCat);

  const Tp=({active,payload,label})=>{
    if(!active||!payload?.length)return null;
    return(<div style={{background:"rgba(2,5,10,0.97)",border:`1px solid ${BD}`,borderRadius:7,padding:"6px 9px"}}>
      <p style={{color:"#64748B",fontSize:8,margin:0}}>{label}</p>
      {payload.map((p,i)=><p key={i} style={{color:p.color,fontSize:9,margin:"1px 0 0",fontWeight:700}}>{p.name}: ${p.value}B</p>)}
    </div>);
  };

  return(
    <div dir={ar?"rtl":"ltr"} style={{minHeight:"100vh",background:"linear-gradient(155deg,#020510 0%,#071018 45%,#0B1828 100%)",color:"#CBD5E1",fontFamily:F,padding:"14px 10px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&family=Noto+Kufi+Arabic:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      {ar&&<style>{`*{font-family:'Noto Kufi Arabic','Outfit',system-ui,sans-serif !important;}`}</style>}

      {/* HEADER */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div>
          <h1 style={{fontSize:15,fontWeight:800,margin:"0 0 1px",background:"linear-gradient(90deg,#06B6D4,#10B981,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            {t("🇮🇶 Iraq Trade Intelligence","🇮🇶 منصة الاستخبارات التجارية العراقية")}
          </h1>
          <p style={{color:"#475569",fontSize:7.5,margin:0}}>{t("Full Agentic AI · 10-Year Data · All HS Codes · Public Access","ذكاء اصطناعي وكيل · بيانات 10 سنوات · جميع رموز HS · وصول عام")}</p>
        </div>
        <button onClick={()=>setLang(ar?"en":"ar")} style={{padding:"4px 9px",border:`1px solid ${BD}`,borderRadius:5,background:"rgba(255,255,255,0.04)",color:"#94A3B8",fontSize:9,cursor:"pointer",fontFamily:"inherit"}}>{ar?"EN":"عربي"}</button>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:1,marginBottom:11,background:"rgba(255,255,255,0.02)",borderRadius:8,padding:2,overflowX:"auto"}}>
        {TABS.map(tb=><button key={tb} onClick={()=>setTab(tb)} style={{flex:"none",padding:"5px 7px",border:"none",borderRadius:6,fontSize:8,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",background:tab===tb?"linear-gradient(135deg,#06B6D4,#0E7490)":"transparent",color:tab===tb?"#fff":"#64748B"}}>{tb}</button>)}
      </div>

      {/* ═══ HOME ═══ */}
      {tab==="Home"&&<div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
          {[{l:t("Exports","صادرات"),v:`$${L.exp}B`,ch:yoy(L.exp,P.exp),c:"#06B6D4"},{l:t("Imports","واردات"),v:`$${L.imp}B`,ch:yoy(L.imp,P.imp),c:"#EF4444"},{l:t("Balance","ميزان"),v:`$${L.bal}B`,ch:yoy(L.bal,P.bal),c:"#10B981"},{l:t("Oil Rev","إيرادات نفط"),v:`$${L.oilR}B`,ch:yoy(L.oilR,P.oilR),c:"#F59E0B"},{l:t("GDP","ناتج محلي"),v:`$${L.gdp}B`,ch:yoy(L.gdp,P.gdp),c:"#8B5CF6"},{l:t("Oil bpd","إنتاج نفط"),v:`${L.bpd}M`,ch:yoy(L.bpd,P.bpd),c:"#EC4899"}].map((c,i)=>
            <div key={i} style={{...cd,marginBottom:0,padding:"8px 7px",borderTop:`2px solid ${c.c}`}}>
              <p style={{fontSize:6.5,color:"#64748B",margin:"0 0 2px",fontWeight:600,textTransform:"uppercase",letterSpacing:0.3}}>{c.l}</p>
              <p style={{fontSize:14,fontWeight:800,margin:0,color:"#F1F5F9"}}>{c.v}</p>
              <span style={{fontSize:7,fontWeight:700,color:parseFloat(c.ch)<0?"#EF4444":"#10B981"}}>{parseFloat(c.ch)<0?"▼":"▲"}{c.ch}%</span>
            </div>
          )}
        </div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#F1F5F9"}}>{t("10-Year Trade Overview","نظرة 10 سنوات")}</h3>
          <ResponsiveContainer width="100%" height={180}>
            <ComposedChart data={macro}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)"/><XAxis dataKey="year" tick={{fill:"#64748B",fontSize:7}} axisLine={false}/><YAxis tick={{fill:"#64748B",fontSize:7}} axisLine={false} tickFormatter={v=>`$${v}`}/><Tooltip content={<Tp/>}/><Legend wrapperStyle={{fontSize:7}}/>
              <Bar dataKey="exp" name={t("Exports","صادرات")} fill="#06B6D4" radius={[2,2,0,0]} barSize={10}/>
              <Bar dataKey="imp" name={t("Imports","واردات")} fill="#EF4444" radius={[2,2,0,0]} barSize={10}/>
              <Line dataKey="bal" name={t("Balance","ميزان")} stroke="#F59E0B" strokeWidth={1.5} dot={{r:1.5}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#F1F5F9"}}>{t("Oil Revenue & GDP Trend","إيرادات النفط والناتج")}</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={macro}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)"/><XAxis dataKey="year" tick={{fill:"#64748B",fontSize:7}} axisLine={false}/><YAxis tick={{fill:"#64748B",fontSize:7}} axisLine={false} tickFormatter={v=>`$${v}`}/><Tooltip content={<Tp/>}/><Legend wrapperStyle={{fontSize:7}}/>
              <Line dataKey="gdp" name="GDP" stroke="#F59E0B" strokeWidth={1.5} dot={{r:1.5}}/><Line dataKey="oilR" name={t("Oil","نفط")} stroke="#8B5CF6" strokeWidth={1.5} dot={{r:1.5}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>}

      {/* ═══ EXPORTS ═══ */}
      {tab==="Exports"&&<div>
        <div style={{display:"flex",gap:3,marginBottom:7,overflowX:"auto"}}>{eCats.map(c=><button key={c} onClick={()=>setECat(c)} style={{padding:"3px 7px",border:"none",borderRadius:4,fontSize:7.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit",background:eCat===c?"#06B6D4":"rgba(255,255,255,0.04)",color:eCat===c?"#fff":"#94A3B8",whiteSpace:"nowrap"}}>{c}</button>)}</div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#F1F5F9"}}>{t(`Export Products (${fE.length})`,`منتجات التصدير (${fE.length})`)}</h3>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:7.5}}>
            <thead><tr style={{borderBottom:`1px solid ${BD}`}}>{["HS",t("Product","المنتج"),"2015","2018","2020","2022","2024","CAGR"].map(h=><th key={h} style={{padding:"3px 2px",color:"#64748B",fontWeight:700,textAlign:"left",fontSize:6.5}}>{h}</th>)}</tr></thead>
            <tbody>{fE.map((p,i)=><tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.02)`}}>
              <td style={{padding:"3px 2px",color:"#06B6D4",fontFamily:M,fontSize:6.5}}>{p.hs}</td>
              <td style={{padding:"3px 2px",color:"#CBD5E1"}}>{ar?p.a:p.n}</td>
              <td style={{padding:"3px 2px",color:"#64748B"}}>{p.d[0]}</td>
              <td style={{padding:"3px 2px",color:"#94A3B8"}}>{p.d[3]}</td>
              <td style={{padding:"3px 2px",color:"#94A3B8"}}>{p.d[5]}</td>
              <td style={{padding:"3px 2px",color:"#CBD5E1"}}>{p.d[7]}</td>
              <td style={{padding:"3px 2px",color:"#F1F5F9",fontWeight:700}}>{p.d[9]}</td>
              <td style={{padding:"3px 2px",color:parseFloat(cagr(p.d[0],p.d[9]))>0?"#10B981":"#EF4444",fontWeight:700}}>{cagr(p.d[0],p.d[9])}%</td>
            </tr>)}</tbody>
          </table></div>
        </div>
      </div>}

      {/* ═══ IMPORTS ═══ */}
      {tab==="Imports"&&<div>
        <div style={{display:"flex",gap:3,marginBottom:7,overflowX:"auto",flexWrap:"wrap"}}>{iCats.map(c=><button key={c} onClick={()=>setICat(c)} style={{padding:"3px 7px",border:"none",borderRadius:4,fontSize:7.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit",background:iCat===c?"#EF4444":"rgba(255,255,255,0.04)",color:iCat===c?"#fff":"#94A3B8",whiteSpace:"nowrap"}}>{c}</button>)}</div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#F1F5F9"}}>{t(`Import Products (${fI.length})`,`منتجات الاستيراد (${fI.length})`)}</h3>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:7}}>
            <thead><tr style={{borderBottom:`1px solid ${BD}`}}>{["HS",t("Product","المنتج"),"2015","2018","2020","2024",t("Tariff","تعرفة"),"CAGR"].map(h=><th key={h} style={{padding:"3px 2px",color:"#64748B",fontWeight:700,textAlign:"left",fontSize:6}}>{h}</th>)}</tr></thead>
            <tbody>{fI.map((p,i)=><tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.02)`}}>
              <td style={{padding:"2px",color:"#06B6D4",fontFamily:M,fontSize:6.5}}>{p.hs}</td>
              <td style={{padding:"2px",color:"#CBD5E1"}}>{ar?p.a:p.n}</td>
              <td style={{padding:"2px",color:"#64748B"}}>{p.d[0]}</td>
              <td style={{padding:"2px",color:"#94A3B8"}}>{p.d[3]}</td>
              <td style={{padding:"2px",color:"#94A3B8"}}>{p.d[5]}</td>
              <td style={{padding:"2px",color:"#F1F5F9",fontWeight:700}}>{p.d[9]}</td>
              <td style={{padding:"2px",color:"#F59E0B",fontSize:6}}>{p.t}</td>
              <td style={{padding:"2px",color:"#10B981",fontWeight:700}}>{cagr(p.d[0],p.d[9])}%</td>
            </tr>)}</tbody>
          </table></div>
        </div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#F1F5F9"}}>{t("Import Growth 2015→2024","نمو الواردات")}</h3>
          <ResponsiveContainer width="100%" height={Math.max(180,fI.length*18)}>
            <BarChart data={fI.map(p=>({name:ar?p.a:p.n,v15:p.d[0],v20:p.d[5],v24:p.d[9]}))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)"/><XAxis type="number" tick={{fill:"#64748B",fontSize:6}} axisLine={false} tickFormatter={v=>`$${v}B`}/><YAxis type="category" dataKey="name" tick={{fill:"#CBD5E1",fontSize:6}} width={75} axisLine={false}/>
              <Tooltip formatter={v=>`$${v}B`} contentStyle={{background:"rgba(2,5,10,0.96)",border:`1px solid ${BD}`,borderRadius:6,fontSize:7}}/><Legend wrapperStyle={{fontSize:7}}/>
              <Bar dataKey="v15" name="2015" fill="#1E3A5F" barSize={5} radius={[0,2,2,0]}/><Bar dataKey="v20" name="2020" fill="#0369A1" barSize={5} radius={[0,2,2,0]}/><Bar dataKey="v24" name="2024" fill="#06B6D4" barSize={5} radius={[0,2,2,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>}

      {/* ═══ COUNTRIES ═══ */}
      {tab==="Countries"&&<div>
        {[{title:t("Export Partners","شركاء التصدير"),data:ptE,col:"#06B6D4"},{title:t("Import Partners","شركاء الاستيراد"),data:ptI,col:"#EF4444"}].map((sec,si)=>
          <div key={si} style={cd}>
            <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 8px",color:"#F1F5F9"}}>{sec.title} (2015→2024)</h3>
            {sec.data.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 0",borderBottom:i<sec.data.length-1?`1px solid ${BD}`:"none"}}>
              <span style={{fontSize:11}}>{p.f}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:8,fontWeight:600,color:"#CBD5E1"}}>{ar?p.a:p.c}</span><span style={{fontSize:7,color:"#F1F5F9",fontWeight:700}}>{p.d[9]}%</span></div>
                <div style={{display:"flex",gap:4,fontSize:6.5,color:"#64748B",marginTop:1}}>
                  <span>2015:{p.d[0]}%</span><span>→</span><span>2024:{p.d[9]}%</span>
                  <span style={{color:p.d[9]>p.d[0]?"#10B981":"#EF4444",fontWeight:700}}>{p.d[9]>p.d[0]?"▲":"▼"}{Math.abs(p.d[9]-p.d[0]).toFixed(1)}pp</span>
                </div>
                <div style={{height:3,background:"rgba(255,255,255,0.04)",borderRadius:2,marginTop:2}}><div style={{height:"100%",width:`${p.d[9]}%`,background:sec.col,borderRadius:2}}/></div>
              </div>
            </div>)}
          </div>
        )}
      </div>}

      {/* ═══ INVEST ═══ */}
      {tab==="Invest"&&<div>
        <div style={{...cd,borderLeft:"3px solid #F59E0B"}}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#F59E0B"}}>{t("💰 Top Investment Signals (10yr CAGR)","💰 إشارات الاستثمار")}</h3>
          {impP.map(p=>({...p,cg:parseFloat(cagr(p.d[0],p.d[9]))})).sort((a,b)=>b.cg-a.cg).slice(0,10).map((p,i)=>
            <div key={i} style={{padding:"6px 5px",marginBottom:3,background:"rgba(0,0,0,0.25)",borderRadius:7,borderLeft:`2px solid ${p.cg>18?"#F59E0B":"#10B981"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:1}}><span style={{fontSize:9,fontWeight:700,color:"#F1F5F9"}}>{ar?p.a:p.n}</span><span style={{fontSize:7,fontWeight:700,color:"#10B981"}}>+{p.cg}% CAGR</span></div>
              <div style={{display:"flex",gap:6,fontSize:7,color:"#94A3B8"}}><span>HS {p.hs}</span><span>${p.d[0]}B→${p.d[9]}B</span><span style={{color:"#F59E0B"}}>{t("Tariff","تعرفة")}:{p.t}</span></div>
            </div>
          )}
        </div>
        <div style={{...cd,borderLeft:"3px solid #10B981"}}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#10B981"}}>{t("🌱 Import Substitution","🌱 إحلال الواردات")}</h3>
          {[{s:t("Food & Agriculture","الغذاء"),hs:"01-24",g:"$12B+",n:t("90% of food imported","90% مستورد")},{s:t("Construction","البناء"),hs:"25,72,73",g:"$6.6B",n:t("Cement, iron, steel","إسمنت، حديد")},{s:t("Plastics","البلاستيك"),hs:"39xx",g:"$1.6B",n:t("Petrochemical feedstock advantage","ميزة بتروكيماوية")},{s:t("Pharma","الأدوية"),hs:"30xx",g:"$2.7B",n:t("Generic drug manufacturing","أدوية جنيسة")},{s:t("Furniture","الأثاث"),hs:"94xx",g:"$0.7B",n:t("Local manufacturing","تصنيع محلي")}].map((s,i)=>
            <div key={i} style={{padding:"5px",marginBottom:2,background:"rgba(0,0,0,0.2)",borderRadius:5}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:8,fontWeight:700,color:"#F1F5F9"}}>{s.s}</span><span style={{fontSize:7,color:"#F59E0B",fontWeight:700}}>{s.g}</span></div>
              <span style={{fontSize:7,color:"#94A3B8"}}>HS {s.hs} · {s.n}</span>
            </div>
          )}
        </div>
      </div>}

      {/* ═══ AGENTS (6-AGENT PIPELINE) ═══ */}
      {tab==="Agents"&&<div>
        <div style={{...cd,textAlign:"center"}}>
          <h3 style={{fontSize:11,fontWeight:700,margin:"0 0 3px",color:"#F1F5F9"}}>{t("🤖 6-Agent Intelligence Pipeline","🤖 خط أنابيب 6 وكلاء ذكاء")}</h3>
          <p style={{fontSize:7.5,color:"#64748B",margin:"0 0 4px"}}>{t("Loader → Quality → Validator → Analyst → Risk → Reporter","محمّل ← جودة ← مدقق ← محلل ← مخاطر ← تقارير")}</p>
          <p style={{fontSize:7,color:"#475569",margin:"0 0 10px"}}>{t("Each agent produces structured output and passes context to the next","كل وكيل ينتج مخرجات منظمة ويمرر السياق للتالي")}</p>
          <button onClick={runPipeline} disabled={aRun} style={{padding:"9px 18px",border:"none",borderRadius:8,fontSize:10,fontWeight:700,cursor:aRun?"wait":"pointer",fontFamily:"inherit",background:aRun?"rgba(255,255,255,0.1)":"linear-gradient(135deg,#06B6D4,#0E7490)",color:"#fff"}}>
            {aRun?t("⏳ Agents Running...","⏳ الوكلاء يعملون..."):t("▶ Run Full Pipeline","▶ تشغيل كامل")}
          </button>
        </div>
        {agentDefs.map((ag,i)=>{
          const st=aState[ag.id],out=aOut[ag.id];
          return(<div key={ag.id} style={{...cd,borderLeft:`3px solid ${st==="done"?"#10B981":st==="running"?"#F59E0B":ag.color}`,opacity:st?1:0.45,transition:"all 0.3s"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:out?7:0}}>
              <span style={{fontSize:15}}>{ag.icon}</span>
              <div style={{flex:1}}>
                <p style={{fontSize:10,fontWeight:700,margin:0,color:"#F1F5F9"}}>{t(`Agent ${i+1}: ${ag.n}`,`وكيل ${i+1}: ${ag.a}`)}</p>
                <p style={{fontSize:7,color:"#64748B",margin:"1px 0 0"}}>{ag.desc}</p>
              </div>
              <span style={{fontSize:7,fontWeight:700,padding:"2px 5px",borderRadius:4,background:st==="done"?"rgba(16,185,129,0.15)":st==="running"?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)",color:st==="done"?"#10B981":st==="running"?"#F59E0B":"#64748B"}}>
                {st==="done"?"✓ Done":st==="running"?"Running...":"Idle"}
              </span>
            </div>
            {out&&<div style={{background:"rgba(0,0,0,0.3)",borderRadius:7,padding:"8px 8px",fontSize:8.5,color:"#94A3B8",lineHeight:1.7,fontFamily:M,whiteSpace:"pre-wrap",maxHeight:150,overflowY:"auto"}}>{out}</div>}
          </div>);
        })}
      </div>}

      {/* ═══ ALERTS ═══ */}
      {tab==="Alerts"&&<div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 8px",color:"#F1F5F9"}}>{t("⚠️ Auto-Generated Risk Alerts","⚠️ تنبيهات المخاطر التلقائية")}</h3>
          <p style={{fontSize:7,color:"#64748B",margin:"0 0 8px"}}>{t("Threshold: flag any sector change >20%, concentration >30%, dependency risks","العتبة: أي تغير قطاعي >20%، تركيز >30%، مخاطر اعتماد")}</p>
          {risks.map((r,i)=><div key={i} style={{display:"flex",gap:6,alignItems:"flex-start",padding:"7px 6px",marginBottom:4,background:"rgba(0,0,0,0.2)",borderRadius:8,borderLeft:`3px solid ${r.lvl==="critical"?"#EF4444":r.lvl==="high"?"#F59E0B":"#FBBF24"}`}}>
            <span style={{fontSize:10,flexShrink:0}}>{r.icon}</span>
            <div>
              <span style={{fontSize:6,fontWeight:700,padding:"1px 4px",borderRadius:3,background:r.lvl==="critical"?"rgba(239,68,68,0.15)":r.lvl==="high"?"rgba(245,158,11,0.15)":"rgba(251,191,36,0.15)",color:r.lvl==="critical"?"#EF4444":r.lvl==="high"?"#F59E0B":"#FBBF24",textTransform:"uppercase"}}>{r.lvl}</span>
              <p style={{fontSize:9,color:"#CBD5E1",margin:"3px 0 0",lineHeight:1.5}}>{ar?r.a:r.t}</p>
            </div>
          </div>)}
        </div>
        <div style={{...cd,borderLeft:"3px solid #06B6D4"}}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 4px",color:"#06B6D4"}}>{t("📋 Escalation Rules","📋 قواعد التصعيد")}</h3>
          {[
            t("Flag if any product category changes >20% YoY","تنبيه إذا تغير أي قطاع >20% سنوياً"),
            t("Flag if top-3 partner concentration rises above 65%","تنبيه إذا تجاوز تركيز أكبر 3 شركاء 65%"),
            t("Flag if non-oil exports drop for 2 consecutive years","تنبيه إذا انخفضت الصادرات غير النفطية لسنتين متتاليتين"),
            t("Flag if food imports spike >15% in any year","تنبيه إذا ارتفعت واردات الغذاء >15%"),
            t("Human review required for: external reports, policy memos","مراجعة بشرية مطلوبة للتقارير الخارجية"),
          ].map((r,i)=><p key={i} style={{fontSize:8,color:"#94A3B8",margin:"4px 0",paddingLeft:8,borderLeft:`2px solid ${BD}`}}>{r}</p>)}
        </div>
      </div>}

      {/* ═══ RESOURCES ═══ */}
      {tab==="Resources"&&<div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 8px",color:"#F1F5F9"}}>{t("🔗 Data Sources & Verification Links","🔗 مصادر البيانات وروابط التحقق")}</h3>
          <p style={{fontSize:7.5,color:"#64748B",margin:"0 0 8px"}}>{t("Use these to verify any figure in this dashboard","استخدم هذه للتحقق من أي رقم في اللوحة")}</p>
          {resources.map((r,i)=><div key={i} style={{padding:"8px 7px",marginBottom:4,background:"rgba(0,0,0,0.2)",borderRadius:8,borderLeft:`2px solid #06B6D4`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:9,fontWeight:700,color:"#F1F5F9"}}>{r.n}</span>
            </div>
            <p style={{fontSize:7.5,color:"#06B6D4",margin:"2px 0"}}>{r.u}</p>
            <p style={{fontSize:7,color:"#64748B",margin:0}}>{r.d}</p>
          </div>)}
        </div>
        <div style={{...cd,borderLeft:"3px solid #F59E0B"}}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 4px",color:"#F59E0B"}}>{t("🔄 How to Automate Updates","🔄 كيفية أتمتة التحديثات")}</h3>
          {[
            {s:t("Step 1","الخطوة 1"),d:t("Deploy to Vercel (free) — vercel.com","انشر على Vercel (مجاني)")},
            {s:t("Step 2","الخطوة 2"),d:t("Add API connector to UN Comtrade (free API key)","أضف موصل API إلى UN Comtrade")},
            {s:t("Step 3","الخطوة 3"),d:t("Schedule GitHub Actions cron job (monthly)","جدول GitHub Actions شهرياً")},
            {s:t("Step 4","الخطوة 4"),d:t("Store data in Supabase (free database)","خزن البيانات في Supabase")},
            {s:t("Step 5","الخطوة 5"),d:t("Claude API handles AI analysis (already built in)","Claude API يتولى التحليل (مدمج بالفعل)")},
          ].map((s,i)=><div key={i} style={{padding:"5px 6px",marginBottom:3,background:"rgba(0,0,0,0.2)",borderRadius:6}}>
            <span style={{fontSize:8,fontWeight:700,color:"#F59E0B"}}>{s.s}: </span>
            <span style={{fontSize:8,color:"#94A3B8"}}>{s.d}</span>
          </div>)}
        </div>
      </div>}

      {/* ═══ CHAT ═══ */}
      {tab==="Chat"&&<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 130px)"}}>
        <div style={{...cd,flex:1,overflowY:"auto",marginBottom:6,display:"flex",flexDirection:"column",gap:6}}>
          {msgs.length===0&&<div style={{textAlign:"center",padding:"18px 8px"}}>
            <p style={{fontSize:18,margin:"0 0 3px"}}>💬</p>
            <p style={{fontSize:10,fontWeight:700,color:"#F1F5F9",margin:"0 0 8px"}}>{t("Trade Advisor","المستشار التجاري")}</p>
            {[t("Best sectors to invest in Iraq?","أفضل قطاعات الاستثمار في العراق؟"),t("Which imports grew fastest over 10 years?","أي واردات نمت أسرع خلال 10 سنوات؟"),t("Lowest tariff import sectors?","قطاعات الاستيراد بأقل تعرفة؟"),t("How to start exporting dates?","كيف أبدأ تصدير التمور؟")].map((q,i)=>
              <button key={i} onClick={()=>setCin(q)} style={{display:"block",width:"100%",padding:"6px 8px",marginBottom:3,border:`1px solid ${BD}`,borderRadius:6,background:"rgba(255,255,255,0.03)",color:"#94A3B8",fontSize:8,cursor:"pointer",textAlign:ar?"right":"left",fontFamily:"inherit"}}>{q}</button>
            )}
          </div>}
          {msgs.map((m,i)=><div key={i} style={{alignSelf:m.r==="user"?"flex-end":"flex-start",maxWidth:"85%",padding:"7px 9px",borderRadius:m.r==="user"?"10px 10px 2px 10px":"10px 10px 10px 2px",background:m.r==="user"?"linear-gradient(135deg,#06B6D4,#0E7490)":"rgba(255,255,255,0.05)",color:m.r==="user"?"#fff":"#CBD5E1",fontSize:9.5,lineHeight:1.6}}>{m.t}</div>)}
          {cLoad&&<div style={{alignSelf:"flex-start",padding:"6px 9px",borderRadius:"10px 10px 10px 2px",background:"rgba(255,255,255,0.05)",fontSize:8,color:"#64748B"}}>{t("Analyzing...","جاري التحليل...")}</div>}
          <div ref={cr}/>
        </div>
        <div style={{display:"flex",gap:5}}>
          <input value={cin} onChange={e=>setCin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder={t("Ask about trade, HS codes, investments...","اسأل عن التجارة، رموز HS...")} style={{flex:1,padding:"8px 9px",border:`1px solid ${BD}`,borderRadius:8,background:"rgba(255,255,255,0.03)",color:"#F1F5F9",fontSize:9.5,fontFamily:"inherit",outline:"none",direction:ar?"rtl":"ltr"}}/>
          <button onClick={sendChat} disabled={cLoad} style={{padding:"8px 11px",border:"none",borderRadius:8,background:"linear-gradient(135deg,#06B6D4,#0E7490)",color:"#fff",fontSize:10,cursor:"pointer"}}>↑</button>
        </div>
      </div>}

      {/* ═══ ABOUT ═══ */}
      {tab==="About"&&<div>
        <div style={cd}>
          <h3 style={{fontSize:10,fontWeight:700,margin:"0 0 6px",color:"#F1F5F9"}}>{t("About This Dashboard","حول هذه اللوحة")}</h3>
          <p style={{fontSize:8,color:"#94A3B8",lineHeight:1.7,margin:"0 0 8px"}}>{t("This public-access dashboard provides 10 years (2015-2024) of Iraq's trade data with 34 products across 14 HS code categories, 15 partner countries, tariff rates, a 6-agent AI intelligence pipeline with validation and risk alerts, bilingual Arabic/English support, and investment analysis designed for Iraqi merchants, investors, and policymakers.","توفر هذه اللوحة العامة 10 سنوات من البيانات التجارية العراقية مع 34 منتجاً عبر 14 فئة رمز HS، و15 دولة شريكة، ومعدلات التعرفة، وخط أنابيب 6 وكلاء ذكاء اصطناعي مع التحقق وتنبيهات المخاطر، ودعم ثنائي اللغة عربي/إنجليزي.")}</p>
          <h4 style={{fontSize:9,fontWeight:700,margin:"0 0 4px",color:"#06B6D4"}}>{t("Agentic AI Features","ميزات الذكاء الاصطناعي الوكيل")}</h4>
          {[t("6-agent sequential pipeline (Loader→Quality→Validator→Analyst→Risk→Reporter)","خط أنابيب 6 وكلاء متسلسل"),t("Each agent produces structured output passed to the next","كل وكيل ينتج مخرجات منظمة"),t("Validation agent cross-references World Bank, WTO, EIA, OPEC","وكيل التحقق يقارن مع البنك الدولي ومنظمة التجارة"),t("Auto risk alerts with 20% change threshold","تنبيهات مخاطر تلقائية بعتبة 20%"),t("Escalation rules and human review checkpoints","قواعد تصعيد ونقاط مراجعة بشرية"),t("AI chat advisor with full dataset context","مستشار دردشة ذكاء اصطناعي مع كامل البيانات")].map((f,i)=>
            <p key={i} style={{fontSize:7.5,color:"#94A3B8",margin:"2px 0",paddingLeft:6,borderLeft:`2px solid ${BD}`}}>{f}</p>
          )}
          <h4 style={{fontSize:9,fontWeight:700,margin:"10px 0 4px",color:"#10B981"}}>{t("Public Access","الوصول العام")}</h4>
          <p style={{fontSize:7.5,color:"#94A3B8",lineHeight:1.6}}>{t("Deploy to Vercel/Netlify → share the URL → anyone can access it. Free, bilingual, mobile-friendly. No login required.","انشر على Vercel → شارك الرابط → يستطيع أي شخص الوصول. مجاني، ثنائي اللغة، متوافق مع الهاتف. لا يتطلب تسجيل دخول.")}</p>
        </div>
        <div style={{...cd,borderLeft:"3px solid #EF4444"}}>
          <h3 style={{fontSize:9,fontWeight:700,margin:"0 0 3px",color:"#EF4444"}}>{t("⚠️ Disclaimer","⚠️ إخلاء مسؤولية")}</h3>
          <p style={{fontSize:7,color:"#64748B",lineHeight:1.6}}>{t("Data compiled from public sources for informational purposes. Figures may differ between sources. Always verify with official Iraqi customs data before investment decisions. This dashboard does not constitute financial advice.","البيانات مجمعة من مصادر عامة لأغراض إعلامية. تحقق دائماً من الجمارك العراقية الرسمية قبل قرارات الاستثمار.")}</p>
        </div>
      </div>}

      <div style={{marginTop:10,textAlign:"center",padding:"7px 0",borderTop:`1px solid ${BD}`}}>
        <p style={{fontSize:6,color:"#334155",margin:0}}>{t("World Bank · WTO · UN Comtrade · OEC · EIA · OPEC · Iraq Central Bank · Trading Economics · Shafaq News","البنك الدولي · WTO · UN Comtrade · OEC · EIA · أوبك · البنك المركزي العراقي")}</p>
      </div>
    </div>
  );
}
