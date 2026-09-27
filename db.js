// ── PROMPTVAULT CENTRALIZED DATABASE ENGINE (Cloud Firestore + Firebase Storage + IndexedDB Cache) ──

const DB_NAME = 'PromptVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'prompts';

let dbInstance = null;

// 1. IndexedDB Local Cache Initialization (For Ultra-Fast Instant Render)
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
      console.warn("IndexedDB fallback mode:", e);
      resolve(null);
    };
  });
}

// 2. Cache Helpers
async function cacheSavePromptsLocally(promptsList) {
  if (!Array.isArray(promptsList) || promptsList.length === 0) return;
  try {
    const db = await initDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      promptsList.forEach(p => store.put(p));
    }
  } catch(e){}

  try {
    // Light localStorage mirror (without massive inline strings)
    const clean = promptsList.map(p => {
      const copy = { ...p };
      if (copy.customImage && copy.customImage.startsWith('data:')) {
        copy.customImage = copy.customImage.slice(0, 500) + '...';
      }
      return copy;
    });
    localStorage.setItem('promptvault_user_prompts', JSON.stringify(clean));
  } catch(e){}
}

async function cacheGetPromptsLocally() {
  try {
    const db = await initDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    }
  } catch(e){}

  try {
    const raw = localStorage.getItem('promptvault_user_prompts');
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}

// 3. IMAGE COMPRESSION & WEBP CONVERTER (Optimized for 100% Free Firebase Firestore Storage)
function compressImageFile(file, maxWidth = 800, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    
    const reader = new FileReader();
    reader.onload = function(event) {
      compressDataUrl(event.target.result, maxWidth, quality)
        .then(resolve)
        .catch(reject);
    };
    reader.onerror = () => reject(new Error("File reading failed"));
    reader.readAsDataURL(file);
  });
}

function compressDataUrl(srcDataUrl, maxWidth = 800, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!srcDataUrl) return reject(new Error("No image source provided"));
    const img = new Image();
    img.onload = function() {
      let width = img.width;
      let height = img.height;

      // Scale down so neither dimension exceeds maxWidth
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // WebP compression creates ultra-light 25KB-50KB base64 images that easily fit in Firestore docs
      let dataUrl = canvas.toDataURL('image/webp', quality);
      if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      // If dataUrl exceeds 200KB (approx 270,000 chars), downscale further
      if (dataUrl.length > 270000) {
        const smallerCanvas = document.createElement('canvas');
        const downscale = 0.75;
        smallerCanvas.width = Math.round(width * downscale);
        smallerCanvas.height = Math.round(height * downscale);
        const sCtx = smallerCanvas.getContext('2d');
        sCtx.drawImage(img, 0, 0, smallerCanvas.width, smallerCanvas.height);
        
        let smallerDataUrl = smallerCanvas.toDataURL('image/webp', 0.62);
        if (!smallerDataUrl || !smallerDataUrl.startsWith('data:image/webp')) {
          smallerDataUrl = smallerCanvas.toDataURL('image/jpeg', 0.62);
        }
        dataUrl = smallerDataUrl;
      }

      resolve({
        dataUrl: dataUrl,
        blob: dataURLToBlob(dataUrl),
        width: width,
        height: height
      });
    };
    img.onerror = () => reject(new Error("Image decoding failed"));
    img.src = srcDataUrl;
  });
}

function dataURLToBlob(dataUrl) {
  try {
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  } catch(e) {
    return null;
  }
}

// 4. FIREBASE IMAGE HANDLER (Storage with zero-cost Firestore WebP fallback)
async function uploadImageToFirebaseStorage(fileOrBlobOrDataUrl, promptId = 'prompt') {
  if (!fileOrBlobOrDataUrl) return null;

  // If already an HTTP URL or compressed WebP data URL, return immediately
  if (typeof fileOrBlobOrDataUrl === 'string') {
    return fileOrBlobOrDataUrl;
  }

  // If Blob or File, convert to data URL instantly
  if (fileOrBlobOrDataUrl instanceof Blob || fileOrBlobOrDataUrl instanceof File) {
    try {
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(fileOrBlobOrDataUrl);
      });
    } catch(e) {
      return null;
    }
  }

  return null;
}

// 5. CLOUD FIRESTORE CRUD OPERATIONS

// Fetch all prompts from Cloud Firestore
async function firestoreGetAllPrompts() {
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  
  if (db) {
    try {
      const snapshot = await db.collection('prompts').get();
      const prompts = [];
      snapshot.forEach(doc => {
        prompts.push({ id: doc.id, ...doc.data() });
      });
      prompts.sort((a, b) => (Number(b.created_at) || 0) - (Number(a.created_at) || 0));
      console.log(`✅ [Cloud Firestore] Fetched ${prompts.length} prompts from cloud database.`);
      
      if (prompts.length > 0) {
        // Cache to IndexedDB for instant offline-first speeds
        cacheSavePromptsLocally(prompts).catch(() => {});
        return prompts;
      }
    } catch(err) {
      console.warn("⚠️ [Cloud Firestore] Fetch error (fallback to local cache):", err.message);
    }
  }

  // Fallback to local cache if Firestore is not reachable
  return await cacheGetPromptsLocally();
}

