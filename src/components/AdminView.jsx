import { useState } from "react";
import { C, inp, Field } from "./ui/atoms.jsx";
import { FINITION_LABELS, OPTION_LABELS } from "../data/catalogue.js";
const ALL_OPTION_LABELS = { ...FINITION_LABELS, ...OPTION_LABELS };

export default function AdminView({ catalogue, setCatalogue, catalogueAvecPrix, grilleAnnee, setGrilleAnnee, annee }) {
  const [tab,    setTab]    = useState("grille");
  const [filtre, setFiltre] = useState("tous");
  const [selId,  setSelId]  = useState(Object.keys(catalogue)[0]);

  const ts = active => ({ padding:"7px 14px", border:"none", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600, background:active ? "#1a1a1a" : "#f0f0f0", color:active ? "#fff" : "#555" });
  const filteredModels = Object.values(catalogue).filter(mod => filtre === "tous" || mod.gamme === filtre);

  // ── Onglet Modèles (structure) ────────────────────────────────────────────
  const m   = catalogue[selId];
  const updStruct = (f, v) => setCatalogue(c => ({ ...c, [selId]:{ ...c[selId], [f]: typeof v === "number" ? v : parseFloat(v) || v } }));

  // ── Onglet Grille tarifaire (prix) ────────────────────────────────────────
  const mc    = catalogueAvecPrix[selId];               // modèle enrichi (avec prix)
  const gm    = grilleAnnee?.[selId] ?? {};              // données grille pour ce modèle

  // Met à jour le prixBase dans la grille
  const updPrixBase = v =>
    setGrilleAnnee({ ...grilleAnnee, [selId]: { ...gm, prixBase: parseFloat(v) || 0 } });

  // Met à jour le prix d'une configuration
  const updCfg = (label, v) =>
    setGrilleAnnee({ ...grilleAnnee, [selId]: { ...gm, configurations: { ...(gm.configurations||{}), [label]: parseFloat(v)||0 } } });

  // Met à jour le surcout d'une option (par label)
  const updOptSurcout = (cat, label, v) =>
    setGrilleAnnee({ ...grilleAnnee, [selId]: { ...gm, options: { ...(gm.options||{}), [cat]: { ...(gm.options?.[cat]||{}), [label]: parseFloat(v)||0 } } } });

  // Met à jour le surcout d'un accessoire (par clé)
  const updAccSurcout = (key, v) =>
    setGrilleAnnee({ ...grilleAnnee, [selId]: { ...gm, accessoires: { ...(gm.accessoires||{}), [key]: parseFloat(v)||0 } } });

  const SidePanel = () => (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {[["tous","Tous"],["premium","Premium"],["essentielle","Ess."],["indus","Indus"]].map(([v, l]) => (
          <button key={v} onClick={() => setFiltre(v)} style={{flex:1,padding:"4px 0",border:`1.5px solid ${filtre === v ? C.blue : C.border}`,borderRadius:6,background:filtre === v ? C.blueBg : "#fafafa",color:filtre === v ? "#1d4ed8" : C.muted,fontSize:11,fontWeight:filtre === v ? 700 : 400,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      {filteredModels.map(mod => (
        <button key={mod.id} onClick={() => setSelId(mod.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${selId === mod.id ? C.blue : C.border}`,background:selId === mod.id ? C.blueBg : "#fafafa",marginBottom:5,cursor:"pointer",fontSize:12,fontWeight:selId === mod.id ? 700 : 400,color:selId === mod.id ? "#1d4ed8" : C.text}}>
          {mod.icon} {mod.label}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Administration</h2>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        <button style={ts(tab === "grille")}  onClick={() => setTab("grille")}>Grille tarifaire {annee}</button>
        <button style={ts(tab === "modeles")} onClick={() => setTab("modeles")}>Modèles & structure</button>
      </div>

      {/* ── Grille tarifaire ────────────────────────────────────────────────── */}
      {tab === "grille" && (
        <div style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:16}}>
          <SidePanel/>
          <div style={{overflowY:"auto",maxHeight:"65vh"}}>

            {/* Prix de base */}
            <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:10}}>Prix de base</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <Field label="Prix base HT (€)">
                  <input type="number" value={gm.prixBase ?? mc?.prixBase ?? ""} onChange={e => updPrixBase(e.target.value)} style={inp}/>
                </Field>
              </div>
            </div>

            {/* Configurations */}
            {mc?.configurations && (
              <div style={{marginBottom:14,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
                <div style={{background:"#f8f8f8",padding:"8px 14px"}}>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Configurations</span>
                </div>
                <div style={{padding:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {mc.configurations.map(cfg => (
                    <Field key={cfg.label} label={cfg.label}>
                      <input type="number" value={gm.configurations?.[cfg.label] ?? cfg.prixBase ?? ""} onChange={e => updCfg(cfg.label, e.target.value)} style={inp}/>
                    </Field>
                  ))}
                </div>
              </div>
            )}

            {/* Options / Finitions */}
            {Object.entries(ALL_OPTION_LABELS).map(([cat, lbl]) => {
              const opts = mc?.options?.[cat];
              if (!opts) return null;
              return (
                <div key={cat} style={{marginBottom:12,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
                  <div style={{background:"#f8f8f8",padding:"8px 14px"}}>
                    <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>{lbl}</span>
                  </div>
                  <div style={{padding:10}}>
                    {opts.map(o => (
                      <div key={o.label} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                        <span style={{flex:3,fontSize:12,color:C.text}}>{o.label}</span>
                        <input type="number" value={gm.options?.[cat]?.[o.label] ?? o.surcout ?? 0} onChange={e => updOptSurcout(cat, o.label, e.target.value)} style={{...inp,flex:1}} placeholder="€"/>
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
                <div style={{background:"#f8f8f8",padding:"8px 14px"}}>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>Accessoires</span>
                </div>
                <div style={{padding:10}}>
                  {mc.accessoires.map(a => (
                    <div key={a.key} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                      <span style={{flex:3,fontSize:12,color:C.text}}>{a.label}</span>
                      <input type="number" value={gm.accessoires?.[a.key] ?? a.surcout ?? 0} onChange={e => updAccSurcout(a.key, e.target.value)} style={{...inp,flex:1}} placeholder="€"/>
                      <span style={{fontSize:11,color:C.muted,width:14}}>€</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modèles & structure ─────────────────────────────────────────────── */}
      {tab === "modeles" && (
        <div style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:16}}>
          <SidePanel/>
          <div style={{overflowY:"auto",maxHeight:"65vh"}}>
            <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",marginBottom:10}}>Propriétés physiques</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[["Label","label","text"],["Parois fond","paroisFond","number"],["Modules","modules","number"],["Poids ECO kg","poidsEco","number"]].map(([l, f, t]) => (
                  <Field key={f} label={l}>
                    <input type={t} value={m[f] ?? ""} onChange={e => updStruct(f, t === "number" ? parseFloat(e.target.value)||0 : e.target.value)} style={inp}/>
                  </Field>
                ))}
              </div>
            </div>
            <p style={{fontSize:12,color:C.muted}}>Les libellés des options et la liste des accessoires sont définis dans <code>catalogue.js</code>. Les prix se modifient dans l'onglet "Grille tarifaire".</p>
          </div>
        </div>
      )}
    </div>
  );
}
