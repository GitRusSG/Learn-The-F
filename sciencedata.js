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
  { q: "Fill in the blank: the symbol <b>V</b> stands for ______.", answer: "Voltage", accepts: ["voltage", "potential difference", "p.d.", "pd", "electrical voltage"], hint: "It is the 'push' that drives charge around a circuit.", explanation: "V = Voltage (also called potential difference). Measured in volts (V)." },
  { q: "Fill in the blank: the symbol <b>I</b> stands for ______.", answer: "Current", accepts: ["current", "electric current", "electrical current"], hint: "It is the rate of flow of charge.", explanation: "I = Current. Measured in amperes (A). The letter I comes from the French 'intensité de courant'." },
  { q: "Fill in the blank: the symbol <b>R</b> stands for ______.", answer: "Resistance", accepts: ["resistance", "electrical resistance"], hint: "It opposes the flow of current.", explanation: "R = Resistance. Measured in ohms (Ω)." },
  { q: "Fill in the blank: the symbol <b>P</b> stands for ______.", answer: "Power", accepts: ["power", "electrical power"], hint: "Energy transferred per second.", explanation: "P = Power. Measured in watts (W). 1 W = 1 joule per second." },
  { q: "Fill in the blank: the symbol <b>Q</b> stands for ______.", answer: "Charge", accepts: ["charge", "electric charge", "electrical charge"], hint: "It is what flows through a wire.", explanation: "Q = Charge. Measured in coulombs (C)." },
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


// ============================================================
// ADDITIONAL SCIENCE QUIZZES — Circuit Symbols & Concepts
// Understanding what symbols mean, what components do,
// conventional current, EMF, push/pull etc.
// ============================================================

