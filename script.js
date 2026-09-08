const STORAGE_KEYS = {
  users: 'styleCoffeeUsers',
  currentUser: 'styleCoffeeCurrentUser',
  paymentHistory: 'styleCoffeePaymentHistory'
};

const defaultUsers = [
  {
    id: 1,
    name: 'Kasir Style',
    email: 'kasir@stylecoffe.com',
    password: '123456',
    fullName: 'Kasir Style Cafe',
    photo: null
  }
];

const menuItems = [
  // MINUMAN
  {
    id: 1,
    name: 'Cappuccino',
    price: 25000,
    description: 'Espresso lembut dengan busa susu halus.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
    category: 'minuman'
  },
  {
    id: 2,
    name: 'Latte Art',
    price: 30000,
    description: 'Kopi susu premium dengan latte art klasik.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80',
    category: 'minuman'
  },
  {
    id: 3,
    name: 'Espresso',
    price: 18000,
    description: 'Rasa pahit yang seimbang dan beraroma kuat.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=900&q=80',
    category: 'minuman'
  },
  {
    id: 4,
    name: 'Matcha Latte',
    price: 26000,
    description: 'Teh hijau lembut dengan susu hangat.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80',
    category: 'minuman'
  },
  {
    id: 5,
    name: 'Iced Coffee',
    price: 22000,
    description: 'Kopi dingin premium dengan es yang segar.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
    category: 'minuman'
  },
  {
    id: 6,
    name: 'Hot Chocolate',
    price: 24000,
    description: 'Cokelat premium hangat dengan susu segar.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80',
    category: 'minuman'
  },
  
  // MAKANAN
  {
    id: 7,
    name: 'Croissant',
    price: 22000,
    description: 'Pastri lembut dan renyah cocok untuk breakfast.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
    category: 'makanan'
  },
  {
    id: 8,
    name: 'Cheese Cake',
    price: 32000,
    description: 'Dessert creamy dengan rasa keju yang lembut.',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=900&q=80',
    category: 'makanan'
  },
  {
    id: 9,
    name: 'Brownie Chocolate',
    price: 18000,
    description: 'Brownies cokelat legit dan nikmat.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    category: 'makanan'
  },
  {
    id: 10,
    name: 'Banana Bread',
    price: 20000,
    description: 'Roti pisang lembut dengan aroma pisang yang kuat.',
    image: 'banana-bread-wpkt-mediumSquareAt3X.jpg',
    category: 'makanan'
  },
  {
    id: 11,
    name: 'Donut Glazed',
    price: 16000,
    description: 'Donut empuk dengan topping glaze manis.',
    image: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=900&q=80',
    category: 'makanan'
  },
  {
    id: 12,
    name: 'Sandwich Club',
    price: 28000,
    description: 'Sandwich premium dengan daging, keju, dan sayuran segar.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    category: 'makanan'
  }
];

const state = {
  users: [],
  currentUser: null,
  cart: [],
  paymentHistory: [],
  currentCategory: 'all'
};

const authScreen = document.getElementById('authScreen');
const app = document.getElementById('app');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const menuList = document.getElementById('menuList');
const orderItems = document.getElementById('orderItems');
const subtotalValue = document.getElementById('subtotalValue');
const taxValue = document.getElementById('taxValue');
const totalValue = document.getElementById('totalValue');
const receiptContent = document.getElementById('receiptContent');
const connectionStatus = document.getElementById('connectionStatus');
const liveClock = document.getElementById('liveClock');
const cashierName = document.getElementById('cashierName');
const cashierEmail = document.getElementById('cashierEmail');
const profilePhotoDisplay = document.getElementById('profilePhotoDisplay');
const tableNumber = document.getElementById('tableNumber');
const toast = document.getElementById('toast');
const paymentAmountInput = document.getElementById('paymentAmount');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const loginPasswordInput = document.getElementById('loginPassword');
const qrisContainer = document.getElementById('qrisContainer');


