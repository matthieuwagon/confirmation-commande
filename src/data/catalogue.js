// Éco-participation : 0,50 € par kg de poids ECO
export const ECO_TAUX_PAR_KG = 0.50;

export const FINITIONS = {
  structure:      [ {label:"Blanc mat — S1",color:0xf2f2f0,roughness:0.6}, {label:"Anthracite — S2",color:0x2f3130,roughness:0.5}, {label:"Bois clair — S3*",color:0xc8975a,roughness:0.8} ],
  exterieur:      [ {label:"Blanc mat — E1",color:0xf0eeeb,roughness:0.55,surcout:0}, {label:"Anthracite — E2",color:0x353535,roughness:0.55,surcout:0}, {label:"Bois clair — E3",color:0xc8975a,roughness:0.75,surcout:0} ],
  interieur:      [ {label:"Blanc mat — I1",color:0xf5f4f1,roughness:0.7}, {label:"Anthracite — I2",color:0x3a3a3a,roughness:0.7}, {label:"Bois clair — I3",color:0xc8975a,roughness:0.75} ],
  fond:           [ {label:"Vitré",color:0xc8dde8,roughness:0.05,metalness:0.1,transparent:true,opacity:0.25,surcout:0}, {label:"Plein",color:0x3a3a3a,roughness:0.6,transparent:false,opacity:1,surcout:0} ],
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
  SOLO:        { id:"SOLO",        gamme:"premium",     label:"Solo",           icon:"▪",   paroisFond:4, modules:1, poidsEco:310,  surcoutS3:200,  prixBase:7990,  options:OPTS_FULL,  accessoires:ACC_SOLO,
    glb:"/models/solo.glb", scale:0.05, meshMap:{ acc_prises:"O", acc_tablette:"T", acc_ventilation:null, porte_:false } },
  SOLO_BUREAU: { id:"SOLO_BUREAU", gamme:"premium",     label:"Solo Bureau",    icon:"▪",   paroisFond:4, modules:1, poidsEco:330,  surcoutS3:200,  prixBase:9990,  options:OPTS_EMPTY, accessoires:[] },
  SOLO_FLEX:   { id:"SOLO_FLEX",   gamme:"premium",     label:"Solo Flex",      icon:"▪",   paroisFond:4, modules:1, poidsEco:320,  surcoutS3:200,  prixBase:9490,  options:OPTS_EMPTY, accessoires:[] },
  DUO:         { id:"DUO",         gamme:"premium",     label:"Duo",            icon:"▪▪",  paroisFond:4, modules:2, poidsEco:505,  surcoutS3:250,  prixBase:13990, options:OPTS_EMPTY, accessoires:[] },
  QUATTRO:     { id:"QUATTRO",     gamme:"premium",     label:"Quattro",        icon:"▪▪",  paroisFond:4, modules:2, poidsEco:635,  surcoutS3:250,  prixBase:15990, options:OPTS_EMPTY, accessoires:[] },
  SIXO:        { id:"SIXO",        gamme:"premium",     label:"Sixo",           icon:"▪▪▪", paroisFond:4, modules:3, poidsEco:665,  surcoutS3:250,  prixBase:18990, options:OPTS_EMPTY, accessoires:[] },
  XL_2MOD:     { id:"XL_2MOD",    gamme:"premium",     label:"XL (2 modules)", icon:"▬▬",  paroisFond:6, modules:2, poidsEco:910,  surcoutS3:500,  prixBase:21990, options:OPTS_EMPTY, accessoires:[] },
  XL_3MOD:     { id:"XL_3MOD",    gamme:"premium",     label:"XL (3 modules)", icon:"▬▬▬", paroisFond:8, modules:3, poidsEco:1460, surcoutS3:700,  prixBase:29990, options:OPTS_EMPTY, accessoires:[] },
  // ── Gamme Essentielle ──────────────────────────────────────────────────────
  ESS_SOLO:        { id:"ESS_SOLO",        gamme:"essentielle", label:"Modèle S",          icon:"▪",   paroisFond:4, modules:1, poidsEco:235, surcoutS3:200, prixBase:4990,  options:OPTS_FULL,  accessoires:ACC_SOLO,
    glb:"/models/solo.glb", scale:0.05, meshMap:{ acc_prises:"O", acc_tablette:"T", acc_ventilation:null, porte_:false } },
  ESS_SOLO_BUREAU: { id:"ESS_SOLO_BUREAU", gamme:"essentielle", label:"Modèle S Bureau",   icon:"▪",   paroisFond:4, modules:1, poidsEco:250, surcoutS3:200, prixBase:5490,  options:OPTS_EMPTY, accessoires:[] },
  ESS_DUO:         { id:"ESS_DUO",         gamme:"essentielle", label:"Modèle M",          icon:"▪▪",  paroisFond:4, modules:2, poidsEco:400, surcoutS3:250, prixBase:8490,  options:OPTS_EMPTY, accessoires:[] },
  ESS_QUATTRO:     { id:"ESS_QUATTRO",     gamme:"essentielle", label:"Modèle L",          icon:"▪▪",  paroisFond:4, modules:2, poidsEco:490, surcoutS3:250, prixBase:9990,  options:OPTS_EMPTY, accessoires:[] },
  ESS_SIXO:        { id:"ESS_SIXO",        gamme:"essentielle", label:"Modèle XL",         icon:"▪▪▪", paroisFond:4, modules:3, poidsEco:610, surcoutS3:250, prixBase:11990, options:OPTS_EMPTY, accessoires:[] },
  // ── Gamme Indus ────────────────────────────────────────────────────────────
  INDUS_SOLO:    { id:"INDUS_SOLO",    gamme:"indus", label:"Indus Solo",    icon:"▪",  paroisFond:4, modules:1, poidsEco:310, surcoutS3:200, prixBase:7900,  options:OPTS_EMPTY, accessoires:[] },
  INDUS_DUO:     { id:"INDUS_DUO",    gamme:"indus", label:"Indus Duo",     icon:"▪▪", paroisFond:4, modules:2, poidsEco:505, surcoutS3:250, prixBase:12900, options:OPTS_EMPTY, accessoires:[] },
  INDUS_QUATTRO: { id:"INDUS_QUATTRO",gamme:"indus", label:"Indus Quattro", icon:"▪▪", paroisFond:4, modules:2, poidsEco:635, surcoutS3:250, prixBase:15900, options:OPTS_EMPTY, accessoires:[] },
};

export const OPTION_LABELS = {
  structure:      "Structure",
  exterieur:      "Extérieur",
  interieur:      "Intérieur",
  fond:           "Fond de paroi",
  tissuInterieur: "Tissu intérieur",
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
