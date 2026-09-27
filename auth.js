// ── PROMPTVAULT CENTRALIZED FIREBASE ENGINE (Auth + Firestore + Storage) ────────
const ADMIN_EMAIL = 'nikhildswll@gmail.com';

// Official Firebase Project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAinG-sg05VtUvxinWd54tph0RCUwhhbFA",
  authDomain: "promptvaultlogin.firebaseapp.com",
  projectId: "promptvaultlogin",
  storageBucket: "promptvaultlogin.firebasestorage.app",
  messagingSenderId: "562740431507",
  appId: "1:562740431507:web:c131d61e674fc36cd6db66",
  measurementId: "G-RW6QRSQSH6"
};

// Initialize Firebase App & Services
let firebaseApp = null;
let firebaseAuth = null;
let googleAuthProvider = null;
let firestoreDb = null;
let firebaseStorage = null;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps || !firebase.apps.length) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }

    if (typeof firebase.auth === 'function') {
      firebaseAuth = firebase.auth();
      googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
    }

    if (typeof firebase.firestore === 'function') {
      firestoreDb = firebase.firestore();
      // Optional offline persistence in browser
      firestoreDb.enablePersistence({ synchronizeTabs: true }).catch((err) => {
        console.log("Firestore persistence mode: standard online/cache (" + (err.code || err.message) + ")");
      });
    }

    if (typeof firebase.storage === 'function') {
      firebaseStorage = firebase.storage();
    }
  }
} catch (e) {
  console.error("Firebase engine initialization error:", e);
}

// Global Auth User State
let currentAuthUser = null;

// Helper: Check if currently logged in user is the Admin
function isCurrentUserAdmin() {
  if (!currentAuthUser || !currentAuthUser.email) return false;
  return currentAuthUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// 1. Google 1-Click Popup Login
async function loginWithGoogle() {
  if (!firebaseAuth || !googleAuthProvider) {
    alert("Firebase Auth is initializing. Please check your internet connection.");
    return null;
  }

  try {
    let result;
    try {
      result = await firebaseAuth.signInWithPopup(googleAuthProvider);
    } catch(popupErr) {
      if (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/cancelled-popup-request') {
        console.log("Popup blocked, trying redirect sign-in...");
        await firebaseAuth.signInWithRedirect(googleAuthProvider);
        return null;
      }
      throw popupErr;
    }

    const user = result.user;
    currentAuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || null
    };

    localStorage.setItem('promptvault_user', JSON.stringify(currentAuthUser));
    updateAuthUI();

    if (isCurrentUserAdmin()) {
      showAuthToast("👑 Welcome Admin Nikhil! Creator controls unlocked.");
      if (window.location.pathname.includes('admin.html')) {
        const overlay = document.getElementById('admin-auth-overlay');
        const root = document.getElementById('admin-app-root');
        if (overlay) overlay.style.display = 'none';
        if (root) root.style.display = 'block';
        if (typeof startAdmin === 'function') startAdmin();
      }
    } else {
      showAuthToast(`👋 Welcome, ${currentAuthUser.displayName}!`);
    }

    return currentAuthUser;
  } catch (error) {
    console.error("Firebase Google Login Error:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      return null;
    }
    if (error.code === 'auth/unauthorized-domain') {
      alert(`⚠️ DOMAIN AUTHORIZATION REQUIRED:\n\nFirebase Console me jao:\n1. Authentication -> Settings -> Authorized Domains\n2. "Add domain" par click karke "${window.location.hostname}" add kar do!`);
    } else {
      alert("Sign-in error: " + (error.message || "Please check Firebase settings."));
    }
    return null;
  }
}

// Handle redirect result if redirected on mobile
if (firebaseAuth) {
  firebaseAuth.getRedirectResult().then((result) => {
    if (result && result.user) {
      const user = result.user;
      currentAuthUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null
      };
      localStorage.setItem('promptvault_user', JSON.stringify(currentAuthUser));
      updateAuthUI();
    }
  }).catch(err => console.error("Redirect auth error:", err));
}

// 2. Logout
async function logoutUser() {
  if (!confirm("Are you sure you want to sign out?")) return;
  if (firebaseAuth) {
    try { await firebaseAuth.signOut(); } catch (e) {}
  }
  currentAuthUser = null;
  localStorage.removeItem('promptvault_user');
  localStorage.removeItem('promptvault_admin_token');
  localStorage.removeItem('promptvault_admin_user');
  updateAuthUI();
  showAuthToast("👋 Signed out successfully");

  if (window.location.pathname.includes('admin.html')) {
    window.location.reload();
  }
}

