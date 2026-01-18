const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const STATIC_DIR = path.join(__dirname, 'static-assets');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }
    const mimeType = getMimeType(filePath);
    const headers = {
      'Content-Type': mimeType,
      'Cache-Control': mimeType === 'text/html' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000'
    };
    res.writeHead(200, headers);
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  
  if (urlPath.endsWith('/')) {
    urlPath += 'index.html';
  }
  
  let filePath = path.join(STATIC_DIR, urlPath);
  
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(res, filePath);
    } else if (!err && stats.isDirectory()) {
      serveFile(res, path.join(filePath, 'index.html'));
    } else {
      const htmlPath = filePath + '.html';
      fs.stat(htmlPath, (err2, stats2) => {
        if (!err2 && stats2.isFile()) {
          serveFile(res, htmlPath);
        } else {
          serveFile(res, path.join(STATIC_DIR, 'index.html'));
        }
      });
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running at http://0.0.0.0:${PORT}`);
});
