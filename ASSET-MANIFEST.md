# ASSET MANIFEST — RASHMI: THE DEVELOPER SPACE

> Generated during Phase 1 Asset Inspection before application development.
> Every supplied asset was inspected directly for pixel dimensions, aspect ratio, color channels/alpha transparency, composition, and 3D node hierarchy.

---

## 1. Workspace Background Illustrations (`public/assets/illustrations/`)

| Asset Name | Workspace Path | Original File | Dimensions | Aspect Ratio | Format / Alpha | Scene Mapping | Composition & Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `workspace-hero` | `public/assets/illustrations/workspace-hero.jpg` | `media_1795528054685_1aaefc1c.jpg` | `1024 × 576` | `1.778` (`16:9`) | JPG (opaque, no alpha) | Reference / legacy hero | Flattened full-room scene with 2D laptop baked on desk. Superseded in Hero by `workspace-hero-empty-desk.jpg` + live 3D GLB laptop. |
| `workspace-hero-empty-desk` | `public/assets/illustrations/workspace-hero-empty-desk.jpg` | `media_1795531783911_ca4db4e8.jpg` | `1024 × 576` | `1.778` (`16:9`) | JPG (opaque, no alpha) | **Active Hero & Zoom Stage (Scenes 02–04)** | Same cozy illustrated workspace with an **empty black desk mat** (mouse only, no 2D laptop), designed specifically for placing the live 3D `laptop-15-6-inch-open.glb` directly on the desk. |
| `workspace-desk` | `public/assets/illustrations/workspace-desk.jpg` | `media_1795528067049_3ef1b3c3.jpg` | `1024 × 576` | `1.778` (`16:9`) | JPG (opaque, no alpha) | Scene 07 (Laptop Entrance transition / desk backdrop) | Closer framing of the same desk, chair, laptop, and window. Consistent lighting, dusty mauve wall, and props. Flattened single layer. |
| `workspace-bookshelf` | `public/assets/illustrations/workspace-bookshelf.jpg` | `media_1795528075700_a66f9833.jpg` | `1024 × 576` | `1.778` (`16:9`) | JPG (opaque, no alpha) | Scene 06 (Interactive Bookshelf) | Front-on close-up of the wooden bookshelf with warm LED under-shelf strips, moon lamp, robot figurine, cat lamp, desk lamp, and 5 baked-in books (*The Developer*, *The Arsenal*, *The Experiments*, *The Engineering Lab*, *The Journey*). **Visual inconsistency note:** Baked-in spine colors (burgundy, forest green, cream, navy, gold) differ slightly from the prompt's book color list (forest green, navy, burgundy, charcoal, muted gold); interactive `@uselayouts/bookshelf` stage should cleanly frame or overlay the centerpiece shelf. |
| `workspace-outro` | `public/assets/illustrations/workspace-outro.jpg` | `media_1795528089997_b87c4b74.jpg` | `1024 × 576` | `1.778` (`16:9`) | JPG (opaque, no alpha) | Scene 13 (Contact & Farewell) | Wide room view extending to L-desk corner. Laptop displays `"Let's Connect ♡"`. **Visual inconsistency note:** Right wall has baked-in placeholder text (`rashmi.pathak@example.com`, `linkedin.com/in/rashmipathak`, `github.com/RashmiPathak` without hyphen, `Download Resume`). Scene 13 must cover/replace this wall area with an editorial card/overlay carrying real, verified links (`https://github.com/Rashmi-Pathak`, etc.). |

---

## 2. Character Illustrations (`public/assets/character/`)

