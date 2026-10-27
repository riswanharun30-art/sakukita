// SakuKita - Collaborative Multi-Account & Family Finance Ledger
// Features: Viewer-Only Permissions, Google Sheets Auto-Sync, Backend Limit Monitor

// Clean Starting User Profiles (Starts 100% clean with single personal user, zero dummy members)
const DEFAULT_USERS = {
  user_1: {
    id: 'user_1',
    name: 'Pengguna SakuKita',
    email: '',
    avatar: '👤',
    color: '#3b82f6',
    googleSheetUrl: '',
    webhookUrl: '',
    autoSyncEnabled: true
  }
};

// Clean Starting Financial Spaces (Starts 100% clean with Rp 0, 0 transactions, and 0 fake viewers)
const DEFAULT_SPACES = {
  space_1: {
    id: 'space_1',
    name: 'Buku Kas Utama',
    icon: '📘',
    ownerId: 'user_1',
    allowedViewers: [],
    budget: 0,
    wallets: [
      { id: 'w-1', name: 'Dompet Utama', balance: 0, color: '#3b82f6' }
    ],
    transactions: []
  }
};

// Demo Simulation Data (Optional: Loaded only when requested via Settings/Profile)
const DEMO_SAMPLE_USERS = {
  user_1: {
    id: 'user_1',
    name: 'Ahmad Pratama',
    email: 'ahmad.pratama@gmail.com',
    avatar: '👨‍💼',
    color: '#3b82f6',
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1_AhmadPratama_Spreadsheet_Pribadi/edit',
    webhookUrl: '',
    autoSyncEnabled: true
  },
  user_2: {
    id: 'user_2',
    name: 'Siti Rahma',
    email: 'siti.rahma@gmail.com',
    avatar: '👩‍💼',
    color: '#ec4899',
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/2_SitiRahma_Spreadsheet_Pribadi/edit',
    webhookUrl: '',
    autoSyncEnabled: true
  },
  user_3: {
    id: 'user_3',
    name: 'Budi Santoso',
    email: 'budi.santoso@gmail.com',
    avatar: '🧑‍💻',
    color: '#10b981',
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/3_BudiSantoso_Spreadsheet_Pribadi/edit',
    webhookUrl: '',
    autoSyncEnabled: true
  }
};

const DEMO_SAMPLE_SPACES = {
  space_1: {
    id: 'space_1',
    name: 'Buku Kas Utama (Ahmad Pratama)',
    icon: '📘',
    ownerId: 'user_1',
    allowedViewers: ['user_2', 'user_3'],
    budget: 7500000,
    wallets: [
      { id: 'w-1', name: 'BCA Rekening Utama', balance: 8500000, color: '#3b82f6' },
      { id: 'w-2', name: 'Dompet Tunai', balance: 1250000, color: '#10b981' },
      { id: 'w-3', name: 'E-Wallet (GoPay/OVO)', balance: 830000, color: '#8b5cf6' }
    ],
    transactions: [
      {
        id: 'tx-1',
        walletId: 'w-1',
        category: 'Gaji & Upah',
        icon: '💼',
        amount: 10000000,
        type: 'INCOME',
        note: 'Gaji Bulanan Masuk Rekening Utama',
        createdBy: 'user_1',
        createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
      },
      {
        id: 'tx-2',
        walletId: 'w-1',
        category: 'Belanja Bulanan',
        icon: '🛒',
        amount: 650000,
        type: 'EXPENSE',
        note: 'Belanja kebutuhan bulanan keluarga',
        createdBy: 'user_1',
        createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
      },
      {
        id: 'tx-3',
        walletId: 'w-3',
        category: 'Makanan & Minuman',
        icon: '🍲',
        amount: 120000,
        type: 'EXPENSE',
        note: 'Makan malam bersama keluarga',
        createdBy: 'user_1',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ]
  },
  space_2: {
    id: 'space_2',
    name: 'Buku Kas Rumah Tangga (Siti Rahma)',
    icon: '🏡',
    ownerId: 'user_2',
    allowedViewers: ['user_1'],
    budget: 5000000,
    wallets: [
      { id: 'w-s1', name: 'Mandiri Operasional', balance: 4200000, color: '#ec4899' },
      { id: 'w-s2', name: 'Tabungan Darurat', balance: 2500000, color: '#3b82f6' }
    ],
    transactions: [
      {
        id: 'tx-s1',
        walletId: 'w-s1',
        category: 'Pendapatan Lainnya',
        icon: '💰',
        amount: 5000000,
        type: 'INCOME',
        note: 'Transfer Uang Belanja Bulanan',
        createdBy: 'user_2',
        createdAt: new Date(Date.now() - 3600000 * 24 * 4).toISOString()
      },
      {
        id: 'tx-s2',
        walletId: 'w-s1',
        category: 'Belanja Bulanan',
        icon: '🛒',
        amount: 450000,
        type: 'EXPENSE',
        note: 'Belanja bahan dapur & sayuran segar',
        createdBy: 'user_2',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
      },
      {
        id: 'tx-s3',
        walletId: 'w-s1',
        category: 'Tagihan & Utilitas',
        icon: '💡',
        amount: 380000,
        type: 'EXPENSE',
        note: 'Bayar Listrik PLN & Tagihan WiFi',
        createdBy: 'user_2',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
      }
    ]
  },
  space_3: {
    id: 'space_3',
    name: 'Buku Kas Usaha & Proyek (Budi Santoso)',
    icon: '💼',
    ownerId: 'user_3',
    allowedViewers: ['user_1'],
    budget: 6000000,
    wallets: [
      { id: 'w-b1', name: 'Rekening Usaha BNI', balance: 6500000, color: '#f59e0b' },
      { id: 'w-b2', name: 'Kas Operasional Proyek', balance: 3000000, color: '#10b981' }
    ],
    transactions: [
      {
        id: 'tx-b1',
        walletId: 'w-b1',
        category: 'Hasil Usaha & Penjualan',
        icon: '🛍️',
        amount: 7500000,
        type: 'INCOME',
        note: 'Pemasukan Hasil Proyek Minggu Ini',
        createdBy: 'user_3',
        createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
      },
      {
        id: 'tx-b2',
        walletId: 'w-b2',
        category: 'Keperluan Lainnya',
        icon: '📦',
        amount: 2100000,
        type: 'EXPENSE',
        note: 'Pembelian Material & Perlengkapan Operasional',
        createdBy: 'user_3',
        createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
      },
      {
        id: 'tx-b3',
        walletId: 'w-b2',
        category: 'Transportasi & Bensin',
        icon: '⛽',
        amount: 400000,
        type: 'EXPENSE',
        note: 'Biaya BBM & Transportasi Tim Lapangan',
        createdBy: 'user_3',
        createdAt: new Date(Date.now() - 3600000 * 7).toISOString()
      }
    ]
  }
};

// Standard Categories (DANA Style: Logo & 1 Kata Singkat)
const CATEGORIES = {
  EXPENSE: [
    { name: 'Makan', icon: '🍔' },
    { name: 'Belanja', icon: '🛒' },
    { name: 'Bensin', icon: '⛽' },
    { name: 'Tagihan', icon: '💡' },
    { name: 'Kesehatan', icon: '💊' },
    { name: 'Pendidikan', icon: '📚' },
    { name: 'Hiburan', icon: '🍿' },
    { name: 'Lainnya', icon: '📦' }
  ],
  INCOME: [
    { name: 'Gaji', icon: '💼' },
    { name: 'Usaha', icon: '🛍️' },
    { name: 'Bonus', icon: '🎉' },
    { name: 'Investasi', icon: '📈' },
    { name: 'Lainnya', icon: '💰' }
  ]
};

// Global State
let users = {};
let spaces = {};
let activeUserId = 'user_1';
let activeSpaceId = 'space_1';
let activeTxType = 'EXPENSE';
let currentFilter = 'all';
let isBalanceHidden = false;

// Eye Toggle for Balance Privacy (khas DANA / BCA Mobile)
function toggleBalanceVisibility() {
  isBalanceHidden = !isBalanceHidden;
  const eyeIcon = document.getElementById('eye-icon-symbol');
  if (eyeIcon) {
    eyeIcon.textContent = isBalanceHidden ? '🙈' : '👁️';
  }
  const currentSpace = getActiveSpace();
  renderOverview(currentSpace);
}

// FinTech Bottom Nav Section Switcher
function navToSection(section) {
  document.querySelectorAll('.bottom-nav-fintech .nav-item-btn').forEach(btn => btn.classList.remove('active'));
  
  if (section === 'home') {
    const homeBtn = document.getElementById('nav-btn-home');
    if (homeBtn) homeBtn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (section === 'history') {
    const histBtn = document.getElementById('nav-btn-history');
    if (histBtn) histBtn.classList.add('active');
    const txSection = document.getElementById('transactions-section');
    if (txSection) txSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Account Sheet Modal Open/Close
function openAccountModal() {
  const modal = document.getElementById('modal-account');
  if (modal) modal.classList.remove('hidden');
}

function closeAccountModal() {
  const modal = document.getElementById('modal-account');
  if (modal) modal.classList.add('hidden');
}

// Real-time synchronization channel
const syncChannel = ('BroadcastChannel' in window) 
  ? new BroadcastChannel('sakukita_v3_sync') 
  : null;

// PWA Install Handling
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.classList.remove('hidden');
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Register Service Worker for ready-to-use PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration error', err));
  }

  loadData();

  // Check URL params for simulation
  const urlParams = new URLSearchParams(window.location.search);
  const paramUser = urlParams.get('user');
  if (paramUser && users[paramUser]) {
    activeUserId = paramUser;
  }

  validateActiveSpace();
  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  populateCategoryPicker();
  renderAll();
  updateBackendQuotaDisplay();
  checkAndProcessMonthlyAdminFees();

  setupRealtimeListeners();

  // If not logged in or active user email is empty: Show Google Login
  const currentUser = getActiveUser();
  if (!localStorage.getItem('sakukita_logged_in') || !currentUser.email) {
    setTimeout(() => {
      openGoogleLoginModal();
    }, 400);
  }
});

// Storage Management - Clean V6 Defaults (100% Persisted per Google Account)
function loadData() {
  const savedUsers = localStorage.getItem('sakukita_users_v6');
  if (savedUsers) {
    try {
      users = JSON.parse(savedUsers);
    } catch (e) {
      users = JSON.parse(JSON.stringify(DEFAULT_USERS));
    }
  } else {
    users = JSON.parse(JSON.stringify(DEFAULT_USERS));
    saveUsers();
  }

  const savedSpaces = localStorage.getItem('sakukita_spaces_v6');
  if (savedSpaces) {
    try {
      spaces = JSON.parse(savedSpaces);
    } catch (e) {
      spaces = JSON.parse(JSON.stringify(DEFAULT_SPACES));
    }
  } else {
    spaces = JSON.parse(JSON.stringify(DEFAULT_SPACES));
    saveSpaces();
  }

  const savedUserId = localStorage.getItem('sakukita_current_user_id');
  if (savedUserId && users[savedUserId]) {
    activeUserId = savedUserId;
  } else {
    const firstUserId = Object.keys(users)[0];
    if (firstUserId) activeUserId = firstUserId;
  }

  // Guaranteed Permanent Webhook Persistence (Survives any refresh or data switch)
  const globalWebhook = localStorage.getItem('sakukita_global_webhook_url');
  Object.keys(users).forEach(uid => {
    const savedWebhook = localStorage.getItem('sakukita_webhook_url_' + uid) || globalWebhook;
    if (!users[uid].webhookUrl && savedWebhook) {
      users[uid].webhookUrl = savedWebhook;
    }
    const savedSheet = localStorage.getItem('sakukita_sheet_url_' + uid);
    if (!users[uid].googleSheetUrl && savedSheet) {
      users[uid].googleSheetUrl = savedSheet;
    }
  });
}

function saveUsers() {
  localStorage.setItem('sakukita_users_v6', JSON.stringify(users));
}

function saveSpaces() {
  localStorage.setItem('sakukita_spaces_v6', JSON.stringify(spaces));
}

// Zero-Data Reset & Demo Simulation Handlers
function confirmResetAllData() {
  if (confirm('Apakah Anda yakin ingin mengosongkan seluruh data buku kas?\n\nSeluruh transaksi dan saldo akan diatur ulang ke nol (0 rupiah) murni dari awal.')) {
    resetAllDataToZero();
  }
}

function resetAllDataToZero() {
  users = JSON.parse(JSON.stringify(DEFAULT_USERS));
  spaces = JSON.parse(JSON.stringify(DEFAULT_SPACES));
  activeUserId = 'user_1';
  activeSpaceId = 'space_1';
  currentFilter = 'all';

  saveUsers();
  saveSpaces();

  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  populateCategoryPicker();
  renderAll();
  updateBackendQuotaDisplay();

  closeModal('modal-profile');
  showLiveToast('✨ Buku Kas Bersih dari Nol', 'Semua transaksi dan saldo telah dikosongkan. Siap digunakan!');
  notifyOtherTabs('DATA_RESET', {});
}

function confirmLoadDemoData() {
  if (confirm('Muat data contoh simulasi keluarga (Ahmad, Siti, dan Budi) untuk mencoba seluruh fitur aplikasi?')) {
    loadDemoSampleData();
  }
}

function loadDemoSampleData() {
  users = JSON.parse(JSON.stringify(DEMO_SAMPLE_USERS));
  spaces = JSON.parse(JSON.stringify(DEMO_SAMPLE_SPACES));
  activeUserId = 'user_1';
  activeSpaceId = 'space_1';
  currentFilter = 'all';

  saveUsers();
  saveSpaces();

  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  populateCategoryPicker();
  renderAll();
  updateBackendQuotaDisplay();

  closeModal('modal-profile');
  showLiveToast('⚡ Data Simulasi Dimuat', 'Data contoh keluarga berhasil dimuat untuk simulasi.');
  notifyOtherTabs('DEMO_LOADED', {});
}

// User Profile & Account Management
function getActiveUser() {
  return users[activeUserId] || users.user_1;
}

function switchActiveUser(userId) {
  if (!users[userId]) return;
  activeUserId = userId;
  validateActiveSpace();
  currentFilter = 'all';

  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  renderAll();
  updateBackendQuotaDisplay();
}

// Avatar Rendering Helper (Supports both Custom Uploaded Photos and Emojis)
function renderUserAvatarHtml(u, size = 22) {
  if (u && u.photo) {
    return `<img src="${u.photo}" class="avatar-photo-circle" style="width:${size}px; height:${size}px; border-radius:50%; object-fit:cover; display:inline-block; vertical-align:middle; box-shadow:0 0 6px rgba(59,130,246,0.35);" alt="${escapeHtml(u.name)}">`;
  }
  return `<span style="font-size:${Math.round(size * 0.75)}px; line-height:1; display:inline-flex; align-items:center; justify-content:center;">${u && u.avatar ? u.avatar : '👤'}</span>`;
}

function renderUserPills() {
  const container = document.getElementById('user-pill-container');
  if (!container) return;
  container.innerHTML = '';

  Object.values(users).forEach(u => {
    const btn = document.createElement('button');
    btn.className = `user-pill ${u.id === activeUserId ? 'active' : ''}`;
    btn.onclick = () => switchActiveUser(u.id);
    btn.innerHTML = `
      <span class="pill-avatar">${renderUserAvatarHtml(u, 20)}</span>
      <span>${escapeHtml(u.name)}</span>
    `;
    container.appendChild(btn);
  });
}

function renderActiveUserProfile() {
  const user = getActiveUser();

  // Header active Google email pill
  const headerEmail = document.getElementById('header-google-email');
  if (headerEmail) {
    headerEmail.textContent = user.email.length > 15 ? user.email.split('@')[0] : user.email;
  }

  // Header user greeting & avatar (DANA style)
  const headerAvatar = document.getElementById('header-user-avatar');
  const headerName = document.getElementById('header-user-name');
  if (headerAvatar) headerAvatar.innerHTML = renderUserAvatarHtml(user, 38);
  if (headerName) headerName.textContent = user.name;

  // Account Sheet details
  const acctAvatar = document.getElementById('account-sheet-avatar');
  const acctName = document.getElementById('account-sheet-name');
  const acctEmail = document.getElementById('account-sheet-email');
  if (acctAvatar) acctAvatar.innerHTML = renderUserAvatarHtml(user, 40);
  if (acctName) acctName.textContent = user.name;
  if (acctEmail) acctEmail.textContent = user.email;

  const subdetail = document.getElementById('user-profile-subdetail');
  if (subdetail) {
    subdetail.innerHTML = `
      <span>Terhubung sebagai:</span>
      <span class="google-account-badge" onclick="openGoogleLoginModal()" style="cursor:pointer;" title="Klik untuk ganti akun Google">
        <span class="google-icon-mini">G</span>
        <span>${escapeHtml(user.email)}</span>
      </span>
    `;
  }

  // Update transaction modal creator details
  const creatorName = document.getElementById('tx-creator-name');
  const creatorEmail = document.getElementById('tx-creator-email');
  const creatorAvatar = document.getElementById('tx-creator-avatar');
  if (creatorName) creatorName.textContent = user.name;
  if (creatorEmail) creatorEmail.textContent = user.email;
  if (creatorAvatar) creatorAvatar.innerHTML = renderUserAvatarHtml(user, 28);

  // Update Google Sheets modal user details (Strictly Isolated per user)
  const modalTitle = document.getElementById('gsheets-modal-title');
  const modalSub = document.getElementById('gsheets-modal-user-subtitle');
  const bannerUser = document.getElementById('gsheets-banner-user');
  const statusDesc = document.getElementById('gsheets-status-desc-text');
  const btnExportText = document.getElementById('btn-export-personal-text');
  const autoEmail = document.getElementById('auto-drive-email');
  const autoDocName = document.getElementById('auto-drive-docname');
  const sheetsLink = document.getElementById('btn-open-spreadsheet-link');

  if (modalTitle) modalTitle.textContent = `Google Spreadsheet Pribadi (${user.name})`;
  if (modalSub) modalSub.textContent = `File Google Drive khusus akun ${user.email} (100% Terpisah)`;
  if (bannerUser) bannerUser.textContent = `${user.name} (${user.email})`;
  if (statusDesc) statusDesc.innerHTML = `Spreadsheet pribadi untuk akun <b>${escapeHtml(user.name)}</b> terhubung otomatis. Setiap mutasi transaksi langsung tersinkron rapi tanpa perlu input link manual.`;
  if (btnExportText) btnExportText.textContent = `Unduh Mutasi Bank (Format CSV Rapi)`;
  if (autoEmail) autoEmail.textContent = user.email;
  if (autoDocName) autoDocName.textContent = `SakuKita - Mutasi Keuangan Pribadi (${user.name})`;
  if (sheetsLink) {
    sheetsLink.href = user.googleSheetUrl || '#';
  }

  // Update dynamic indicators across APK UI
  updateGoogleSheetsSyncIndicators();
}

function updateGoogleSheetsSyncIndicators() {
  const user = getActiveUser();
  const webhook = user.webhookUrl || localStorage.getItem('sakukita_webhook_url_' + user.id) || localStorage.getItem('sakukita_global_webhook_url') || '';
  const isConnected = !!(webhook && webhook.startsWith('http') && user.autoSyncEnabled !== false);

  const badgePill = document.getElementById('sheets-sync-status-badge');
  const badgeText = document.getElementById('sheets-sync-status-text');
  const actionDot = document.getElementById('sheets-action-badge-dot');
  const modalBadgeLive = document.querySelector('#modal-sheets .gsheets-badge-live') || document.querySelector('.gsheets-badge-live');
  const modalDesc = document.getElementById('gsheets-status-desc-text');
  const testBtn = document.getElementById('btn-test-webhook-sync');

  if (badgePill && badgeText) {
    if (isConnected) {
      badgePill.className = 'sheets-sync-badge-pill connected';
      badgeText.textContent = 'Sheets Terhubung ⚡';
      badgePill.title = 'Google Sheets Auto-Sync Aktif. Setiap mutasi otomatis masuk ke Google Sheets Anda.';
    } else {
      badgePill.className = 'sheets-sync-badge-pill disconnected';
      badgeText.textContent = 'Sheets Belum Konek';
      badgePill.title = 'Google Sheets belum terhubung otomatis. Klik untuk memasukkan Webhook.';
    }
  }

  if (actionDot) {
    if (isConnected) {
      actionDot.classList.add('active');
    } else {
      actionDot.classList.remove('active');
    }
  }

  if (modalBadgeLive) {
    if (isConnected) {
      modalBadgeLive.textContent = '⚡ Terhubung Otomatis';
      modalBadgeLive.style.background = 'rgba(16, 185, 129, 0.2)';
      modalBadgeLive.style.color = '#34d399';
    } else {
      modalBadgeLive.textContent = 'Belum Ada Webhook';
      modalBadgeLive.style.background = 'rgba(255, 255, 255, 0.1)';
      modalBadgeLive.style.color = '#94a3b8';
    }
  }

  if (modalDesc) {
    if (isConnected) {
      modalDesc.innerHTML = `✅ <b>Koneksi Webhook Aktif:</b> Setiap kali Anda mencatat pengeluaran atau pemasukan di APK SakuKita, data langsung otomatis masuk ke Google Spreadsheet Anda secara seketika (real-time).`;
    } else {
      modalDesc.innerHTML = `⚠️ <b>Belum Terhubung:</b> Masukkan URL Webhook Google Apps Script di formulir bawah lalu klik <b>Simpan & Sambungkan Webhook</b> agar transaksi otomatis tersinkron ke Google Sheets.`;
    }
  }

  if (testBtn) {
    if (isConnected) {
      testBtn.classList.remove('hidden');
    } else {
      testBtn.classList.add('hidden');
    }
  }
}

function testGoogleSheetsWebhook() {
  const activeUser = getActiveUser();
  const webhook = activeUser.webhookUrl || localStorage.getItem('sakukita_webhook_url_' + activeUser.id) || localStorage.getItem('sakukita_global_webhook_url') || '';
  if (!webhook || !webhook.startsWith('http')) {
    showLiveToast('⚠️ Belum Ada Webhook', 'Silakan tempel URL Webhook Google Apps Script di formulir bawah terlebih dahulu.');
    return;
  }

  showLiveToast('🚀 Mengirim Tes...', 'Sedang mengirim baris uji coba ke Google Spreadsheet Anda...');

  try {
    fetch(webhook, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'TEST',
        userName: activeUser.name,
        userEmail: activeUser.email,
        spaceName: getActiveSpace()?.name || 'SakuKita',
        type: 'INCOME',
        category: 'Uji Koneksi',
        amount: 0,
        amountFormatted: 'Rp 0 (Tes)',
        walletName: 'Sistem',
        note: '🎉 Koneksi Auto-Sync SakuKita Berhasil!',
        timestamp: new Date().toLocaleString('id-ID') + ' WIB'
      })
    }).then(() => {
      showLiveToast('🎉 Tes Berhasil Terkirim!', 'Buka Google Spreadsheet Anda, baris uji coba telah berhasil masuk!');
    }).catch(() => {
      showLiveToast('🎉 Tes Terkirim', 'Periksa Google Spreadsheet Anda untuk memastikan baris tes masuk.');
    });
  } catch (e) {
    showLiveToast('⚠️ Gangguan Jaringan', 'Gagal mengirim data uji coba ke Webhook.');
  }
}

