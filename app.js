/* ==========================================================================
   SOULSHI SUSHI LOURDES — Onira.fly engine
   Catálogo via cardapio.json (84 itens reais do Goomer) + checkout WhatsApp
   WhatsApp configurado: +55 54 3019-2888 (telefone publicado — confirmar
   com a casa se é também o WhatsApp oficial de pedidos).
   ========================================================================== */

const CLIENT_CONFIG = {
    name: 'Soulshi Sushi Lourdes',
    whatsappNumber: '555430192888',
    address: 'Av. Júlio de Castilhos, 962 - Lourdes, Caxias do Sul - RS',
};

let MENU_DATA = [];
let CATEGORIES = [];
let currentCategory = 'todos';
let searchTerm = '';
let cart = [];
let fulfillmentType = 'delivery';
let selectedPayment = 'Pix';

const BRL = (v) => `R$ ${v.toFixed(2).replace('.', ',')}`;
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('cardapio.json');
        const data = await res.json();
        MENU_DATA = data.items || [];
        CATEGORIES = data.categories || [];
    } catch (err) {
        console.error('Falha ao carregar cardápio:', err);
        showToast('⚠️ Não foi possível carregar o cardápio. Recarregue a página.', 'error');
        return;
    }
    renderCategoryPills();
    renderMenu();
    setupMenuSearch();
    setupCartDrawerListeners();
    setupOniraCta();
    updateCartUI();
    if (window.lucide) lucide.createIcons();
});

/* Widget Onira: recolhível + transparente ao scroll */
function setupOniraCta() {
    const cta = document.getElementById('onira-cta');
    const close = document.getElementById('onira-cta-close');
    if (!cta) return;
    if (close) {
        close.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            cta.classList.toggle('collapsed');
        });
    }
    let t;
    window.addEventListener('scroll', () => {
        cta.classList.add('scrolling');
        clearTimeout(t);
        t = setTimeout(() => cta.classList.remove('scrolling'), 180);
    }, { passive: true });
}

/* ---------- Catálogo ---------- */

function renderCategoryPills() {
    const box = document.getElementById('category-filters');
    if (!box) return;
    const all = [{ id: 'todos', name: 'Todos' }, ...CATEGORIES];
    box.innerHTML = all.map((c) => `
        <button type="button" class="filter-btn ${c.id === currentCategory ? 'active' : ''}" data-category="${c.id}">
            ${esc(c.name)}
        </button>
    `).join('');
    box.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            box.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category || 'todos';
            renderMenu();
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });
}

function setupMenuSearch() {
    const input = document.getElementById('menu-search');
    if (!input) return;
    input.addEventListener('input', () => {
        searchTerm = input.value || '';
        renderMenu();
    });
}

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    const term = searchTerm.trim().toLowerCase();
    const list = MENU_DATA.filter((item) => {
        if (currentCategory !== 'todos' && item.category !== currentCategory) return false;
        if (!term) return true;
        return `${item.name} ${item.desc}`.toLowerCase().includes(term);
    });

    if (list.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:48px 20px; color:#64748B;">
                <p style="font-weight:800; color:#0F172A; margin-bottom:6px;">Nenhum item para "${esc(searchTerm.trim())}".</p>
                <span style="font-size:0.88rem;">Tente combo, temaki, poke ou hot.</span>
            </div>`;
        return;
    }

    grid.innerHTML = list.map((item) => `
        <div class="menu-card" data-id="${item.id}">
            <div class="card-img-box">
                <img src="${item.img}" alt="${esc(item.name)}" class="card-img" loading="lazy" onerror="this.onerror=null;this.src='assets/placeholder.svg'">
                ${item.badge ? `<span class="card-badge">${esc(item.badge)}</span>` : ''}
                <div class="card-rating"><i data-lucide="star" style="width:14px; height:14px; fill:#FFC107; color:#FFC107;"></i> ${item.rating}</div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${esc(item.name)}</h3>
                <p class="card-desc">${esc(item.desc)}</p>
                <div class="card-bottom">
                    <div class="card-price">
                        <span class="price-label">Valor:</span>
                        <div class="price-value">${BRL(item.price)}</div>
                    </div>
                    <button type="button" class="btn-add-item" onclick="addToCart('${item.id}')" aria-label="Adicionar ${esc(item.name)}">
                        <i data-lucide="plus" style="width:16px; height:16px;"></i> Adicionar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

/* ---------- Carrinho ---------- */

function addToCart(itemId) {
    const item = MENU_DATA.find((i) => i.id === itemId);
    if (!item) return;
    const existing = cart.find((c) => c.id === itemId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: item.id, title: item.name, price: item.price, quantity: 1, notes: '' });
    }
    updateCartUI();
    openCart();
    showToast(`🍣 <strong>${esc(item.name)}</strong> no pedido!`);
}
window.addToCart = addToCart;

function updateItemNotes(index, val) {
    if (cart[index]) cart[index].notes = val;
}
window.updateItemNotes = updateItemNotes;

function changeQuantity(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartUI();
}
window.changeQuantity = changeQuantity;

// Limpar com confirmação em 2 toques (sem alert nativo)
let clearArmed = false;
let clearTimer = null;
window.clearCart = function () {
    if (cart.length === 0) return;
    const btn = document.getElementById('cart-clear-header');
    if (!clearArmed) {
        clearArmed = true;
        showToast('🗑️ Toque novamente na lixeira para confirmar a limpeza.');
        if (btn) btn.style.borderColor = '#EF4444';
        clearTimer = setTimeout(() => {
            clearArmed = false;
            if (btn) btn.style.borderColor = '';
        }, 3000);
        return;
    }
    clearTimeout(clearTimer);
    clearArmed = false;
    if (btn) btn.style.borderColor = '';
    cart = [];
    updateCartUI();
    closeCart();
    showToast('🗑️ Pedido limpo.');
};

