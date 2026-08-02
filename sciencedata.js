// ============================================================
// LEARN TF // SCIENCE DATA MODULE
// Physics: Electricity — symbols, units, formulas, diagrams
// Diagrams are inline SVG (rendered via innerHTML in loadQuiz)
// ============================================================

const S_CY = '#64ffda';
const S_BG = '#0d1526';

// --- SVG primitives -----------------------------------------
function sWrap(inner, h) {
  h = h || 220;
  return `<svg viewBox="0 0 400 ${h}" width="100%" style="max-width:420px;display:block;margin:14px auto;background:${S_BG};border:1px solid rgba(100,255,218,0.25);border-radius:10px;box-shadow:0 0 24px rgba(100,255,218,0.08);">${inner}</svg>`;
}
function sW(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${S_CY}" stroke-width="2"/>`;
}
function sLoop(l, t, r, b) {
  return sW(l, t, r, t) + sW(r, t, r, b) + sW(r, b, l, b) + sW(l, b, l, t);
}
// Battery on a horizontal wire
function sBatt(cx, cy, label) {
  return `<rect x="${cx - 16}" y="${cy - 24}" width="32" height="48" fill="${S_BG}"/>` +
    `<line x1="${cx - 7}" y1="${cy - 20}" x2="${cx - 7}" y2="${cy + 20}" stroke="${S_CY}" stroke-width="3"/>` +
    `<line x1="${cx + 7}" y1="${cy - 11}" x2="${cx + 7}" y2="${cy + 11}" stroke="${S_CY}" stroke-width="3"/>` +
    (label ? `<text x="${cx}" y="${cy + 40}" text-anchor="middle" fill="${S_CY}" font-size="15" font-family="monospace">${label}</text>` : '');
}
// Resistor on a horizontal wire
function sRes(cx, cy, label, below) {
  const ly = below ? cy + 30 : cy - 22;
  return `<rect x="${cx - 30}" y="${cy - 14}" width="60" height="28" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    (label ? `<text x="${cx}" y="${ly}" text-anchor="middle" fill="${S_CY}" font-size="15" font-family="monospace">${label}</text>` : '');
}
// Resistor on a vertical wire
function sResV(cx, cy, label) {
  return `<rect x="${cx - 14}" y="${cy - 30}" width="28" height="60" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    (label ? `<text x="${cx + 24}" y="${cy + 5}" text-anchor="start" fill="${S_CY}" font-size="15" font-family="monospace">${label}</text>` : '');
}
// Meter (A = ammeter, V = voltmeter)
function sMeter(cx, cy, letter, label) {
  return `<rect x="${cx - 20}" y="${cy - 20}" width="40" height="40" fill="${S_BG}"/>` +
    `<circle cx="${cx}" cy="${cy}" r="18" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    `<text x="${cx}" y="${cy + 6}" text-anchor="middle" fill="${S_CY}" font-size="17" font-family="monospace">${letter}</text>` +
    (label ? `<text x="${cx}" y="${cy + 40}" text-anchor="middle" fill="${S_CY}" font-size="14" font-family="monospace">${label}</text>` : '');
}
// Lamp symbol
function sLamp(cx, cy, label) {
  return `<rect x="${cx - 20}" y="${cy - 20}" width="40" height="40" fill="${S_BG}"/>` +
    `<circle cx="${cx}" cy="${cy}" r="16" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    sW(cx - 11, cy - 11, cx + 11, cy + 11) + sW(cx - 11, cy + 11, cx + 11, cy - 11) +
    (label ? `<text x="${cx}" y="${cy + 38}" text-anchor="middle" fill="${S_CY}" font-size="14" font-family="monospace">${label}</text>` : '');
}
// --- Formula triangle:  top / (left | right) ----------------
// Geometry: apex (200,20), base corners (80,180) and (320,180).
// Horizontal divider at y=116, vertical divider from (200,116) down.
const S_TRI_PTS = '200,20 320,180 80,180';
// Cover boxes are drawn generously and then CLIPPED to the triangle, so they
// never spill past a sloped edge. Anchor = where the "?" goes.
const S_CELL = {
  top:   { box: [60, 20, 280, 96],  anchor: [200, 88] },
  left:  { box: [60, 116, 140, 64], anchor: [152, 158] },
  right: { box: [200, 116, 140, 64], anchor: [248, 158] },
};
let S_UID = 0;

