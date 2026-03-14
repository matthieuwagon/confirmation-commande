import { useState, useCallback } from "react";
import { CATALOGUE } from "./data/catalogue.js";
import { calcPrix } from "./lib/pricing.js";
import { C, Tag, StepDot } from "./components/ui/atoms.jsx";
import Viewer3D    from "./components/Viewer3D.jsx";
import AdminView   from "./components/AdminView.jsx";
import StepEntete  from "./components/steps/StepEntete.jsx";
import StepModele  from "./components/steps/StepModele.jsx";
import StepConfig  from "./components/steps/StepConfig.jsx";
import StepRecap   from "./components/steps/StepRecap.jsx";


const STEPS = ["En-tête", "Modèle", "Configuration", "Récapitulatif"];

export default function App() {
  const [mode,      setMode]      = useState("config");
  const [step,      setStep]      = useState(0);
  const [catalogue, setCatalogue] = useState(CATALOGUE);
const [entete,    setEntete]    = useState({ chantier:"", clientFinal:"", commercial:"", agentCo:"", cdeClient:"", contactClient:"", remiseAgco:"", dateLivraison:"", commentaire:"" });
  const [modeleId,  setModeleId]  = useState("");
  const [config,    setConfig]    = useState({ quantite:1, accessoires:{}, fonds:[] });
  const [products,  setProducts]  = useState([]);

  const setE = useCallback((k, v) => setEntete(e => ({ ...e, [k]:v })), []);
  const setC = useCallback((k, v) => setConfig(c  => ({ ...c, [k]:v })), []);

  const handleSelect = id => {
    const m = catalogue[id];
    setModeleId(id);
    setConfig(c => ({ ...c, fonds:Array(m.paroisFond).fill("") }));
  };

  const handleAdd = () => {
    const m = catalogue[modeleId];
    const p = calcPrix(m, config);
    setProducts(pr => [...pr, {
      MODELE:           m?.label,
      QUANTITE:         config.quantite || 1,
      STRUCTURE:        config.structure || "",
      EXTERIEUR:        config.exterieur || "",
      INTERIEUR:        config.interieur || "",
      FOND:             (config.fonds || []).join(" | "),
      TISSU:            config.tissuInterieur || "",
      ACCESSOIRES:      m ? m.accessoires.filter(a => (config.accessoires || {})[a.key]).map(a => a.label).join(", ") : "",
      PRIX_UNITAIRE_HT: p.unitaire,
      ECO:              p.eco,
      TOTAL_HT:         p.total,
      _p:               p,
    }]);
    setModeleId("");
    setConfig({ quantite:1, accessoires:{}, fonds:[] });
    setStep(1);
  };

  const show3D = mode === "config" && (step === 2 || step === 3) && !!modeleId;

  return (
    <div style={{minHeight:"100vh",background:"#f4f4f2",padding:"18px 14px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:14}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:2}}>Configurateur commande</div>
            <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Cabines × Produits complémentaires</h1>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {products.length > 0 && <Tag color={C.green}>{products.length} produit{products.length > 1 ? "s" : ""}</Tag>}
            <button onClick={() => setMode(m => m === "config" ? "admin" : "config")} style={{padding:"7px 14px",borderRadius:9,border:`1.5px solid ${C.border}`,background:mode === "admin" ? "#1a1a1a" : "#fff",color:mode === "admin" ? "#fff" : C.text,fontSize:12,fontWeight:600,cursor:"pointer"}}>
              {mode === "admin" ? "← Configurateur" : "⚙ Admin"}
            </button>
          </div>
        </div>

        {mode === "config" && (
          <div style={{display:"flex",alignItems:"center",background:C.card,borderRadius:10,padding:"10px 18px",marginBottom:14,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
            {STEPS.map((s, i) => (
              <div key={s} style={{display:"flex",alignItems:"center"}}>
                <StepDot n={i + 1} label={s} active={step === i} done={step > i}/>
                {i < STEPS.length - 1 && <div style={{width:22,height:1,background:step > i ? C.text : C.border,margin:"0 8px"}}/>}
              </div>
            ))}
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:show3D ? "1fr 440px" : "1fr",gap:14,alignItems:"start"}}>
          <div style={{background:C.card,borderRadius:14,padding:26,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
            {mode === "admin"
              ? <AdminView catalogue={catalogue} setCatalogue={setCatalogue}/>
              : <>
                  {step === 0 && <StepEntete data={entete} onChange={setE} onNext={() => setStep(1)}/>}
                  {step === 1 && <StepModele catalogue={catalogue} selected={modeleId} onSelect={handleSelect} onNext={() => setStep(2)} onBack={() => setStep(0)}/>}
                  {step === 2 && modeleId && <StepConfig catalogue={catalogue} modeleId={modeleId} config={config} onChange={setC} onNext={() => setStep(3)} onBack={() => setStep(1)}/>}
                  {step === 3 && <StepRecap catalogue={catalogue} entete={entete} modeleId={modeleId} config={config} onBack={() => setStep(2)} onAddProduct={handleAdd} products={products}/>}
                </>
            }
          </div>
          {show3D && (
            <div style={{position:"sticky",top:16,height:500,background:C.card,borderRadius:14,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",overflow:"hidden"}}>
              <Viewer3D modele={catalogue[modeleId]} config={config}/>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
