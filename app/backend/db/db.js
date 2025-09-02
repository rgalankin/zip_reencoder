const fs = require('fs');
const path = require('path');

const linksFile = path.join(__dirname,'../data/links.json');
const resultsFile = path.join(__dirname,'../data/results.json');

function load(file){
  if(!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file,'utf8'));
}
function save(file,data){
  fs.writeFileSync(file, JSON.stringify(data,null,2));
}

function addLink(link){
  const links = load(linksFile);
  links.push(link);
  save(linksFile,links);
}
function findLink(token){
  const links = load(linksFile);
  return links.find(l=>l.token===token);
}
function updateLink(token, updates){
  const links = load(linksFile);
  const idx = links.findIndex(l=>l.token===token);
  if(idx>=0){
    links[idx] = {...links[idx], ...updates};
    save(linksFile,links);
  }
}

function addResult(result){
  const results = load(resultsFile);
  results.push(result);
  save(resultsFile,results);
}

module.exports = {addLink, findLink, updateLink, addResult};
