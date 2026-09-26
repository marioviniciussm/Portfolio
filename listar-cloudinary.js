// Roda com: node listar-cloudinary.js
// Precisa do Node.js instalado

const CLOUD_NAME = "di2aesnlv";
const API_KEY    = "554447855539242";
const API_SECRET = "2c6N0h87I9hcHMcXWWsIIyzJe2A";

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

// Pastas que queremos listar — ajuste se os nomes no Cloudinary forem diferentes
// Chave = ID usado no HTML, valor = caminho exato no Cloudinary
const PASTAS = {
  "avant-day-1-2026":    "Portfolio/Fotografia/AVANT Energia/1º AVANT Day de 2026",
  "avant-day-2-2026":    "Portfolio/Fotografia/AVANT Energia/2º AVANT Day de 2026",
  "avant-expoagas-2026": "Portfolio/Fotografia/AVANT Energia/ExpoAgas 2026",
  "avant-fbv-2026":      "Portfolio/Fotografia/AVANT Energia/FBV 2026",
  "avant-health-2026":   "Portfolio/Fotografia/AVANT Energia/Health Meeting 2026",
};

async function listarPasta(caminho) {
  const prefix = encodeURIComponent(caminho);
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?prefix=${prefix}/&max_results=500&type=upload`;
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  const data = await res.json();
  return (data.resources || []).map(r => r.secure_url);
}

async function listarTodasPastas(prefixo = "") {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/folders` + (prefixo ? `/${encodeURIComponent(prefixo)}` : "");
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  return res.json();
}

async function listarTodosRecursos() {
  // Lista todos os recursos da conta para ver os public_ids reais
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?max_results=10&type=upload`;
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  return res.json();
}

async function main() {
  console.error("=== Listando pastas raiz ===");
  const pastas = await listarTodasPastas();
  console.log("PASTAS:", JSON.stringify(pastas, null, 2));

  console.error("\n=== Primeiros 10 recursos (para ver public_id real) ===");
  const recursos = await listarTodosRecursos();
  console.log("RECURSOS:", JSON.stringify(recursos.resources?.map(r => r.public_id), null, 2));
}

main().catch(console.error);
