const http = require('http');
const url = require('url');
const fs = require('fs');

// Cargar el diccionario desde un archivo externo
let dictionary = [];
fs.readFile('dictionary.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error loading dictionary:', err);
    return;
  }
  dictionary = data.split('\n').filter(word => word.trim() !== '');
});

function generatePassword(wordCount) {
  let password = '';
  for (let i = 0; i < wordCount; i++) {
    const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    password += (i === 0 ? '' : '-') + randomWord;
  }
  return password;
}

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const wordCount = parseInt(queryObject.X) || 4;

  const password = generatePassword(wordCount);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Generated password: ${password}`);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