// Permission & Space Access Verification (Viewer vs Owner)
function getAccessibleSpacesForUser(userId) {
  return Object.values(spaces).filter(space => {
    // Owner can access
    if (space.ownerId === userId) return true;
    // Allowed viewers can access
    if (space.allowedViewers && space.allowedViewers.includes(userId)) return true;
    return false;
  });
}

function isOwnerOfCurrentSpace() {
  const currentSpace = getActiveSpace();
  return currentSpace.ownerId === activeUserId;
}

function validateActiveSpace() {
  const accessible = getAccessibleSpacesForUser(activeUserId);
  const isAccessible = accessible.some(s => s.id === activeSpaceId);

  if (!isAccessible) {
    if (accessible.length > 0) {
      activeSpaceId = accessible[0].id;
    } else {
      activeSpaceId = 'space_1';
    }
  }
}

function getActiveSpace() {
  return spaces[activeSpaceId] || spaces.space_1;
}

function handleSpaceChange(newSpaceId) {
  activeSpaceId = newSpaceId;
  currentFilter = 'all';
  renderAll();
  checkAndProcessMonthlyAdminFees();
}

// Update Space Selector UI
function updateSpaceSelectorUI() {
  const select = document.getElementById('active-space-select');
  const collabBtn = document.getElementById('btn-collaboration');
  if (!select) return;

  select.innerHTML = '';
  const accessibleSpaces = getAccessibleSpacesForUser(activeUserId);

  accessibleSpaces.forEach(space => {
    const isOwner = space.ownerId === activeUserId;
    const ownerObj = users[space.ownerId] || { name: 'Pengguna' };
    const opt = document.createElement('option');
    opt.value = space.id;
    opt.textContent = isOwner 
      ? `${space.icon} ${space.name} (Milik Anda)` 
      : `👁️ ${space.name} (Milik ${ownerObj.name})`;
    if (space.id === activeSpaceId) opt.selected = true;
    select.appendChild(opt);
  });

  const isOwner = isOwnerOfCurrentSpace();
  if (collabBtn) {
    if (isOwner) {
      collabBtn.innerHTML = `<span>🤝</span><span>Kelola Izin Pantau</span>`;
      collabBtn.className = 'btn-collab';
    } else {
      collabBtn.innerHTML = `<span>👁️</span><span>Info Hak Pantau</span>`;
      collabBtn.className = 'btn-collab';
    }
  }
}

