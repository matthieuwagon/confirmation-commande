import { C, inp, Field, Sel, Check, Btn, Tag, PrixBar } from "../ui/atoms.jsx";
import { OPTION_LABELS } from "../../data/catalogue.js";
import { calcPrix } from "../../lib/pricing.js";

export default function StepConfig({ catalogue, bareme, modeleId, config, onChange, onNext, onBack }) {
  const m = catalogue[modeleId]; if (!m) return null;
  const prix = calcPrix(m, config, bareme);
  const setFond     = (i, v) => { const f = [...(config.fonds || Array(m.paroisFond).fill(""))]; f[i] = v; onChange("fonds", f); };
  const toggleAcc   = k => onChange("accessoires", { ...(config.accessoires || {}), [k]: !(config.accessoires || {})[k] });

  return (
    <div style={{overflowY:"auto",maxHeight:"calc(100vh - 200px)",paddingRight:4}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
        <h2 style={{fontSize:20,fontWeight:700,margin:0}}>{m.label}</h2>
        <Tag color={m.gamme === "essentielle" ? "#7c3aed" : C.blue}>
          {m.gamme === "essentielle" ? "Essentielle" : "Premium"}
        </Tag>
      </div>
      <p style={{fontSize:13,color:C.muted,marginBottom:14}}>{m.poidsBrut} kg · {m.modules} module{m.modules > 1 ? "s" : ""}</p>
      <div style={{marginBottom:16}}><PrixBar prix={prix} qty={config.quantite || 1}/></div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
        <Field label="Quantité">
          <input type="number" min="1" value={config.quantite || 1}
            onChange={e => onChange("quantite", parseInt(e.target.value) || 1)}
            style={{...inp, width:90}}/>
        </Field>
        <div/>
        {Object.entries(OPTION_LABELS).map(([k, lbl]) => {
          const opts = m.options[k] || [];
          if (!opts.length) return null;
          return (
            <Field key={k} label={lbl}>
              <Sel value={config[k] || ""} onChange={v => onChange(k, v)} options={opts}/>
            </Field>
          );
        })}
      </div>

      {(m.options.fond || []).length > 0 && (
        <div style={{margin:"14px 0",padding:14,background:"#f0f6ff",borderRadius:10,border:"1.5px solid #bfdbfe"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#1d4ed8",textTransform:"uppercase",marginBottom:10}}>
            Fonds de parois · {m.paroisFond} parois
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {Array.from({ length:m.paroisFond }, (_, i) => (
              <Field key={i} label={`Paroi ${i + 1}`}>
                <Sel value={(config.fonds || [])[i] || ""} onChange={v => setFond(i, v)} options={m.options.fond}/>
              </Field>
            ))}
          </div>
        </div>
      )}

      {m.accessoires.length > 0 && (
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Accessoires</label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
            {m.accessoires.map(a => (
              <Check key={a.key} checked={!!(config.accessoires || {})[a.key]}
                onChange={() => toggleAcc(a.key)} label={a.label} surcout={a.surcout}/>
            ))}
          </div>
        </div>
      )}

      <Field label="Commentaire">
        <textarea value={config.commentaire || ""} onChange={e => onChange("commentaire", e.target.value)}
          rows={2} style={{...inp, resize:"vertical"}}/>
      </Field>

      <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
        <Btn onClick={onBack} variant="secondary">← Retour</Btn>
        <Btn onClick={onNext}>Récapitulatif →</Btn>
      </div>
    </div>
  );
}
