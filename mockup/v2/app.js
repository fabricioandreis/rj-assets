/* ═══════════════════════════════════════════════════
   Recreio da Juventude — App Associado — PoC v2
   Single-file SPA, sem back-end, dados simulados.
   ═══════════════════════════════════════════════════ */

const $ = (sel) => document.querySelector(sel);
const ROOT = document.querySelector("#app");

// ── SVG icon library ─────────────────────────────────

const ICONS = {
  home: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>`,
  whatsapp: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
  bell: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  user: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  grid: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  card: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  ticket: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2H5z"/></svg>`,
  dumbbell: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11"/><path d="M6.5 17.5h11"/><path d="M3 9.5h3V6L3 9.5z"/><path d="M21 9.5h-3V6l3 3.5z"/><path d="M3 14.5h3v3.5L3 14.5z"/><path d="M21 14.5h-3v3.5l3-3.5z"/></svg>`,
  map: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  handshake: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  dollar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  qr: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="5" y1="5" x2="5" y2="7"/><line x1="16" y1="5" x2="16" y2="7"/><line x1="16" y1="16" x2="16" y2="18"/><line x1="5" y1="16" x2="5" y2="18"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  headset: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  chevron: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  search: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  back: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  pdf: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  wifi: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 16 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
};

// ── Modules catalog ────────────────────────────────────

const MODULES = [
  { id: "reservas", title: "Central de Reservas", sub: "Quiosques, quadras, piscina e espaços", icon: ICONS.calendar },
  { id: "financeiro", title: "Pagamentos", sub: "Boletos, cartão e histórico", icon: ICONS.dollar },
  { id: "eventos", title: "Eventos e Ingressos", sub: "Agenda, compra e QR de entrada", icon: ICONS.ticket },
  { id: "carteirinha", title: "Carteirinha e Acessos", sub: "QR code, barcodes e códigos temporários", icon: ICONS.qr },
  { id: "servicos", title: "Serviços e Atividades", sub: "Contratação, lista de espera e rematrícula", icon: ICONS.heart },
  { id: "academia", title: "Academia", sub: "Meus treinos e avaliação física", icon: ICONS.dumbbell },
  { id: "convenios", title: "Convênio Interclubes", sub: "Cartas disponíveis e minhas cartas", icon: ICONS.handshake },
  { id: "mapa", title: "Mapa do Clube", sub: "Pontos de interesse e sedes", icon: ICONS.map },
  { id: "conta", title: "Minha Conta", sub: "Dados, dependentes e preferências", icon: ICONS.user },
  { id: "notificacoes", title: "Notificações", sub: "Avisos e mensagens do clube", icon: ICONS.bell },
  { id: "atendimento", title: "Atendimento e FAQ", sub: "SAC, WhatsApp e dúvidas frequentes", icon: ICONS.headset },
  { id: "visitantes", title: "Visitantes", sub: "Convidados e eventos esportivos", icon: ICONS.users },
];

function modById(id) { return MODULES.find((m) => m.id === id); }

// ── Application state ─────────────────────────────────

let state = {
  screen: "welcome",
  loggedIn: false,
  search: "",

  // Reservation flow
  resTab: "nova",
  resStep: 0,
  resDraft: {
    user: "Fabricio Andreis",
    type: null,
    unit: "Sede Juventude",
    date: null,
    time: null,
    guests: 0,
  },
  reservations: [
    { id: "RSV-2048", title: "Quiosque 12", date: "Hoje, 18:30", status: "Confirmada", unit: "Sede Juventude", guests: 4 },
    { id: "RSV-1982", title: "Piscina Olímpica", date: "Sáb, 22/06, 10:00", status: "Pendente", unit: "Sede Guarany", guests: 0 },
  ],

  // Finance
  invoices: [
    { id: "INV-0626", title: "Mensalidade junho", due: "25/06/2026", amount: "R$ 486,90", status: "Aberta" },
    { id: "INV-0526", title: "Mensalidade maio", due: "25/05/2026", amount: "R$ 486,90", status: "Concluída" },
    { id: "INV-0426", title: "Mensalidade abril", due: "25/04/2026", amount: "R$ 486,90", status: "Concluída" },
  ],

  // Events & tickets
  tickets: [
    { id: "TCK-91", title: "Noite Italiana", holder: "Fabricio Andreis", date: "28/06, 20:00", event: "EVT-01" },
  ],
  events: [
    { id: "EVT-01", title: "Noite Italiana", category: "Música", date: "28/06/2026", time: "20:00", local: "Salão Principal", ticket: true, available: 12 },
    { id: "EVT-02", title: "Festival de Natação", category: "Esporte", date: "05/07/2026", time: "09:00", local: "Piscinas Olímpicas", ticket: false, available: 0 },
    { id: "EVT-03", title: "Torneio de Beach Tennis", category: "Esporte", date: "12/07/2026", time: "08:00", local: "Quadras Beach", ticket: true, available: 4 },
  ],

  // Convenios
  letters: [
    { id: "CV-221", club: "Clube Caixeiros Viajantes", status: "Válida", expires: "30/06/2026" },
  ],

  // Notifications
  notifications: [
    { id: "N1", title: "Reserva confirmada", body: "Quiosque 12 confirmado para hoje às 18:30.", date: "Agora", read: false },
    { id: "N2", title: "Boleto disponível", body: "Sua mensalidade de junho está disponível para pagamento.", date: "Ontem", read: false },
    { id: "N3", title: "Evento recomendado", body: "Noite Italiana tem ingressos disponíveis.", date: "16/06", read: false },
    { id: "N4", title: "Avaliação física", body: "Há horários disponíveis com a Prof. Ana esta semana.", date: "14/06", read: true },
  ],

  // Shortcuts
  shortcuts: ["reservas", "financeiro", "eventos", "carteirinha", "servicos", "academia"],

  // Events tab
  evTab: "agenda",

  // Sheet
  sheet: null,

  // Toast
  toastMsg: "",
  toastTimer: null,
};

function patch(changes) {
  Object.assign(state, changes);
  render();
}

function go(screen) {
  state.screen = screen;
  state.sheet = null;
  state.toastMsg = "";
  render();
}

function showToast(msg) {
  if (state.toastTimer) clearTimeout(state.toastTimer);
  state.toastMsg = msg;
  render();
  state.toastTimer = setTimeout(() => {
    state.toastMsg = "";
    render();
  }, 2800);
}

function openSheet(id) { patch({ sheet: id }); }
function closeSheet() { patch({ sheet: null }); }

function unreadCount() { return state.notifications.filter((n) => !n.read).length; }

// ── Root render ─────────────────────────────────────

function render() {
  ROOT.innerHTML = state.loggedIn ? renderApp() : renderWelcome();
  applyStatusBarTheme();
  bindAll();
}

function applyStatusBarTheme() {
  const bar = document.querySelector(".status-bar");
  if (!bar) return;
  const lightScreens = ["welcome", "home", "reservas", "financeiro", "eventos", "carteirinha", "servicos", "academia", "convenios", "mapa", "conta", "notificacoes", "atendimento", "visitantes"];
  const homeScreens = ["home"];
  if (!state.loggedIn || homeScreens.includes(state.screen)) {
    bar.className = "status-bar light";
  } else {
    bar.className = "status-bar light";
  }
}