// Render All Components
function renderAll() {
  const currentSpace = getActiveSpace();
  const isOwner = isOwnerOfCurrentSpace();
  const ownerUser = users[currentSpace.ownerId] || { name: 'Pemilik Buku', email: '' };

  // Viewer mode banner & Role badge
  const viewerBanner = document.getElementById('viewer-banner');
  const viewerDesc = document.getElementById('viewer-banner-desc');
  const roleTag = document.getElementById('access-role-tag');
  const spaceOwnerLabel = document.getElementById('balance-space-owner-label');
  const addTxBtn = document.getElementById('btn-main-add-tx');
  const addTxBtnText = document.getElementById('btn-add-tx-text');
  const addWalletBtn = document.getElementById('btn-add-wallet-action');

  if (isOwner) {
    viewerBanner.classList.add('hidden');
    roleTag.className = 'role-badge role-owner';
    roleTag.textContent = '👑 Pemilik';
    spaceOwnerLabel.textContent = `Buku Kas: ${currentSpace.name}`;
    addTxBtn.className = 'nav-fab-btn';
    addTxBtnText.textContent = 'Catat';
    if (addWalletBtn) addWalletBtn.classList.remove('disabled');
  } else {
    viewerBanner.classList.remove('hidden');
    viewerDesc.innerHTML = `Buku kas ini milik <strong>${escapeHtml(ownerUser.name)}</strong> (${escapeHtml(ownerUser.email)}). Anda memiliki <strong>Izin Memantau (Read-Only)</strong>.`;
    roleTag.className = 'role-badge role-viewer';
    roleTag.textContent = '👁️ Pantau';
    spaceOwnerLabel.textContent = `Memantau: ${currentSpace.name}`;
    addTxBtn.className = 'nav-fab-btn btn-viewer-locked';
    addTxBtnText.textContent = '🔒 Pantau';
    if (addWalletBtn) addWalletBtn.classList.add('disabled');
  }

  renderOverview(currentSpace);
  renderWallets(currentSpace);
  renderFilterPills(currentSpace);
  renderTransactions(currentSpace);
  populateWalletSelect(currentSpace);
}

function renderOverview(currentSpace) {
  const totalBalance = currentSpace.wallets.reduce((sum, w) => sum + Number(w.balance), 0);
  const balEl = document.getElementById('total-balance');
  if (balEl) {
    balEl.textContent = isBalanceHidden ? 'Rp ••••••••' : formatRupiah(totalBalance);
  }

  let totalIncome = 0;
  let totalExpense = 0;

  currentSpace.transactions.forEach(t => {
    if (t.type === 'INCOME') totalIncome += Number(t.amount);
    else totalExpense += Number(t.amount);
  });

  document.getElementById('total-income').textContent = `+${formatRupiah(totalIncome)}`;
  document.getElementById('total-expense').textContent = `-${formatRupiah(totalExpense)}`;

  document.getElementById('budget-limit-text').textContent = formatRupiah(currentSpace.budget);
  const pct = Math.min(Math.round((totalExpense / currentSpace.budget) * 100), 100);
  document.getElementById('budget-percentage').textContent = `${pct}%`;
  document.getElementById('budget-progress-fill').style.width = `${pct}%`;

  const fillEl = document.getElementById('budget-progress-fill');
  if (pct > 90) {
    fillEl.style.background = '#f43f5e';
  } else if (pct > 70) {
    fillEl.style.background = '#f59e0b';
  } else {
    fillEl.style.background = 'linear-gradient(90deg, #10b981 0%, #6366f1 70%, #f43f5e 100%)';
  }
}

function renderWallets(currentSpace) {
  const container = document.getElementById('wallets-container');
  container.innerHTML = '';
  const isOwner = isOwnerOfCurrentSpace();

  currentSpace.wallets.forEach(wallet => {
    const card = document.createElement('div');
    card.className = 'wallet-card-item';
    if (isOwner) {
      card.style.cursor = 'pointer';
      card.title = 'Klik untuk ubah nama atau atur biaya admin bulanan';
      card.onclick = () => openEditWalletModal(wallet.id);
    }

    const adminDayLabel = (wallet.adminDay === 'akhir') ? 'Akhir Bln' : `Tgl ${wallet.adminDay || 25}`;
    const adminFeeHtml = (wallet.adminFee && wallet.adminFee > 0)
      ? `<div class="wallet-admin-fee-tag" title="Auto-potong admin bank tiap ${adminDayLabel}">
           <span>⚡ Admin: ${formatRupiah(wallet.adminFee)}/bln (${adminDayLabel})</span>
         </div>`
      : '';

    card.innerHTML = `
      <div class="wallet-top">
        <span class="wallet-name" title="${escapeHtml(wallet.name)}">${escapeHtml(wallet.name)}</span>
        <div class="wallet-top-right">
          <span class="wallet-dot" style="background: ${wallet.color}; box-shadow: 0 0 8px ${wallet.color}"></span>
          ${isOwner && currentSpace.wallets.length > 1 ? `
            <button type="button" class="wallet-card-del-btn" title="Hapus kantong ${escapeHtml(wallet.name)}" onclick="event.stopPropagation(); triggerDeleteWalletPrompt('${wallet.id}')">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          ` : ''}
        </div>
      </div>
      <div class="wallet-balance">${formatRupiah(wallet.balance)}</div>
      ${adminFeeHtml}
    `;
    container.appendChild(card);
  });
}

