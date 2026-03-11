export const BAREME_ECO = [
  { id:"e1", poidsMin:0,   poidsMax:49,  montant:4.50 },
  { id:"e2", poidsMin:50,  poidsMax:99,  montant:8.00 },
  { id:"e3", poidsMin:100, poidsMax:199, montant:14.00 },
  { id:"e4", poidsMin:200, poidsMax:999, montant:22.00 },
];

export const FINITIONS = {
  structure:      [ {label:"Blanc mat — S1",color:0xf2f2f0,roughness:0.6}, {label:"Anthracite — S2",color:0x2f3130,roughness:0.5}, {label:"Bois clair — S3",color:0xc8975a,roughness:0.8} ],
  exterieur:      [ {label:"Blanc mat — E1",color:0xf0eeeb,roughness:0.55,surcout:0}, {label:"Anthracite — E2",color:0x353535,roughness:0.55,surcout:0}, {label:"Bois clair — E3",color:0xc8975a,roughness:0.75,surcout:0}, {label:"Tissu (option)",color:0x7a8070,roughness:0.95,surcout:180} ],
  interieur:      [ {label:"Blanc mat — I1",color:0xf5f4f1,roughness:0.7}, {label:"Anthracite — I2",color:0x3a3a3a,roughness:0.7}, {label:"Bois clair — I3",color:0xc8975a,roughness:0.75} ],
  fond:           [ {label:"Vitré",color:0xc8dde8,roughness:0.05,metalness:0.1,transparent:true,opacity:0.25,surcout:120}, {label:"Plein mélaminé",color:0x3a3a3a,roughness:0.6,transparent:false,opacity:1,surcout:0}, {label:"Plein tissu",color:0x7a8070,roughness:0.95,transparent:false,opacity:1,surcout:60} ],
  tissuInterieur: [ {label:"Élégance — Blanc",color:0xf5f3ee}, {label:"Élégance — Gris",color:0xd0cfc8}, {label:"Élégance — Anthracite",color:0x3a3935}, {label:"Traditions — Beige",color:0xd4b896}, {label:"Traditions — Taupe",color:0x9e8e7e}, {label:"Gabriel Chili — Rouge",color:0x9b2335}, {label:"Gabriel Chili — Bleu",color:0x2d5986}, {label:"Gabriel Chili — Vert",color:0x4a7c59} ],
};

const mkOpts = (arr) => arr.map(f => ({ label:f.label, surcout:f.surcout ?? 0 }));

export const ACC_SOLO = [
  {key:"S",   label:"Siège",                  surcout:180},
  {key:"SE",  label:"Siège ergonomique",       surcout:320},
  {key:"TBR", label:"Table bras rabattable",   surcout:95},
  {key:"TE",  label:"Table escamotable",       surcout:140},
  {key:"IND", label:"Éclairage LED indirect",  surcout:210},
  {key:"T",   label:"Tablette",                surcout:65},
  {key:"O",   label:"Prise électrique",        surcout:55},
  {key:"BUR", label:"Bureau intégré",          surcout:175},
];

const OPTS_FULL  = { structure:mkOpts(FINITIONS.structure), exterieur:mkOpts(FINITIONS.exterieur), interieur:mkOpts(FINITIONS.interieur), fond:mkOpts(FINITIONS.fond), tissuInterieur:mkOpts(FINITIONS.tissuInterieur) };
const OPTS_EMPTY = { structure:[], exterieur:[], interieur:[], fond:[], tissuInterieur:[] };

export const CATALOGUE = {
  // ── Gamme Premium ──────────────────────────────────────────────────────────
  SOLO:        { id:"SOLO",        gamme:"premium",     label:"Solo",           icon:"▪",   paroisFond:4, modules:1, poidsBrut:80,  prixBase:3200,  options:OPTS_FULL,  accessoires:ACC_SOLO,
    glb:"/models/solo-old.glb", scale:1, meshMap:{ acc_prises:"O", acc_tablette:"T", acc_ventilation:null, porte_:false } },
  SOLO_BUREAU: { id:"SOLO_BUREAU", gamme:"premium",     label:"Solo Bureau",    icon:"▪",   paroisFond:4, modules:1, poidsBrut:95,  prixBase:3600,  options:OPTS_EMPTY, accessoires:[] },
  SOLO_FLEX:   { id:"SOLO_FLEX",   gamme:"premium",     label:"Solo Flex",      icon:"▪",   paroisFond:4, modules:1, poidsBrut:88,  prixBase:3400,  options:OPTS_EMPTY, accessoires:[] },
  DUO:         { id:"DUO",         gamme:"premium",     label:"Duo",            icon:"▪▪",  paroisFond:4, modules:2, poidsBrut:145, prixBase:5200,  options:OPTS_EMPTY, accessoires:[] },
  QUATTRO:     { id:"QUATTRO",     gamme:"premium",     label:"Quattro",        icon:"▪▪",  paroisFond:4, modules:2, poidsBrut:190, prixBase:6800,  options:OPTS_EMPTY, accessoires:[] },
  SIXO:        { id:"SIXO",        gamme:"premium",     label:"Sixo",           icon:"▪▪▪", paroisFond:4, modules:3, poidsBrut:230, prixBase:8400,  options:OPTS_EMPTY, accessoires:[] },
  XL_2MOD:     { id:"XL_2MOD",    gamme:"premium",     label:"XL (2 modules)", icon:"▬▬",  paroisFond:6, modules:2, poidsBrut:310, prixBase:11500, options:OPTS_EMPTY, accessoires:[] },
  XL_3MOD:     { id:"XL_3MOD",    gamme:"premium",     label:"XL (3 modules)", icon:"▬▬▬", paroisFond:8, modules:3, poidsBrut:420, prixBase:15800, options:OPTS_EMPTY, accessoires:[] },
  // ── Gamme Essentielle ──────────────────────────────────────────────────────
  ESS_SOLO:    { id:"ESS_SOLO",    gamme:"essentielle", label:"Solo Essentiel",    icon:"▪",   paroisFond:4, modules:1, poidsBrut:65,  prixBase:2200, options:OPTS_FULL,  accessoires:ACC_SOLO,
    glb:"/models/solo-old.glb", scale:0.05, meshMap:{ acc_prises:"O", acc_tablette:"T", acc_ventilation:null, porte_:false } },
  ESS_DUO:     { id:"ESS_DUO",    gamme:"essentielle", label:"Duo Essentiel",     icon:"▪▪",  paroisFond:4, modules:2, poidsBrut:120, prixBase:3800, options:OPTS_EMPTY, accessoires:[] },
  ESS_QUATTRO: { id:"ESS_QUATTRO",gamme:"essentielle", label:"Quattro Essentiel", icon:"▪▪",  paroisFond:4, modules:2, poidsBrut:160, prixBase:5000, options:OPTS_EMPTY, accessoires:[] },
  ESS_SIXO:    { id:"ESS_SIXO",   gamme:"essentielle", label:"Sixo Essentiel",    icon:"▪▪▪", paroisFond:4, modules:3, poidsBrut:190, prixBase:6200, options:OPTS_EMPTY, accessoires:[] },
};

export const OPTION_LABELS = {
  structure:      "Structure",
  exterieur:      "Extérieur",
  interieur:      "Intérieur",
  fond:           "Fond de paroi",
  tissuInterieur: "Tissu intérieur",
};

export const COMMERCIAUX = ["Alice Martin","Baptiste Léon","Clara Dubois","David Perrin"];
