const {findLink, updateLink, addResult} = require('../db/db');
const {computeScores} = require('../services/scoring');

function handleSubmit(req,res){
  if(req.method !== 'POST'){ res.writeHead(405); res.end(); return; }
  let body='';
  req.on('data', c=>body+=c);
  req.on('end', () => {
    try {
      const data = JSON.parse(body || '{}');
      const {token, answers, meta} = data;
      const link = findLink(token);
      if(!link || link.status==='used'){
        res.writeHead(400);
        res.end('invalid token');
        return;
      }
      const {pct, code} = computeScores(answers || []);
      updateLink(token,{status:'used'});
      addResult({token, deal_id: link.deal_id, contact_id: link.contact_id, raw_json: JSON.stringify({answers, meta}), pct_p:pct.P, pct_a:pct.A, pct_e:pct.E, pct_i:pct.I, code, created_at:new Date().toISOString(), version:'v1.0'});
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify({code,pct, deal_id: link.deal_id}));
    } catch(err){
      res.writeHead(400);
      res.end('invalid json');
    }
  });
}

module.exports = {handleSubmit};