const historyModal = document.getElementById('historyModal');
const historyList = document.getElementById('historyList');

function loadUsers() {
  const savedUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.users));
  state.users = Array.isArray(savedUsers) && savedUsers.length ? savedUsers : defaultUsers;
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(state.users));
}

function saveUsers() {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(state.users));
}

function loadPaymentHistory() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.paymentHistory));
  state.paymentHistory = Array.isArray(saved) ? saved : [];
}

function getCurrentUser() {
  const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser));
  return savedUser || null;
}

function setCurrentUser(user) {
  state.currentUser = user;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
}

function getMenuById(menuId) {
  return menuItems.find((item) => item.id === Number(menuId));
}

function updateConnectionStatus() {
  const isOnline = navigator.onLine;
  connectionStatus.textContent = isOnline ? 'Online' : 'Offline';
  connectionStatus.classList.toggle('online', isOnline);
  connectionStatus.classList.toggle('offline', !isOnline);
  if (!isOnline) {
    showToast('Anda sedang offline, data tetap bisa diproses.');
  }
}

function generateReceiptMarkup(subtotal, tax, total) {
  const meja = tableNumber.value ? `Meja: ${tableNumber.value}` : 'Meja: -';
  const note = orderNote && orderNote.value.trim() ? `Catatan: ${orderNote.value.trim()}` : '';
  
  const orderLines = state.cart
    .map((orderItem) => {
      const menu = getMenuById(orderItem.id);
      if (!menu) return '';
      return `<p>${menu.name} x ${orderItem.quantity} = ${formatCurrency(menu.price * orderItem.quantity)}</p>`;
    })
    .join('');

  return `
    <p><strong>Style Coffe</strong></p>
    <p>${new Date().toLocaleString('id-ID')}</p>
    <p>${meja}</p>
    ${note ? `<p style="font-style: italic; color: var(--accent-strong);">${note}</p>` : ''}
    <p>------------------------------</p>
    ${orderLines || '<p>Belum ada pesanan.</p>'}
    <p>------------------------------</p>
    <p>Subtotal: ${formatCurrency(subtotal)}</p>
    <p>PPN: ${formatCurrency(tax)}</p>
    <p><strong>Total: ${formatCurrency(total)}</strong></p>
  `;
}

function updateClock() {
  const now = new Date();
  liveClock.textContent = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

function toggleAuthMode(mode) {
  const tabs = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.auth-form');

  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.authTab === mode);
  });

  forms.forEach((form) => {
    form.classList.toggle('active', form.id === `${mode}Form`);
  });
}

