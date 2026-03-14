// ── Constante éco ────────────────────────────────────────────────────────────
export const ECO_TAUX_PAR_KG = 0.50;

// ── Finitions 3D viewer ───────────────────────────────────────────────────────
export const FINITIONS = {
  structure:  [{label:"Blanc mat — S1",color:0xf2f2f0,roughness:0.6},{label:"Anthracite — S2",color:0x2f3130,roughness:0.5},{label:"Bois clair — S3*",color:0xc8975a,roughness:0.8}],
  exterieur:  [{label:"Blanc mat — E1",color:0xf0eeeb,roughness:0.55},{label:"Anthracite — E2",color:0x353535,roughness:0.55},{label:"Bois clair — E3",color:0xc8975a,roughness:0.75}],
  interieur:  [{label:"Blanc mat — I1",color:0xf5f4f1,roughness:0.7},{label:"Anthracite — I2",color:0x3a3a3a,roughness:0.7},{label:"Bois clair — I3",color:0xc8975a,roughness:0.75}],
  fond:       [{label:"Vitré",color:0xc8dde8,roughness:0.05,metalness:0.1,transparent:true,opacity:0.25},{label:"Plein",color:0x3a3a3a,roughness:0.6,transparent:false,opacity:1}],
};

// ── Options — tableaux de labels uniquement (sans prix) ───────────────────────
const STRUCTURE   = ["Blanc mat — S1", "Anthracite — S2", "Bois clair — S3*"];
const EXTERIEUR   = ["Blanc mat — E1", "Anthracite — E2", "Bois clair — E3"];
const INTERIEUR   = ["Blanc mat — I1", "Anthracite — I2", "Bois clair — I3"];

const FOND_SOLO   = ["Vitré", "Plein"];
const FOND_DUO    = ["Vitré", "Plein"];
const FOND_XL     = ["Vitré", "Plein"];
const FOND_ESS_S  = ["Vitré"];
const FOND_ESS_M  = ["Vitré"];

const HAB_SD  = ["Sans", "A", "B", "C", "D", "E", "F"];
const HAB_Q   = ["Sans", "A", "B", "C", "D", "E", "F"];

const BNQ_SOLO_B = ["A", "B", "C", "D", "E", "F"];
const BNQ_DUO    = ["A", "B", "C", "D", "E", "F"];
const BNQ_Q_SIX  = ["A", "B", "C", "D", "E", "F"];
const BNQ_XL     = ["A — Autoportante", "B — Autoportante"];
const BNQ_ESS_S  = ["A", "B"];
const BNQ_ESS_M  = ["A", "B"];
const BNQ_ESS_XL = ["A", "B"];

const PAN_S     = ["A", "B", "C", "D", "E", "F"];
const PAN_DUO   = ["A", "B", "C", "D", "E", "F"];
const PAN_Q_SIX = ["A", "B", "C", "D", "E", "F"];
const PAN_XL2   = ["A", "B", "C", "D", "E", "F"];
const PAN_XL3   = ["A", "B", "C", "D", "E", "F"];
const PAN_ESS_S = ["A", "B"];
const PAN_ESS_M = ["A", "B"];
const PAN_ESS_XL= ["A", "B"];

const MOQ_S   = ["M1", "M2*", "M3*"];
const MOQ_DUO = ["M1", "M2*", "M3*"];
const MOQ_Q   = ["M1", "M2*", "M3*"];
const MOQ_XL2 = ["M1", "M2*", "M3*"];
const MOQ_XL3 = ["M1", "M2*", "M3*"];

const PRISE_PRE    = ["EU", "CH", "UK", "LXG"];
const PRISE_ESS    = ["EU", "CH", "UK", "LXG", "FR"];
const PRISE_ESS_SB = ["EU", "CH", "LXG"];

const ECRAN_SOLO_B = ["Sans", "Solo Visio"];
const ECRAN_MULTI  = ["Sans", "Fixe", "Orientable"];
const ECRAN_ESS_M  = ["Sans", "Fixe"];

// ── Accessoires — clé + label uniquement (sans prix) ─────────────────────────
const A_SIGNAL    = { key:"signal",    label:"Signal d'occupation"  };
const A_ECRITOIRE = { key:"ecritoire", label:"Tableau écritoire"    };
const A_INDUCTION = { key:"induction", label:"Chargeur à induction" };
const A_TABOURET  = { key:"tabouret",  label:"Tabouret Solo"        };
const A_PMR       = { key:"pmr",       label:"Accès PMR"            };
const A_TABLE_XL  = { key:"table_xl",  label:"Table de réunion"     };

