import { C, Btn } from "../ui/atoms.jsx";

function GammeGrid({ models, selected, onSelect }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
      {models.map(m => (
        <button key={m.id} onClick={() => onSelect(m.id)} style={{padding:"12px 8px",border:`2px solid ${selected === m.id ? C.blue : C.border}`,borderRadius:10,background:selected === m.id ? C.blueBg : "#fafafa",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:16,marginBottom:4,color:selected === m.id ? C.blue : "#aaa"}}>{m.icon}</div>
          <div style={{fontSize:12,fontWeight:700,color:selected === m.id ? "#1d4ed8" : C.text,marginBottom:2}}>{m.label}</div>
          <div style={{fontSize:11,color:"#aaa"}}>{m.prixBase.toLocaleString("fr-FR")} €</div>
        </button>
      ))}
    </div>
  );
}

export default function StepModele({ catalogue, selected, onSelect, onNext, onBack }) {
  const all = Object.values(catalogue);
  const premium     = all.filter(m => m.gamme === "premium");
  const essentielle = all.filter(m => m.gamme === "essentielle");
  return (
    <div>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:18}}>Sélectionnez le modèle</h2>

      <div style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:700,color:C.text}}>Gamme Premium</span>
          <div style={{flex:1,height:1,background:C.border}}/>
        </div>
        <GammeGrid models={premium} selected={selected} onSelect={onSelect}/>
      </div>

      <div style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:700,color:"#7c3aed"}}>Gamme Essentielle</span>
          <div style={{flex:1,height:1,background:"#ede9fe"}}/>
        </div>
        <GammeGrid models={essentielle} selected={selected} onSelect={onSelect}/>
      </div>

      <div style={{display:"flex",justifyContent:"space-between"}}>
        <Btn onClick={onBack} variant="secondary">← Retour</Btn>
        <Btn onClick={onNext} disabled={!selected}>Configurer →</Btn>
      </div>
    </div>
  );
}
