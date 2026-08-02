// ============================================================
// LEARN TF // UNIT 8: CONGRUENCE & SIMILARITY
// Inline SVG diagrams for triangles with tick marks and angles
// ============================================================

const G_CY = '#64ffda';
const G_BG = '#0d1526';

// --- SVG helpers for geometry diagrams ----------------------
function gWrap(inner, w, h) {
  w = w || 400; h = h || 220;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:420px;display:block;margin:14px auto;background:${G_BG};border:1px solid rgba(100,255,218,0.25);border-radius:10px;box-shadow:0 0 24px rgba(100,255,218,0.08);">${inner}</svg>`;
}

// Line between two points
function gL(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${G_CY}" stroke-width="2"/>`;
}
// Text label
function gT(x, y, text, size) {
  size = size || 14;
  return `<text x="${x}" y="${y}" text-anchor="middle" fill="${G_CY}" font-size="${size}" font-family="monospace">${text}</text>`;
}
// Tick mark on a line segment (midpoint, perpendicular, count = number of ticks)
function gTick(x1, y1, x2, y2, count) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len, ny = dx / len; // perpendicular unit vector
  const tickLen = 8;
  let s = '';
  for (let i = 0; i < count; i++) {
    const offset = (i - (count - 1) / 2) * 6;
    const cx = mx + (dx / len) * offset, cy = my + (dy / len) * offset;
    s += `<line x1="${cx - nx * tickLen}" y1="${cy - ny * tickLen}" x2="${cx + nx * tickLen}" y2="${cy + ny * tickLen}" stroke="${G_CY}" stroke-width="2"/>`;
  }
  return s;
}

// Angle arc at vertex (vx,vy) between rays to (ax,ay) and (bx,by)
function gArc(vx, vy, ax, ay, bx, by, radius, label) {
  radius = radius || 20;
  const a1 = Math.atan2(ay - vy, ax - vx);
  const a2 = Math.atan2(by - vy, bx - vx);
  // Always draw the smaller arc
  let start = a1, end = a2;
  let diff = end - start;
  if (diff < -Math.PI) end += 2 * Math.PI;
  else if (diff > Math.PI) start += 2 * Math.PI;
  if (start > end) { const t = start; start = end; end = t; }
  const sx = vx + radius * Math.cos(start), sy = vy + radius * Math.sin(start);
  const ex = vx + radius * Math.cos(end), ey = vy + radius * Math.sin(end);
  const large = (end - start > Math.PI) ? 1 : 0;
  let s = `<path d="M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 1 ${ex} ${ey}" fill="none" stroke="${G_CY}" stroke-width="1.5"/>`;
  if (label) {
    const mid = (start + end) / 2;
    const lx = vx + (radius + 14) * Math.cos(mid), ly = vy + (radius + 14) * Math.sin(mid);
    s += gT(lx, ly + 4, label, 12);
  }
  return s;
}
// Right angle marker (small square)
function gRight(vx, vy, ax, ay, bx, by) {
  const size = 12;
  const d1x = (ax - vx), d1y = (ay - vy);
  const l1 = Math.sqrt(d1x * d1x + d1y * d1y);
  const d2x = (bx - vx), d2y = (by - vy);
  const l2 = Math.sqrt(d2x * d2x + d2y * d2y);
  const u1x = d1x / l1 * size, u1y = d1y / l1 * size;
  const u2x = d2x / l2 * size, u2y = d2y / l2 * size;
  return `<path d="M ${vx + u1x} ${vy + u1y} L ${vx + u1x + u2x} ${vy + u1y + u2y} L ${vx + u2x} ${vy + u2y}" fill="none" stroke="${G_CY}" stroke-width="1.5"/>`;
}

