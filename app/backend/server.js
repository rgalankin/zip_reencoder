const http = require('http');
const url = require('url');
const {handleLinkCreate} = require('./routes/link');
const {handleSubmit} = require('./routes/submit');

const server = http.createServer((req,res) => {
  const parsed = url.parse(req.url, true);
  if(parsed.pathname === '/api/link.create') return handleLinkCreate(req,res);
  if(parsed.pathname === '/api/submit') return handleSubmit(req,res);
  res.writeHead(404); res.end('not found');
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
