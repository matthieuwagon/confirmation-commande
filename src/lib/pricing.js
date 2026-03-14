import { ECO_TAUX_PAR_KG } from '../data/catalogue.js';

export function calcEco(poidsEco) {
  return Math.round(poidsEco * ECO_TAUX_PAR_KG);
}

export function calcPrix(modele, config) {
  if (!modele) return { prixBase:0, "surcoûts":0, eco:0, unitaire:0, total:0 };
  let s = 0;
  ["structure","exterieur","interieur","fond","tissuInterieur"].forEach(k => {
    const v = config[k];
    if (v) {
      // Cas spécial S3 : surcoût variable par modèle
      if (k === "structure" && v.includes("S3") && modele.surcoutS3) {
        s += modele.surcoutS3;
      } else {
        const o = (modele.options[k] || []).find(x => x.label === v);
        if (o) s += o.surcout;
      }
    }
  });
  Object.entries(config.accessoires || {}).forEach(([k, on]) => {
    if (on) { const a = modele.accessoires.find(x => x.key === k); if (a) s += a.surcout; }
  });
  const eco = calcEco(modele.poidsEco);
  const qty = config.quantite || 1;
  const u = modele.prixBase + s;
  return { prixBase:modele.prixBase, "surcoûts":s, eco, unitaire:u, total:u * qty + eco };
}
