const app = document.querySelector("#app");

const modules = [
  { id: "reservas", title: "Central de Reservas", subtitle: "Quiosques, quadras, piscina e espaços", icon: "R" },
  { id: "financeiro", title: "Pagamentos", subtitle: "Boletos, cartão e histórico", icon: "$" },
  { id: "eventos", title: "Eventos e Ingressos", subtitle: "Agenda, compra e QR de entrada", icon: "E" },
  { id: "carteirinha", title: "Carteirinha e Acessos", subtitle: "QR, barcodes e códigos temporários", icon: "Q" },
  { id: "servicos", title: "Serviços e Atividades", subtitle: "Contratação, lista de espera e rematrícula", icon: "S" },
  { id: "academia", title: "Academia", subtitle: "Meus treinos e avaliação física", icon: "A" },
  { id: "convenios", title: "Convênio Interclubes", subtitle: "Cartas disponíveis e minhas cartas", icon: "C" },
  { id: "mapa", title: "Mapa do Clube", subtitle: "Pontos de interesse e sedes", icon: "M" },
  { id: "conta", title: "Minha Conta", subtitle: "Dados, dependentes e preferências", icon: "U" },
  { id: "notificacoes", title: "Notificações", subtitle: "Avisos e mensagens do clube", icon: "N" },
  { id: "atendimento", title: "Atendimento e FAQ", subtitle: "SAC, WhatsApp e dúvidas frequentes", icon: "?" },
  { id: "visitantes", title: "Visitantes", subtitle: "Convidados e eventos esportivos", icon: "V" },
];

const shortcuts = ["reservas", "academia", "financeiro", "carteirinha", "eventos", "atendimento"];

const state = {
  loggedIn: false,
  screen: "welcome",
  lastScreen: "home",
  reservationTab: "new",
  reservationStep: 0,
  reservationDraft: {
    user: "Fabricio Andreis",
    type: "Quadra de tênis",
    unit: "Sede Juventude",
    date: "Sáb, 22/06",
    time: "09:00",
    guests: 1,
  },
  reservations: [
    { id: "RSV-2048", title: "Quiosque 12", date: "Hoje, 18:30", status: "Confirmada", guests: 4 },
    { id: "RSV-1982", title: "Piscina térmica", date: "Sáb, 10:00", status: "Pendente", guests: 0 },
  ],
  invoices: [
    { id: "INV-0626", title: "Mensalidade junho", due: "25/06/2026", amount: "R$ 486,90", status: "Aberta" },
    { id: "INV-0526", title: "Mensalidade maio", due: "25/05/2026", amount: "R$ 486,90", status: "Concluída" },
  ],
  tickets: [
    { id: "TCK-91", title: "Noite Italiana", holder: "Fabricio Andreis", date: "28/06, 20:00" },
  ],
  letters: [
    { id: "CV-221", club: "Clube Caixeiros Viajantes", status: "Válida até 30/06" },
  ],
  notificationsUnread: 3,
  toast: "",
  sheet: null,
  search: "",
};

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function go(screen) {
  const mainScreens = ["home", "menu", "notificacoes", "conta", "atendimento"];
  setState({
    lastScreen: mainScreens.includes(screen) ? screen : state.lastScreen,
    screen,
    sheet: null,
    toast: "",
  });
}

function toast(message) {
  state.toast = message;
  render();
  setTimeout(() => {
    if (state.toast === message) {
      state.toast = "";
      render();
    }
  }, 2600);
}

function moduleById(id) {
  return modules.find((module) => module.id === id);
}

function mark(icon) {
  return `<span class="shortcut-mark" aria-hidden="true">${icon}</span>`;
}

function statusClass(status) {
  if (/aberta|pendente/i.test(status)) return "warn";
  if (/recusada|erro|falha/i.test(status)) return "danger";
  return "";
}

function render() {
  app.innerHTML = state.loggedIn ? renderApp() : renderWelcome();
  bindEvents();
}

function renderWelcome() {
  return `
    <section class="welcome">
      <div class="welcome-content">
        <img class="welcome-logo" src="./assets/logo-w.svg" alt="Recreio da Juventude" />
        <h1>Seu clube mais simples no celular.</h1>
        <p>Reservas, pagamentos, eventos, carteirinha e atendimento em uma experiência nova para o associado.</p>
      </div>
      <form class="login-panel" data-action="login">
        <div class="field">
          <label for="login-id">CPF, matrícula ou e-mail</label>
          <input id="login-id" name="login" value="fabricio.andreis" autocomplete="username" />
        </div>
        <div class="field">
          <label for="login-password">Senha</label>
          <input id="login-password" name="password" type="password" value="Senha@2026" autocomplete="current-password" />
        </div>
        <button class="primary-btn" type="submit">Entrar na PoC</button>
        <button class="link-btn" type="button" data-sheet="forgot">Esqueci minha senha</button>
      </form>
      ${renderSheet()}
    </section>
  `;
}

