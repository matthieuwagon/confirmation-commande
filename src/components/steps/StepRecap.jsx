import { C, Btn, Tag } from "../ui/atoms.jsx";
import { calcPrix } from "../../lib/pricing.js";

function buildLine(modele, config, bareme) {
  const p = calcPrix(modele, config, bareme);
  return {
    MODELE:          modele?.label,
    QUANTITE:        config.quantite || 1,
    STRUCTURE:       config.structure || "",
    EXTERIEUR:       config.exterieur || "",
    INTERIEUR:       config.interieur || "",
    FOND:            (config.fonds || []).join(" | "),
    TISSU:           config.tissuInterieur || "",
    ACCESSOIRES:     modele ? modele.accessoires.filter(a => (config.accessoires || {})[a.key]).map(a => a.label).join(", ") : "",
    PRIX_UNITAIRE_HT: p.unitaire,
    ECO:             p.eco,
    TOTAL_HT:        p.total,
    _p:              p,
  };
}

export default function StepRecap({ catalogue, bareme, entete, modeleId, config, onBack, onAddProduct, products }) {
  const m = catalogue[modeleId];
  const cur = buildLine(m, config, bareme);
  const all = [...products, cur];
  const grand = all.reduce((s, l) => s + (l._p?.total || 0), 0);

  return (
    <div style={{overflowY:"auto",maxHeight:"calc(100vh - 200px)",paddingRight:4}}>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Récapitulatif</h2>

      <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px 14px"}}>
          {[
            ["Chantier",   entete.chantier],
            ["Client",     entete.clientFinal],
            ["Commercial", entete.commercial],
            ["Agent",      entete.agentCo],
            ["Réf.",       entete.cdeClient || "—"],
            ["Livraison",  entete.dateLivraison || "—"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{fontSize:9,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>{k}</div>
              <div style={{fontSize:12,fontWeight:600}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {all.map((l, i) => {
        const isCur = i === all.length - 1;
        return (
          <div key={i} style={{border:`1.5px solid ${isCur ? C.blue : C.border}`,borderRadius:10,padding:12,marginBottom:8,background:isCur ? C.blueBg : C.card}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <Tag color={C.blue}>#{i + 1}</Tag>
              <span style={{fontWeight:700,fontSize:13}}>{l.MODELE}</span>
              <span style={{fontSize:12,color:C.muted}}>× {l.QUANTITE}</span>
              {isCur && <Tag color={C.green}>En cours</Tag>}
              <div style={{marginLeft:"auto",fontWeight:800,fontSize:14,color:C.green}}>{l._p?.total?.toLocaleString("fr-FR")} €</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"4px 10px",fontSize:11}}>
              {[["Structure",l.STRUCTURE],["Extérieur",l.EXTERIEUR],["Intérieur",l.INTERIEUR],["Tissu",l.TISSU],["Fond",l.FOND],["Accessoires",l.ACCESSOIRES]]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <div style={{fontSize:9,color:"#bbb",fontWeight:700,textTransform:"uppercase"}}>{k}</div>
                    <div style={{color:"#333"}}>{v}</div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}

      <div style={{background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:10,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:13,fontWeight:700}}>Total commande HT</span>
        <span style={{fontSize:20,fontWeight:800,color:C.green}}>{grand.toLocaleString("fr-FR")} €</span>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",marginTop:14,gap:8,flexWrap:"wrap"}}>
        <Btn onClick={onBack} variant="secondary">← Modifier</Btn>
        <div style={{display:"flex",gap:8}}>
          <Btn onClick={onAddProduct} variant="secondary">+ Produit</Btn>
          <Btn onClick={() => alert("✅ Commande validée !")}>✓ Valider</Btn>
        </div>
      </div>
    </div>
  );
}