// --- Symbol drawing helpers ---------------------------------
function sSymWrap(inner) {
  return `<svg viewBox="0 0 200 100" width="180" style="display:block;margin:10px auto;background:${S_BG};border:1px solid rgba(100,255,218,0.2);border-radius:8px;">${inner}</svg>`;
}
// Cell symbol (single)
function sSym_cell() {
  return sSymWrap(
    sW(30,50,80,50) + sW(120,50,170,50) +
    `<line x1="88" y1="25" x2="88" y2="75" stroke="${S_CY}" stroke-width="3"/>` +
    `<line x1="112" y1="35" x2="112" y2="65" stroke="${S_CY}" stroke-width="3"/>`
  );
}
// Battery symbol (two cells)
function sSym_battery() {
  return sSymWrap(
    sW(20,50,60,50) + sW(140,50,180,50) +
    `<line x1="68" y1="25" x2="68" y2="75" stroke="${S_CY}" stroke-width="3"/>` +
    `<line x1="82" y1="35" x2="82" y2="65" stroke="${S_CY}" stroke-width="3"/>` +
    `<line x1="98" y1="25" x2="98" y2="75" stroke="${S_CY}" stroke-width="3"/>` +
    `<line x1="112" y1="35" x2="112" y2="65" stroke="${S_CY}" stroke-width="3"/>`
  );
}
// Switch (open)
function sSym_switchOpen() {
  return sSymWrap(
    sW(30,50,80,50) + sW(130,50,170,50) +
    `<circle cx="80" cy="50" r="4" fill="${S_CY}"/>` +
    `<circle cx="130" cy="50" r="4" fill="${S_CY}"/>` +
    `<line x1="80" y1="50" x2="120" y2="30" stroke="${S_CY}" stroke-width="2"/>`
  );
}
// Switch (closed)
function sSym_switchClosed() {
  return sSymWrap(
    sW(30,50,80,50) + sW(130,50,170,50) +
    `<circle cx="80" cy="50" r="4" fill="${S_CY}"/>` +
    `<circle cx="130" cy="50" r="4" fill="${S_CY}"/>` +
    `<line x1="80" y1="50" x2="130" y2="50" stroke="${S_CY}" stroke-width="2"/>`
  );
}
// Resistor symbol
function sSym_resistor() {
  return sSymWrap(
    sW(30,50,70,50) + sW(130,50,170,50) +
    `<rect x="70" y="36" width="60" height="28" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>`
  );
}
// Variable resistor (resistor + arrow)
function sSym_varResistor() {
  return sSymWrap(
    sW(30,50,70,50) + sW(130,50,170,50) +
    `<rect x="70" y="36" width="60" height="28" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    `<line x1="80" y1="70" x2="120" y2="30" stroke="${S_CY}" stroke-width="2"/>` +
    `<polygon points="120,30 112,38 118,40" fill="${S_CY}"/>`
  );
}
// Lamp symbol
function sSym_lamp() {
  return sSymWrap(
    sW(30,50,66,50) + sW(134,50,170,50) +
    `<circle cx="100" cy="50" r="16" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    sW(89,39,111,61) + sW(89,61,111,39)
  );
}
// Ammeter
function sSym_ammeter() {
  return sSymWrap(
    sW(30,50,68,50) + sW(132,50,170,50) +
    `<circle cx="100" cy="50" r="18" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    `<text x="100" y="56" text-anchor="middle" fill="${S_CY}" font-size="18" font-family="monospace">A</text>`
  );
}
// Voltmeter
function sSym_voltmeter() {
  return sSymWrap(
    sW(30,50,68,50) + sW(132,50,170,50) +
    `<circle cx="100" cy="50" r="18" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    `<text x="100" y="56" text-anchor="middle" fill="${S_CY}" font-size="18" font-family="monospace">V</text>`
  );
}
// Fuse
function sSym_fuse() {
  return sSymWrap(
    sW(30,50,70,50) + sW(130,50,170,50) +
    `<rect x="70" y="40" width="60" height="20" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    sW(75,50,125,50)
  );
}
// Diode
function sSym_diode() {
  return sSymWrap(
    sW(30,50,80,50) + sW(120,50,170,50) +
    `<polygon points="80,35 80,65 115,50" fill="none" stroke="${S_CY}" stroke-width="2"/>` +
    `<line x1="115" y1="35" x2="115" y2="65" stroke="${S_CY}" stroke-width="2"/>`
  );
}
// LED
function sSym_LED() {
  return sSymWrap(
    sW(30,50,80,50) + sW(120,50,170,50) +
    `<polygon points="80,35 80,65 115,50" fill="none" stroke="${S_CY}" stroke-width="2"/>` +
    `<line x1="115" y1="35" x2="115" y2="65" stroke="${S_CY}" stroke-width="2"/>` +
    `<line x1="105" y1="25" x2="115" y2="15" stroke="${S_CY}" stroke-width="1.5"/>` +
    `<polygon points="115,15 110,20 113,22" fill="${S_CY}"/>` +
    `<line x1="95" y1="28" x2="105" y2="18" stroke="${S_CY}" stroke-width="1.5"/>` +
    `<polygon points="105,18 100,23 103,25" fill="${S_CY}"/>`
  );
}
// Thermistor
function sSym_thermistor() {
  return sSymWrap(
    sW(30,50,70,50) + sW(130,50,170,50) +
    `<rect x="70" y="36" width="60" height="28" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    `<text x="100" y="54" text-anchor="middle" fill="${S_CY}" font-size="11" font-family="monospace">−t°−</text>`
  );
}
// LDR
function sSym_LDR() {
  return sSymWrap(
    sW(30,50,70,50) + sW(130,50,170,50) +
    `<rect x="70" y="36" width="60" height="28" fill="${S_BG}" stroke="${S_CY}" stroke-width="2"/>` +
    `<line x1="75" y1="28" x2="90" y2="18" stroke="${S_CY}" stroke-width="1.5"/>` +
    `<polygon points="90,18 85,23 88,25" fill="${S_CY}"/>` +
    `<line x1="85" y1="31" x2="100" y2="21" stroke="${S_CY}" stroke-width="1.5"/>` +
    `<polygon points="100,21 95,26 98,28" fill="${S_CY}"/>`
  );
}

// ============================================================
// NEW QUIZZES
// ============================================================

scienceQuizzes["Sci 2.1: Circuit Symbols — Identify the Component"] = [
  { q: "Name this component:" + sSym_cell(), answer: "Cell", accepts: ["cell", "battery cell", "single cell"], hint: "One long line and one short line.", explanation: "A cell is a single unit that provides EMF (voltage). Long line = positive terminal, short line = negative terminal." },
  { q: "Name this component:" + sSym_battery(), answer: "Battery", accepts: ["battery", "battery pack", "cells"], hint: "Multiple cells joined together.", explanation: "A battery is two or more cells connected in series. More cells = higher total voltage." },
  { q: "Name this component:" + sSym_switchOpen(), answer: "Open switch", accepts: ["open switch", "switch (open)", "switch open", "switch"], hint: "It has a gap — current cannot flow.", explanation: "An open switch has a break in the circuit. No current flows when the switch is open." },
  { q: "Name this component:" + sSym_resistor(), answer: "Resistor", accepts: ["resistor", "fixed resistor"], hint: "A rectangle on the wire.", explanation: "A resistor opposes the flow of current. It converts electrical energy into heat." },
  { q: "Name this component:" + sSym_varResistor(), answer: "Variable resistor", accepts: ["variable resistor", "rheostat", "potentiometer"], hint: "Resistor with an arrow through it.", explanation: "A variable resistor (rheostat) can be adjusted to change the resistance in a circuit." },
  { q: "Name this component:" + sSym_lamp(), answer: "Lamp", accepts: ["lamp", "bulb", "light bulb", "filament lamp"], hint: "Circle with a cross inside.", explanation: "A lamp converts electrical energy into light (and heat). The cross represents the filament." },
  { q: "Name this component:" + sSym_ammeter(), answer: "Ammeter", accepts: ["ammeter"], hint: "Circle with the letter A.", explanation: "An ammeter measures current (in amperes). It is connected in series." },
  { q: "Name this component:" + sSym_voltmeter(), answer: "Voltmeter", accepts: ["voltmeter"], hint: "Circle with the letter V.", explanation: "A voltmeter measures voltage (potential difference). It is connected in parallel." },
  { q: "Name this component:" + sSym_fuse(), answer: "Fuse", accepts: ["fuse"], hint: "Rectangle with a wire through the middle.", explanation: "A fuse is a safety device. It melts and breaks the circuit if the current is too high." },
  { q: "Name this component:" + sSym_diode(), answer: "Diode", accepts: ["diode"], hint: "Triangle pointing at a bar — current flows in only one direction.", explanation: "A diode allows current to flow in one direction only (in the direction the triangle points)." }
];

