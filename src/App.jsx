import { useState, useCallback, useEffect, useRef } from "react";
import * as THREE from "three";

// ─── CATALOGUE ───────────────────────────────────────────────────────────────
const BAREME_ECO = [
  { id:"e1", poidsMin:0,   poidsMax:49,  montant:4.50 },
  { id:"e2", poidsMin:50,  poidsMax:99,  montant:8.00 },
  { id:"e3", poidsMin:100, poidsMax:199, montant:14.00 },
  { id:"e4", poidsMin:200, poidsMax:999, montant:22.00 },
];

const FINITIONS = {
  structure:      [ {label:"Blanc mat — S1",color:0xf2f2f0,roughness:0.6}, {label:"Anthracite — S2",color:0x2f3130,roughness:0.5}, {label:"Bois clair — S3",color:0xc8975a,roughness:0.8} ],
  exterieur:      [ {label:"Blanc mat — E1",color:0xf0eeeb,roughness:0.55,surcout:0}, {label:"Anthracite — E2",color:0x353535,roughness:0.55,surcout:0}, {label:"Bois clair — E3",color:0xc8975a,roughness:0.75,surcout:0}, {label:"Tissu (option)",color:0x7a8070,roughness:0.95,surcout:180} ],
  interieur:      [ {label:"Blanc mat — I1",color:0xf5f4f1,roughness:0.7}, {label:"Anthracite — I2",color:0x3a3a3a,roughness:0.7}, {label:"Bois clair — I3",color:0xc8975a,roughness:0.75} ],
  fond:           [ {label:"Vitré",color:0xc8dde8,roughness:0.05,metalness:0.1,transparent:true,opacity:0.25,surcout:120}, {label:"Plein mélaminé",color:0x3a3a3a,roughness:0.6,transparent:false,opacity:1,surcout:0}, {label:"Plein tissu",color:0x7a8070,roughness:0.95,transparent:false,opacity:1,surcout:60} ],
  tissuInterieur: [ {label:"Élégance — Blanc",color:0xf5f3ee}, {label:"Élégance — Gris",color:0xd0cfc8}, {label:"Élégance — Anthracite",color:0x3a3935}, {label:"Traditions — Beige",color:0xd4b896}, {label:"Traditions — Taupe",color:0x9e8e7e}, {label:"Gabriel Chili — Rouge",color:0x9b2335}, {label:"Gabriel Chili — Bleu",color:0x2d5986}, {label:"Gabriel Chili — Vert",color:0x4a7c59} ],
};

const mkOpts = (arr) => arr.map(f => ({ label:f.label, surcout:f.surcout ?? 0 }));

const CATALOGUE = {
  SOLO:        { id:"SOLO",        label:"Solo",           icon:"▪",   paroisFond:4, modules:1, poidsBrut:80,  prixBase:3200,  options:{ structure:mkOpts(FINITIONS.structure), exterieur:mkOpts(FINITIONS.exterieur), interieur:mkOpts(FINITIONS.interieur), fond:mkOpts(FINITIONS.fond), tissuInterieur:mkOpts(FINITIONS.tissuInterieur) }, accessoires:[{key:"S",label:"Siège",surcout:180},{key:"SE",label:"Siège ergonomique",surcout:320},{key:"TBR",label:"Table bras rabattable",surcout:95},{key:"TE",label:"Table escamotable",surcout:140},{key:"IND",label:"Éclairage LED indirect",surcout:210},{key:"T",label:"Tablette",surcout:65},{key:"O",label:"Prise électrique",surcout:55},{key:"BUR",label:"Bureau intégré",surcout:175}] },
  SOLO_BUREAU: { id:"SOLO_BUREAU", label:"Solo Bureau",    icon:"▪",   paroisFond:4, modules:1, poidsBrut:95,  prixBase:3600,  options:{structure:[],exterieur:[],interieur:[],fond:[],tissuInterieur:[]}, accessoires:[] },
  SOLO_FLEX:   { id:"SOLO_FLEX",   label:"Solo Flex",      icon:"▪",   paroisFond:4, modules:1, poidsBrut:88,  prixBase:3400,  options:{structure:[],exterieur:[],interieur:[],fond:[],tissuInterieur:[]}, accessoires:[] },
  DUO:         { id:"DUO",         label:"Duo",            icon:"▪▪",  paroisFond:4, modules:2, poidsBrut:145, prixBase:5200,  options:{structure:[],exterieur:[],interieur:[],fond:[],tissuInterieur:[]}, accessoires:[] },
  QUATTRO:     { id:"QUATTRO",     label:"Quattro",        icon:"▪▪",  paroisFond:4, modules:2, poidsBrut:190, prixBase:6800,  options:{structure:[],exterieur:[],interieur:[],fond:[],tissuInterieur:[]}, accessoires:[] },
  SIXO:        { id:"SIXO",        label:"Sixo",           icon:"▪▪▪", paroisFond:4, modules:3, poidsBrut:230, prixBase:8400,  options:{structure:[],exterieur:[],interieur:[],fond:[],tissuInterieur:[]}, accessoires:[] },
  XL_2MOD:     { id:"XL_2MOD",     label:"XL (2 modules)", icon:"▬▬",  paroisFond:6, modules:2, poidsBrut:310, prixBase:11500, options:{structure:[],exterieur:[],interieur:[],fond:[],tissuInterieur:[]}, accessoires:[] },
  XL_3MOD:     { id:"XL_3MOD",     label:"XL (3 modules)", icon:"▬▬▬", paroisFond:8, modules:3, poidsBrut:420, prixBase:15800, options:{structure:[],exterieur:[],interieur:[],fond:[],tissuInterieur:[]}, accessoires:[] },
};

