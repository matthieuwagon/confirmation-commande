import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FINITIONS } from "../data/catalogue.js";
import { C } from "./ui/atoms.jsx";

export default function Viewer3D({ modele, config }) {
  const mountRef     = useRef(null);
  const camRef       = useRef(null);
  const materialsRef = useRef({});
  const sceneRef     = useRef(null);
  const configRef    = useRef(config);
  const drag         = useRef({ active:false, x:0, y:0 });
  const rot          = useRef({ x:0.28, y:0.55 });
  const zoom         = useRef(5.5);

  useEffect(() => { configRef.current = config; }, [config]);

  const updateCam = () => {
    const r = rot.current, z = zoom.current, cam = camRef.current;
    if (!cam) return;
    cam.position.set(
      Math.sin(r.y) * Math.cos(r.x) * z,
      Math.sin(r.x) * z + 1.0,
      Math.cos(r.y) * Math.cos(r.x) * z
    );
    cam.lookAt(0, 0.9, 0);
  };

  const applyConfig = (cfg) => {
    const mats = materialsRef.current;
    if (!mats[2]) return;

    const fs = FINITIONS.structure.find(f => f.label === cfg.structure) || FINITIONS.structure[0];
    if (mats[1]) { mats[1].color.set(fs.color); mats[1].roughness = fs.roughness; mats[1].needsUpdate = true; }

    const fe = FINITIONS.exterieur.find(f => f.label === cfg.exterieur) || FINITIONS.exterieur[0];
    mats[2].map = null; mats[2].color.set(fe.color); mats[2].roughness = fe.roughness; mats[2].needsUpdate = true;

    const fi = FINITIONS.interieur.find(f => f.label === cfg.interieur) || FINITIONS.interieur[0];
    mats[5].map = null; mats[5].color.set(fi.color); mats[5].roughness = fi.roughness; mats[5].needsUpdate = true;
  };

  // Setup scène + chargement GLB (une seule fois)
  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const W = el.clientWidth || 440, H = el.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(W, H); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeece8);
    sceneRef.current = scene;

    const cam = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camRef.current = cam; updateCam();

    scene.add(new THREE.AmbientLight(0xfff8f2, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(4, 9, 6); key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0005;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd8e8ff, 0.4); fill.position.set(-5, 3, -3); scene.add(fill);
    const rim  = new THREE.DirectionalLight(0xffffff,  0.2); rim.position.set(0, 4, -8);  scene.add(rim);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({ color:0xe2ddd7, roughness:0.92, metalness:0.02 })
    );
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

    let animId;
    const loop = () => { animId = requestAnimationFrame(loop); renderer.render(scene, cam); };
    loop();

    const loader = new GLTFLoader();
    loader.load('/models/solo.glb', (gltf) => {
      const mats = {};
      gltf.scene.traverse(n => {
        if (!n.isMesh) return;
        n.castShadow = true; n.receiveShadow = true;
        const assoc = gltf.parser.associations.get(n.material);
        const idx = assoc?.materials;
        if (idx !== undefined && [1, 2, 5].includes(idx) && !mats[idx]) mats[idx] = n.material;
      });
      if (mats[2]) { mats[2].map = null; mats[2].needsUpdate = true; }
      if (mats[5]) { mats[5].map = null; mats[5].needsUpdate = true; }
      materialsRef.current = mats;
      scene.add(gltf.scene);
      applyConfig(configRef.current);
    });

    return () => { cancelAnimationFrame(animId); renderer.dispose(); if (el) el.innerHTML = ""; };
  }, []);

  // Réactivité : mise à jour des matériaux à chaque changement de finition
  useEffect(() => {
    applyConfig(config);
  }, [config.structure, config.exterieur, config.interieur]);

  // Contrôles souris / molette
  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const onDown  = e => { drag.current = { active:true, x:e.clientX, y:e.clientY }; e.preventDefault(); };
    const onUp    = () => { drag.current.active = false; };
    const onMove  = e => {
      if (!drag.current.active) return;
      rot.current.y += (e.clientX - drag.current.x) * 0.007;
      rot.current.x += (e.clientY - drag.current.y) * 0.004;
      rot.current.x = Math.max(-0.05, Math.min(1.1, rot.current.x));
      drag.current = { active:true, x:e.clientX, y:e.clientY };
      updateCam();
    };
    const onWheel = e => { zoom.current = Math.max(2.5, Math.min(11, zoom.current + e.deltaY * 0.005)); updateCam(); e.preventDefault(); };
    el.addEventListener("mousedown", onDown, { passive:false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    el.addEventListener("wheel", onWheel, { passive:false });
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div style={{position:"relative",width:"100%",height:"100%",borderRadius:14,overflow:"hidden"}}>
      <div ref={mountRef} style={{width:"100%",height:"100%"}}/>
      {modele && (
        <div style={{position:"absolute",top:10,left:10,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(8px)",borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:700,color:C.text}}>
          {modele.icon} {modele.label}
        </div>
      )}
      <div style={{position:"absolute",bottom:10,left:0,right:0,textAlign:"center",fontSize:10,color:"#bbb",pointerEvents:"none"}}>
        🖱 Glisser · Molette zoom
      </div>
    </div>
  );
}
