require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname));

const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'prompts.json');
const CATS_FILE = path.join(DB_DIR, 'categories.json');
const SHOWCASE_FILE = path.join(DB_DIR, 'showcase.json');

// Ensure DB directory and file exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// ── Mongoose Schema Definitions ──
const PromptSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  outcome: { type: String, default: '' },
  prompt: { type: String, required: true },
  cat: { type: String, default: 'Productivity' },
  catIcon: { type: String, default: '📁' },
  ai: { type: String, default: 'chatgpt' },
  aiName: { type: String, default: 'ChatGPT' },
  promptType: { type: String, default: 'text' },
  isTrending: { type: Boolean, default: false },
  trendingRank: { type: Number, default: 99 },
  customImage: { type: String, default: null },
  images: { type: Array, default: [] },
  aspectRatio: { type: String, default: '1/1' },
  imgPosY: { type: Number, default: 50 },
  imgPosX: { type: Number, default: 50 },
  imgZoom: { type: Number, default: 1 },
  cardHeight: { type: Number, default: 230 },
  emoji: { type: String, default: '⚡' },
  gradient: { type: String, default: 'g1' },
  rating: { type: Number, default: 5.0 },
  uses: { type: String, default: '1' },
  author: { type: String, default: 'Admin' },
  authorColor: { type: String, default: '#5b4cff' },
  tags: { type: [String], default: [] },
  howToUse: { type: [String], default: [] },
  created_at: { type: Number, default: () => Date.now() },
  updated_at: { type: Number, default: () => Date.now() }
}, { collection: 'prompts' });

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, default: '📁' },
  gradient: { type: String, default: 'g1' },
  isDefault: { type: Boolean, default: false },
  created_at: { type: Number, default: () => Date.now() }
}, { collection: 'categories' });

const ShowcaseSchema = new mongoose.Schema({
  key: { type: String, default: 'main_showcase', unique: true },
  ids: { type: [String], default: [] },
  updated_at: { type: Number, default: () => Date.now() }
}, { collection: 'showcase' });

const PromptModel = mongoose.model('Prompt', PromptSchema);
const CategoryModel = mongoose.model('Category', CategorySchema);
const ShowcaseModel = mongoose.model('Showcase', ShowcaseSchema);

let isMongoConnected = false;

// ── MongoDB Atlas Connection ──
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  }).then(async () => {
    isMongoConnected = true;
    console.log('✅ [MongoDB Atlas] Connected successfully to cloud database!');
    // Initial sync from local JSON files if MongoDB is empty
    await syncInitialDataToMongo();
  }).catch((err) => {
    console.log('⚠️ [MongoDB Atlas] Not connected yet (' + err.message + '). Using local JSON database seamlessly.');
  });
}

async function syncInitialDataToMongo() {
  try {
    const promptCount = await PromptModel.countDocuments();
    if (promptCount === 0) {
      const localPrompts = loadDB();
      if (localPrompts.length > 0) {
        await PromptModel.insertMany(localPrompts);
        console.log(`📦 [MongoDB] Migrated ${localPrompts.length} prompts from local JSON to MongoDB Atlas!`);
      }
    }

    const catCount = await CategoryModel.countDocuments();
    if (catCount === 0) {
      const localCats = loadCategories();
      if (localCats.length > 0) {
        await CategoryModel.insertMany(localCats);
        console.log(`📦 [MongoDB] Migrated ${localCats.length} categories to MongoDB Atlas!`);
      }
    }

    const showcaseDoc = await ShowcaseModel.findOne({ key: 'main_showcase' });
    if (!showcaseDoc) {
      const localShowcase = loadShowcase();
      await ShowcaseModel.create({ key: 'main_showcase', ids: localShowcase });
      console.log(`📦 [MongoDB] Migrated showcase IDs to MongoDB Atlas!`);
    }
  } catch (e) {
    console.error('Error during MongoDB initial sync:', e.message);
  }
}