const OPTION_LABELS = { structure:"Structure", exterieur:"Extérieur", interieur:"Intérieur", fond:"Fond de paroi", tissuInterieur:"Tissu intérieur" };
const COMMERCIAUX = ["Alice Martin","Baptiste Léon","Clara Dubois","David Perrin"];

// ─── CALCULS ─────────────────────────────────────────────────────────────────
function calcEco(p,b){ const t=b.find(t=>p>=t.poidsMin&&p<=t.poidsMax); return t?t.montant:0; }
function calcPrix(m,c,b){
  if(!m) return {prixBase:0,surcoûts:0,eco:0,unitaire:0,total:0};
  let s=0;
  ["structure","exterieur","interieur","fond","tissuInterieur"].forEach(k=>{ const v=c[k]; if(v){const o=(m.options[k]||[]).find(x=>x.label===v); if(o) s+=o.surcout;} });
  Object.entries(c.accessoires||{}).forEach(([k,on])=>{ if(on){const a=m.accessoires.find(x=>x.key===k);if(a)s+=a.surcout;} });
  const eco=calcEco(m.poidsBrut,b), qty=c.quantite||1, u=m.prixBase+s;
  return {prixBase:m.prixBase,surcoûts:s,eco,unitaire:u,total:u*qty+eco};
}