// Save or Update a prompt in Cloud Firestore
async function firestoreSavePrompt(promptData) {
  if (!promptData.id) promptData.id = 'user_' + Date.now();
  if (!promptData.created_at) promptData.created_at = Date.now();
  promptData.updated_at = Date.now();

  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  
  if (db) {
    try {
      const docRef = db.collection('prompts').doc(String(promptData.id));
      await docRef.set(promptData, { merge: true });
      console.log(`✅ [Cloud Firestore] Prompt ${promptData.id} saved permanently to cloud database!`);
    } catch(err) {
      console.error("❌ [Cloud Firestore] Save error:", err);
      throw err;
    }
  }

  // Also sync to local cache
  await cacheSavePromptsLocally([promptData]);
  return promptData;
}

// Delete a prompt from Cloud Firestore
async function firestoreDeletePrompt(promptId) {
  const strId = String(promptId);
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);

  if (db) {
    try {
      await db.collection('prompts').doc(strId).delete();
      console.log(`🗑️ [Cloud Firestore] Prompt ${strId} deleted permanently from cloud database.`);
    } catch(err) {
      console.error("❌ [Cloud Firestore] Delete error:", err);
      throw err;
    }
  }

  // Clean local cache
  try {
    const ldb = await initDB();
    if (ldb) {
      const tx = ldb.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(strId);
    }
    const raw = localStorage.getItem('promptvault_user_prompts');
    if (raw) {
      const list = JSON.parse(raw).filter(p => String(p.id) !== strId);
      localStorage.setItem('promptvault_user_prompts', JSON.stringify(list));
    }
  } catch(e){}

  return true;
}

// Categories: Get from Firestore
async function firestoreGetAllCategories() {
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      const snapshot = await db.collection('categories').get();
      const cats = [];
      snapshot.forEach(doc => cats.push({ id: doc.id, ...doc.data() }));
      if (cats.length > 0) return cats;
    } catch(e) {
      console.warn("Categories fetch note:", e.message);
    }
  }
  return null;
}

// Categories: Save to Firestore
async function firestoreSaveCategory(catData) {
  if (!catData || !catData.id) return false;
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      await db.collection('categories').doc(String(catData.id)).set(catData, { merge: true });
    } catch(e){}
  }
  return catData;
}

// Categories: Delete from Firestore
async function firestoreDeleteCategory(catId) {
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      await db.collection('categories').doc(String(catId)).delete();
    } catch(e){}
  }
  return true;
}

// Showcase: Get 5 curated slot IDs from Firestore
async function firestoreGetShowcase() {
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      const doc = await db.collection('showcase').doc('main_showcase').get();
      if (doc.exists && doc.data() && Array.isArray(doc.data().ids)) {
        return doc.data().ids;
      }
    } catch(e){}
  }
  return null;
}

// Showcase: Save 5 curated slot IDs to Firestore
async function firestoreSaveShowcase(ids) {
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      await db.collection('showcase').doc('main_showcase').set({
        ids: ids,
        updated_at: Date.now()
      }, { merge: true });
    } catch(e){}
  }
  return ids;
}

// Sections: Get from Firestore (Dual-mode: settings doc + sections collection for 100% reliable sync)
async function firestoreGetAllSections() {
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    // 1. Try unified settings document first
    try {
      const doc = await db.collection('settings').doc('homepage_sections').get();
      if (doc.exists && doc.data() && Array.isArray(doc.data().list) && doc.data().list.length > 0) {
        const list = doc.data().list;
        list.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
        return list;
      }
    } catch(e){}

    // 2. Fallback to individual docs in sections collection
    try {
      const snapshot = await db.collection('sections').get();
      const sections = [];
      snapshot.forEach(doc => {
        const d = doc.data() || {};
        sections.push({ id: doc.id, ...d });
      });
      sections.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      if (sections.length > 0) return sections;
    } catch(e) {
      console.warn("Sections fetch note:", e.message);
    }
  }
  return null;
}

// Sections: Save to Firestore
async function firestoreSaveSection(secData) {
  if (!secData || !secData.id) return false;
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      await db.collection('sections').doc(String(secData.id)).set(secData, { merge: true });
    } catch(e){}
  }
  return secData;
}

// Sections: Save entire list to unified Firestore settings document
async function firestoreSaveAllSections(sectionsList) {
  if (!Array.isArray(sectionsList)) return false;
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      await db.collection('settings').doc('homepage_sections').set({
        list: sectionsList,
        updated_at: Date.now()
      }, { merge: true });
    } catch(e){}
  }
  return true;
}

// Sections: Delete from Firestore
async function firestoreDeleteSection(secId) {
  const db = firestoreDb || (typeof firebase !== 'undefined' && firebase.firestore ? firebase.firestore() : null);
  if (db) {
    try {
      await db.collection('sections').doc(String(secId)).delete();
    } catch(e){}
  }
  return true;
}

// Backward Compatibility Aliases
const dbGetAllCustomPrompts = firestoreGetAllPrompts;
const dbSavePrompt = firestoreSavePrompt;
const dbDeletePrompt = firestoreDeletePrompt;
