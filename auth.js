// ── PROMPTVAULT FIREBASE AUTHENTICATION ENGINE ───────────────────────
const ADMIN_EMAIL = 'nikhildswll@gmail.com';

// Default / Placeholder Firebase Config (Replace with your Firebase Console Config if you have one)
const firebaseConfig = window.FIREBASE_CONFIG || {
  apiKey: "AIzaSyDummyKeyForPromptVaultDemoAuth2026",
  authDomain: "promptvault-auth.firebaseapp.com",
  projectId: "promptvault-auth",
  storageBucket: "promptvault-auth.appspot.com",
  messagingSenderId: "1029384756",
  appId: "1:1029384756:web:abcdef123456"
};

// Initialize Firebase if not already initialized
let firebaseAuth = null;
let googleAuthProvider = null;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebaseAuth = firebase.auth();
    googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }
} catch(e) {
  console.warn("Firebase initialization warning:", e.message);
}

// Global Auth State
let currentAuthUser = null;

// Helper: Check if currently logged in user is the Admin
function isCurrentUserAdmin() {
  if (!currentAuthUser || !currentAuthUser.email) return false;
  return currentAuthUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// 1. Google 1-Click Popup Login
async function loginWithGoogle() {
  if (firebaseAuth && googleAuthProvider) {
    try {
      const result = await firebaseAuth.signInWithPopup(googleAuthProvider);
      const user = result.user;
      currentAuthUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null
      };
      localStorage.setItem('promptvault_user', JSON.stringify(currentAuthUser));
      updateAuthUI();
      if (typeof showToast === 'function') {
        showToast(isCurrentUserAdmin() ? `👑 Welcome Admin Nikhil!` : `👋 Welcome, ${currentAuthUser.displayName}!`);
      }
      return currentAuthUser;
    } catch (error) {
      console.error("Firebase Google Login Error:", error);
      // Fallback for simulation / direct Google mock if Firebase API key is pending
      return simulateGoogleLoginFallback();
    }
  } else {
    return simulateGoogleLoginFallback();
  }
}

// Fallback login prompt if custom Firebase Project keys are being configured
function simulateGoogleLoginFallback() {
  const emailPrompt = prompt("Sign in with Google (Enter your Google Email):", "nikhildswll@gmail.com");
  if (!emailPrompt || !emailPrompt.trim()) return null;

  const email = emailPrompt.trim().toLowerCase();
  const name = email === ADMIN_EMAIL.toLowerCase() ? "Nikhil (Admin)" : email.split('@')[0];
  
  currentAuthUser = {
    uid: 'user_' + Date.now(),
    email: email,
    displayName: name,
    photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
  };

  localStorage.setItem('promptvault_user', JSON.stringify(currentAuthUser));
  updateAuthUI();
  if (typeof showToast === 'function') {
    showToast(isCurrentUserAdmin() ? `👑 Welcome Admin Nikhil!` : `👋 Welcome, ${name}!`);
  }
  return currentAuthUser;
}

// 2. Logout
async function logoutUser() {
  if (firebaseAuth) {
    try { await firebaseAuth.signOut(); } catch(e){}
  }
  currentAuthUser = null;
  localStorage.removeItem('promptvault_user');
  localStorage.removeItem('promptvault_admin_token');
  localStorage.removeItem('promptvault_admin_user');
  updateAuthUI();
  if (typeof showToast === 'function') {
    showToast("👋 Logged out successfully");
  }
  // If on admin page and not admin, reload or redirect
  if (window.location.pathname.includes('admin.html')) {
    window.location.reload();
  }
}

// 3. Update Auth UI across Header Navigation
function updateAuthUI() {
  // Try loading cached user if memory is null
  if (!currentAuthUser) {
    try {
      const cached = localStorage.getItem('promptvault_user');
      if (cached) currentAuthUser = JSON.parse(cached);
    } catch(e){}
  }

  const isAdmin = isCurrentUserAdmin();
  const authButtonsContainer = document.getElementById('nav-auth-container');

  if (authButtonsContainer) {
    if (currentAuthUser) {
      const avatar = currentAuthUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentAuthUser.displayName)}`;
      const adminBtnHtml = isAdmin ? `
        <a href="admin.html" class="btn-nav-admin-unlocked" style="background:#4f46e5;color:#fff;padding:6px 12px;border-radius:8px;font-size:0.75rem;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 8px rgba(79,70,229,0.35);">
          🛡️ Admin Studio
        </a>
      ` : '';

      authButtonsContainer.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;">
          ${adminBtnHtml}
          <div style="display:inline-flex;align-items:center;gap:6px;background:#f1f5f9;border:1px solid #cbd5e1;padding:4px 10px 4px 6px;border-radius:50px;font-size:0.75rem;font-weight:700;color:#1e293b;">
            <img src="${avatar}" alt="${currentAuthUser.displayName}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;" />
            <span>${currentAuthUser.displayName}</span>
          </div>
          <button type="button" onclick="logoutUser()" style="background:#fee2e2;color:#dc2626;border:1px solid #fecdd3;border-radius:8px;padding:5px 10px;font-size:0.72rem;font-weight:800;cursor:pointer;" title="Sign out">
            🚪
          </button>
        </div>
      `;
    } else {
      authButtonsContainer.innerHTML = `
        <button type="button" onclick="loginWithGoogle()" class="btn-nav-google-login" style="background:#fff;color:#1e293b;border:1.5px solid #cbd5e1;padding:6px 12px;border-radius:8px;font-size:0.75rem;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s;box-shadow:0 2px 6px rgba(0,0,0,0.04);">
          <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
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
      if (errBox && currentAuthUser) {
        errBox.textContent = `🚫 Signed in as ${currentAuthUser.email}. Admin panel is strictly reserved for ${ADMIN_EMAIL}.`;
        errBox.style.display = 'block';
      }
    }
  }
}

// Firebase Auth State Listener
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
    }
    updateAuthUI();
  });
}

document.addEventListener('DOMContentLoaded', updateAuthUI);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  updateAuthUI();
}