scienceQuizzes["Sci 2.2: Circuit Symbols — What They Do"] = [
  { q: "What does a <b>battery</b> do in a circuit?", answer: "Provides EMF (pushes charge around the circuit)", accepts: ["provides emf", "pushes current", "pushes charge", "provides voltage", "provides energy", "supplies energy", "supplies voltage"], hint: "It's the 'push' that drives everything.", explanation: "A battery provides electromotive force (EMF). It 'pushes' charge carriers around the circuit by converting chemical energy into electrical energy." },
  { q: "What does a <b>resistor</b> do?", answer: "Opposes the flow of current", accepts: ["opposes current", "opposes the flow of current", "resists current", "reduces current", "limits current"], hint: "It 'resists' the current.", explanation: "A resistor opposes/limits the flow of current. Energy is transferred to heat as charge flows through it." },
  { q: "What does a <b>switch</b> do?", answer: "Opens or closes the circuit", accepts: ["opens or closes the circuit", "breaks or completes the circuit", "controls current flow", "turns circuit on or off", "makes or breaks circuit"], hint: "It either lets current flow or stops it.", explanation: "A switch opens (breaks) or closes (completes) a circuit, controlling whether current can flow." },
  { q: "What does a <b>fuse</b> do?", answer: "Breaks the circuit if current is too high", accepts: ["breaks the circuit if current is too high", "protects circuit from overcurrent", "melts if current too high", "safety device", "breaks circuit when overloaded"], hint: "It's a safety device that melts.", explanation: "A fuse contains a thin wire that melts if the current exceeds a safe level, breaking the circuit to prevent damage or fire." },
  { q: "What does a <b>diode</b> do?", answer: "Allows current to flow in one direction only", accepts: ["allows current in one direction", "allows current to flow in one direction only", "one way current", "one direction only"], hint: "Think of it as a one-way valve.", explanation: "A diode only allows conventional current to flow in one direction — from the anode (triangle) to the cathode (bar)." },
  { q: "What does an <b>LED</b> do?", answer: "Emits light when current flows through it (one direction only)", accepts: ["emits light", "produces light", "lights up", "gives off light when current flows", "light emitting diode"], hint: "It's a diode that glows.", explanation: "An LED (Light Emitting Diode) emits light when forward-biased. Like a normal diode, it only works in one direction." },
  { q: "What does a <b>thermistor</b> do?", answer: "Its resistance changes with temperature", accepts: ["resistance changes with temperature", "resistance decreases as temperature increases", "temperature dependent resistor", "senses temperature"], hint: "Its name contains 'therm' (heat).", explanation: "A thermistor's resistance decreases as temperature increases (for NTC type). Used in temperature sensors." },
  { q: "What does an <b>LDR</b> do?", answer: "Its resistance changes with light intensity", accepts: ["resistance changes with light", "resistance decreases as light increases", "light dependent resistor", "senses light"], hint: "LDR = Light Dependent Resistor.", explanation: "An LDR's resistance decreases as light intensity increases. Used in light-sensing circuits (e.g. automatic streetlights)." },
  { q: "How must an <b>ammeter</b> be connected?", answer: "In series", accepts: ["in series", "series"], hint: "All the current must flow through it to be measured.", explanation: "An ammeter MUST be in series so that all the current passes through it. It has very low resistance so it doesn't affect the circuit." },
  { q: "How must a <b>voltmeter</b> be connected?", answer: "In parallel", accepts: ["in parallel", "parallel"], hint: "It measures the difference between two points.", explanation: "A voltmeter MUST be in parallel across the component it measures. It has very high resistance so minimal current is diverted through it." }
];

