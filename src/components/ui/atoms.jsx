export const C = {
  bg:"#f4f4f2", card:"#fff", border:"#e8e8e8", text:"#1a1a1a",
  muted:"#888", blue:"#2563eb", blueBg:"#eff6ff", green:"#16a34a", red:"#e53e3e",
};

export const inp = {
  width:"100%", padding:"9px 12px", border:`1.5px solid ${C.border}`,
  borderRadius:8, fontFamily:"system-ui,sans-serif", fontSize:14,
  color:C.text, background:C.card, outline:"none", boxSizing:"border-box",
};

export const Field = ({ label, required, children }) => (
  <div style={{marginBottom:16}}>
    <label style={{display:"block",fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>
      {label}{required && <span style={{color:C.red,marginLeft:3}}>*</span>}
    </label>
    {children}
  </div>
);

export const Sel = ({ value, onChange, options }) => (
  <div style={{position:"relative"}}>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{...inp, appearance:"none", paddingRight:32, cursor:"pointer"}}>
      <option value="">Sélectionner...</option>
      {options.map(o => (
        <option key={o.label ?? o} value={o.label ?? o}>
          {o.label ?? o}{o.surcout != null && o.surcout !== 0 ? ` (${o.surcout > 0 ? "+" : ""}${o.surcout}€)` : ""}
        </option>
      ))}
    </select>
    <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#aaa",fontSize:12}}>▾</span>
  </div>
);

export const Check = ({ checked, onChange, label, surcout }) => (
  <label onClick={onChange} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",padding:"6px 10px",borderRadius:8,border:`1.5px solid ${checked ? C.blue : C.border}`,background:checked ? C.blueBg : "#fafafa",userSelect:"none"}}>
    <div style={{width:15,height:15,borderRadius:4,flexShrink:0,border:`2px solid ${checked ? C.blue : "#ccc"}`,background:checked ? C.blue : C.card,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {checked && <span style={{color:"#fff",fontSize:9}}>✓</span>}
    </div>
    <span style={{fontSize:12,color:checked ? "#1d4ed8" : "#555",fontWeight:checked ? 600 : 400,flex:1}}>{label}</span>
    {surcout != null && surcout !== 0 && (
      <span style={{fontSize:11,color:checked ? C.blue : "#aaa",fontWeight:600}}>{surcout > 0 ? "+" : ""}{surcout}€</span>
    )}
  </label>
);

export const Btn = ({ onClick, children, variant = "primary", disabled, size = "md" }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding: size === "sm" ? "6px 14px" : "10px 22px",
    borderRadius:9, border:"none", cursor:disabled ? "not-allowed" : "pointer",
    fontSize: size === "sm" ? 12 : 14, fontWeight:600,
    background: disabled ? "#f0f0f0" : variant === "primary" ? C.text : variant === "danger" ? "#fee2e2" : "#f0f0f0",
    color: disabled ? "#bbb" : variant === "primary" ? "#fff" : variant === "danger" ? C.red : C.text,
  }}>
    {children}
  </button>
);

export const Tag = ({ color = C.blue, children }) => (
  <span style={{display:"inline-block",padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:color+"18",color}}>
    {children}
  </span>
);

export const StepDot = ({ n, label, active, done }) => (
  <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,background:done ? C.text : active ? C.blueBg : "#f0f0f0",color:done ? "#fff" : active ? C.blue : "#aaa",border:active ? `2px solid ${C.blue}` : "2px solid transparent"}}>
      {done ? "✓" : n}
    </div>
    <span style={{fontSize:12,color:active ? C.text : done ? "#555" : "#bbb",fontWeight:active ? 600 : 400}}>{label}</span>
  </div>
);

export const PrixBar = ({ prix, qty }) => (
  <div style={{background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:10,padding:"10px 14px",display:"flex",gap:16,flexWrap:"wrap",alignItems:"center"}}>
    {[
      ["Base",     prix.prixBase?.toLocaleString("fr-FR") + " €",                          C.text],
      ["Options",  (prix["surcoûts"] >= 0 ? "+" : "") + prix["surcoûts"]?.toLocaleString("fr-FR") + " €", C.blue],
      ["Éco",      prix.eco?.toFixed(2) + " €",                                            "#92400e"],
      ["Unitaire HT", prix.unitaire?.toLocaleString("fr-FR") + " €",                      C.text],
    ].map(([l, v, c]) => (
      <div key={l}>
        <div style={{fontSize:9,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>{l}</div>
        <div style={{fontSize:13,fontWeight:700,color:c}}>{v}</div>
      </div>
    ))}
    <div style={{borderLeft:"2px solid #bbf7d0",paddingLeft:14,marginLeft:4}}>
      <div style={{fontSize:9,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>Total × {qty || 1}</div>
      <div style={{fontSize:17,fontWeight:800,color:C.green}}>{prix.total?.toLocaleString("fr-FR")} €</div>
    </div>
  </div>
);
