export const ECO_TAUX_PAR_KG = 0.50;

export const FINITIONS = {
  structure:  [{label:"Blanc mat — S1",color:0xf2f2f0,roughness:0.6},{label:"Anthracite — S2",color:0x2f3130,roughness:0.5},{label:"Bois clair — S3*",color:0xc8975a,roughness:0.8}],
  exterieur:  [{label:"Blanc mat — E1",color:0xf0eeeb,roughness:0.55},{label:"Anthracite — E2",color:0x353535,roughness:0.55},{label:"Bois clair — E3",color:0xc8975a,roughness:0.75}],
  interieur:  [{label:"Blanc mat — I1",color:0xf5f4f1,roughness:0.7},{label:"Anthracite — I2",color:0x3a3a3a,roughness:0.7},{label:"Bois clair — I3",color:0xc8975a,roughness:0.75}],
  fond:       [{label:"Vitré",color:0xc8dde8,roughness:0.05,metalness:0.1,transparent:true,opacity:0.25},{label:"Plein",color:0x3a3a3a,roughness:0.6,transparent:false,opacity:1}],
};

// ── Helpers ─────────────────────────────────────────────────────────────────
const o = (label, surcout) => ({ label, surcout });

// Structure (S3 surcoût variable par modèle)
const str = (s3) => [o("Blanc mat — S1",0), o("Anthracite — S2",0), o("Bois clair — S3*",s3)];
const ext = ()    => [o("Blanc mat — E1",0), o("Anthracite — E2",0), o("Bois clair — E3",0)];
const int_ = ()   => [o("Blanc mat — I1",0), o("Anthracite — I2",0), o("Bois clair — I3",0)];

// Fond de paroi
const FOND_SOLO  = [o("Vitré",0), o("Plein",500)];
const FOND_DUO   = [o("Vitré",0), o("Plein",900)];
const FOND_XL    = [o("Vitré",0), o("Plein",600)];
const FOND_ESS_S = [o("Vitré",350)];
const FOND_ESS_M = [o("Vitré",750)];

// Habillage latéral tissus (null = non disponible)
const HAB_SD = [o("Sans",0),o("A",420),o("B",610),o("C",660),o("D",790),o("E",1090),o("F",1940)];
const HAB_Q  = [o("Sans",0),o("A",630),o("B",930),o("C",1150),o("D",1390),o("E",1950),o("F",3390)];

// Banquette
const BNQ_SOLO_B = [o("A",0),o("B",290),o("C",370),o("D",520),o("E",980),o("F",2290)];
const BNQ_DUO    = [o("A",0),o("B",510),o("C",525),o("D",700),o("E",1390),o("F",2990)];
const BNQ_Q_SIX  = [o("A",0),o("B",560),o("C",630),o("D",910),o("E",1790),o("F",3890)];
const BNQ_XL     = [o("A — Autoportante",1275),o("B — Autoportante",1525)];
const BNQ_ESS_S  = [o("A",0),o("B",250)];
const BNQ_ESS_M  = [o("A",0),o("B",510)];
const BNQ_ESS_XL = [o("A",0),o("B",750)];

// Panneaux acoustiques intérieurs
const PAN_SOLO  = [o("A",0),o("B",290),o("C",370),o("D",520),o("E",980),o("F",2290)];
const PAN_DUO   = [o("A",0),o("B",510),o("C",525),o("D",700),o("E",1390),o("F",2990)];
const PAN_Q_SIX = [o("A",0),o("B",560),o("C",630),o("D",910),o("E",1790),o("F",3890)];
const PAN_XL2   = [o("A",0),o("B",560),o("C",740),o("D",920),o("E",1990),o("F",4390)];
const PAN_XL3   = [o("A",0),o("B",850),o("C",1100),o("D",1390),o("E",2900),o("F",6750)];
const PAN_ESS_S = [o("A",0),o("B",250)];
const PAN_ESS_M = [o("A",0),o("B",510)];
const PAN_ESS_XL= [o("A",0),o("B",750)];

// Moquette
const MOQ_S   = [o("M1",0),o("M2*",250),o("M3*",250)];
const MOQ_DUO = [o("M1",0),o("M2*",400),o("M3*",400)];
const MOQ_Q   = [o("M1",0),o("M2*",500),o("M3*",500)];
const MOQ_XL2 = [o("M1",0),o("M2*",700),o("M3*",700)];
const MOQ_XL3 = [o("M1",0),o("M2*",900),o("M3*",900)];

// Prise / Pays
const PRISE_PRE = [o("EU",0),o("CH",0),o("UK",0),o("LXG",0)];
const PRISE_ESS = [o("EU",0),o("CH",0),o("UK",0),o("LXG",0),o("FR",0)];
const PRISE_ESS_SB = [o("EU",0),o("CH",0),o("LXG",0)];

// Équipement écran
const ECRAN_SOLO_B = [o("Sans",0),o("Solo Visio",840)];
const ECRAN_MULTI  = [o("Sans",0),o("Fixe",400),o("Orientable",500)];
const ECRAN_ESS_M  = [o("Sans",0),o("Fixe",400)];

