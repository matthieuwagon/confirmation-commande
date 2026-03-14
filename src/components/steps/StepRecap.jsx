import { C, Btn, Tag } from "../ui/atoms.jsx";
import { calcPrix } from "../../lib/pricing.js";
import { calcLivraisonSerenite, calcLivraisonConfort, calcRemise } from "../../lib/logistics.js";

function buildLine(catalogue, modeleId, config) {
  const modele = catalogue[modeleId];
  const p = calcPrix(modele, config);
  return {
    modeleId,
    quantite:         config.quantite || 1,
    MODELE:           modele?.label,
    GAMME:            modele?.gamme,
    CONFIGURATION:    config.configuration || "",
    STRUCTURE:        config.structure || "",
    EXTERIEUR:        config.exterieur || "",
    INTERIEUR:        config.interieur || "",
    FOND:             (config.fonds||[]).join(" | ") || config.fond || "",
    HABILLAGE:        config.habillage || "",
    BANQUETTE:        config.banquette || "",
    PANNEAUX:         config.panneaux || "",
    MOQUETTE:         config.moquette || "",
    PRISE:            config.prise || "",
    ECRAN:            config.ecran || "",
    ACCESSOIRES:      modele ? modele.accessoires.filter(a => (config.accessoires||{})[a.key]).map(a => a.label).join(", ") : "",
    COMMENTAIRE:      config.commentaire || "",
    PRIX_UNITAIRE_HT: p.unitaire,
    ECO:              p.eco,
    TOTAL_HT:         p.total,
    _p:               p,
  };
}

function LigneDetail({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <div style={{fontSize:9,color:"#bbb",fontWeight:700,textTransform:"uppercase"}}>{label}</div>
      <div style={{color:"#333",fontSize:11}}>{value}</div>
    </div>
  );
}

export default function StepRecap({ catalogue, entete, modeleId, config, onBack, onAddProduct, products }) {
  const cur = buildLine(catalogue, modeleId, config);
  const all = [...products, cur];

  // Totaux produits
  const sousTotalProduits = all.reduce((s, l) => s + (l._p?.unitaire || 0) * (l.quantite || 1), 0);
  const totalEco          = all.reduce((s, l) => s + (l._p?.eco || 0), 0);
  const totalBrut         = sousTotalProduits + totalEco;

  // Logistique
  const formule = entete.formule || "";
  let livraison = 0;
  let livraisonLabel = "";
  if (formule === "ECO") {
    livraison = 0;
    livraisonLabel = "ECO (inclus)";
  } else if (formule === "SERENITE" && entete.departement) {
    const calc = calcLivraisonSerenite(all, entete.departement);
    if (calc !== null) {
      livraison = calc;
      livraisonLabel = `Sérénité — Dept. ${entete.departement}`;
    } else {
      livraisonLabel = "Département non trouvé";
    }
  } else if (formule === "CONFORT" && entete.departement) {
    const calc = calcLivraisonConfort(all, entete.departement);
    if (calc !== null) {
      livraison = calc;
      livraisonLabel = `Confort — Dept. ${entete.departement}`;
    } else {
      livraisonLabel = "Confort — sur devis (SIXO/dept inconnu)";
    }
  } else if (formule === "CONFORT") {
    livraisonLabel = "Confort — département requis";
  }

  // Remise
  const remise = calcRemise(totalBrut + livraison, entete.remiseAgco);
  const totalNet = totalBrut + livraison - remise;

  return (
    <div style={{overflowY:"auto",maxHeight:"calc(100vh - 200px)",paddingRight:4}}>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Récapitulatif</h2>

      {/* En-tête commande */}
      <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px 14px"}}>
          {[
            ["Chantier",   entete.chantier],
            ["Client",     entete.clientFinal],
            ["Revendeur",  entete.revendeur],
            ["Commercial", entete.commercial],
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

      {/* Lignes produits */}
      {all.map((l, i) => {
        const isCur = i === all.length - 1;
        return (
          <div key={i} style={{border:`1.5px solid ${isCur ? C.blue : C.border}`,borderRadius:10,padding:12,marginBottom:8,background:isCur ? C.blueBg : C.card}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <Tag color={C.blue}>#{i+1}</Tag>
              <span style={{fontWeight:700,fontSize:13}}>{l.MODELE}</span>
              {l.CONFIGURATION && <Tag color="#f59e0b">{l.CONFIGURATION}</Tag>}
              <span style={{fontSize:12,color:C.muted}}>× {l.quantite}</span>
              {isCur && <Tag color={C.green}>En cours</Tag>}
              <div style={{marginLeft:"auto",fontWeight:800,fontSize:14,color:C.green}}>{l._p?.total?.toLocaleString("fr-FR")} €</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"4px 10px"}}>
              {[
                ["Structure",l.STRUCTURE],["Extérieur",l.EXTERIEUR],["Intérieur",l.INTERIEUR],
                ["Fond",l.FOND],["Habillage",l.HABILLAGE],["Banquette",l.BANQUETTE],
                ["Panneaux",l.PANNEAUX],["Moquette",l.MOQUETTE],["Prise",l.PRISE],
                ["Écran",l.ECRAN],["Accessoires",l.ACCESSOIRES],["Commentaire",l.COMMENTAIRE],
              ].map(([k, v]) => <LigneDetail key={k} label={k} value={v}/>)}
            </div>
          </div>
        );
      })}

      {/* Totaux */}
      <div style={{background:"#f8f8f8",borderRadius:10,padding:"12px 16px",marginTop:8}}>
        {[
          ["Sous-total produits HT", sousTotalProduits],
          ["Éco-participation",      totalEco],
        ].map(([l, v]) => (
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:13,borderBottom:`1px solid ${C.border}`}}>
            <span style={{color:C.muted}}>{l}</span>
            <span style={{fontWeight:600}}>{v.toLocaleString("fr-FR")} €</span>
          </div>
        ))}

        {formule && (
          <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:13,borderBottom:`1px solid ${C.border}`}}>
            <span style={{color:C.muted}}>Livraison — {livraisonLabel}</span>
            <span style={{fontWeight:600}}>{livraison > 0 || formule === "ECO" ? livraison.toLocaleString("fr-FR") + " €" : "sur devis"}</span>
          </div>
        )}

        {remise > 0 && (
          <div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:13,borderBottom:`1px solid ${C.border}`}}>
            <span style={{color:"#dc2626"}}>Remise ({entete.remiseAgco}%)</span>
            <span style={{fontWeight:600,color:"#dc2626"}}>−{remise.toLocaleString("fr-FR")} €</span>
          </div>
        )}

        <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,marginTop:4}}>
          <span style={{fontSize:14,fontWeight:700}}>Total net HT</span>
          <span style={{fontSize:22,fontWeight:800,color:C.green}}>{totalNet.toLocaleString("fr-FR")} €</span>
        </div>
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