// ── Configurations — labels uniquement (sans prix) ────────────────────────────
const CFG_DUO          = ["Base", "Vide", "Haute", "Individuel", "Ouverte", "Visio"];
const CFG_QUATTRO      = ["Base", "Vide", "Haute", "Individuel", "Ouverte", "Visio"];
const CFG_SIXO         = ["Base", "Visio"];
const CFG_INDUS_QUATTRO = ["Base", "Chef Atelier"];

// ── Catalogue ─────────────────────────────────────────────────────────────────
// NB : aucun prix ici — tout est dans src/data/grilles.js
export const CATALOGUE = {
  // ── Gamme Premium ────────────────────────────────────────────────────────────
  SOLO: { id:"SOLO", gamme:"premium", label:"Solo", icon:"▪", paroisFond:4, modules:1, poidsEco:310,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_SOLO, habillage:HAB_SD, banquette:null, panneaux:PAN_S, moquette:MOQ_S, prise:PRISE_PRE, ecran:null },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION, A_TABOURET],
    glb:"/models/solo.glb", scale:0.05, meshMap:{acc_prises:"O",acc_tablette:"T",acc_ventilation:null,porte_:false} },

  SOLO_BUREAU: { id:"SOLO_BUREAU", gamme:"premium", label:"Solo Bureau", icon:"▪", paroisFond:4, modules:1, poidsEco:330,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_SOLO, habillage:HAB_SD, banquette:BNQ_SOLO_B, panneaux:PAN_S, moquette:MOQ_S, prise:PRISE_PRE, ecran:ECRAN_SOLO_B },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  SOLO_FLEX: { id:"SOLO_FLEX", gamme:"premium", label:"Solo Flex", icon:"▪", paroisFond:4, modules:1, poidsEco:320,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_SOLO, habillage:HAB_SD, banquette:null, panneaux:PAN_S, moquette:MOQ_S, prise:PRISE_PRE, ecran:null },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_TABOURET] },

  DUO: { id:"DUO", gamme:"premium", label:"Duo", icon:"▪▪", paroisFond:4, modules:2, poidsEco:505,
    configurations: CFG_DUO,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_DUO, habillage:HAB_SD, banquette:BNQ_DUO, panneaux:PAN_DUO, moquette:MOQ_DUO, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  QUATTRO: { id:"QUATTRO", gamme:"premium", label:"Quattro", icon:"▪▪", paroisFond:4, modules:2, poidsEco:635,
    configurations: CFG_QUATTRO,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_DUO, habillage:HAB_Q, banquette:BNQ_Q_SIX, panneaux:PAN_Q_SIX, moquette:MOQ_Q, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  SIXO: { id:"SIXO", gamme:"premium", label:"Sixo", icon:"▪▪▪", paroisFond:4, modules:3, poidsEco:665,
    configurations: CFG_SIXO,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_DUO, habillage:null, banquette:BNQ_Q_SIX, panneaux:PAN_Q_SIX, moquette:MOQ_Q, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  XL_2MOD: { id:"XL_2MOD", gamme:"premium", label:"XL (2 modules)", icon:"▬▬", paroisFond:6, modules:2, poidsEco:910,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_XL, habillage:null, banquette:BNQ_XL, panneaux:PAN_XL2, moquette:MOQ_XL2, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_PMR, A_TABLE_XL] },

  XL_3MOD: { id:"XL_3MOD", gamme:"premium", label:"XL (3 modules)", icon:"▬▬▬", paroisFond:8, modules:3, poidsEco:1460,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_XL, habillage:null, banquette:BNQ_XL, panneaux:PAN_XL3, moquette:MOQ_XL3, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_PMR, A_TABLE_XL] },

  // ── Gamme Essentielle ────────────────────────────────────────────────────────
  ESS_SOLO: { id:"ESS_SOLO", gamme:"essentielle", label:"Modèle S", icon:"▪", paroisFond:4, modules:1, poidsEco:235,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_ESS_S, habillage:null, banquette:BNQ_ESS_S, panneaux:PAN_ESS_S, moquette:null, prise:PRISE_ESS, ecran:null },
    accessoires:[],
    glb:"/models/solo.glb", scale:0.05, meshMap:{acc_prises:"O",acc_tablette:"T",acc_ventilation:null,porte_:false} },

  ESS_SOLO_BUREAU: { id:"ESS_SOLO_BUREAU", gamme:"essentielle", label:"Modèle S Bureau", icon:"▪", paroisFond:4, modules:1, poidsEco:250,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_ESS_S, habillage:null, banquette:BNQ_ESS_S, panneaux:PAN_ESS_S, moquette:null, prise:PRISE_ESS_SB, ecran:null },
    accessoires:[] },

  ESS_DUO: { id:"ESS_DUO", gamme:"essentielle", label:"Modèle M", icon:"▪▪", paroisFond:4, modules:2, poidsEco:400,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_ESS_M, habillage:null, banquette:BNQ_ESS_M, panneaux:PAN_ESS_M, moquette:null, prise:PRISE_ESS, ecran:ECRAN_ESS_M },
    accessoires:[] },

  ESS_QUATTRO: { id:"ESS_QUATTRO", gamme:"essentielle", label:"Modèle L", icon:"▪▪", paroisFond:4, modules:2, poidsEco:490,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_ESS_M, habillage:null, banquette:BNQ_ESS_M, panneaux:PAN_ESS_M, moquette:null, prise:PRISE_ESS, ecran:ECRAN_ESS_M },
    accessoires:[] },

  ESS_SIXO: { id:"ESS_SIXO", gamme:"essentielle", label:"Modèle XL", icon:"▪▪▪", paroisFond:4, modules:3, poidsEco:610,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_ESS_M, habillage:null, banquette:BNQ_ESS_XL, panneaux:PAN_ESS_XL, moquette:null, prise:PRISE_ESS, ecran:ECRAN_ESS_M },
    accessoires:[] },

  // ── Gamme Indus ───────────────────────────────────────────────────────────────
  INDUS_SOLO: { id:"INDUS_SOLO", gamme:"indus", label:"Indus Solo", icon:"▪", paroisFond:4, modules:1, poidsEco:250,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_SOLO, habillage:null, banquette:null, panneaux:null, moquette:null, prise:PRISE_PRE, ecran:null },
    accessoires:[] },

  INDUS_DUO: { id:"INDUS_DUO", gamme:"indus", label:"Indus Duo", icon:"▪▪", paroisFond:4, modules:2, poidsEco:670,
    configurations: null,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_DUO, habillage:null, banquette:null, panneaux:null, moquette:null, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[] },

  INDUS_QUATTRO: { id:"INDUS_QUATTRO", gamme:"indus", label:"Indus Quattro", icon:"▪▪", paroisFond:4, modules:2, poidsEco:715,
    configurations: CFG_INDUS_QUATTRO,
    options:{ structure:STRUCTURE, exterieur:EXTERIEUR, interieur:INTERIEUR, fond:FOND_DUO, habillage:null, banquette:null, panneaux:null, moquette:null, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[] },
};