// ── JSON Local Fallback Helpers ──
function loadShowcase() {
  try {
    if (!fs.existsSync(SHOWCASE_FILE)) {
      const prompts = loadDB();
      const defaultIds = prompts.slice(0, 5).map(p => p.id);
      fs.writeFileSync(SHOWCASE_FILE, JSON.stringify(defaultIds, null, 2));
      return defaultIds;
    }
    const data = fs.readFileSync(SHOWCASE_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveShowcase(ids) {
  try {
    fs.writeFileSync(SHOWCASE_FILE, JSON.stringify(ids, null, 2));
    return true;
  } catch (err) {
    return false;
  }
}

const DEFAULT_CATEGORIES = [
  { id: "cat_art", name: "Art & Design", icon: "🎨", gradient: "g3", isDefault: true },
  { id: "cat_photo", name: "Photography", icon: "📸", gradient: "g4", isDefault: true },
  { id: "cat_prog", name: "Programming", icon: "💻", gradient: "g1", isDefault: true },
  { id: "cat_mkt", name: "Marketing", icon: "📢", gradient: "g2", isDefault: true },
  { id: "cat_biz", name: "Business", icon: "💼", gradient: "g5", isDefault: true },
  { id: "cat_write", name: "Writing", icon: "✍️", gradient: "g6", isDefault: true },
  { id: "cat_edu", name: "Education", icon: "🎓", gradient: "g7", isDefault: true },
  { id: "cat_car", "name": "Career", icon: "🧳", gradient: "g8", isDefault: true },
  { id: "cat_soc", name: "Social Media", icon: "📱", gradient: "g2", isDefault: true },
  { id: "cat_vid", name: "Video & YouTube", icon: "🎬", gradient: "g5", isDefault: true },
  { id: "cat_prod", name: "Productivity", icon: "📈", gradient: "g1", isDefault: true }
];

function loadCategories() {
  try {
    if (!fs.existsSync(CATS_FILE)) {
      fs.writeFileSync(CATS_FILE, JSON.stringify(DEFAULT_CATEGORIES, null, 2));
      return DEFAULT_CATEGORIES;
    }
    const data = fs.readFileSync(CATS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CATEGORIES;
  } catch (err) {
    return DEFAULT_CATEGORIES;
  }
}

function saveCategories(cats) {
  try {
    fs.writeFileSync(CATS_FILE, JSON.stringify(cats, null, 2));
    if (typeof writeSitemapOnDisk === 'function') {
      writeSitemapOnDisk(process.env.BASE_URL);
    }
    return true;
  } catch (err) {
    return false;
  }
}

function loadDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    if (typeof writeSitemapOnDisk === 'function') {
      writeSitemapOnDisk(process.env.BASE_URL);
    }
    return true;
  } catch (err) {
    return false;
  }
}

// ── REST API ROUTES ──

// Categories API
app.get('/api/categories', async (req, res) => {
  if (isMongoConnected) {
    try {
      const cats = await CategoryModel.find({}).lean();
      return res.json({ success: true, data: cats.length > 0 ? cats : DEFAULT_CATEGORIES });
    } catch (e) {}
  }
  const cats = loadCategories();
  res.json({ success: true, data: cats });
});

app.post('/api/categories', async (req, res) => {
  const { name, icon, gradient } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Category name is required' });
  }

  const cleanName = name.trim();
  const newCat = {
    id: req.body.id || ('cat_' + Date.now()),
    name: cleanName,
    icon: (icon && icon.trim()) || '📁',
    gradient: gradient || ('g' + (Math.floor(Math.random() * 8) + 1)),
    isDefault: false,
    created_at: Date.now()
  };

  if (isMongoConnected) {
    try {
      await CategoryModel.findOneAndUpdate({ id: newCat.id }, newCat, { upsert: true });
    } catch (e) {}
  }

  const cats = loadCategories();
  const existingIdx = cats.findIndex(c => c.name.toLowerCase() === cleanName.toLowerCase());
  if (existingIdx === -1) {
    cats.push(newCat);
    saveCategories(cats);
  }

  res.status(201).json({ success: true, data: newCat });
});

app.delete('/api/categories/:id', async (req, res) => {
  const targetId = String(req.params.id);

  if (isMongoConnected) {
    try {
      await CategoryModel.deleteOne({ $or: [{ id: targetId }, { name: targetId }] });
    } catch (e) {}
  }

  let cats = loadCategories();
  cats = cats.filter(c => String(c.id) !== targetId && c.name.toLowerCase() !== targetId.toLowerCase());
  saveCategories(cats);
  res.json({ success: true, message: 'Category deleted', deletedId: targetId });
});

// GET all prompts
app.get('/api/prompts', async (req, res) => {
  if (isMongoConnected) {
    try {
      const prompts = await PromptModel.find({}).sort({ created_at: -1 }).lean();
      return res.json({ success: true, data: prompts });
    } catch (e) {}
  }
  const prompts = loadDB();
  res.json({ success: true, data: prompts });
});

// GET single prompt
app.get('/api/prompts/:id', async (req, res) => {
  const targetId = String(req.params.id);
  if (isMongoConnected) {
    try {
      const prompt = await PromptModel.findOne({ id: targetId }).lean();
      if (prompt) return res.json({ success: true, data: prompt });
    } catch (e) {}
  }
  const prompts = loadDB();
  const prompt = prompts.find(p => String(p.id) === targetId);
  if (!prompt) {
    return res.status(404).json({ success: false, message: 'Prompt not found' });
  }
  res.json({ success: true, data: prompt });
});

// POST new prompt
app.post('/api/prompts', async (req, res) => {
  const newPrompt = req.body;
  if (!newPrompt.title || !newPrompt.prompt) {
    return res.status(400).json({ success: false, message: 'Title and prompt template are required' });
  }

  if (!newPrompt.id) {
    newPrompt.id = 'prompt_' + Date.now();
  }
  newPrompt.created_at = Date.now();
  newPrompt.updated_at = Date.now();

  if (isMongoConnected) {
    try {
      await PromptModel.findOneAndUpdate({ id: newPrompt.id }, newPrompt, { upsert: true });
    } catch (e) {}
  }

  const prompts = loadDB();
  prompts.unshift(newPrompt);
  saveDB(prompts);

  res.status(201).json({ success: true, data: newPrompt });
});

// PUT update existing prompt
app.put('/api/prompts/:id', async (req, res) => {
  const targetId = String(req.params.id);
  const updatedData = { ...req.body, updated_at: Date.now() };

  if (isMongoConnected) {
    try {
      await PromptModel.findOneAndUpdate({ id: targetId }, updatedData);
    } catch (e) {}
  }

  const prompts = loadDB();
  const index = prompts.findIndex(p => String(p.id) === targetId);
  if (index !== -1) {
    prompts[index] = { ...prompts[index], ...updatedData, id: prompts[index].id };
    saveDB(prompts);
  }

  res.json({ success: true, data: updatedData });
});

// DELETE prompt
app.delete('/api/prompts/:id', async (req, res) => {
  const targetId = String(req.params.id);

  if (isMongoConnected) {
    try {
      await PromptModel.deleteOne({ id: targetId });
    } catch (e) {}
  }

  const prompts = loadDB();
  const filtered = prompts.filter(p => String(p.id) !== targetId);
  saveDB(filtered);

  res.json({ success: true, message: 'Prompt deleted successfully' });
});

// ── WELCOME SHOWCASE API ──
app.get('/api/showcase', async (req, res) => {
  let ids = [];
  let prompts = [];

  if (isMongoConnected) {
    try {
      const doc = await ShowcaseModel.findOne({ key: 'main_showcase' }).lean();
      if (doc && doc.ids) ids = doc.ids;
      prompts = await PromptModel.find({ id: { $in: ids } }).lean();
    } catch (e) {}
  }

  if (ids.length === 0) {
    ids = loadShowcase();
    const allPrompts = loadDB();
    prompts = ids.map(id => allPrompts.find(p => String(p.id) === String(id))).filter(Boolean);
  }

  res.json({ success: true, ids, prompts });
});

app.post('/api/showcase', async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: 'Invalid ids array' });
  }

  if (isMongoConnected) {
    try {
      await ShowcaseModel.findOneAndUpdate(
        { key: 'main_showcase' },
        { key: 'main_showcase', ids, updated_at: Date.now() },
        { upsert: true }
      );
    } catch (e) {}
  }

  saveShowcase(ids);
  res.json({ success: true, ids });
});