| Asset Name | Workspace Path | Original File | Dimensions | Aspect Ratio | Format / Alpha | Scene Mapping | Compositing & Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `character-hero-standing-cutout` | `public/assets/character/character-hero-standing-cutout.png` | `media_1795532478689_ec51216f.png` | `682 × 1024` | `0.666` (`2:3`) | PNG (`colorType=6`, **true RGBA alpha transparency**) | **Active Hero Side Character (Scene 03)** | New full-body standing cutout holding an open black HP ENVY laptop, wearing a dark oversized tee, butterfly pendant, smartwatch, relaxed denim jeans, and cream sneakers. Preserves full head, hair, laptop, and sneakers without cropping. |
| `character-hero-cutout` | `public/assets/character/character-hero-cutout.png` | `media_1795528103615_f1f0a260.png` | `1024 × 682` | `1.501` (`3:2`) | PNG (`colorType=6`, **true RGBA alpha transparency**) | Archived hero cutout | Seated cutout in charcoal chair; replaced in Hero by `character-hero-standing-cutout.png` per user direction. |
| `character-hero-scene` | `public/assets/character/character-hero-scene.jpg` | `media_1795528110118_364bfc4e.jpg` | `1024 × 682` | `1.501` (`3:2`) | JPG (opaque, no alpha) | Fallback / wide scene reference | Complete pre-composited scene showing Rashmi sitting in her workspace at the desk. Useful as a parallax/reference layer or fallback for reduced-motion / compact viewports. |
| `character-idle` | `public/assets/character/character-idle.jpg` | `media_1795528119136_32341000.jpg` | `1024 × 935` | `1.095` | JPG (opaque, solid `#000000` black background, **NO alpha**) | Idle / subtle workspace vignette | Seated at walnut desk looking at sticker-decorated laptop, includes chair, green blanket, leaf cushion, leaf mug, and trailing plant. **Compositing rule:** Solid black background means it must NOT be placed directly over light/mauve scenes as an unmasked rectangle; frame inside dark-graphite scenes (`#171A1C`) with radial edge-feathering or vignette mask. |
| `character-typing` | `public/assets/character/character-typing.jpg` | `media_1795528128796_98a30f60.jpg` | `1024 × 935` | `1.095` | JPG (opaque, solid `#000000` black background, **NO alpha**) | Scene 08/09 (Coding / Frontend & Backend transition) | Seated typing with both hands on laptop keyboard. Same desk/chair/plant setup as `character-idle`. Must use dark-graphite framing + radial mask (no harsh black box over illustrated wall). |
| `character-waving` | `public/assets/character/character-waving.jpg` | `media_1795528137737_025d5c6d.jpg` | `1024 × 935` | `1.095` | JPG (opaque, solid `#000000` black background, **NO alpha**) | Scene 13 (Contact & Farewell) | Seated at desk smiling and waving with motion accents. Same desk/chair/plant props on solid black background. Frame inside a dark-graphite vignette card or softly masked dark panel in Scene 13 so it never creates a black rectangle over `workspace-outro.jpg`. |
| `character-thinking` | `public/assets/character/character-thinking.jpg` | `media_1795528144741_696b90ec.jpg` | `1024 × 935` | `1.095` | JPG (opaque, solid `#000000` black background, **NO alpha**) | Scene 10 (AI/ML Laboratory) | Seated at desk looking up at chalk-drawn lightbulb thought cloud, pen near chin. Integrates natively with the dark graphite AI/ML Laboratory backdrop using radial vignette feathering. |
| `character-standing` | `public/assets/character/character-standing.jpg` | `media_1795528153233_ffd1152e.jpg` | `682 × 1024` | `0.666` (`2:3` portrait) | JPG (opaque, full workspace background) | Scene 05 (About Me — full-body editorial panel) | Full-body standing pose with arms crossed inside the workspace (same chair, sticker laptop, leaf mug, corkboard, neon cloud, bookshelf, window). Use as a complete framed editorial scene layer. |
| `character-closeup` | `public/assets/character/character-closeup.jpg` | `media_1795528164302_c2fc3169.jpg` | `1024 × 935` | `1.095` | JPG (opaque, full workspace background) | Scene 05 (About Me — portrait / biography emphasis) | Warm close-up portrait leaning near laptop with soft-focus globe, bookshelf, corkboard, and glowing cloud behind. Use as a complete framed portrait scene. |

### Cross-Asset Visual Inconsistencies Observed
1. **Pillow & mug styling**: `workspace-hero`, `workspace-desk`, `workspace-outro`, and `character-hero-cutout` show a plain cream pillow and dark blue `</>` mug with a silver/open code laptop. `character-idle/typing/waving/thinking/standing` show a botanical leaf-print cream pillow, white leaf-print mug, and dark matte laptop lid with glowing flower/mountain/moon stickers. Both look cohesive in color palette (cream/forest-green/walnut), and because we composite them in separate scenes (Hero vs Technical/About/Outro vignettes), we never overlap conflicting desks.
2. **Duplicate chair prevention**: `character-hero-cutout.png` includes the charcoal chair + green blanket + cream pillow. In Hero (`HeroScene.tsx`), the editorial left-column dark scrim covers the empty chair on the far left of `workspace-hero.jpg` while `character-hero-cutout.png` sits cleanly in the right column.
3. **Black backgrounds on pose JPGs**: `character-idle`, `character-typing`, `character-waving`, and `character-thinking` have opaque `#000000` backgrounds instead of PNG alpha. They are earmarked exclusively for dark `#171A1C`/`#25292B` scene sections (with smooth radial vignette edges) rather than overlaid on dusty mauve walls.

---

## 3. 3D Model (`public/models/`)

| Asset Name | Workspace Path | Original File | File Size | Format | Animations |
| --- | --- | --- | --- | --- | --- |
| `laptop-v1-lod0` (**Active**) | `public/models/laptop-v1-lod0.glb` | `media_1795533600542_79c9d9f4.glb` | `2,878,480 bytes` (~2.75 MB) | glTF 2.0 binary (`.glb`) | `0` embedded clips (5 nodes: `laptop`, `base`, `lid` built-in hinge pivot, `lid_shell`, `screen`; 2 materials: `laptop`, `screen`) |
| `laptop-15-6-inch-open` (Archived) | `public/models/laptop-15-6-inch-open.glb` | `media_1795528241602_4139d360.glb` | `2,207,976 bytes` (~2.11 MB) | glTF 2.0 binary (`.glb`) | `0` embedded clips |

