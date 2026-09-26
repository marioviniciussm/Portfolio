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

async function main() {
  const resultado = {};
  for (const [id, caminho] of Object.entries(PASTAS)) {
    console.error(`Buscando: ${caminho}...`);
    resultado[id] = await listarPasta(caminho);
    console.error(`  → ${resultado[id].length} fotos encontradas`);
  }
  // Imprime JSON limpo no stdout — copie e cole aqui no chat
  console.log(JSON.stringify(resultado, null, 2));
}

main().catch(console.error);