scienceQuizzes["Sci 2.3: Current, EMF & Energy Concepts"] = [
  { q: "What is <b>conventional current</b>? Which direction does it flow?", answer: "From positive to negative terminal", accepts: ["from positive to negative", "positive to negative", "from + to -", "+ to -"], hint: "It's the historical direction chosen before electrons were discovered.", explanation: "Conventional current flows from the positive terminal of the battery, through the circuit, to the negative terminal. (Actual electron flow is the opposite.)" },
  { q: "What is <b>electron flow</b>? Which direction?", answer: "From negative to positive terminal", accepts: ["from negative to positive", "negative to positive", "from - to +", "- to +"], hint: "Electrons are negative, so they are pushed away from the negative terminal.", explanation: "Electrons flow from the negative terminal to the positive terminal — the opposite direction to conventional current." },
  { q: "What does <b>EMF</b> stand for?", answer: "Electromotive force", accepts: ["electromotive force", "electro motive force"], hint: "It's the 'push' that a battery provides.", explanation: "EMF = Electromotive Force. It is the energy per unit charge supplied by the battery (measured in volts)." },
  { q: "Is EMF actually a force?", answer: "No", accepts: ["no", "n", "false"], hint: "Despite its name...", explanation: "No. Despite the name, EMF is not a force — it is a voltage (energy per unit charge, measured in volts). The name is historical." },
  { q: "What happens to current at a junction where a wire splits into two branches?", answer: "It splits (the total current in = total current out)", accepts: ["it splits", "splits", "divides", "current in equals current out", "conserved"], hint: "Think of water splitting at a fork in a pipe.", explanation: "At a junction, current splits between branches. By Kirchhoff's Current Law: total current in = total current out. Current is conserved." },
  { q: "In a series circuit, the current is ______ everywhere.", answer: "the same", accepts: ["the same", "same", "constant", "equal"], hint: "There is only one path for current to flow.", explanation: "In series, all components share the same single path, so current is identical at every point." },
  { q: "In a parallel circuit, the voltage across each branch is ______.", answer: "the same", accepts: ["the same", "same", "equal", "constant"], hint: "Each branch is connected directly across the battery.", explanation: "In parallel, each branch is connected directly to the supply terminals, so each branch has the same voltage across it." },
  { q: "What does 'potential difference' mean in simple terms?", answer: "The energy transferred per unit charge between two points", accepts: ["energy per unit charge", "energy transferred per unit charge", "voltage", "difference in energy per coulomb", "energy difference per charge"], hint: "It's another name for voltage.", explanation: "Potential difference (p.d.) = the energy transferred per coulomb of charge as it moves between two points. Unit: volt (V). 1 V = 1 J/C." },
  { q: "A battery 'pushes' charge. What does a resistor do to the charge?", answer: "It takes energy from the charge (converts it to heat)", accepts: ["takes energy", "removes energy", "converts energy to heat", "transfers energy to heat", "dissipates energy", "uses up energy"], hint: "The charge loses energy as it passes through.", explanation: "A resistor takes energy FROM the moving charges and converts it into heat. The charges slow down (higher resistance = more energy lost per coulomb)." },
  { q: "If a 12 V battery is connected to a single resistor, what is the voltage across the resistor?", answer: "12 V", accepts: ["12", "12v", "12 v", "12 volt", "12 volts"], hint: "In a simple single-loop circuit, the resistor gets all the supply voltage.", explanation: "With only one component, the full supply EMF appears across it: 12 V. (Energy given to each coulomb by the battery = energy taken from each coulomb by the resistor.)" }
];

