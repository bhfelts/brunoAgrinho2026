// --- VARIÁVEIS DO SISTEMA ---
let phAgua = 6.0;
let energiaSolar = 85;
let frequenciaLuz = 0.5; // 0.0 (total Azul) a 1.0 (total Vermelho)
let ventilacaoAberta = false;
let crescimentoPlanta = 10;

// Gráfico de linha em tempo real
let historicoPH = [];
let maxPontosGrafico = 40;

// Botões da interface (Objetos customizados)
let btnLuz, btnVentilacao;

function setup() {
  createCanvas(900, 600);
  
  // Inicializa histórico do gráfico com o valor atual
  for (let i = 0; i < maxPontosGrafico; i++) {
    historicoPH.push(phAgua);
  }

  // Definição das áreas dos botões interativos
  btnLuz = { x: 50, y: 480, w: 160, h: 40, label: "ALTERAR LED" };
  btnVentilacao = { x: 230, y: 480, w: 160, h: 40, label: "VENTILAÇÃO: FECHADA" };
}

function draw() {
  background(10, 15, 20); // Fundo escuro Cyberpunk
  
  // --- ATUALIZAÇÃO DA LÓGICA (SIMULAÇÃO) ---
  atualizarSimulacao();

  // --- INTERFACE VISUAL (DASHBOARD) ---
  desenharGradeFundo();
  desenharPainelDados();
  desenharGraficoPH();
  desenharControles();
  desenharEstufaVertical();
}

// Simulador em tempo real das dinâmicas da fazenda
function atualizarSimulacao() {
  // Flutuação natural do pH com ruído (Perlin Noise)
  let variacaoPH = map(noise(frameCount * 0.02), 0, 1, -0.05, 0.05);
  phAgua += variacaoPH;
  
  // Efeito da ventilação no pH/ambiente
  if (ventilacaoAberta) {
    phAgua -= 0.01; // Ventilação resfria/altera a química
  }
  phAgua = constrain(phAgua, 4.5, 8.5);

  // Adiciona ao histórico do gráfico de linhas
  historicoPH.push(phAgua);
  if (historicoPH.length > maxPontosGrafico) {
    historicoPH.shift();
  }

  // Flutuação da captação Solar
  energiaSolar = constrain(energiaSolar + random(-0.5, 0.5), 0, 100);

  // Lógica de crescimento da planta baseada no equilíbrio perfeito:
  // Melhor cenário: Luz mista (0.5), pH perto de 6.2 e ventilação ligada
  let condicaoLuz = 1 - abs(frequenciaLuz - 0.5); // Pico em 0.5
  let condicaoPH = 1 - abs(phAgua - 6.2) * 0.5;
  let condicaoVent = ventilacaoAberta ? 1.2 : 0.8;

  let taxaCrescimento = (condicaoLuz * condicaoPH * condicaoVent) * 0.1;
  crescimentoPlanta = constrain(crescimentoPlanta + taxaCrescimento, 10, 240);
}

// Estética cibernética de fundo
function desenharGradeFundo() {
  stroke(0, 255, 200, 20); // Linhas ciano translúcidas
  strokeWeight(1);
  for (let i = 0; i < width; i += 40) line(i, 0, i, height);
  for (let j = 0; j < height; j += 40) line(0, j, width, j);
}

function desenharPainelDados() {
  // Moldura do painel esquerdo
  noFill();
  stroke(0, 255, 200, 150);
  strokeWeight(2);
  rect(30, 30, 400, 540, 5);
  line(30, 80, 430, 80);

  // Título do Dashboard
  fill(0, 255, 200);
  noStroke();
  textSize(22);
  textFont('Courier New');
  text("FAZENDA VERTICAL // NEO-AGRO 2050", 45, 62);

  // Exibição de Métricas (Texto e Barras)
  textSize(16);
  
  // 1. pH da Água
  fill(255);
  text(`SISTEMA HIDROPÔNICO: pH ${phAgua.toFixed(2)}`, 50, 120);
  
  // 2. Energia Solar (Barra de Progresso)
  text(`CAPTAÇÃO ENERGIA SOLAR: ${Math.round(energiaSolar)}%`, 50, 280);
  fill(20, 40, 30);
  rect(50, 295, 360, 15);
  fill(0, 255, 100);
  rect(50, 295, map(energiaSolar, 0, 100, 0, 360), 15);

  // 3. Status do Espectro de Luz
  fill(255);
  text("ESPECTRO LED ATUAL:", 50, 350);
  // Desenha gradiente indicador de cor (Azul para Vermelho)
  for (let i = 0; i < 360; i++) {
    let interColor = lerpColor(color(0, 100, 255), color(255, 0, 100), i / 360);
    stroke(interColor);
    line(50 + i, 365, 50 + i, 380);
  }
  // Marcador da posição atual da frequência
  stroke(255);
  strokeWeight(3);
  noFill();
  rect(50 + (frequenciaLuz * 360) - 5, 362, 10, 21);
}

function desenharGraficoPH() {
  // Título interno do gráfico
  noStroke();
  fill(0, 255, 200);
  textSize(12);
  text("MONITORAMENTO DE pH EM TEMPO REAL", 50, 150);

  // Área do gráfico
  noFill();
  stroke(0, 255, 200, 50);
  rect(50, 160, 360, 90);

  // Desenho da linha do gráfico usando beginShape()
  stroke(0, 255, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < historicoPH.length; i++) {
    let x = map(i, 0, maxPontosGrafico - 1, 50, 410);
    // Mapeia o pH (de 4.5 a 8.5) para a altura do gráfico (de 240 a 170)
    let y = map(historicoPH[i], 4.5, 8.5, 240, 170);
    vertex(x, y);
  }
  endShape();
}

