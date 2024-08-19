import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = config.port;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  let htmlContent = readFileSync(htmlPath, 'utf8');
  htmlContent = htmlContent.replace(/%PROJECT_NAME%/g, config.projectName);
  htmlContent = htmlContent.replace(/%PROJECT_SLUG%/g, config.projectSlug);

  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});