scienceQuizzes["Sci 2.4: Series vs Parallel — Rules"] = [
  { q: "In a <b>series</b> circuit with a 12 V battery and two identical lamps, what is the voltage across each lamp?", answer: "6 V", accepts: ["6", "6v", "6 v", "6 volt"], hint: "The voltage divides equally between identical components.", explanation: "In series, voltages add up to the supply. Two identical lamps share equally: 12/2 = 6 V each." },
  { q: "In a <b>parallel</b> circuit with a 9 V battery and two branches, what is the voltage across each branch?", answer: "9 V", accepts: ["9", "9v", "9 v", "9 volt"], hint: "Each branch is directly across the battery.", explanation: "In parallel, every branch has the full supply voltage: 9 V." },
  { q: "A series circuit has a 6 V battery and a current of 2 A. A second identical resistor is added in series. What happens to the current?", answer: "It halves (becomes 1 A)", accepts: ["halves", "it halves", "decreases", "1 a", "1a", "1", "becomes 1 a", "goes down"], hint: "More resistance in series = less current.", explanation: "Adding a second identical resistor doubles the total resistance. I = V/R, so current halves: 6/(2R) → from 2 A to 1 A." },
  { q: "A parallel circuit has a 12 V battery and one 6 Ω resistor. A second 6 Ω resistor is added in parallel. What happens to the total current?", answer: "It doubles", accepts: ["doubles", "it doubles", "increases", "goes up"], hint: "Each branch draws its own current independently.", explanation: "Each 6 Ω branch draws 12/6 = 2 A. With two branches: total = 2 + 2 = 4 A (doubled from the original 2 A)." },
  { q: "What happens to the other lamps if one lamp blows in a <b>series</b> circuit?", answer: "They all go out", accepts: ["they all go out", "all go out", "all stop working", "circuit breaks", "all off"], hint: "There is only one path for current.", explanation: "In series there is only one path. If one lamp blows, the circuit is broken and NO current flows — all lamps go out." },
  { q: "What happens to the other lamps if one lamp blows in a <b>parallel</b> circuit?", answer: "The others stay on", accepts: ["others stay on", "the others stay on", "they stay on", "nothing", "rest stay lit", "still work"], hint: "Each branch is independent.", explanation: "In parallel, each branch is independent. If one lamp blows, current still flows through the other branches — they stay on." },
  { q: "Three resistors of 2 Ω, 3 Ω and 5 Ω are connected in series. Find the total resistance.", answer: "10 Ω", accepts: ["10", "10 ohm", "10ohm", "10Ω"], hint: "In series, resistances simply add.", explanation: "R_total = 2 + 3 + 5 = 10 Ω." },
  { q: "Two resistors of 4 Ω are connected in parallel. Find the total resistance.", answer: "2 Ω", accepts: ["2", "2 ohm", "2ohm", "2Ω"], hint: "Two equal resistors in parallel = half of one.", explanation: "1/R = 1/4 + 1/4 = 2/4 = 1/2. R = 2 Ω. (Or shortcut: two equal resistors in parallel → halve it.)" },
  { q: "Why are household appliances connected in <b>parallel</b>, not series?", answer: "So each gets full voltage and can be switched on/off independently", accepts: ["each gets full voltage", "independent", "can be switched independently", "full voltage", "each works independently"], hint: "Think about what happens when you turn off your TV — does your fridge turn off too?", explanation: "Parallel ensures: (1) each appliance gets the full mains voltage, (2) they can be switched on/off independently, (3) if one fails the others still work." },
  { q: "In a series circuit, which quantity is the SAME through every component: current or voltage?", answer: "Current", accepts: ["current", "i", "the current"], hint: "There's only one path for charge to flow.", explanation: "Current is the same everywhere in a series circuit (one path). Voltage divides between components." }
];