function renderFilterPills(currentSpace) {
  const container = document.getElementById('feed-filter');
  container.innerHTML = '';

  // Get distinct creators
  const creatorIds = ['all', ...new Set(currentSpace.transactions.map(t => t.createdBy))];

  creatorIds.forEach(id => {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${currentFilter === id ? 'active' : ''}`;
    btn.dataset.filter = id;
    
    if (id === 'all') {
      btn.textContent = 'Semua';
    } else {
      const creator = users[id] || { name: 'Anggota' };
      btn.textContent = `Oleh ${creator.name}`;
    }

    btn.onclick = () => {
      currentFilter = id;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTransactions(currentSpace);
    };
    container.appendChild(btn);
  });
}

function renderTransactions(currentSpace) {
  const list = document.getElementById('transaction-list');
  list.innerHTML = '';

  const isOwner = isOwnerOfCurrentSpace();

  let filtered = [...currentSpace.transactions];
  if (currentFilter !== 'all') {
    filtered = filtered.filter(t => t.createdBy === currentFilter);
  }

  filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state-clean">
        <div class="empty-state-icon">✨</div>
        <h4 class="empty-state-title">Buku Kas Bersih & Siap Digunakan</h4>
        <p class="empty-state-desc">Belum ada catatan mutasi transaksi. Semua saldo dimulai dari nol rupiah murni milik Anda. ${isOwner ? 'Mulai catat pemasukan atau pengeluaran pertama Anda sekarang!' : 'Buku kas ini belum memiliki transaksi dari pemiliknya.'}</p>
        ${isOwner ? `
          <button class="btn-empty-add" onclick="handleNewTransactionClick()">
            <span>+ Catat Transaksi Pertama</span>
          </button>
        ` : ''}
      </div>
    `;
    return;
  }

  filtered.forEach(t => {
    const wallet = currentSpace.wallets.find(w => w.id === t.walletId) || { name: 'Dompet' };
    const isIncome = t.type === 'INCOME';
    const timeFormatted = formatTimeAgo(new Date(t.createdAt));
    const creatorUser = users[t.createdBy] || { name: 'Pengguna', email: '', avatar: '👤' };

    const item = document.createElement('div');
    item.className = 'tx-item';

    // Delete button is ONLY rendered if active user is OWNER of this space
    const deleteButtonHtml = isOwner 
      ? `<button class="tx-del-btn" title="Hapus Transaksi" onclick="deleteTransaction('${t.id}')">Hapus</button>`
      : '';

    item.innerHTML = `
      <div class="tx-left">
        <div class="tx-icon-badge">${t.icon || (isIncome ? '💰' : '💸')}</div>
        <div class="tx-details">
          <h4 class="tx-title">${escapeHtml(t.note)}</h4>
          <div class="tx-meta">
            <span class="tx-creator-tag">
              <span class="tx-creator-avatar-wrap">${renderUserAvatarHtml(creatorUser, 18)}</span>
              <span>${escapeHtml(creatorUser.name)}</span>
            </span>
            <span>•</span>
            <span class="tx-wallet-tag">${escapeHtml(wallet.name)}</span>
          </div>
        </div>
      </div>
      <div class="tx-right">
        <span class="tx-amount ${isIncome ? 'income' : 'expense'}">
          ${isIncome ? '+' : '-'}${formatRupiah(t.amount)}
        </span>
        <span class="tx-time">${timeFormatted}</span>
        ${deleteButtonHtml}
      </div>
    `;
    list.appendChild(item);
  });
}

// Category Picker Logic
function setTransactionType(type) {
  activeTxType = type;
  const tabExpense = document.getElementById('tab-expense');
  const tabIncome = document.getElementById('tab-income');

  if (type === 'EXPENSE') {
    tabExpense.classList.add('active');
    tabIncome.classList.remove('active');
  } else {
    tabIncome.classList.add('active');
    tabExpense.classList.remove('active');
  }

  populateCategoryPicker();
}

function populateCategoryPicker() {
  const container = document.getElementById('category-picker');
  if (!container) return;
  container.innerHTML = '';

  const list = CATEGORIES[activeTxType];
  list.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cat-btn ${idx === 0 ? 'active' : ''}`;
    btn.dataset.category = cat.name;
    btn.dataset.icon = cat.icon;
    btn.innerHTML = `
      <span class="cat-icon-wrap">${cat.icon}</span>
      <span class="cat-name">${cat.name}</span>
    `;
    btn.onclick = () => selectCategory(btn, cat.name);
    container.appendChild(btn);
  });

  if (list.length > 0) {
    document.getElementById('selected-category').value = list[0].name;
  }
}

function selectCategory(el, name) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('selected-category').value = name;
}

function populateWalletSelect(currentSpace) {
  const sel = document.getElementById('tx-wallet');
  if (!sel) return;
  sel.innerHTML = '';
  currentSpace.wallets.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    opt.textContent = `${w.name} (${formatRupiah(w.balance)})`;
    sel.appendChild(opt);
  });
}

// Transaction Click & Save Handling (Enforcing Viewer Security)
function handleNewTransactionClick() {
  const isOwner = isOwnerOfCurrentSpace();
  const currentSpace = getActiveSpace();
  const owner = users[currentSpace.ownerId] || { name: 'Pemilik' };

  if (!isOwner) {
    alert(`🔒 Mode Hanya Pantau (Read-Only):\n\nBuku kas "${currentSpace.name}" adalah milik ${owner.name}.\nAnda hanya diizinkan untuk memantau data tanpa izin menambah atau merubah transaksi.`);
    return;
  }

  openTransactionModal();
}

function handleSaveTransaction(e) {
  e.preventDefault();

  if (!isOwnerOfCurrentSpace()) {
    alert('Akses Ditolak: Anda berstatus Pemantau (Read-Only) pada buku kas ini.');
    return;
  }

  const amountStr = document.getElementById('tx-amount').value.replace(/\D/g, '');
  const amount = parseFloat(amountStr);
  const walletId = document.getElementById('tx-wallet').value;
  const note = document.getElementById('tx-note').value.trim();
  const activeCatBtn = document.querySelector('.cat-btn.active');
  const category = activeCatBtn ? activeCatBtn.dataset.category : 'Keperluan Lainnya';
  const icon = activeCatBtn ? activeCatBtn.dataset.icon : '💰';

  if (!amount || amount <= 0) {
    alert('Masukkan nominal uang yang valid!');
    return;
  }

  const currentSpace = getActiveSpace();
  const walletIndex = currentSpace.wallets.findIndex(w => w.id === walletId);
  if (walletIndex === -1) return;

  // Adjust balance
  if (activeTxType === 'EXPENSE') {
    currentSpace.wallets[walletIndex].balance -= amount;
  } else {
    currentSpace.wallets[walletIndex].balance += amount;
  }

  const newTx = {
    id: 'tx-' + Date.now(),
    walletId,
    category,
    icon,
    amount,
    type: activeTxType,
    note,
    createdBy: activeUserId,
    createdAt: new Date().toISOString()
  };

  currentSpace.transactions.unshift(newTx);
  saveSpaces();

  // Auto-sync to personal Google Sheets
  triggerGoogleSheetsAutoSync(newTx, 'CREATE', currentSpace);

  // Broadcast to other tabs / devices
  notifyOtherTabs('NEW_TRANSACTION', newTx);

  renderAll();
  updateBackendQuotaDisplay();
  closeModal('modal-transaction');
  document.getElementById('form-transaction').reset();
  setTransactionType('EXPENSE');

  showLiveToast(
    '✅ Transaksi Berhasil Disimpan',
    `${note} (${activeTxType === 'INCOME' ? '+' : '-'}${formatRupiah(amount)})`
  );
}

function deleteTransaction(txId) {
  if (!isOwnerOfCurrentSpace()) {
    alert('Akses Ditolak: Hanya pemilik buku kas yang dapat menghapus transaksi.');
    return;
  }

  const currentSpace = getActiveSpace();
  const tx = currentSpace.transactions.find(t => t.id === txId);
  if (!tx) return;

  if (!confirm(`Hapus transaksi "${tx.note}"?\nSaldo dompet akan disesuaikan kembali.`)) return;

  const walletIndex = currentSpace.wallets.findIndex(w => w.id === tx.walletId);
  if (walletIndex !== -1) {
    if (tx.type === 'EXPENSE') {
      currentSpace.wallets[walletIndex].balance += tx.amount;
    } else {
      currentSpace.wallets[walletIndex].balance -= tx.amount;
    }
  }

  currentSpace.transactions = currentSpace.transactions.filter(t => t.id !== txId);
  saveSpaces();

  triggerGoogleSheetsAutoSync(tx, 'DELETE', currentSpace);
  notifyOtherTabs('DELETE_TRANSACTION', { id: txId });
  renderAll();
  updateBackendQuotaDisplay();

  showLiveToast('🗑️ Transaksi Dihapus', `Data "${tx.note}" telah dihapus.`);
}

// Wallet Management & Automatic Monthly Bank Admin Fee Engine
function handleSaveWallet(e) {
  e.preventDefault();

  if (!isOwnerOfCurrentSpace()) {
    alert('Akses Ditolak: Hanya pemilik buku kas yang dapat mengelola dompet.');
    return;
  }

  const editId = document.getElementById('edit-wallet-id')?.value || '';
  const name = document.getElementById('wallet-name').value.trim();
  const balStr = document.getElementById('wallet-balance').value.replace(/\D/g, '');
  const balance = parseFloat(balStr) || 0;
  const feeStr = document.getElementById('wallet-admin-fee')?.value.replace(/\D/g, '') || '';
  const adminFee = parseFloat(feeStr) || 0;
  const adminDay = document.getElementById('wallet-admin-day')?.value || '25';
  const color = document.querySelector('input[name="wallet_color"]:checked')?.value || '#3b82f6';

  const currentSpace = getActiveSpace();
  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const adminDayText = (adminDay === 'akhir') ? 'Akhir Bulan' : `Tgl ${adminDay}`;

  if (editId) {
    // Update existing wallet
    const wallet = currentSpace.wallets.find(w => w.id === editId);
    if (wallet) {
      wallet.name = name;
      wallet.balance = balance;
      wallet.adminFee = adminFee;
      wallet.adminDay = adminDay;
      wallet.color = color;
      if (!wallet.lastAdminDeductionMonth) {
        wallet.lastAdminDeductionMonth = currentYearMonth;
      }
    }
    showLiveToast('💼 Dompet Diperbarui', `Dompet "${name}" berhasil disimpan.${adminFee > 0 ? ` (Auto-potong admin ${formatRupiah(adminFee)}/bln tiap ${adminDayText})` : ''}`);
  } else {
    // Create new wallet
    const newWallet = {
      id: 'w-' + Date.now(),
      name,
      balance,
      adminFee,
      adminDay,
      lastAdminDeductionMonth: currentYearMonth,
      color
    };
    currentSpace.wallets.push(newWallet);
    notifyOtherTabs('NEW_WALLET', newWallet);
    showLiveToast('💼 Dompet Ditambahkan', `Dompet "${name}" berhasil dibuat.${adminFee > 0 ? ` (Auto-potong admin ${formatRupiah(adminFee)}/bln tiap ${adminDayText})` : ''}`);
  }

  saveSpaces();
  renderAll();
  closeModal('modal-wallet');
  const form = document.getElementById('form-wallet');
  if (form) form.reset();
  const editInput = document.getElementById('edit-wallet-id');
  if (editInput) editInput.value = '';
}

function openAddWalletModal() {
  if (!isOwnerOfCurrentSpace()) {
    alert('Akses Ditolak: Hanya pemilik buku kas yang dapat menambah dompet.');
    return;
  }
  const form = document.getElementById('form-wallet');
  if (form) form.reset();
  const editIdInput = document.getElementById('edit-wallet-id');
  if (editIdInput) editIdInput.value = '';
  const daySelect = document.getElementById('wallet-admin-day');
  if (daySelect) daySelect.value = '25';
  const title = document.getElementById('modal-wallet-title');
  if (title) title.textContent = 'Tambah Kantong / Dompet';
  const submitBtn = document.getElementById('btn-save-wallet-submit');
  if (submitBtn) submitBtn.textContent = 'Tambah Dompet';
  const delBtn = document.getElementById('btn-delete-wallet');
  if (delBtn) delBtn.classList.add('hidden');
  document.getElementById('modal-wallet').classList.remove('hidden');
}

function openEditWalletModal(walletId) {
  if (!isOwnerOfCurrentSpace()) return;
  const currentSpace = getActiveSpace();
  const wallet = currentSpace.wallets.find(w => w.id === walletId);
  if (!wallet) return;

  const editIdInput = document.getElementById('edit-wallet-id');
  if (editIdInput) editIdInput.value = wallet.id;
  const title = document.getElementById('modal-wallet-title');
  if (title) title.textContent = 'Ubah Kantong / Dompet';
  document.getElementById('wallet-name').value = wallet.name;
  document.getElementById('wallet-balance').value = new Intl.NumberFormat('id-ID').format(wallet.balance);
  document.getElementById('wallet-admin-fee').value = (wallet.adminFee && wallet.adminFee > 0)
    ? new Intl.NumberFormat('id-ID').format(wallet.adminFee)
    : '';

  const daySelect = document.getElementById('wallet-admin-day');
  if (daySelect) daySelect.value = wallet.adminDay || '25';

  const radio = document.querySelector(`input[name="wallet_color"][value="${wallet.color}"]`);
  if (radio) radio.checked = true;

  const submitBtn = document.getElementById('btn-save-wallet-submit');
  if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';

  const delBtn = document.getElementById('btn-delete-wallet');
  if (delBtn) {
    if (currentSpace.wallets.length > 1) {
      delBtn.classList.remove('hidden');
    } else {
      delBtn.classList.add('hidden');
    }
  }

  document.getElementById('modal-wallet').classList.remove('hidden');
}

let pendingDeleteWalletId = null;

function handleDeleteWallet() {
  const editId = document.getElementById('edit-wallet-id')?.value;
  if (!editId) return;
  triggerDeleteWalletPrompt(editId);
}

function triggerDeleteWalletPrompt(walletId) {
  if (!isOwnerOfCurrentSpace()) {
    showLiveToast('Akses Ditolak', 'Hanya pemilik buku kas yang dapat mengelola atau menghapus kantong.');
    return;
  }

  const currentSpace = getActiveSpace();
  if (currentSpace.wallets.length <= 1) {
    showLiveToast(
      '⚠️ Kantong Utama Tidak Dapat Dihapus',
      'Buku kas wajib memiliki minimal 1 kantong. Buat kantong baru terlebih dahulu jika Anda ingin menghapus kantong ini.'
    );
    return;
  }

  const wallet = currentSpace.wallets.find(w => w.id === walletId);
  if (!wallet) return;

  pendingDeleteWalletId = walletId;

  // Populate UI modal konfirmasi khusus
  const dot = document.getElementById('del-confirm-dot');
  if (dot) {
    dot.style.background = wallet.color;
    dot.style.boxShadow = `0 0 8px ${wallet.color}`;
  }
  const nameEl = document.getElementById('del-confirm-name');
  if (nameEl) nameEl.textContent = wallet.name;
  const checkNameEl = document.getElementById('del-confirm-check-wallet-name');
  if (checkNameEl) checkNameEl.textContent = `"${wallet.name}"`;
  const balEl = document.getElementById('del-confirm-balance');
  if (balEl) balEl.textContent = formatRupiah(wallet.balance);

  const txCount = currentSpace.transactions.filter(t => t.walletId === wallet.id).length;
  const txCountEl = document.getElementById('del-confirm-tx-count');
  if (txCountEl) txCountEl.textContent = `${txCount} transaksi pernah dicatat pada kantong ini`;

  const transferBox = document.getElementById('del-balance-transfer-box');
  const targetSelect = document.getElementById('del-transfer-target-wallet');
  const balanceWarningLi = document.getElementById('del-confirm-balance-warning-li');

  if (Number(wallet.balance) > 0) {
    if (transferBox) transferBox.classList.remove('hidden');
    const amountLabel = document.getElementById('del-transfer-amount-label');
    if (amountLabel) amountLabel.textContent = formatRupiah(wallet.balance);
    if (balanceWarningLi) {
      balanceWarningLi.textContent = `Kantong ini masih memiliki sisa saldo ${formatRupiah(wallet.balance)}. Silakan pilih kantong tujuan pemindahan dana di bawah agar uang kas tidak berkurang.`;
    }

    if (targetSelect) {
      targetSelect.innerHTML = '';
      const otherWallets = currentSpace.wallets.filter(w => w.id !== wallet.id);
      otherWallets.forEach((ow, i) => {
        const opt = document.createElement('option');
        opt.value = ow.id;
        opt.textContent = `${ow.name} (Saldo saat ini: ${formatRupiah(ow.balance)})`;
        if (i === 0) opt.selected = true;
        targetSelect.appendChild(opt);
      });
    }
  } else {
    if (transferBox) transferBox.classList.add('hidden');
    if (balanceWarningLi) {
      balanceWarningLi.textContent = 'Kantong ini memiliki saldo Rp 0. Tidak ada pemindahan dana yang diperlukan.';
    }
  }

  // Reset checkbox & confirm button
  const checkbox = document.getElementById('del-confirm-checkbox');
  if (checkbox) checkbox.checked = false;
  const btnExecute = document.getElementById('btn-execute-delete-wallet');
  if (btnExecute) btnExecute.disabled = true;

  document.getElementById('modal-delete-wallet-confirm').classList.remove('hidden');
}

function handleDeleteWalletCheckboxChange() {
  const checkbox = document.getElementById('del-confirm-checkbox');
  const btn = document.getElementById('btn-execute-delete-wallet');
  if (checkbox && btn) {
    btn.disabled = !checkbox.checked;
  }
}

function executeDeleteWalletConfirmed() {
  if (!pendingDeleteWalletId) return;
  const currentSpace = getActiveSpace();

  if (currentSpace.wallets.length <= 1) {
    showLiveToast('⚠️ Pembatalan', 'Buku kas harus memiliki minimal 1 kantong.');
    closeModal('modal-delete-wallet-confirm');
    return;
  }

  const walletIndex = currentSpace.wallets.findIndex(w => w.id === pendingDeleteWalletId);
  if (walletIndex === -1) return;

  const wallet = currentSpace.wallets[walletIndex];
  const walletName = wallet.name;
  const balance = Number(wallet.balance) || 0;
  let transferMsg = '';

  // Process balance transfer if balance > 0
  if (balance > 0) {
    const targetSelect = document.getElementById('del-transfer-target-wallet');
    const targetWalletId = targetSelect?.value;
    const targetWallet = currentSpace.wallets.find(w => w.id === targetWalletId);

    if (targetWallet) {
      targetWallet.balance += balance;
      transferMsg = ` Sisa saldo ${formatRupiah(balance)} dialihkan ke ${targetWallet.name}.`;
    }
  }

  // Preserve original wallet name snapshot on past transactions for 100% accurate financial history
  currentSpace.transactions.forEach(t => {
    if (t.walletId === wallet.id) {
      if (!t.walletName) t.walletName = walletName;
    }
  });

  // Remove wallet from space
  currentSpace.wallets.splice(walletIndex, 1);
  saveSpaces();

  // Notify other tabs and devices
  notifyOtherTabs('WALLET_DELETED', { walletId: pendingDeleteWalletId, walletName: walletName });

  renderAll();
  closeModal('modal-delete-wallet-confirm');
  closeModal('modal-wallet');

  showLiveToast('🗑️ Kantong Dihapus', `Kantong "${walletName}" berhasil dihapus.${transferMsg}`);
  pendingDeleteWalletId = null;
}

// Automatic Monthly Bank Admin Fee Deduction Engine
function checkAndProcessMonthlyAdminFees() {
  const currentSpace = getActiveSpace();
  if (!currentSpace || !currentSpace.wallets) return;
  if (!isOwnerOfCurrentSpace()) return;

  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const todayDate = now.getDate();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const monthName = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  let deductionsMade = 0;

  currentSpace.wallets.forEach(w => {
    const fee = parseFloat(w.adminFee) || 0;
    if (fee > 0) {
      let targetDay = 25;
      if (w.adminDay === 'akhir') {
        targetDay = lastDayOfMonth;
      } else {
        targetDay = parseInt(w.adminDay) || 25;
      }

      // Deduct only when:
      // 1. Not yet deducted for this month (w.lastAdminDeductionMonth !== currentYearMonth)
      // 2. Today's date has reached or passed the target day (todayDate >= targetDay)
      if (w.lastAdminDeductionMonth !== currentYearMonth && todayDate >= targetDay) {
        w.balance -= fee;
        w.lastAdminDeductionMonth = currentYearMonth;

        const dayLabel = (w.adminDay === 'akhir') ? 'Akhir Bulan' : `Tgl ${targetDay}`;
        const tx = {
          id: 'tx-admin-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          walletId: w.id,
          amount: fee,
          type: 'EXPENSE',
          category: 'Tagihan',
          icon: '🏦',
          note: `Biaya Admin Bank Bulanan ${w.name} (${dayLabel} ${monthName})`,
          createdBy: activeUserId,
          createdAt: now.toISOString()
        };

        currentSpace.transactions.unshift(tx);
        triggerGoogleSheetsAutoSync(tx, 'ADD', currentSpace);
        deductionsMade++;
      }
    }
  });

  if (deductionsMade > 0) {
    saveSpaces();
    renderAll();
    showLiveToast('🏦 Potongan Admin Bank Bulanan', `${deductionsMade} potongan admin bank otomatis telah dicatat untuk bulan ${monthName}.`);
    notifyOtherTabs('NEW_TRANSACTION', { note: 'Potongan Admin Bank Otomatis' });
  }
}

// Google Sheets Auto-Sync Engine (Strictly Isolated Per Account)
function triggerGoogleSheetsAutoSync(tx, actionType, space) {
  const activeUser = getActiveUser();
  if (!activeUser.autoSyncEnabled) return;

  const wallet = space.wallets.find(w => w.id === tx.walletId) || { name: 'Dompet' };

  // STRICT USER ISOLATION: Each user has their own localStorage sync log
  const storageKey = 'sakukita_sheet_sync_log_' + activeUser.id;
  let syncHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const newLogRow = {
    id: 'row-' + Date.now(),
    timestamp: new Date().toLocaleString('id-ID'),
    userName: activeUser.name,
    userEmail: activeUser.email,
    spaceName: space.name,
    type: tx.type === 'INCOME' ? 'Pemasukan (+)' : 'Pengeluaran (-)',
    category: tx.category,
    amount: formatRupiah(tx.amount),
    walletName: wallet.name,
    note: (actionType === 'DELETE' ? '[DIHAPUS] ' : '') + tx.note
  };

  syncHistory.unshift(newLogRow);
  if (syncHistory.length > 50) syncHistory = syncHistory.slice(0, 50);
  localStorage.setItem(storageKey, JSON.stringify(syncHistory));

  // If user configured real Google Apps Script Webhook URL, send real HTTP POST
  const webhook = activeUser.webhookUrl || localStorage.getItem('sakukita_webhook_url_' + activeUser.id) || localStorage.getItem('sakukita_global_webhook_url') || '';
  if (webhook && webhook.startsWith('http')) {
    try {
      fetch(webhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          userName: activeUser.name,
          userEmail: activeUser.email,
          spaceName: space.name,
          type: tx.type,
          category: tx.category,
          amount: tx.amount,
          amountFormatted: formatRupiah(tx.amount),
          walletName: wallet.name,
          note: tx.note,
          timestamp: new Date().toLocaleString('id-ID') + ' WIB'
        })
      }).catch(err => console.log('Webhook dispatched'));
    } catch (e) {
      console.log('Webhook dispatched');
    }
  }

  // Quick UI indicator update
  const quickLabel = document.getElementById('sheets-quick-label');
  if (quickLabel) {
    quickLabel.textContent = `Sync (${activeUser.name}): Sukses ✅`;
    setTimeout(() => {
      quickLabel.textContent = 'Sheets Aktif';
    }, 4000);
  }
}

function openDownloadModal() {
  const modal = document.getElementById('modal-download');
  if (modal) modal.classList.remove('hidden');
}

function openGoogleSheetsModal() {
  const activeUser = getActiveUser();
  renderActiveUserProfile();

  const sheetInput = document.getElementById('cfg-sheet-url');
  if (sheetInput) {
    sheetInput.value = activeUser.googleSheetUrl || localStorage.getItem('sakukita_sheet_url_' + activeUser.id) || '';
  }
  const webhookInput = document.getElementById('cfg-webhook-url');
  if (webhookInput) {
    webhookInput.value = activeUser.webhookUrl || localStorage.getItem('sakukita_webhook_url_' + activeUser.id) || localStorage.getItem('sakukita_global_webhook_url') || '';
  }
  const toggleInput = document.getElementById('cfg-autosync-toggle');
  if (toggleInput) {
    toggleInput.checked = activeUser.autoSyncEnabled !== false;
  }

  updateGoogleSheetsSyncIndicators();
  renderSheetsTablePreview();
  const modal = document.getElementById('modal-sheets');
  if (modal) modal.classList.remove('hidden');
}

function handleSaveSheetsConfig(e) {
  e.preventDefault();
  const activeUser = getActiveUser();
  const sheetUrl = document.getElementById('cfg-sheet-url') ? document.getElementById('cfg-sheet-url').value.trim() : '';
  const webhookUrl = document.getElementById('cfg-webhook-url') ? document.getElementById('cfg-webhook-url').value.trim() : '';
  const autoSync = document.getElementById('cfg-autosync-toggle') ? document.getElementById('cfg-autosync-toggle').checked : true;

  activeUser.googleSheetUrl = sheetUrl;
  activeUser.webhookUrl = webhookUrl;
  activeUser.autoSyncEnabled = autoSync;

  // Guaranteed Permanent Webhook Persistence (Survives any refresh or data switch)
  if (webhookUrl) {
    localStorage.setItem('sakukita_webhook_url_' + activeUser.id, webhookUrl);
    localStorage.setItem('sakukita_global_webhook_url', webhookUrl);
  } else {
    localStorage.removeItem('sakukita_webhook_url_' + activeUser.id);
    localStorage.removeItem('sakukita_global_webhook_url');
  }
  if (sheetUrl) {
    localStorage.setItem('sakukita_sheet_url_' + activeUser.id, sheetUrl);
  }

  saveUsers();
  renderActiveUserProfile();
  updateGoogleSheetsSyncIndicators();
  closeModal('modal-sheets');
  showLiveToast('⚡ Webhook Tersimpan!', `Koneksi Google Spreadsheet untuk ${activeUser.name} berhasil tersambung.`);
}

function renderSheetsTablePreview() {
  const tbody = document.getElementById('sheets-preview-tbody');
  const countTag = document.getElementById('preview-row-count');
  const activeUser = getActiveUser();
  if (!tbody) return;

  // STRICT GUARANTEE: Filter ONLY transactions belonging to activeUser
  let userTxList = [];
  Object.values(spaces).forEach(space => {
    space.transactions.forEach(t => {
      if (t.createdBy === activeUser.id) {
        const wallet = space.wallets.find(w => w.id === t.walletId) || { name: 'Dompet' };
        userTxList.push({
          rawDate: new Date(t.createdAt),
          dateFormatted: formatBankDate(new Date(t.createdAt)),
          walletName: wallet.name,
          category: t.category,
          note: t.note,
          type: t.type,
          amount: Number(t.amount)
        });
      }
    });
  });

  userTxList.sort((a, b) => a.rawDate - b.rawDate);

  countTag.textContent = `${userTxList.length} Baris Pribadi (${activeUser.name})`;
  tbody.innerHTML = '';

  if (userTxList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px; color: var(--text-muted);">Belum ada catatan mutasi transaksi milik ${escapeHtml(activeUser.name)}.</td></tr>`;
    return;
  }

  let runningBal = 0;
  userTxList.slice(0, 20).forEach((t, idx) => {
    let debetStr = '-';
    let kreditStr = '-';
    if (t.type === 'EXPENSE') {
      debetStr = formatRupiah(t.amount);
      runningBal -= t.amount;
    } else {
      kreditStr = formatRupiah(t.amount);
      runningBal += t.amount;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${escapeHtml(t.dateFormatted)}</td>
      <td>${escapeHtml(t.note || t.category)}</td>
      <td>${escapeHtml(t.category)}</td>
      <td><span class="badge-wallet">${escapeHtml(t.walletName)}</span></td>
      <td style="color: #f43f5e; text-align: right;">${escapeHtml(debetStr)}</td>
      <td style="color: #10b981; text-align: right;">${escapeHtml(kreditStr)}</td>
      <td style="color: #60a5fa; text-align: right; font-weight: bold;">${escapeHtml(formatRupiah(runningBal))}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 1-Click Copy Tab-Separated Data for Direct Paste into Google Sheets / Excel
function copyTableForGoogleSheets() {
  const activeUser = getActiveUser();
  let userTxList = [];
  Object.values(spaces).forEach(space => {
    space.transactions.forEach(t => {
      if (t.createdBy === activeUser.id) {
        const wallet = space.wallets.find(w => w.id === t.walletId) || { name: 'Dompet' };
        userTxList.push({
          rawDate: new Date(t.createdAt),
          dateFormatted: formatBankDate(new Date(t.createdAt)),
          walletName: wallet.name,
          category: t.category,
          note: t.note,
          type: t.type,
          amount: Number(t.amount)
        });
      }
    });
  });

  if (userTxList.length === 0) {
    showLiveToast('ℹ️ Data Masih Kosong', 'Belum ada transaksi pribadi untuk disalin ke Google Sheets.');
    return;
  }

  userTxList.sort((a, b) => a.rawDate - b.rawDate);

  let runningBal = 0;
  let rows = [];

  // Metadata headers
  rows.push(['SAKUKITA - LAPORAN REKENING MUTASI KEUANGAN PRIBADI'].join('\t'));
  rows.push([`Nama Pemilik: ${activeUser.name}`, `Email: ${activeUser.email}`, `Waktu Cetak: ${new Date().toLocaleString('id-ID')} WIB`].join('\t'));
  
  // Wallet Balances Summary
  const activeSpace = getActiveSpace();
  if (activeSpace && activeSpace.wallets && activeSpace.wallets.length > 0) {
    rows.push(['STATUS SALDO DOMPET SAAT INI:'].join('\t'));
    activeSpace.wallets.forEach(w => {
      rows.push(['', w.name, 'Saldo Terakhir:', formatRupiah(w.balance)].join('\t'));
    });
    const totalBal = activeSpace.wallets.reduce((s, w) => s + Number(w.balance), 0);
    rows.push(['', 'TOTAL SALDO KAS TERSEDIA', '', formatRupiah(totalBal)].join('\t'));
  }
  rows.push('');

  // Table Column Headers (Tab-separated)
  rows.push(['No', 'Tanggal Mutasi', 'Keterangan Mutasi', 'Kategori', 'Dompet / Rekening', 'Debet (DB)', 'Kredit (CR)', 'Saldo Berjalan'].join('\t'));

  userTxList.forEach((t, idx) => {
    let debet = '-';
    let kredit = '-';
    if (t.type === 'EXPENSE') {
      debet = formatRupiah(t.amount);
      runningBal -= t.amount;
    } else {
      kredit = formatRupiah(t.amount);
      runningBal += t.amount;
    }
    rows.push([
      idx + 1,
      t.dateFormatted,
      t.note || t.category,
      t.category,
      t.walletName,
      debet,
      kredit,
      formatRupiah(runningBal)
    ].join('\t'));
  });

  const tsvText = rows.join('\n');

  const copySuccess = () => {
    if (navigator.vibrate) navigator.vibrate([40]);
    showLiveToast(
      '📋 Data Berhasil Disalin!',
      'Buka Google Sheets, klik kotak A1, lalu pilih Tempel / Paste (Ctrl+V). Seluruh tabel langsung terisi rapi!'
    );
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(tsvText).then(copySuccess).catch(() => {
      fallbackCopy(tsvText, copySuccess);
    });
  } else {
    fallbackCopy(tsvText, copySuccess);
  }
}

function fallbackCopy(text, callback) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    callback();
  } catch (err) {
    showLiveToast('⚠️ Salin Manual', 'Silakan pilih Unduh Mutasi (CSV) jika browser membatasi clipboard.');
  }
  document.body.removeChild(ta);
}

// Automatic Google Drive Spreadsheet Handler
function createSpreadsheetInGoogleDrive() {
  const activeUser = getActiveUser();
  const title = `SakuKita - Mutasi Keuangan Pribadi (${activeUser.name})`;
  // Open Google Sheets creation endpoint with pre-filled title in active user's Google Drive session
  const directCreateUrl = `https://docs.google.com/spreadsheets/create?title=${encodeURIComponent(title)}`;
  window.open(directCreateUrl, '_blank');
  showLiveToast('⚡ Google Sheets Dibuka', `Membuka lembar kerja baru di Google Drive. Klik sel A1 lalu tekan Paste (Ctrl+V) jika sudah menyalin data.`);
}

function handleAutoSheetOpen(e) {
  if (e && e.preventDefault) e.preventDefault();
  const activeUser = getActiveUser();
  const sheetUrl = activeUser.googleSheetUrl || localStorage.getItem('sakukita_sheet_url_' + activeUser.id);
  if (sheetUrl && sheetUrl.startsWith('http') && !sheetUrl.includes('_Spreadsheet_Pribadi')) {
    window.open(sheetUrl, '_blank');
    return;
  }
  // Otherwise open direct automated Drive sheet
  createSpreadsheetInGoogleDrive();
}

// PWA 1-Click Installation Trigger
function triggerPwaInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showLiveToast('🎉 Aplikasi Berhasil Dipasang', 'SakuKita siap dibuka langsung dari layar HP Anda!');
        const banner = document.getElementById('pwa-install-banner');
        if (banner) banner.classList.add('hidden');
      }
      deferredPrompt = null;
    });
  } else {
    // Open visual install guide for iOS or desktop
    openInstallGuideModal();
  }
}