function renderMenu() {
  const filtered = menuItems.filter(item => 
    state.currentCategory === 'all' || item.category === state.currentCategory
  );

  menuList.innerHTML = filtered
    .map(
      (item) => `
        <article class="menu-item" aria-label="${item.name}">
          <span class="menu-category-badge">${item.category}</span>
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="menu-info">
            <div class="menu-top">
              <h4>${item.name}</h4>
              <span class="menu-price">${formatCurrency(item.price)}</span>
            </div>
            <p class="menu-description">${item.description}</p>
            <div class="qty-controls">
              <div class="qty-box">
                <button type="button" class="qty-btn" data-action="decrease" data-item-id="${item.id}">-</button>
                <input type="number" class="qty-input" value="1" min="1" data-qty-input="${item.id}" />
                <button type="button" class="qty-btn" data-action="increase" data-item-id="${item.id}">+</button>
              </div>
              <button type="button" class="add-btn" data-add-item="${item.id}">Tambah</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

function findCartItem(menuId) {
  return state.cart.find((item) => item.id === Number(menuId));
}

function addToCart(menuId, qty) {
  const normalizedQty = Number(qty);
  if (!normalizedQty || normalizedQty <= 0) {
    showToast('Jumlah pesanan minimal 1.');
    return;
  }

  const existing = findCartItem(menuId);
  if (existing) {
    existing.quantity += normalizedQty;
  } else {
    state.cart.push({ id: Number(menuId), quantity: normalizedQty });
  }

  renderOrder();
  showToast('Menu ditambahkan ke pesanan.');
}

function updateQuantity(menuId, delta) {
  const input = document.querySelector(`[data-qty-input="${menuId}"]`);
  if (input) {
    const currentValue = Number(input.value) || 1;
    input.value = Math.max(1, currentValue + delta);
  }
}

function renderOrder() {
  if (!state.cart.length) {
    orderItems.innerHTML = '<p class="empty-order">Belum ada item yang dipesan.</p>';
    subtotalValue.textContent = formatCurrency(0);
    taxValue.textContent = formatCurrency(0);
    totalValue.textContent = formatCurrency(0);
    receiptContent.innerHTML = '<p>Style Coffe</p><p>Belum ada pesanan.</p>';
    return;
  }

  const orderRows = state.cart
    .map((orderItem) => {
      const menu = getMenuById(orderItem.id);
      if (!menu) return '';
      const subtotal = menu.price * orderItem.quantity;
      return `
        <div class="order-item">
          <div>
            <span>${menu.name} x ${orderItem.quantity}</span>
            <small>${formatCurrency(menu.price)} / item</small>
          </div>
          <strong>${formatCurrency(subtotal)}</strong>
        </div>
      `;
    })
    .join('');

  const subtotal = state.cart.reduce((sum, orderItem) => {
    const menu = getMenuById(orderItem.id);
    return sum + (menu ? menu.price * orderItem.quantity : 0);
  }, 0);

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  orderItems.innerHTML = orderRows;
  subtotalValue.textContent = formatCurrency(subtotal);
  taxValue.textContent = formatCurrency(tax);
  totalValue.textContent = formatCurrency(total);
  receiptContent.innerHTML = generateReceiptMarkup(subtotal, tax, total);
}

function generateReceiptMarkup(subtotal, tax, total) {
  const meja = tableNumber.value ? `Meja: ${tableNumber.value}` : 'Meja: -';
  const orderLines = state.cart
    .map((orderItem) => {
      const menu = getMenuById(orderItem.id);
      if (!menu) return '';
      return `<p>${menu.name} x ${orderItem.quantity} = ${formatCurrency(menu.price * orderItem.quantity)}</p>`;
    })
    .join('');

  return `
    <p><strong>Style Coffe</strong></p>
    <p>${new Date().toLocaleString('id-ID')}</p>
    <p>${meja}</p>
    <p>------------------------------</p>
    ${orderLines || '<p>Belum ada pesanan.</p>'}
    <p>------------------------------</p>
    <p>Subtotal: ${formatCurrency(subtotal)}</p>
    <p>PPN: ${formatCurrency(tax)}</p>
    <p><strong>Total: ${formatCurrency(total)}</strong></p>
  `;
}

function clearOrder() {
  state.cart = [];
  renderOrder();
  showToast('Pesanan dibersihkan.');
}

function printReceipt() {
  if (!state.cart.length) {
    showToast('Belum ada pesanan untuk dicetak.');
    return;
  }

  // Function Realtime untuk Menampilkan Catatan di Struk
function updateReceiptNote() {
  const noteInput = document.getElementById('orderNote');
  const receiptNoteBox = document.getElementById('receiptNoteBox');
  const receiptNoteText = document.getElementById('receiptNoteText');

  if (!noteInput || !receiptNoteBox || !receiptNoteText) return;

  const noteVal = noteInput.value.trim();

  if (noteVal !== '') {
    receiptNoteText.textContent = noteVal;
    receiptNoteBox.style.display = 'block'; // Tampilkan jika ada teks
  } else {
    receiptNoteBox.style.display = 'none';  // Sembunyikan jika kosong
  }
}

// Pastikan updateReceiptNote() dipanggil di dalam renderCart()
function renderCart() {
  // ... kode render keranjang kamu ...

  // Update tampilan catatan di struk
  updateReceiptNote();
}

// Reset catatan saat transaksi berhasil diproses
function processOrder() {
  // ... (logic validasi meja & keranjang) ...

  const noteInput = document.getElementById('orderNote');
  const noteVal = noteInput ? noteInput.value.trim() : '';

  // Simpan data transaksi ke riwayat
  const transactionData = {
    id: Date.now(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: orderTypeLabel,
    detail: orderDetail,
    note: noteVal,
    items: [...cart],
    total: calculateTotal()
  };

  transactionHistory.push(transactionData);

  // Clear Form
  cart = [];
  if (document.getElementById('tableNumber')) document.getElementById('tableNumber').value = '';
  if (noteInput) noteInput.value = ''; // Kosongkan input catatan
  
  updateReceiptNote(); // Sembunyikan kembali kotak catatan di struk
  renderCart();
  renderHistory();
  showToast(`Pesanan ${orderTypeLabel} berhasil diproses!`);
}

  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  const subtotal = state.cart.reduce((sum, orderItem) => {
    const menu = getMenuById(orderItem.id);
    return sum + (menu ? menu.price * orderItem.quantity : 0);
  }, 0);

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  let paymentAmount = Number(paymentAmountInput.value);
  
  if (paymentMethod === 'qris') {
    paymentAmount = total;
  }

  if (paymentAmount <= 0 || paymentAmount < total) {
    showToast('Jumlah pembayaran kurang atau belum dimasukkan.');
    return;
  }

  const payment = {
    id: Date.now(),
    date: new Date().toLocaleString('id-ID'),
    items: state.cart.map(item => {
      const menu = getMenuById(item.id);
      return { name: menu.name, qty: item.quantity, price: menu.price };
    }),
    subtotal,
    tax,
    total,
    payment: paymentAmount,
    change: paymentAmount - total,
    table: tableNumber.value || '-',
    cashier: state.currentUser.name,
    method: paymentMethod === 'qris' ? 'QRIS' : 'Tunai'
  };

  state.paymentHistory.push(payment);
  localStorage.setItem(STORAGE_KEYS.paymentHistory, JSON.stringify(state.paymentHistory));

  const printWindow = window.open('', '_blank', 'width=400,height=800');
  const receiptText = receiptContent.innerHTML;
  const currentMeja = tableNumber.value ? `Nomor Meja: ${tableNumber.value}` : 'Nomor Meja: -';

  printWindow.document.write(`
    <html>
      <head>
        <title>Struk Style Coffe</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #22140d;
          }
          h2 { margin: 0 0 8px; }
          p { margin: 6px 0; }
          .divider { border-top: 1px dashed #333; margin: 10px 0; }
          strong { font-size: 18px; }
        </style>
      </head>
      <body>
        <h2>Style Coffe</h2>
        <p>${new Date().toLocaleString('id-ID')}</p>
        <p>${currentMeja}</p>
        <div class="divider"></div>
        ${receiptText}
        <p style="margin-top: 20px;">Metode: ${payment.method}</p>
        <p>Pembayaran: ${formatCurrency(paymentAmount)}</p>
        <p>Kembalian: ${formatCurrency(paymentAmount - total)}</p>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    clearOrder();
    paymentAmountInput.value = '';
    document.querySelector('input[name="paymentMethod"][value="tunai"]').checked = true;
    qrisContainer.classList.add('hidden');
    renderMenu();
  }, 300);
}