// ── Accessoires booléens (partagés) ─────────────────────────────────────────
const A_SIGNAL    = {key:"signal",    label:"Signal d'occupation",  surcout:160};
const A_ECRITOIRE = {key:"ecritoire", label:"Tableau écritoire",    surcout:480};
const A_INDUCTION = {key:"induction", label:"Chargeur à induction", surcout:360};
const A_TABOURET  = {key:"tabouret",  label:"Tabouret Solo",        surcout:600};
const A_PMR       = {key:"pmr",       label:"Accès PMR",            surcout:620};

// ── Configurations cabine (modèles multi-config) ─────────────────────────────
const CFG_DUO = [
  {label:"Base",prixBase:13990},{label:"Vide",prixBase:12390},{label:"Haute",prixBase:13220},
  {label:"Individuel",prixBase:13280},{label:"Ouverte",prixBase:10710},{label:"Visio",prixBase:14590},
];
const CFG_QUATTRO = [
  {label:"Base",prixBase:15990},{label:"Vide",prixBase:14410},{label:"Haute",prixBase:15955},
  {label:"Individuel",prixBase:15730},{label:"Ouverte",prixBase:12670},{label:"Visio",prixBase:16690},
];
const CFG_SIXO = [
  {label:"Base",prixBase:18990},{label:"Visio",prixBase:17410},
];