function desenharControles() {
  // Título da Seção de Comandos
  noStroke();
  fill(0, 255, 200);
  textSize(14);
  text("// ENGENHARIA DE COMANDOS", 50, 445);

  // Botão 1: Controle de Luz
  desenharBotao(btnLuz, color(0, 150, 255));

  // Botão 2: Controle de Ventilação (Muda de cor se ativo)
  let corVent = ventilacaoAberta ? color(0, 255, 100) : color(150, 50, 50);
  btnVentilacao.label = ventilacaoAberta ? "VENTILAÇÃO: ON" : "VENTILAÇÃO: OFF";
  desenharBotao(btnVentilacao, corVent);
}

function desenharBotao(btn, corGlow) {
  // Efeito de clique visual (Glow se passar o mouse)
  if (mouseX > btn.x && mouseX < btn.x + btn.w && mouseY > btn.y && mouseY < btn.y + btn.h) {
    stroke(corGlow);
    fill(corGlow.levels[0], corGlow.levels[1], corGlow.levels[2], 50);
  } else {
    stroke(corGlow.levels[0], corGlow.levels[1], corGlow.levels[2], 150);
    noFill();
  }
  strokeWeight(2);
  rect(btn.x, btn.y, btn.w, btn.h, 3);

  // Texto do botão
  noStroke();
  fill(255);
  textSize(11);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  textAlign(LEFT, BASELINE); // Reseta alinhamento
}

function desenharEstufaVertical() {
  // Painel Direito (Estufa Visual)
  noFill();
  stroke(255, 0, 150, 150); // Moldura Rosa Neon/Cyberpunk
  rect(460, 30, 410, 540, 5);
  
  fill(255, 0, 150);
  noStroke();
  textSize(18);
  text("CÂMARA DE CRESCIMENTO VERTICAL", 480, 62);

  // --- Efeito de Iluminação LED Dinâmica ---
  // Mistura a cor do LED de acordo com a variável 'frequenciaLuz'
  let corLED = lerpColor(color(0, 50, 255, 40), color(255, 0, 100, 40), frequenciaLuz);
  fill(corLED);
  rect(480, 90, 370, 450, 4);

  // Lâmpadas LED no topo da estufa
  for (let xLed = 500; xLed <= 830; xLed += 30) {
    let corLampada = lerpColor(color(0, 150, 255), color(255, 0, 150), frequenciaLuz);
    fill(corLampada);
    ellipse(xLed, 95, 15, 6);
  }

  // --- Desenho das Plantas Hidropônicas ---
  // Simulando 3 calhas verticais de cultivo
  for (let col = 0; col < 3; col++) {
    let posX = 540 + (col * 100);
    let posYBase = 500;

    // Calhas de PVC/Metal futurista
    stroke(100, 120, 140);
    strokeWeight(6);
    line(posX - 30, posYBase, posX + 30, posYBase);

    // O caule da planta cresce com base na variável global 'crescimentoPlanta'
    stroke(0, 200, 100);
    strokeWeight(4);
    noFill();
    
    // Efeito orgânico de crescimento usando curvas simples
    beginShape();
    vertex(posX, posYBase);
    vertex(posX - 10, posYBase - crescimentoPlanta * 0.3);
    vertex(posX + 5, posYBase - crescimentoPlanta * 0.6);
    vertex(posX, posYBase - crescimentoPlanta);
    endShape();

    // Folhas artificiais de neon
    noStroke();
    fill(0, 255, 150, 200);
    ellipse(posX, posYBase - crescimentoPlanta, 25, 15); // Folha topo
    if (crescimentoPlanta > 50) {
      ellipse(posX - 12, posYBase - crescimentoPlanta * 0.5, 20, 10);
      ellipse(posX + 10, posYBase - crescimentoPlanta * 0.3, 20, 10);
    }
  }

  // Indicador de Status da Ventilação na tela da estufa
  fill(255);
  textSize(12);
  if (ventilacaoAberta) {
    fill(0, 255, 100);
    text("▲ FLUXO DE AR: ATIVO", 480, 525);
  } else {
    fill(150, 150, 150);
    text("▼ FLUXO DE AR: RETIDO", 480, 525);
  }
}

// --- MECÂNICA DE INTERAÇÃO (CLIQUES) ---
function mousePressed() {
  // Verifica clique no Botão de Luz
  if (mouseX > btnLuz.x && mouseX < btnLuz.x + btnLuz.w && mouseY > btnLuz.y && mouseY < btnLuz.y + btnLuz.h) {
    // Altera ciclicamente entre espectro Azul, Misto e Vermelho
    frequenciaLuz += 0.25;
    if (frequenciaLuz > 1.0) frequenciaLuz = 0.0;
  }

  // Verifica clique no Botão de Ventilação
  if (mouseX > btnVentilacao.x && mouseX < btnVentilacao.x + btnVentilacao.w && mouseY > btnVentilacao.y && mouseY < btnVentilacao.y + btnVentilacao.h) {
    ventilacaoAberta = !ventilacaoAberta; // Alterna entre true/false
  }
}
