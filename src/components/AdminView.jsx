import { useState } from "react";
import { C, inp, Field, Btn } from "./ui/atoms.jsx";
import { OPTION_LABELS } from "../data/catalogue.js";

export default function AdminView({ catalogue, setCatalogue, bareme, setBareme }) {
  const [tab,    setTab]    = useState("modeles");
  const [filtre, setFiltre] = useState("tous");
  const [selId,  setSelId]  = useState(Object.keys(catalogue)[0]);

  const m   = catalogue[selId];
  const upd = (f, v) => setCatalogue(c => ({ ...c, [selId]:{ ...c[selId], [f]:v } }));

  const updOpt = (cat, i, f, v) => {
    const o = [...(m.options[cat] || [])];
    o[i] = { ...o[i], [f]: f === "surcout" ? parseFloat(v) || 0 : v };
    upd("options", { ...m.options, [cat]:o });
  };
  const addOpt = cat => upd("options", { ...m.options, [cat]:[...(m.options[cat] || []), { label:"Nouvelle option", surcout:0 }] });
  const delOpt = (cat, i) => { const o = [...(m.options[cat] || [])]; o.splice(i, 1); upd("options", { ...m.options, [cat]:o }); };

  const ts = active => ({ padding:"7px 14px", border:"none", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600, background:active ? "#1a1a1a" : "#f0f0f0", color:active ? "#fff" : "#555" });

  const filteredModels = Object.values(catalogue).filter(mod => filtre === "tous" || mod.gamme === filtre);

  return (
    <div>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Administration</h2>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        <button style={ts(tab === "modeles")} onClick={() => setTab("modeles")}>Modèles & options</button>
        <button style={ts(tab === "bareme")}  onClick={() => setTab("bareme")}>Barème éco</button>
      </div>

      {tab === "modeles" && (
        <div style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:16}}>
          <div>
            <div style={{display:"flex",gap:4,marginBottom:10}}>
              {[["tous","Tous"],["premium","Premium"],["essentielle","Ess."]].map(([v, l]) => (
                <button key={v} onClick={() => setFiltre(v)} style={{flex:1,padding:"4px 0",border:`1.5px solid ${filtre === v ? C.blue : C.border}`,borderRadius:6,background:filtre === v ? C.blueBg : "#fafafa",color:filtre === v ? "#1d4ed8" : C.muted,fontSize:11,fontWeight:filtre === v ? 700 : 400,cursor:"pointer"}}>{l}</button>
              ))}
            </div>
            {filteredModels.map(mod => (
              <button key={mod.id} onClick={() => setSelId(mod.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${selId === mod.id ? C.blue : C.border}`,background:selId === mod.id ? C.blueBg : "#fafafa",marginBottom:5,cursor:"pointer",fontSize:12,fontWeight:selId === mod.id ? 700 : 400,color:selId === mod.id ? "#1d4ed8" : C.text}}>
                {mod.icon} {mod.label}
              </button>
            ))}
          </div>

          <div style={{overflowY:"auto",maxHeight:"65vh"}}>
            <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:14}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
                {[["Label","label","text"],["Parois","paroisFond","number"],["Poids kg","poidsBrut","number"],["Prix base €","prixBase","number"]].map(([l, f, t]) => (
                  <Field key={f} label={l}>
                    <input type={t} value={m[f]} onChange={e => upd(f, t === "number" ? parseFloat(e.target.value) || 0 : e.target.value)} style={inp}/>
                  </Field>
                ))}
              </div>
            </div>

            {Object.entries(OPTION_LABELS).map(([cat, lbl]) => (
              <div key={cat} style={{marginBottom:12,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
                <div style={{background:"#f8f8f8",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>{lbl}</span>
                  <Btn size="sm" onClick={() => addOpt(cat)} variant="secondary">+ Option</Btn>
                </div>
                <div style={{padding:10}}>
                  {!(m.options[cat] || []).length && <p style={{fontSize:11,color:"#bbb",margin:0}}>Aucune option</p>}
                  {(m.options[cat] || []).map((o, i) => (
                    <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                      <input value={o.label} onChange={e => updOpt(cat, i, "label", e.target.value)} style={{...inp, flex:3}} placeholder="Libellé"/>
                      <input type="number" value={o.surcout} onChange={e => updOpt(cat, i, "surcout", e.target.value)} style={{...inp, flex:1}} placeholder="€"/>
                      <Btn size="sm" variant="danger" onClick={() => delOpt(cat, i)}>✕</Btn>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "bareme" && (
        <div style={{maxWidth:460}}>
          <div style={{border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:"#f8f8f8",padding:"9px 14px",gap:10}}>
              {["Poids min","Poids max","Montant €"].map(h => (
                <span key={h} style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>{h}</span>
              ))}
            </div>
            {bareme.map((t, i) => (
              <div key={t.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"8px 14px",gap:10,borderTop:`1px solid ${C.border}`}}>
                <input type="number" value={t.poidsMin} onChange={e => { const b = [...bareme]; b[i] = { ...b[i], poidsMin:parseFloat(e.target.value) || 0 }; setBareme(b); }} style={inp}/>
                <input type="number" value={t.poidsMax} onChange={e => { const b = [...bareme]; b[i] = { ...b[i], poidsMax:parseFloat(e.target.value) || 0 }; setBareme(b); }} style={inp}/>
                <input type="number" step="0.01" value={t.montant} onChange={e => { const b = [...bareme]; b[i] = { ...b[i], montant:parseFloat(e.target.value) || 0 }; setBareme(b); }} style={inp}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:10}}>
            <Btn size="sm" variant="secondary" onClick={() => setBareme(b => [...b, { id:Date.now()+"", poidsMin:0, poidsMax:0, montant:0 }])}>+ Tranche</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