// ─── UI ATOMS ────────────────────────────────────────────────────────────────
const C={ bg:"#f4f4f2",card:"#fff",border:"#e8e8e8",text:"#1a1a1a",muted:"#888",blue:"#2563eb",blueBg:"#eff6ff",green:"#16a34a",red:"#e53e3e" };
const inp={ width:"100%",padding:"9px 12px",border:`1.5px solid ${C.border}`,borderRadius:8,fontFamily:"system-ui,sans-serif",fontSize:14,color:C.text,background:C.card,outline:"none",boxSizing:"border-box" };
const Field=({label,required,children})=>(<div style={{marginBottom:16}}><label style={{display:"block",fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>{label}{required&&<span style={{color:C.red,marginLeft:3}}>*</span>}</label>{children}</div>);
const Sel=({value,onChange,options})=>(<div style={{position:"relative"}}><select value={value} onChange={e=>onChange(e.target.value)} style={{...inp,appearance:"none",paddingRight:32,cursor:"pointer"}}><option value="">Sélectionner...</option>{options.map(o=><option key={o.label??o} value={o.label??o}>{o.label??o}{o.surcout!=null&&o.surcout!==0?` (${o.surcout>0?"+":""}${o.surcout}€)`:""}</option>)}</select><span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#aaa",fontSize:12}}>▾</span></div>);
const Check=({checked,onChange,label,surcout})=>(<label onClick={onChange} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",padding:"6px 10px",borderRadius:8,border:`1.5px solid ${checked?C.blue:C.border}`,background:checked?C.blueBg:"#fafafa",userSelect:"none"}}><div style={{width:15,height:15,borderRadius:4,flexShrink:0,border:`2px solid ${checked?C.blue:"#ccc"}`,background:checked?C.blue:C.card,display:"flex",alignItems:"center",justifyContent:"center"}}>{checked&&<span style={{color:"#fff",fontSize:9}}>✓</span>}</div><span style={{fontSize:12,color:checked?"#1d4ed8":"#555",fontWeight:checked?600:400,flex:1}}>{label}</span>{surcout!=null&&surcout!==0&&<span style={{fontSize:11,color:checked?C.blue:"#aaa",fontWeight:600}}>{surcout>0?"+":""}{surcout}€</span>}</label>);
const Btn=({onClick,children,variant="primary",disabled,size="md"})=>(<button onClick={onClick} disabled={disabled} style={{padding:size==="sm"?"6px 14px":"10px 22px",borderRadius:9,border:"none",cursor:disabled?"not-allowed":"pointer",fontSize:size==="sm"?12:14,fontWeight:600,background:disabled?"#f0f0f0":variant==="primary"?C.text:variant==="danger"?"#fee2e2":"#f0f0f0",color:disabled?"#bbb":variant==="primary"?"#fff":variant==="danger"?C.red:C.text}}>{children}</button>);
const Tag=({color=C.blue,children})=>(<span style={{display:"inline-block",padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:color+"18",color}}>{children}</span>);
const StepDot=({n,label,active,done})=>(<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,background:done?C.text:active?C.blueBg:"#f0f0f0",color:done?"#fff":active?C.blue:"#aaa",border:active?`2px solid ${C.blue}`:"2px solid transparent"}}>{done?"✓":n}</div><span style={{fontSize:12,color:active?C.text:done?"#555":"#bbb",fontWeight:active?600:400}}>{label}</span></div>);
const PrixBar=({prix,qty})=>(<div style={{background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:10,padding:"10px 14px",display:"flex",gap:16,flexWrap:"wrap",alignItems:"center"}}>{[["Base",prix.prixBase?.toLocaleString("fr-FR")+" €",C.text],["Options",(prix.surcoûts>=0?"+":"")+prix.surcoûts?.toLocaleString("fr-FR")+" €",C.blue],["Éco",prix.eco?.toFixed(2)+" €","#92400e"],["Unitaire HT",prix.unitaire?.toLocaleString("fr-FR")+" €",C.text]].map(([l,v,c])=>(<div key={l}><div style={{fontSize:9,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>{l}</div><div style={{fontSize:13,fontWeight:700,color:c}}>{v}</div></div>))}<div style={{borderLeft:"2px solid #bbf7d0",paddingLeft:14,marginLeft:4}}><div style={{fontSize:9,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>Total × {qty||1}</div><div style={{fontSize:17,fontWeight:800,color:C.green}}>{prix.total?.toLocaleString("fr-FR")} €</div></div></div>);

// ─── 3D CABIN BUILDER ────────────────────────────────────────────────────────
function buildCabin(modele, config) {
  const group = new THREE.Group();
  const mods  = modele.modules || 1;
  const isXL  = modele.id?.startsWith("XL");
  const Wm    = isXL ? 2.2 : 1.55;
  const H     = 2.18, D = isXL ? 2.2 : 1.55, totW = Wm * mods, t = 0.055;

  const extF  = FINITIONS.exterieur.find(f=>f.label===config.exterieur)          || FINITIONS.exterieur[0];
  const strF  = FINITIONS.structure.find(f=>f.label===config.structure)          || FINITIONS.structure[0];
  const fondF = FINITIONS.fond.find(f=>f.label===config.fond)                    || FINITIONS.fond[0];
  const tisF  = FINITIONS.tissuInterieur.find(f=>f.label===config.tissuInterieur)|| FINITIONS.tissuInterieur[0];

  const mExt  = new THREE.MeshStandardMaterial({color:extF.color,  roughness:extF.roughness,  metalness:0.01, side:THREE.FrontSide});
  const mStr  = new THREE.MeshStandardMaterial({color:strF.color,  roughness:strF.roughness,  metalness:0.08});
  const mFond = new THREE.MeshStandardMaterial({color:fondF.color, roughness:fondF.roughness||0.5, metalness:fondF.metalness||0, transparent:fondF.transparent||false, opacity:fondF.opacity??1, side:THREE.DoubleSide});
  const mTis  = new THREE.MeshStandardMaterial({color:tisF.color,  roughness:0.92});
  const mGlass= new THREE.MeshStandardMaterial({color:0xbbd6e8, transparent:true, opacity:0.18, roughness:0.04, metalness:0.1, side:THREE.DoubleSide});
  const mFloor= new THREE.MeshStandardMaterial({color:strF.color,  roughness:0.88});

  const box=(w,h,d,mat,x,y,z,cast=true)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat); m.position.set(x,y,z); m.castShadow=cast; m.receiveShadow=true; group.add(m); };
  const cyl=(r,h,mat,x,y,z)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),mat); m.position.set(x,y,z); m.castShadow=true; group.add(m); };

  box(totW+t*2, t, D+t*2, mExt,   0,  H/2, 0);
  box(totW+t*2, t, D+t*2, mFloor, 0, -H/2, 0, false);
  box(t, H, D, mExt, -(totW/2)-t/2, 0, 0);
  box(t, H, D, mExt,  (totW/2)+t/2, 0, 0);
  box(totW, H, t, mFond, 0, 0, -(D/2)-t/2);
  box(totW-t*3, H*0.74, t*0.4, mGlass, 0, -H*0.09, D/2);
  box(totW, t*1.2, t*1.2, mStr, 0,  H/2-t*0.6, D/2);
  box(totW, t*1.2, t*1.2, mStr, 0, -H/2+t*0.6, D/2);
  box(t*1.4, H, t*1.4, mStr, -(totW/2), 0, D/2);
  box(t*1.4, H, t*1.4, mStr,  (totW/2), 0, D/2);
  [[-totW/2,D/2],[totW/2,D/2],[-totW/2,-D/2],[totW/2,-D/2]].forEach(([cx,cz])=>cyl(0.032,H,mStr,cx,0,cz));
  if(mods>1&&isXL) for(let i=1;i<mods;i++) box(t,H,D,mStr,-totW/2+Wm*i,0,0);
  box(totW-t*3, t*0.4, D-t*3, mTis, 0, H/2-t*1.8, 0, false);

  const acc = config.accessoires||{};
  if(acc.S||acc.SE||acc.SEO){
    const ms=new THREE.MeshStandardMaterial({color:acc.SE||acc.SEO?0x111111:0x2a2a2a,roughness:0.65});
    cyl(0.038,0.48,ms,0,-H/2+0.24,0);
    box(0.44,0.065,0.40,ms,0,-H/2+0.50,0);
    if(acc.SE||acc.SEO) box(0.40,0.55,0.055,ms,0,-H/2+0.83,-D/2+0.35);
  }
  if(acc.BUR||acc.TE||acc.TBR){
    const md=new THREE.MeshStandardMaterial({color:strF.color,roughness:0.45,metalness:0.05});
    const dw=acc.BUR?totW-0.25:0.50;
    box(dw,0.038,0.44,md,0,-H/2+0.76,acc.BUR?0:0.06);
    if(acc.BUR)[[-dw/2+0.07,0.07],[dw/2-0.07,0.07],[-dw/2+0.07,-0.32],[dw/2-0.07,-0.32]].forEach(([lx,lz])=>cyl(0.022,0.74,mStr,lx,-H/2+0.4,lz));
  }
  if(acc.IND){
    const ml=new THREE.MeshStandardMaterial({color:0xfffde0,emissive:0xfffde0,emissiveIntensity:1.4,roughness:0.2});
    box(totW-0.16,0.022,0.05,ml,0,H/2-0.14,D/2-0.1);
    const pl=new THREE.PointLight(0xfff8cc,0.9,3.5); pl.position.set(0,H/2-0.22,D/2-0.15); group.add(pl);
  }
  if(acc.T||acc.O){
    const mp=new THREE.MeshStandardMaterial({color:0xf5f5f5,roughness:0.35,metalness:0.15});
    box(0.22,0.018,0.14,mp,totW/2-0.14,-H/2+0.98,-D/2+0.12);
  }
  group.position.y=0.01;
  return group;
}

// ─── VIEWER 3D ────────────────────────────────────────────────────────────────
function Viewer3D({ modele, config }) {
  const mountRef = useRef(null);
  const rendRef  = useRef(null);
  const sceneRef = useRef(null);
  const camRef   = useRef(null);
  const rafRef   = useRef(null);
  const modelRef = useRef(null);
  const drag     = useRef({active:false,x:0,y:0});
  const rot      = useRef({x:0.28,y:0.55});
  const zoom     = useRef(5.5);

  const updateCam = () => {
    const r=rot.current, z=zoom.current, cam=camRef.current; if(!cam) return;
    cam.position.set(Math.sin(r.y)*Math.cos(r.x)*z, Math.sin(r.x)*z+1.0, Math.cos(r.y)*Math.cos(r.x)*z);
    cam.lookAt(0,0.9,0);
  };

  useEffect(()=>{
    const el=mountRef.current; if(!el) return;
    const W=el.clientWidth||420, H=el.clientHeight||500;
    const renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.outputEncoding=THREE.sRGBEncoding; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.15;
    el.appendChild(renderer.domElement); rendRef.current=renderer;

    const scene=new THREE.Scene(); scene.background=new THREE.Color(0xeeece8); sceneRef.current=scene;
    const cam=new THREE.PerspectiveCamera(36,W/H,0.1,100); camRef.current=cam; updateCam();

    scene.add(new THREE.AmbientLight(0xfff8f2,0.5));
    const key=new THREE.DirectionalLight(0xffffff,1.3); key.position.set(4,9,6); key.castShadow=true; key.shadow.mapSize.set(2048,2048); key.shadow.bias=-0.0005; scene.add(key);
    const fill=new THREE.DirectionalLight(0xd8e8ff,0.4); fill.position.set(-5,3,-3); scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffffff,0.2); rim.position.set(0,4,-8); scene.add(rim);
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.MeshStandardMaterial({color:0xe2ddd7,roughness:0.92,metalness:0.02}));
    floor.rotation.x=-Math.PI/2; floor.receiveShadow=true; scene.add(floor);

    const loop=()=>{ rafRef.current=requestAnimationFrame(loop); renderer.render(scene,cam); }; loop();
    return ()=>{ cancelAnimationFrame(rafRef.current); renderer.dispose(); if(el) el.innerHTML=""; };
  },[]);

  useEffect(()=>{
    const scene=sceneRef.current; if(!scene||!modele) return;
    if(modelRef.current){ scene.remove(modelRef.current); modelRef.current=null; }
    const g=buildCabin(modele,config); modelRef.current=g; scene.add(g);
  },[modele,config]);

  useEffect(()=>{
    const el=mountRef.current; if(!el) return;
    const onDown=e=>{drag.current={active:true,x:e.clientX,y:e.clientY}; e.preventDefault();};
    const onUp=()=>{drag.current.active=false;};
    const onMove=e=>{
      if(!drag.current.active) return;
      rot.current.y+=(e.clientX-drag.current.x)*0.007; rot.current.x+=(e.clientY-drag.current.y)*0.004;
      rot.current.x=Math.max(-0.05,Math.min(1.1,rot.current.x));
      drag.current={active:true,x:e.clientX,y:e.clientY}; updateCam();
    };
    const onWheel=e=>{ zoom.current=Math.max(2.5,Math.min(11,zoom.current+e.deltaY*0.005)); updateCam(); e.preventDefault(); };
    el.addEventListener("mousedown",onDown,{passive:false}); window.addEventListener("mouseup",onUp); window.addEventListener("mousemove",onMove); el.addEventListener("wheel",onWheel,{passive:false});
    return ()=>{ el.removeEventListener("mousedown",onDown); window.removeEventListener("mouseup",onUp); window.removeEventListener("mousemove",onMove); el.removeEventListener("wheel",onWheel); };
  },[]);

  return (
    <div style={{position:"relative",width:"100%",height:"100%",borderRadius:14,overflow:"hidden"}}>
      <div ref={mountRef} style={{width:"100%",height:"100%"}}/>
      {modele&&<div style={{position:"absolute",top:10,left:10,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700,color:C.text}}>{modele.icon} {modele.label}</div>}
      <div style={{position:"absolute",bottom:10,left:0,right:0,textAlign:"center",fontSize:10,color:"#bbb",pointerEvents:"none"}}>🖱 Glisser · Molette zoom</div>
    </div>
  );
}