// ── SEO SITEMAP & ROBOTS ENGINE ──
const SITEMAP_FILE = path.join(__dirname, 'sitemap.xml');
const ROBOTS_FILE = path.join(__dirname, 'robots.txt');

function generateSitemapXml(baseUrl = 'http://localhost:3000') {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const now = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: `${cleanBase}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${cleanBase}/index.html`, priority: '0.9', changefreq: 'daily' }
  ];

  const prompts = loadDB();
  const promptPages = prompts.map(p => ({
    loc: `${cleanBase}/prompt.html?id=${p.id}`,
    priority: p.isTrending ? '0.9' : '0.8',
    changefreq: 'weekly'
  }));

  const cats = loadCategories();
  const catPages = cats.map(c => ({
    loc: `${cleanBase}/index.html?cat=${encodeURIComponent(c.name)}#prompts`,
    priority: '0.7',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticPages, ...promptPages, ...catPages];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  allUrls.forEach(u => {
    xml += `  <url>\n`;
    xml += `    <loc>${u.loc}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

function writeSitemapOnDisk(baseUrl) {
  try {
    const xml = generateSitemapXml(baseUrl || process.env.BASE_URL || 'http://localhost:3000');
    fs.writeFileSync(SITEMAP_FILE, xml, 'utf-8');
    return true;
  } catch(e) {
    return false;
  }
}

function writeRobotsOnDisk(baseUrl = 'http://localhost:3000') {
  try {
    const txt = `# PromptVault Robots.txt - Auto-Generated SEO
User-agent: *
Allow: /
Allow: /index.html
Allow: /prompt.html
Allow: /prompts.js
Allow: /data/
Allow: /images/
Allow: /logos/

# Protect Admin Studio from search indexing
Disallow: /admin.html
Disallow: /api/

# Auto Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(ROBOTS_FILE, txt, 'utf-8');
    return true;
  } catch(e) {
    return false;
  }
}

// Sitemap.xml endpoint
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.BASE_URL || (req.protocol + '://' + req.get('host'));
  const xml = generateSitemapXml(baseUrl);
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Robots.txt endpoint
app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.BASE_URL || (req.protocol + '://' + req.get('host'));
  res.header('Content-Type', 'text/plain');
  res.send(`# PromptVault Robots.txt - Auto-Generated SEO
User-agent: *
Allow: /
Allow: /index.html
Allow: /prompt.html
Allow: /prompts.js
Allow: /data/
Allow: /images/
Allow: /logos/

# Protect Admin Studio from search indexing
Disallow: /admin.html
Disallow: /api/

# Auto Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`);
});

app.listen(PORT, () => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
  writeSitemapOnDisk(baseUrl);
  writeRobotsOnDisk(baseUrl);

  console.log(`\n======================================================`);
  console.log(`🚀 PromptVault Database Server is running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🗺️ Sitemap: http://localhost:${PORT}/sitemap.xml`);
  console.log(`🤖 Robots: http://localhost:${PORT}/robots.txt`);
  console.log(`📁 Database File: ${DB_FILE}`);
  console.log(`======================================================\n`);
});