function renderApp() {
  const content = renderScreen();
  return `
    <section class="screen">
      ${content}
      ${renderBottomNav()}
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      ${renderSheet()}
    </section>
  `;
}

function renderScreen() {
  if (state.screen === "home") return renderHome();
  if (state.screen === "menu") return renderMenu();
  if (state.screen === "reservas") return renderReservations();
  if (state.screen === "financeiro") return renderFinance();
  if (state.screen === "eventos") return renderEvents();
  if (state.screen === "carteirinha") return renderWallet();
  if (state.screen === "servicos") return renderServices();
  if (state.screen === "academia") return renderAcademy();
  if (state.screen === "convenios") return renderConvenios();
  if (state.screen === "mapa") return renderMap();
  if (state.screen === "conta") return renderAccount();
  if (state.screen === "notificacoes") return renderNotifications();
  if (state.screen === "atendimento") return renderSupport();
  if (state.screen === "visitantes") return renderVisitors();
  return renderGenericModule(state.screen);
}

function renderHome() {
  const selectedShortcuts = shortcuts.map(moduleById);
  return `
    <div class="scroll">
      <header class="hero">
        <div class="top-row">
          <img class="logo-white" src="./assets/logo-w.svg" alt="Recreio da Juventude" />
          <button class="profile-pill" data-go="conta">
            <span class="avatar">FA</span>
            <span>Ativo</span>
          </button>
        </div>
        <h2>Boa tarde, Fabricio.</h2>
        <p>Você tem uma reserva hoje, uma cobrança aberta e 3 avisos do clube.</p>
      </header>

      <section class="task-grid" aria-label="Ações principais">
        <button class="task-card" data-go="reservas"><span>Próxima ação</span><strong>Reservar agora</strong></button>
        <button class="task-card" data-go="financeiro"><span>Vence em 7 dias</span><strong>Pagar aberto</strong></button>
        <button class="task-card" data-go="eventos"><span>28/06 às 20:00</span><strong>Noite Italiana</strong></button>
        <button class="task-card" data-go="carteirinha"><span>Modo rápido</span><strong>Minha carteirinha</strong></button>
      </section>

      <div class="section-title">
        <h3>Meus atalhos</h3>
        <button class="link-btn" data-sheet="shortcuts">Editar</button>
      </div>
      <section class="shortcut-grid">
        ${selectedShortcuts.map((item) => `
          <button class="shortcut" data-go="${item.id}">
            ${mark(item.icon)}
            <span>${item.title.replace("Central de ", "").replace(" e Acessos", "")}</span>
          </button>
        `).join("")}
      </section>

      <div class="section-title">
        <h3>Hoje no clube</h3>
        <span>Status em tempo real</span>
      </div>
      <article class="card feed-card">
        <img src="./assets/home2.jpeg" alt="" />
        <div>
          <span class="status-pill">Confirmada</span>
          <h4>Quiosque 12 às 18:30</h4>
          <p>Leve seu QR e revise a lista de convidados antes de chegar.</p>
        </div>
      </article>
      <article class="card feed-card">
        <img src="./assets/home1.jpeg" alt="" />
        <div>
          <span class="status-pill warn">Ação pendente</span>
          <h4>Avaliação física disponível</h4>
          <p>Há horários com professor na Sede Juventude nesta semana.</p>
        </div>
      </article>
    </div>
  `;
}

function renderMenu() {
  const term = state.search.toLowerCase();
  const filtered = modules.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(term));
  return `
    ${renderHeader("Menu completo")}
    <div class="scroll">
      <input class="menu-search" data-action="search" placeholder="Buscar reservas, boletos, eventos..." value="${state.search}" />
      <div class="module-list">
        ${filtered.map((item) => `
          <button class="module-item" data-go="${item.id}" data-search-text="${item.title} ${item.subtitle}">
            ${mark(item.icon)}
            <span><strong>${item.title}</strong><small>${item.subtitle}</small></span>
            <span>›</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderReservations() {
  const stepViews = [
    renderReservationUsers,
    renderReservationResource,
    renderReservationDate,
    renderReservationTime,
    renderReservationReview,
  ];
  return `
    ${renderHeader("Reservas")}
    <div class="scroll">
      <div class="segmented">
        <button class="${state.reservationTab === "new" ? "active" : ""}" data-reservation-tab="new">Nova reserva</button>
        <button class="${state.reservationTab === "mine" ? "active" : ""}" data-reservation-tab="mine">Minhas reservas</button>
      </div>
      ${state.reservationTab === "new" ? `
        <div class="stepper">${[0, 1, 2, 3, 4].map((step) => `<span class="step-dot ${step <= state.reservationStep ? "active" : ""}"></span>`).join("")}</div>
        ${stepViews[state.reservationStep]()}
      ` : renderMyReservations()}
    </div>
  `;
}