// ─── STEPS ───────────────────────────────────────────────────────────────────
function StepEntete({data,onChange,onNext}){
  const ok=data.chantier&&data.clientFinal&&data.commercial&&data.agentCo;
  return (<div>
    <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>En-tête de commande</h2>
    <p style={{fontSize:13,color:C.muted,marginBottom:22}}>Informations générales</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
      <Field label="Chantier" required><input value={data.chantier} onChange={e=>onChange("chantier",e.target.value)} style={inp} placeholder="Siège social Acme 2025"/></Field>
      <Field label="Réf. client"><input value={data.cdeClient} onChange={e=>onChange("cdeClient",e.target.value)} style={inp} placeholder="PO-2025-0042"/></Field>
      <Field label="Client final" required><input value={data.clientFinal} onChange={e=>onChange("clientFinal",e.target.value)} style={inp} placeholder="Entreprise"/></Field>
      <Field label="Contact"><input value={data.contactClient} onChange={e=>onChange("contactClient",e.target.value)} style={inp} placeholder="Prénom Nom"/></Field>
      <Field label="Commercial" required><Sel value={data.commercial} onChange={v=>onChange("commercial",v)} options={COMMERCIAUX}/></Field>
      <Field label="Agent co." required><input value={data.agentCo} onChange={e=>onChange("agentCo",e.target.value)} style={inp} placeholder="Nom de l'agent"/></Field>
      <Field label="Remise agent (%)"><input type="number" min="0" max="100" value={data.remiseAgco} onChange={e=>onChange("remiseAgco",e.target.value)} style={{...inp,width:100}} placeholder="0"/></Field>
      <Field label="Date livraison"><input type="date" value={data.dateLivraison} onChange={e=>onChange("dateLivraison",e.target.value)} style={inp}/></Field>
    </div>
    <Field label="Commentaire"><textarea value={data.commentaire} onChange={e=>onChange("commentaire",e.target.value)} rows={2} style={{...inp,resize:"vertical"}}/></Field>
    <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><Btn onClick={onNext} disabled={!ok}>Produits →</Btn></div>
  </div>);
}

