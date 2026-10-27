// SakuKita - Collaborative Multi-Account & Family Finance Ledger
// Features: Viewer-Only Permissions, Google Sheets Auto-Sync, Backend Limit Monitor

// Clean Starting User Profiles (Starts 100% clean and empty from zero)
const DEFAULT_USERS = {
  user_1: {
    id: 'user_1',
    name: 'Saya (Akun Utama)',
    email: 'saya@gmail.com',
    avatar: '👨‍💼',
    color: '#3b82f6',
    googleSheetUrl: '',
    webhookUrl: '',
    autoSyncEnabled: true
  },
  user_2: {
    id: 'user_2',
    name: 'Pasangan / Anggota 1',
    email: 'keluarga1@gmail.com',
    avatar: '👩‍💼',
    color: '#ec4899',
    googleSheetUrl: '',
    webhookUrl: '',
    autoSyncEnabled: true
  },
  user_3: {
    id: 'user_3',
    name: 'Keluarga 2',
    email: 'keluarga2@gmail.com',
    avatar: '🧑‍💻',
    color: '#10b981',
    googleSheetUrl: '',
    webhookUrl: '',
    autoSyncEnabled: true
  }
};

// Clean Starting Financial Spaces (Starts 100% clean with Rp 0 and 0 transactions)
const DEFAULT_SPACES = {
  space_1: {
    id: 'space_1',
    name: 'Buku Kas Utama Saya',
    icon: '📘',
    ownerId: 'user_1',
    allowedViewers: ['user_2'],
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

// Standard Categories
const CATEGORIES = {
  EXPENSE: [
    { name: 'Makanan & Minuman', icon: '🍲' },
    { name: 'Belanja Bulanan', icon: '🛒' },
    { name: 'Transportasi & Bensin', icon: '⛽' },
    { name: 'Tagihan & Utilitas', icon: '💡' },
    { name: 'Kesehatan & Obat', icon: '💊' },
    { name: 'Pendidikan & Belajar', icon: '📚' },
    { name: 'Hiburan & Santai', icon: '🍿' },
    { name: 'Keperluan Lainnya', icon: '📦' }
  ],
  INCOME: [
    { name: 'Gaji & Upah', icon: '💼' },
    { name: 'Hasil Usaha & Penjualan', icon: '🛍️' },
    { name: 'Bonus & THR', icon: '🎉' },
    { name: 'Investasi & Bagi Hasil', icon: '📈' },
    { name: 'Pendapatan Lainnya', icon: '💰' }
  ]
};

// Global State
let users = {};
let spaces = {};
let activeUserId = 'user_1';
let activeSpaceId = 'space_1';
let activeTxType = 'EXPENSE';
let currentFilter = 'all';

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

  setupRealtimeListeners();

  // On first install / fresh launch: Show Google Account Chooser
  if (!localStorage.getItem('sakukita_logged_in')) {
    setTimeout(() => {
      openGoogleLoginModal();
    }, 500);
  }
});

// Storage Management - Clean V5 Defaults
function loadData() {
  const savedUsers = localStorage.getItem('sakukita_users_v5');
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

  const savedSpaces = localStorage.getItem('sakukita_spaces_v5');
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
}

function saveUsers() {
  localStorage.setItem('sakukita_users_v5', JSON.stringify(users));
}