function renderReservationUsers() {
  return `
    <section class="card">
      <span class="tag">Passo 1 de 5</span>
      <h3>Quem vai usar?</h3>
      <p>O BFF validará permissões, idade, status ativo e adimplência por associado/dependente.</p>
      <div class="choice-grid" style="margin-top: 14px">
        ${["Fabricio Andreis", "Maria Andreis", "João Andreis"].map((name) => `
          <button class="choice ${state.reservationDraft.user === name ? "active" : ""}" data-draft="user" data-value="${name}">
            <span><strong>${name}</strong><small>${name === "Fabricio Andreis" ? "Titular" : "Dependente"}</small></span>
            <span>${state.reservationDraft.user === name ? "✓" : ""}</span>
          </button>
        `).join("")}
      </div>
    </section>
    ${renderReservationActions()}
  `;
}

function renderReservationResource() {
  const resources = ["Quadra de tênis", "Quiosque", "Coworking", "Piscina", "Recovery", "Campo de futebol"];
  return `
    <section class="card">
      <span class="tag">Passo 2 de 5</span>
      <h3>Escolha o espaço</h3>
      <p>Filtros simplificados por sede e categoria, sem a densidade do fluxo legado.</p>
      <div class="field" style="margin: 14px 0">
        <label>Sede</label>
        <select data-draft-select="unit">
          <option ${state.reservationDraft.unit === "Sede Juventude" ? "selected" : ""}>Sede Juventude</option>
          <option ${state.reservationDraft.unit === "Sede Guarany" ? "selected" : ""}>Sede Guarany</option>
        </select>
      </div>
      <div class="choice-grid">
        ${resources.map((resource) => `
          <button class="choice ${state.reservationDraft.type === resource ? "active" : ""}" data-draft="type" data-value="${resource}">
            <span><strong>${resource}</strong><small>${resource === "Recovery" ? "Recreio Life" : "Central de Reservas"}</small></span>
            <span>${state.reservationDraft.type === resource ? "✓" : ""}</span>
          </button>
        `).join("")}
      </div>
    </section>
    ${renderReservationActions()}
  `;
}

function renderReservationDate() {
  const dates = ["Sáb, 22/06", "Dom, 23/06", "Seg, 24/06", "Ter, 25/06", "Qua, 26/06"];
  return `
    <section class="card">
      <span class="tag">Passo 3 de 5</span>
      <h3>Data disponível</h3>
      <p>Estados indisponíveis explicam lotação, manutenção ou regra de antecedência.</p>
      <div class="calendar-row" style="margin-top: 16px">
        ${dates.map((date) => `
          <button class="date-chip ${state.reservationDraft.date === date ? "active" : ""}" data-draft="date" data-value="${date}">
            <small>${date.split(", ")[0]}</small>
            <strong>${date.split(", ")[1].split("/")[0]}</strong>
          </button>
        `).join("")}
      </div>
      <article class="card compact" style="margin-top: 14px">
        <span class="status-pill warn">Indisponível</span>
        <p>Quiosques no domingo estão lotados. Você pode entrar na lista de espera.</p>
      </article>
    </section>
    ${renderReservationActions()}
  `;
}

function renderReservationTime() {
  const times = ["08:00", "09:00", "10:00", "14:00", "18:30"];
  return `
    <section class="card">
      <span class="tag">Passo 4 de 5</span>
      <h3>Horário e convidados</h3>
      <p>Convidados com CPF seriam validados antes da confirmação.</p>
      <div class="choice-grid" style="margin-top: 14px">
        ${times.map((time) => `
          <button class="choice ${state.reservationDraft.time === time ? "active" : ""}" data-draft="time" data-value="${time}">
            <span><strong>${time}</strong><small>${time === "18:30" ? "Últimas vagas" : "Disponível"}</small></span>
            <span>${state.reservationDraft.time === time ? "✓" : ""}</span>
          </button>
        `).join("")}
      </div>
      <button class="secondary-btn" style="width: 100%; margin-top: 12px" data-sheet="guests">Adicionar convidados</button>
    </section>
    ${renderReservationActions()}
  `;
}

function renderReservationReview() {
  const draft = state.reservationDraft;
  return `
    <section class="card receipt">
      <span class="tag">Revisão</span>
      <h3>Confirmar reserva</h3>
      <p>Ao confirmar, a PoC gera um comprovante local. No app real, a operação será idempotente e auditada.</p>
      <div class="stack" style="margin-top: 14px">
        ${summaryRow("Usuário", draft.user)}
        ${summaryRow("Espaço", draft.type)}
        ${summaryRow("Sede", draft.unit)}
        ${summaryRow("Data", draft.date)}
        ${summaryRow("Horário", draft.time)}
        ${summaryRow("Convidados", `${draft.guests} convidado(s)`)}
      </div>
      <button class="secondary-btn" style="width: 100%; margin-top: 14px" data-sheet="terms">Ver termo de responsabilidade</button>
    </section>
    <div class="action-bar">
      <button class="primary-btn" data-action="confirm-reservation">Confirmar reserva</button>
      <button class="ghost-btn" data-action="reservation-prev">Voltar</button>
    </div>
  `;
}

