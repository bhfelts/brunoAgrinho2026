# 🌿 Neo-Agro 2050 // Dashboard de Fazenda Vertical Urbana

![Licença](https://img.shields.io/badge/license-MIT-green)
![p5.js](https://img.shields.io/badge/p5.js-v1.4.0+-ED225D?logo=p5.js&logoColor=white)
![Estética](https://img.shields.io/badge/est%C3%A9tica-Cyberpunk%20%2F%20Neon-blueviolet)

Um simulador interativo e painel de controle futurista para uma fazenda vertical hidropônica urbana no ano de 2050. Desenvolvido inteiramente em **p5.js**, o projeto combina conceitos de automação agrícola sustentável, arte generativa e estética Cyberpunk.

> **Status do Projeto:** 🚀 Funcional / Pronto para Expansão

---

## 🛰️ Visão Geral

Nas megalópoles de 2050, o espaço horizontal é escasso e o clima é imprevisível. A solução? Fazendas Verticais Urbanas automatizadas. 

Este projeto simula o painel de controle de uma dessas câmaras de cultivo. O usuário assume o papel de um **Agro-Operador**, controlando variáveis críticas do ambiente (espectro de luz LED e ventilação) para otimizar a saúde e a taxa de crescimento de plantas hidropônicas virtuais em tempo real, enquanto monitora gráficos dinâmicos de pH e níveis de energia solar.

---

## 📊 Funcionalidades e Mecânicas

*   **Gráfico de pH em Tempo Real:** Utiliza algoritmos de ruído estruturado para simular flutuações químicas na água, renderizadas via `beginShape()`.
*   **Controle de Espectro de Luz LED:** Altere ciclicamente a frequência de iluminação entre Ultravioleta (Azul), Espectro Misto e Infravermelho (Vermelho). O ambiente visual reage mudando o gradiente de cor da estufa.
*   **Sistema de Ventilação Ativa:** Abrir as janelas de ventilação altera a dinâmica de resfriamento do sistema e impacta diretamente a química do pH do solo hidropônico.
*   **Lógica de Crescimento Orgânico:** As plantas utilizam uma matriz de decisão interna. Elas só atingem a taxa máxima de crescimento se o operador encontrar o equilíbrio ideal: *Luz mista (0.5), pH próximo a 6.2 e ventilação ligada*.

---

## 🛠️ Tecnologias Utilizadas

*   **[p5.js](https://p5js.org/):** Biblioteca Javascript para codificação criativa.
*   **Programação Orientada a Objetos (POO):** As plantas e os botões da interface possuem estruturas de dados independentes e modulares.
*   **Funções Matemáticas Avançadas:** Uso de `noise()` (Ruído Perlin), `map()` e `lerpColor()` para transições visuais fluidas e simulação realista.

---

## 🚀 Como Executar o Projeto

Você pode rodar este projeto de duas formas muito simples:

### Opção 1: Via p5.js Web Editor (Mais Rápido)
1. Acesse o [p5.js Web Editor](https://editor.p5js.org/).
2. Copie o código do arquivo `sketch.js` deste repositório.
3. Cole no editor web e clique no botão **Play (►)**.

### Opção 2: Localmente na sua Máquina
1. Clone este repositório:
```bash
   git clone [https://github.com/seu-usuario/neo-agro-2050.git](https://github.com/seu-usuario/neo-agro-2050.git)
