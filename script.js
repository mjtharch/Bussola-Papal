/* =====================================================================
   BÚSSOLA PAPAL — script.js
   Eixo X: Tradição (-10) ←→ Reforma (+10)
   Eixo Y: Pastoralidade (-10) ←→ Autoridade (+10)

   Cada pergunta tem pesos {x, y}. A resposta do usuário (de -2 a +2)
   multiplica esses pesos; a soma é normalizada pelo máximo teórico
   de cada eixo, resultando numa coordenada final entre -10 e +10.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. BANCO DE 50 PERGUNTAS
   --------------------------------------------------------------------- */
const QUESTIONS = [
  { text: "A infalibilidade papal, definida no Concílio Vaticano I, é um dogma essencial e inegociável da fé católica.", x: -1, y: 3 },
  { text: "O Syllabus dos Erros de Pio IX continua sendo um guia válido para julgar as ideologias modernas.", x: -3, y: 1 },
  { text: "A Missa deveria ser celebrada preferencialmente segundo o Rito Tridentino, em latim.", x: -3, y: 0 },
  { text: "O juramento antimodernista, exigido por São Pio X ao clero e aos professores, deveria ser restaurado hoje.", x: -2, y: 2 },
  { text: "A sinodalidade — um processo de escuta e discernimento compartilhado — é o caminho que Deus espera da Igreja neste tempo.", x: 3, y: -3 },
  { text: "Os bispos deveriam ter mais autonomia doutrinária em relação a Roma, conforme as realidades locais de suas igrejas.", x: 2, y: -3 },
  { text: "A Igreja deve ser vista, antes de tudo, como um 'hospital de campanha' que acolhe feridos, mais do que uma instituição que julga.", x: 1, y: -3 },
  { text: "É legítimo que a Igreja reconsidere, caso a caso, a disciplina sobre a comunhão para divorciados recasados.", x: 2, y: -2 },
  { text: "O Concílio Vaticano II representou uma renovação necessária e positiva diante de um mundo em transformação.", x: 3, y: -1 },
  { text: "O 'aggiornamento' de João XXIII foi, na prática, uma abertura arriscada que fragilizou certezas da Igreja.", x: -3, y: 1 },
  { text: "A liberdade religiosa, afirmada na declaração conciliar Dignitatis Humanae, é plenamente compatível com toda a Tradição católica anterior.", x: 2, y: 0 },
  { text: "O diálogo ecumênico com outras confissões cristãs deveria ser uma prioridade pastoral constante da Igreja.", x: 2, y: -1 },
  { text: "A Igreja Católica é a única e verdadeira Igreja de Cristo, e isso deve ser afirmado sem ambiguidades diplomáticas.", x: -2, y: 1 },
  { text: "A doutrina social da Igreja, iniciada com a Rerum Novarum, exige defender ativamente os direitos dos trabalhadores frente ao capital.", x: 1, y: 0 },
  { text: "Um capitalismo sem freios morais é tão condenável quanto um socialismo que nega Deus.", x: 0, y: -1 },
  { text: "João Paulo II acertou ao unir firmeza doutrinária com grande abertura evangelizadora ao mundo moderno.", x: 0, y: 2 },
  { text: "A 'hermenêutica da continuidade', proposta por Bento XVI, é a chave correta para interpretar o Concílio Vaticano II.", x: -2, y: 2 },
  { text: "O antigo Missal Romano jamais deveria ter sido praticamente abandonado nas paróquias após 1970.", x: -2, y: 0 },
  { text: "Summorum Pontificum, ao liberar amplamente a Missa tridentina, foi uma decisão sábia e pastoralmente generosa.", x: -1, y: -1 },
  { text: "As restrições recentes ao uso da Missa antiga foram necessárias para preservar a unidade litúrgica em torno do Novus Ordo.", x: 1, y: 1 },
  { text: "A forte centralização de poder em Roma, como na reforma gregoriana, foi necessária para libertar a Igreja da interferência de reis e senhores.", x: -2, y: 3 },
  { text: "Os papas medievais que reivindicaram autoridade também sobre reis e imperadores excederam os limites de sua missão espiritual.", x: 1, y: -2 },
  { text: "A bula Unam Sanctam, ao ensinar a submissão de toda criatura ao Romano Pontífice, expressa uma verdade permanente.", x: -2, y: 3 },
  { text: "O celibato clerical obrigatório deveria tornar-se opcional, permitindo a ordenação de 'viri probati' onde faltam padres.", x: 2, y: -1 },
  { text: "As mulheres deveriam ter papéis de maior liderança nas estruturas da Igreja, incluindo o acesso ao diaconato.", x: 2, y: -2 },
  { text: "A moral sexual ensinada em Humanae Vitae deve ser mantida integralmente, sem concessões pastorais que a relativizem.", x: -2, y: 2 },
  { text: "Um bom pastor acompanha cada pessoa em sua situação concreta, mesmo quando isso significa não aplicar de imediato a norma geral.", x: 1, y: -3 },
  { text: "A lei moral natural é imutável e deve ser ensinada com clareza, ainda que isso pareça duro aos ouvidos contemporâneos.", x: -2, y: 2 },
  { text: "Amoris Laetitia abriu um caminho pastoral valioso de discernimento diante da complexidade das situações familiares reais.", x: 2, y: -2 },
  { text: "A inculturação litúrgica, adaptando ritos e símbolos às culturas locais, deveria ser amplamente incentivada.", x: 2, y: -1 },
  { text: "A liturgia deveria manter uma forma essencialmente universal, com pouca variação entre regiões e culturas.", x: -2, y: 1 },
  { text: "Laudato Si', a encíclica de Francisco sobre a casa comum, representa um desenvolvimento legítimo da doutrina social católica.", x: 2, y: -1 },
  { text: "A Igreja tem se preocupado excessivamente com questões sociais e políticas, em detrimento da pregação da salvação das almas.", x: -2, y: 1 },
  { text: "O método histórico-crítico é uma ferramenta legítima e necessária para a correta interpretação das Sagradas Escrituras.", x: 2, y: -1 },
  { text: "Uma leitura mais literal e tradicional das Escrituras deve prevalecer sobre reinterpretações exegéticas modernas.", x: -2, y: 1 },
  { text: "A colegialidade episcopal deveria equilibrar mais o primado papal, como sugere a constituição Lumen Gentium.", x: 1, y: -2 },
  { text: "O primado de jurisdição do Papa sobre toda a Igreja é absoluto e não deve ser diluído por estruturas sinodais permanentes.", x: -1, y: 3 },
  { text: "As Conferências Episcopais nacionais deveriam receber maior autoridade doutrinária própria, sem depender de aprovação romana caso a caso.", x: 2, y: -2 },
  { text: "A Cúria Romana precisa de uma reforma estrutural profunda para servir melhor a uma Igreja mais sinodal e descentralizada.", x: 2, y: -2 },
  { text: "A pena de morte é sempre inadmissível, conforme a redação atual do Catecismo da Igreja Católica.", x: 2, y: -1 },
  { text: "A Igreja deveria evitar formulações que pareçam ceder às pautas ideológicas seculares contemporâneas sobre a pessoa humana.", x: -2, y: 1 },
  { text: "A acolhida pastoral de pessoas com orientação homossexual na Igreja deve ser mais calorosa e menos marcada pela condenação.", x: 2, y: -2 },
  { text: "A excomunhão e outras penas canônicas deveriam ser aplicadas com mais frequência diante de erros doutrinários públicos.", x: -2, y: 2 },
  { text: "A renúncia de um Papa, como a de Celestino V ou a de Bento XVI, é um ato legítimo de humildade, e não de fraqueza.", x: 1, y: -2 },
  { text: "Um Papa deveria permanecer no cargo até a morte, como sinal da firmeza e permanência do múnus petrino.", x: -1, y: 2 },
  { text: "A pobreza radical e a simplicidade de vida, como as buscadas por Celestino V, deveriam inspirar mais o estilo papal contemporâneo.", x: 1, y: -2 },
  { text: "A teologia escolástica clássica continua sendo a base mais sólida e segura para a formação teológica católica.", x: -2, y: 1 },
  { text: "Correntes teológicas do século XX, como a Nouvelle Théologie, trouxeram um enriquecimento necessário à reflexão católica.", x: 2, y: -1 },
  { text: "O cuidado com migrantes e refugiados deveria ser uma prioridade moral central para os católicos hoje.", x: 1, y: -1 },
  { text: "No fim das contas, a autoridade centralizada do sucessor de Pedro é a garantia mais segura da unidade e da verdade da Igreja.", x: -1, y: 3 },
];