scienceQuizzes["Sci 2.5: Definitions — What Does It All Mean?"] = [
  { q: "What is <b>electric current</b>?", answer: "The rate of flow of charge", accepts: ["rate of flow of charge", "flow of charge", "charge per second", "rate of flow of electric charge", "flow of electrons"], hint: "How much charge passes a point each second.", explanation: "Electric current is the rate of flow of charge past a point. I = Q/t. Unit: ampere (A). 1 A = 1 coulomb per second." },
  { q: "What is <b>voltage</b> (potential difference)?", answer: "The energy transferred per unit charge", accepts: ["energy per unit charge", "energy transferred per unit charge", "energy per coulomb", "work done per unit charge", "energy difference per charge"], hint: "How much energy each coulomb of charge carries between two points.", explanation: "Voltage (p.d.) is the energy transferred per coulomb of charge between two points. V = W/Q. Unit: volt (V). 1 V = 1 J/C." },
  { q: "What is <b>resistance</b>?", answer: "A measure of how much a component opposes current", accepts: ["how much a component opposes current", "opposition to current", "opposition to flow of current", "measure of opposition to current"], hint: "The higher it is, the harder it is for current to flow.", explanation: "Resistance measures how much a component opposes the flow of current. R = V/I. Unit: ohm (Ω). Higher resistance → less current for the same voltage." },
  { q: "What is <b>charge</b>?", answer: "A property of matter that causes it to experience a force in an electric field", accepts: ["property of matter", "what flows in a circuit", "quantity of electricity", "electrons flowing"], hint: "It is what flows through a wire — measured in coulombs.", explanation: "Electric charge (Q) is carried by electrons in a circuit. Q = It. Unit: coulomb (C). 1 C = the charge delivered by 1 A in 1 second." },
  { q: "What is <b>power</b>?", answer: "The rate of energy transfer", accepts: ["rate of energy transfer", "energy per second", "energy transferred per second", "rate of doing work"], hint: "How quickly energy is used — like a 60 W bulb vs a 100 W bulb.", explanation: "Power is the rate at which energy is transferred (or work is done). P = E/t = VI. Unit: watt (W). 1 W = 1 J/s." },
  { q: "What is <b>EMF</b> (electromotive force)?", answer: "The energy per unit charge supplied by the source", accepts: ["energy per unit charge supplied by the source", "energy supplied per coulomb", "voltage supplied by battery", "energy given to each coulomb by the battery"], hint: "It's the battery's 'push' — the energy it gives to each coulomb.", explanation: "EMF is the energy per coulomb given to charges by the power source (battery/cell). It is NOT a force despite the name. Measured in volts." },
  { q: "What is the difference between EMF and potential difference?", answer: "EMF is energy given by the source; p.d. is energy used by a component", accepts: ["emf is energy given, pd is energy used", "emf supplied by source pd used by component", "emf is supply pd is drop"], hint: "One gives energy, the other takes it away.", explanation: "EMF = energy per coulomb supplied by the source. P.D. = energy per coulomb converted (used up) by a component. Both measured in volts." },
  { q: "What does <b>1 ampere</b> mean?", answer: "1 coulomb of charge flowing per second", accepts: ["1 coulomb per second", "1 c per second", "1c/s", "one coulomb per second", "1 coulomb of charge per second"], hint: "It links current to charge and time.", explanation: "1 A means 1 coulomb of charge passes a point every second. I = Q/t, so 1 A = 1 C/s." },
  { q: "What does <b>1 volt</b> mean?", answer: "1 joule of energy per coulomb of charge", accepts: ["1 joule per coulomb", "1 j per coulomb", "1j/c", "one joule per coulomb", "1 joule of energy per coulomb"], hint: "It links voltage to energy and charge.", explanation: "1 V means each coulomb of charge transfers 1 joule of energy. V = W/Q, so 1 V = 1 J/C." },
  { q: "What does <b>1 ohm</b> mean?", answer: "The resistance when 1 V drives a current of 1 A", accepts: ["1 volt drives 1 amp", "when 1v causes 1a", "1v per 1a", "resistance of 1v/1a", "v/a"], hint: "It links resistance to voltage and current (Ohm's Law).", explanation: "1 Ω means that a potential difference of 1 V across the component causes a current of 1 A to flow. R = V/I, so 1 Ω = 1 V/A." }
];


scienceQuizzes["Sci 2.6: Potential Difference In Depth"] = [
  { q: "What is another name for <b>potential difference</b>?", answer: "Voltage", accepts: ["voltage", "p.d.", "pd", "electromotive force"], hint: "The everyday word we use for it.", explanation: "Potential difference is commonly called voltage. Symbol: V. Unit: volt (V)." },
  { q: "Potential difference is the energy transferred per unit ______.", answer: "charge", accepts: ["charge", "coulomb"], hint: "Energy per ______ (the thing that flows).", explanation: "P.D. = energy transferred per unit charge. V = W/Q (joules per coulomb)." },
  { q: "If 60 J of energy is transferred when 5 C of charge passes through a resistor, what is the p.d.?", answer: "12 V", accepts: ["12", "12v", "12 v", "12 volt"], hint: "V = W/Q = 60/5.", explanation: "V = W/Q = 60 J / 5 C = 12 V." },
  { q: "A lamp has a p.d. of 6 V across it and 3 C of charge flows through. How much energy is transferred?", answer: "18 J", accepts: ["18", "18j", "18 j", "18 joules"], hint: "W = V × Q.", explanation: "W = VQ = 6 × 3 = 18 J." },
  { q: "In a series circuit with a 9 V battery, one resistor has 4 V across it. What is the p.d. across the other?", answer: "5 V", accepts: ["5", "5v", "5 v", "5 volt"], hint: "In series, voltages add up to the supply.", explanation: "Voltages in series add to the EMF: 4 + V₂ = 9, so V₂ = 5 V." },
  { q: "Where is the p.d. largest — across a large resistance or a small resistance (same current)?", answer: "Large resistance", accepts: ["large resistance", "larger resistance", "large", "bigger resistance", "higher resistance"], hint: "V = IR. If I is the same, bigger R means bigger V.", explanation: "V = IR. With the same current, the larger resistance has the larger voltage drop across it." },
  { q: "What does a voltmeter actually measure?", answer: "The energy difference per coulomb between two points", accepts: ["energy difference per coulomb", "potential difference", "voltage across a component", "energy transferred per coulomb"], hint: "It compares the energy of charge at one point to another.", explanation: "A voltmeter measures how much energy each coulomb of charge loses (or gains) between the two points it is connected across." },
  { q: "A 3 V battery is connected to two lamps in series. Lamp A has 1.2 V across it. What is the p.d. across Lamp B?", answer: "1.8 V", accepts: ["1.8", "1.8v", "1.8 v", "1.8 volt"], hint: "3 − 1.2 = ?", explanation: "In series: V_A + V_B = EMF. V_B = 3 − 1.2 = 1.8 V." },
  { q: "If the p.d. across a component is 0 V, what does that tell you?", answer: "No energy is being transferred by that component", accepts: ["no energy transferred", "no energy is transferred", "no energy used", "it does nothing", "zero energy transfer"], hint: "V = 0 means 0 joules per coulomb.", explanation: "0 V means charge passes through without losing or gaining energy — the component isn't doing any work (e.g. a wire with negligible resistance)." },
  { q: "Why is p.d. measured in <b>parallel</b> (not series)?", answer: "Because it measures the difference between two points on either side of the component", accepts: ["measures difference between two points", "compares two points", "needs to be across the component", "it compares energy at two points"], hint: "You need to connect to BOTH sides of the component at the same time.", explanation: "P.D. is the energy difference between two points. The voltmeter must touch both sides of the component simultaneously, which means it sits in parallel across it." }
];

