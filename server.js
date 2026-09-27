require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname));

const SITEMAP_FILE = path.join(__dirname, 'sitemap.xml');
const ROBOTS_FILE = path.join(__dirname, 'robots.txt');

// ── SEO SITEMAP & ROBOTS GENERATOR ──
const DEFAULT_CATEGORIES = [
  { id: "cat_art", name: "Art & Design", icon: "🎨" },
  { id: "cat_photo", name: "Photography", icon: "📸" },
  { id: "cat_prog", name: "Programming", icon: "💻" },
  { id: "cat_mkt", name: "Marketing", icon: "📢" },
  { id: "cat_biz", name: "Business", icon: "💼" },
  { id: "cat_write", name: "Writing", icon: "✍️" },
  { id: "cat_edu", name: "Education", icon: "🎓" },
  { id: "cat_car", name: "Career", icon: "🧳" },
  { id: "cat_soc", name: "Social Media", icon: "📱" },
  { id: "cat_vid", name: "Video & YouTube", icon: "🎬" },
  { id: "cat_prod", name: "Productivity", icon: "📈" }
];

function generateSitemapXml(baseUrl = 'https://promptvault.site') {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const now = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: `${cleanBase}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${cleanBase}/index.html`, priority: '0.9', changefreq: 'daily' },
    { loc: `${cleanBase}/admin.html`, priority: '0.5', changefreq: 'monthly' }
  ];

  const catPages = DEFAULT_CATEGORIES.map(c => ({
    loc: `${cleanBase}/index.html?cat=${encodeURIComponent(c.name)}#prompts`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticPages, ...catPages];

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

function writeSitemapOnDisk(baseUrl = 'https://promptvault.site') {
  try {
    const xml = generateSitemapXml(baseUrl);
    fs.writeFileSync(SITEMAP_FILE, xml, 'utf-8');
    return true;
  } catch(e) {
    return false;
  }
}

function writeRobotsOnDisk(baseUrl = 'https://promptvault.site') {
  try {
    const txt = `# PromptVault Robots.txt - Auto-Generated SEO
User-agent: *
Allow: /
Allow: /index.html
Allow: /prompt.html
Allow: /prompts.js
Allow: /db.js
Allow: /auth.js
Allow: /images/
Allow: /logos/

# Protect Admin Studio from search indexing
Disallow: /admin.html

# Auto Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(ROBOTS_FILE, txt, 'utf-8');
    return true;
  } catch(e) {
    return false;
  }
}

// ── ENDPOINTS ──

// Google AdSense ads.txt endpoint
app.get('/ads.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send('google.com, pub-1086281363527230, DIRECT, f08c47fec0942fa0\n');
});

// Dynamic Sitemap.xml endpoint
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
Allow: /db.js
Allow: /auth.js
Allow: /images/
Allow: /logos/

Disallow: /admin.html

Sitemap: ${baseUrl}/sitemap.xml
`);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    engine: 'Firebase-Centralized (Cloud Firestore, Cloud Storage, Firebase Auth)',
    project: 'promptvaultlogin'
  });
});

app.listen(PORT, () => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
  writeSitemapOnDisk(baseUrl);
  writeRobotsOnDisk(baseUrl);

  console.log(`\n======================================================`);
  console.log(`🔥 PromptVault Centralized Firebase Node is active!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🗺️ Sitemap: http://localhost:${PORT}/sitemap.xml`);
  console.log(`🤖 Robots: http://localhost:${PORT}/robots.txt`);
  console.log(`📄 Ads.txt: http://localhost:${PORT}/ads.txt`);
  console.log(`☁️ Infrastructure: Cloud Firestore + Firebase Storage`);
  console.log(`======================================================\n`);
});