function showAuthToast(msg) {
  const t = document.getElementById('toast');
  if (t) {
    t.textContent = msg;
    t.classList.add('on');
    setTimeout(() => t.classList.remove('on'), 3500);
  }
}

// 3. Update Auth UI across Header Navigation
function updateAuthUI() {
  if (!currentAuthUser) {
    try {
      const cached = localStorage.getItem('promptvault_user');
      if (cached) currentAuthUser = JSON.parse(cached);
    } catch (e) {}
  }

  const isAdmin = isCurrentUserAdmin();
  const authButtonsContainer = document.getElementById('nav-auth-container');

  if (authButtonsContainer) {
    if (currentAuthUser) {
      const avatar = currentAuthUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentAuthUser.displayName)}`;
      const firstName = (currentAuthUser.displayName || 'User').split(' ')[0];
      const adminBtnHtml = isAdmin ? `
        <a href="admin.html" class="btn-nav-admin-unlocked" title="Admin Studio" style="background:linear-gradient(135deg,#5b4cff,#7c6dff);color:#fff;padding:5px 10px;border-radius:8px;font-size:0.74rem;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 8px rgba(91,76,255,0.3);white-space:nowrap;">
          🛡️ <span class="nav-btn-text">Admin</span>
        </a>
      ` : '';

      authButtonsContainer.innerHTML = `
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
          ${adminBtnHtml}
          <div class="nav-user-chip" style="display:inline-flex;align-items:center;gap:5px;background:#f1f5f9;border:1px solid #cbd5e1;padding:3px 8px 3px 5px;border-radius:50px;font-size:0.74rem;font-weight:700;color:#1e293b;" title="${currentAuthUser.email}">
            <img src="${avatar}" alt="${currentAuthUser.displayName}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;" />
            <span class="nav-user-name">${firstName}</span>
          </div>
          <button type="button" onclick="logoutUser()" style="background:#fee2e2;color:#dc2626;border:1px solid #fecdd3;border-radius:8px;padding:4px 8px;font-size:0.72rem;font-weight:800;cursor:pointer;white-space:nowrap;" title="Sign out">
            🚪
          </button>
        </div>
      `;
    } else {
      authButtonsContainer.innerHTML = `
        <button type="button" onclick="loginWithGoogle()" class="btn-nav-google-login" style="background:#fff;color:#1e293b;border:1.5px solid #cbd5e1;padding:5px 10px;border-radius:8px;font-size:0.74rem;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:all 0.2s;box-shadow:0 2px 6px rgba(0,0,0,0.04);white-space:nowrap;">
          <svg width="13" height="13" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <span>Sign In</span>
        </button>
      `;
    }
  }

  // Admin Page Specific Gatekeeper
  if (window.location.pathname.includes('admin.html')) {
    const adminLockOverlay = document.getElementById('admin-auth-overlay');
    const adminAppRoot = document.getElementById('admin-app-root');
    const navEmail = document.getElementById('nav-user-email');

    if (isAdmin) {
      if (adminLockOverlay) adminLockOverlay.style.display = 'none';
      if (adminAppRoot) adminAppRoot.style.display = 'block';
      if (navEmail) navEmail.textContent = currentAuthUser.email;
      if (typeof startAdmin === 'function') startAdmin();
    } else {
      if (adminLockOverlay) adminLockOverlay.style.display = 'flex';
      if (adminAppRoot) adminAppRoot.style.display = 'none';

      const errBox = document.getElementById('auth-error-box');
      if (errBox) {
        if (currentAuthUser) {
          errBox.textContent = `🚫 Signed in as ${currentAuthUser.email}. Admin panel is strictly reserved for ${ADMIN_EMAIL}.`;
          errBox.style.display = 'block';
        } else {
          errBox.style.display = 'none';
        }
      }
    }
  }
}

// Listen to Firebase Auth State Changes
if (firebaseAuth) {
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      currentAuthUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null
      };
      localStorage.setItem('promptvault_user', JSON.stringify(currentAuthUser));
    } else {
      currentAuthUser = null;
      localStorage.removeItem('promptvault_user');
    }
    updateAuthUI();
  });
}

document.addEventListener('DOMContentLoaded', updateAuthUI);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  updateAuthUI();
}