scienceQuizzes["Sci 2.7: Answering Skills — How to Tackle Electricity Questions"] = [
  { q: "You are given V and R and asked to find I. Which formula do you use?", answer: "I = V/R", accepts: ["i=v/r", "i = v/r", "i=v÷r", "v/r"], hint: "Cover I on the Ohm's Law triangle.", explanation: "Given V and R, use Ohm's Law: I = V/R. Always write the formula first, then substitute." },
  { q: "You are given I and t and asked to find Q. Which formula do you use?", answer: "Q = It", accepts: ["q=it", "q = it", "q=i×t", "it"], hint: "Cover Q on the Charge triangle.", explanation: "Given I and t, use Q = It. Remember t must be in seconds." },
  { q: "You are given P and I and asked to find V. Which formula do you use?", answer: "V = P/I", accepts: ["v=p/i", "v = p/i", "v=p÷i", "p/i"], hint: "Cover V on the Power triangle.", explanation: "Given P and I, use V = P/I from the Power triangle (P = VI rearranged)." },
  { q: "A question gives you V = 12 V and I = 3 A and asks for power. What TWO steps do you write?",
    answer: "P = VI, P = 12 × 3 = 36 W",
    accepts: ["p=vi,p=12×3=36w", "p=vi, p=36w", "p = vi = 12 x 3 = 36 w", "36", "36w", "36 w"],
    hint: "Step 1: write the formula. Step 2: substitute and calculate.",
    explanation: "Step 1: Write formula → P = VI. Step 2: Substitute → P = 12 × 3 = 36 W. Always show both steps for full marks." },
  { q: "You see the word 'charge' in a question. Which triangle should you think of?", answer: "Q/It triangle (Charge triangle)", accepts: ["charge triangle", "q/it", "qit", "q = it triangle", "charge"], hint: "Q, I and t live together.", explanation: "When you see 'charge' (Q), think of the Charge triangle: Q = It, I = Q/t, t = Q/I." },
  { q: "A question says 'the lamp is rated at 60 W'. What does 'rated' mean?", answer: "The power it uses under normal operating conditions", accepts: ["power it uses normally", "normal operating power", "power at normal voltage", "its designed power"], hint: "It's the intended/designed value.", explanation: "'Rated 60 W' means the lamp is designed to use 60 watts when connected to its correct voltage. Use this as P in calculations." },
  { q: "What is the FIRST thing you should do when you see a circuit calculation question?",
    answer: "Identify what you are given (V, I, R, P, Q, t) and what you need to find",
    accepts: ["identify given and find", "list given quantities", "write down known values", "identify what you know and what you need", "list knowns"],
    hint: "Before you can pick a formula, you need to know what you have.",
    explanation: "Step 1: List the KNOWN values (with units). Step 2: Identify the UNKNOWN. Step 3: Pick the formula that links them. Step 4: Substitute and solve." },
  { q: "You need to find resistance but are given P = 100 W and I = 2 A (no V given). What do you do?",
    answer: "Use P = I²R, then R = P/I²",
    accepts: ["p=i^2r", "r=p/i^2", "r=p/i²", "use p=i²r", "p = i squared r"],
    hint: "There is a combined formula that links P, I and R without needing V.",
    explanation: "Since V is not given, use P = I²R (derived from P = VI and V = IR). Rearrange: R = P/I² = 100/4 = 25 Ω." },
  { q: "In a series circuit problem, you find the current first. Why?",
    answer: "Because current is the same everywhere in series, so you can use it for every component",
    accepts: ["current is same everywhere", "current same in series", "it is the same for all components", "same current through all"],
    hint: "What's special about current in series?",
    explanation: "In series, current is IDENTICAL at every point. So once you find I (using total V and total R), you can use that same I to find the voltage across each individual resistor: V = IR." },
  { q: "You get a weird number like 0.666... A. How should you write it in your final answer?",
    answer: "As a fraction (2/3 A) or rounded to 3 significant figures (0.667 A)",
    accepts: ["fraction", "2/3", "2/3 a", "0.667", "3 significant figures", "3sf", "3 s.f."],
    hint: "Fractions are exact; if you round, use 3 s.f.",
    explanation: "Give exact fractions where possible (2/3 A). If you must round, use 3 significant figures (0.667 A). Never write 0.66666666... — the marker wants a clean answer." }
];