function sTriBody(top, left, right, cover) {
  const uid = 'triclip' + (++S_UID);
  const label = (x, y, t, size) =>
    `<text x="${x}" y="${y}" text-anchor="middle" fill="${S_CY}" font-size="${size}" font-family="Orbitron,monospace" font-weight="700">${t}</text>`;
  let s = `<defs><clipPath id="${uid}"><polygon points="${S_TRI_PTS}"/></clipPath></defs>` +
    `<polygon points="${S_TRI_PTS}" fill="rgba(100,255,218,0.04)" stroke="${S_CY}" stroke-width="2"/>`;
  // Opaque cover, clipped to the triangle. The hidden letter is simply not
  // drawn at all, so it cannot be read through the fill.
  if (cover) {
    const c = S_CELL[cover];
    s += `<g clip-path="url(#${uid})"><rect x="${c.box[0]}" y="${c.box[1]}" width="${c.box[2]}" height="${c.box[3]}" fill="#ff6464"/></g>`;
  }
  s += sW(136, 116, 264, 116) + sW(200, 116, 200, 180);
  if (cover !== 'top') s += label(200, 98, top, 40);
  if (cover !== 'left') s += label(166, 164, left, 34);
  if (cover !== 'right') s += label(236, 164, right, 34);
  if (cover) {
    const a = S_CELL[cover].anchor;
    s += `<text x="${a[0]}" y="${a[1]}" text-anchor="middle" fill="#0d1526" font-size="34" font-family="Orbitron,monospace" font-weight="700">?</text>`;
  }
  return sWrap(s, 200);
}
function sTri(top, left, right) { return sTriBody(top, left, right, null); }
function sTriCover(top, left, right, cover) { return sTriBody(top, left, right, cover); }

// --- Diagram builders ---------------------------------------
function sSeries2(bLabel, r1, r2) {
  return sWrap(
    sLoop(40, 45, 360, 175) +
    sRes(140, 45, r1) + sRes(270, 45, r2) +
    sBatt(200, 175, bLabel),
    230
  );
}
function sSeriesAmmeter(bLabel, rLabel) {
  return sWrap(
    sLoop(40, 45, 360, 175) +
    sRes(200, 45, rLabel) +
    sMeter(360, 110, 'A', '') +
    `<text x="330" y="115" text-anchor="end" fill="${S_CY}" font-size="14" font-family="monospace">ammeter</text>` +
    sBatt(200, 175, bLabel),
    230
  );
}
function sVoltmeter(bLabel, rLabel) {
  return sWrap(
    sLoop(40, 60, 360, 190) +
    // label goes BELOW the resistor: above it would be painted over by the
    // voltmeter's opaque backing rect
    sRes(200, 60, rLabel, true) +
    // voltmeter branch across the resistor
    sW(140, 60, 140, 25) + sW(140, 25, 180, 25) + sW(220, 25, 260, 25) + sW(260, 25, 260, 60) +
    sMeter(200, 25, 'V', '') +
    sBatt(200, 190, bLabel),
    230
  );
}
function sParallel2(bLabel, r1, r2) {
  // Parallel circuit as a closed rectangular loop:
  //
  //      ┌────[R1]────┐
  //      |            |
  //    ─┤├─           |
  //      |            |
  //      └────[R2]────┘
  //
  const jL = 80, jR = 320;    // left/right vertical rails
  const top = 50, bot = 180;  // y of top/bottom branches
  const midX = 200;            // resistor centre
  const battCy = 115;          // battery centre y (on left rail)
  return sWrap(
    // left rail — split for battery
    sW(jL, top, jL, battCy - 24) +
    sW(jL, battCy + 24, jL, bot) +
    // right rail — solid vertical
    sW(jR, top, jR, bot) +
    // top branch: left rail → resistor → right rail
    sW(jL, top, midX - 30, top) +
    sW(midX + 30, top, jR, top) +
    // bottom branch: left rail → resistor → right rail
    sW(jL, bot, midX - 30, bot) +
    sW(midX + 30, bot, jR, bot) +
    // resistors (horizontal)
    sRes(midX, top, r1) + sRes(midX, bot, r2) +
    // battery on the left rail
    sBatt(jL, battCy, bLabel),
    220
  );
}
function sLampCircuit(bLabel) {
  return sWrap(
    sLoop(40, 45, 360, 175) +
    sLamp(200, 45, 'lamp') +
    sMeter(40, 110, 'A', '') +
    sBatt(200, 175, bLabel),
    230
  );
}

