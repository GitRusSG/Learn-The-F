// ============================================================
// UNIT 3 — Extra quizzes (5 more) + Unit 4.4 Completing the Square
// ============================================================

const extraMathQuizzes = {

"Unit 3 Quiz 2: Special Identities": [
  {q:"Expand: (a+b)²", answer:"a²+2ab+b²", accepts:["a^2+2ab+b^2","a²+2ab+b²"], hint:"Square the first, plus twice the product, plus square the last.", explanation:"(a+b)² = a² + 2ab + b²"},
  {q:"Expand: (x-7)²", answer:"x²-14x+49", accepts:["x^2-14x+49","x²-14x+49"], hint:"(a-b)² = a²-2ab+b². Here a=x, b=7.", explanation:"(x-7)² = x² - 2(x)(7) + 7² = x² - 14x + 49"},
  {q:"Expand: (3x+2)²", answer:"9x²+12x+4", accepts:["9x^2+12x+4","9x²+12x+4"], hint:"a=3x, b=2. Remember to square the WHOLE term: (3x)²=9x².", explanation:"(3x+2)² = 9x² + 2(3x)(2) + 4 = 9x² + 12x + 4"},
  {q:"Expand: (2x-5)²", answer:"4x²-20x+25", accepts:["4x^2-20x+25","4x²-20x+25"], hint:"a=2x, b=5. Middle term is -2(2x)(5)=-20x.", explanation:"(2x-5)² = 4x² - 20x + 25"},
  {q:"Expand: (x+4)(x-4)", answer:"x²-16", accepts:["x^2-16","x²-16"], hint:"(a+b)(a-b) = a²-b².", explanation:"(x+4)(x-4) = x² - 16. Difference of two squares."},
  {q:"Expand: (3a+7b)(3a-7b)", answer:"9a²-49b²", accepts:["9a^2-49b^2","9a²-49b²"], hint:"(A+B)(A-B) = A²-B². A=3a, B=7b.", explanation:"(3a)² - (7b)² = 9a² - 49b²"},
  {q:"Which identity does x²+6x+9 match?", answer:"(a+b)² where a=x, b=3", accepts:["(x+3)^2","(x+3)²","perfect square","(a+b)^2"], hint:"Is it a²+2ab+b²? Check: √x²=x, √9=3, 2(x)(3)=6x ✓", explanation:"x²+6x+9 = (x+3)². Perfect square trinomial."},
  {q:"Which identity does 4x²-25 match?", answer:"(a+b)(a-b) where a=2x, b=5", accepts:["difference of two squares","(2x+5)(2x-5)","a^2-b^2","(a+b)(a-b)"], hint:"It's A² - B² with no middle term.", explanation:"4x²-25 = (2x)²-5² = (2x+5)(2x-5). Difference of squares."},
  {q:"Expand and simplify: (x+3)² - (x-3)²", answer:"12x", accepts:["12x"], hint:"Expand both squares OR use a²-b² = (a+b)(a-b) with a=(x+3), b=(x-3).", explanation:"(x+3+x-3)(x+3-x+3) = (2x)(6) = 12x. Or expand: x²+6x+9-x²+6x-9 = 12x."},
  {q:"Expand: (x+y+z)²", answer:"x²+y²+z²+2xy+2xz+2yz", accepts:["x^2+y^2+z^2+2xy+2xz+2yz","x²+y²+z²+2xy+2xz+2yz","x^2+y^2+z^2+2xy+2yz+2xz"], hint:"Square each + twice every pair.", explanation:"(x+y+z)² = x²+y²+z²+2xy+2xz+2yz. Every term multiplied by every other term."}
],

"Unit 3 Quiz 3: Factorisation": [
  {q:"Factorise: 6x+18", answer:"6(x+3)", accepts:["6(x+3)"], hint:"What's the HCF of 6 and 18?", explanation:"HCF = 6. So 6x+18 = 6(x+3)."},
  {q:"Factorise: 4x²-12x", answer:"4x(x-3)", accepts:["4x(x-3)"], hint:"HCF of 4x² and 12x is 4x.", explanation:"4x²-12x = 4x(x-3)."},
  {q:"Factorise: x²+7x+12", answer:"(x+3)(x+4)", accepts:["(x+3)(x+4)","(x+4)(x+3)"], hint:"Find two numbers that multiply to 12 and add to 7.", explanation:"3×4=12 and 3+4=7. So (x+3)(x+4)."},
  {q:"Factorise: x²-5x+6", answer:"(x-2)(x-3)", accepts:["(x-2)(x-3)","(x-3)(x-2)"], hint:"Two numbers that multiply to +6 and add to -5. Both negative.", explanation:"-2×-3=6 and -2+(-3)=-5. So (x-2)(x-3)."},
  {q:"Factorise: x²-x-20", answer:"(x-5)(x+4)", accepts:["(x-5)(x+4)","(x+4)(x-5)"], hint:"Multiply to -20, add to -1. Try -5 and +4.", explanation:"-5×4=-20 and -5+4=-1. So (x-5)(x+4)."},
  {q:"Factorise: x²-49", answer:"(x+7)(x-7)", accepts:["(x+7)(x-7)","(x-7)(x+7)"], hint:"Difference of two squares: a²-b² = (a+b)(a-b).", explanation:"x²-49 = x²-7² = (x+7)(x-7)."},
  {q:"Factorise: 2x²+7x+3", answer:"(2x+1)(x+3)", accepts:["(2x+1)(x+3)","(x+3)(2x+1)"], hint:"Cross method: factors of 2x² are 2x and x. Factors of 3 that give 7x middle.", explanation:"(2x+1)(x+3) = 2x²+6x+x+3 = 2x²+7x+3 ✓"},
  {q:"Factorise: 3x²-10x-8", answer:"(3x+2)(x-4)", accepts:["(3x+2)(x-4)","(x-4)(3x+2)"], hint:"Product = 3×(-8) = -24. Sum = -10. Try +2 and -12.", explanation:"3x²+2x-12x-8 = x(3x+2)-4(3x+2) = (3x+2)(x-4)."},
  {q:"Factorise: 4x²-9", answer:"(2x+3)(2x-3)", accepts:["(2x+3)(2x-3)","(2x-3)(2x+3)"], hint:"(2x)² - 3² = difference of squares.", explanation:"4x²-9 = (2x)²-3² = (2x+3)(2x-3)."},
  {q:"Factorise completely: 2x³-8x", answer:"2x(x+2)(x-2)", accepts:["2x(x+2)(x-2)","2x(x-2)(x+2)"], hint:"First take out HCF (2x), then factorise x²-4.", explanation:"2x³-8x = 2x(x²-4) = 2x(x+2)(x-2)."}
],

"Unit 3 Quiz 4: Algebraic Fractions": [
  {q:"Simplify: (x²-4)/(x+2)", answer:"x-2", accepts:["x-2"], hint:"Factorise the numerator first (difference of squares).", explanation:"(x²-4)/(x+2) = (x+2)(x-2)/(x+2) = x-2."},
  {q:"Simplify: (2x²+6x)/(4x)", answer:"(x+3)/2", accepts:["(x+3)/2","x+3/2"], hint:"Factor top: 2x(x+3). Then cancel with 4x.", explanation:"2x(x+3)/(4x) = (x+3)/2."},
  {q:"Simplify: (x²+3x+2)/(x²+x)", answer:"(x+2)/x", accepts:["(x+2)/x","x+2/x"], hint:"Factor both: top = (x+1)(x+2), bottom = x(x+1).", explanation:"(x+1)(x+2)/(x(x+1)) = (x+2)/x."},
  {q:"Add: 1/x + 1/(x+1)", answer:"(2x+1)/(x(x+1))", accepts:["(2x+1)/(x(x+1))","(2x+1)/x(x+1)"], hint:"LCD = x(x+1). Multiply each fraction.", explanation:"(x+1+x)/(x(x+1)) = (2x+1)/(x(x+1))."},
  {q:"Subtract: 3/(x-1) - 2/(x+1)", answer:"(x+5)/((x-1)(x+1))", accepts:["(x+5)/((x-1)(x+1))","(x+5)/(x-1)(x+1)","(x+5)/(x^2-1)"], hint:"LCD = (x-1)(x+1). Cross-multiply.", explanation:"(3(x+1)-2(x-1))/((x-1)(x+1)) = (3x+3-2x+2)/((x-1)(x+1)) = (x+5)/(x²-1)."},
  {q:"Simplify: (x²-9)/(x²-x-6)", answer:"(x+3)/(x+2)", accepts:["(x+3)/(x+2)"], hint:"Factor both: top = (x+3)(x-3), bottom = (x-3)(x+2).", explanation:"(x+3)(x-3)/((x-3)(x+2)) = (x+3)/(x+2). Cancel (x-3)."},
  {q:"Multiply: (x/3) × (6/(x²))", answer:"2/x", accepts:["2/x"], hint:"Multiply tops and bottoms: 6x/(3x²). Then simplify.", explanation:"x×6/(3×x²) = 6x/(3x²) = 2/x."},
  {q:"Divide: (4x)/(x+1) ÷ (2x)/(x+1)", answer:"2", accepts:["2"], hint:"Dividing = flip and multiply.", explanation:"(4x/(x+1)) × ((x+1)/2x) = 4x/2x = 2."},
  {q:"Express as a single fraction: x - 1/x", answer:"(x²-1)/x", accepts:["(x^2-1)/x","(x²-1)/x"], hint:"Rewrite x as x/1, then LCD = x.", explanation:"x/1 - 1/x = x²/x - 1/x = (x²-1)/x."},
  {q:"Simplify: (2x²-8)/(x²-4x+4)", answer:"(2(x+2))/(x-2)", accepts:["2(x+2)/(x-2)","(2x+4)/(x-2)","2(x+2)/(x-2)"], hint:"Top: 2(x²-4)=2(x+2)(x-2). Bottom: (x-2)².", explanation:"2(x+2)(x-2)/(x-2)² = 2(x+2)/(x-2)."}
],

"Unit 3 Quiz 5: Change of Subject": [
  {q:"Make x the subject: y = 3x + 7", answer:"x = (y-7)/3", accepts:["x=(y-7)/3","(y-7)/3"], hint:"Subtract 7, then divide by 3.", explanation:"y-7 = 3x → x = (y-7)/3."},
  {q:"Make r the subject: A = πr²", answer:"r = √(A/π)", accepts:["r=sqrt(a/pi)","r=√(a/π)","sqrt(a/pi)","√(a/π)"], hint:"Divide by π, then square root.", explanation:"A/π = r² → r = √(A/π)."},
  {q:"Make a the subject: v = u + at", answer:"a = (v-u)/t", accepts:["a=(v-u)/t","(v-u)/t"], hint:"Subtract u, then divide by t.", explanation:"v-u = at → a = (v-u)/t."},
  {q:"Make x the subject: y = (x+3)/5", answer:"x = 5y - 3", accepts:["x=5y-3","5y-3"], hint:"Multiply by 5, then subtract 3.", explanation:"5y = x+3 → x = 5y-3."},
  {q:"Make b the subject: a² + b² = c²", answer:"b = √(c²-a²)", accepts:["b=sqrt(c^2-a^2)","b=√(c²-a²)","sqrt(c^2-a^2)","√(c²-a²)"], hint:"Subtract a², then square root.", explanation:"b² = c²-a² → b = √(c²-a²)."},
  {q:"Make t the subject: s = ½at²", answer:"t = √(2s/a)", accepts:["t=sqrt(2s/a)","t=√(2s/a)","sqrt(2s/a)","√(2s/a)"], hint:"Multiply by 2, divide by a, then square root.", explanation:"2s = at² → t² = 2s/a → t = √(2s/a)."},
  {q:"Make x the subject: 1/x + 1/y = 1/z", answer:"x = yz/(y-z)", accepts:["x=yz/(y-z)","yz/(y-z)"], hint:"1/x = 1/z - 1/y = (y-z)/(yz). Flip both sides.", explanation:"1/x = (y-z)/yz → x = yz/(y-z)."},
  {q:"Make h the subject: V = ⅓πr²h", answer:"h = 3V/(πr²)", accepts:["h=3v/(πr^2)","h=3v/(πr²)","3v/(πr^2)","3v/(πr²)"], hint:"Multiply by 3, divide by πr².", explanation:"3V = πr²h → h = 3V/(πr²)."},
  {q:"Make x the subject: y = √(2x-1)", answer:"x = (y²+1)/2", accepts:["x=(y^2+1)/2","x=(y²+1)/2","(y^2+1)/2","(y²+1)/2"], hint:"Square both sides first.", explanation:"y² = 2x-1 → y²+1 = 2x → x = (y²+1)/2."},
  {q:"Make c the subject: E = mc²", answer:"c = √(E/m)", accepts:["c=sqrt(e/m)","c=√(e/m)","sqrt(e/m)","√(e/m)"], hint:"Divide by m, then square root.", explanation:"c² = E/m → c = √(E/m)."}
],

"Unit 3 Quiz 6: Mixed Algebra": [
  {q:"Expand and factorise: (x+2)² - (x-2)²", answer:"8x", accepts:["8x"], hint:"Either expand both or use a²-b² = (a+b)(a-b).", explanation:"((x+2)+(x-2))((x+2)-(x-2)) = (2x)(4) = 8x."},
  {q:"Factorise: xy + 2x - 3y - 6", answer:"(x-3)(y+2)", accepts:["(x-3)(y+2)","(y+2)(x-3)"], hint:"Group: x(y+2) - 3(y+2).", explanation:"x(y+2)-3(y+2) = (x-3)(y+2)."},
  {q:"Simplify: (x²-1)/(x²-2x+1)", answer:"(x+1)/(x-1)", accepts:["(x+1)/(x-1)"], hint:"Top: (x+1)(x-1). Bottom: (x-1)².", explanation:"(x+1)(x-1)/(x-1)² = (x+1)/(x-1)."},
  {q:"Solve for x: 2/(x-1) = 5/(x+2)", answer:"x = 9/3 = 3", accepts:["3","x=3"], hint:"Cross multiply: 2(x+2) = 5(x-1).", explanation:"2x+4 = 5x-5 → 9 = 3x → x = 3."},
  {q:"Expand: (2x+1)(x²-3x+2)", answer:"2x³-5x²+x+2", accepts:["2x^3-5x^2+x+2","2x³-5x²+x+2"], hint:"Multiply each term in the first bracket by each term in the second.", explanation:"2x³-6x²+4x+x²-3x+2 = 2x³-5x²+x+2."},
  {q:"Factorise: x³-x", answer:"x(x+1)(x-1)", accepts:["x(x+1)(x-1)","x(x-1)(x+1)"], hint:"Take out x first, then difference of squares.", explanation:"x(x²-1) = x(x+1)(x-1)."},
  {q:"Make y the subject: x = (2y+1)/(y-3)", answer:"y = (3x+1)/(x-2)", accepts:["y=(3x+1)/(x-2)","(3x+1)/(x-2)"], hint:"Multiply by (y-3), expand, collect y terms.", explanation:"x(y-3)=2y+1 → xy-3x=2y+1 → xy-2y=3x+1 → y(x-2)=3x+1 → y=(3x+1)/(x-2)."},
  {q:"Simplify: 2/(x+1) - 1/(x-1) + 1/(x²-1)", answer:"(x-2)/(x²-1)", accepts:["(x-2)/(x^2-1)","(x-2)/(x²-1)","(x-2)/((x+1)(x-1))"], hint:"Note: x²-1 = (x+1)(x-1). LCD = (x+1)(x-1).", explanation:"(2(x-1)-(x+1)+1)/((x+1)(x-1)) = (2x-2-x-1+1)/(x²-1) = (x-2)/(x²-1)."},
  {q:"If x²+1/x² = 7, find x+1/x. [Hint: square x+1/x]", answer:"3", accepts:["3","-3","±3","3 or -3"], hint:"(x+1/x)² = x²+2+1/x² = 7+2 = 9.", explanation:"(x+1/x)² = x²+2+1/x² = 7+2 = 9. So x+1/x = ±3."},
  {q:"Expand: (a+b+c)(a+b-c)", answer:"a²+2ab+b²-c²", accepts:["a^2+2ab+b^2-c^2","a²+2ab+b²-c²","(a+b)^2-c^2","(a+b)²-c²"], hint:"Let A=(a+b). Then it's (A+c)(A-c) = A²-c².", explanation:"(a+b)²-c² = a²+2ab+b²-c²."},
  {q:"Factorise: x²-y²+x+y", answer:"(x+y)(x-y+1)", accepts:["(x+y)(x-y+1)","(x-y+1)(x+y)"], hint:"Group: (x²-y²)+(x+y) = (x+y)(x-y)+(x+y).", explanation:"(x+y)(x-y)+(x+y) = (x+y)(x-y+1)."}
],

"Unit 4.4: Completing the Square": [
  {q:"Complete the square: x²+6x", answer:"(x+3)²-9", accepts:["(x+3)^2-9","(x+3)²-9"], hint:"Half of 6 is 3. Square it: 9. Add and subtract 9.", explanation:"x²+6x = x²+6x+9-9 = (x+3)²-9."},
  {q:"Complete the square: x²-4x+7", answer:"(x-2)²+3", accepts:["(x-2)^2+3","(x-2)²+3"], hint:"Half of -4 is -2. Square: 4. So x²-4x+4+3 = (x-2)²+3.", explanation:"x²-4x+7 = (x²-4x+4)+3 = (x-2)²+3."},
  {q:"Complete the square: x²+8x+10", answer:"(x+4)²-6", accepts:["(x+4)^2-6","(x+4)²-6"], hint:"Half of 8 is 4. 4²=16. So x²+8x+16-6 = (x+4)²-6.", explanation:"x²+8x+10 = (x+4)²-16+10 = (x+4)²-6."},
  {q:"Express y=x²-6x+5 in the form (x-p)²+q. Find p and q.", answer:"p=3, q=-4", accepts:["p=3,q=-4","p=3 q=-4","3,-4","(x-3)^2-4","(x-3)²-4"], hint:"Half of -6 is -3. So p=3. Then q = 5 - 9 = -4.", explanation:"x²-6x+5 = (x-3)²-9+5 = (x-3)²-4. p=3, q=-4."},
  {q:"Using your answer, state the turning point of y=x²-6x+5.", answer:"(3,-4)", accepts:["(3,-4)","3,-4"], hint:"For y=(x-p)²+q, turning point is (p,q).", explanation:"y = (x-3)²-4. Minimum at x=3, y=-4. Turning point (3,-4)."},
  {q:"Complete the square: x²+10x", answer:"(x+5)²-25", accepts:["(x+5)^2-25","(x+5)²-25"], hint:"Half of 10 is 5. 5²=25.", explanation:"x²+10x = (x+5)²-25."},
  {q:"Solve by completing the square: x²+4x-5=0", answer:"x=1 or x=-5", accepts:["x=1,x=-5","1 or -5","x=1 or x=-5","1,-5"], hint:"(x+2)²-4-5=0 → (x+2)²=9 → x+2=±3.", explanation:"(x+2)²-9=0 → (x+2)²=9 → x+2=±3 → x=1 or x=-5."},
  {q:"Solve by completing the square: x²-2x-8=0", answer:"x=4 or x=-2", accepts:["x=4,x=-2","4 or -2","x=4 or x=-2","4,-2"], hint:"(x-1)²-1-8=0 → (x-1)²=9 → x-1=±3.", explanation:"(x-1)²-9=0 → (x-1)²=9 → x-1=±3 → x=4 or x=-2."},
  {q:"What is the minimum value of x²-6x+11?", answer:"2", accepts:["2"], hint:"Complete the square first. The minimum of (x-p)²+q is q.", explanation:"x²-6x+11 = (x-3)²+2. Since (x-3)²≥0, the minimum value is 2 (when x=3)."},
  {q:"For y=-(x²-4x+1), write in the form -(x-p)²+q and state the maximum.", answer:"Maximum = 3 at x=2", accepts:["3","max=3","maximum=3","maximum is 3"], hint:"First complete square inside: x²-4x+1=(x-2)²-3. Then y=-(x-2)²+3.", explanation:"y=-(x²-4x+1)=-((x-2)²-3)=-(x-2)²+3. Maximum = 3 (when x=2, the squared part is 0)."}
]

};