// ── Labels ────────────────────────────────────────────────────────────────────
export const FINITION_LABELS = {
  structure: "Structure",
  exterieur: "Extérieur",
  interieur: "Intérieur",
  fond:      "Fond de paroi",
};

export const OPTION_LABELS = {
  habillage: "Habillage latéral tissus",
  banquette: "Banquette",
  panneaux:  "Panneaux acoustiques intérieurs",
  moquette:  "Moquette",
  prise:     "Prise / Pays",
  ecran:     "Équipement écran",
};

export const COMMERCIAUX = ["Alice Martin","Baptiste Léon","Clara Dubois","David Perrin"];

export const REVENDEURS = [
  "2M MOBILIER & MOUVEMENT","3DES","AB ACOUSTIQUE ET DESIGN","AB CONCEPT","ACCA ORGANISATION",
  "ACTIU","AFCB","AG BURO","AGENCE MC","AIREL/SEREM","AMBIANCE BUREAU","AMM","ANLBURO","APICIL",
  "APSI","ARATICE","ARCH. (ORANGELO)","ARCHI CONCEPT","ART REALISATION","ATELIER VIGNERON",
  "ATLANTIC BUREAU","ATRIUM STEELCASE","AUDIENCE CRÉATION","AUROCH","AUX DOCKS DU BUREAU",
  "AVENTIVE","AXIANS","AYA AGENCY","AZERGO","B COMME DESIGN","B2 AMÉNAGEMENT","BAJE","BM BURO",
  "BMA","BOA","BOS AMENAGEMENT","BRH AMÉNAGEMENT","BRUNEAU","BUREAU CONCEPT","BURO PARTNER",
  "BURO56 (GROUPE MOBI BUREAU)","BUROCASH","BURODOC","BUROKEY","BUROLIA","BUROMAT","BURONOMIC",
  "BURONOMIC SANDRINE","BUROSTOCK","BUROSTYL","CALAMP AMENAGEMENT","CARAY","CBRE","CD&B",
  "CD&B GROUPE","CEREMA DAF","COLISEE ESPACE","COLLIERS INTERNATIONAL France","COLZI",
  "COMMUNAUTÉ DE COMMUNES ARIZE LÈZE","COMPTOIR EUROPÉEN DU BUREAU (CEB)","CONCEPT BUREAU",
  "CONCEPTION NOUVELLE","CONCEPTYS AMENAGEMENT","COTE BURO","DACTYL BUREAU","DACTYLBURO",
  "DALTONER CHERBOURG","DECOBUREAUX","DESKEO","DIXIT DISTRIBUTION","DPC","EDWARD",
  "ELYANS CONCEPT","EMG 360","EPC","EPOXIA","EPSA MARKETPLACE","ERGO ACCESSOIRES",
  "ESPACE AMENAGEMENT","ESPACE BUREAUX","ESPACE ET MOBILIER","ESTER","EWP","EXCELSA",
  "FACTORY","FENZY DESIGN","FOR ME LAB","FORMIRIS","FOURNI BUREAU","FRANCE BUREAU",
  "FRANCE VOLONTAIRE","FROYEN & ZEITLER BV","FROYEN ZEITLER BV","GESYS INGENIERIE",
  "GLOBAL AGENCEMENT","GLOBAL CONCEPT","GLOBAL EQUIPEMENT","GOUJON BUREAU","GOURSAUD",
  "GROUPE GLOBAL","GROUPE HABILIS","GROUPE LE DUFF","GUINET RHÔNE ALPES","HAMMER 40",
  "HOLIE CONCEPT","HUMANSCALE","ID OFFICE","IDOINE","IMAC","INOFEC","INTAKT","INTERSTUHL",
  "ISOSPACE","JCD GROUPE","JLS OFFICE","KARDHAM","KINNARPS AIX EN PROVENCE","KINNARPS BELGIUM",
  "KINNARPS BORDEAUX","KINNARPS FRANCE","KINNARPS LEZENNES","KINNARPS LYON","KINNARPS NANTES",
  "KINNARPS NICE","KINNARPS STRASBOURG","KINNARPS SUISSE","KINNARPS TOULOUSE","KINNARPS UK",
  "KORALUX","KRIPTON","KYTOM BORDEAUX","LACOSTE","LAVRUT FACILITY","LBC","LBS","LDO",
  "LE PAYS D'ESTER","LE POINT D'","LEAFER","LIGHT N DESIGN / PLUS MOBILIER","LIGNE TERTIAIRE",
  "LITTORAL BUREAUTIQUE SYSTEMES","LYRECO","M2DG","MAISON OQORDO","MANUTAN","MARCIREAU",
  "MATMUT","MB2","MBS","MECABURO","MEDIA PRODUCT","MELTEM OFFICE","MFR MOBILIERS","MOBI BUREAU",
  "MOBILIS","MOBILIUM","MOBLOO","MODA","MOORE DESIGN","MOT DE PASSE","MYAH","NEL MOBILIER",
  "NICE BURO","OCABURO","OCELLIS","OCELLIS STUDIO","ODDOS","OFFICE IN","OFFIDEV BUREAU 60",
  "OFITA","OQORDO","ORIGAMI","ORMEPO","OSMOSE EUROP","OTHERSPACE","OUEST BUREAU","OZ CONSULTING",
  "PAD'OCC","PARTNER SYSTEMES","PEPPER CONCEPT DESIGN","PRO2 ARCHITECTEURS","QUADRA MOBILIER",
  "QUADRILATERE","R JARRETY","RBC","RECTO VERSO 139","SA VADEX","SAFPRO","SCERA","SCOP3",
  "SE2 - SOCIETE EUROPEENNE D'EQUIPEMENT","SERVIER MONDE","SIGNAL","SILVERA","SIMON ET FILS",
  "SITIS","SL STUDIO","SMOOV DESIGN","SODESK","SOWEN GROUP","SPACIO AMENAGEMENT",
  "SPATIO AMENAGEMENT","SPHERE AMENAGEMENT","STRABURO","STRUCTA INDUSTRIES","TB AMÉNAGEMENT",
  "TBI PROJECTS","TERRE DESIGN","TETRIS DB","TRACORS MOBILIS","TUBO BURO","UBIA","UGAP",
  "UNIS VERT 360","URBAN AGENCEMENT","VADEX","VASSARD OMB MOBILIER","WATT","WDS PRO",
  "WEMAT GLOBAL SRL","WOOD MOBILIER","WORKFRIENDLY","YOURSE",
];