function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = loginPasswordInput.value;
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  emailError.textContent = '';
  passwordError.textContent = '';

  const foundUser = state.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (!foundUser) {
    emailError.textContent = 'Email tidak ditemukan.';
    return;
  }

  if (foundUser.password !== password) {
    passwordError.textContent = 'Password salah.';
    return;
  }

  setCurrentUser(foundUser);
  showApp();
}

function registerUser(event) {
  event.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!name || !email || !password || !confirmPassword) {
    showToast('Semua data harus diisi.');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Password tidak cocok.');
    return;
  }

  const emailExists = state.users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    showToast('Email sudah terdaftar.');
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    fullName: name,
    photo: null
  };

  state.users.push(newUser);
  saveUsers();

  registerForm.reset();
  toggleAuthMode('login');
  showToast('Akun berhasil dibuat. Silakan login.');
}

function showApp() {
  const user = getCurrentUser();
  if (!user) {
    authScreen.classList.remove('hidden');
    app.classList.add('hidden');
    return;
  }

  state.currentUser = user;
  cashierName.textContent = user.fullName || user.name;
  cashierEmail.textContent = user.email;

  if (user.photo) {
    profilePhotoDisplay.src = user.photo;
  } else {
    profilePhotoDisplay.src = generateDefaultAvatar(user.name);
  }

  authScreen.classList.add('hidden');
  app.classList.remove('hidden');
  renderOrder();
  renderMenu();
}