scienceQuizzes["Sci 2.8: Parallel Resistor Shortcut"] = [
  { q: "What is the shortcut formula for <b>two</b> resistors in parallel?", answer: "R = (R₁×R₂)/(R₁+R₂)", accepts: ["r=(r1xr2)/(r1+r2)","r=r1r2/(r1+r2)","r1r2/(r1+r2)","product over sum","(r1×r2)/(r1+r2)","r1*r2/(r1+r2)"], hint: "Multiply on top, add on the bottom.", explanation: "For TWO resistors in parallel: R = (R₁ × R₂) / (R₁ + R₂). 'Product over sum.' Only works for exactly two resistors." },
  { q: "Two resistors: 8 Ω and 4 Ω in parallel. Find total resistance.", answer: "2.67 Ω", accepts: ["2.67","2.67Ω","2.67 ohm","8/3","2.7"], hint: "R = (8×4)/(8+4) = 32/12.", explanation: "R = (8×4)/(8+4) = 32/12 = 2.67 Ω (or 8/3 Ω)." },
  { q: "Two resistors: 6 Ω and 3 Ω in parallel. Find total resistance.", answer: "2 Ω", accepts: ["2","2Ω","2 ohm"], hint: "R = (6×3)/(6+3).", explanation: "R = (6×3)/(6+3) = 18/9 = 2 Ω." },
  { q: "Two resistors: 10 Ω and 10 Ω in parallel. Find total resistance.", answer: "5 Ω", accepts: ["5","5Ω","5 ohm"], hint: "Two equal resistors in parallel = half of one.", explanation: "R = (10×10)/(10+10) = 100/20 = 5 Ω. Shortcut: two equal → halve it." },
  { q: "Two resistors: 12 Ω and 4 Ω in parallel. Find total resistance.", answer: "3 Ω", accepts: ["3","3Ω","3 ohm"], hint: "R = (12×4)/(12+4).", explanation: "R = (12×4)/(12+4) = 48/16 = 3 Ω." },
  { q: "Two resistors: 20 Ω and 5 Ω in parallel. Find total resistance.", answer: "4 Ω", accepts: ["4","4Ω","4 ohm"], hint: "R = (20×5)/(20+5).", explanation: "R = (20×5)/(20+5) = 100/25 = 4 Ω." },
  { q: "Does the 'product over sum' shortcut work for 3 resistors?", answer: "No (only for exactly 2)", accepts: ["no","false","n","only 2","only for 2"], hint: "For 3+ you must use 1/R = 1/R₁ + 1/R₂ + 1/R₃.", explanation: "No. Product/sum only works for exactly 2 resistors. For 3 or more, use the full formula: 1/R = 1/R₁ + 1/R₂ + 1/R₃..." },
  { q: "A 6 V battery is connected to 8 Ω and 4 Ω in parallel. Find the total current.", answer: "2.25 A", accepts: ["2.25","2.25a","2.25 a","2.3","9/4"], hint: "First find R total (product/sum), then I = V/R.", explanation: "R = 32/12 = 8/3 Ω. I = V/R = 6 ÷ (8/3) = 6 × 3/8 = 18/8 = 2.25 A." },
  { q: "Is the total resistance of a parallel combination always LESS than the smallest resistor?", answer: "Yes", accepts: ["yes","y","true"], hint: "Adding a parallel path always makes it easier for current to flow.", explanation: "Yes — always. Adding parallel paths gives current MORE ways to flow, so total resistance drops below even the smallest individual resistor." },
  { q: "Two resistors: 3 Ω and 6 Ω in parallel. Which carries more current?", answer: "The 3 Ω resistor", accepts: ["3 ohm","3Ω","the 3 ohm","the smaller one","3"], hint: "In parallel, voltage is the same across both. I = V/R → smaller R = bigger I.", explanation: "Same voltage across both (parallel). I = V/R. Smaller R (3 Ω) → larger current. The 3 Ω carries twice the current of the 6 Ω." }
];
