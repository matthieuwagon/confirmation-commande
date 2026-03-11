export function calcEco(poids, bareme) {
  const tranche = bareme.find(t => poids >= t.poidsMin && poids <= t.poidsMax);
  return tranche ? tranche.montant : 0;
}

export function calcPrix(modele, config, bareme) {
  if (!modele) return { prixBase:0, "surcoûts":0, eco:0, unitaire:0, total:0 };
  let s = 0;
  ["structure","exterieur","interieur","fond","tissuInterieur"].forEach(k => {
    const v = config[k];
    if (v) { const o = (modele.options[k] || []).find(x => x.label === v); if (o) s += o.surcout; }
  });
  Object.entries(config.accessoires || {}).forEach(([k, on]) => {
    if (on) { const a = modele.accessoires.find(x => x.key === k); if (a) s += a.surcout; }
  });
  const eco = calcEco(modele.poidsBrut, bareme);
  const qty = config.quantite || 1;
  const u = modele.prixBase + s;
  return { prixBase:modele.prixBase, "surcoûts":s, eco, unitaire:u, total:u * qty + eco };
}