// ============================================================
const scienceQuizzes = {

// ---------- 1.1 SYMBOLS: FILL IN THE BLANKS ----------
"Sci 1.1: Symbols — Fill in the Blanks": [
  { q: "Fill in the blank: the symbol <b>V</b> stands for ______.", answer: "Voltage", accepts: ["voltage", "potential difference", "p.d.", "pd"], hint: "It is the 'push' that drives charge around a circuit.", explanation: "V = Voltage (also called potential difference). Measured in volts (V)." },
  { q: "Fill in the blank: the symbol <b>I</b> stands for ______.", answer: "Current", accepts: ["current", "electric current"], hint: "It is the rate of flow of charge.", explanation: "I = Current. Measured in amperes (A). The letter I comes from the French 'intensité de courant'." },
  { q: "Fill in the blank: the symbol <b>R</b> stands for ______.", answer: "Resistance", accepts: ["resistance"], hint: "It opposes the flow of current.", explanation: "R = Resistance. Measured in ohms (Ω)." },
  { q: "Fill in the blank: the symbol <b>P</b> stands for ______.", answer: "Power", accepts: ["power", "electrical power"], hint: "Energy transferred per second.", explanation: "P = Power. Measured in watts (W). 1 W = 1 joule per second." },
  { q: "Fill in the blank: the symbol <b>Q</b> stands for ______.", answer: "Charge", accepts: ["charge", "electric charge"], hint: "It is what flows through a wire.", explanation: "Q = Charge. Measured in coulombs (C)." },
  { q: "Fill in the blank: the symbol <b>t</b> stands for ______.", answer: "Time", accepts: ["time"], hint: "Measured with a stopwatch.", explanation: "t = Time. Measured in seconds (s)." },
  { q: "Which <b>symbol</b> is used for current? [Answer with the letter]", answer: "I", accepts: ["i"], hint: "It is not C — that is the unit of charge.", explanation: "Current uses the symbol I. Careful: C is the unit of charge, not a quantity symbol." },
  { q: "Which <b>symbol</b> is used for resistance? [Answer with the letter]", answer: "R", accepts: ["r"], hint: "First letter of the word.", explanation: "Resistance uses the symbol R. Its unit is Ω (ohm)." },
  { q: "Which <b>symbol</b> is used for charge? [Answer with the letter]", answer: "Q", accepts: ["q"], hint: "It is not C — C is the unit.", explanation: "Charge uses the symbol Q, and its unit is the coulomb (C). Don't mix the quantity symbol with the unit symbol." },
  { q: "Which <b>symbol</b> is used for power? [Answer with the letter]", answer: "P", accepts: ["p"], hint: "First letter of the word.", explanation: "Power uses the symbol P. Its unit is the watt (W)." }
],

// ---------- 1.2 UNITS AND FULL WORDS ----------
"Sci 1.2: Units & Full Words": [
  { q: "What is the <b>unit symbol</b> for voltage?", answer: "V", accepts: ["v", "volt", "volts"], hint: "Same letter as the quantity symbol.", explanation: "Voltage is measured in V (volts). The quantity symbol and the unit symbol are both V — this is the only one where they match." },
  { q: "Write the <b>full word</b> for the unit of voltage.", answer: "volt", accepts: ["volt", "volts"], hint: "Named after Alessandro Volta.", explanation: "The unit of voltage is the volt (V)." },
  { q: "What is the <b>unit symbol</b> for current?", answer: "A", accepts: ["a", "amp", "amps", "ampere", "amperes"], hint: "Not I — that is the quantity symbol.", explanation: "Current is measured in A (amperes). The quantity symbol is I, the unit symbol is A." },
  { q: "Write the <b>full word</b> for the unit of current.", answer: "ampere", accepts: ["ampere", "amperes", "amp", "amps"], hint: "Often shortened to 'amp'.", explanation: "The unit of current is the ampere (A), named after André-Marie Ampère." },
  { q: "What is the <b>unit symbol</b> for resistance? [Use the Ω button or type 'ohm']", answer: "Ω", accepts: ["Ω", "ohm", "ohms"], hint: "It is a Greek letter — omega.", explanation: "Resistance is measured in Ω (ohms). Ω is the Greek capital letter omega." },
  { q: "Write the <b>full word</b> for the unit of resistance.", answer: "ohm", accepts: ["ohm", "ohms"], hint: "Named after Georg Ohm.", explanation: "The unit of resistance is the ohm (Ω), named after Georg Simon Ohm — the same person as Ohm's Law." },
  { q: "What is the <b>unit symbol</b> for power?", answer: "W", accepts: ["w", "watt", "watts"], hint: "Think of a light bulb rating.", explanation: "Power is measured in W (watts). 1 W = 1 J/s." },
  { q: "Write the <b>full word</b> for the unit of charge.", answer: "coulomb", accepts: ["coulomb", "coulombs"], hint: "Its symbol is C.", explanation: "The unit of charge is the coulomb (C). 1 C is the charge carried by a 1 A current in 1 s." },
  { q: "What is the <b>unit symbol</b> for charge?", answer: "C", accepts: ["c", "coulomb", "coulombs"], hint: "Not Q — that is the quantity symbol.", explanation: "Charge is measured in C (coulombs). Quantity symbol Q, unit symbol C." },
  { q: "Write the <b>full word</b> for the unit of time, and give its symbol in brackets.", answer: "second (s)", accepts: ["second(s)", "seconds(s)", "second s", "seconds s", "second", "seconds", "s"], hint: "SI base unit of time.", explanation: "Time is measured in seconds, symbol s. In all these formulas time must be in seconds." }
],

// ---------- 1.3 WRITING THE FORMULAS ----------
"Sci 1.3: Writing the Formulas": [
  { q: "Write <b>Ohm's Law</b> with voltage as the subject. [Use symbols, e.g. A=BC]", answer: "V=IR", accepts: ["v=ir", "v=i×r", "v=i*r", "v=ri"], hint: "Voltage is at the top of the triangle.", explanation: "Ohm's Law: V = IR. Voltage equals current multiplied by resistance." },
  { q: "Rearrange Ohm's Law to make <b>current</b> the subject.", answer: "I=V/R", accepts: ["i=v/r", "i=v÷r"], hint: "Divide both sides of V = IR by R.", explanation: "V = IR → divide both sides by R → I = V/R." },
  { q: "Rearrange Ohm's Law to make <b>resistance</b> the subject.", answer: "R=V/I", accepts: ["r=v/i", "r=v÷i"], hint: "Divide both sides of V = IR by I.", explanation: "V = IR → divide both sides by I → R = V/I." },
  { q: "Write the formula for <b>electrical power</b> in terms of voltage and current.", answer: "P=VI", accepts: ["p=vi", "p=v×i", "p=v*i", "p=iv"], hint: "Power is at the top of the power triangle.", explanation: "P = VI. Power equals voltage multiplied by current." },
  { q: "Rearrange P = VI to make <b>voltage</b> the subject.", answer: "V=P/I", accepts: ["v=p/i", "v=p÷i"], hint: "Divide both sides by I.", explanation: "P = VI → divide both sides by I → V = P/I." },
  { q: "Rearrange P = VI to make <b>current</b> the subject.", answer: "I=P/V", accepts: ["i=p/v", "i=p÷v"], hint: "Divide both sides by V.", explanation: "P = VI → divide both sides by V → I = P/V." },
  { q: "Write the formula linking <b>charge</b>, current and time.", answer: "Q=It", accepts: ["q=it", "q=i×t", "q=i*t", "q=ti"], hint: "Charge is at the top of the charge triangle.", explanation: "Q = It. Charge equals current multiplied by time (time in seconds)." },
  { q: "Rearrange Q = It to make <b>current</b> the subject.", answer: "I=Q/t", accepts: ["i=q/t", "i=q÷t"], hint: "Divide both sides by t.", explanation: "Q = It → divide both sides by t → I = Q/t. This shows current is the rate of flow of charge." },
  { q: "Rearrange Q = It to make <b>time</b> the subject.", answer: "t=Q/I", accepts: ["t=q/i", "t=q÷i"], hint: "Divide both sides by I.", explanation: "Q = It → divide both sides by I → t = Q/I." },
  { q: "Substitute V = IR into P = VI to write power in terms of <b>I and R</b> only.", answer: "P=I²R", accepts: ["p=i^2r", "p=i²r", "p=ri^2", "p=ri²", "p=i^2×r", "p=i*i*r"], hint: "Replace V with IR in P = VI.", explanation: "P = VI and V = IR, so P = (IR)I = I²R. This is the heating-effect formula." }
],

// ---------- 1.4 FORMULA TRIANGLES (DIAGRAMS) ----------
"Sci 1.4: Formula Triangles (Diagrams)": [
  { q: "This is the <b>Ohm's Law triangle</b>. Write the formula for the quantity at the top." + sTri("V", "I", "R"), answer: "V=IR", accepts: ["v=ir", "v=i×r", "v=i*r", "v=ri"], hint: "Top = left × right.", explanation: "In a formula triangle, the top equals the two bottom cells multiplied: V = I × R." },
  { q: "Cover the red cell in the Ohm's Law triangle. Write the formula for the missing quantity." + sTriCover("V", "I", "R", "left"), answer: "I=V/R", accepts: ["i=v/r", "i=v÷r"], hint: "Bottom = top ÷ other bottom.", explanation: "Covering I leaves V above R, so I = V/R." },
  { q: "Cover the red cell. Write the formula for the missing quantity." + sTriCover("V", "I", "R", "right"), answer: "R=V/I", accepts: ["r=v/i", "r=v÷i"], hint: "Bottom = top ÷ other bottom.", explanation: "Covering R leaves V above I, so R = V/I." },
  { q: "This is the <b>Power triangle</b>. Write the formula for the quantity at the top." + sTri("P", "V", "I"), answer: "P=VI", accepts: ["p=vi", "p=v×i", "p=v*i", "p=iv"], hint: "Top = left × right.", explanation: "P = V × I." },
  { q: "Cover the red cell in the Power triangle. Write the formula." + sTriCover("P", "V", "I", "left"), answer: "V=P/I", accepts: ["v=p/i", "v=p÷i"], hint: "Top ÷ the other bottom cell.", explanation: "Covering V leaves P above I, so V = P/I." },
  { q: "Cover the red cell in the Power triangle. Write the formula." + sTriCover("P", "V", "I", "right"), answer: "I=P/V", accepts: ["i=p/v", "i=p÷v"], hint: "Top ÷ the other bottom cell.", explanation: "Covering I leaves P above V, so I = P/V." },
  { q: "This is the <b>Charge triangle</b>. Write the formula for the quantity at the top." + sTri("Q", "I", "t"), answer: "Q=It", accepts: ["q=it", "q=i×t", "q=i*t", "q=ti"], hint: "Top = left × right.", explanation: "Q = I × t." },
  { q: "Cover the red cell in the Charge triangle. Write the formula." + sTriCover("Q", "I", "t", "left"), answer: "I=Q/t", accepts: ["i=q/t", "i=q÷t"], hint: "Top ÷ the other bottom cell.", explanation: "Covering I leaves Q above t, so I = Q/t." },
  { q: "Cover the red cell in the Charge triangle. Write the formula." + sTriCover("Q", "I", "t", "right"), answer: "t=Q/I", accepts: ["t=q/i", "t=q÷i"], hint: "Top ÷ the other bottom cell.", explanation: "Covering t leaves Q above I, so t = Q/I." },
  { q: "In the triangle below, which quantity would you calculate by doing <b>top ÷ left</b>?" + sTri("P", "V", "I"), answer: "I (current)", accepts: ["i", "current", "i(current)", "i current"], hint: "Top ÷ left leaves the right-hand cell.", explanation: "Top ÷ left = P ÷ V = I. So you are finding the current." }
],

// ---------- 1.5 CIRCUIT DIAGRAMS ----------
"Sci 1.5: Circuit Diagrams": [
  { q: "Two resistors are connected in <b>series</b>. Find the total resistance. [Answer in Ω]" + sSeries2("16 V", "3 Ω", "5 Ω"), answer: "8 Ω", accepts: ["8Ω", "8 ohm", "8ohms", "8"], hint: "In series, resistances simply add.", explanation: "In series R_total = R₁ + R₂ = 3 + 5 = 8 Ω." },
  { q: "For the same series circuit, find the <b>current</b> flowing. [Answer in A]" + sSeries2("16 V", "3 Ω", "5 Ω"), answer: "2 A", accepts: ["2a", "2 amp", "2amps", "2 ampere", "2"], hint: "Use I = V/R with the TOTAL resistance.", explanation: "I = V/R = 16 / 8 = 2 A. The current is the same everywhere in a series circuit." },
  { q: "For the same series circuit, find the <b>voltage across the 3 Ω resistor</b>. [Answer in V]" + sSeries2("16 V", "3 Ω", "5 Ω"), answer: "6 V", accepts: ["6v", "6 volt", "6volts", "6"], hint: "Use V = IR for that one resistor, with I = 2 A.", explanation: "V = IR = 2 × 3 = 6 V. Check: the 5 Ω resistor takes 2 × 5 = 10 V, and 6 + 10 = 16 V ✓." },
  { q: "The ammeter is in <b>series</b> with the resistor. What does it read? [Answer in A]" + sSeriesAmmeter("12 V", "4 Ω"), answer: "3 A", accepts: ["3a", "3 amp", "3amps", "3"], hint: "I = V/R.", explanation: "I = V/R = 12 / 4 = 3 A. An ammeter is always connected in series because it must have the current pass through it." },
  { q: "The voltmeter is connected <b>in parallel</b> across the resistor. What does it read? [Answer in V]" + sVoltmeter("9 V", "6 Ω"), answer: "9 V", accepts: ["9v", "9 volt", "9volts", "9"], hint: "There is only one component in the loop, so it gets all the supply voltage.", explanation: "With a single resistor the full supply voltage is across it, so the voltmeter reads 9 V. A voltmeter is always connected in parallel." },
  { q: "Two 6 Ω resistors are connected in <b>parallel</b>. Find the total resistance. [Answer in Ω]" + sParallel2("12 V", "6 Ω", "6 Ω"), answer: "3 Ω", accepts: ["3Ω", "3 ohm", "3ohms", "3"], hint: "1/R = 1/R₁ + 1/R₂. For two EQUAL resistors, just halve one of them.", explanation: "1/R = 1/6 + 1/6 = 2/6 = 1/3, so R = 3 Ω. Two equal resistors in parallel give half the resistance." },
  { q: "In the parallel circuit, what is the <b>voltage across each</b> 6 Ω resistor? [Answer in V]" + sParallel2("12 V", "6 Ω", "6 Ω"), answer: "12 V", accepts: ["12v", "12 volt", "12volts", "12"], hint: "Parallel branches are connected directly across the battery.", explanation: "In parallel the voltage across every branch is the same as the supply: 12 V." },
  { q: "In the parallel circuit, find the <b>current in ONE</b> 6 Ω branch. [Answer in A]" + sParallel2("12 V", "6 Ω", "6 Ω"), answer: "2 A", accepts: ["2a", "2 amp", "2amps", "2"], hint: "Use I = V/R with V = 12 V for that branch.", explanation: "I = V/R = 12 / 6 = 2 A in each branch." },
  { q: "In the parallel circuit, find the <b>total current</b> drawn from the battery. [Answer in A]" + sParallel2("12 V", "6 Ω", "6 Ω"), answer: "4 A", accepts: ["4a", "4 amp", "4amps", "4"], hint: "Branch currents add up in parallel.", explanation: "I_total = 2 + 2 = 4 A. Check with the total resistance: 12 / 3 = 4 A ✓." },
  { q: "The ammeter reads 0.5 A and the supply is 6 V. Find the <b>power</b> of the lamp. [Answer in W]" + sLampCircuit("6 V"), answer: "3 W", accepts: ["3w", "3 watt", "3watts", "3"], hint: "P = VI.", explanation: "P = VI = 6 × 0.5 = 3 W." }
],

// ---------- 1.6 MIXED CALCULATIONS ----------
"Sci 1.6: Mixed Calculations": [
  { q: "A 12 V supply is connected to a 4 Ω resistor. Find the current. [Answer in A]", answer: "3 A", accepts: ["3a", "3 amp", "3amps", "3"], hint: "I = V/R.", explanation: "I = V/R = 12 / 4 = 3 A." },
  { q: "A current of 0.5 A flows through a 20 Ω resistor. Find the voltage across it. [Answer in V]", answer: "10 V", accepts: ["10v", "10 volt", "10volts", "10"], hint: "V = IR.", explanation: "V = IR = 0.5 × 20 = 10 V." },
  { q: "A 9 V battery drives a current of 1.5 A through a component. Find its resistance. [Answer in Ω]", answer: "6 Ω", accepts: ["6Ω", "6 ohm", "6ohms", "6"], hint: "R = V/I.", explanation: "R = V/I = 9 / 1.5 = 6 Ω." },
  { q: "A kettle runs on 230 V and draws 2 A. Find its power. [Answer in W]", answer: "460 W", accepts: ["460w", "460 watt", "460watts", "460"], hint: "P = VI.", explanation: "P = VI = 230 × 2 = 460 W." },
  { q: "A 60 W lamp runs from a 12 V supply. Find the current. [Answer in A]", answer: "5 A", accepts: ["5a", "5 amp", "5amps", "5"], hint: "I = P/V.", explanation: "I = P/V = 60 / 12 = 5 A." },
  { q: "A 100 W device draws 0.4 A. Find the voltage it operates at. [Answer in V]", answer: "250 V", accepts: ["250v", "250 volt", "250volts", "250"], hint: "V = P/I.", explanation: "V = P/I = 100 / 0.4 = 250 V." },
  { q: "A current of 2 A flows for 30 s. Find the charge that passes. [Answer in C]", answer: "60 C", accepts: ["60c", "60 coulomb", "60coulombs", "60"], hint: "Q = It.", explanation: "Q = It = 2 × 30 = 60 C." },
  { q: "120 C of charge passes a point in 60 s. Find the current. [Answer in A]", answer: "2 A", accepts: ["2a", "2 amp", "2amps", "2"], hint: "I = Q/t.", explanation: "I = Q/t = 120 / 60 = 2 A." },
  { q: "How long does a 3 A current take to deliver 45 C of charge? [Answer in s]", answer: "15 s", accepts: ["15s", "15 second", "15seconds", "15 sec", "15"], hint: "t = Q/I.", explanation: "t = Q/I = 45 / 3 = 15 s." },
  { q: "A current of 3 A flows through a 5 Ω resistor. Find the power dissipated. [Answer in W]", answer: "45 W", accepts: ["45w", "45 watt", "45watts", "45"], hint: "Use P = I²R, or find V first with V = IR then use P = VI.", explanation: "P = I²R = 3² × 5 = 9 × 5 = 45 W. Check: V = IR = 15 V, P = VI = 15 × 3 = 45 W ✓." }
]

};
