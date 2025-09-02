const {addLink} = require('../db/db');
const crypto = require('crypto');

function handleLinkCreate(req,res){
  if(req.method !== 'POST'){ res.writeHead(405); res.end(); return; }
  let body = '';
  req.on('data', chunk => body+=chunk);
  req.on('end', () => {
    try {
      const data = JSON.parse(body || '{}');
      const {deal_id, contact_id, name} = data;
      const token = crypto.randomBytes(16).toString('hex');
      addLink({token, deal_id, contact_id, name, status:'created', created_at:new Date().toISOString()});
      const base = process.env.BASE_URL || 'http://localhost:8080';
      const url = `${base}/test?t=${token}`;
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify({url}));
    } catch(err){
      res.writeHead(400);
      res.end('invalid json');
    }
  });
}

module.exports = {handleLinkCreate};
