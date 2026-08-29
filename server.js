import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const publicPath = path.join(__dirname, 'public');

// Serve static assets with index.html support and automatic .html extension resolution
app.use(express.static(publicPath, {
  extensions: ['html', 'htm'],
  index: 'index.html'
}));

// Route fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
