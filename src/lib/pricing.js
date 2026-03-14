import { ECO_TAUX_PAR_KG } from '../data/catalogue.js';

export function calcPrix(modele, config) {
  if (!modele) return { prixBase:0, "surcoûts":0, eco:0, unitaire:0, total:0 };

  // Prix de base : dépend de la configuration sélectionnée (DUO/QUATTRO/SIXO)
  let prixBase = modele.prixBase;
  if (modele.configurations && config.configuration) {
    const cfg = modele.configurations.find(c => c.label === config.configuration);
    if (cfg) prixBase = cfg.prixBase;
  }

  // Surcoûts options (finitions + options tarifées)
  let s = 0;
  const allOptionKeys = Object.keys(modele.options || {});
  allOptionKeys.forEach(k => {
    const opts = modele.options[k];
    if (!opts) return;
    const v = config[k];
    if (!v) return;
    const opt = opts.find(x => x.label === v);
    if (opt) s += opt.surcout;
  });

  // Surcoûts accessoires booléens
  Object.entries(config.accessoires || {}).forEach(([k, on]) => {
    if (on) { const a = (modele.accessoires || []).find(x => x.key === k); if (a) s += a.surcout; }
  });

  const eco = Math.round(modele.poidsEco * ECO_TAUX_PAR_KG);
  const qty = config.quantite || 1;
  const unitaire = prixBase + s;
  return { prixBase, "surcoûts":s, eco, unitaire, total: unitaire * qty + eco };
}