/* ---------------------------------------------------------------------
   2. PANTEÃO DE PAPAS — coordenadas fixas + citação atribuída
   --------------------------------------------------------------------- */
const POPES = [
  { name: "Pio IX", years: "1846–1878", x: -9, y: 9,
    quote: "A tradição sou eu.", note: "(máxima atribuída, sobre a força do magistério pessoal)" },
  { name: "São Pio X", years: "1903–1914", x: -8, y: 7,
    quote: "Restaurar todas as coisas em Cristo.", note: "(seu lema papal, Instaurare omnia in Christo)" },
  { name: "João XXIII", years: "1958–1963", x: 6, y: -5,
    quote: "Abramos as janelas da Igreja para que o ar novo possa entrar.", note: "(frase associada à convocação do Vaticano II)" },
  { name: "Francisco", years: "2013–2025", x: 5, y: -9,
    quote: "Quem sou eu para julgar?", note: "(entrevista coletiva, 2013)" },
  { name: "Leão XIII", years: "1878–1903", x: 2, y: 2,
    quote: "Nem o capital pode prescindir do trabalho, nem o trabalho do capital.", note: "(Rerum Novarum, 1891, parafraseada)" },
  { name: "João Paulo II", years: "1978–2005", x: -2, y: 6,
    quote: "Não tenhais medo! Abri as portas a Cristo!", note: "(homilia de início de pontificado, 1978)" },
  { name: "Bento XVI", years: "2005–2013", x: -4, y: 5,
    quote: "A Igreja não faz proselitismo; ela cresce por atração.", note: "(homilia em Aparecida, 2007)" },
  { name: "Pio XI", years: "1922–1939", x: -3, y: 6,
    quote: "A paz de Cristo no Reino de Cristo.", note: "(lema da encíclica Quas Primas, 1925)" },
  { name: "Inocêncio III", years: "1198–1216", x: -6, y: 9,
    quote: "Assim como a lua recebe sua luz do sol, o poder real recebe do pontifical.", note: "(carta pontifícia, parafraseada)" },
  { name: "Paulo VI", years: "1963–1978", x: 5, y: 1,
    quote: "A Igreja deve entrar em diálogo com o mundo em que vive.", note: "(Ecclesiam Suam, 1964, parafraseada)" },
  { name: "João Paulo I", years: "1978", x: 3, y: -4,
    quote: "Deus é pai; mais ainda, é mãe.", note: "(catequese do Angelus, setembro de 1978)" },
  { name: "Celestino V", years: "1294", x: 0, y: -9,
    quote: "Desejo apenas a paz e a salvação da minha alma.", note: "(espírito atribuído à sua renúncia)" },
  { name: "Gregório VII", years: "1073–1085", x: -7, y: 9,
    quote: "Amei a justiça e odiei a iniquidade; por isso morro no exílio.", note: "(suas últimas palavras, segundo a tradição)" },
  { name: "Pio XII", years: "1939–1958", x: -5, y: 7,
    quote: "Definimos ser dogma divinamente revelado a Assunção de Maria ao céu.", note: "(Munificentissimus Deus, 1950, parafraseada)" },
  { name: "Bonifácio VIII", years: "1294–1303", x: -7, y: 10,
    quote: "É necessário à salvação que toda criatura esteja sujeita ao Romano Pontífice.", note: "(Unam Sanctam, 1302, parafraseada)" },
];