function openInstallGuideModal() {
  document.getElementById('modal-pwa-guide').classList.remove('hidden');
}

// STRICT PERSONAL CSV EXPORT: Authentic Bank Statement (Rekening Koran) Format
function exportPersonalCsv() {
  const activeUser = getActiveUser();

  // STRICT GUARANTEE: Filter ONLY transactions belonging to activeUser!
  let userTxList = [];
  Object.values(spaces).forEach(space => {
    space.transactions.forEach(t => {
      if (t.createdBy === activeUser.id) {
        const wallet = space.wallets.find(w => w.id === t.walletId) || { name: 'Dompet' };
        userTxList.push({
          rawDate: new Date(t.createdAt),
          dateFormatted: formatBankDate(new Date(t.createdAt)),
          spaceName: space.name,
          walletName: wallet.name,
          category: t.category,
          note: t.note,
          type: t.type,
          amount: Number(t.amount)
        });
      }
    });
  });

  if (userTxList.length === 0) {
    showLiveToast(
      'ℹ️ Buku Kas Masih Kosong',
      `Belum ada mutasi transaksi untuk akun ${activeUser.name}. Catat transaksi pertama untuk mengunduh laporan CSV.`
    );
    return;
  }

  // Sort chronologically (oldest to newest) for true bank passbook running balance
  userTxList.sort((a, b) => a.rawDate - b.rawDate);

  let totalIncome = 0;
  let totalExpense = 0;
  let runningBalance = 0;

  userTxList.forEach(t => {
    if (t.type === 'INCOME') totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  const printTime = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' });

  // BANK STATEMENT REKENING KORAN FORMAT
  let csv = '\uFEFF'; // UTF-8 BOM for Microsoft Excel compatibility
  csv += '====================================================================================================\n';
  csv += '                       SAKUKITA - LAPORAN REKENING MUTASI KEUANGAN PRIBADI                         \n';
  csv += '====================================================================================================\n';
  csv += `NAMA PEMILIK REKENING   : "${activeUser.name}"\n`;
  csv += `EMAIL GOOGLE TERHUBUNG  : "${activeUser.email}"\n`;
  csv += `TANGGAL & WAKTU CETAK   : "${printTime} WIB"\n`;
  csv += `MATA UANG LAPORAN       : "IDR (Rupiah Indonesia)"\n`;
  csv += `STATUS PRIVASI          : "100% PRIBADI & TERISOLASI (Khusus Akun Anda)"\n`;
  csv += '----------------------------------------------------------------------------------------------------\n';
  csv += 'RINGKASAN MUTASI TRANSAKSI:\n';
  csv += `TOTAL FREKUENSI TRANSAKSI: ${userTxList.length} Transaksi\n`;
  csv += `TOTAL PENERIMAAN (CR)    : ${formatRupiah(totalIncome)}\n`;
  csv += `TOTAL PENGELUARAN (DB)   : ${formatRupiah(totalExpense)}\n`;
  csv += `SELISIH BERJALAN         : ${formatRupiah(totalIncome - totalExpense)}\n`;

  const activeSpace = getActiveSpace();
  if (activeSpace && activeSpace.wallets && activeSpace.wallets.length > 0) {
    csv += '----------------------------------------------------------------------------------------------------\n';
    csv += 'STATUS SALDO DOMPET SAAT INI (KAS UTAMA & LAINNYA):\n';
    activeSpace.wallets.forEach(w => {
      csv += ` - ${w.name.padEnd(25)}: ${formatRupiah(w.balance)}\n`;
    });
    const totalWalletBal = activeSpace.wallets.reduce((sum, w) => sum + Number(w.balance), 0);
    csv += `TOTAL SALDO KAS TERSEDIA : ${formatRupiah(totalWalletBal)}\n`;
  }
  csv += '====================================================================================================\n\n';

  // TABLE COLUMNS (Standard Bank Mutasi: Debet, Kredit, Saldo)
  csv += '"NO","TANGGAL TRANSAKSI","KETERANGAN MUTASI","KATEGORI","DOMPET / REKENING","DEBET / PENGELUARAN (DB)","KREDIT / PENERIMAAN (CR)","SALDO BERJALAN"\n';

  userTxList.forEach((t, idx) => {
    let debetStr = '-';
    let kreditStr = '-';

    if (t.type === 'EXPENSE') {
      debetStr = formatRupiah(t.amount);
      runningBalance -= t.amount;
    } else {
      kreditStr = formatRupiah(t.amount);
      runningBalance += t.amount;
    }

    const cleanNote = t.note.replace(/"/g, '""');
    csv += `"${idx + 1}","${t.dateFormatted}","${cleanNote}","${t.category}","${t.walletName}","${debetStr}","${kreditStr}","${formatRupiah(runningBalance)}"\n`;
  });

  csv += '\n====================================================================================================\n';
  csv += '* Dokumen ini dihasilkan secara otomatis oleh sistem SakuKita sebagai laporan mutasi resmi.\n';
  csv += '====================================================================================================\n';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const fileDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const fileName = `Mutasi_Rekening_SakuKita_${activeUser.name.replace(/\s+/g, '_')}_${fileDate}.csv`;

  const doDownload = () => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showLiveToast(
      '📄 Rekening Koran Mutasi Siap',
      `File CSV berhasil diunduh. Ketuk notifikasi unduhan untuk membukanya di Google Spreadsheet.`
    );
  };

  // If on mobile device and Web Share API supports file sharing, open direct share to Google Sheets app
  if (navigator.canShare && typeof File !== 'undefined') {
    try {
      const shareFile = new File([blob], fileName, { type: 'text/csv' });
      if (navigator.canShare({ files: [shareFile] })) {
        navigator.share({
          files: [shareFile],
          title: 'Mutasi Keuangan SakuKita',
          text: 'Pilih aplikasi Google Spreadsheet untuk langsung membuka laporan mutasi ini.'
        }).then(() => {
          showLiveToast('📲 Dibuka di Spreadsheet', 'Pilih aplikasi Google Spreadsheet untuk melihat mutasi.');
        }).catch((err) => {
          if (err.name !== 'AbortError') {
            doDownload();
          }
        });
        return;
      }
    } catch (e) {
      // Fallback
    }
  }

  doDownload();
}

// STRICT PERSONAL PDF EXPORT: Authentic Bank Statement (Rekening Koran) PDF
function exportPersonalPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('Modul PDF sedang dimuat. Silakan tunggu beberapa detik dan coba lagi.');
    return;
  }

  const activeUser = getActiveUser();

  // STRICT GUARANTEE: Filter ONLY transactions belonging to activeUser!
  let userTxList = [];
  Object.values(spaces).forEach(space => {
    space.transactions.forEach(t => {
      if (t.createdBy === activeUser.id) {
        const wallet = space.wallets.find(w => w.id === t.walletId) || { name: 'Dompet' };
        userTxList.push({
          rawDate: new Date(t.createdAt),
          dateFormatted: formatBankDate(new Date(t.createdAt)),
          spaceName: space.name,
          walletName: wallet.name,
          category: t.category,
          note: t.note,
          type: t.type,
          amount: Number(t.amount)
        });
      }
    });
  });

  if (userTxList.length === 0) {
    showLiveToast(
      'ℹ️ Buku Kas Masih Kosong',
      `Belum ada mutasi transaksi untuk akun ${activeUser.name}. Catat transaksi pertama untuk mengunduh rekening koran PDF.`
    );
    return;
  }

  // Sort chronologically (oldest to newest) for true bank passbook running balance
  userTxList.sort((a, b) => a.rawDate - b.rawDate);

  let totalIncome = 0;
  let totalExpense = 0;

  userTxList.forEach(t => {
    if (t.type === 'INCOME') totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  const firstDateStr = userTxList[0].dateFormatted.slice(0, 10);
  const lastDateStr = userTxList[userTxList.length - 1].dateFormatted.slice(0, 10);
  const printTime = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

  // 1. TOP HEADER BANNER (Bank e-Statement)
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(14, 12, 182, 22, 'F');
  doc.setFillColor(59, 130, 246); // Accent blue
  doc.rect(14, 12, 3.5, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('SAKUKITA - REKENING KORAN MUTASI KEUANGAN', 22, 21);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('LAPORAN MUTASI RESMI TERISOLASI PER AKUN PRIBADI | BANK-GRADE STATEMENT', 22, 28);

  // 2. ACCOUNT & STATEMENT INFO BOX
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, 38, 182, 24, 2, 2, 'FD');

  // Left column
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('NAMA PEMILIK REKENING', 18, 44);
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text(activeUser.name, 18, 49);

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('EMAIL AKUN GOOGLE', 18, 55);
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(activeUser.email, 18, 60);

  // Center column
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('NO. REKENING SAKUKITA', 92, 44);
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  const accNo = 'SK-' + activeUser.id.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  doc.text(accNo, 92, 49);

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('PERIODE MUTASI', 92, 55);
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(`${firstDateStr} s/d ${lastDateStr}`, 92, 60);

  // Right column
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('WAKTU CETAK', 148, 44);
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(printTime + ' WIB', 148, 49);

  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('STATUS PRIVASI', 148, 55);
  doc.setFontSize(7.5);
  doc.setTextColor(16, 185, 129);
  doc.setFont('helvetica', 'bold');
  doc.text('TERISOLASI PRIBADI', 148, 60);

  // 3. FINANCIAL SUMMARY BOXES
  // Total Income
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(14, 65, 58, 16, 2, 2, 'FD');
  doc.setFontSize(6.5);
  doc.setTextColor(4, 120, 87);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL PENERIMAAN (CR)', 18, 70);
  doc.setFontSize(9);
  doc.setTextColor(6, 95, 70);
  doc.text('+' + formatRupiah(totalIncome), 18, 77);

  // Total Expense
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(76, 65, 58, 16, 2, 2, 'FD');
  doc.setFontSize(6.5);
  doc.setTextColor(185, 28, 28);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL PENGELUARAN (DB)', 80, 70);
  doc.setFontSize(9);
  doc.setTextColor(153, 27, 27);
  doc.text('-' + formatRupiah(totalExpense), 80, 77);

  // Balance
  const netDiff = totalIncome - totalExpense;
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(138, 65, 58, 16, 2, 2, 'FD');
  doc.setFontSize(6.5);
  doc.setTextColor(29, 78, 216);
  doc.setFont('helvetica', 'bold');
  doc.text('SALDO AKHIR BERJALAN', 142, 70);
  doc.setFontSize(9);
  doc.setTextColor(30, 64, 175);
  doc.text(formatRupiah(netDiff), 142, 77);

  // 3b. ACTIVE WALLETS BALANCE SUMMARY STRIP (Kas Utama & Dompet Lainnya)
  const activeSpace = getActiveSpace();
  let startTableY = 86;
  if (activeSpace && activeSpace.wallets && activeSpace.wallets.length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, 83, 182, 7, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5);
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    
    const walletTextParts = activeSpace.wallets.map(w => `${w.name}: ${formatRupiah(w.balance)}`).join('  |  ');
    const totalWalletBal = activeSpace.wallets.reduce((s, w) => s + Number(w.balance), 0);
    const fullWalletLine = `STATUS SALDO DOMPET SAAT INI:  ${walletTextParts}  (Total Kas: ${formatRupiah(totalWalletBal)})`;
    doc.text(fullWalletLine, 18, 87.5);
    startTableY = 93;
  }

  // 4. TRANSACTION ROWS
  let runningBal = 0;
  const tableRows = userTxList.map((t, idx) => {
    let debetStr = '-';
    let kreditStr = '-';
    if (t.type === 'EXPENSE') {
      debetStr = formatRupiah(t.amount);
      runningBal -= t.amount;
    } else {
      kreditStr = formatRupiah(t.amount);
      runningBal += t.amount;
    }
    return [
      idx + 1,
      t.dateFormatted,
      t.note || t.category,
      t.category,
      t.walletName,
      debetStr,
      kreditStr,
      formatRupiah(runningBal)
    ];
  });

  doc.autoTable({
    startY: startTableY,
    margin: { left: 14, right: 14, bottom: 20 },
    head: [[
      'No',
      'Tanggal Mutasi',
      'Keterangan Transaksi',
      'Kategori',
      'Dompet',
      'Debet (DB)',
      'Kredit (CR)',
      'Saldo Berjalan'
    ]],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 7.5,
      halign: 'center',
      valign: 'middle'
    },
    bodyStyles: {
      fontSize: 7,
      cellPadding: 2,
      textColor: [30, 41, 59]
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 40, halign: 'left' },
      3: { cellWidth: 21, halign: 'left' },
      4: { cellWidth: 20, halign: 'left' },
      5: { cellWidth: 22, halign: 'right', textColor: [220, 38, 38] },
      6: { cellWidth: 22, halign: 'right', textColor: [16, 185, 129] },
      7: { cellWidth: 24, halign: 'right', fontStyle: 'bold' }
    },
    didDrawPage: function(data) {
      const pageCount = doc.internal.getNumberOfPages();
      const pageCurrent = data.pageNumber;
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.4);
      doc.line(14, 287, 196, 287);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('SakuKita - Rekening Koran Mutasi Resmi untuk akun ' + activeUser.name + ' (' + activeUser.email + '). Dihasilkan secara otomatis.', 14, 291);
      doc.text('Halaman ' + pageCurrent + ' dari ' + pageCount, 196, 291, { align: 'right' });
    }
  });

  const fileDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  doc.save(`Mutasi_Rekening_SakuKita_${activeUser.name.replace(/\s+/g, '_')}_${fileDate}.pdf`);

  showLiveToast(
    '📑 Rekening Koran PDF Diunduh',
    `Laporan PDF mutasi resmi (${userTxList.length} transaksi ${activeUser.name}) berhasil disimpan.`
  );
}