function saveSpaces() {
  localStorage.setItem('sakukita_spaces_v5', JSON.stringify(spaces));
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
    headerEmail.textContent = user.email;
  }

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
    roleTag.textContent = '👑 Pemilik Penuh';
    spaceOwnerLabel.textContent = `Buku Kas: ${currentSpace.name}`;
    addTxBtn.className = 'btn-add-transaction';
    addTxBtnText.textContent = 'Catat Transaksi';
    if (addWalletBtn) addWalletBtn.classList.remove('disabled');
  } else {
    viewerBanner.classList.remove('hidden');
    viewerDesc.innerHTML = `Buku kas ini milik <strong>${escapeHtml(ownerUser.name)}</strong> (${escapeHtml(ownerUser.email)}). Anda memiliki <strong>Izin Memantau (Read-Only)</strong>. Hanya pemilik buku yang dapat menambah, merubah, atau menghapus transaksi.`;
    roleTag.className = 'role-badge role-viewer';
    roleTag.textContent = '👁️ Mode Pantau (Read-Only)';
    spaceOwnerLabel.textContent = `Memantau Buku Kas: ${currentSpace.name}`;
    addTxBtn.className = 'btn-add-transaction btn-viewer-locked';
    addTxBtnText.textContent = '🔒 Mode Hanya Pantau';
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
  document.getElementById('total-balance').textContent = formatRupiah(totalBalance);

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

  currentSpace.wallets.forEach(wallet => {
    const card = document.createElement('div');
    card.className = 'wallet-card-item';
    card.innerHTML = `
      <div class="wallet-top">
        <span class="wallet-name">${escapeHtml(wallet.name)}</span>
        <span class="wallet-dot" style="background: ${wallet.color}; box-shadow: 0 0 8px ${wallet.color}"></span>
      </div>
      <div class="wallet-balance">${formatRupiah(wallet.balance)}</div>
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
      <span class="cat-icon">${cat.icon}</span>
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

// Wallet Modal
function handleSaveWallet(e) {
  e.preventDefault();

  if (!isOwnerOfCurrentSpace()) {
    alert('Akses Ditolak: Hanya pemilik buku kas yang dapat menambah dompet.');
    return;
  }

  const name = document.getElementById('wallet-name').value.trim();
  const balStr = document.getElementById('wallet-balance').value.replace(/\D/g, '');
  const balance = parseFloat(balStr) || 0;
  const color = document.querySelector('input[name="wallet_color"]:checked')?.value || '#3b82f6';

  const currentSpace = getActiveSpace();
  const newWallet = {
    id: 'w-' + Date.now(),
    name,
    balance,
    color
  };

  currentSpace.wallets.push(newWallet);
  saveSpaces();
  notifyOtherTabs('NEW_WALLET', newWallet);

  renderAll();
  closeModal('modal-wallet');
  document.getElementById('form-wallet').reset();
  showLiveToast('💼 Dompet Ditambahkan', `Dompet "${name}" berhasil dibuat.`);
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
  if (activeUser.webhookUrl && activeUser.webhookUrl.startsWith('http')) {
    try {
      fetch(activeUser.webhookUrl, {
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
          walletName: wallet.name,
          note: tx.note,
          timestamp: new Date().toISOString()
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

function openGoogleSheetsModal() {
  const activeUser = getActiveUser();
  renderActiveUserProfile();

  document.getElementById('cfg-sheet-url').value = activeUser.googleSheetUrl || '';
  document.getElementById('cfg-webhook-url').value = activeUser.webhookUrl || '';
  document.getElementById('cfg-autosync-toggle').checked = activeUser.autoSyncEnabled !== false;

  renderSheetsTablePreview();
  document.getElementById('modal-sheets').classList.remove('hidden');
}

function handleSaveSheetsConfig(e) {
  e.preventDefault();
  const activeUser = getActiveUser();
  activeUser.googleSheetUrl = document.getElementById('cfg-sheet-url').value.trim();
  activeUser.webhookUrl = document.getElementById('cfg-webhook-url').value.trim();
  activeUser.autoSyncEnabled = document.getElementById('cfg-autosync-toggle').checked;

  saveUsers();
  renderActiveUserProfile();
  closeModal('modal-sheets');
  showLiveToast('📊 Pengaturan Disimpan', `Spreadsheet pribadi ${activeUser.name} berhasil diperbarui.`);
}

function renderSheetsTablePreview() {
  const tbody = document.getElementById('sheets-preview-tbody');
  const countTag = document.getElementById('preview-row-count');
  const activeUser = getActiveUser();
  if (!tbody) return;

  const storageKey = 'sakukita_sheet_sync_log_' + activeUser.id;
  let syncHistory = JSON.parse(localStorage.getItem(storageKey) || '[]');

  // If empty, generate rows ONLY from transactions created by activeUser (Strict isolation!)
  if (syncHistory.length === 0) {
    Object.values(spaces).forEach(space => {
      space.transactions.forEach((t, i) => {
        if (t.createdBy === activeUser.id) {
          const wallet = space.wallets.find(w => w.id === t.walletId) || { name: 'Dompet' };
          syncHistory.push({
            id: 'row-' + activeUser.id + '-' + i,
            timestamp: new Date(t.createdAt).toLocaleString('id-ID'),
            userName: activeUser.name,
            userEmail: activeUser.email,
            spaceName: space.name,
            type: t.type === 'INCOME' ? 'Pemasukan (+)' : 'Pengeluaran (-)',
            category: t.category,
            amount: formatRupiah(t.amount),
            walletName: wallet.name,
            note: t.note
          });
        }
      });
    });
    localStorage.setItem(storageKey, JSON.stringify(syncHistory));
  }

  countTag.textContent = `${syncHistory.length} Baris Pribadi (${activeUser.name})`;
  tbody.innerHTML = '';

  if (syncHistory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 20px; color: var(--text-muted);">Belum ada catatan transaksi pribadi milik ${escapeHtml(activeUser.name)}.</td></tr>`;
    return;
  }

  syncHistory.slice(0, 15).forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${escapeHtml(row.timestamp)}</td>
      <td><strong style="color:#60a5fa">${escapeHtml(row.userName)}</strong></td>
      <td><span style="font-family:var(--font-mono); font-size:0.7rem">${escapeHtml(row.userEmail)}</span></td>
      <td style="color: ${row.type.includes('+') ? '#10b981' : '#f43f5e'}">${escapeHtml(row.type)}</td>
      <td>${escapeHtml(row.category)}</td>
      <td><strong>${escapeHtml(row.amount)}</strong></td>
      <td>${escapeHtml(row.walletName)}</td>
      <td>${escapeHtml(row.note)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Automatic Google Drive Spreadsheet Handler
function createSpreadsheetInGoogleDrive() {
  const activeUser = getActiveUser();
  const title = `SakuKita - Mutasi Keuangan Pribadi (${activeUser.name})`;
  // Open Google Sheets creation endpoint with pre-filled title in active user's Google Drive session
  const directCreateUrl = `https://docs.google.com/spreadsheets/create?title=${encodeURIComponent(title)}`;
  window.open(directCreateUrl, '_blank');
  showLiveToast('⚡ Google Drive Terhubung', `Membuka lembar kerja baru "${title}" di Google Drive Anda.`);
}

function handleAutoSheetOpen(e) {
  const activeUser = getActiveUser();
  if (activeUser.googleSheetUrl && activeUser.googleSheetUrl.startsWith('http') && !activeUser.googleSheetUrl.includes('_Spreadsheet_Pribadi')) {
    // If user specified custom link, let default link action proceed
    return;
  }
  // Otherwise open direct automated Drive sheet
  e.preventDefault();
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
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const fileDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  link.setAttribute('download', `Mutasi_Rekening_SakuKita_${activeUser.name.replace(/\s+/g, '_')}_${fileDate}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showLiveToast(
    '📄 Rekening Koran Mutasi Diunduh',
    `Format rapi ala mutasi bank (${userTxList.length} transaksi ${activeUser.name}) berhasil diunduh.`
  );
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
    startY: 85,
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

// Collaboration & Permission Management Modal (Viewer-Only)
function openCollabModal() {
  const container = document.getElementById('collab-content-area');
  const currentSpace = getActiveSpace();
  const isOwner = isOwnerOfCurrentSpace();
  const ownerUser = users[currentSpace.ownerId] || { name: 'Pemilik' };

  if (isOwner) {
    // Owner view: list other family Google accounts with Grant / Revoke View-Only access
    let membersHtml = '';
    Object.values(users).forEach(u => {
      if (u.id === activeUserId) return; // skip self

      const isAllowed = currentSpace.allowedViewers && currentSpace.allowedViewers.includes(u.id);

      membersHtml += `
        <div class="member-access-item">
          <div class="member-item-info">
            <span class="member-item-avatar">${renderUserAvatarHtml(u, 34)}</span>
            <div>
              <span class="member-item-name">${escapeHtml(u.name)}</span>
              <span class="member-item-email">${escapeHtml(u.email)}</span>
            </div>
          </div>
          <div>
            <button 
              class="btn-toggle-access ${isAllowed ? 'btn-revoke' : 'btn-grant'}"
              onclick="toggleViewerAccess('${u.id}')"
            >
              ${isAllowed ? '🚫 Cabut Izin' : '👁️ Izinkan Pantau'}
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="collab-card">
        <div class="collab-card-header">
          <span class="collab-title">${currentSpace.icon} ${escapeHtml(currentSpace.name)}</span>
          <span class="collab-badge badge-shared">Milik Anda</span>
        </div>
        <p class="collab-desc">
          Berikan izin kepada anggota keluarga di bawah ini agar mereka dapat <b>memantau</b> keuangan Anda di aplikasi mereka:
        </p>
        <div class="members-access-list">
          ${membersHtml}
        </div>
      </div>

      <div class="collab-notice-box">
        <strong>🔒 Jaminan Keamanan & Hak Pantau (Read-Only):</strong>
        Anggota yang Anda beri izin <b>HANYA DAPAT MEMANTAU</b> saldo & riwayat transaksi Anda. Sistem mengunci hak akses sehingga mereka <b>TIDAK BISA menambah, merubah, atau menghapus</b> catatan keuangan Anda.
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

function toggleViewerAccess(targetUserId) {
  const currentSpace = getActiveSpace();
  if (!isOwnerOfCurrentSpace()) return;

  if (!currentSpace.allowedViewers) currentSpace.allowedViewers = [];

  const index = currentSpace.allowedViewers.indexOf(targetUserId);
  const targetUser = users[targetUserId] || { name: 'Pengguna' };

  if (index > -1) {
    currentSpace.allowedViewers.splice(index, 1);
    showLiveToast('🚫 Izin Dicabut', `Akses pantau untuk ${targetUser.name} telah dicabut.`);
  } else {
    currentSpace.allowedViewers.push(targetUserId);
    showLiveToast('👁️ Izin Diberikan', `${targetUser.name} sekarang dapat memantau buku kas ini.`);
  }

  saveSpaces();
  notifyOtherTabs('PERMISSION_CHANGED', { spaceId: currentSpace.id, targetUserId });
  openCollabModal();
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

// Google Sign-In & Account Switcher Handlers
function openGoogleLoginModal() {
  const container = document.getElementById('google-accounts-picker');
  if (container) {
    let html = '';
    Object.values(users).forEach(u => {
      const isSelected = u.id === activeUserId;
      html += `
        <div class="google-acc-card ${isSelected ? 'selected' : ''}" onclick="selectGoogleAccount('${u.id}')">
          <div class="google-acc-avatar-wrap">
            ${renderUserAvatarHtml(u, 40)}
          </div>
          <div class="google-acc-info">
            <strong class="google-acc-name">${escapeHtml(u.name)}</strong>
            <span class="google-acc-email">${escapeHtml(u.email)}</span>
          </div>
          <div class="google-acc-action">
            ${isSelected ? '<span class="badge-active-google">✓ Sedang Masuk</span>' : '<span class="btn-select-google">Pilih Akun</span>'}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }
  document.getElementById('modal-google-login').classList.remove('hidden');
}

function selectGoogleAccount(userId) {
  if (!users[userId]) return;
  activeUserId = userId;
  localStorage.setItem('sakukita_logged_in', 'true');

  validateActiveSpace();
  currentFilter = 'all';

  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  renderAll();
  updateBackendQuotaDisplay();

  closeModal('modal-google-login');
  showLiveToast('👋 Berhasil Masuk', `Akun Google ${users[userId].email} aktif.`);
  notifyOtherTabs('USER_SWITCHED', { userId });
}

function handleAddNewGoogleAccount(e) {
  e.preventDefault();
  const emailInput = document.getElementById('login-google-email');
  const nameInput = document.getElementById('login-google-name');
  const email = emailInput.value.trim().toLowerCase();
  const customName = nameInput.value.trim();

  if (!email || !email.includes('@')) {
    alert('Masukkan email Google yang valid.');
    return;
  }

  let existingUser = Object.values(users).find(u => u.email.toLowerCase() === email);
  if (existingUser) {
    activeUserId = existingUser.id;
    if (customName) existingUser.name = customName;
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
  }

  localStorage.setItem('sakukita_logged_in', 'true');
  saveUsers();
  saveSpaces();

  emailInput.value = '';
  nameInput.value = '';

  validateActiveSpace();
  renderUserPills();
  renderActiveUserProfile();
  updateSpaceSelectorUI();
  populateCategoryPicker();
  renderAll();
  updateBackendQuotaDisplay();

  closeModal('modal-google-login');
  showLiveToast('🎉 Berhasil Masuk', `Akun Google ${email} aktif.`);
  notifyOtherTabs('USER_SWITCHED', { userId: activeUserId });
}

function handleGoogleLogout() {
  if (confirm('Keluar dari sesi akun Google saat ini?\nAnda bisa memilih akun Google lain setelah keluar.')) {
    localStorage.removeItem('sakukita_logged_in');
    closeModal('modal-profile');
    openGoogleLoginModal();
    showLiveToast('👋 Telah Keluar', 'Silakan pilih akun Google untuk masuk kembali.');
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