/* ---------------------------------------------------------------------
   3. ARQUÉTIPOS DE QUADRANTE
   --------------------------------------------------------------------- */
const ARCHETYPES = [
  { id: "auth-trad", xSign: -1, ySign: 1,
    title: "O Cruzado Dogmático",
    desc: "Sua bússola aponta para a centralização e a certeza. Você entende a Igreja primeiro como guardiã de uma verdade recebida, não inventada, e vê na autoridade do magistério — e não no consenso do momento — a garantia contra o erro. Rito, disciplina e clareza doutrinária não são obstáculos à fé: são sua armadura.",
    churchQuote: "O Romano Pontífice possui a infalibilidade quando define, como pastor de todos, doutrina sobre fé ou costumes.",
    churchSource: "Pastor Aeternus, Concílio Vaticano I, 1870 (parafraseada)" },
  { id: "auth-reform", xSign: 1, ySign: 1,
    title: "O Reformador Radical",
    desc: "Você acredita que a Igreja pode e deve mudar — mas não por consenso disperso, e sim por decisão firme de quem tem autoridade para conduzir a mudança. Admira papas que impuseram reformas de cima para baixo, convencido de que sem um centro forte a renovação vira dispersão.",
    churchQuote: "A reforma da liturgia deve ser conduzida com prudência, sob a autoridade legítima da Igreja.",
    churchSource: "Sacrosanctum Concilium, Concílio Vaticano II, 1963 (parafraseada)" },
  { id: "past-reform", xSign: 1, ySign: -1,
    title: "O Pastor Conciliador",
    desc: "Sua bússola aponta para a escuta, o discernimento e a periferia. Você entende a Igreja como sinal e instrumento de misericórdia antes de tribunal de normas, e acredita que a verdade se anuncia melhor pelo encontro do que pela imposição. A sinodalidade não é moda: é, para você, o próprio modo de ser Igreja hoje.",
    churchQuote: "As alegrias e as esperanças dos homens de hoje são também alegrias e esperanças dos discípulos de Cristo.",
    churchSource: "Gaudium et Spes, Concílio Vaticano II, 1965 (parafraseada)" },
  { id: "past-trad", xSign: -1, ySign: -1,
    title: "O Monge Tradicionalista",
    desc: "Você ama a beleza antiga — o latim, o silêncio, os ritos que atravessaram séculos — mas não deseja impô-la a ninguém pela força da lei. Sua religiosidade é pessoal, contemplativa e desconfiada tanto do experimentalismo litúrgico quanto do autoritarismo eclesiástico. A tradição, para você, se guarda pelo exemplo, não pelo decreto.",
    churchQuote: "O Missal Romano anterior nunca foi juridicamente abolido; deve ser tratado como um tesouro a preservar.",
    churchSource: "Summorum Pontificum, Bento XVI, 2007 (parafraseada)" },
];