// ── Welcome / Login ──────────────────────────────────

function renderWelcome() {
  return `
    <div class="welcome">
      <div class="welcome-top">
        <img class="welcome-logo" src="./assets/logo-w.svg" alt="Recreio da Juventude" />
      </div>
      <div style="padding: 0 24px 8px">
        <h1 class="welcome-tagline">Seu clube no bolso.</h1>
        <p class="welcome-sub">Reservas, pagamentos, eventos, carteirinha e muito mais — experiência nova para o associado.</p>
      </div>
      <form class="login-sheet" data-form="login">
        <h2>Entrar na conta</h2>
        <div class="field">
          <label>CPF, matrícula ou e-mail</label>
          <input id="f-login" value="fabricio.andreis" autocomplete="username" placeholder="Digite seu CPF ou e-mail" />
        </div>
        <div class="field">
          <label>Senha</label>
          <input id="f-password" type="password" value="Senha@2026" autocomplete="current-password" />
        </div>
        <button class="btn-primary btn-full" type="submit">Entrar</button>
        <div style="display:flex;justify-content:center">
          <button class="btn-link" type="button" data-sheet="forgot">Esqueci minha senha</button>
        </div>
      </form>
      ${renderSheet()}
    </div>
  `;
}

// ── App shell ────────────────────────────────────────

function renderApp() {
  return `
    <div class="screen screen-enter">
      ${renderScreen()}
      ${renderBottomNav()}
      ${state.toastMsg ? `<div class="toast">${state.toastMsg}</div>` : ""}
      ${renderSheet()}
    </div>
  `;
}

function renderScreen() {
  const screenMap = {
    home: renderHome,
    menu: renderMenu,
    reservas: renderReservas,
    financeiro: renderFinanceiro,
    eventos: renderEventos,
    carteirinha: renderCarteirinha,
    servicos: renderServicos,
    academia: renderAcademia,
    convenios: renderConvenios,
    mapa: renderMapa,
    conta: renderConta,
    notificacoes: renderNotificacoes,
    atendimento: renderAtendimento,
    visitantes: renderVisitantes,
  };
  const fn = screenMap[state.screen];
  return fn ? fn() : renderGeneric(state.screen);
}

// ── Bottom nav ───────────────────────────────────────