### Node & Mesh Hierarchy (Inspected via glTF JSON Chunk)
- **Node `[10]` (Root)**: `"Laptop 15.6 inch, open"` — `translation: [0, 0.0004000000189989805, 0]`, `children: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`
- All 10 mesh nodes are **flat siblings** under Node `[10]`:

| Node Index | Node & Mesh Name | Material Index | Material Name | Vertex Attributes | Role in Programmatic Rig (Milestone 3) |
| --- | --- | --- | --- | --- | --- |
| `0` | `Base` | `0` | `Housing, matte black plastic` | `POSITION`, `NORMAL`, `TEXCOORD_0` | Lower body group (static relative to chassis) |
| `1` | `Display bezel` | `1` | `Display bezel, black` | `POSITION`, `NORMAL`, `TEXCOORD_0` | **Lid pivot child** (rotates with lid) |
| `2` | `Hinge` | `2` | `Hinge barrel, dark metal` | `POSITION`, `NORMAL`, `TEXCOORD_0` | Reference geometry to locate hinge axis center |
| `3` | `Keyboard keys` | `3` | `Keys, black plastic (no legends)` | `POSITION`, `NORMAL`, `TEXCOORD_0` | Lower body group |
| `4` | `Lid` | `0` | `Housing, matte black plastic` | `POSITION`, `NORMAL`, `TEXCOORD_0` | **Lid pivot child** (rotates with lid) |
| `5` | `Power light` | `4` | `Power light window` | `POSITION`, `NORMAL`, `TEXCOORD_0` | Lower body group (emissive accent pulse) |
| `6` | `Rubber feet` | `5` | `Rubber feet` | `POSITION`, `NORMAL`, `TEXCOORD_0` | Lower body group |
| `7` | `Screen` | `6` | `Screen, dark glossy glass` | `POSITION`, `NORMAL`, `TEXCOORD_0` | **Lid pivot child** + bounding-box anchor for HTML/Canvas screen overlay |
| `8` | `Trackpad` | `7` | `Trackpad, glass-smooth` | `POSITION`, `NORMAL`, `TEXCOORD_0` | Lower body group |
| `9` | `Webcam` | `8` | `Webcam lens` | `POSITION`, `NORMAL`, `TEXCOORD_0` | **Lid pivot child** (rotates with lid) |

### Required Programmatic Hinge Rigging (Milestone 3)
Because `Lid`, `Display bezel`, `Screen`, and `Webcam` are siblings of `Base` and `Hinge` with no built-in pivot parent or animation clips:
1. Compute the world/local bounding box of `Hinge` (node `2`) in Three.js after scene load.
2. Create a `lidPivot = new THREE.Group()` placed at the hinge barrel centerline (`[0, hingeCenterY, hingeCenterZ]`).
3. Reparent `Lid`, `Display bezel`, `Screen`, and `Webcam` into `lidPivot` using `attach()` so their world positions remain identical.
4. Animate `lidPivot.rotation.x` smoothly rather than rotating `Lid` around the origin or its geometric center.
5. Align the React/HTML screen UI directly to `Screen` mesh's bounding plane, normal, width, and height.

---

## 4. Missing Assets & Portfolio Content Checklist

To keep every link, metric, and artifact 100% factual (zero fabricated personal data):

1. **Contact & Social Links (Marked as editable placeholders in `src/data/profile.ts`)**:
   - LinkedIn profile URL (placeholder until supplied).
   - Direct email address (placeholder until supplied).
   - Resume PDF file (e.g., `public/resume/Rashmi-Pathak-Resume.pdf` — placeholder until supplied).
   - Verified GitHub URL already set: `https://github.com/Rashmi-Pathak`.
2. **Audio Assets (`public/audio/`)**:
   - No audio files were supplied. Ambient soundtrack / gentle UI audio toggle (Milestone 7) will either use lightweight synthesized Web Audio API soundscapes or user-supplied MP3/OGG files when provided.
3. **Project Case-Study Assets & Details (Milestone 6)**:
   - Repository details, problem statements, real tech stacks, screenshots, and live demo URLs (if any) for **TradeCore**, **FraudShield AI**, **TripEase**, **Bluestock MF**, and **CyberPredict** are not yet in the workspace (`public/assets/projects/` is currently empty). Placeholder cards clearly labeled for editing will be prepared until details/repositories are supplied.
4. **Education & Achievements Details (Milestone 6)**:
   - College/university name, verified coursework highlights, certifications, and awards are not yet supplied (only `B.Tech Information Technology`, `2024–2028` is verified).