/* ---------------------------------------------------------------------
   4. ESTADO E NAVEGAÇÃO
   --------------------------------------------------------------------- */
const state = {
  current: 0,
  answers: new Array(QUESTIONS.length).fill(null),
};

const el = {
  screens: {
    start: document.getElementById("screen-start"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
  },
  btnStart: document.getElementById("btn-start"),
  btnBack: document.getElementById("btn-back"),
  btnRestart: document.getElementById("btn-restart"),
  btnShare: document.getElementById("btn-share"),
  qCurrent: document.getElementById("q-current"),
  qTotal: document.getElementById("q-total"),
  qText: document.getElementById("q-text"),
  qOptions: document.getElementById("q-options"),
  progressFill: document.getElementById("progress-fill"),
  progressTrack: document.getElementById("progress-track"),
  resultTitle: document.getElementById("result-title"),
  resultCoords: document.getElementById("result-coords"),
  resultDesc: document.getElementById("result-desc"),
  churchQuote: document.getElementById("result-church-quote"),
  churchSource: document.getElementById("result-church-source"),
  popeName: document.getElementById("result-pope-name"),
  popeYears: document.getElementById("result-pope-years"),
  popeQuote: document.getElementById("result-pope-quote"),
  popeDistance: document.getElementById("result-pope-distance"),
  canvas: document.getElementById("compass-canvas"),
};

el.qTotal.textContent = QUESTIONS.length;

function showScreen(name){
  Object.values(el.screens).forEach(s => s.classList.remove("is-active"));
  el.screens[name].classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion(){
  const q = QUESTIONS[state.current];
  el.qCurrent.textContent = state.current + 1;
  el.qText.textContent = q.text;
  el.progressFill.style.width = ((state.current) / QUESTIONS.length * 100) + "%";
  el.progressTrack.setAttribute("aria-valuenow", Math.round(state.current / QUESTIONS.length * 100));

  const answered = state.answers[state.current];
  document.querySelectorAll(".opt-btn").forEach(btn => {
    btn.classList.toggle("is-selected", answered !== null && Number(btn.dataset.value) === answered);
  });

  el.btnBack.style.visibility = state.current === 0 ? "hidden" : "visible";
}

function answerCurrent(value){
  state.answers[state.current] = value;
  if (state.current < QUESTIONS.length - 1){
    state.current += 1;
    renderQuestion();
  } else {
    computeResult();
    showScreen("result");
  }
}

el.qOptions.addEventListener("click", (e) => {
  const btn = e.target.closest(".opt-btn");
  if (!btn) return;
  answerCurrent(Number(btn.dataset.value));
});

el.btnBack.addEventListener("click", () => {
  if (state.current === 0) return;
  state.current -= 1;
  renderQuestion();
});

el.btnStart.addEventListener("click", () => {
  state.current = 0;
  state.answers.fill(null);
  renderQuestion();
  showScreen("quiz");
});

el.btnRestart.addEventListener("click", () => {
  state.current = 0;
  state.answers.fill(null);
  renderQuestion();
  showScreen("quiz");
});

el.btnShare.addEventListener("click", () => {
  const text = `${el.resultTitle.textContent} — ${el.resultCoords.textContent} — Bússola Papal`;
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(() => {
      el.btnShare.textContent = "Copiado!";
      setTimeout(() => { el.btnShare.textContent = "Copiar resultado"; }, 1800);
    }).catch(() => { window.prompt("Copie seu resultado:", text); });
  } else {
    window.prompt("Copie seu resultado:", text);
  }
});

/* ---------------------------------------------------------------------
   5. CÁLCULO DA PONTUAÇÃO
   --------------------------------------------------------------------- */
function computeScore(){
  let rawX = 0, rawY = 0, maxX = 0, maxY = 0;
  QUESTIONS.forEach((q, i) => {
    const v = state.answers[i] ?? 0;
    rawX += v * q.x;
    rawY += v * q.y;
    maxX += Math.abs(q.x) * 2;
    maxY += Math.abs(q.y) * 2;
  });
  const x = maxX ? clamp((rawX / maxX) * 10, -10, 10) : 0;
  const y = maxY ? clamp((rawY / maxY) * 10, -10, 10) : 0;
  return { x, y };
}

function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

function euclideanDistance(ax, ay, bx, by){
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
}

function closestPope(x, y){
  let best = null, bestDist = Infinity;
  POPES.forEach(p => {
    const d = euclideanDistance(x, y, p.x, p.y);
    if (d < bestDist){ bestDist = d; best = p; }
  });
  return { pope: best, distance: bestDist };
}

function matchArchetype(x, y){
  const xSign = x >= 0 ? 1 : -1;
  const ySign = y >= 0 ? 1 : -1;
  return ARCHETYPES.find(a => a.xSign === xSign && a.ySign === ySign) || ARCHETYPES[0];
}

/* ---------------------------------------------------------------------
   6. MONTAGEM DA TELA DE RESULTADO
   --------------------------------------------------------------------- */
function computeResult(){
  const { x, y } = computeScore();
  const archetype = matchArchetype(x, y);
  const { pope, distance } = closestPope(x, y);

  el.resultTitle.textContent = archetype.title;
  el.resultCoords.textContent = `Tradição/Reforma: ${x.toFixed(1)} · Pastoralidade/Autoridade: ${y.toFixed(1)}`;
  el.resultDesc.textContent = archetype.desc;
  el.churchQuote.textContent = "“" + archetype.churchQuote + "”";
  el.churchSource.textContent = "— " + archetype.churchSource;

  el.popeName.textContent = pope.name;
  el.popeYears.textContent = pope.years;
  el.popeQuote.textContent = "“" + pope.quote + "” " + pope.note;
  el.popeDistance.textContent = distance.toFixed(2);

  drawCompass(x, y, pope);
}

/* ---------------------------------------------------------------------
   7. RENDERIZAÇÃO DO GRÁFICO (Canvas API)
   --------------------------------------------------------------------- */
function drawCompass(userX, userY, nearestPope){
  const canvas = el.canvas;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const pad = 56;
  const plot = W - pad * 2;

  const toPx = (vx, vy) => ({
    px: pad + ((vx + 10) / 20) * plot,
    py: pad + ((10 - vy) / 20) * plot,
  });

  ctx.clearRect(0, 0, W, H);

  // fundo pergaminho
  ctx.fillStyle = "#efe2ba";
  ctx.fillRect(0, 0, W, H);

  // grade
  ctx.strokeStyle = "rgba(74,13,24,0.12)";
  ctx.lineWidth = 1;
  for (let v = -10; v <= 10; v += 2){
    const { px } = toPx(v, 0);
    const { py } = toPx(0, v);
    ctx.beginPath(); ctx.moveTo(px, pad); ctx.lineTo(px, H - pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad, py); ctx.lineTo(W - pad, py); ctx.stroke();
  }

  // moldura do plot
  ctx.strokeStyle = "#a9822c";
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, plot, plot);

  // eixos centrais
  const center = toPx(0, 0);
  ctx.strokeStyle = "#6e1423";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(pad, center.py); ctx.lineTo(W - pad, center.py); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(center.px, pad); ctx.lineTo(center.px, H - pad); ctx.stroke();

  // rótulos dos eixos
  ctx.fillStyle = "#4a0d18";
  ctx.font = "600 15px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.fillText("AUTORIDADE", W / 2, pad - 24);
  ctx.fillText("PASTORALIDADE", W / 2, H - pad + 38);
  ctx.save();
  ctx.translate(pad - 34, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("TRADIÇÃO", 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(W - pad + 34, H / 2);
  ctx.rotate(Math.PI / 2);
  ctx.fillText("REFORMA", 0, 0);
  ctx.restore();

  // papas
  POPES.forEach(p => {
    const { px, py } = toPx(p.x, p.y);
    const isNearest = nearestPope && p.name === nearestPope.name;

    ctx.beginPath();
    ctx.arc(px, py, isNearest ? 8 : 6, 0, Math.PI * 2);
    ctx.fillStyle = isNearest ? "#8f1f31" : "#a9822c";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#2e2013";
    ctx.stroke();

    ctx.fillStyle = "#2e2013";
    ctx.font = isNearest ? "700 12px Merriweather, serif" : "12px Merriweather, serif";
    ctx.textAlign = px > W - 120 ? "right" : "left";
    ctx.fillText(p.name, px + (px > W - 120 ? -10 : 10), py + 4);
  });

  // usuário
  const u = toPx(userX, userY);
  ctx.save();
  ctx.translate(u.px, u.py);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "#6e1423";
  ctx.strokeStyle = "#e3cd8e";
  ctx.lineWidth = 2;
  ctx.fillRect(-10, -10, 20, 20);
  ctx.strokeRect(-10, -10, 20, 20);
  ctx.restore();

  ctx.fillStyle = "#241b12";
  ctx.font = "700 13px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.fillText("VOCÊ", u.px, u.py - 18);
}

/* ---------------------------------------------------------------------
   8. INÍCIO
   --------------------------------------------------------------------- */
renderQuestion();