// Draw a triangle with vertices, labels, optional tick marks and angles
function gTriangle(pts, labels, ticks, angles, rightAt) {
  // pts = [[x,y],[x,y],[x,y]], labels = ['A','B','C']
  // ticks = [1,2,1] (tick count per side AB, BC, CA)
  // angles = [{v:0,label:'x°'},{v:1,label:''},...] where v is vertex index
  // rightAt = vertex index for right-angle marker
  let s = '';
  // sides
  for (let i = 0; i < 3; i++) {
    const j = (i + 1) % 3;
    s += gL(pts[i][0], pts[i][1], pts[j][0], pts[j][1]);
    if (ticks && ticks[i]) s += gTick(pts[i][0], pts[i][1], pts[j][0], pts[j][1], ticks[i]);
  }
  // angle arcs
  if (angles) {
    angles.forEach(a => {
      const v = a.v;
      const p1 = pts[(v + 1) % 3], p2 = pts[(v + 2) % 3];
      s += gArc(pts[v][0], pts[v][1], p1[0], p1[1], p2[0], p2[1], a.r || 22, a.label || '');
    });
  }
  // right angle
  if (rightAt !== undefined) {
    const v = rightAt;
    const p1 = pts[(v + 1) % 3], p2 = pts[(v + 2) % 3];
    s += gRight(pts[v][0], pts[v][1], p1[0], p1[1], p2[0], p2[1]);
  }
  // vertex labels
  if (labels) {
    for (let i = 0; i < 3; i++) {
      const opp1 = pts[(i + 1) % 3], opp2 = pts[(i + 2) % 3];
      const cx = (opp1[0] + opp2[0]) / 2, cy = (opp1[1] + opp2[1]) / 2;
      const dx = pts[i][0] - cx, dy = pts[i][1] - cy;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const lx = pts[i][0] + dx / d * 18, ly = pts[i][1] + dy / d * 18;
      s += gT(lx, ly + 4, labels[i], 16);
    }
  }
  return s;
}

