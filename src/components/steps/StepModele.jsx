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
  const indus       = all.filter(m => m.gamme === "indus");

  const GammeSection = ({ label, color, border, models }) => (
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <span style={{fontSize:13,fontWeight:700,color}}>{label}</span>
        <div style={{flex:1,height:1,background:border}}/>
      </div>
      <GammeGrid models={models} selected={selected} onSelect={onSelect}/>
    </div>
  );

  return (
    <div>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:18}}>Sélectionnez le modèle</h2>
      <GammeSection label="Gamme Premium"     color={C.text}    border={C.border}   models={premium}/>
      <GammeSection label="Gamme Essentielle" color="#7c3aed"   border="#ede9fe"    models={essentielle}/>
      <GammeSection label="Gamme Indus"       color="#b45309"   border="#fef3c7"    models={indus}/>

      <div style={{display:"flex",justifyContent:"space-between"}}>
        <Btn onClick={onBack} variant="secondary">← Retour</Btn>
        <Btn onClick={onNext} disabled={!selected}>Configurer →</Btn>
      </div>
    </div>
  );
}
