// ── Tarifs SÉRENITÉ par zone (€/unité) ──────────────────────────────────────
// Colonnes : [Zone1, Zone2, Zone3, Zone4, Zone5]
export const SERENITE_TARIF = {
  SOLO:        [750,  880,  785,  735,  790],
  SOLO_BUREAU: [780,  915,  815,  775,  795],
  SOLO_FLEX:   [750,  880,  785,  735,  790],
  DUO:         [1050, 1230, 1120, 1040, 1085],
  QUATTRO:     [1250, 1535, 1375, 1270, 1365],
  SIXO:        [1800, 1950, 1750, 1620, 1750],
  XL_2MOD:     [1960, 2395, 2095, 1920, 2060],
  XL_3MOD:     [2785, 3295, 2925, 2655, 2880],
  ESS_SOLO:        [750,  880,  785,  735,  790],
  ESS_SOLO_BUREAU: [780,  915,  815,  775,  795],
  ESS_DUO:         [1050, 1230, 1120, 1040, 1085],
  ESS_QUATTRO:     [1250, 1535, 1375, 1270, 1365],
  ESS_SIXO:        [1800, 1950, 1750, 1620, 1750],
  INDUS_SOLO:      [750,  880,  785,  735,  790],
  INDUS_DUO:       [1050, 1230, 1120, 1040, 1085],
  INDUS_QUATTRO:   [1250, 1535, 1375, 1270, 1365],
};

// ── Mapping département → zone SÉRENITÉ ─────────────────────────────────────
export const ZONE_FRANCE = {
  "01":4,"02":3,"03":4,"04":4,"05":4,"06":4,"07":4,"08":3,"09":5,"10":3,
  "11":4,"12":5,"13":4,"14":2,"15":4,"16":5,"17":5,"18":2,"19":5,"20":5,
  "21":3,"22":2,"23":5,"24":5,"25":3,"26":4,"27":2,"28":2,"29":2,"30":4,
  "31":5,"32":5,"33":5,"34":4,"35":2,"36":2,"37":2,"38":4,"39":3,"40":5,
  "41":2,"42":3,"43":4,"44":2,"45":2,"46":5,"47":5,"48":4,"49":2,"50":2,
  "51":3,"52":3,"53":2,"54":3,"55":3,"56":2,"57":3,"58":3,"59":3,"60":3,
  "61":2,"62":3,"63":4,"64":4,"65":5,"66":5,"67":3,"68":3,"69":3,"70":3,
  "71":3,"72":2,"73":4,"74":4,"75":1,"76":2,"77":1,"78":1,"79":5,"80":3,
  "81":5,"82":5,"83":4,"84":4,"85":2,"86":2,"87":2,"88":3,"89":3,"90":3,
  "91":1,"92":1,"93":1,"94":1,"95":1,
};

// ── Calcul livraison SÉRENITÉ ────────────────────────────────────────────────
export function calcLivraisonSerenite(products, departement) {
  const zone = ZONE_FRANCE[String(departement).padStart(2, "0")];
  if (!zone) return null; // département inconnu
  const idx = zone - 1;
  return products.reduce((total, p) => {
    const tarifs = SERENITE_TARIF[p.modeleId];
    if (!tarifs) return total;
    return total + tarifs[idx] * (p.quantite || 1);
  }, 0);
}

// ── Calcul remise ────────────────────────────────────────────────────────────
export function calcRemise(totalBrut, remisePct) {
  const taux = parseFloat(remisePct) || 0;
  return Math.round(totalBrut * taux / 100);
}