function renderReservationActions() {
  return `
    <div class="action-bar">
      <button class="primary-btn" data-action="reservation-next">Continuar</button>
      ${state.reservationStep > 0 ? `<button class="ghost-btn" data-action="reservation-prev">Voltar</button>` : ""}
    </div>
  `;
}

function renderMyReservations() {
  return `
    <div class="stack">
      ${state.reservations.map((item) => `
        <article class="card">
          <div class="row">
            <span class="status-pill ${statusClass(item.status)}">${item.status}</span>
            <small>${item.id}</small>
          </div>
          <h3>${item.title}</h3>
          <p>${item.date} · ${item.guests} convidado(s)</p>
          <div class="row" style="margin-top: 14px">
            <button class="secondary-btn" data-sheet="reservation-detail" data-id="${item.id}">Detalhes</button>
            <button class="danger-btn" data-action="cancel-reservation" data-id="${item.id}">Cancelar</button>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderFinance() {
  const openInvoice = state.invoices.find((invoice) => invoice.status === "Aberta");
  return `
    ${renderHeader("Pagamentos")}
    <div class="scroll">
      <article class="card">
        <span class="status-pill ${openInvoice ? "warn" : ""}">${openInvoice ? "Aberto" : "Em dia"}</span>
        <h3>${openInvoice ? `${openInvoice.amount} em aberto` : "Nenhuma cobrança aberta"}</h3>
        <p>${openInvoice ? `Mensalidade com vencimento em ${openInvoice.due}.` : "Pagamentos recentes continuam disponíveis no histórico."}</p>
        <div class="row" style="margin-top: 14px">
          ${openInvoice ? `
            <button class="primary-btn" data-sheet="invoice">Pagar agora</button>
            <button class="secondary-btn" data-action="copy-barcode">Copiar linha</button>
          ` : `
            <button class="secondary-btn" data-action="boleto">Ver comprovantes</button>
          `}
        </div>
      </article>
      <div class="section-title"><h3>Faturas</h3><span>Junho 2026</span></div>
      ${state.invoices.map((invoice) => `
        <article class="card compact">
          <div class="row">
            <strong>${invoice.title}</strong>
            <span class="status-pill ${statusClass(invoice.status)}">${invoice.status}</span>
          </div>
          <p>${invoice.amount} · vence ${invoice.due}</p>
        </article>
      `).join("")}
      <article class="card">
        <h3>Estados transacionais claros</h3>
        <p>O app real deve diferenciar boleto gerado, cartão recusado, pagamento confirmado e falha técnica, sempre com correlation id.</p>
      </article>
    </div>
  `;
}

function renderEvents() {
  return `
    ${renderHeader("Eventos")}
    <div class="scroll">
      <div class="segmented">
        <button class="active">Agenda</button>
        <button data-sheet="tickets">Meus ingressos</button>
      </div>
      <article class="card">
        <span class="status-pill">Música</span>
        <h3>Noite Italiana</h3>
        <p>28/06/2026 · Salão principal · Ingressos disponíveis para associado, dependente e não sócio.</p>
        <button class="primary-btn" style="width: 100%; margin-top: 14px" data-sheet="buy-ticket">Comprar ingresso</button>
      </article>
      <article class="card">
        <span class="status-pill">Atividade</span>
        <h3>Festival de Natação</h3>
        <p>Evento esportivo com códigos de acesso para visitantes convidados.</p>
        <button class="secondary-btn" style="width: 100%; margin-top: 14px" data-go="visitantes">Gerar acesso visitante</button>
      </article>
      <div class="section-title"><h3>Meus ingressos</h3><span>${state.tickets.length} ativo(s)</span></div>
      ${state.tickets.map((ticket) => `
        <article class="card qr-card">
          <span class="status-pill dark">${ticket.date}</span>
          <h3>${ticket.title}</h3>
          <p style="color: rgba(255,255,255,.72)">Titular: ${ticket.holder}</p>
          <div class="qr-box"><span>${ticket.id}</span></div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderWallet() {
  return `
    ${renderHeader("Carteirinha")}
    <div class="scroll">
      <article class="card qr-card">
        <div class="row">
          <span class="status-pill dark">Associado ativo</span>
          <span>Atualizado 09:41</span>
        </div>
        <h3>Fabricio Andreis</h3>
        <p style="color: rgba(255,255,255,.76)">Matrícula 10428 · Titular</p>
        <div class="qr-box"><span>RJ</span></div>
        <button class="secondary-btn" style="width: 100%" data-action="offline-wallet">Salvar modo offline</button>
      </article>
      <article class="card">
        <h3>Código de acesso temporário</h3>
        <p>Use para catraca, visitante autorizado ou fluxo de contingência.</p>
        <button class="primary-btn" style="width: 100%; margin-top: 14px" data-action="access-code">Gerar código</button>
      </article>
      <article class="card compact">
        <div class="row">
          <strong>Dependentes</strong>
          <button class="link-btn" data-go="conta">Ver todos</button>
        </div>
        <p>Maria Andreis e João Andreis possuem carteirinha digital disponível.</p>
      </article>
    </div>
  `;
}

function renderServices() {
  return `
    ${renderHeader("Serviços")}
    <div class="scroll">
      <article class="card">
        <span class="status-pill">Contratação</span>
        <h3>Aulas de beach tennis</h3>
        <p>Modalidade fixa, 2 horários por semana, com aceite de termos e sugestão de horários.</p>
        <button class="primary-btn" style="width: 100%; margin-top: 14px" data-sheet="service-contract">Contratar serviço</button>
      </article>
      <article class="card">
        <span class="status-pill warn">Lista de espera</span>
        <h3>Natação infantil</h3>
        <p>Você está na posição 3. Ao abrir vaga, terá 48h para confirmar.</p>
        <button class="secondary-btn" style="width: 100%; margin-top: 14px" data-action="waitlist">Receber aviso de vaga</button>
      </article>
      <article class="card">
        <span class="status-pill">Rematrícula</span>
        <h3>Judô 2026/2</h3>
        <p>Confirme interesse para preservar a vaga do dependente.</p>
        <button class="secondary-btn" style="width: 100%; margin-top: 14px" data-action="renew">Confirmar rematrícula</button>
      </article>
    </div>
  `;
}

function renderAcademy() {
  return `
    ${renderHeader("Academia")}
    <div class="scroll">
      <article class="card">
        <span class="status-pill">PDF disponível</span>
        <h3>Treino A · Hipertrofia</h3>
        <p>Última atualização pelo professor em 16/06/2026.</p>
        <button class="secondary-btn" style="width: 100%; margin-top: 14px" data-action="open-workout">Abrir treino</button>
      </article>
      <article class="card">
        <span class="status-pill warn">Agendamento</span>
        <h3>Avaliação física</h3>
        <p>Sede Juventude · Professora Ana · horários disponíveis amanhã.</p>
        <button class="primary-btn" style="width: 100%; margin-top: 14px" data-sheet="assessment">Agendar avaliação</button>
      </article>
      <article class="card compact">
        <strong>Histórico</strong>
        <p>3 avaliações físicas, 2 downloads de treino e 1 cancelamento registrado.</p>
      </article>
    </div>
  `;
}

function renderConvenios() {
  return `
    ${renderHeader("Convênio")}
    <div class="scroll">
      <article class="card">
        <span class="status-pill">Disponível</span>
        <h3>Clube Caixeiros Viajantes</h3>
        <p>Gere uma carta de convênio para apresentar na portaria do clube parceiro.</p>
        <button class="primary-btn" style="width: 100%; margin-top: 14px" data-action="letter">Gerar carta</button>
      </article>
      <div class="section-title"><h3>Minhas cartas</h3><span>${state.letters.length}</span></div>
      ${state.letters.map((letter) => `
        <article class="card compact">
          <div class="row">
            <strong>${letter.club}</strong>
            <span class="status-pill">${letter.status}</span>
          </div>
          <p>${letter.id} · PDF pronto para download.</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderMap() {
  return `
    ${renderHeader("Mapa")}
    <div class="scroll">
      <article class="card map-card">
        <h3>Mapa interativo do clube</h3>
        <p>Na PoC, os pontos de interesse são simulados; no app real, o mapa pode receber busca e rotas internas.</p>
        <img src="./assets/mapa_app_mapped.svg" alt="Mapa do Recreio da Juventude" />
      </article>
      ${["Portaria principal", "Secretaria", "Piscinas", "Quadras", "Recreio Life"].map((point) => `
        <article class="card compact row">
          <strong>${point}</strong>
          <button class="link-btn" data-action="route">Ver rota</button>
        </article>
      `).join("")}
    </div>
  `;
}

function renderAccount() {
  return `
    ${renderHeader("Minha Conta")}
    <div class="scroll">
      <article class="card">
        <div class="row">
          <span class="avatar">FA</span>
          <span class="status-pill">Associado ativo</span>
        </div>
        <h3>Fabricio Andreis</h3>
        <p>Dados cadastrais podem ir para análise antes de atualizar o sistema de origem.</p>
        <button class="secondary-btn" style="width: 100%; margin-top: 14px" data-sheet="edit-account">Editar dados</button>
      </article>
      <div class="section-title"><h3>Dependentes</h3><button class="link-btn" data-action="dependents">Editar</button></div>
      ${["Maria Andreis", "João Andreis"].map((name) => `
        <article class="card compact row">
          <strong>${name}</strong>
          <span class="status-pill">Ativo</span>
        </article>
      `).join("")}
      <button class="danger-btn" style="width: 100%" data-action="logout">Sair da conta</button>
    </div>
  `;
}

function renderNotifications() {
  return `
    ${renderHeader("Notificações")}
    <div class="scroll">
      <button class="secondary-btn" style="width: 100%; margin-bottom: 14px" data-action="read-all">Marcar todas como lidas</button>
      ${[
        ["Reserva confirmada", "Quiosque 12 confirmado para hoje às 18:30.", "Agora"],
        ["Boleto disponível", "Sua mensalidade de junho já pode ser paga.", "Ontem"],
        ["Evento recomendado", "Noite Italiana está com venda aberta.", "16/06"],
      ].map(([title, body, date], index) => `
        <article class="card compact">
          <div class="row">
            <strong>${title}</strong>
            <span class="status-pill ${index < state.notificationsUnread ? "warn" : ""}">${date}</span>
          </div>
          <p>${body}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderSupport() {
  return `
    ${renderHeader("Atendimento")}
    <div class="scroll">
      <article class="card">
        <span class="status-pill">Canal rápido</span>
        <h3>Falar pelo WhatsApp</h3>
        <p>Simula abertura do canal oficial detectado no legacy.</p>
        <button class="primary-btn" style="width: 100%; margin-top: 14px" data-action="whatsapp">Abrir WhatsApp</button>
      </article>
      <article class="card">
        <h3>Abrir chamado</h3>
        <p>Informe o assunto e gere um protocolo para atendimento do clube.</p>
        <button class="secondary-btn" style="width: 100%; margin-top: 14px" data-sheet="support-ticket">Criar protocolo</button>
      </article>
      <article class="card">
        <h3>Dúvidas frequentes</h3>
        <p>Reservas, cancelamentos, boletos, carteirinha e convênios em linguagem simples.</p>
      </article>
    </div>
  `;
}

function renderVisitors() {
  return `
    ${renderHeader("Visitantes")}
    <div class="scroll">
      <article class="card">
        <span class="status-pill">Convidado</span>
        <h3>Gerar código de acesso</h3>
        <p>Fluxo com motivo de acesso, dados mínimos e validade temporária.</p>
        <button class="primary-btn" style="width: 100%; margin-top: 14px" data-action="visitor-code">Gerar código</button>
      </article>
      <article class="card">
        <span class="status-pill">Evento esportivo</span>
        <h3>Festival de Natação</h3>
        <p>Lista de visitantes vinculada ao evento e ao associado responsável.</p>
      </article>
    </div>
  `;
}

function renderGenericModule(id) {
  const module = moduleById(id) || { title: "Módulo", subtitle: "Fluxo simulado", icon: "M" };
  return `
    ${renderHeader(module.title)}
    <div class="scroll">
      <article class="card">
        ${mark(module.icon)}
        <h3>${module.title}</h3>
        <p>${module.subtitle}. Este módulo está representado no menu da PoC e pode receber fluxo detalhado na próxima iteração.</p>
      </article>
    </div>
  `;
}

function renderHeader(title) {
  return `
    <header class="header">
      <button class="back-btn" data-go="home" aria-label="Voltar">‹</button>
      <h2>${title}</h2>
    </header>
  `;
}

function renderBottomNav() {
  const nav = [
    ["home", "H", "Home"],
    ["atendimento", "W", "WhatsApp"],
    ["notificacoes", "N", "Avisos"],
    ["conta", "U", "Conta"],
    ["menu", "M", "Menu"],
  ];
  return `
    <nav class="bottom-nav" aria-label="Navegação principal">
      ${nav.map(([id, icon, label]) => `
        <button class="${state.screen === id ? "active" : ""}" data-go="${id}">
          <span class="nav-icon">${icon}</span>
          <span>${label}${id === "notificacoes" && state.notificationsUnread ? ` (${state.notificationsUnread})` : ""}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderSheet() {
  if (!state.sheet) return "";
  const content = sheetContent(state.sheet);
  return `
    <div class="modal-backdrop" data-action="close-sheet">
      <section class="sheet" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
        <div class="sheet-handle"></div>
        ${content}
      </section>
    </div>
  `;
}

function sheetContent(type) {
  if (type === "forgot") {
    return `
      <h3>Recuperar senha</h3>
      <p>Informe o CPF para receber instruções. Quando houver múltiplos usuários, o app real deve permitir escolher o login correto.</p>
      <div class="field"><label>CPF</label><input placeholder="000.000.000-00" /></div>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="forgot">Enviar e-mail</button>
    `;
  }
  if (type === "shortcuts") {
    return `
      <h3>Meus atalhos</h3>
      <p>O legacy exige pelo menos 4 favoritos. A PoC mostra a nova edição em bottom sheet.</p>
      <div class="toggle-list">
        ${modules.slice(0, 8).map((item, index) => `
          <div class="toggle-item">
            <strong>${item.title}</strong>
            <button class="switch ${index < 6 ? "active" : ""}" data-action="toggle-shortcut" aria-label="Alternar ${item.title}"></button>
          </div>
        `).join("")}
      </div>
      <button class="primary-btn" style="width: 100%; margin-top: 14px" data-action="save-shortcuts">Salvar atalhos</button>
    `;
  }
  if (type === "guests") {
    return `
      <h3>Convidados</h3>
      <p>Adicione nome e CPF. A validação real verifica CPF, status de sócio e regras do espaço.</p>
      <div class="field"><label>Nome</label><input value="Convidado Demo" /></div>
      <div class="field"><label>CPF</label><input value="000.000.000-00" /></div>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="guest-added">Adicionar convidado</button>
    `;
  }
  if (type === "terms") {
    return `
      <h3>Termo de responsabilidade</h3>
      <p>Declaro estar ciente das regras de uso do espaço, política de cancelamento, convidados e responsabilidade por danos.</p>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="accept-terms">Li e aceito</button>
    `;
  }
  if (type === "invoice") {
    return `
      <h3>Pagar mensalidade</h3>
      <p>Escolha boleto ou cartão. Dados de cartão nunca devem ser logados nem persistidos no app.</p>
      ${summaryRow("Valor", "R$ 486,90")}
      ${summaryRow("Taxa cartão", "R$ 8,72")}
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="pay-card">Pagar com cartão</button>
      <button class="secondary-btn" style="width: 100%; margin-top: 8px" data-action="boleto">Gerar boleto</button>
    `;
  }
  if (type === "buy-ticket") {
    return `
      <h3>Comprar ingresso</h3>
      <p>Selecione titular, dependente, outro associado ou não sócio. A PoC compra um ingresso mockado.</p>
      <div class="field"><label>Portador</label><select><option>Fabricio Andreis</option><option>Dependente</option><option>Não sócio</option></select></div>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="buy-ticket">Finalizar pedido</button>
    `;
  }
  if (type === "tickets") {
    return `
      <h3>Meus ingressos</h3>
      ${state.tickets.map((ticket) => `<article class="card compact"><strong>${ticket.title}</strong><p>${ticket.holder} · ${ticket.date}</p></article>`).join("")}
    `;
  }
  if (type === "service-contract") {
    return `
      <h3>Contratar serviço</h3>
      <p>Fluxo reduzido: modalidade, usuário, frequência, horário e aceite de termos.</p>
      <div class="field"><label>Usuário</label><select><option>Fabricio Andreis</option><option>Maria Andreis</option></select></div>
      <div class="field"><label>Horário</label><select><option>Ter/Qui 18:00</option><option>Seg/Qua 07:00</option></select></div>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="contract-service">Contratar</button>
    `;
  }
  if (type === "assessment") {
    return `
      <h3>Agendar avaliação</h3>
      <div class="field"><label>Sede</label><select><option>Juventude</option><option>Guarany</option></select></div>
      <div class="field"><label>Professor</label><select><option>Ana</option><option>Carlos</option></select></div>
      <div class="field"><label>Horário</label><select><option>Amanhã, 10:00</option><option>Sexta, 16:00</option></select></div>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="assessment">Agendar</button>
    `;
  }
  if (type === "edit-account") {
    return `
      <h3>Editar dados</h3>
      <div class="field"><label>E-mail</label><input value="fabricio@example.com" /></div>
      <div class="field"><label>Telefone</label><input value="(51) 99999-0000" /></div>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="save-account">Enviar para análise</button>
    `;
  }
  if (type === "support-ticket") {
    return `
      <h3>Novo protocolo</h3>
      <div class="field"><label>Assunto</label><select><option>Reserva</option><option>Pagamento</option><option>Carteirinha</option></select></div>
      <div class="field"><label>Mensagem</label><input value="Preciso de ajuda com meu app." /></div>
      <button class="primary-btn" style="width: 100%; margin-top: 12px" data-action="support-ticket">Criar protocolo</button>
    `;
  }
  return `<h3>Detalhes</h3><p>Fluxo simulado da PoC.</p>`;
}

function summaryRow(label, value) {
  return `<div class="row"><span>${label}</span><strong>${value}</strong></div>`;
}

function bindEvents() {
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => go(button.dataset.go));
  });

  document.querySelectorAll("[data-sheet]").forEach((button) => {
    button.addEventListener("click", () => setState({ sheet: button.dataset.sheet }));
  });

  document.querySelectorAll("[data-reservation-tab]").forEach((button) => {
    button.addEventListener("click", () => setState({ reservationTab: button.dataset.reservationTab }));
  });

  document.querySelectorAll("[data-draft]").forEach((button) => {
    button.addEventListener("click", () => {
      state.reservationDraft[button.dataset.draft] = button.dataset.value;
      render();
    });
  });

  document.querySelectorAll("[data-draft-select]").forEach((select) => {
    select.addEventListener("change", () => {
      state.reservationDraft[select.dataset.draftSelect] = select.value;
      render();
    });
  });

  const loginForm = document.querySelector("[data-action='login']");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      setState({ loggedIn: true, screen: "home" });
    });
  }

  const search = document.querySelector("[data-action='search']");
  if (search) {
    search.addEventListener("input", (event) => {
      state.search = event.target.value;
      filterMenu(event.target.value);
    });
    filterMenu(search.value);
  }

  document.querySelectorAll("[data-action]").forEach((node) => {
    const action = node.dataset.action;
    if (["login", "search"].includes(action)) return;
    node.addEventListener("click", (event) => handleAction(action, event, node));
  });
}

