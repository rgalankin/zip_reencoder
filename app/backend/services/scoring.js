const computeScores = (answers) => {
  const score = {P:0, A:0, E:0, I:0};
  for (const ans of answers) {
    score.P += Number(ans.P) || 0;
    score.A += Number(ans.A) || 0;
    score.E += Number(ans.E) || 0;
    score.I += Number(ans.I) || 0;
  }
  const pct = {
    P: Math.round(score.P),
    A: Math.round(score.A),
    E: Math.round(score.E),
    I: Math.round(score.I)
  };
  const codeOrder = ['P','A','E','I'];
  let code = '';
  for (const c of codeOrder) {
    const val = pct[c];
    if (val >= 80) code += c;
    else if (val >= 60) code += c.toLowerCase();
    else code += '';
  }
  return {score, pct, code};
};
module.exports = {computeScores};
