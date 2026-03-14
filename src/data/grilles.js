// Grilles tarifaires par année.
// Structure par modèle : { prixBase, configurations?, options, accessoires }
// Seuls les surcouts NON NULS sont listés — tout ce qui n'est pas mentionné = 0 €.

// ─────────────────────────────────────────────────────────────────────────────
const G2026 = {
  SOLO: {
    prixBase: 7990,
    options: {
      structure:  { "Bois clair — S3*": 200 },
      fond:       { "Plein": 500 },
      habillage:  { A: 420, B: 610, C: 660, D: 790, E: 1090, F: 1940 },
      panneaux:   { B: 290, C: 370, D: 520, E: 980,  F: 2290 },
      moquette:   { "M2*": 250, "M3*": 250 },
      ecran:      { "Solo Visio": 840 },
    },
    accessoires: { signal: 160, ecritoire: 480, induction: 360, tabouret: 600 },
  },

  SOLO_BUREAU: {
    prixBase: 9990,
    options: {
      structure:  { "Bois clair — S3*": 200 },
      fond:       { "Plein": 500 },
      habillage:  { A: 420, B: 610, C: 660, D: 790, E: 1090, F: 1940 },
      banquette:  { B: 290, C: 370, D: 520, E: 980,  F: 2290 },
      panneaux:   { B: 290, C: 370, D: 520, E: 980,  F: 2290 },
      moquette:   { "M2*": 250, "M3*": 250 },
      ecran:      { "Solo Visio": 840 },
    },
    accessoires: { signal: 160, ecritoire: 480, induction: 360 },
  },

  SOLO_FLEX: {
    prixBase: 9490,
    options: {
      structure:  { "Bois clair — S3*": 200 },
      fond:       { "Plein": 500 },
      habillage:  { A: 420, B: 610, C: 660, D: 790, E: 1090, F: 1940 },
      panneaux:   { B: 290, C: 370, D: 520, E: 980,  F: 2290 },
      moquette:   { "M2*": 250, "M3*": 250 },
    },
    accessoires: { signal: 160, ecritoire: 480, tabouret: 600 },
  },

  DUO: {
    prixBase: 13990,
    configurations: { Base: 13990, Vide: 12390, Haute: 13220, Individuel: 13280, Ouverte: 10710, Visio: 14590 },
    options: {
      structure:  { "Bois clair — S3*": 250 },
      fond:       { "Plein": 900 },
      habillage:  { A: 420, B: 610, C: 660, D: 790, E: 1090, F: 1940 },
      banquette:  { B: 510, C: 525, D: 700, E: 1390, F: 2990 },
      panneaux:   { B: 510, C: 525, D: 700, E: 1390, F: 2990 },
      moquette:   { "M2*": 400, "M3*": 400 },
      ecran:      { "Fixe": 400, "Orientable": 500 },
    },
    accessoires: { signal: 160, ecritoire: 480, induction: 360 },
  },

  QUATTRO: {
    prixBase: 15990,
    configurations: { Base: 15990, Vide: 14410, Haute: 15955, Individuel: 15730, Ouverte: 12670, Visio: 16690 },
    options: {
      structure:  { "Bois clair — S3*": 250 },
      fond:       { "Plein": 900 },
      habillage:  { A: 630, B: 930, C: 1150, D: 1390, E: 1950, F: 3390 },
      banquette:  { B: 560, C: 630, D: 910, E: 1790, F: 3890 },
      panneaux:   { B: 560, C: 630, D: 910, E: 1790, F: 3890 },
      moquette:   { "M2*": 500, "M3*": 500 },
      ecran:      { "Fixe": 400, "Orientable": 500 },
    },
    accessoires: { signal: 160, ecritoire: 480, induction: 360 },
  },

  SIXO: {
    prixBase: 18990,
    configurations: { Base: 18990, Visio: 17410 },
    options: {
      structure:  { "Bois clair — S3*": 250 },
      fond:       { "Plein": 900 },
      banquette:  { B: 560, C: 630, D: 910, E: 1790, F: 3890 },
      panneaux:   { B: 560, C: 630, D: 910, E: 1790, F: 3890 },
      moquette:   { "M2*": 500, "M3*": 500 },
      ecran:      { "Fixe": 400, "Orientable": 500 },
    },
    accessoires: { signal: 160, ecritoire: 480, induction: 360 },
  },

  XL_2MOD: {
    prixBase: 21990,
    options: {
      structure:  { "Bois clair — S3*": 500 },
      fond:       { "Plein": 600 },
      banquette:  { "A — Autoportante": 1275, "B — Autoportante": 1525 },
      panneaux:   { B: 560, C: 740, D: 920, E: 1990, F: 4390 },
      moquette:   { "M2*": 700, "M3*": 700 },
      ecran:      { "Fixe": 400, "Orientable": 500 },
    },
    accessoires: { signal: 160, ecritoire: 480, pmr: 620, table_xl: 990 },
  },

  XL_3MOD: {
    prixBase: 29990,
    options: {
      structure:  { "Bois clair — S3*": 700 },
      fond:       { "Plein": 600 },
      banquette:  { "A — Autoportante": 1275, "B — Autoportante": 1525 },
      panneaux:   { B: 850, C: 1100, D: 1390, E: 2900, F: 6750 },
      moquette:   { "M2*": 900, "M3*": 900 },
      ecran:      { "Fixe": 400, "Orientable": 500 },
    },
    accessoires: { signal: 160, ecritoire: 480, pmr: 620, table_xl: 1550 },
  },

  ESS_SOLO: {
    prixBase: 4990,
    options: {
      fond:      { "Vitré": 350 },
      banquette: { B: 250 },
      panneaux:  { B: 250 },
    },
    accessoires: {},
  },

  ESS_SOLO_BUREAU: {
    prixBase: 5490,
    options: {
      fond:      { "Vitré": 350 },
      banquette: { B: 250 },
      panneaux:  { B: 250 },
    },
    accessoires: {},
  },

  ESS_DUO: {
    prixBase: 8490,
    options: {
      fond:      { "Vitré": 750 },
      banquette: { B: 510 },
      panneaux:  { B: 510 },
      ecran:     { "Fixe": 400 },
    },
    accessoires: {},
  },

  ESS_QUATTRO: {
    prixBase: 9990,
    options: {
      fond:      { "Vitré": 750 },
      banquette: { B: 510 },
      panneaux:  { B: 510 },
      ecran:     { "Fixe": 400 },
    },
    accessoires: {},
  },

  ESS_SIXO: {
    prixBase: 11990,
    options: {
      fond:      { "Vitré": 750 },
      banquette: { B: 750 },
      panneaux:  { B: 750 },
      ecran:     { "Fixe": 400 },
    },
    accessoires: {},
  },

  INDUS_SOLO: {
    prixBase: 7900,
    options: {
      structure: { "Bois clair — S3*": 200 },
      fond:      { "Plein": 500 },
    },
    accessoires: {},
  },

  INDUS_DUO: {
    prixBase: 12900,
    options: {
      structure: { "Bois clair — S3*": 250 },
      fond:      { "Plein": 900 },
    },
    accessoires: {},
  },

  INDUS_QUATTRO: {
    prixBase: 15900,
    options: {
      structure: { "Bois clair — S3*": 250 },
      fond:      { "Plein": 900 },
    },
    accessoires: {},
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2025 — à compléter dès extraction confirmée depuis l'Excel
// (valeurs provisoires = idem 2026 en attendant)
const G2025 = G2026;

// ─────────────────────────────────────────────────────────────────────────────
export const GRILLE_PAR_ANNEE = { 2025: G2025, 2026: G2026 };
export const ANNEES_DISPONIBLES = [2025, 2026];

// ─────────────────────────────────────────────────────────────────────────────
// applyGrille : injecte les prix de l'année dans la structure du catalogue
// Retourne un nouveau catalogue enrichi — les composants n'ont pas besoin de changer.
export function applyGrille(catalogue, annee) {
  const grille = GRILLE_PAR_ANNEE[annee] ?? GRILLE_PAR_ANNEE[2026];
  const result = {};
  for (const [id, modele] of Object.entries(catalogue)) {
    const g = grille[id] ?? {};
    const optPrices = g.options    ?? {};
    const accPrices = g.accessoires ?? {};

    // Options : labels → [{label, surcout}]
    const options = Object.fromEntries(
      Object.entries(modele.options ?? {}).map(([k, labels]) => {
        if (!labels) return [k, null];
        const prices = optPrices[k] ?? {};
        return [k, labels.map(label => ({ label, surcout: prices[label] ?? 0 }))];
      })
    );

    // Configurations : strings → [{label, prixBase}]
    const configurations = modele.configurations
      ? modele.configurations.map(label => ({
          label,
          prixBase: g.configurations?.[label] ?? g.prixBase ?? 0,
        }))
      : null;

    // Accessoires : injecter surcout depuis grille
    const accessoires = modele.accessoires.map(a => ({
      ...a,
      surcout: accPrices[a.key] ?? 0,
    }));

    result[id] = {
      ...modele,
      prixBase:       g.prixBase ?? 0,
      configurations,
      options,
      accessoires,
    };
  }
  return result;
}