function generateDefaultAvatar(name) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const colors = ['#d9a66c', '#bf7d45', '#f0c588', '#b16b3b'];
  const color = colors[name.length % colors.length];
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 64, 64);

  ctx.fillStyle = '#2c170e';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, 32, 32);

  return canvas.toDataURL();
}

function logout() {
  setCurrentUser(null);
  loginForm.reset();
  registerForm.reset();
  authScreen.classList.remove('hidden');
  app.classList.add('hidden');
  showToast('Anda berhasil logout.');
}

function openHistoryModal() {
  renderPaymentHistory();
  historyModal.classList.remove('hidden');
}

function closeHistoryModal() {
  historyModal.classList.add('hidden');
}

function renderPaymentHistory() {
  if (!state.paymentHistory || state.paymentHistory.length === 0) {
    historyList.innerHTML = '<p style="text-align: center; color: var(--muted); padding: 20px;">Belum ada riwayat pembayaran.</p>';
    return;
  }

  historyList.innerHTML = state.paymentHistory
    .reverse()
    .map(payment => `
      <div class="history-item">
        <div class="history-item-header">
          <span class="history-item-time">${payment.date}</span>
          <span class="history-item-amount">${formatCurrency(payment.total)}</span>
        </div>
        <p style="margin: 0 0 8px; font-weight: 700;">Meja: ${payment.table}</p>
        <p style="margin: 0 0 8px; color: var(--muted); font-size: 0.85rem;">
          ${payment.items.map(item => `${item.name} x${item.qty}`).join(', ')}
        </p>
        <p style="margin: 0 0 4px; color: var(--success); font-size: 0.85rem;">Metode: ${payment.method}</p>
        <p style="margin: 0; color: var(--success); font-size: 0.85rem;">Pembayaran: ${formatCurrency(payment.payment)}</p>
      </div>
    `)
    .join('');
}