function setupCartDrawerListeners() {
    document.querySelectorAll('.del-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.del-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            fulfillmentType = btn.dataset.type || 'delivery';
            const box = document.getElementById('address-box');
            if (box) box.style.display = fulfillmentType === 'delivery' ? 'block' : 'none';
            updateCartUI();
        });
    });
    document.querySelectorAll('.pay-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pay-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPayment = btn.dataset.pay || 'Pix';
            const cash = document.getElementById('cash-change-box');
            if (cash) cash.style.display = selectedPayment.toLowerCase().includes('dinheiro') ? 'block' : 'none';
            updateCartUI();
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCart();
    });
}

function updateCartUI() {
    const qty = cart.reduce((s, i) => s + i.quantity, 0);
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    document.querySelectorAll('#cart-count, .cart-count').forEach((el) => { el.innerText = qty; });
    document.querySelectorAll('#cart-total-header, .cart-total-header').forEach((el) => { el.innerText = BRL(subtotal); });

    const sub = document.getElementById('cart-subtotal');
    const grand = document.getElementById('cart-grand-total');
    if (sub) sub.innerText = BRL(subtotal);
    if (grand) grand.innerText = BRL(subtotal);

    const clearBtn = document.getElementById('cart-clear-header');
    if (clearBtn) clearBtn.style.display = cart.length > 0 ? 'inline-flex' : 'none';

    const box = document.getElementById('cart-items-container');
    if (!box) return;
    if (cart.length === 0) {
        box.innerHTML = `
            <div style="text-align:center; padding:40px 20px; color:#A1A1AA;">
                <i data-lucide="shopping-bag" style="width:48px; height:48px; margin-bottom:12px; opacity:0.5; color:var(--accent);"></i>
                <p style="font-weight:700; color:#FFF; margin-bottom:4px;">Seu pedido está vazio.</p>
                <span style="font-size:0.85rem;">Escolha combos e temakis no cardápio!</span>
            </div>`;
        if (window.lucide) lucide.createIcons();
        return;
    }
    box.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${esc(item.title)}</h4>
                <p>${BRL(item.price)} un.</p>
                <input type="text" class="cart-item-note-input" placeholder="Obs: ex. sem cream cheese..." value="${esc(item.notes)}" onchange="updateItemNotes(${idx}, this.value)">
                <span class="cart-item-price">Total: ${BRL(item.price * item.quantity)}</span>
            </div>
            <div class="cart-controls">
                <button type="button" class="cart-qty-btn" onclick="changeQuantity(${idx}, -1)" aria-label="Diminuir">-</button>
                <span class="cart-qty-num">${item.quantity} un</span>
                <button type="button" class="cart-qty-btn" onclick="changeQuantity(${idx}, 1)" aria-label="Aumentar">+</button>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function openCart() {
    const d = document.getElementById('cart-drawer');
    const o = document.getElementById('cart-overlay');
    if (d) d.classList.add('active', 'open');
    if (o) o.classList.add('active', 'open');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    const d = document.getElementById('cart-drawer');
    const o = document.getElementById('cart-overlay');
    if (d) d.classList.remove('active', 'open');
    if (o) o.classList.remove('active', 'open');
    document.body.style.overflow = 'auto';
}
window.openCart = openCart;
window.closeCart = closeCart;

function showToast(message, type = 'success') {
    let toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.className = `toast-box ${type === 'error' ? 'toast-error' : ''}`;
    toast.innerHTML = message;
    toast.classList.add('show');
    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
}
window.showToast = showToast;

function sendWhatsAppOrder() {
    if (cart.length === 0) {
        showToast('🍣 <strong>Pedido vazio!</strong> Adicione um item antes de enviar.', 'error');
        return;
    }
    const name = document.getElementById('cust-name') ? document.getElementById('cust-name').value.trim() : '';
    const addrInput = document.getElementById('cust-address');
    const addr = addrInput && addrInput.value.trim() ? addrInput.value.trim() : 'A combinar no WhatsApp';
    const change = document.getElementById('cash-change-val') ? document.getElementById('cash-change-val').value.trim() : '';
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    let msg = `_pedido via site by Onira.fly_\n\n${fulfillmentType === 'delivery' ? 'Solicitação de Tele-Entrega' : 'Solicitação de Retirada no balcão'}\n\n`;
    cart.forEach((i) => {
        msg += `*${i.quantity}x* ${i.title}\n`;
        if (i.notes) msg += `_Obs: ${i.notes}_\n`;
        msg += `*${BRL(i.price * i.quantity)}*\n\n`;
    });
    msg += `*Itens: ${BRL(subtotal)}*\nEntrega a combinar\n*Total: ${BRL(subtotal)}*\n\n`;
    if (name) msg += `*${name}*\n`;
    if (fulfillmentType === 'delivery') msg += `Endereço: ${addr}\n`;

    const pay = selectedPayment.toLowerCase();
    if (pay.includes('pix')) msg += `Pagamento em Pix — combinamos a chave por aqui\n`;
    else if (pay.includes('dinheiro')) msg += `Pagamento em dinheiro — ${change ? `troco para R$ ${change}` : 'sem troco'}\n`;
    else msg += `Pagamento no cartão — favor levar a maquininha\n`;
    msg += `\n_Enviado pelo site da Soulshi Sushi Lourdes_`;

    window.open(`https://wa.me/${CLIENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}
window.sendWhatsAppOrder = sendWhatsAppOrder;