function StepModele({catalogue,selected,onSelect,onNext,onBack}){
  return (<div>
    <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Gamme Premium</h2>
    <p style={{fontSize:13,color:C.muted,marginBottom:18}}>Sélectionnez le modèle</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:24}}>
      {Object.values(catalogue).map(m=>(
        <button key={m.id} onClick={()=>onSelect(m.id)} style={{padding:"12px 8px",border:`2px solid ${selected===m.id?C.blue:C.border}`,borderRadius:10,background:selected===m.id?C.blueBg:"#fafafa",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:16,marginBottom:4,color:selected===m.id?C.blue:"#aaa"}}>{m.icon}</div>
          <div style={{fontSize:12,fontWeight:700,color:selected===m.id?"#1d4ed8":C.text,marginBottom:2}}>{m.label}</div>
          <div style={{fontSize:11,color:"#aaa"}}>{m.prixBase.toLocaleString("fr-FR")} €</div>
        </button>
      ))}
    </div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <Btn onClick={onBack} variant="secondary">← Retour</Btn>
      <Btn onClick={onNext} disabled={!selected}>Configurer →</Btn>
    </div>
  </div>);
}

function StepConfig({catalogue,bareme,modeleId,config,onChange,onNext,onBack}){
  const m=catalogue[modeleId]; if(!m) return null;
  const prix=calcPrix(m,config,bareme);
  const setFond=(i,v)=>{ const f=[...(config.fonds||Array(m.paroisFond).fill(""))]; f[i]=v; onChange("fonds",f); };
  const toggleAcc=k=>onChange("accessoires",{...(config.accessoires||{}),[k]:!(config.accessoires||{})[k]});
  return (<div style={{overflowY:"auto",maxHeight:"calc(100vh - 200px)",paddingRight:4}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>{m.label}</h2><Tag>Premium</Tag></div>
    <p style={{fontSize:13,color:C.muted,marginBottom:14}}>{m.poidsBrut} kg · {m.modules} module{m.modules>1?"s":""}</p>
    <div style={{marginBottom:16}}><PrixBar prix={prix} qty={config.quantite||1}/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
      <Field label="Quantité"><input type="number" min="1" value={config.quantite||1} onChange={e=>onChange("quantite",parseInt(e.target.value)||1)} style={{...inp,width:90}}/></Field>
      <div/>
      {Object.entries(OPTION_LABELS).map(([k,lbl])=>{ const opts=m.options[k]||[]; if(!opts.length) return null; return <Field key={k} label={lbl}><Sel value={config[k]||""} onChange={v=>onChange(k,v)} options={opts}/></Field>; })}
    </div>
    {(m.options.fond||[]).length>0&&(<div style={{margin:"14px 0",padding:14,background:"#f0f6ff",borderRadius:10,border:"1.5px solid #bfdbfe"}}>
      <div style={{fontSize:11,fontWeight:700,color:"#1d4ed8",textTransform:"uppercase",marginBottom:10}}>Fonds de parois · {m.paroisFond} parois</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        {Array.from({length:m.paroisFond},(_,i)=><Field key={i} label={`Paroi ${i+1}`}><Sel value={(config.fonds||[])[i]||""} onChange={v=>setFond(i,v)} options={m.options.fond}/></Field>)}
      </div>
    </div>)}
    {m.accessoires.length>0&&(<div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:11,fontWeight:700,color:"#555",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Accessoires</label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
        {m.accessoires.map(a=><Check key={a.key} checked={!!(config.accessoires||{})[a.key]} onChange={()=>toggleAcc(a.key)} label={a.label} surcout={a.surcout}/>)}
      </div>
    </div>)}
    <Field label="Commentaire"><textarea value={config.commentaire||""} onChange={e=>onChange("commentaire",e.target.value)} rows={2} style={{...inp,resize:"vertical"}}/></Field>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
      <Btn onClick={onBack} variant="secondary">← Retour</Btn>
      <Btn onClick={onNext}>Récapitulatif →</Btn>
    </div>
  </div>);
}

function StepRecap({catalogue,bareme,entete,modeleId,config,onBack,onAddProduct,products}){
  const m=catalogue[modeleId];
  const bL=(mod,c)=>{ const p=calcPrix(mod,c,bareme); return {MODELE:mod?.label,QUANTITE:c.quantite||1,STRUCTURE:c.structure||"",EXTERIEUR:c.exterieur||"",INTERIEUR:c.interieur||"",FOND:(c.fonds||[]).join(" | "),TISSU:c.tissuInterieur||"",ACCESSOIRES:mod?mod.accessoires.filter(a=>(c.accessoires||{})[a.key]).map(a=>a.label).join(", "):"",PRIX_UNITAIRE_HT:p.unitaire,ECO:p.eco,TOTAL_HT:p.total,_p:p}; };
  const cur=bL(m,config), all=[...products,cur];
  const grand=all.reduce((s,l)=>s+(l._p?.total||0),0);
  return (<div style={{overflowY:"auto",maxHeight:"calc(100vh - 200px)",paddingRight:4}}>
    <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Récapitulatif</h2>
    <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px 14px"}}>
        {[["Chantier",entete.chantier],["Client",entete.clientFinal],["Commercial",entete.commercial],["Agent",entete.agentCo],["Réf.",entete.cdeClient||"—"],["Livraison",entete.dateLivraison||"—"]].map(([k,v])=>(
          <div key={k}><div style={{fontSize:9,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>{k}</div><div style={{fontSize:12,fontWeight:600}}>{v}</div></div>
        ))}
      </div>
    </div>
    {all.map((l,i)=>{ const isCur=i===all.length-1; return (
      <div key={i} style={{border:`1.5px solid ${isCur?C.blue:C.border}`,borderRadius:10,padding:12,marginBottom:8,background:isCur?C.blueBg:C.card}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <Tag color={C.blue}>#{i+1}</Tag><span style={{fontWeight:700,fontSize:13}}>{l.MODELE}</span><span style={{fontSize:12,color:C.muted}}>× {l.QUANTITE}</span>
          {isCur&&<Tag color={C.green}>En cours</Tag>}
          <div style={{marginLeft:"auto",fontWeight:800,fontSize:14,color:C.green}}>{l._p?.total?.toLocaleString("fr-FR")} €</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"4px 10px",fontSize:11}}>
          {[["Structure",l.STRUCTURE],["Extérieur",l.EXTERIEUR],["Intérieur",l.INTERIEUR],["Tissu",l.TISSU],["Fond",l.FOND],["Accessoires",l.ACCESSOIRES]].filter(([,v])=>v).map(([k,v])=>(
            <div key={k}><div style={{fontSize:9,color:"#bbb",fontWeight:700,textTransform:"uppercase"}}>{k}</div><div style={{color:"#333"}}>{v}</div></div>
          ))}
        </div>
      </div>
    );})}
    <div style={{background:"#f0fdf4",border:"1.5px solid #bbf7d0",borderRadius:10,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:13,fontWeight:700}}>Total commande HT</span>
      <span style={{fontSize:20,fontWeight:800,color:C.green}}>{grand.toLocaleString("fr-FR")} €</span>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:14,gap:8,flexWrap:"wrap"}}>
      <Btn onClick={onBack} variant="secondary">← Modifier</Btn>
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={onAddProduct} variant="secondary">+ Produit</Btn>
        <Btn onClick={()=>alert("✅ Commande validée !")}>✓ Valider</Btn>
      </div>
    </div>
  </div>);
}