function renderBottomNav() {
  const items = [
    ["home", ICONS.home, "Home"],
    ["atendimento", ICONS.whatsapp, "Suporte"],
    ["notificacoes", ICONS.bell, "Avisos"],
    ["conta", ICONS.user, "Conta"],
    ["menu", ICONS.grid, "Menu"],
  ];
  const unread = unreadCount();
  return `
    <nav class="bottom-nav" aria-label="Navegação principal">
      ${items.map(([id, icon, label]) => `
        <button class="nav-btn ${state.screen === id ? "active" : ""}" data-go="${id}" aria-label="${label}">
          ${icon}
          <span>${label}${id === "notificacoes" && unread ? `<span class="badge">${unread}</span>` : ""}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

// ── Header helper ────────────────────────────────────

function renderHeader(title, back = "home") {
  return `
    <header class="header">
      <button class="back-btn" data-go="${back}" aria-label="Voltar">${ICONS.back}</button>
      <h2>${title}</h2>
    </header>
  `;
}

// ── Home ─────────────────────────────────────────────

function renderHome() {
  const scs = state.shortcuts.map(modById).filter(Boolean);
  const unread = unreadCount();
  return `
    <div class="scroll">
      <div class="hero">
        <div class="hero-top">
          <img class="logo-white" src="./assets/logo-w.svg" alt="RJ" />
          <button class="profile-chip" data-go="conta">
            <div class="avatar">FA</div>
            <span>Ativo</span>
          </button>
        </div>
        <h2>Boa tarde,<br>Fabricio.</h2>
        <p>${unread > 0 ? `${unread} aviso${unread > 1 ? "s" : ""} não lido${unread > 1 ? "s" : ""}` : "Tudo em dia"} · Reserva hoje às 18:30</p>
      </div>

      <div class="task-grid">
        <button class="task-card task-card--green" data-go="reservas">
          <span class="task-card-label">Central de reservas</span>
          <span class="task-card-title">Reservar agora</span>
        </button>
        <button class="task-card task-card--amber" data-go="financeiro">
          <span class="task-card-label">Vence em 7 dias</span>
          <span class="task-card-title">R$ 486,90 aberto</span>
        </button>
        <button class="task-card task-card--teal" data-go="eventos">
          <span class="task-card-label">28/06 · 20:00</span>
          <span class="task-card-title">Noite Italiana</span>
        </button>
        <button class="task-card task-card--slate" data-go="carteirinha">
          <span class="task-card-label">Modo rápido</span>
          <span class="task-card-title">Minha carteirinha</span>
        </button>
      </div>

      <div class="sec-head">
        <h3>Atalhos rápidos</h3>
        <button class="btn-link" data-sheet="shortcuts">Editar</button>
      </div>
      <div class="shortcut-grid">
        ${scs.map((m) => `
          <button class="shortcut-btn" data-go="${m.id}">
            <div class="shortcut-icon">${m.icon}</div>
            <span>${m.title.replace("Central de ", "").replace(" e Acessos", "").replace(" e Atividades", "").replace(" e Ingressos", "")}</span>
          </button>
        `).join("")}
      </div>

      <div class="sec-head"><h3>Hoje no clube</h3></div>
      <div class="card feed-card">
        <img class="feed-thumb" src="./assets/home2.jpeg" alt="Quiosque" />
        <div>
          <div style="margin-bottom:6px"><span class="pill pill--green">Confirmada</span></div>
          <h4>Quiosque 12 às 18:30</h4>
          <p>Leve seu QR e revise os convidados.</p>
        </div>
      </div>
      <div class="card feed-card">
        <img class="feed-thumb" src="./assets/home1.jpeg" alt="Avaliação" />
        <div>
          <div style="margin-bottom:6px"><span class="pill pill--amber">Ação pendente</span></div>
          <h4>Avaliação física disponível</h4>
          <p>Horários com Prof. Ana esta semana.</p>
        </div>
      </div>
    </div>
  `;
}

// ── Menu ─────────────────────────────────────────────

function renderMenu() {
  const term = state.search.toLowerCase();
  const filtered = MODULES.filter((m) => `${m.title} ${m.sub}`.toLowerCase().includes(term));
  return `
    ${renderHeader("Menu completo")}
    <div class="scroll">
      <div class="search-wrap">
        ${ICONS.search}
        <input class="module-search" id="menu-search" data-action="search" placeholder="Buscar reservas, boletos, eventos..." value="${state.search}" />
      </div>
      <div>
        ${filtered.map((m) => `
          <button class="module-item" data-go="${m.id}">
            <div class="module-icon">${m.icon}</div>
            <span>
              <strong>${m.title}</strong>
              <small>${m.sub}</small>
            </span>
            <span class="module-item-arrow">${ICONS.chevron}</span>
          </button>
        `).join("")}
        ${filtered.length === 0 ? `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Nenhum resultado</h3><p>Tente "reserva", "boleto" ou "evento".</p></div>` : ""}
      </div>
    </div>
  `;
}

// ── Reservas ─────────────────────────────────────────

const RES_RESOURCES = ["Quadra de Tênis", "Quiosque", "Coworking", "Piscina", "Recovery", "Campo de Futebol", "Recanto"];
const RES_DATES = ["Sáb, 22/06", "Dom, 23/06", "Seg, 24/06", "Ter, 25/06", "Qua, 26/06"];
const RES_TIMES = ["07:00", "08:00", "09:00", "10:00", "14:00", "16:00", "18:30"];
const RES_USERS = [
  { name: "Fabricio Andreis", role: "Titular" },
  { name: "Maria Andreis", role: "Dependente" },
  { name: "João Andreis", role: "Dependente" },
];

function renderReservas() {
  const steps = [
    renderResStep0, renderResStep1, renderResStep2, renderResStep3, renderResStep4,
  ];
  return `
    ${renderHeader("Reservas")}
    <div class="scroll">
      <div class="segmented">
        <button class="${state.resTab === "nova" ? "active" : ""}" data-restab="nova">Nova reserva</button>
        <button class="${state.resTab === "minhas" ? "active" : ""}" data-restab="minhas">Minhas (${state.reservations.length})</button>
      </div>
      ${state.resTab === "nova" ? `
        <div class="stepper">
          ${[0,1,2,3,4].map((i) => `<div class="step-track ${i < state.resStep ? "done" : i === state.resStep ? "active" : ""}"></div>`).join("")}
        </div>
        ${steps[state.resStep]()}
      ` : renderMinhasReservas()}
    </div>
  `;
}

function renderResStep0() {
  return `
    <div class="card">
      <span class="pill pill--gray" style="margin-bottom:10px">Passo 1 de 5 — Usuário</span>
      <h3>Quem vai usar?</h3>
      <p style="margin-bottom:14px">Permissões, adimplência e limites são verificados por associado/dependente.</p>
      <div class="choice-list">
        ${RES_USERS.map((u) => `
          <button class="choice-item ${state.resDraft.user === u.name ? "selected" : ""}" data-res-user="${u.name}">
            <span>
              <strong style="display:block;font-size:.9rem">${u.name}</strong>
              <small style="color:var(--muted)">${u.role}</small>
            </span>
            <div class="choice-item-check">${state.resDraft.user === u.name ? ICONS.check : ""}</div>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="action-bar">
      <button class="btn-primary btn-full" data-res-next>Continuar</button>
    </div>
  `;
}

function renderResStep1() {
  return `
    <div class="card">
      <span class="pill pill--gray" style="margin-bottom:10px">Passo 2 de 5 — Espaço</span>
      <h3>Escolha o espaço</h3>
      <div class="field" style="margin:12px 0">
        <label>Sede</label>
        <select id="res-unit">
          <option ${state.resDraft.unit === "Sede Juventude" ? "selected" : ""}>Sede Juventude</option>
          <option ${state.resDraft.unit === "Sede Guarany" ? "selected" : ""}>Sede Guarany</option>
        </select>
      </div>
      <div class="choice-list">
        ${RES_RESOURCES.map((r) => `
          <button class="choice-item ${state.resDraft.type === r ? "selected" : ""}" data-res-type="${r}">
            <span>
              <strong style="display:block;font-size:.9rem">${r}</strong>
              <small style="color:var(--muted)">Central de Reservas</small>
            </span>
            <div class="choice-item-check">${state.resDraft.type === r ? ICONS.check : ""}</div>
          </button>
        `).join("")}
      </div>
    </div>
    <div class="action-bar">
      <button class="btn-primary btn-full" data-res-next>Continuar</button>
      <button class="btn-ghost btn-full" data-res-prev>Voltar</button>
    </div>
  `;
}

function renderResStep2() {
  return `
    <div class="card">
      <span class="pill pill--gray" style="margin-bottom:10px">Passo 3 de 5 — Data</span>
      <h3>Selecione a data</h3>
      <p style="margin-bottom:8px">Datas indisponíveis explicam o motivo (lotação, manutenção, restrição de antecedência).</p>
      <div class="cal-strip">
        ${RES_DATES.map((d, i) => {
          const [wd, dm] = d.split(", ");
          return `
            <button class="cal-day ${state.resDraft.date === d ? "selected" : ""} ${i === 1 ? "disabled" : ""}" data-res-date="${d}" ${i === 1 ? "disabled" : ""}>
              <small>${wd}</small>
              <strong>${dm.split("/")[0]}</strong>
            </button>
          `;
        }).join("")}
      </div>
      ${state.resDraft.date === "Dom, 23/06" ? "" : ""}
      <div class="card card-compact" style="margin-top:10px;background:#fffbeb;border:1px solid rgba(245,158,11,.24)">
        <span class="pill pill--amber" style="margin-bottom:6px">Dom, 23/06 indisponível</span>
        <p style="font-size:.82rem">Quiosques no domingo estão lotados. Tente outro dia ou a lista de espera.</p>
      </div>
    </div>
    <div class="action-bar">
      <button class="btn-primary btn-full" data-res-next>Continuar</button>
      <button class="btn-ghost btn-full" data-res-prev>Voltar</button>
    </div>
  `;
}

function renderResStep3() {
  return `
    <div class="card">
      <span class="pill pill--gray" style="margin-bottom:10px">Passo 4 de 5 — Horário</span>
      <h3>Horário e convidados</h3>
      <div class="choice-list" style="margin:12px 0">
        ${RES_TIMES.map((t) => `
          <button class="choice-item ${state.resDraft.time === t ? "selected" : ""}" data-res-time="${t}">
            <span>
              <strong style="display:block;font-size:.9rem">${t}</strong>
              <small style="color:var(--muted)">${t === "18:30" ? "Últimas vagas" : "Disponível"}</small>
            </span>
            <div class="choice-item-check">${state.resDraft.time === t ? ICONS.check : ""}</div>
          </button>
        `).join("")}
      </div>
      <button class="btn-secondary btn-full" data-sheet="guests">
        ${ICONS.users}
        Adicionar convidados (${state.resDraft.guests})
      </button>
    </div>
    <div class="action-bar">
      <button class="btn-primary btn-full" data-res-next>Revisar reserva</button>
      <button class="btn-ghost btn-full" data-res-prev>Voltar</button>
    </div>
  `;
}

function renderResStep4() {
  const d = state.resDraft;
  return `
    <div class="receipt-card">
      <div class="row" style="margin-bottom:12px">
        <span class="pill pill--gray">Revisão</span>
        <span class="pill pill--green">Pronto para confirmar</span>
      </div>
      <h3 style="margin-bottom:14px">Confirmar reserva</h3>
      ${recRow("Usuário", d.user)}
      ${recRow("Espaço", d.type || "—")}
      ${recRow("Sede", d.unit)}
      ${recRow("Data", d.date || "—")}
      ${recRow("Horário", d.time || "—")}
      ${recRow("Convidados", `${d.guests} convidado(s)`)}
    </div>
    <button class="btn-secondary btn-full" data-sheet="terms" style="margin-bottom:10px">Ver termo de responsabilidade</button>
    <div class="action-bar">
      <button class="btn-primary btn-full" data-action="confirm-reservation">Confirmar reserva</button>
      <button class="btn-ghost btn-full" data-res-prev>Voltar</button>
    </div>
  `;
}

function renderMinhasReservas() {
  if (!state.reservations.length) {
    return `<div class="empty-state"><div class="empty-icon">📅</div><h3>Nenhuma reserva</h3><p>Faça sua primeira reserva usando "Nova reserva".</p></div>`;
  }
  return `
    <div class="stack">
      ${state.reservations.map((r) => `
        <div class="card">
          <div class="row" style="margin-bottom:8px">
            <span class="pill ${r.status === "Confirmada" ? "pill--green" : "pill--amber"}">${r.status}</span>
            <small style="color:var(--muted)">${r.id}</small>
          </div>
          <h3 style="margin-bottom:4px">${r.title}</h3>
          <p>${r.date} · ${r.unit}</p>
          ${r.guests ? `<p>${r.guests} convidado(s)</p>` : ""}
          <div class="row" style="margin-top:12px">
            <button class="btn-secondary btn-sm" data-sheet="res-detail" data-resid="${r.id}">Ver detalhes</button>
            <button class="btn-danger btn-sm" data-action="cancel-res" data-resid="${r.id}">Cancelar</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function recRow(label, value) {
  return `<div class="receipt-row"><span>${label}</span><strong>${value}</strong></div>`;
}

// ── Financeiro ───────────────────────────────────────

function renderFinanceiro() {
  const open = state.invoices.find((i) => i.status === "Aberta");
  return `
    ${renderHeader("Pagamentos")}
    <div class="scroll">
      ${open ? `
        <div class="card" style="border:1px solid rgba(245,158,11,.28);background:var(--warnbg)">
          <div class="row" style="margin-bottom:8px">
            <span class="pill pill--amber">Em aberto</span>
            <small style="color:var(--muted)">Vence ${open.due}</small>
          </div>
          <h3 style="font-size:1.6rem;letter-spacing:-.03em;margin-bottom:6px">${open.amount}</h3>
          <p style="margin-bottom:14px">${open.title}</p>
          <div class="row">
            <button class="btn-primary" data-sheet="invoice" style="flex:1">Pagar agora</button>
            <button class="btn-secondary" data-action="copy-barcode">Copiar código</button>
          </div>
        </div>
      ` : `
        <div class="card" style="border:1px solid rgba(0,151,61,.2);background:var(--g50)">
          <span class="pill pill--green" style="margin-bottom:8px">Em dia</span>
          <h3>Nenhuma cobrança aberta</h3>
          <p>Pagamentos recentes estão no histórico abaixo.</p>
        </div>
      `}

      <div class="sec-head"><h3>Histórico</h3><span>Junho 2026</span></div>
      ${state.invoices.map((inv) => `
        <div class="card card-compact" style="margin-bottom:10px">
          <div class="row">
            <strong style="font-size:.92rem">${inv.title}</strong>
            <span class="pill ${inv.status === "Aberta" ? "pill--amber" : "pill--green"}">${inv.status}</span>
          </div>
          <p style="margin-top:4px">${inv.amount} · vence ${inv.due}</p>
        </div>
      `).join("")}

      <div class="card" style="margin-top:6px">
        <h3 style="margin-bottom:8px">Pagamento com cartão</h3>
        <p>No app real: taxa de cartão, nome do titular, tokenização via gateway certificado e comprovante idempotente.</p>
      </div>
    </div>
  `;
}

// ── Eventos ──────────────────────────────────────────

function renderEventos() {
  return `
    ${renderHeader("Eventos")}
    <div class="scroll">
      <div class="segmented">
        <button class="${state.evTab !== "tickets" ? "active" : ""}" data-action="ev-agenda">Agenda</button>
        <button class="${state.evTab === "tickets" ? "active" : ""}" data-action="ev-tickets">Meus ingressos (${state.tickets.length})</button>
      </div>

      ${state.evTab === "tickets" ? renderMeusIngressos() : renderAgenda()}
    </div>
  `;
}

function renderAgenda() {
  return state.events.map((ev) => `
    <div class="card" style="margin-bottom:12px">
      <div class="row" style="margin-bottom:8px">
        <span class="pill pill--blue">${ev.category}</span>
        <small style="color:var(--muted)">${ev.date}</small>
      </div>
      <h3 style="margin-bottom:4px">${ev.title}</h3>
      <p>${ev.time} · ${ev.local}</p>
      ${ev.ticket ? `
        <div class="row" style="margin-top:12px">
          <span style="font-size:.82rem;color:var(--muted)">${ev.available} ingresso(s) disponível(is)</span>
          <button class="btn-primary btn-sm" data-sheet="buy-ticket" data-evid="${ev.id}">Comprar ingresso</button>
        </div>
      ` : `
        <button class="btn-secondary btn-full btn-sm" style="margin-top:12px" data-go="visitantes">Gerar acesso visitante</button>
      `}
    </div>
  `).join("");
}

function renderMeusIngressos() {
  if (!state.tickets.length) {
    return `<div class="empty-state"><div class="empty-icon">🎟</div><h3>Nenhum ingresso</h3><p>Seus ingressos comprados aparecerão aqui.</p></div>`;
  }
  return state.tickets.map((t) => `
    <div class="qr-card" style="margin-bottom:12px">
      <div class="row" style="margin-bottom:8px">
        <span class="pill pill--dark">${t.date}</span>
      </div>
      <h3>${t.title}</h3>
      <p style="color:rgba(255,255,255,.68);margin-bottom:0">Titular: ${t.holder} · ${t.id}</p>
      <div class="qr-box" style="width:160px;height:160px;margin:16px auto">
        <div class="qr-pattern"></div>
        <div class="qr-corner tl"></div>
        <div class="qr-corner tr"></div>
        <div class="qr-corner bl"></div>
        <div class="qr-center">RJ</div>
      </div>
      <p style="color:rgba(255,255,255,.6);text-align:center;font-size:.76rem">Apresente na entrada · atualizado às 9:41</p>
    </div>
  `).join("");
}

// ── Carteirinha ─────────────────────────────────────

function renderCarteirinha() {
  return `
    ${renderHeader("Carteirinha e Acessos")}
    <div class="scroll">
      <div class="qr-card">
        <div class="row" style="margin-bottom:8px">
          <span class="pill pill--dark">Associado ativo</span>
          <small style="color:rgba(255,255,255,.6)">Atualizado 9:41</small>
        </div>
        <h3 style="margin-bottom:2px">Fabricio Andreis</h3>
        <p style="color:rgba(255,255,255,.64)">Matrícula 10428 · Titular</p>
        <div class="qr-box">
          <div class="qr-pattern"></div>
          <div class="qr-corner tl"></div>
          <div class="qr-corner tr"></div>
          <div class="qr-corner bl"></div>
          <div class="qr-center">RJ</div>
        </div>
        <p style="color:rgba(255,255,255,.56);text-align:center;font-size:.76rem">Use na catraca · 200px de QR para leitura fácil</p>
        <button class="btn-secondary btn-full btn-sm" data-action="offline-wallet" style="margin-top:10px;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.22)">
          Salvar modo offline
        </button>
      </div>

      <div class="card">
        <h3 style="margin-bottom:6px">Código de acesso temporário</h3>
        <p>Use para catraca, convidado autorizado ou contingência. Válido por 15 minutos.</p>
        <button class="btn-primary btn-full" data-action="access-code" style="margin-top:12px">Gerar código</button>
      </div>

      <div class="sec-head"><h3>Dependentes</h3></div>
      ${["Maria Andreis", "João Andreis"].map((name) => `
        <div class="card card-compact row" style="margin-bottom:8px">
          <div>
            <strong>${name}</strong>
            <p style="margin:0">Carteirinha digital disponível</p>
          </div>
          <span class="pill pill--green">Ativo</span>
        </div>
      `).join("")}
    </div>
  `;
}

// ── Serviços ─────────────────────────────────────────

function renderServicos() {
  return `
    ${renderHeader("Serviços e Atividades")}
    <div class="scroll">
      <div class="sec-head"><h3>Disponíveis</h3></div>
      <div class="card">
        <span class="pill pill--blue" style="margin-bottom:8px">Contratação</span>
        <h3 style="margin-bottom:4px">Aulas de Beach Tennis</h3>
        <p>Modalidade fixa · 2x por semana · com termos e confirmação de horários.</p>
        <button class="btn-primary btn-full" data-sheet="service-contract" style="margin-top:12px">Contratar serviço</button>
      </div>

      <div class="sec-head"><h3>Em andamento</h3></div>
      <div class="card" style="border-color:rgba(245,158,11,.24)">
        <span class="pill pill--amber" style="margin-bottom:8px">Lista de espera · posição 3</span>
        <h3 style="margin-bottom:4px">Natação Infantil</h3>
        <p>Ao abrir vaga, você tem 48h para confirmar a matrícula.</p>
        <button class="btn-secondary btn-full btn-sm" data-action="waitlist" style="margin-top:12px">Gerenciar espera</button>
      </div>

      <div class="sec-head"><h3>Rematrícula</h3></div>
      <div class="card">
        <span class="pill pill--gray" style="margin-bottom:8px">Rematrícula 2026/2</span>
        <h3 style="margin-bottom:4px">Judô · João Andreis</h3>
        <p>Confirme o interesse para preservar a vaga do dependente.</p>
        <div class="row" style="margin-top:12px">
          <button class="btn-primary btn-sm" data-action="renew" style="flex:1">Confirmar</button>
          <button class="btn-danger btn-sm">Cancelar</button>
        </div>
      </div>
    </div>
  `;
}

// ── Academia ─────────────────────────────────────────

function renderAcademia() {
  return `
    ${renderHeader("Academia")}
    <div class="scroll">
      <div class="sec-head"><h3>Meus treinos</h3></div>
      ${[
        { title: "Treino A · Hipertrofia", date: "Atualizado 16/06/2026", status: "PDF disponível" },
        { title: "Treino B · Cardio", date: "Atualizado 10/06/2026", status: "PDF disponível" },
      ].map((t) => `
        <div class="card row" style="margin-bottom:10px">
          <div>
            <div style="margin-bottom:4px"><span class="pill pill--green">${t.status}</span></div>
            <strong>${t.title}</strong>
            <p>${t.date}</p>
          </div>
          <button class="btn-secondary btn-sm" data-action="open-workout">${ICONS.pdf}</button>
        </div>
      `).join("")}

      <div class="sec-head"><h3>Avaliação física</h3></div>
      <div class="card" style="border-color:rgba(245,158,11,.24)">
        <span class="pill pill--amber" style="margin-bottom:8px">Agendamento disponível</span>
        <h3 style="margin-bottom:4px">Agendar avaliação</h3>
        <p>Sede Juventude · Prof.ª Ana · horários disponíveis amanhã e sexta.</p>
        <button class="btn-primary btn-full" data-sheet="assessment" style="margin-top:12px">Agendar avaliação</button>
      </div>

      <div class="sec-head"><h3>Histórico</h3></div>
      <div class="card card-compact">
        <p>3 avaliações físicas registradas · última em 04/2026 · PDF disponível para download.</p>
      </div>
    </div>
  `;
}

// ── Convênios ─────────────────────────────────────────

function renderConvenios() {
  return `
    ${renderHeader("Convênio Interclubes")}
    <div class="scroll">
      <div class="card">
        <span class="pill pill--green" style="margin-bottom:8px">Disponível</span>
        <h3 style="margin-bottom:4px">Clube Caixeiros Viajantes</h3>
        <p>Gere uma carta de convênio para apresentar na portaria do clube parceiro. Válida por 30 dias.</p>
        <button class="btn-primary btn-full" data-action="letter" style="margin-top:12px">Gerar carta de convênio</button>
      </div>

      <div class="sec-head"><h3>Minhas cartas</h3><span>${state.letters.length}</span></div>
      ${state.letters.map((l) => `
        <div class="card card-compact" style="margin-bottom:8px">
          <div class="row">
            <strong style="font-size:.92rem">${l.club}</strong>
            <span class="pill pill--green">${l.status}</span>
          </div>
          <div class="row" style="margin-top:6px">
            <p style="margin:0">Válida até ${l.expires} · ${l.id}</p>
            <button class="btn-link" data-action="download-letter">${ICONS.pdf} PDF</button>
          </div>
        </div>
      `).join("")}
      ${!state.letters.length ? `<div class="empty-state"><div class="empty-icon">📄</div><h3>Nenhuma carta gerada</h3><p>Gere sua primeira carta acima.</p></div>` : ""}
    </div>
  `;
}

// ── Mapa ─────────────────────────────────────────────

function renderMapa() {
  return `
    ${renderHeader("Mapa do Clube")}
    <div class="scroll">
      <div class="card" style="padding:12px">
        <img class="map-img" src="./assets/mapa_app_mapped.svg" alt="Mapa do Recreio da Juventude" style="min-height:220px" />
      </div>
      <div class="sec-head"><h3>Pontos de interesse</h3></div>
      ${["Portaria principal", "Secretaria e Administração", "Piscinas Olímpicas", "Quadras de Tênis e Beach Tennis", "Recreio Life – Saúde e Bem-estar", "Academias", "Quiosques e Recantos"].map((p) => `
        <div class="card card-compact row" style="margin-bottom:8px">
          <strong style="font-size:.9rem">${p}</strong>
          <button class="btn-link" data-action="route">Ver rota</button>
        </div>
      `).join("")}
    </div>
  `;
}

// ── Conta ─────────────────────────────────────────────

function renderConta() {
  return `
    ${renderHeader("Minha Conta")}
    <div class="scroll">
      <div class="card">
        <div class="row" style="margin-bottom:12px">
          <div class="avatar" style="width:52px;height:52px;font-size:1rem">FA</div>
          <span class="pill pill--green">Associado ativo</span>
        </div>
        <h3 style="margin-bottom:2px">Fabricio Andreis</h3>
        <p>Matrícula 10428 · Titular · Sede Juventude</p>
        <button class="btn-secondary btn-full" data-sheet="edit-account" style="margin-top:12px">Editar dados cadastrais</button>
      </div>

      <div class="sec-head"><h3>Dependentes</h3></div>
      ${["Maria Andreis", "João Andreis"].map((name, i) => `
        <div class="card card-compact" style="margin-bottom:8px">
          <div class="row">
            <strong>${name}</strong>
            <div>
              <span class="pill pill--green" style="margin-right:6px">Ativo</span>
              <button class="btn-link" data-action="edit-dep" data-dep="${i+1}">Editar</button>
            </div>
          </div>
        </div>
      `).join("")}

      <div class="card" style="margin-top:6px">
        <h3 style="margin-bottom:8px">Configurações</h3>
        ${[
          ["Notificações push", true],
          ["Modo offline (carteirinha)", true],
          ["Novidades do clube", false],
        ].map(([label, on]) => `
          <div class="row" style="padding:8px 0;border-bottom:1px solid var(--line)">
            <span style="font-size:.9rem">${label}</span>
            <button class="switch ${on ? "on" : ""}" data-action="toggle" aria-label="${label}"></button>
          </div>
        `).join("")}
      </div>

      <button class="btn-danger btn-full" data-action="logout" style="margin-top:12px">
        ${ICONS.logout}
        Sair da conta
      </button>
    </div>
  `;
}

// ── Notificações ─────────────────────────────────────

function renderNotificacoes() {
  const unread = unreadCount();
  return `
    ${renderHeader("Notificações")}
    <div class="scroll">
      ${unread > 0 ? `
        <button class="btn-secondary btn-full" data-action="read-all" style="margin-bottom:14px">
          Marcar ${unread} como lida${unread > 1 ? "s" : ""}
        </button>
      ` : ""}
      ${state.notifications.map((n) => `
        <div class="card card-compact ${!n.read ? "notification-unread" : ""}" style="margin-bottom:8px;${!n.read ? "border-color:rgba(0,151,61,.24)" : ""}">
          <div class="row" style="margin-bottom:5px">
            <div style="display:flex;align-items:center;gap:8px">
              ${!n.read ? `<div class="unread-dot"></div>` : ""}
              <strong style="font-size:.88rem">${n.title}</strong>
            </div>
            <small style="color:var(--muted);flex-shrink:0">${n.date}</small>
          </div>
          <p style="${!n.read ? "color:var(--ink2)" : ""}">${n.body}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// ── Atendimento ──────────────────────────────────────

function renderAtendimento() {
  return `
    ${renderHeader("Atendimento")}
    <div class="scroll">
      <div class="card" style="background:linear-gradient(135deg,#15803d,#22c55e);border:0;color:#fff">
        <span class="pill pill--dark" style="margin-bottom:8px">Canal rápido</span>
        <h3 style="margin-bottom:4px">Falar pelo WhatsApp</h3>
        <p style="color:rgba(255,255,255,.8)">Atendimento direto com a equipe do clube.</p>
        <button class="btn-secondary btn-sm" data-action="whatsapp" style="margin-top:12px;background:rgba(255,255,255,.18);color:#fff;border:1px solid rgba(255,255,255,.3)">
          ${ICONS.whatsapp}
          Abrir WhatsApp
        </button>
      </div>

      <div class="card" style="margin-top:12px">
        <h3 style="margin-bottom:6px">Abrir chamado (SAC)</h3>
        <p>Informe o assunto, receba um número de protocolo e acompanhe o andamento.</p>
        <button class="btn-primary btn-full" data-sheet="support-ticket" style="margin-top:12px">Criar protocolo</button>
      </div>

      <div class="sec-head"><h3>Dúvidas frequentes</h3></div>
      ${[
        ["Como cancelar uma reserva?", "Acesse Reservas → Minhas Reservas e toque em Cancelar até 2h antes."],
        ["Como gerar o boleto?", "Acesse Pagamentos, selecione a fatura em aberto e toque em Pagar agora."],
        ["Como adicionar dependentes?", "Acesse Minha Conta → Dependentes e solicite atualização."],
      ].map(([q, a]) => `
        <div class="card card-compact" style="margin-bottom:8px" data-sheet="faq">
          <strong style="font-size:.88rem">${q}</strong>
          <p style="margin-top:4px;font-size:.82rem">${a}</p>
        </div>
      `).join("")}
    </div>
  `;
}

// ── Visitantes ───────────────────────────────────────

function renderVisitantes() {
  return `
    ${renderHeader("Visitantes")}
    <div class="scroll">
      <div class="card">
        <span class="pill pill--blue" style="margin-bottom:8px">Gerar acesso</span>
        <h3 style="margin-bottom:4px">Código para convidado</h3>
        <p>Informe o motivo de acesso. O código é vinculado à sua matrícula e expira automaticamente.</p>
        <button class="btn-primary btn-full" data-action="visitor-code" style="margin-top:12px">Gerar código de acesso</button>
      </div>

      <div class="sec-head"><h3>Acessos ativos</h3></div>
      <div class="card card-compact">
        <p>Nenhum código de visitante ativo no momento. Códigos gerados aparecem aqui com status e validade.</p>
      </div>

      <div class="sec-head"><h3>Eventos esportivos</h3></div>
      <div class="card">
        <span class="pill pill--blue" style="margin-bottom:8px">Esporte</span>
        <h3 style="margin-bottom:4px">Festival de Natação</h3>
        <p>Gere acesso para visitantes vinculados ao evento. Lista revisada por você como responsável.</p>
        <button class="btn-secondary btn-full btn-sm" style="margin-top:12px" data-action="visitor-code">Gerar acesso para evento</button>
      </div>
    </div>
  `;
}

// ── Generic fallback ─────────────────────────────────

function renderGeneric(id) {
  const m = modById(id) || { title: "Módulo", sub: "Fluxo disponível na próxima iteração.", icon: ICONS.grid };
  return `
    ${renderHeader(m.title)}
    <div class="scroll">
      <div class="card" style="text-align:center;padding:32px">
        <div style="color:var(--g500);margin-bottom:12px">${m.icon}</div>
        <h3 style="margin-bottom:8px">${m.title}</h3>
        <p>${m.sub}</p>
      </div>
    </div>
  `;
}

// ── Sheets ────────────────────────────────────────────

function renderSheet() {
  if (!state.sheet) return "";
  return `
    <div class="sheet-backdrop" data-action="close-sheet">
      <div class="sheet" onclick="event.stopPropagation()">
        <div class="sheet-handle"></div>
        ${sheetBody(state.sheet)}
      </div>
    </div>
  `;
}

function sheetBody(id) {
  if (id === "forgot") return `
    <h3>Recuperar senha</h3>
    <p>Informe o CPF. Se houver múltiplos usuários, você poderá escolher o login correto antes do envio.</p>
    <div class="field"><label>CPF</label><input placeholder="000.000.000-00" inputmode="numeric" /></div>
    <button class="btn-primary btn-full" data-action="forgot" style="margin-top:14px">Enviar instrução por e-mail</button>
  `;

  if (id === "shortcuts") return `
    <h3>Meus atalhos</h3>
    <p>Escolha os módulos que aparecem na home. Mínimo de 4 atalhos.</p>
    <div class="toggle-list">
      ${MODULES.slice(0, 10).map((m) => {
        const on = state.shortcuts.includes(m.id);
        return `
          <div class="toggle-item">
            <span>${m.title}</span>
            <button class="switch ${on ? "on" : ""}" data-toggle-sc="${m.id}" aria-label="${m.title}"></button>
          </div>
        `;
      }).join("")}
    </div>
    <button class="btn-primary btn-full" data-action="save-shortcuts" style="margin-top:14px">Salvar atalhos</button>
  `;

  if (id === "guests") return `
    <h3>Adicionar convidado</h3>
    <p>Nome e CPF são validados antes da confirmação da reserva.</p>
    <div class="field"><label>Nome completo</label><input value="Convidado Demo" /></div>
    <div class="field"><label>CPF</label><input value="000.000.000-00" inputmode="numeric" /></div>
    <button class="btn-primary btn-full" data-action="guest-added" style="margin-top:14px">Adicionar convidado</button>
  `;

  if (id === "terms") return `
    <h3>Termo de responsabilidade</h3>
    <p>Declaro estar ciente das regras de uso do espaço, política de cancelamento, responsabilidade por danos e limites de convidados.</p>
    <div style="padding:14px;background:var(--soft);border-radius:14px;margin-bottom:14px">
      <p style="font-size:.82rem;color:var(--ink2)">§1. O associado é responsável pela conduta de todos os convidados durante o uso do espaço.</p>
      <p style="font-size:.82rem;color:var(--ink2);margin-top:8px">§2. O cancelamento sem taxa ocorre até 2h antes do início da reserva.</p>
    </div>
    <button class="btn-primary btn-full" data-action="accept-terms">Li e aceito os termos</button>
  `;

  if (id === "invoice") return `
    <h3>Pagar mensalidade</h3>
    <p>Escolha boleto ou cartão de crédito. Dados de cartão nunca são registrados ou persistidos no app.</p>
    ${recRow("Valor", "R$ 486,90")}
    ${recRow("Taxa cartão (2%)", "R$ 9,74")}
    ${recRow("Total com cartão", "R$ 496,64")}
    <button class="btn-primary btn-full" data-action="pay-card" style="margin-top:16px">Pagar com cartão</button>
    <button class="btn-secondary btn-full" data-action="boleto" style="margin-top:8px">Gerar boleto</button>
  `;

  if (id === "buy-ticket") return `
    <h3>Comprar ingresso</h3>
    <p>Selecione o portador. O sistema valida CPF, limite de venda por matrícula e disponibilidade de lote.</p>
    <div class="field" style="margin-bottom:14px">
      <label>Portador</label>
      <select>
        <option>Fabricio Andreis (titular)</option>
        <option>Maria Andreis (dependente)</option>
        <option>João Andreis (dependente)</option>
        <option>Outro associado</option>
        <option>Não sócio</option>
      </select>
    </div>
    ${recRow("Evento", "Noite Italiana")}
    ${recRow("Data", "28/06/2026 · 20:00")}
    ${recRow("Ingresso", "Meia entrada associado")}
    ${recRow("Valor", "R$ 45,00")}
    <button class="btn-primary btn-full" data-action="buy-ticket" style="margin-top:16px">Finalizar pedido</button>
  `;

  if (id === "service-contract") return `
    <h3>Contratar serviço</h3>
    <p>Modalidade fixa: selecione usuário, frequência semanal, dia e horário preferido.</p>
    <div class="field"><label>Usuário</label><select><option>Fabricio Andreis</option><option>Maria Andreis</option><option>João Andreis</option></select></div>
    <div class="field"><label>Frequência</label><select><option>2x por semana</option><option>3x por semana</option></select></div>
    <div class="field"><label>Horário preferido</label><select><option>Ter/Qui · 18:00</option><option>Seg/Qua · 07:30</option><option>Sáb · 09:00</option></select></div>
    <button class="btn-primary btn-full" data-action="contract-service" style="margin-top:16px">Contratar</button>
  `;

  if (id === "assessment") return `
    <h3>Agendar avaliação física</h3>
    <div class="field"><label>Sede</label><select><option>Sede Juventude</option><option>Sede Guarany</option></select></div>
    <div class="field"><label>Professor(a)</label><select><option>Ana Paula</option><option>Carlos Souza</option></select></div>
    <div class="field"><label>Dia e horário</label><select><option>Amanhã · 10:00</option><option>Sexta · 14:00</option><option>Sábado · 09:00</option></select></div>
    <button class="btn-primary btn-full" data-action="assessment" style="margin-top:16px">Confirmar agendamento</button>
  `;

  if (id === "edit-account") return `
    <h3>Editar dados cadastrais</h3>
    <p>Alterações são enviadas para análise antes de atualizar o sistema de associados.</p>
    <div class="field"><label>E-mail</label><input value="fabricio@recreio.com.br" type="email" /></div>
    <div class="field"><label>Telefone</label><input value="(51) 99999-0000" type="tel" /></div>
    <div class="field"><label>CEP</label><input value="90000-000" /></div>
    <button class="btn-primary btn-full" data-action="save-account" style="margin-top:16px">Enviar para análise</button>
  `;

  if (id === "support-ticket") return `
    <h3>Novo protocolo</h3>
    <div class="field"><label>Assunto</label>
      <select>
        <option>Reserva</option><option>Pagamento</option><option>Carteirinha</option>
        <option>Serviço contratado</option><option>Cadastro</option><option>Outro</option>
      </select>
    </div>
    <div class="field"><label>Mensagem</label>
      <textarea>Preciso de ajuda com...</textarea>
    </div>
    <button class="btn-primary btn-full" data-action="support-ticket" style="margin-top:14px">Criar protocolo</button>
  `;

  if (id === "res-detail") return `
    <h3>Detalhes da reserva</h3>
    <p>Informações completas da reserva, histórico de alterações e opções de gestão de convidados.</p>
    <button class="btn-secondary btn-full" data-action="guest-added">Adicionar convidado</button>
    <button class="btn-ghost btn-full" data-action="close-sheet" style="margin-top:8px">Fechar</button>
  `;

  return `<h3>Conteúdo</h3><p>Este bottom sheet exibirá o fluxo detalhado nesta área.</p>`;
}

// ── Events / binding ─────────────────────────────────

function bindAll() {
  document.querySelectorAll("[data-go]").forEach((el) => {
    el.addEventListener("click", () => go(el.dataset.go));
  });

  document.querySelectorAll("[data-sheet]").forEach((el) => {
    el.addEventListener("click", () => openSheet(el.dataset.sheet));
  });

  document.querySelectorAll("[data-restab]").forEach((el) => {
    el.addEventListener("click", () => patch({ resTab: el.dataset.restab, resStep: 0 }));
  });

  document.querySelectorAll("[data-res-user]").forEach((el) => {
    el.addEventListener("click", () => {
      state.resDraft.user = el.dataset.resUser;
      render();
    });
  });

  document.querySelectorAll("[data-res-type]").forEach((el) => {
    el.addEventListener("click", () => {
      state.resDraft.type = el.dataset.resType;
      render();
    });
  });

  document.querySelectorAll("[data-res-date]").forEach((el) => {
    el.addEventListener("click", () => {
      state.resDraft.date = el.dataset.resDate;
      render();
    });
  });

  document.querySelectorAll("[data-res-time]").forEach((el) => {
    el.addEventListener("click", () => {
      state.resDraft.time = el.dataset.resTime;
      render();
    });
  });

  const unitSel = document.querySelector("#res-unit");
  if (unitSel) {
    unitSel.addEventListener("change", () => {
      state.resDraft.unit = unitSel.value;
    });
  }

  document.querySelectorAll("[data-res-next]").forEach((el) => {
    el.addEventListener("click", () => {
      if (state.resStep < 4) patch({ resStep: state.resStep + 1 });
    });
  });

  document.querySelectorAll("[data-res-prev]").forEach((el) => {
    el.addEventListener("click", () => {
      if (state.resStep > 0) patch({ resStep: state.resStep - 1 });
    });
  });

  document.querySelectorAll("[data-toggle-sc]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.toggleSc;
      const idx = state.shortcuts.indexOf(id);
      if (idx >= 0) {
        if (state.shortcuts.length > 4) state.shortcuts.splice(idx, 1);
        else showToast("Mínimo de 4 atalhos configurados.");
      } else {
        state.shortcuts.push(id);
      }
      render();
    });
  });

  document.querySelectorAll("[data-action='toggle']").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("on"));
  });

  document.querySelectorAll("[data-action]").forEach((el) => {
    const action = el.dataset.action;
    if (["toggle"].includes(action)) return;
    el.addEventListener("click", (e) => handleAction(action, e, el));
  });

  const loginForm = document.querySelector("[data-form='login']");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      patch({ loggedIn: true, screen: "home" });
    });
  }

  const menuSearch = document.querySelector("[data-action='search']");
  if (menuSearch) {
    menuSearch.addEventListener("input", (e) => {
      state.search = e.target.value;
      render();
      const freshSearch = document.querySelector("[data-action='search']");
      if (freshSearch) {
        freshSearch.focus();
        freshSearch.setSelectionRange(9999, 9999);
      }
    });
  }

  document.querySelectorAll("[data-action='ev-agenda']").forEach((el) => {
    el.addEventListener("click", () => { state.evTab = "agenda"; render(); });
  });
  document.querySelectorAll("[data-action='ev-tickets']").forEach((el) => {
    el.addEventListener("click", () => { state.evTab = "tickets"; render(); });
  });
}

function handleAction(action, _e, el) {
  switch (action) {
    case "close-sheet":
      closeSheet(); break;

    case "confirm-reservation": {
      const d = state.resDraft;
      const id = `RSV-${3000 + Math.floor(Math.random() * 6000)}`;
      state.reservations.unshift({
        id,
        title: d.type || "Espaço",
        date: `${d.date || "—"}, ${d.time || "—"}`,
        unit: d.unit,
        status: "Confirmada",
        guests: d.guests,
      });
      state.resTab = "minhas";
      state.resStep = 0;
      state.resDraft = { user: "Fabricio Andreis", type: null, unit: "Sede Juventude", date: null, time: null, guests: 0 };
      showToast(`✅ Reserva ${id} confirmada. Comprovante disponível.`);
      break;
    }

    case "cancel-res": {
      const rid = el.dataset.resid;
      state.reservations = state.reservations.filter((r) => r.id !== rid);
      showToast(`Reserva ${rid} cancelada.`);
      break;
    }

    case "copy-barcode":
      showToast("Linha digitável copiada: 23793.38128 00000.000000 00000.000000 1..."); break;

    case "pay-card":
      state.invoices[0].status = "Concluída";
      closeSheet();
      showToast("✅ Pagamento confirmado. Comprovante enviado para o e-mail."); break;

    case "boleto":
      closeSheet();
      showToast("📄 Boleto gerado. PDF disponível para download."); break;

    case "buy-ticket": {
      const id = `TCK-${10 + Math.floor(Math.random() * 80)}`;
      state.tickets.unshift({ id, title: "Noite Italiana", holder: "Fabricio Andreis", date: "28/06, 20:00", event: "EVT-01" });
      state.evTab = "tickets";
      closeSheet();
      showToast(`🎟 Ingresso ${id} emitido. QR disponível.`); break;
    }

    case "guest-added":
      state.resDraft.guests += 1;
      closeSheet();
      showToast("Convidado adicionado à reserva."); break;

    case "accept-terms":
      closeSheet();
      showToast("Termo de responsabilidade aceito."); break;

    case "forgot":
      closeSheet();
      showToast("📧 Instruções de recuperação enviadas para o e-mail."); break;

    case "save-shortcuts":
      closeSheet();
      showToast("Atalhos salvos na home."); break;

    case "offline-wallet":
      showToast("📲 Carteirinha salva para modo offline seguro."); break;

    case "access-code":
      showToast(`🔑 Código RJ-${100000 + Math.floor(Math.random() * 899999)} válido por 15 min.`); break;

    case "waitlist":
      showToast("🔔 Você será notificado quando a vaga abrir."); break;

    case "renew":
      closeSheet();
      showToast("✅ Rematrícula confirmada para 2026/2."); break;

    case "contract-service":
      closeSheet();
      showToast("✅ Serviço contratado. Comprovante enviado."); break;

    case "open-workout":
      showToast("📄 PDF de treino aberto no visualizador."); break;

    case "assessment":
      closeSheet();
      showToast("✅ Avaliação física agendada."); break;

    case "letter": {
      const id = `CV-${300 + Math.floor(Math.random() * 600)}`;
      state.letters.unshift({ id, club: "Clube Caixeiros Viajantes", status: "Válida", expires: "30/07/2026" });
      showToast(`📄 Carta ${id} gerada. PDF disponível.`); break;
    }

    case "download-letter":
      showToast("📄 Carta de convênio baixada (simulado)."); break;

    case "route":
      showToast("🗺 Rota interna simulada."); break;

    case "save-account":
      closeSheet();
      showToast("📋 Alterações enviadas para análise."); break;

    case "edit-dep":
      showToast(`Edição de dependente ${el.dataset.dep} — fluxo disponível em detalhes.`); break;

    case "read-all":
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
      showToast("Todas as notificações marcadas como lidas."); break;

    case "whatsapp":
      showToast("Abriria: https://api.whatsapp.com/send?phone=555140421241"); break;

    case "support-ticket":
      closeSheet();
      showToast(`📋 Protocolo SAC-2026-${Math.floor(100 + Math.random() * 900)} criado.`); break;

    case "visitor-code":
      showToast(`🔑 Código visitante VIS-${1000 + Math.floor(Math.random() * 8999)} gerado.`); break;

    case "logout":
      Object.assign(state, {
        loggedIn: false, screen: "welcome", sheet: null, toastMsg: "",
        search: "", resTab: "nova", resStep: 0, evTab: null,
      });
      render(); break;
  }
}

// ── Boot ─────────────────────────────────────────────

render();