function filterMenu(term) {
  const normalized = term.toLowerCase();
  document.querySelectorAll("[data-search-text]").forEach((item) => {
    const text = item.dataset.searchText.toLowerCase();
    item.style.display = text.includes(normalized) ? "" : "none";
  });
}

function handleAction(action, event, node) {
  if (action === "close-sheet") setState({ sheet: null });
  if (action === "reservation-next") setState({ reservationStep: Math.min(4, state.reservationStep + 1) });
  if (action === "reservation-prev") setState({ reservationStep: Math.max(0, state.reservationStep - 1) });
  if (action === "confirm-reservation") {
    const id = `RSV-${Math.floor(3000 + Math.random() * 5000)}`;
    state.reservations.unshift({
      id,
      title: state.reservationDraft.type,
      date: `${state.reservationDraft.date}, ${state.reservationDraft.time}`,
      status: "Confirmada",
      guests: state.reservationDraft.guests,
    });
    state.reservationTab = "mine";
    state.reservationStep = 0;
    toast(`Reserva ${id} confirmada com comprovante.`);
  }
  if (action === "cancel-reservation") {
    const id = node.dataset.id;
    state.reservations = state.reservations.filter((item) => item.id !== id);
    toast(`Reserva ${id} cancelada.`);
  }
  if (action === "copy-barcode") toast("Linha digitável copiada: 00190.00009...");
  if (action === "pay-card") {
    state.invoices[0].status = "Concluída";
    setState({ sheet: null });
    toast("Pagamento confirmado. Comprovante gerado.");
  }
  if (action === "boleto") {
    setState({ sheet: null });
    toast("Boleto gerado. PDF disponível para download.");
  }
  if (action === "buy-ticket") {
    state.tickets.unshift({ id: `TCK-${Math.floor(Math.random() * 90) + 10}`, title: "Noite Italiana", holder: "Fabricio Andreis", date: "28/06, 20:00" });
    setState({ sheet: null });
    toast("Ingresso comprado e QR liberado.");
  }
  if (action === "guest-added") {
    state.reservationDraft.guests += 1;
    setState({ sheet: null });
    toast("Convidado validado e adicionado.");
  }
  if (action === "accept-terms") {
    setState({ sheet: null });
    toast("Termo aceito para esta reserva.");
  }
  if (action === "forgot") {
    setState({ sheet: null });
    toast("E-mail de recuperação simulado enviado.");
  }
  if (action === "save-shortcuts") {
    setState({ sheet: null });
    toast("Atalhos salvos. Mínimo de 4 preservado.");
  }
  if (action === "toggle-shortcut") {
    node.classList.toggle("active");
  }
  if (action === "offline-wallet") toast("Carteirinha salva para modo offline seguro.");
  if (action === "access-code") toast(`Código RJ-${Math.floor(100000 + Math.random() * 899999)} válido por 15 minutos.`);
  if (action === "waitlist") toast("Preferência de aviso de vaga ativada.");
  if (action === "renew") toast("Rematrícula confirmada.");
  if (action === "contract-service") {
    setState({ sheet: null });
    toast("Serviço contratado. Comprovante enviado.");
  }
  if (action === "open-workout") toast("PDF de treino aberto em visualizador seguro.");
  if (action === "assessment") {
    setState({ sheet: null });
    toast("Avaliação física agendada.");
  }
  if (action === "letter") {
    state.letters.unshift({ id: `CV-${Math.floor(Math.random() * 700) + 300}`, club: "Clube Caixeiros Viajantes", status: "Válida até 30/06" });
    toast("Carta de convênio gerada.");
  }
  if (action === "route") toast("Rota interna simulada.");
  if (action === "save-account") {
    setState({ sheet: null });
    toast("Alteração enviada para análise.");
  }
  if (action === "dependents") toast("Edição de dependentes simulada.");
  if (action === "read-all") {
    state.notificationsUnread = 0;
    toast("Notificações marcadas como lidas.");
  }
  if (action === "whatsapp") toast("Abriria https://api.whatsapp.com/send?phone=555140421241");
  if (action === "support-ticket") {
    setState({ sheet: null });
    toast("Protocolo SAC-2026-184 criado.");
  }
  if (action === "visitor-code") toast(`Código de visitante VIS-${Math.floor(1000 + Math.random() * 8999)} gerado.`);
  if (action === "logout") setState({ loggedIn: false, screen: "welcome", sheet: null });
}

render();
