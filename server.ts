import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
app.use(express.json());

const DB_FILE = path.join(process.cwd(), 'species_db.json');

const INITIAL_DATA = [
  {
    id: '1',
    commonName: 'White Oak',
    scientificName: 'Quercus alba',
    category: 'tree',
    location: 'Eastern US',
    nativeStatus: 'native',
    note: 'Important canopy tree supporting hundreds of moth and butterfly species. Crucial for local ecosystems.',
    submitterName: 'System',
    status: 'approved',
    createdAt: new Date(Date.now() - 100000000).toISOString(),
  },
  {
    id: '2',
    commonName: 'Purple Coneflower',
    scientificName: 'Echinacea purpurea',
    category: 'flower',
    location: 'Eastern & Central US',
    nativeStatus: 'native',
    note: 'Great for pollinators in the summer, and birds eat the seeds in winter. Extremely drought tolerant.',
    submitterName: 'System',
    status: 'approved',
    createdAt: new Date(Date.now() - 80000000).toISOString(),
  },
  {
    id: '3',
    commonName: 'Eastern Bluebird',
    scientificName: 'Sialia sialis',
    category: 'bird',
    location: 'Eastern North America',
    nativeStatus: 'native',
    note: 'Requires cavity nests. Great natural insect control for homesteads.',
    submitterName: 'System',
    status: 'approved',
    createdAt: new Date(Date.now() - 40000000).toISOString(),
  }
];

function getSpecies() {
  if (fs.existsSync(DB_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch {
      // Return fallback data
    }
  }
  return INITIAL_DATA;
}

function saveSpecies(data: any[]) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/species', (req, res) => {
  res.json(getSpecies());
});

app.post('/api/species', (req, res) => {
  const species = getSpecies();
  
  // Basic sanity validation
  if (!req.body.commonName || !req.body.category || !req.body.location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newSpecies = {
    ...req.body,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  species.push(newSpecies);
  saveSpecies(species);
  res.json(newSpecies);
});

const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const auth = req.headers.authorization;
  const secret = process.env.ADMIN_SECRET;

  if (!secret) {
    console.error('CRITICAL: ADMIN_SECRET is not configured on the server.');
    return res.status(500).json({ error: 'Server misconfiguration: Administration disabled.' });
  }

  if (auth === `Bearer ${secret}`) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized to perform moderation actions.' });
  }
};

app.post('/api/species/:id/approve', requireAdmin, (req, res) => {
  const db = getSpecies();
  const idx = db.findIndex(s => s.id === req.params.id);
  if (idx !== -1) {
    db[idx].status = 'approved';
    saveSpecies(db);
    res.json(db[idx]);
  } else {
    res.status(404).json({ error: 'Species not found' });
  }
});

app.post('/api/species/:id/reject', requireAdmin, (req, res) => {
  const db = getSpecies();
  const idx = db.findIndex(s => s.id === req.params.id);
  if (idx !== -1) {
    db[idx].status = 'rejected';
    saveSpecies(db);
    res.json(db[idx]);
  } else {
    res.status(404).json({ error: 'Species not found' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