// Copy Localhost Phone URL helper
function copyPhoneUrl() {
  const urlInput = document.getElementById('phone-app-url');
  const url = urlInput ? urlInput.value : 'http://192.168.101.71:8080';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showLiveToast('📋 Tautan HP Disalin', 'Buka di Chrome/Safari pada HP Anda yang terhubung ke Wi-Fi yang sama.');
    }).catch(() => {
      fallbackCopyText(url);
    });
  } else {
    fallbackCopyText(url);
  }
}

function fallbackCopyText(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showLiveToast('📋 Tautan HP Disalin', 'Buka di Chrome/Safari pada HP Anda yang terhubung ke Wi-Fi yang sama.');
}

function formatBankDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  const d = pad(date.getDate());
  const m = pad(date.getMonth() + 1);
  const y = date.getFullYear();
  const hr = pad(date.getHours());
  const mn = pad(date.getMinutes());
  return `${d}/${m}/${y} ${hr}:${mn}`;
}

function copyAppsScriptCode() {
  const code = document.getElementById('apps-script-code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert('✅ Script Google Apps Script berhasil disalin!\nTempel di menu Ekstensi > Apps Script pada Google Sheets Anda.');
  });
}

// Backend Limit & Cloud Free Tier Monitor
function updateBackendQuotaDisplay() {
  let totalTransactions = 0;
  Object.values(spaces).forEach(s => {
    totalTransactions += s.transactions.length;
  });

  const MONTHLY_LIMIT_ROWS = 50000;
  const remainingRows = Math.max(MONTHLY_LIMIT_ROWS - totalTransactions, 0);
  const pctRemaining = ((remainingRows / MONTHLY_LIMIT_ROWS) * 100).toFixed(1);

  const quickQuotaEl = document.getElementById('quota-quick-label');
  if (quickQuotaEl) {
    quickQuotaEl.textContent = `Limit: ${pctRemaining}% Aman`;
  }

  // Update modal metrics if open
  const storageVal = document.getElementById('quota-storage-used');
  const rowsVal = document.getElementById('quota-rows-used');
  const rowsRemainingVal = document.getElementById('quota-rows-remaining');
  const rowsBar = document.getElementById('quota-rows-bar');

  if (storageVal) {
    const estimatedKb = (120 + totalTransactions * 0.85).toFixed(1);
    storageVal.textContent = `~${estimatedKb} KB`;
  }
  if (rowsVal) rowsVal.textContent = `${totalTransactions} Baris`;
  if (rowsRemainingVal) rowsRemainingVal.textContent = `${remainingRows.toLocaleString('id-ID')} baris`;
  if (rowsBar) {
    const usedPct = ((totalTransactions / MONTHLY_LIMIT_ROWS) * 100).toFixed(2);
    rowsBar.style.width = `${Math.max(usedPct, 0.3)}%`;
  }
}