// ============================================================
// QUIZ DATA
// ============================================================
const congruenceQuizzes = {

// ---------- 8.1 CONGRUENCE TESTS ----------
"Unit 8 Quiz 1: Congruence Tests": [
  { q: "Name the 4 congruence tests for triangles (separated by commas).",
    answer: "SSS, SAS, ASA/AAS, RHS",
    accepts: ["sss,sas,asa,rhs", "sss,sas,aas,rhs", "sss, sas, asa, rhs", "sss, sas, aas, rhs",
              "sss,sas,asa/aas,rhs", "sss, sas, asa/aas, rhs"],
    hint: "Think: what combinations of sides (S) and angles (A) can prove congruence?",
    explanation: "The 4 tests are SSS (3 sides), SAS (2 sides + included angle), ASA/AAS (2 angles + 1 side), and RHS (right angle + hypotenuse + side)." },
  { q: "Which congruence test proves these triangles are congruent?" +
    gWrap(
      gTriangle([[30,170],[150,30],[270,170]], ['P','Q','R'], [1,2,0], [{v:1,label:'70°'}]) +
      gTriangle([[180,170],[300,30],[380,170]], ['X','Y','Z'], [1,2,0], [{v:1,label:'70°'}]),
      420, 200),
    answer: "SAS",
    accepts: ["sas", "side angle side"],
    hint: "Two sides are marked equal (tick marks) and the included angle between them is given.",
    explanation: "PQ=XY (single tick), QR=YZ (double tick), and the included angle Q = angle Y = 70°. This is SAS." },

  { q: "Which congruence test proves these triangles are congruent?" +
    gWrap(
      gTriangle([[30,170],[130,30],[230,170]], ['A','B','C'], [1,1,1]) +
      gTriangle([[240,170],[340,30],[390,170]], ['D','E','F'], [1,1,1]),
      420, 200),
    answer: "SSS",
    accepts: ["sss", "side side side"],
    hint: "All three sides of each triangle are marked equal with tick marks.",
    explanation: "All 3 pairs of corresponding sides are equal (single ticks on each). This is SSS." },
  { q: "Which congruence test proves these triangles are congruent?" +
    gWrap(
      gTriangle([[30,170],[100,30],[200,170]], ['P','Q','R'], [0,0,0], [{v:0,label:'50°'},{v:1,label:'60°'}]) +
      gTriangle([[220,170],[310,30],[380,170]], ['X','Y','Z'], [0,0,0], [{v:0,label:'50°'},{v:1,label:'60°'}]) +
      gT(115, 195, 'QR = YZ = 5 cm', 12) + gT(300, 195, '', 12),
      420, 210),
    answer: "AAS",
    accepts: ["aas", "asa", "angle angle side", "angle side angle"],
    hint: "Two angles and a non-included side are equal.",
    explanation: "Angle P = Angle X = 50°, Angle Q = Angle Y = 60°, and QR = YZ (not included between the given angles). AAS." },
  { q: "Which congruence test proves these right-angled triangles are congruent?" +
    gWrap(
      gTriangle([[30,170],[30,40],[180,170]], ['A','B','C'], [0,2,0], [], 0) +
      gTriangle([[220,170],[220,40],[370,170]], ['X','Y','Z'], [0,2,0], [], 0),
      400, 200),
    answer: "RHS",
    accepts: ["rhs", "right angle hypotenuse side"],
    hint: "Both have a right angle, equal hypotenuses (double tick), and share a structure.",
    explanation: "Right angle at A and X, hypotenuse BC = YZ (double tick). This is RHS." },

  { q: "True or false: SSA (Side-Side-Angle) is a valid congruence test.",
    answer: "False",
    accepts: ["false", "no", "f"],
    hint: "SSA can produce two different triangles (the ambiguous case).",
    explanation: "SSA is NOT valid because the angle is not between the two sides, so two different triangles could satisfy the same conditions." },
  { q: "In the SAS test, what does 'included angle' mean?",
    answer: "The angle between the two given sides",
    accepts: ["the angle between the two sides", "angle between the two sides", "angle between the sides",
              "the angle formed by the two sides", "angle between two sides", "angle enclosed by two sides"],
    hint: "The angle must be 'sandwiched' by the two sides.",
    explanation: "The included angle is the angle formed between (enclosed by) the two sides you are using. SAS only works if the angle is between the two known sides." },
  { q: "If ΔABC ≡ ΔXYZ, and angle BAC = 55°, what is angle YXZ?",
    answer: "55°",
    accepts: ["55", "55°", "55 degrees"],
    hint: "Corresponding angles in congruent triangles are equal. A corresponds to X.",
    explanation: "Since A corresponds to X, angle BAC = angle YXZ = 55°." },
  { q: "If ΔPQR ≡ ΔDEF, which side corresponds to QR?",
    answer: "EF",
    accepts: ["ef", "de", "EF"],
    hint: "Match the letters in order: P→D, Q→E, R→F.",
    explanation: "Q corresponds to E and R corresponds to F, so QR corresponds to EF." },
  { q: "Two triangles have all 3 angles equal (AAA). Are they necessarily congruent?",
    answer: "No",
    accepts: ["no", "false", "not necessarily", "n"],
    hint: "Think about enlargement — same shape but different size.",
    explanation: "AAA only proves similarity, not congruence. The triangles could be the same shape but different sizes (similar but not congruent)." },
  { q: "In ΔABC, AB = AC and M is the midpoint of BC. Which test proves ΔABM ≡ ΔACM?",
    answer: "SSS",
    accepts: ["sss", "side side side"],
    hint: "List all three sides of each triangle: AB=AC (given), BM=CM (midpoint), and the third side?",
    explanation: "AB = AC (given), BM = CM (M is midpoint), AM = AM (common side). Three pairs of equal sides → SSS." }
],

// ---------- 8.2 SIMILARITY ----------
"Unit 8 Quiz 2: Similarity Tests & Scale Factor": [
  { q: "Two polygons are similar if corresponding angles are ______ and corresponding sides are ______.",
    answer: "equal, proportional",
    accepts: ["equal,proportional", "equal, proportional", "equal and proportional", "same, proportional"],
    hint: "Same shape, possibly different size.",
    explanation: "Similar figures have all corresponding angles equal AND all corresponding sides in the same ratio (proportional)." },
  { q: "Name the 3 similarity tests for triangles.",
    answer: "AA, SSS, SAS",
    accepts: ["aa,sss,sas", "aa, sss, sas", "aa sss sas"],
    hint: "One uses only angles, one uses only side ratios, one uses a mix.",
    explanation: "AA (2 pairs of equal angles), SSS (all 3 pairs of sides proportional), SAS (2 pairs of sides proportional with included angle equal)." },
  { q: "ΔABC is similar to ΔXYZ. AB = 6 cm, XY = 9 cm. Find the scale factor (enlargement).",
    answer: "1.5",
    accepts: ["1.5", "3/2", "9/6"],
    hint: "Scale factor = image ÷ object = XY ÷ AB.",
    explanation: "Scale factor = XY / AB = 9 / 6 = 1.5 (or 3/2)." },
  { q: "ΔPQR is similar to ΔXYZ. PQ = 4 cm, XY = 10 cm, QR = 6 cm. Find YZ.",
    answer: "15 cm",
    accepts: ["15", "15cm", "15 cm"],
    hint: "Scale factor = 10/4 = 2.5. Multiply QR by the scale factor.",
    explanation: "Scale factor = XY/PQ = 10/4 = 2.5. YZ = QR × 2.5 = 6 × 2.5 = 15 cm." },
  { q: "Two triangles have angles 40°, 60°, 80° and 40°, 80°, 60°. Are they similar?",
    answer: "Yes",
    accepts: ["yes", "y", "true"],
    hint: "Compare the sets of angles — order doesn't matter for similarity.",
    explanation: "Both triangles have the same three angles (40°, 60°, 80°). By the AA test they are similar." },

  { q: "If the scale factor between two similar figures is 3, what is the ratio of their areas?",
    answer: "9",
    accepts: ["9", "9:1", "3^2", "3²"],
    hint: "Area ratio = (scale factor)².",
    explanation: "Area ratio = k² = 3² = 9. If linear dimensions are ×3, area is ×9." },
  { q: "If the scale factor between two similar solids is 2, what is the ratio of their volumes?",
    answer: "8",
    accepts: ["8", "8:1", "2^3", "2³"],
    hint: "Volume ratio = (scale factor)³.",
    explanation: "Volume ratio = k³ = 2³ = 8. If linear dimensions are ×2, volume is ×8." },
  { q: "ΔABC ~ ΔDEF. AB = 5, BC = 7, DE = 15. Find EF.",
    answer: "21",
    accepts: ["21", "21 cm"],
    hint: "Scale factor = DE/AB = 15/5 = 3. Then EF = BC × 3.",
    explanation: "Scale factor = 15/5 = 3. EF = 7 × 3 = 21." },
  { q: "True or false: All congruent figures are similar.",
    answer: "True",
    accepts: ["true", "yes", "t"],
    hint: "Congruence is a special case of similarity where the scale factor is 1.",
    explanation: "Yes — congruent figures have equal angles and sides in ratio 1:1, so they satisfy the definition of similarity." },
  { q: "True or false: All similar figures are congruent.",
    answer: "False",
    accepts: ["false", "no", "f"],
    hint: "Similar means same shape. Congruent means same shape AND same size.",
    explanation: "False. Similar figures can be different sizes (e.g. a photo and its enlargement). Only if the scale factor = 1 are they also congruent." }
],

// ---------- 8.3 DIAGRAMS — IDENTIFY THE TEST ----------
"Unit 8 Quiz 3: Identify the Test (Diagrams)": [
  { q: "Which congruence test applies?" +
    gWrap(
      gTriangle([[40,170],[120,30],[200,170]], ['A','B','C'], [1,0,2], [{v:2,label:'40°'}]) +
      gTriangle([[230,170],[310,30],[390,170]], ['D','E','F'], [1,0,2], [{v:2,label:'40°'}]),
      420, 200),
    answer: "SAS",
    accepts: ["sas"],
    hint: "Two sides marked equal with the angle between them given.",
    explanation: "AB = DE (single tick), CA = FD (double tick), included angle C = angle F = 40°. SAS." },
  { q: "Which congruence test applies?" +
    gWrap(
      gTriangle([[30,170],[130,30],[250,170]], ['K','L','M'], [0,0,0], [{v:0,label:'55°'},{v:2,label:'70°'}]) +
      gTriangle([[260,170],[340,30],[400,170]], ['P','Q','R'], [0,0,0], [{v:0,label:'55°'},{v:2,label:'70°'}]) +
      gT(140, 195, 'KM = PR = 8 cm', 12),
      420, 210),
    answer: "ASA",
    accepts: ["asa", "angle side angle"],
    hint: "Two angles and the side between them (KM = PR) are equal.",
    explanation: "Angle K = Angle P = 55°, KM = PR = 8 cm (included side), Angle M = Angle R = 70°. ASA." },
  { q: "Which congruence test applies?" +
    gWrap(
      gTriangle([[30,180],[30,40],[180,180]], ['A','B','C'], [1,0,0], [], 0) +
      gTriangle([[220,180],[220,40],[370,180]], ['X','Y','Z'], [1,0,0], [], 0) +
      gT(105, 100, 'BC = 10', 12) + gT(295, 100, 'YZ = 10', 12),
      400, 210),
    answer: "RHS",
    accepts: ["rhs"],
    hint: "Right angle + hypotenuse given equal + one other side marked equal.",
    explanation: "Right angle at A and X, hypotenuse BC = YZ = 10, AB = XY (single tick). RHS." },

  { q: "Which test proves ΔABC ≡ ΔADC?" +
    gWrap(
      gL(200, 30, 80, 180) + gL(200, 30, 320, 180) + gL(80, 180, 320, 180) +
      gL(200, 30, 200, 180) +
      gTick(200, 30, 80, 180, 1) + gTick(200, 30, 320, 180, 1) +
      gTick(80, 180, 200, 180, 2) + gTick(200, 180, 320, 180, 2) +
      gT(200, 18, 'A', 16) + gT(65, 195, 'B', 16) + gT(335, 195, 'C', 16) + gT(200, 197, 'D', 16),
      400, 210),
    answer: "SSS",
    accepts: ["sss"],
    hint: "AB = AC (single tick), BD = DC (double tick), and AD is common.",
    explanation: "AB = AC (single tick), BD = DC (double tick), AD = AD (common). SSS." },
  { q: "AE and BD bisect each other at C. Which test proves ΔABC ≡ ΔEDC?" +
    gWrap(
      gL(40, 40, 360, 180) + gL(40, 180, 360, 40) +
      gTick(40, 40, 200, 110, 1) + gTick(200, 110, 360, 180, 1) +
      gTick(40, 180, 200, 110, 2) + gTick(200, 110, 360, 40, 2) +
      gT(30, 35, 'A', 16) + gT(30, 195, 'B', 16) +
      gT(200, 100, 'C', 16) +
      gT(370, 35, 'D', 16) + gT(370, 195, 'E', 16),
      400, 210),
    answer: "SAS",
    accepts: ["sas"],
    hint: "AC = EC and BC = DC (bisect). What about the included angle?",
    explanation: "AC = EC, BC = DC (bisect at C), angle ACB = angle ECD (vertically opposite). SAS." },
  { q: "In a kite WXYZ, WX = WZ and XY = ZY. Which test proves ΔWXY ≡ ΔWZY?",
    answer: "SSS",
    accepts: ["sss"],
    hint: "List the sides: WX = WZ, XY = ZY, and the third side?",
    explanation: "WX = WZ (given), XY = ZY (given), WY = WY (common). Three pairs of equal sides → SSS." },

  { q: "Which similarity test applies here?" +
    gWrap(
      gTriangle([[30,170],[120,30],[230,170]], ['A','B','C'], [0,0,0], [{v:0,label:'50°'},{v:1,label:'65°'}]) +
      gTriangle([[260,170],[330,50],[390,170]], ['X','Y','Z'], [0,0,0], [{v:0,label:'50°'},{v:1,label:'65°'}]),
      420, 200),
    answer: "AA",
    accepts: ["aa", "angle angle"],
    hint: "Two pairs of corresponding angles are equal.",
    explanation: "Angle A = Angle X = 50° and Angle B = Angle Y = 65°. Two pairs of equal angles → AA similarity test." },
  { q: "ΔPQR has sides 3, 4, 5. ΔXYZ has sides 6, 8, 10. Which similarity test applies?",
    answer: "SSS",
    accepts: ["sss", "side side side"],
    hint: "Check whether all three ratios are equal: 6/3, 8/4, 10/5.",
    explanation: "6/3 = 8/4 = 10/5 = 2. All corresponding sides are proportional → SSS similarity test." },
  { q: "ΔABC has AB=4, AC=6, angle A=80°. ΔDEF has DE=8, DF=12, angle D=80°. Which test?",
    answer: "SAS",
    accepts: ["sas", "side angle side"],
    hint: "Two pairs of sides proportional (8/4 = 12/6 = 2) with the included angle equal.",
    explanation: "DE/AB = 8/4 = 2, DF/AC = 12/6 = 2, and included angle A = angle D = 80°. SAS similarity." },
  { q: "Can you use AA to prove congruence (not just similarity)?",
    answer: "No",
    accepts: ["no", "false", "n"],
    hint: "AA only tells you the triangles are the same shape.",
    explanation: "No. AA proves similarity only. Two triangles with the same angles can be different sizes. You need at least one side to prove congruence." }
],

// ---------- 8.4 FINDING UNKNOWNS ----------
"Unit 8 Quiz 4: Finding Unknown Sides & Angles": [
  { q: "ΔABC ≡ ΔPQR. AB = 7 cm, angle A = 60°, angle B = 80°. Find angle Q.",
    answer: "80°",
    accepts: ["80", "80°", "80 degrees"],
    hint: "B corresponds to Q in the congruence statement.",
    explanation: "B corresponds to Q, so angle Q = angle B = 80°." },
  { q: "ΔXYZ ≡ ΔDEF. XY = 5 cm, YZ = 8 cm, XZ = 6 cm. Find DF.",
    answer: "6 cm",
    accepts: ["6", "6cm", "6 cm"],
    hint: "X corresponds to D, Z corresponds to F. So XZ corresponds to DF.",
    explanation: "X→D, Z→F, so XZ corresponds to DF. DF = XZ = 6 cm." },
  { q: "ΔABC ~ ΔDEF. AB = 4, BC = 5, AC = 6, DE = 12. Find EF.",
    answer: "15",
    accepts: ["15", "15 cm"],
    hint: "Scale factor = DE/AB = 12/4 = 3.",
    explanation: "Scale factor = 12/4 = 3. EF = BC × 3 = 5 × 3 = 15." },
  { q: "ΔABC ~ ΔDEF. AB = 4, AC = 6, DE = 12. Find DF.",
    answer: "18",
    accepts: ["18", "18 cm"],
    hint: "Scale factor = DE/AB = 12/4 = 3. Then DF = AC × 3.",
    explanation: "Scale factor = 12/4 = 3. DF = AC × 3 = 6 × 3 = 18." },
  { q: "Two similar triangles have areas 16 cm² and 64 cm². Find the scale factor.",
    answer: "2",
    accepts: ["2", "1:2", "2:1"],
    hint: "Area ratio = k². So k = √(64/16).",
    explanation: "Area ratio = 64/16 = 4. Scale factor k = √4 = 2." },
  { q: "Two similar solids have volumes 27 cm³ and 216 cm³. Find the scale factor.",
    answer: "2",
    accepts: ["2", "1:2", "2:1"],
    hint: "Volume ratio = k³. So k = ∛(216/27).",
    explanation: "Volume ratio = 216/27 = 8. Scale factor k = ∛8 = 2." },
  { q: "ΔABC ~ ΔXYZ with scale factor 1.5. Area of ΔABC = 20 cm². Find area of ΔXYZ.",
    answer: "45 cm²",
    accepts: ["45", "45 cm²", "45cm²", "45 cm^2"],
    hint: "Area of ΔXYZ = Area of ΔABC × k².",
    explanation: "Area ratio = 1.5² = 2.25. Area of ΔXYZ = 20 × 2.25 = 45 cm²." },
  { q: "ΔPQR ~ ΔXYZ. PQ = 6, QR = 9, angle Q = 50°. XY = 2, YZ = 3. Find angle Y.",
    answer: "50°",
    accepts: ["50", "50°", "50 degrees"],
    hint: "Similar triangles have equal corresponding angles.",
    explanation: "Q corresponds to Y (both between the proportional sides). Angle Y = angle Q = 50°." },
  { q: "Two similar triangles have perimeters 12 cm and 36 cm. What is the scale factor?",
    answer: "3",
    accepts: ["3", "1:3", "3:1"],
    hint: "Perimeter ratio = linear scale factor (not squared).",
    explanation: "Perimeter ratio = scale factor = 36/12 = 3." },
  { q: "If two similar figures have a scale factor of 4, and the smaller has area 5 cm², find the larger area.",
    answer: "80 cm²",
    accepts: ["80", "80 cm²", "80cm²", "80 cm^2"],
    hint: "Area = original × k².",
    explanation: "Larger area = 5 × 4² = 5 × 16 = 80 cm²." }
],

// ---------- 8.5 PROVING CONGRUENCE (with diagrams) ----------
"Unit 8 Quiz 5: Proving Congruence": [
  { q: "ABCD is a parallelogram. Diagonal AC is drawn. Prove ΔABC ≡ ΔCDA. Which test?" +
    gWrap(
      gL(60,50,300,50) + gL(300,50,340,170) + gL(340,170,100,170) + gL(100,170,60,50) +
      gL(60,50,340,170) +
      gTick(60,50,300,50,1) + gTick(100,170,340,170,1) +
      gTick(300,50,340,170,2) + gTick(60,50,100,170,2) +
      gT(50,42,'A',16) + gT(310,42,'B',16) + gT(355,180,'C',16) + gT(88,180,'D',16),
      400, 200),
    answer: "SSS",
    accepts: ["sss"],
    hint: "AB = CD (opposite sides), AD = CB (opposite sides), AC = AC (common).",
    explanation: "AB = CD (single tick), BC = DA (double tick), AC = CA (common). SSS." },
  { q: "M is the midpoint of AB. CM ⊥ AB. Prove ΔACM ≡ ΔBCM. Which test?" +
    gWrap(
      gL(60,170,340,170) + gL(60,170,200,30) + gL(340,170,200,30) + gL(200,30,200,170) +
      gRight(200,170,200,30,340,170) +
      gTick(60,170,200,170,1) + gTick(200,170,340,170,1) +
      gT(45,185,'A',16) + gT(355,185,'B',16) + gT(200,18,'C',16) + gT(200,190,'M',16),
      400, 210),
    answer: "SAS",
    accepts: ["sas", "rhs"],
    hint: "AM = BM (midpoint), CM = CM (common), angle CMA = angle CMB = 90°.",
    explanation: "AM = BM (single ticks), angle CMA = angle CMB = 90°, CM = CM (common). SAS (or RHS since hypotenuse AC = BC by isosceles)." },
  { q: "In ΔABC, angle A = angle C = 70° and BD is drawn to AC. What can you conclude about AB and CB?",
    answer: "AB = CB",
    accepts: ["ab=cb", "ab = cb", "ab=bc", "ab = bc", "they are equal", "equal"],
    hint: "If base angles of a triangle are equal, the triangle is isosceles.",
    explanation: "Angle A = Angle C, so ΔABC is isosceles with AB = CB (sides opposite equal angles are equal)." },
  { q: "ΔABC has AB = AC. D is on BC such that AD ⊥ BC. Complete: BD = ___",
    answer: "DC",
    accepts: ["dc", "cd"],
    hint: "The perpendicular from the apex of an isosceles triangle bisects the base.",
    explanation: "In an isosceles triangle, the altitude from the apex bisects the base. So BD = DC." },
  { q: "ABCD is a rectangle. Which test proves ΔABC ≡ ΔCDA?",
    answer: "SAS",
    accepts: ["sas", "sss", "rhs"],
    hint: "AB = CD, BC = DA, and all angles are 90°.",
    explanation: "AB = CD (opposite sides of rectangle), BC = DA, angle B = angle D = 90°. SAS (or SSS with AC = CA common, or RHS)." },

  { q: "In ΔPQR, S is on QR such that PS bisects angle QPR. PQ = PR = 10. Which test proves ΔPQS ≡ ΔPRS?",
    answer: "SAS",
    accepts: ["sas"],
    hint: "PQ = PR (given), angle QPS = angle RPS (bisector), PS = PS (common).",
    explanation: "PQ = PR, angle QPS = angle RPS (bisected), PS = PS (common). Two sides and the included angle → SAS." },
  { q: "Two right-angled triangles share the same hypotenuse (a common side). One other pair of sides is equal. Which test?",
    answer: "RHS",
    accepts: ["rhs"],
    hint: "Right angle + same hypotenuse + equal side.",
    explanation: "Right angle in both, hypotenuse is common, one other side is equal → RHS." },
  { q: "Angles in a triangle sum to ______°.",
    answer: "180°",
    accepts: ["180", "180°", "180 degrees"],
    hint: "This is the angle sum of a triangle.",
    explanation: "The angles in any triangle always sum to 180°." },
  { q: "In ΔABC, angle A = 50°, angle B = 60°. Find angle C.",
    answer: "70°",
    accepts: ["70", "70°", "70 degrees"],
    hint: "Angle C = 180° - 50° - 60°.",
    explanation: "Angle C = 180 - 50 - 60 = 70°." },
  { q: "If two triangles have angles 30°, 60°, 90° and sides 3, 4, 5 and 6, 8, 10 respectively, are they congruent or similar?",
    answer: "Similar",
    accepts: ["similar", "similar only", "only similar"],
    hint: "Same angles but sides are doubled, not equal.",
    explanation: "Same angles (similar by AA) and sides in ratio 2:1, but sides are not equal — so similar but NOT congruent." }
],

// ---------- 8.6 MIXED PROBLEMS ----------
"Unit 8 Quiz 6: Mixed Congruence & Similarity": [
  { q: "A triangle has sides 5, 12, 13. Another has sides 10, 24, 26. Are they similar?",
    answer: "Yes",
    accepts: ["yes", "y", "true"],
    hint: "Check if all ratios are equal: 10/5, 24/12, 26/13.",
    explanation: "10/5 = 24/12 = 26/13 = 2. All ratios equal → similar (SSS similarity)." },
  { q: "A photo is 4 cm × 6 cm. It is enlarged with scale factor 3. Find the new dimensions.",
    answer: "12 cm × 18 cm",
    accepts: ["12x18", "12 x 18", "12cm x 18cm", "12 cm x 18 cm", "12×18", "12 by 18"],
    hint: "Multiply both dimensions by 3.",
    explanation: "4 × 3 = 12 cm, 6 × 3 = 18 cm. New dimensions: 12 cm × 18 cm." },
  { q: "Two similar cones have heights 5 cm and 15 cm. If the smaller has volume 50 cm³, find the larger volume.",
    answer: "1350 cm³",
    accepts: ["1350", "1350 cm³", "1350cm³", "1350 cm^3"],
    hint: "Scale factor = 15/5 = 3. Volume ratio = 3³ = 27.",
    explanation: "k = 15/5 = 3. Volume ratio = 3³ = 27. Larger volume = 50 × 27 = 1350 cm³." },
  { q: "ΔABC ~ ΔDEF. Area of ΔABC = 9 cm², area of ΔDEF = 81 cm². Find the ratio AB:DE.",
    answer: "1:3",
    accepts: ["1:3", "1/3", "1 to 3"],
    hint: "Area ratio = k². So k = √(81/9) = 3. The smaller to larger is 1:3.",
    explanation: "Area ratio = 81/9 = 9. k = √9 = 3. So AB:DE = 1:3." },
  { q: "In ΔPQR, angle P = 90°, PQ = 6, PR = 8. M is the midpoint of QR. Find QR.",
    answer: "10",
    accepts: ["10", "10 cm"],
    hint: "Use Pythagoras: QR² = PQ² + PR².",
    explanation: "QR = √(6² + 8²) = √(36 + 64) = √100 = 10." },
  { q: "In the same triangle (angle P = 90°, PQ = 6, PR = 8, QR = 10), what is PM if M is the midpoint of QR?",
    answer: "5",
    accepts: ["5", "5 cm"],
    hint: "In a right triangle, the median to the hypotenuse = half the hypotenuse.",
    explanation: "The median from the right angle to the hypotenuse always equals half the hypotenuse. PM = QR/2 = 10/2 = 5." },
  { q: "Two similar rectangles have widths 3 cm and 9 cm. The smaller has perimeter 16 cm. Find the larger perimeter.",
    answer: "48 cm",
    accepts: ["48", "48 cm", "48cm"],
    hint: "Perimeter scales linearly. Scale factor = 9/3 = 3.",
    explanation: "Scale factor = 9/3 = 3. Larger perimeter = 16 × 3 = 48 cm." },
  { q: "ΔABC ≡ ΔXYZ. Perimeter of ΔABC = 24 cm. AB = 7, BC = 9. Find XZ.",
    answer: "8 cm",
    accepts: ["8", "8 cm", "8cm"],
    hint: "First find AC from the perimeter, then XZ = AC (congruent).",
    explanation: "AC = 24 - 7 - 9 = 8 cm. Since congruent, XZ = AC = 8 cm." },
  { q: "A model car is 1:20 scale. The real car is 4 m long. How long is the model in cm?",
    answer: "20 cm",
    accepts: ["20", "20 cm", "20cm"],
    hint: "4 m = 400 cm. Model = 400 ÷ 20.",
    explanation: "4 m = 400 cm. Model length = 400/20 = 20 cm." },
  { q: "Two similar triangles have scale factor 5. The smaller has area 3 cm². Find the larger area.",
    answer: "75 cm²",
    accepts: ["75", "75 cm²", "75cm²", "75 cm^2"],
    hint: "Area ratio = k² = 25.",
    explanation: "Larger area = 3 × 5² = 3 × 25 = 75 cm²." }
]

};
