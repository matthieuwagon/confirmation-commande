import { useState } from "react";
import { C, inp, Field } from "./ui/atoms.jsx";
import { FINITION_LABELS, OPTION_LABELS } from "../data/catalogue.js";
const ALL_OPTION_LABELS = { ...FINITION_LABELS, ...OPTION_LABELS };

// ── Helpers UI ────────────────────────────────────────────────────────────────
const ts = active => ({ padding:"7px 14px", border:"none", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600, background:active ? "#1a1a1a" : "#f0f0f0", color:active ? "#fff" : "#555" });
const BtnSm = ({ onClick, children, color = C.muted }) => (
  <button onClick={onClick} style={{padding:"2px 8px",border:`1.5px solid ${color}`,borderRadius:5,background:"#fff",color,fontSize:11,fontWeight:600,cursor:"pointer"}}>{children}</button>
);
const SectionHead = ({ title }) => (
  <div style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10,paddingBottom:5,borderBottom:`1px solid ${C.border}`}}>{title}</div>
);

export default function AdminView({ catalogue, setCatalogue, catalogueAvecPrix, grilleAnnee, setGrilleAnnee, annee }) {
  const [tab,    setTab]    = useState("grille");
  const [filtre, setFiltre] = useState("tous");
  const [selId,  setSelId]  = useState(Object.keys(catalogue)[0]);

  // Inputs pour ajout (structure)
  const [newCfg,    setNewCfg]    = useState("");
  const [newOptCat] = useState("");
  const [newOpt,    setNewOpt]    = useState({});    // { [cat]: string }
  const [newAccKey, setNewAccKey] = useState("");
  const [newAccLbl, setNewAccLbl] = useState("");

  const filteredModels = Object.values(catalogue).filter(mod => filtre === "tous" || mod.gamme === filtre);

  // ── Données modèle courant ────────────────────────────────────────────────
  const m  = catalogue[selId];           // structure brute
  const mc = catalogueAvecPrix[selId];   // enrichi (avec prix)
  const gm = grilleAnnee?.[selId] ?? {}; // grille courante pour ce modèle

  // ── Helpers mise à jour catalogue (structure) ────────────────────────────
  const updCat = patch => setCatalogue(c => ({ ...c, [selId]: { ...c[selId], ...patch } }));

  // Configurations
  const addCfg = () => {
    if (!newCfg.trim()) return;
    const cfgs = [...(m.configurations || []), newCfg.trim()];
    updCat({ configurations: cfgs });
    setGrilleAnnee({ ...grilleAnnee, [selId]: { ...gm, configurations: { ...(gm.configurations||{}), [newCfg.trim()]: gm.prixBase||0 } } });
    setNewCfg("");
  };
  const delCfg = label => updCat({ configurations: m.configurations.filter(l => l !== label) });

  // Option labels
  const addOptLabel = cat => {
    const v = (newOpt[cat] || "").trim();
    if (!v) return;
    const labels = [...(m.options[cat] || []), v];
    updCat({ options: { ...m.options, [cat]: labels } });
    setNewOpt(o => ({ ...o, [cat]: "" }));
  };
  const delOptLabel = (cat, label) => {
    const labels = (m.options[cat] || []).filter(l => l !== label);
    updCat({ options: { ...m.options, [cat]: labels } });
  };
  // Activer / désactiver une catégorie d'options
  const toggleOpt = cat => {
    const isNull = m.options[cat] === null;
    updCat({ options: { ...m.options, [cat]: isNull ? [] : null } });
  };

  // Accessoires
  const addAcc = () => {
    if (!newAccKey.trim() || !newAccLbl.trim()) return;
    const key = newAccKey.trim().toLowerCase().replace(/\s+/g,"_");
    const accs = [...m.accessoires, { key, label: newAccLbl.trim() }];
    updCat({ accessoires: accs });
    setNewAccKey(""); setNewAccLbl("");
  };
  const delAcc = key => updCat({ accessoires: m.accessoires.filter(a => a.key !== key) });

  // ── Helpers mise à jour grille (prix) ────────────────────────────────────
  const updGrille = patch => setGrilleAnnee({ ...grilleAnnee, [selId]: { ...gm, ...patch } });
  const updPrixBase   = v => updGrille({ prixBase: parseFloat(v)||0 });
  const updCfgPrix    = (label, v) => updGrille({ configurations: { ...(gm.configurations||{}), [label]: parseFloat(v)||0 } });
  const updOptSurcout = (cat, label, v) => updGrille({ options: { ...(gm.options||{}), [cat]: { ...(gm.options?.[cat]||{}), [label]: parseFloat(v)||0 } } });
  const updAccSurcout = (key, v)  => updGrille({ accessoires: { ...(gm.accessoires||{}), [key]: parseFloat(v)||0 } });

  // ── Panneau liste modèles (commun) ────────────────────────────────────────
  const SidePanel = () => (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {[["tous","Tous"],["premium","Premium"],["essentielle","Ess."],["indus","Indus"]].map(([v, l]) => (
          <button key={v} onClick={() => setFiltre(v)} style={{flex:1,padding:"4px 0",border:`1.5px solid ${filtre===v?C.blue:C.border}`,borderRadius:6,background:filtre===v?C.blueBg:"#fafafa",color:filtre===v?"#1d4ed8":C.muted,fontSize:11,fontWeight:filtre===v?700:400,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      {filteredModels.map(mod => (
        <button key={mod.id} onClick={() => setSelId(mod.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${selId===mod.id?C.blue:C.border}`,background:selId===mod.id?C.blueBg:"#fafafa",marginBottom:5,cursor:"pointer",fontSize:12,fontWeight:selId===mod.id?700:400,color:selId===mod.id?"#1d4ed8":C.text}}>
          {mod.icon} {mod.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Administration</h2>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        <button style={ts(tab==="grille")}   onClick={() => setTab("grille")}>Grille tarifaire {annee}</button>
        <button style={ts(tab==="modeles")}  onClick={() => setTab("modeles")}>Modèles & structure</button>
      </div>

      {/* ══ Grille tarifaire ══════════════════════════════════════════════════ */}
      {tab === "grille" && (
        <div style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:16}}>
          <SidePanel/>
          <div style={{overflowY:"auto",maxHeight:"65vh"}}>

            {/* Prix de base */}
            <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:14}}>
              <SectionHead title="Prix de base"/>
              <Field label="Prix base HT (€)" style={{maxWidth:160}}>
                <input type="number" value={gm.prixBase ?? mc?.prixBase ?? ""} onChange={e => updPrixBase(e.target.value)} style={inp}/>
              </Field>
            </div>

            {/* Configurations */}
            {mc?.configurations && (
              <div style={{marginBottom:14,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
                <div style={{background:"#f8f8f8",padding:"8px 14px"}}><SectionHead title="Configurations"/></div>
                <div style={{padding:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {mc.configurations.map(cfg => (
                    <Field key={cfg.label} label={cfg.label}>
                      <input type="number" value={gm.configurations?.[cfg.label] ?? cfg.prixBase ?? ""} onChange={e => updCfgPrix(cfg.label, e.target.value)} style={inp}/>
                    </Field>
                  ))}
                </div>
              </div>
            )}

            {/* Options & Finitions */}
            {Object.entries(ALL_OPTION_LABELS).map(([cat, lbl]) => {
              const opts = mc?.options?.[cat];
              if (!opts) return null;
              return (
                <div key={cat} style={{marginBottom:12,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
                  <div style={{background:"#f8f8f8",padding:"8px 14px"}}><span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>{lbl}</span></div>
                  <div style={{padding:10}}>
                    {opts.map(o => (
                      <div key={o.label} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                        <span style={{flex:3,fontSize:12,color:C.text}}>{o.label}</span>
                        <input type="number" value={gm.options?.[cat]?.[o.label] ?? o.surcout ?? 0} onChange={e => updOptSurcout(cat, o.label, e.target.value)} style={{...inp,flex:1}}/>
                        <span style={{fontSize:11,color:C.muted,width:14}}>€</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Accessoires */}
            {mc?.accessoires?.length > 0 && (
              <div style={{marginBottom:12,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
                <div style={{background:"#f8f8f8",padding:"8px 14px"}}><SectionHead title="Accessoires"/></div>
                <div style={{padding:10}}>
                  {mc.accessoires.map(a => (
                    <div key={a.key} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                      <span style={{flex:3,fontSize:12,color:C.text}}>{a.label}</span>
                      <input type="number" value={gm.accessoires?.[a.key] ?? a.surcout ?? 0} onChange={e => updAccSurcout(a.key, e.target.value)} style={{...inp,flex:1}}/>
                      <span style={{fontSize:11,color:C.muted,width:14}}>€</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ Modèles & structure ══════════════════════════════════════════════ */}
      {tab === "modeles" && (
        <div style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:16}}>
          <SidePanel/>
          <div style={{overflowY:"auto",maxHeight:"65vh"}}>

            {/* Propriétés physiques */}
            <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:14}}>
              <SectionHead title="Propriétés physiques"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[["Label","label","text"],["Parois fond","paroisFond","number"],["Modules","modules","number"],["Poids ECO kg","poidsEco","number"]].map(([l, f, t]) => (
                  <Field key={f} label={l}>
                    <input type={t} value={m[f] ?? ""} onChange={e => updCat({[f]: t==="number" ? parseFloat(e.target.value)||0 : e.target.value})} style={inp}/>
                  </Field>
                ))}
              </div>
            </div>

            {/* Configurations */}
            <div style={{marginBottom:14,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
              <div style={{background:"#f8f8f8",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Configurations</span>
                <span style={{fontSize:11,color:C.muted}}>{m.configurations ? `${m.configurations.length} config.` : "aucune"}</span>
              </div>
              <div style={{padding:10}}>
                {(m.configurations || []).map(label => (
                  <div key={label} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                    <span style={{flex:1,fontSize:12,padding:"4px 8px",background:"#f5f5f5",borderRadius:5}}>{label}</span>
                    <BtnSm onClick={() => delCfg(label)} color="#dc2626">✕</BtnSm>
                  </div>
                ))}
                <div style={{display:"flex",gap:6,marginTop:8}}>
                  <input value={newCfg} onChange={e => setNewCfg(e.target.value)} onKeyDown={e => e.key==="Enter" && addCfg()} placeholder="Nouvelle config…" style={{...inp,flex:1}}/>
                  <BtnSm onClick={addCfg} color={C.blue}>+ Ajouter</BtnSm>
                </div>
              </div>
            </div>

            {/* Options / Finitions */}
            {Object.entries(ALL_OPTION_LABELS).map(([cat, lbl]) => {
              const labels = m.options[cat]; // null = désactivé, [] = actif vide
              const isActive = labels !== null;
              return (
                <div key={cat} style={{marginBottom:12,border:`1.5px solid ${isActive ? C.border : "#e0e0e0"}`,borderRadius:10,overflow:"hidden",opacity:isActive?1:0.6}}>
                  <div style={{background:isActive?"#f8f8f8":"#f0f0f0",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:isActive?"#555":"#aaa"}}>{lbl}</span>
                    <BtnSm onClick={() => toggleOpt(cat)} color={isActive?"#dc2626":C.blue}>{isActive?"Désactiver":"Activer"}</BtnSm>
                  </div>
                  {isActive && (
                    <div style={{padding:10}}>
                      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                        {(labels||[]).map(label => (
                          <span key={label} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",background:"#e8f0fe",borderRadius:12,fontSize:11}}>
                            {label}
                            <button onClick={() => delOptLabel(cat, label)} style={{background:"none",border:"none",cursor:"pointer",color:"#666",fontSize:12,lineHeight:1,padding:0}}>×</button>
                          </span>
                        ))}
                      </div>
                      <div style={{display:"flex",gap:6}}>
                        <input value={newOpt[cat]||""} onChange={e => setNewOpt(o => ({...o,[cat]:e.target.value}))} onKeyDown={e => e.key==="Enter" && addOptLabel(cat)} placeholder="Nouveau libellé…" style={{...inp,flex:1,fontSize:11}}/>
                        <BtnSm onClick={() => addOptLabel(cat)} color={C.blue}>+</BtnSm>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Accessoires */}
            <div style={{marginBottom:12,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
              <div style={{background:"#f8f8f8",padding:"8px 14px"}}><span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Accessoires</span></div>
              <div style={{padding:10}}>
                {m.accessoires.map(a => (
                  <div key={a.key} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                    <span style={{flex:1,fontSize:12,padding:"4px 8px",background:"#f5f5f5",borderRadius:5}}>{a.label}</span>
                    <span style={{fontSize:10,color:C.muted,fontFamily:"monospace"}}>{a.key}</span>
                    <BtnSm onClick={() => delAcc(a.key)} color="#dc2626">✕</BtnSm>
                  </div>
                ))}
                <div style={{display:"flex",gap:6,marginTop:8,alignItems:"center"}}>
                  <input value={newAccLbl} onChange={e => setNewAccLbl(e.target.value)} placeholder="Libellé accessoire" style={{...inp,flex:2,fontSize:11}}/>
                  <input value={newAccKey} onChange={e => setNewAccKey(e.target.value)} placeholder="clé (ex: led)" style={{...inp,flex:1,fontSize:11}}/>
                  <BtnSm onClick={addAcc} color={C.blue}>+ Ajouter</BtnSm>
                </div>
              </div>
            </div>

            {/* Option catégorie manquante = ajouter */}
            {newOptCat && (
              <div style={{fontSize:11,color:C.muted,marginTop:8}}>
                Les catégories d'options sont définies dans <code>catalogue.js</code> (FINITION_LABELS / OPTION_LABELS).
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