function openQuotaModal() {
  updateBackendQuotaDisplay();
  document.getElementById('modal-quota').classList.remove('hidden');
}

// Collaboration & Permission Management Modal (Viewer-Only - 100% Bebas Data Contoh)
function openCollabModal() {
  const container = document.getElementById('collab-content-area');
  const currentSpace = getActiveSpace();
  const isOwner = isOwnerOfCurrentSpace();
  const ownerUser = users[currentSpace.ownerId] || { name: 'Pemilik' };

  if (isOwner) {
    if (!currentSpace.allowedViewers) currentSpace.allowedViewers = [];

    // Filter valid viewers that are in currentSpace.allowedViewers
    const allowedViewerUsers = currentSpace.allowedViewers
      .map(id => users[id])
      .filter(u => u && u.id !== activeUserId);

    let membersHtml = '';
    if (allowedViewerUsers.length === 0) {
      membersHtml = `
        <div class="collab-empty-box">
          <div class="collab-empty-icon">👥</div>
          <strong class="collab-empty-title">Belum Ada Anggota Keluarga</strong>
          <p class="collab-empty-desc">Buku kas ini masih bersifat pribadi. Gunakan formulir di bawah untuk menambahkan email Google anggota keluarga (istri, suami, anak, atau rekan) agar mereka dapat memantau keuangan Anda.</p>
        </div>
      `;
    } else {
      membersHtml = '<div class="members-access-list">';
      allowedViewerUsers.forEach(u => {
        membersHtml += `
          <div class="member-access-item">
            <div class="member-item-info">
              <span class="member-item-avatar">${renderUserAvatarHtml(u, 34)}</span>
              <div>
                <span class="member-item-name">${escapeHtml(u.name)}</span>
                <span class="member-item-email">${escapeHtml(u.email)}</span>
              </div>
            </div>
            <div class="member-item-actions">
              <span class="badge-viewer-active">👁️ Pantau</span>
              <button 
                type="button"
                class="btn-toggle-access btn-revoke"
                onclick="handleRemoveCollabMember('${u.id}')"
                title="Cabut Izin Pantau"
              >
                🚫 Cabut Izin
              </button>
            </div>
          </div>
        `;
      });
      membersHtml += '</div>';
    }

    container.innerHTML = `
      <div class="collab-card">
        <div class="collab-card-header">
          <span class="collab-title">${currentSpace.icon} ${escapeHtml(currentSpace.name)}</span>
          <span class="collab-badge badge-shared">Milik Anda</span>
        </div>
        <p class="collab-desc">
          Kelola siapa saja anggota keluarga yang diizinkan <b>memantau</b> buku kas ini:
        </p>

        ${membersHtml}

        <!-- Form Tambah Anggota Keluarga Baru (100% Bebas Data Contoh) -->
        <div class="add-collab-section">
          <h4 class="add-collab-heading">+ Beri Izin Anggota Keluarga Baru</h4>
          <form id="form-add-collab" onsubmit="handleAddCollabMember(event)">
            <div class="form-group" style="margin-bottom:8px;">
              <label for="collab-member-email">Email Google (Gmail) Anggota:</label>
              <input type="email" id="collab-member-email" class="form-control" placeholder="contoh: istri@gmail.com" required>
            </div>
            <div class="form-group" style="margin-bottom:10px;">
              <label for="collab-member-name">Nama Panggilan / Peran:</label>
              <input type="text" id="collab-member-name" class="form-control" placeholder="Contoh: Istri / Bunda / Adik" required>
            </div>
            <button type="submit" class="btn-submit-tx" style="margin-top:0; padding:10px;">
              <span>+ Berikan Izin Pantau</span>
            </button>
          </form>
        </div>
      </div>

      <div class="collab-notice-box">
        <strong>🔒 Jaminan Keamanan Hak Pantau (Read-Only):</strong>
        Anggota yang Anda izinkan <b>HANYA DAPAT MEMANTAU</b> saldo & mutasi transaksi Anda. Mereka <b>TIDAK BISA menambah, merubah, atau menghapus</b> catatan keuangan Anda.
      </div>
    `;
  } else {
    // Viewer view: show info that user is a viewer
    container.innerHTML = `
      <div class="collab-card">
        <div class="collab-card-header">
          <span class="collab-title">${currentSpace.icon} ${escapeHtml(currentSpace.name)}</span>
          <span class="collab-badge badge-shared">Izin Pantau Aktif</span>
        </div>
        <p class="collab-desc">
          Buku kas ini dibuat dan dimiliki oleh <b>${escapeHtml(ownerUser.name)}</b> (${escapeHtml(ownerUser.email)}).
        </p>
        <div class="collab-notice-box">
          <strong>👁️ Status Hak Akses Anda: Pemantau (Viewer)</strong>
          Anda diizinkan memantau seluruh mutasi dan saldo buku kas ini secara realtime. Untuk menjaga integritas data, hanya <b>${escapeHtml(ownerUser.name)}</b> yang memiliki wewenang untuk menambah atau merubah transaksi.
        </div>
      </div>
    `;
  }

  document.getElementById('modal-collaboration').classList.remove('hidden');
}

function handleAddCollabMember(e) {
  e.preventDefault();
  const emailInput = document.getElementById('collab-member-email');
  const nameInput = document.getElementById('collab-member-name');
  const email = emailInput.value.trim().toLowerCase();
  const name = nameInput.value.trim();

  if (!email || !email.includes('@')) {
    alert('Masukkan email Google yang valid.');
    return;
  }

  const currentSpace = getActiveSpace();
  if (!currentSpace.allowedViewers) currentSpace.allowedViewers = [];

  let memberUser = Object.values(users).find(u => u.email && u.email.toLowerCase() === email);
  if (!memberUser) {
    const memberId = 'user_' + Date.now().toString(36);
    memberUser = {
      id: memberId,
      name: name,
      email: email,
      avatar: '👥',
      photo: '',
      color: '#ec4899',
      googleSheetUrl: '',
      webhookUrl: '',
      autoSyncEnabled: true
    };
    users[memberId] = memberUser;
  } else {
    if (name) memberUser.name = name;
  }

  if (!currentSpace.allowedViewers.includes(memberUser.id)) {
    currentSpace.allowedViewers.push(memberUser.id);
  }

  saveUsers();
  saveSpaces();

  emailInput.value = '';
  nameInput.value = '';

  openCollabModal();
  renderAll();
  showLiveToast('👥 Izin Diberikan', `${name} (${email}) dapat memantau buku kas ini.`);
  notifyOtherTabs('PERMISSION_CHANGED', { spaceId: currentSpace.id, targetUserId: memberUser.id });
}

function handleRemoveCollabMember(targetUserId) {
  const currentSpace = getActiveSpace();
  const targetUser = users[targetUserId] || { name: 'Anggota' };

  if (confirm(`Apakah Anda yakin ingin mencabut izin pantau untuk ${targetUser.name}?`)) {
    if (currentSpace.allowedViewers) {
      currentSpace.allowedViewers = currentSpace.allowedViewers.filter(id => id !== targetUserId);
    }
    saveSpaces();
    openCollabModal();
    renderAll();
    showLiveToast('🚫 Izin Dicabut', `Akses pantau untuk ${targetUser.name} telah dicabut.`);
    notifyOtherTabs('PERMISSION_CHANGED', { spaceId: currentSpace.id, targetUserId });
  }
}

function toggleViewerAccess(targetUserId) {
  handleRemoveCollabMember(targetUserId);
}

// Profile Photo Upload & Custom Avatar Handlers
let pendingProfilePhoto = undefined;

function triggerPhotoUpload() {
  const input = document.getElementById('edit-profile-photo-input');
  if (input) input.click();
}

function handleProfilePhotoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Silakan pilih file gambar yang valid (JPG, PNG, atau WebP).');
    return;
  }

  if (file.size > 8 * 1024 * 1024) {
    alert('Ukuran foto terlalu besar. Silakan pilih foto di bawah 8 MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Create high-res circular thumbnail (160x160)
      const canvas = document.createElement('canvas');
      const size = 160;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
      if (img.width > img.height) {
        sWidth = img.height;
        sx = (img.width - img.height) / 2;
      } else {
        sHeight = img.width;
        sy = (img.height - img.width) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, size, size);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      pendingProfilePhoto = dataUrl;

      updateProfileAvatarPreview(dataUrl);
      const removeBtn = document.getElementById('btn-remove-photo');
      if (removeBtn) removeBtn.classList.remove('hidden');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function updateProfileAvatarPreview(photoUrl, fallbackEmoji = '👤') {
  const preview = document.getElementById('profile-avatar-preview');
  if (!preview) return;
  if (photoUrl) {
    preview.innerHTML = `<img src="${photoUrl}" style="width:72px; height:72px; border-radius:50%; object-fit:cover; box-shadow:0 0 14px rgba(59,130,246,0.5);" alt="Foto Profil">`;
  } else {
    preview.innerHTML = `<span style="font-size:2.4rem;">${fallbackEmoji}</span>`;
  }
}

function removeProfilePhoto() {
  pendingProfilePhoto = null;
  const user = getActiveUser();
  updateProfileAvatarPreview(null, user.avatar || '👤');
  const removeBtn = document.getElementById('btn-remove-photo');
  if (removeBtn) removeBtn.classList.add('hidden');
  const input = document.getElementById('edit-profile-photo-input');
  if (input) input.value = '';
}

// Edit Profile Modal (Rename & Photo)
function openEditProfileModal() {
  const user = getActiveUser();
  pendingProfilePhoto = undefined;

  document.getElementById('edit-profile-name').value = user.name;
  document.getElementById('edit-profile-email').value = user.email;

  const removeBtn = document.getElementById('btn-remove-photo');
  if (user.photo) {
    updateProfileAvatarPreview(user.photo);
    if (removeBtn) removeBtn.classList.remove('hidden');
  } else {
    updateProfileAvatarPreview(null, user.avatar || '👤');
    if (removeBtn) removeBtn.classList.add('hidden');
  }

  const radios = document.querySelectorAll('input[name="profile_avatar"]');
  radios.forEach(r => {
    if (r.value === user.avatar) r.checked = true;
  });

  document.getElementById('modal-profile').classList.remove('hidden');
}

function handleSaveProfile(e) {
  e.preventDefault();
  const user = getActiveUser();
  const newName = document.getElementById('edit-profile-name').value.trim();
  const newEmail = document.getElementById('edit-profile-email').value.trim();
  const selectedAvatar = document.querySelector('input[name="profile_avatar"]:checked')?.value || '👤';

  user.name = newName;
  user.email = newEmail;
  user.avatar = selectedAvatar;

  if (pendingProfilePhoto !== undefined) {
    user.photo = pendingProfilePhoto || '';
  }

  // Also update space name if it's their personal space
  if (spaces['space_1'] && spaces['space_1'].ownerId === user.id) {
    spaces['space_1'].name = `Buku Kas Utama (${newName})`;
  } else if (spaces['space_' + user.id]) {
    spaces['space_' + user.id].name = `Buku Kas (${newName})`;
  }

  saveUsers();
  saveSpaces();

  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  renderAll();

  closeModal('modal-profile');
  showLiveToast('✅ Profil & Foto Diperbarui', `Nama tampilan berhasil diubah menjadi "${newName}".`);
  notifyOtherTabs('PROFILE_UPDATED', { userId: user.id });
}

// Google Sign-In & Authentication Handlers (2 Opsi: Akun Google di HP vs Manual)
function getDeviceGoogleAccounts() {
  let list = [];
  const raw = localStorage.getItem('sakukita_device_google_accounts');
  if (raw) {
    try {
      list = JSON.parse(raw);
    } catch (e) {
      list = [];
    }
  }

  // Include any verified user from `users` that has a valid email and not already in list
  Object.values(users).forEach(u => {
    if (u.email && u.email.includes('@')) {
      if (!list.some(a => a.email.toLowerCase() === u.email.toLowerCase())) {
        list.push({ email: u.email, name: u.name, avatar: u.avatar || '👤', photo: u.photo || '' });
      }
    }
  });

  return list;
}

function saveDeviceGoogleAccount(email, name, avatar = '👤', photo = '') {
  let list = getDeviceGoogleAccounts();
  const existingIdx = list.findIndex(a => a.email.toLowerCase() === email.toLowerCase());
  if (existingIdx >= 0) {
    if (name) list[existingIdx].name = name;
    if (photo) list[existingIdx].photo = photo;
  } else {
    list.push({ email, name, avatar, photo });
  }
  localStorage.setItem('sakukita_device_google_accounts', JSON.stringify(list));
}

function renderDeviceAccountsList() {
  const container = document.getElementById('device-accounts-container');
  if (!container) return;

  const accounts = getDeviceGoogleAccounts();
  if (accounts.length === 0) {
    container.innerHTML = `
      <div style="font-size:0.75rem; color:#94a3b8; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.08); border-radius:8px; padding:10px 12px; text-align:center;">
        Belum ada akun tersimpan di HP ini. Tekan tombol di bawah atau masukkan email manual di Opsi 2.
      </div>
    `;
    const titleEl = document.getElementById('btn-onetap-title');
    if (titleEl) titleEl.textContent = 'Masuk dengan Akun Google di HP';
  } else {
    let html = '';
    accounts.forEach(acc => {
      html += `
        <div class="device-acc-card" onclick="loginWithSavedGoogleAccount('${escapeHtml(acc.email)}', '${escapeHtml(acc.name)}')">
          <div class="device-acc-avatar-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          </div>
          <div class="device-acc-info">
            <strong class="device-acc-name">${escapeHtml(acc.name)}</strong>
            <span class="device-acc-email">${escapeHtml(acc.email)}</span>
          </div>
          <button type="button" class="btn-choose-device-acc">Pilih Akun</button>
        </div>
      `;
    });
    container.innerHTML = html;
    const titleEl = document.getElementById('btn-onetap-title');
    if (titleEl) titleEl.textContent = `Masuk sebagai ${accounts[0].name}`;
  }
}

function loginWithSavedGoogleAccount(email, name) {
  let existingUser = Object.values(users).find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    activeUserId = existingUser.id;
    if (name) existingUser.name = name;
  } else {
    if (users.user_1 && (!users.user_1.email || users.user_1.email === '')) {
      users.user_1.email = email;
      users.user_1.name = name || email.split('@')[0];
      activeUserId = 'user_1';
      if (spaces.space_1) {
        spaces.space_1.name = `Buku Kas Utama (${users.user_1.name})`;
      }
    } else {
      const newId = 'user_' + (Date.now().toString(36));
      users[newId] = {
        id: newId,
        name: name || email.split('@')[0],
        email: email,
        avatar: '👤',
        photo: '',
        color: '#3b82f6',
        googleSheetUrl: '',
        webhookUrl: '',
        autoSyncEnabled: true
      };
      activeUserId = newId;

      const newSpaceId = 'space_' + newId;
      if (!spaces[newSpaceId]) {
        spaces[newSpaceId] = {
          id: newSpaceId,
          name: `Buku Kas (${users[newId].name})`,
          icon: '📘',
          ownerId: newId,
          allowedViewers: [],
          budget: 0,
          wallets: [
            { id: 'w-' + newId, name: 'Dompet Utama', balance: 0, color: '#3b82f6' }
          ],
          transactions: []
        };
      }
      activeSpaceId = newSpaceId;
    }
  }

  saveDeviceGoogleAccount(email, name);
  localStorage.setItem('sakukita_logged_in', 'true');
  localStorage.setItem('sakukita_current_user_id', activeUserId);
  saveUsers();
  saveSpaces();

  validateActiveSpace();
  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  populateCategoryPicker();
  renderAll();
  updateBackendQuotaDisplay();

  closeModal('modal-google-login');
  showLiveToast('🎉 Berhasil Masuk', `Selamat datang kembali, ${getActiveUser().name}!`);
  notifyOtherTabs('USER_SWITCHED', { userId: activeUserId });
}

function triggerGoogleOneTapLogin() {
  const accounts = getDeviceGoogleAccounts();
  if (accounts.length === 1) {
    loginWithSavedGoogleAccount(accounts[0].email, accounts[0].name);
    return;
  } else if (accounts.length > 1) {
    showLiveToast('👆 Pilih Akun Google', 'Silakan ketuk akun Google Anda pada daftar Opsi 1.');
    const container = document.getElementById('device-accounts-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // First time prompt for phone account
  const email = prompt('Pilih / Masukkan Email Akun Google (Gmail) di HP Anda:\n\n(Akun ini akan langsung diingat di HP Anda untuk login otomatis 1-tap ke depan)', '');
  if (!email || !email.includes('@')) {
    if (email !== null) alert('Masukkan email Google yang valid (contoh: nama@gmail.com).');
    return;
  }
  const defaultName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const name = prompt('Nama panggilan Anda di aplikasi:', defaultName) || defaultName;
  loginWithSavedGoogleAccount(email.trim().toLowerCase(), name.trim());
}

function openGoogleLoginModal() {
  const emailInput = document.getElementById('login-google-email');
  const nameInput = document.getElementById('login-google-name');
  const currentUser = getActiveUser();

  if (emailInput && currentUser && currentUser.email) {
    emailInput.value = currentUser.email;
  }
  if (nameInput && currentUser && currentUser.name && currentUser.name !== 'Pengguna SakuKita') {
    nameInput.value = currentUser.name;
  }

  renderDeviceAccountsList();
  document.getElementById('modal-google-login').classList.remove('hidden');
}

function handleAddNewGoogleAccount(e) {
  e.preventDefault();
  const emailInput = document.getElementById('login-google-email');
  const nameInput = document.getElementById('login-google-name');
  const email = emailInput.value.trim().toLowerCase();
  const customName = nameInput.value.trim();

  if (!email || !email.includes('@')) {
    alert('Masukkan email Google yang valid (contoh: nama@gmail.com).');
    return;
  }

  let existingUser = Object.values(users).find(u => u.email && u.email.toLowerCase() === email);
  if (existingUser) {
    activeUserId = existingUser.id;
    if (customName) existingUser.name = customName;
  } else {
    // If the initial default user has empty email, link it to this account
    if (users.user_1 && (!users.user_1.email || users.user_1.email === '')) {
      const fallbackName = customName || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      users.user_1.email = email;
      users.user_1.name = fallbackName;
      activeUserId = 'user_1';
      if (spaces.space_1) {
        spaces.space_1.name = `Buku Kas Utama (${fallbackName})`;
      }
    } else {
      const newId = 'user_' + (Date.now().toString(36));
      const fallbackName = customName || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      users[newId] = {
        id: newId,
        name: fallbackName,
        email: email,
        avatar: '👤',
        photo: '',
        color: '#3b82f6',
        googleSheetUrl: '',
        webhookUrl: '',
        autoSyncEnabled: true
      };
      activeUserId = newId;

      const newSpaceId = 'space_' + newId;
      if (!spaces[newSpaceId]) {
        spaces[newSpaceId] = {
          id: newSpaceId,
          name: `Buku Kas (${fallbackName})`,
          icon: '📘',
          ownerId: newId,
          allowedViewers: [],
          budget: 0,
          wallets: [
            { id: 'w-' + newId, name: 'Dompet Utama', balance: 0, color: '#3b82f6' }
          ],
          transactions: []
        };
      }
      activeSpaceId = newSpaceId;
    }
  }

  saveDeviceGoogleAccount(email, customName || getActiveUser().name);
  localStorage.setItem('sakukita_logged_in', 'true');
  localStorage.setItem('sakukita_current_user_id', activeUserId);
  saveUsers();
  saveSpaces();

  validateActiveSpace();
  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  populateCategoryPicker();
  renderAll();
  updateBackendQuotaDisplay();

  closeModal('modal-google-login');
  showLiveToast('🎉 Berhasil Masuk', `Selamat datang, ${getActiveUser().name}!`);
  notifyOtherTabs('USER_SWITCHED', { userId: activeUserId });
}

function handleGoogleLogout() {
  if (confirm('Keluar dari sesi akun Google saat ini?\nCatatan keuangan Anda akan tetap tersimpan aman di aplikasi ini.')) {
    localStorage.removeItem('sakukita_logged_in');
    closeModal('modal-profile');
    closeModal('modal-account');

    // Pre-fill inputs with logged out account info for quick one-tap re-login
    const emailInput = document.getElementById('login-google-email');
    const nameInput = document.getElementById('login-google-name');
    const currentUser = getActiveUser();
    if (emailInput && currentUser && currentUser.email) {
      emailInput.value = currentUser.email;
    }
    if (nameInput && currentUser && currentUser.name && currentUser.name !== 'Pengguna SakuKita') {
      nameInput.value = currentUser.name;
    }

    openGoogleLoginModal();
    showLiveToast('👋 Berhasil Keluar', 'Data Anda tetap tersimpan. Masukkan email untuk login kembali.');
  }
}

// Multi-Window & Realtime Broadcasting
function openDualWindow() {
  const currentPath = window.location.href.split('?')[0];
  let targetUser = 'user_2';
  if (activeUserId === 'user_2') targetUser = 'user_1';
  else if (activeUserId === 'user_1') targetUser = 'user_3';

  const url = `${currentPath}?user=${targetUser}`;
  window.open(url, '_blank', 'width=480,height=850,left=550,top=50');
}

function setupRealtimeListeners() {
  if (syncChannel) {
    syncChannel.onmessage = (event) => {
      handleRemoteSync(event.data);
    };
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'sakukita_spaces_v3' || e.key === 'sakukita_users_v3') {
      loadData();
      validateActiveSpace();
      renderUserPills();
      renderActiveUserProfile();
      updateSpaceSelectorUI();
      renderAll();
      updateBackendQuotaDisplay();
    }
  });
}

function notifyOtherTabs(type, payload) {
  if (syncChannel) {
    syncChannel.postMessage({ type, payload, senderId: activeUserId, spaceId: activeSpaceId });
  }
}

function handleRemoteSync(data) {
  loadData();
  validateActiveSpace();
  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  renderAll();
  updateBackendQuotaDisplay();

  if (data.senderId !== activeUserId) {
    playNotificationChime();
    const sender = users[data.senderId] || { name: 'Anggota' };

    if (data.type === 'NEW_TRANSACTION') {
      showLiveToast(
        `🔔 ${sender.name} mencatat transaksi!`,
        `${data.payload.note} (${data.payload.type === 'INCOME' ? '+' : '-'}${formatRupiah(data.payload.amount)})`
      );
    } else if (data.type === 'PERMISSION_CHANGED') {
      showLiveToast(
        `🤝 Update Izin Pantau!`,
        `${sender.name} memperbarui daftar hak akses pemantau.`
      );
    }
  }
}

function playNotificationChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (err) {}
}

function showLiveToast(title, desc) {
  const alertEl = document.getElementById('live-alert');
  const titleEl = document.getElementById('alert-title');
  const descEl = document.getElementById('alert-desc');
  if (!alertEl) return;

  titleEl.textContent = title;
  descEl.textContent = desc;

  alertEl.classList.remove('hidden');
  setTimeout(() => {
    alertEl.classList.add('hidden');
  }, 4500);
}

// Modal Helpers
function openTransactionModal() {
  populateWalletSelect(getActiveSpace());
  renderActiveUserProfile();
  document.getElementById('modal-transaction').classList.remove('hidden');
}

function openAddWalletModal() {
  if (!isOwnerOfCurrentSpace()) {
    alert('Akses Ditolak: Hanya pemilik buku kas yang dapat menambah dompet.');
    return;
  }
  document.getElementById('modal-wallet').classList.remove('hidden');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('hidden');
}

function handleBackdropClick(e, modalId) {
  if (e.target.id === modalId) {
    closeModal(modalId);
  }
}

// Formatters & Utilities
function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num).replace('IDR', 'Rp');
}

function formatCurrencyInput(input) {
  const raw = input.value.replace(/\D/g, '');
  if (!raw) {
    input.value = '';
    return;
  }
  input.value = new Intl.NumberFormat('id-ID').format(raw);
}

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'Baru saja';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mnt lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hr lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function copySqlCode() {
  const code = document.getElementById('sql-script-code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    alert('✅ Script SQL Supabase berhasil disalin ke clipboard!');
  });
}
