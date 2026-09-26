// ── PROMPT VAULT DATABASE ENGINE (IndexedDB + API Sync) ────────────────────────
const DB_NAME = 'PromptVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'prompts';

let dbInstance = null;

// Open or initialize IndexedDB
function initDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) return resolve(dbInstance);

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('cat', 'cat', { unique: false });
        store.createIndex('ai', 'ai', { unique: false });
        store.createIndex('created_at', 'created_at', { unique: false });
      }
    };

    request.onsuccess = function(e) {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };

    request.onerror = function(e) {
      console.error("IndexedDB open error:", e);
      reject(e);
    };
  });
}

// Get all custom prompts from DB
async function dbGetAllCustomPrompts() {
  try {
    const db = await initDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (err) {
    console.error("dbGetAllCustomPrompts error:", err);
    // Fallback to localStorage
    try {
      const raw = localStorage.getItem('promptvault_user_prompts');
      return raw ? JSON.parse(raw) : [];
    } catch(e) {
      return [];
    }
  }
}

// Save or Update a prompt in DB
async function dbSavePrompt(promptData) {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      if (!promptData.created_at) promptData.created_at = Date.now();
      promptData.updated_at = Date.now();
      
      const req = store.put(promptData);
      req.onsuccess = () => {
        // Also mirror to localStorage without huge images if possible as backup
        try {
          const minimal = { ...promptData };
          if (minimal.customImage && minimal.customImage.length > 500000) {
            // Keep localStorage light
            delete minimal.customImage;
          }
          const raw = localStorage.getItem('promptvault_user_prompts');
          const list = raw ? JSON.parse(raw) : [];
          const idx = list.findIndex(p => String(p.id) === String(promptData.id));
          if (idx >= 0) list[idx] = minimal;
          else list.unshift(minimal);
          localStorage.setItem('promptvault_user_prompts', JSON.stringify(list));
        } catch(e){}
        resolve(promptData);
      };
      req.onerror = (e) => reject(e);
    });
  } catch (err) {
    console.error("dbSavePrompt error:", err);
    return null;
  }
}

// Delete a prompt from DB
async function dbDeletePrompt(id) {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => {
        try {
          const raw = localStorage.getItem('promptvault_user_prompts');
          if (raw) {
            const list = JSON.parse(raw).filter(p => String(p.id) !== String(id));
            localStorage.setItem('promptvault_user_prompts', JSON.stringify(list));
          }
        } catch(e){}
        resolve(true);
      };
      req.onerror = (e) => reject(e);
    });
  } catch (err) {
    console.error("dbDeletePrompt error:", err);
    return false;
  }
}

// Image compressor helper: compresses any file to max width 900px, 85% WebP/JPEG
function compressImageFile(file, maxWidth = 900, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp or jpeg
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