function attachEvents() {
  document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => toggleAuthMode(tab.dataset.authTab));
  });

  togglePasswordBtn.addEventListener('click', () => {
    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPasswordInput.setAttribute('type', type);
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
  });

  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'qris') {
        qrisContainer.classList.remove('hidden');
        const subtotal = state.cart.reduce((sum, orderItem) => {
          const menu = getMenuById(orderItem.id);
          return sum + (menu ? menu.price * orderItem.quantity : 0);
        }, 0);
        const tax = Math.round(subtotal * 0.05);
        paymentAmountInput.value = subtotal + tax;
        paymentAmountInput.disabled = true;
      } else {
        qrisContainer.classList.add('hidden');
        paymentAmountInput.value = '';
        paymentAmountInput.disabled = false;
      }
    });
  });

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      renderMenu();
    });
  });

  loginForm.addEventListener('submit', loginUser);
  registerForm.addEventListener('submit', registerUser);

  document.getElementById('logoutBtn').addEventListener('click', logout);
  document.getElementById('clearOrderBtn').addEventListener('click', clearOrder);
  document.getElementById('printBtn').addEventListener('click', printReceipt);
  document.getElementById('copyReceiptBtn').addEventListener('click', () => {
    const text = receiptContent.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => showToast('Struk berhasil disalin.'))
      .catch(() => showToast('Salin struk gagal.'));
  });

  document.getElementById('historyBtn').addEventListener('click', openHistoryModal);
  document.getElementById('closeHistoryModal').addEventListener('click', closeHistoryModal);

  historyModal.addEventListener('click', (e) => {
    if (e.target === historyModal) closeHistoryModal();
  });

  menuList.addEventListener('click', (event) => {
    const addTarget = event.target.closest('[data-add-item]');
    const qtyButton = event.target.closest('[data-action]');

    if (addTarget) {
      const menuId = addTarget.dataset.addItem;
      const qtyInput = document.querySelector(`[data-qty-input="${menuId}"]`);
      const quantity = Number(qtyInput?.value || 1);
      addToCart(menuId, quantity);
      return;
    }

    if (qtyButton) {
      const menuId = qtyButton.dataset.itemId;
      const action = qtyButton.dataset.action;
      const input = document.querySelector(`[data-qty-input="${menuId}"]`);
      const currentValue = Number(input.value) || 1;
      input.value = action === 'increase' ? currentValue + 1 : Math.max(1, currentValue - 1);
    }
  });

  menuList.addEventListener('input', (event) => {
    const target = event.target.closest('[data-qty-input]');
    if (!target) return;
    const value = Number(target.value);
    target.value = Number.isFinite(value) && value > 0 ? value : 1;
  });

  tableNumber.addEventListener('input', () => {
    receiptContent.innerHTML = generateReceiptMarkup(
      state.cart.reduce((sum, orderItem) => {
        const menu = getMenuById(orderItem.id);
        return sum + (menu ? menu.price * orderItem.quantity : 0);
      }, 0),
      state.cart.reduce((sum, orderItem) => {
        const menu = getMenuById(orderItem.id);
        return sum + (menu ? Math.round(menu.price * orderItem.quantity * 0.05) : 0);
      }, 0),
      state.cart.reduce((sum, orderItem) => {
        const menu = getMenuById(orderItem.id);
        return sum + (menu ? menu.price * orderItem.quantity + Math.round(menu.price * orderItem.quantity * 0.05) : 0);
      }, 0)
    );
    // Function untuk merender / memperbarui tampilan Struk
function updateReceipt(cartItems, grandTotal) {
  const orderType = document.querySelector('input[name="orderType"]:checked').value;
  const tableInput = document.getElementById('tableNumber');
  
  const receiptOrderType = document.getElementById('receiptOrderType');
  const receiptOrderDetail = document.getElementById('receiptOrderDetail');

  if (orderType === 'dine_in') {
    const tableNum = tableInput.value.trim() || '-';
    receiptOrderType.textContent = 'DINE IN';
    receiptOrderDetail.textContent = `No. Meja: ${tableNum}`;
  } else {
    const formattedQueue = '#' + String(queueCounter).padStart(3, '0');
    receiptOrderType.textContent = 'TAKEAWAY';
    receiptOrderDetail.textContent = `No. Antrean: ${formattedQueue}`;
    ;
  }
}
  });

  window.addEventListener('online', updateConnectionStatus);
  window.addEventListener('offline', updateConnectionStatus);
}

function init() {
  loadUsers();
  loadPaymentHistory();
  renderMenu();
  attachEvents();
  updateConnectionStatus();
  setInterval(updateClock, 1000);
  updateClock();

  const savedUser = getCurrentUser();
  if (savedUser) {
    showApp();
  } else {
    authScreen.classList.remove('hidden');
    app.classList.add('hidden');
  }
}

init();