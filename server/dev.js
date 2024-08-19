import browserSync from 'browser-sync';
import { readFileSync } from 'fs';
import config from './config.js';

const bs = browserSync.create();

bs.init({
  server: 'public',
  files: 'public/**/*.{js,html,css}',
  middleware: [
    (req, res, next) => {
      if (req.url === '/' || req.url === '/index.html') {
        let content = readFileSync('./public/index.html', 'utf8');
        content = content.replace(/%PROJECT_NAME%/g, config.projectName);
        content = content.replace(/%PROJECT_SLUG%/g, config.projectSlug);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      } else {
        next();
      }
    }
  ],
  watch: true,
  ignore: ['node_modules'],
  single: true,
  open: false,
  notify: true,
});

console.log('Browser-Sync server started');