// ── Catalogue ────────────────────────────────────────────────────────────────
export const CATALOGUE = {
  // ── Gamme Premium ───────────────────────────────────────────────────────────
  SOLO: { id:"SOLO", gamme:"premium", label:"Solo", icon:"▪", paroisFond:4, modules:1, poidsEco:310, prixBase:7990,
    options:{ structure:str(200), exterieur:ext(), interieur:int_(), fond:FOND_SOLO, habillage:HAB_SD, banquette:null, panneaux:PAN_SOLO, moquette:MOQ_S, prise:PRISE_PRE, ecran:null },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION, A_TABOURET],
    glb:"/models/solo.glb", scale:0.05, meshMap:{acc_prises:"O",acc_tablette:"T",acc_ventilation:null,porte_:false} },

  SOLO_BUREAU: { id:"SOLO_BUREAU", gamme:"premium", label:"Solo Bureau", icon:"▪", paroisFond:4, modules:1, poidsEco:330, prixBase:9990,
    options:{ structure:str(200), exterieur:ext(), interieur:int_(), fond:FOND_SOLO, habillage:HAB_SD, banquette:BNQ_SOLO_B, panneaux:PAN_SOLO, moquette:MOQ_S, prise:PRISE_PRE, ecran:ECRAN_SOLO_B },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  SOLO_FLEX: { id:"SOLO_FLEX", gamme:"premium", label:"Solo Flex", icon:"▪", paroisFond:4, modules:1, poidsEco:320, prixBase:9490,
    options:{ structure:str(200), exterieur:ext(), interieur:int_(), fond:FOND_SOLO, habillage:HAB_SD, banquette:null, panneaux:PAN_SOLO, moquette:MOQ_S, prise:PRISE_PRE, ecran:null },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_TABOURET] },

  DUO: { id:"DUO", gamme:"premium", label:"Duo", icon:"▪▪", paroisFond:4, modules:2, poidsEco:505, prixBase:13990,
    configurations:CFG_DUO,
    options:{ structure:str(250), exterieur:ext(), interieur:int_(), fond:FOND_DUO, habillage:HAB_SD, banquette:BNQ_DUO, panneaux:PAN_DUO, moquette:MOQ_DUO, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  QUATTRO: { id:"QUATTRO", gamme:"premium", label:"Quattro", icon:"▪▪", paroisFond:4, modules:2, poidsEco:635, prixBase:15990,
    configurations:CFG_QUATTRO,
    options:{ structure:str(250), exterieur:ext(), interieur:int_(), fond:FOND_DUO, habillage:HAB_Q, banquette:BNQ_Q_SIX, panneaux:PAN_Q_SIX, moquette:MOQ_Q, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  SIXO: { id:"SIXO", gamme:"premium", label:"Sixo", icon:"▪▪▪", paroisFond:4, modules:3, poidsEco:665, prixBase:18990,
    configurations:CFG_SIXO,
    options:{ structure:str(250), exterieur:ext(), interieur:int_(), fond:FOND_DUO, habillage:null, banquette:BNQ_Q_SIX, panneaux:PAN_Q_SIX, moquette:MOQ_Q, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_INDUCTION] },

  XL_2MOD: { id:"XL_2MOD", gamme:"premium", label:"XL (2 modules)", icon:"▬▬", paroisFond:6, modules:2, poidsEco:910, prixBase:21990,
    options:{ structure:str(500), exterieur:ext(), interieur:int_(), fond:FOND_XL, habillage:null, banquette:BNQ_XL, panneaux:PAN_XL2, moquette:MOQ_XL2, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_PMR, {key:"table_xl",label:"Table de réunion",surcout:990}] },

  XL_3MOD: { id:"XL_3MOD", gamme:"premium", label:"XL (3 modules)", icon:"▬▬▬", paroisFond:8, modules:3, poidsEco:1460, prixBase:29990,
    options:{ structure:str(700), exterieur:ext(), interieur:int_(), fond:FOND_XL, habillage:null, banquette:BNQ_XL, panneaux:PAN_XL3, moquette:MOQ_XL3, prise:PRISE_PRE, ecran:ECRAN_MULTI },
    accessoires:[A_SIGNAL, A_ECRITOIRE, A_PMR, {key:"table_xl",label:"Table de réunion",surcout:1550}] },

  // ── Gamme Essentielle ────────────────────────────────────────────────────────
  ESS_SOLO: { id:"ESS_SOLO", gamme:"essentielle", label:"Modèle S", icon:"▪", paroisFond:4, modules:1, poidsEco:235, prixBase:4990,
    options:{ structure:str(0), exterieur:ext(), interieur:int_(), fond:FOND_ESS_S, habillage:null, banquette:BNQ_ESS_S, panneaux:PAN_ESS_S, moquette:null, prise:PRISE_ESS, ecran:null },
    accessoires:[],
    glb:"/models/solo.glb", scale:0.05, meshMap:{acc_prises:"O",acc_tablette:"T",acc_ventilation:null,porte_:false} },

  ESS_SOLO_BUREAU: { id:"ESS_SOLO_BUREAU", gamme:"essentielle", label:"Modèle S Bureau", icon:"▪", paroisFond:4, modules:1, poidsEco:250, prixBase:5490,
    options:{ structure:str(0), exterieur:ext(), interieur:int_(), fond:FOND_ESS_S, habillage:null, banquette:BNQ_ESS_S, panneaux:PAN_ESS_S, moquette:null, prise:PRISE_ESS_SB, ecran:null },
    accessoires:[] },

  ESS_DUO: { id:"ESS_DUO", gamme:"essentielle", label:"Modèle M", icon:"▪▪", paroisFond:4, modules:2, poidsEco:400, prixBase:8490,
    options:{ structure:str(0), exterieur:ext(), interieur:int_(), fond:FOND_ESS_M, habillage:null, banquette:BNQ_ESS_M, panneaux:PAN_ESS_M, moquette:null, prise:PRISE_ESS, ecran:ECRAN_ESS_M },
    accessoires:[] },

  ESS_QUATTRO: { id:"ESS_QUATTRO", gamme:"essentielle", label:"Modèle L", icon:"▪▪", paroisFond:4, modules:2, poidsEco:490, prixBase:9990,
    options:{ structure:str(0), exterieur:ext(), interieur:int_(), fond:FOND_ESS_M, habillage:null, banquette:BNQ_ESS_M, panneaux:PAN_ESS_M, moquette:null, prise:PRISE_ESS, ecran:ECRAN_ESS_M },
    accessoires:[] },

  ESS_SIXO: { id:"ESS_SIXO", gamme:"essentielle", label:"Modèle XL", icon:"▪▪▪", paroisFond:4, modules:3, poidsEco:610, prixBase:11990,
    options:{ structure:str(0), exterieur:ext(), interieur:int_(), fond:FOND_ESS_M, habillage:null, banquette:BNQ_ESS_XL, panneaux:PAN_ESS_XL, moquette:null, prise:PRISE_ESS, ecran:ECRAN_ESS_M },
    accessoires:[] },

  // ── Gamme Indus ──────────────────────────────────────────────────────────────
  INDUS_SOLO: { id:"INDUS_SOLO", gamme:"indus", label:"Indus Solo", icon:"▪", paroisFond:4, modules:1, poidsEco:310, prixBase:7900,
    options:{ structure:str(200), exterieur:ext(), interieur:int_(), fond:FOND_SOLO, habillage:null, banquette:null, panneaux:null, moquette:null, prise:PRISE_PRE, ecran:null },
    accessoires:[] },

  INDUS_DUO: { id:"INDUS_DUO", gamme:"indus", label:"Indus Duo", icon:"▪▪", paroisFond:4, modules:2, poidsEco:505, prixBase:12900,
    options:{ structure:str(250), exterieur:ext(), interieur:int_(), fond:FOND_DUO, habillage:null, banquette:null, panneaux:null, moquette:null, prise:PRISE_PRE, ecran:null },
    accessoires:[] },

  INDUS_QUATTRO: { id:"INDUS_QUATTRO", gamme:"indus", label:"Indus Quattro", icon:"▪▪", paroisFond:4, modules:2, poidsEco:635, prixBase:15900,
    options:{ structure:str(250), exterieur:ext(), interieur:int_(), fond:FOND_DUO, habillage:null, banquette:null, panneaux:null, moquette:null, prise:PRISE_PRE, ecran:null },
    accessoires:[] },
};

// ── Labels ───────────────────────────────────────────────────────────────────
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
