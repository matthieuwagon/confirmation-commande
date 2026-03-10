import { readFileSync } from 'fs';

const buf = readFileSync('public/models/solo.glb');
const jsonLength = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.slice(20, 20 + jsonLength).toString('utf8'));

// Convert linear [r,g,b] to hex
const toHex = ([r, g, b]) => {
  const ch = (v) => Math.round(Math.min(v, 1) * 255).toString(16).padStart(2, '0');
  return `#${ch(r)}${ch(g)}${ch(b)}`;
};

console.log('\n=== MATERIALS (22) ===');
(gltf.materials || []).forEach((mat, i) => {
  const pbr = mat.pbrMetallicRoughness ?? {};
  const color = pbr.baseColorFactor ? toHex(pbr.baseColorFactor) : '(no color)';
  const alpha = pbr.baseColorFactor?.[3] !== undefined ? pbr.baseColorFactor[3].toFixed(2) : '1.00';
  const metal = pbr.metallicFactor?.toFixed(2) ?? '?';
  const rough = pbr.roughnessFactor?.toFixed(2) ?? '?';
  const tex = pbr.baseColorTexture ? ` texture[${pbr.baseColorTexture.index}]` : '';
  const mode = mat.alphaMode ? ` alphaMode:${mat.alphaMode}` : '';
  console.log(`  [${i}] color:${color} α:${alpha} metallic:${metal} rough:${rough}${tex}${mode}`);
});

// Group meshes by material index to help identify parts
console.log('\n=== MATERIAL USAGE (mesh indices per material) ===');
const matMeshes = {};
(gltf.meshes || []).forEach((mesh, mi) => {
  (mesh.primitives || []).forEach((prim) => {
    const matIdx = prim.material ?? 'none';
    if (!matMeshes[matIdx]) matMeshes[matIdx] = [];
    matMeshes[matIdx].push(mi);
  });
});
Object.entries(matMeshes).forEach(([matIdx, meshList]) => {
  const mat = gltf.materials?.[matIdx];
  const pbr = mat?.pbrMetallicRoughness ?? {};
  const color = pbr.baseColorFactor ? toHex(pbr.baseColorFactor) : '(no color)';
  const tex = pbr.baseColorTexture ? ` texture[${pbr.baseColorTexture.index}]` : '';
  console.log(`  material[${matIdx}] ${color}${tex} → meshes: [${meshList.join(', ')}]`);
});

console.log('\n=== TEXTURES ===');
(gltf.textures || []).forEach((tex, i) => {
  const img = gltf.images?.[tex.source];
  console.log(`  [${i}] source image[${tex.source}] mimeType:${img?.mimeType ?? '?'} bufferView:${img?.bufferView ?? '?'}`);
});

console.log(`\nSUMMARY: ${(gltf.meshes||[]).length} meshes, ${(gltf.materials||[]).length} materials, ${(gltf.textures||[]).length} textures\n`);