function AdminView({catalogue,setCatalogue,bareme,setBareme}){
  const [tab,setTab]=useState("modeles");
  const [selId,setSelId]=useState(Object.keys(catalogue)[0]);
  const m=catalogue[selId];
  const upd=(f,v)=>setCatalogue(c=>({...c,[selId]:{...c[selId],[f]:v}}));
  const updOpt=(cat,i,f,v)=>{ const o=[...(m.options[cat]||[])]; o[i]={...o[i],[f]:f==="surcout"?parseFloat(v)||0:v}; upd("options",{...m.options,[cat]:o}); };
  const addOpt=cat=>upd("options",{...m.options,[cat]:[...(m.options[cat]||[]),{label:"Nouvelle option",surcout:0}]});
  const delOpt=(cat,i)=>{ const o=[...(m.options[cat]||[])]; o.splice(i,1); upd("options",{...m.options,[cat]:o}); };
  const ts=a=>({padding:"7px 14px",border:"none",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,background:a?"#1a1a1a":"#f0f0f0",color:a?"#fff":"#555"});
  return (<div>
    <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>Administration</h2>
    <div style={{display:"flex",gap:8,marginBottom:18}}>
      <button style={ts(tab==="modeles")} onClick={()=>setTab("modeles")}>Modèles & options</button>
      <button style={ts(tab==="bareme")} onClick={()=>setTab("bareme")}>Barème éco</button>
    </div>
    {tab==="modeles"&&(<div style={{display:"grid",gridTemplateColumns:"170px 1fr",gap:16}}>
      <div>{Object.values(catalogue).map(mod=>(<button key={mod.id} onClick={()=>setSelId(mod.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:8,border:`1.5px solid ${selId===mod.id?C.blue:C.border}`,background:selId===mod.id?C.blueBg:"#fafafa",marginBottom:5,cursor:"pointer",fontSize:12,fontWeight:selId===mod.id?700:400,color:selId===mod.id?"#1d4ed8":C.text}}>{mod.icon} {mod.label}</button>))}</div>
      <div style={{overflowY:"auto",maxHeight:"65vh"}}>
        <div style={{background:"#f8f8f8",borderRadius:10,padding:14,marginBottom:14}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
            {[["Label","label","text"],["Parois","paroisFond","number"],["Poids kg","poidsBrut","number"],["Prix base €","prixBase","number"]].map(([l,f,t])=>(
              <Field key={f} label={l}><input type={t} value={m[f]} onChange={e=>upd(f,t==="number"?parseFloat(e.target.value)||0:e.target.value)} style={inp}/></Field>
            ))}
          </div>
        </div>
        {Object.entries(OPTION_LABELS).map(([cat,lbl])=>(
          <div key={cat} style={{marginBottom:12,border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
            <div style={{background:"#f8f8f8",padding:"8px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#555"}}>{lbl}</span>
              <Btn size="sm" onClick={()=>addOpt(cat)} variant="secondary">+ Option</Btn>
            </div>
            <div style={{padding:10}}>
              {!(m.options[cat]||[]).length&&<p style={{fontSize:11,color:"#bbb",margin:0}}>Aucune option</p>}
              {(m.options[cat]||[]).map((o,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <input value={o.label} onChange={e=>updOpt(cat,i,"label",e.target.value)} style={{...inp,flex:3}} placeholder="Libellé"/>
                <input type="number" value={o.surcout} onChange={e=>updOpt(cat,i,"surcout",e.target.value)} style={{...inp,flex:1}} placeholder="€"/>
                <Btn size="sm" variant="danger" onClick={()=>delOpt(cat,i)}>✕</Btn>
              </div>))}
            </div>
          </div>
        ))}
      </div>
    </div>)}
    {tab==="bareme"&&(<div style={{maxWidth:460}}>
      <div style={{border:`1.5px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:"#f8f8f8",padding:"9px 14px",gap:10}}>
          {["Poids min","Poids max","Montant €"].map(h=><span key={h} style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase"}}>{h}</span>)}
        </div>
        {bareme.map((t,i)=>(<div key={t.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",padding:"8px 14px",gap:10,borderTop:`1px solid ${C.border}`}}>
          <input type="number" value={t.poidsMin} onChange={e=>{ const b=[...bareme]; b[i]={...b[i],poidsMin:parseFloat(e.target.value)||0}; setBareme(b); }} style={inp}/>
          <input type="number" value={t.poidsMax} onChange={e=>{ const b=[...bareme]; b[i]={...b[i],poidsMax:parseFloat(e.target.value)||0}; setBareme(b); }} style={inp}/>
          <input type="number" step="0.01" value={t.montant} onChange={e=>{ const b=[...bareme]; b[i]={...b[i],montant:parseFloat(e.target.value)||0}; setBareme(b); }} style={inp}/>
        </div>))}
      </div>
      <div style={{marginTop:10}}><Btn size="sm" variant="secondary" onClick={()=>setBareme(b=>[...b,{id:Date.now()+"",poidsMin:0,poidsMax:0,montant:0}])}>+ Tranche</Btn></div>
    </div>)}
  </div>);
}

// ─── APP ─────────────────────────────────────────────────────────────────────
const STEPS=["En-tête","Modèle","Configuration","Récapitulatif"];

export default function App(){
  const [mode,setMode]=useState("config");
  const [step,setStep]=useState(0);
  const [catalogue,setCatalogue]=useState(CATALOGUE);
  const [bareme,setBareme]=useState(BAREME_ECO);
  const [entete,setEntete]=useState({chantier:"",clientFinal:"",commercial:"",agentCo:"",cdeClient:"",contactClient:"",remiseAgco:"",dateLivraison:"",commentaire:""});
  const [modeleId,setModeleId]=useState("");
  const [config,setConfig]=useState({quantite:1,accessoires:{},fonds:[]});
  const [products,setProducts]=useState([]);

  const setE=useCallback((k,v)=>setEntete(e=>({...e,[k]:v})),[]);
  const setC=useCallback((k,v)=>setConfig(c=>({...c,[k]:v})),[]);
  const handleSelect=id=>{ const m=catalogue[id]; setModeleId(id); setConfig(c=>({...c,fonds:Array(m.paroisFond).fill("")})); };
  const handleAdd=()=>{
    const m=catalogue[modeleId]; const p=calcPrix(m,config,bareme);
    setProducts(pr=>[...pr,{MODELE:m?.label,QUANTITE:config.quantite||1,STRUCTURE:config.structure||"",EXTERIEUR:config.exterieur||"",INTERIEUR:config.interieur||"",FOND:(config.fonds||[]).join(" | "),TISSU:config.tissuInterieur||"",ACCESSOIRES:m?m.accessoires.filter(a=>(config.accessoires||{})[a.key]).map(a=>a.label).join(", "):"",PRIX_UNITAIRE_HT:p.unitaire,ECO:p.eco,TOTAL_HT:p.total,_p:p}]);
    setModeleId(""); setConfig({quantite:1,accessoires:{},fonds:[]}); setStep(1);
  };
  const show3D=mode==="config"&&(step===2||step===3)&&!!modeleId;

  return (
    <div style={{minHeight:"100vh",background:"#f4f4f2",padding:"18px 14px"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:14}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:2}}>Configurateur commande</div>
            <h1 style={{fontSize:21,fontWeight:800,color:C.text,margin:0}}>Blabla-cube × Structa</h1>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {products.length>0&&<Tag color={C.green}>{products.length} produit{products.length>1?"s":""}</Tag>}
            <button onClick={()=>setMode(m=>m==="config"?"admin":"config")} style={{padding:"7px 14px",borderRadius:9,border:`1.5px solid ${C.border}`,background:mode==="admin"?"#1a1a1a":"#fff",color:mode==="admin"?"#fff":C.text,fontSize:12,fontWeight:600,cursor:"pointer"}}>
              {mode==="admin"?"← Configurateur":"⚙ Admin"}
            </button>
          </div>
        </div>
        {mode==="config"&&(<div style={{display:"flex",alignItems:"center",background:C.card,borderRadius:10,padding:"10px 18px",marginBottom:14,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
          {STEPS.map((s,i)=>(<div key={s} style={{display:"flex",alignItems:"center"}}>
            <StepDot n={i+1} label={s} active={step===i} done={step>i}/>
            {i<STEPS.length-1&&<div style={{width:22,height:1,background:step>i?C.text:C.border,margin:"0 8px"}}/>}
          </div>))}
        </div>)}
        <div style={{display:"grid",gridTemplateColumns:show3D?"1fr 440px":"1fr",gap:14,alignItems:"start"}}>
          <div style={{background:C.card,borderRadius:14,padding:26,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}}>
            {mode==="admin"
              ?<AdminView catalogue={catalogue} setCatalogue={setCatalogue} bareme={bareme} setBareme={setBareme}/>
              :<>
                {step===0&&<StepEntete data={entete} onChange={setE} onNext={()=>setStep(1)}/>}
                {step===1&&<StepModele catalogue={catalogue} selected={modeleId} onSelect={handleSelect} onNext={()=>setStep(2)} onBack={()=>setStep(0)}/>}
                {step===2&&modeleId&&<StepConfig catalogue={catalogue} bareme={bareme} modeleId={modeleId} config={config} onChange={setC} onNext={()=>setStep(3)} onBack={()=>setStep(1)}/>}
                {step===3&&<StepRecap catalogue={catalogue} bareme={bareme} entete={entete} modeleId={modeleId} config={config} onBack={()=>setStep(2)} onAddProduct={handleAdd} products={products}/>}
              </>
            }
          </div>
          {show3D&&(<div style={{position:"sticky",top:16,height:500,background:C.card,borderRadius:14,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",overflow:"hidden"}}>
            <Viewer3D modele={catalogue[modeleId]} config={config}/>
          </div>)}
        </div>
      </div>
    </div>
  );
}