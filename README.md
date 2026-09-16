# ✠ Bússola Papal (Papal Compass)

Um teste de 50 proposições que posiciona sua eclesiologia num plano
cartesiano de duas dimensões:

- **Eixo Y** — Autoridade (+10) vs. Pastoralidade (−10)
- **Eixo X** — Tradição (−10) vs. Reforma (+10)

Ao final, um algoritmo de **distância euclidiana** cruza sua coordenada
com quinze pontífices históricos — de Gregório VII e Bonifácio VIII a
João Paulo II, Bento XVI e Francisco — para revelar qual deles mais se
aproxima do seu modo de pensar a Igreja, além de um arquétipo teológico
(com citação de um documento da Igreja) para o seu quadrante.

100% HTML, CSS e JavaScript puros — sem build step, sem dependências,
sem frameworks. Pronto para o GitHub Pages.

## Estrutura do projeto

```
papal-compass/
├── index.html   → As três telas: Início, Quiz, Resultado
├── style.css    → Design system barroco (pergaminho, carmesim, dourado)
├── script.js    → Banco de 50 perguntas, 15 papas, lógica de pontuação
│                  e renderização do gráfico via Canvas API
└── README.md    → Este arquivo
```

## Rodando localmente

Como não há build step, basta abrir `index.html` num navegador. Para
evitar eventuais restrições de `fetch`/fontes em `file://`, é mais
seguro servir a pasta com um servidor local simples:

```bash
cd papal-compass
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Publicando no GitHub Pages

### 1. Crie o repositório e envie o código

```bash
cd papal-compass
git init
git add .
git commit -m "Primeira versão da Bússola Papal"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/papal-compass.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu nome de usuário do GitHub, e
`papal-compass` pelo nome que você deu ao repositório.

### 2. Ative o GitHub Pages

1. No GitHub, abra o repositório e vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **Deploy from a
   branch**.
3. Em **Branch**, selecione `main` e a pasta `/ (root)` — já que
   `index.html` está na raiz do repositório.
4. Clique em **Save**.

### 3. Acesse o site

Depois de alguns minutos, o GitHub publica o endereço no topo da
página de Settings → Pages, geralmente no formato:

```
https://SEU-USUARIO.github.io/papal-compass/
```

### Atualizando o site depois de publicado

Qualquer novo `git push` para a branch `main` atualiza automaticamente
o site publicado:

```bash
git add .
git commit -m "Ajustes na Bússola Papal"
git push
```

## Personalizando

- **Perguntas:** edite o array `QUESTIONS` em `script.js`. Cada
  pergunta tem `{ text, x, y }`, onde `x` e `y` são o peso que a
  resposta "Concordo Fortemente" empurra nos eixos Reforma (x) e
  Autoridade (y). Valores negativos empurram para Tradição/Pastoralidade.
- **Papas:** edite o array `POPES`. Cada papa tem coordenadas fixas
  `{ x, y }`, uma citação e o intervalo de pontificado.
- **Arquétipos:** edite o array `ARCHETYPES` para mudar os títulos,
  descrições e citações de cada um dos quatro quadrantes.
- **Cores e tipografia:** todas as variáveis de design ficam no topo
  de `style.css`, em `:root` (`--parchment`, `--crimson`, `--gold`,
  `--charcoal`, e as famílias `--font-display` / `--font-body`).

## Notas teológicas

As citações de documentos da Igreja e de papas foram parafraseadas a
partir de encíclicas, bulas e discursos historicamente conhecidos, para
fins educativos e de entretenimento. Este é um exercício de
posicionamento espectral — como um "compass test" político — aplicado
à história eclesiástica, e não pretende ser um juízo teológico
definitivo sobre nenhuma figura histórica.
