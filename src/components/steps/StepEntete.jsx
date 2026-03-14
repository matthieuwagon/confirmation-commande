import { C, inp, Field, Sel, Btn } from "../ui/atoms.jsx";
import { COMMERCIAUX, REVENDEURS } from "../../data/catalogue.js";

export default function StepEntete({ data, onChange, onNext, annees = [] }) {
  const ok = data.chantier && data.clientFinal && data.commercial && data.revendeur;
  return (
    <div>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>En-tête de commande</h2>
      <p style={{fontSize:13,color:C.muted,marginBottom:22}}>Informations générales</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
        <Field label="Chantier" required><input value={data.chantier}       onChange={e => onChange("chantier",       e.target.value)} style={inp} placeholder="Siège social Acme 2025"/></Field>
        <Field label="Réf. client">       <input value={data.cdeClient}     onChange={e => onChange("cdeClient",     e.target.value)} style={inp} placeholder="PO-2025-0042"/></Field>
        <Field label="Client final" required><input value={data.clientFinal} onChange={e => onChange("clientFinal",  e.target.value)} style={inp} placeholder="Entreprise"/></Field>
        <Field label="Contact">           <input value={data.contactClient}  onChange={e => onChange("contactClient", e.target.value)} style={inp} placeholder="Prénom Nom"/></Field>
        <Field label="Commercial" required><Sel value={data.commercial} onChange={v => onChange("commercial", v)} options={COMMERCIAUX}/></Field>
        <Field label="Revendeur" required><Sel value={data.revendeur} onChange={v => onChange("revendeur", v)} options={REVENDEURS}/></Field>
        <Field label="Agent co."><input value={data.agentCo} onChange={e => onChange("agentCo", e.target.value)} style={inp} placeholder="Nom de l'agent"/></Field>
        <Field label="Remise (%)"><input type="number" min="0" max="100" step="0.5" value={data.remiseAgco} onChange={e => onChange("remiseAgco", e.target.value)} style={{...inp,width:100}} placeholder="0"/></Field>
        <Field label="Date livraison"><input type="date" value={data.dateLivraison} onChange={e => onChange("dateLivraison", e.target.value)} style={inp}/></Field>
        <Field label="Tarif année">
          <Sel value={String(data.annee)} onChange={v => onChange("annee", Number(v))} options={annees.map(String)}/>
        </Field>
        <Field label="Formule logistique">
          <Sel value={data.formule||""} onChange={v => onChange("formule", v)} options={["ECO","SERENITE","CONFORT"]}/>
        </Field>
        {(data.formule === "SERENITE" || data.formule === "CONFORT") && (
          <Field label="Département (ex: 75)">
            <input value={data.departement||""} onChange={e => onChange("departement", e.target.value.replace(/\D/g,"").slice(0,3))} style={inp} placeholder="26"/>
          </Field>
        )}
      </div>
      <Field label="Commentaire"><textarea value={data.commentaire} onChange={e => onChange("commentaire", e.target.value)} rows={2} style={{...inp,resize:"vertical"}}/></Field>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
        <Btn onClick={onNext} disabled={!ok}>Produits →</Btn>
      </div>
    </div>
  );
}
