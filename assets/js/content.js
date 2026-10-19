/* ==========================================================================
   Portfolio content — every word on the site lives here, in English (en)
   and Brazilian Portuguese (pt). Edit text here; app.js renders it.
   Images live in assets/img/. Keep both languages in sync.

   Writing rules: first person, plain and specific. Say what was done and
   why. No slogans, no "lessons", no numbers that can't be backed up.
   ========================================================================== */
window.CONTENT = {
  person: {
    name: 'Victor Mascaro',
    email: 'viktor.mascaro@gmail.com',
    linkedin: 'https://www.linkedin.com/in/viktor-mascaro/',
    github: 'https://github.com/victor-mascaro-ux',
    cv: { en: 'assets/cv/Victor-Mascaro-CV-EN.pdf', pt: 'assets/cv/Victor-Mascaro-CV-PT.pdf' }
  },

  /* ---------- Interface strings ---------- */
  ui: {
    en: {
      'meta.title': 'Victor Mascaro · UX/UI Designer',
      'meta.desc': 'UX/UI designer in São Paulo with a background in game design. Currently working on Knomee, a fintech product for financial advisors.',
      'skip': 'Skip to content',
      'nav.work': 'Work', 'nav.process': 'Process', 'nav.experience': 'Experience', 'nav.skills': 'Education', 'nav.contact': 'Contact',
      'nav.menu': 'Menu', 'nav.close': 'Close menu',
      'hud.lang': 'EN, switch to Portuguese', 'hud.langShort': 'EN',
      'hud.themeDark': 'Switch to dark theme', 'hud.themeLight': 'Switch to light theme',
      'hud.xp': 'Quest log', 'hud.level': 'Lv',

      'hero.eyebrow': 'Victor Mascaro · São Paulo',
      'hero.title.a': 'UX/UI designer with a background in ',
      'hero.title.b': 'game design.',
      'hero.lede': 'For the last two years I’ve been designing Knomee, a fintech product for financial advisors and their clients. I design for AI and with it, from a voice shortcut in the client app to the prototypes I build in code with Claude Code. Before that I worked on mobile games like Smashing Four and Auction City, mostly on progression, events and onboarding.',
      'hero.tabs': 'Sections',
      'hero.tab.work': 'Knomee, Betsie and mobile games', 'hero.tab.process': 'How I work, step by step', 'hero.tab.experience': 'Where I’ve worked since 2021', 'hero.tab.skills': 'Degrees and courses', 'hero.tab.contact': 'Email, LinkedIn and CV',

      'card.rarity': 'Player card',
      'card.class': 'UX/UI Designer',
      'card.subclass': 'Gamification, game systems and AI',
      'card.level': 'Lv. 5',
      'card.levelHint': '5 years of work since 2021',
      'card.base': 'Based in', 'card.baseV': 'São Paulo, Brazil (UTC−3)',
      'card.works': 'Works', 'card.worksV': 'Remotely',
      'card.langs': 'Languages', 'card.langsV': 'Portuguese, English',
      'card.status': 'Status', 'card.statusV': 'Open to remote freelance work',
      'card.loadout': 'Tools',
      'card.cv': 'Download CV',

      'short.title': 'In short',
      'short.1.v': '5 yrs', 'short.1.l': 'working in game and product design, since 2021',
      'short.2.v': '6', 'short.2.l': 'commercial games and apps I’ve worked on',
      'short.3.v': '4', 'short.3.l': 'live-service mobile games at By Aliens',
      'short.4.v': '643', 'short.4.l': 'merged pull requests on the Knomee prototype, which I design and build with Claude Code',

      'work.eyebrow': 'Work',
      'work.title': 'Selected projects',
      'work.lede': 'Each project has a short write-up: the context, what I did, and the result when there is one I can share.',
      'work.knomee.title': 'UX/UI',
      'work.knomee.meta': 'Knomee · 2024 to now',
      'work.knomee.lede': 'Knomee helps financial advisors get to know their clients before the first meeting. I work on both sides of the product: the app clients fill in and the dashboard advisors use. I design its AI features, like a voice shortcut in the client app, and build the prototype with AI.',
      'work.games.title': 'Mobile games',
      'work.games.meta': 'By Aliens and Lumen Games · 2021 to 2025',
      'work.games.lede': 'At By Aliens I was a game and UX designer on four live games, working mostly on systems, economy, events and onboarding. Before that, I was producer and game designer on Hemp Paradise at Lumen Games.',
      'work.gamification.title': 'Gamification',
      'work.gamification.meta': 'Betsie · 2024',
      'work.side.title': 'University projects and game jams',
      'work.side.lede': 'Games I made during my game design degree, alone or in small teams.',
      'work.read': 'Read', 'work.min': 'min', 'work.open': 'Read',

      'process.eyebrow': 'Process',
      'process.title': 'How I work',
      'process.lede': 'Roughly the steps I follow on most projects.',
      'process.example': 'Example',

      'exp.eyebrow': 'Experience',
      'exp.title': 'Where I’ve worked',
      'exp.cv': 'Full CV (PDF)',

      'skills.eyebrow': 'Education',
      'skills.title': 'Education and courses',
      'skills.lede': 'Laid out as a skill tree, because I come from games. Click an item to see what it covered.',
      'skills.done': 'Completed', 'skills.progress': 'In progress', 'skills.grade': 'Final grade',
      'skills.core': 'What it covered', 'skills.certs': 'Courses',
      'skills.more': 'Shorter courses',
      'skills.select': 'Select an item to see the details.',

      'contact.eyebrow': 'Contact',
      'contact.title': 'Let’s talk',
      'contact.lede': 'I’m open to remote freelance projects. Email is the best way to reach me.',
      'contact.copy': 'Copy email', 'contact.copied': 'Email copied',
      'contact.copyFail': 'Select the address above to copy it',
      'contact.linkedin': 'LinkedIn', 'contact.github': 'GitHub', 'contact.cv': 'Download CV',
      'contact.where': 'Based in São Paulo (UTC−3). I’ve worked with teams in Brazil, the US and the UAE.',

      'footer.colophon': 'I designed and built this site with help from Claude Code. It’s plain HTML, CSS and JavaScript on GitHub Pages, with no cookies or tracking.',
      'footer.patch': 'Changelog',
      'footer.patch.v': 'v1.3 · October 2026',
      'footer.patch.items': ['New colors', 'Rewrote the copy', 'Animations', 'Quest log', 'Portuguese version'],
      'footer.top': 'Back to home', 'tabs.more': 'Keep exploring', 'tabs.next': 'Next', 'tabs.here': 'You’re here',

      'case.close': 'Close', 'case.prev': 'Previous', 'case.next': 'Next project',
      'case.role': 'Role', 'case.when': 'When', 'case.platform': 'Platform', 'case.context': 'Context',
      'case.problem': 'Context', 'case.moves': 'What I did', 'case.outcome': 'Result', 'case.learned': 'Notes',
      'case.live': 'Open the live version', 'case.evolution': 'Earlier version',
      'case.before': 'Before', 'case.after': 'After', 'case.compare': 'Drag to compare, or press a label to see that version in full',
      'case.film': 'Pick a frame to jump to that moment in the video', 'case.frame': 'Frame', 'case.play': 'Play the video', 'case.videoTitle': 'Knomee product video', 'lightbox.close': 'Close',
      'case.end': 'End',
      'case.measured': 'Measured', 'case.projected': 'Projected', 'case.estimated': 'Estimated',

      'quest.title': 'Quest log', 'quest.xp': 'XP',
      'quest.lede': 'You earn XP for looking around. It’s just for fun and nothing is locked.',
      'quest.locked': 'Not yet', 'quest.secret': 'Secret',
      'quest.reset': 'Reset', 'quest.hide': 'Turn off XP', 'quest.show': 'Turn on XP',
      'quest.close': 'Close quest log',
      'quest.unlocked': 'Achievement', 'quest.levelUp': 'Level up',
      'quest.max': 'That’s everything. If you got this far, we should talk.',
      'levels': ['Visitor', 'Explorer', 'Insider', 'Friend'],

      'toast.lang': 'Page in English', 'toast.theme': 'Theme changed'
    },
    pt: {
      'meta.title': 'Victor Mascaro · UX/UI Designer',
      'meta.desc': 'UX/UI designer em São Paulo, com background em game design. Hoje trabalho na Knomee, uma fintech para assessores financeiros.',
      'skip': 'Pular para o conteúdo',
      'nav.work': 'Trabalhos', 'nav.process': 'Processo', 'nav.experience': 'Experiência', 'nav.skills': 'Formação', 'nav.contact': 'Contato',
      'nav.menu': 'Menu', 'nav.close': 'Fechar menu',
      'hud.lang': 'PT, mudar para inglês', 'hud.langShort': 'PT',
      'hud.themeDark': 'Ativar tema escuro', 'hud.themeLight': 'Ativar tema claro',
      'hud.xp': 'Diário de missões', 'hud.level': 'Nv',

      'hero.eyebrow': 'Victor Mascaro · São Paulo',
      'hero.title.a': 'UX/UI designer com background em ',
      'hero.title.b': 'game design.',
      'hero.lede': 'Há dois anos faço o design da Knomee, uma fintech para assessores financeiros e os clientes deles. Desenho para IA e com IA, de um atalho de voz no app do cliente aos protótipos que construo em código com o Claude Code. Antes disso, trabalhei com jogos mobile como Smashing Four e Auction City, principalmente em progressão, eventos e onboarding.',
      'hero.tabs': 'Seções',
      'hero.tab.work': 'Knomee, Betsie e jogos mobile', 'hero.tab.process': 'Como eu trabalho, passo a passo', 'hero.tab.experience': 'Onde trabalhei desde 2021', 'hero.tab.skills': 'Graduação e cursos', 'hero.tab.contact': 'E-mail, LinkedIn e CV',

      'card.rarity': 'Ficha do jogador',
      'card.class': 'UX/UI Designer',
      'card.subclass': 'Gamificação, sistemas de jogo e IA',
      'card.level': 'Nv. 5',
      'card.levelHint': '5 anos de carreira, desde 2021',
      'card.base': 'Base', 'card.baseV': 'São Paulo (UTC−3)',
      'card.works': 'Modelo', 'card.worksV': 'Remoto',
      'card.langs': 'Idiomas', 'card.langsV': 'Português, inglês',
      'card.status': 'Status', 'card.statusV': 'Aberto a freelas remotos',
      'card.loadout': 'Ferramentas',
      'card.cv': 'Baixar CV',

      'short.title': 'Em resumo',
      'short.1.v': '5 anos', 'short.1.l': 'de experiência em game design e design de produto, desde 2021',
      'short.2.v': '6', 'short.2.l': 'jogos e apps comerciais em que trabalhei',
      'short.3.v': '4', 'short.3.l': 'jogos mobile live-service na By Aliens',
      'short.4.v': '643', 'short.4.l': 'pull requests mergeados no protótipo da Knomee, que eu desenho e desenvolvo com o Claude Code',

      'work.eyebrow': 'Trabalhos',
      'work.title': 'Projetos selecionados',
      'work.lede': 'Cada projeto tem um resumo curto: o contexto, o que eu fiz e o resultado, quando posso compartilhar.',
      'work.knomee.title': 'UX/UI',
      'work.knomee.meta': 'Knomee · 2024 até hoje',
      'work.knomee.lede': 'A Knomee ajuda assessores financeiros a conhecer os clientes antes da primeira reunião. Trabalho nos dois lados do produto: o app que o cliente preenche e o dashboard que o assessor usa. Desenho as funcionalidades de IA, como um atalho de voz no app do cliente, e construo o protótipo com IA.',
      'work.games.title': 'Jogos mobile',
      'work.games.meta': 'By Aliens e Lumen Games · 2021 a 2025',
      'work.games.lede': 'Na By Aliens, fui game e UX designer em quatro jogos live, principalmente em sistemas, economia, eventos e onboarding. Antes disso, fui produtor e game designer do Hemp Paradise na Lumen Games.',
      'work.gamification.title': 'Gamificação',
      'work.gamification.meta': 'Betsie · 2024',
      'work.side.title': 'Projetos da faculdade e game jams',
      'work.side.lede': 'Jogos que fiz na faculdade de game design, sozinho ou em grupos pequenos.',
      'work.read': 'Ler', 'work.min': 'min', 'work.open': 'Ler',

      'process.eyebrow': 'Processo',
      'process.title': 'Como eu trabalho',
      'process.lede': 'Os passos que costumo seguir na maioria dos projetos.',
      'process.example': 'Na prática',

      'exp.eyebrow': 'Experiência',
      'exp.title': 'Onde trabalhei',
      'exp.cv': 'CV completo (PDF)',

      'skills.eyebrow': 'Formação',
      'skills.title': 'Formação e cursos',
      'skills.lede': 'Organizei como uma árvore de habilidades, já que venho dos games. Clique num item para ver o que estudei.',
      'skills.done': 'Concluído', 'skills.progress': 'Em andamento', 'skills.grade': 'Nota final',
      'skills.core': 'O que estudei', 'skills.certs': 'Disciplinas',
      'skills.more': 'Cursos livres',
      'skills.select': 'Selecione um item para ver os detalhes.',

      'contact.eyebrow': 'Contato',
      'contact.title': 'Vamos conversar',
      'contact.lede': 'Estou aberto a freelas remotos. O melhor jeito de falar comigo é por e-mail.',
      'contact.copy': 'Copiar e-mail', 'contact.copied': 'E-mail copiado',
      'contact.copyFail': 'Selecione o endereço acima para copiar',
      'contact.linkedin': 'LinkedIn', 'contact.github': 'GitHub', 'contact.cv': 'Baixar CV',
      'contact.where': 'Estou em São Paulo (UTC−3) e já trabalhei com times do Brasil, dos EUA e dos Emirados Árabes.',

      'footer.colophon': 'Desenhei e desenvolvi este site com a ajuda do Claude Code. É HTML, CSS e JavaScript puro no GitHub Pages, sem cookies nem rastreamento.',
      'footer.patch': 'Patch notes',
      'footer.patch.v': 'v1.3 · outubro de 2026',
      'footer.patch.items': ['Novas cores', 'Textos reescritos', 'Animações', 'Diário de missões', 'Versão em português'],
      'footer.top': 'Voltar ao início', 'tabs.more': 'Continue explorando', 'tabs.next': 'Próximo', 'tabs.here': 'Você está aqui',

      'case.close': 'Fechar', 'case.prev': 'Anterior', 'case.next': 'Próximo projeto',
      'case.role': 'Função', 'case.when': 'Período', 'case.platform': 'Plataforma', 'case.context': 'Contexto',
      'case.problem': 'Contexto', 'case.moves': 'O que eu fiz', 'case.outcome': 'Resultado', 'case.learned': 'Observações',
      'case.live': 'Ver no ar', 'case.evolution': 'Versão anterior',
      'case.before': 'Antes', 'case.after': 'Depois', 'case.compare': 'Arraste para comparar, ou toque num rótulo para ver aquela versão inteira',
      'case.film': 'Escolha um frame para pular até esse momento do vídeo', 'case.frame': 'Frame', 'case.play': 'Assistir ao vídeo', 'case.videoTitle': 'Vídeo do produto da Knomee', 'lightbox.close': 'Fechar',
      'case.end': 'Fim',
      'case.measured': 'Medido', 'case.projected': 'Projetado', 'case.estimated': 'Estimado',

      'quest.title': 'Diário de missões', 'quest.xp': 'XP',
      'quest.lede': 'Você ganha XP explorando o site. É só de brincadeira, e nada fica bloqueado.',
      'quest.locked': 'Ainda não', 'quest.secret': 'Secreta',
      'quest.reset': 'Resetar', 'quest.hide': 'Desligar XP', 'quest.show': 'Ligar XP',
      'quest.close': 'Fechar diário de missões',
      'quest.unlocked': 'Conquista', 'quest.levelUp': 'Subiu de nível',
      'quest.max': 'Você viu tudo. Se chegou até aqui, a gente devia conversar.',
      'levels': ['Visitante', 'Explorador', 'De casa', 'Amigo'],

      'toast.lang': 'Página em português', 'toast.theme': 'Tema alterado'
    }
  },

  /* ---------- Tools on the hero card ---------- */
  loadout: {
    en: ['Figma', 'Claude Code', 'Claude Design', 'Prototyping in code', 'React + TypeScript', 'Design systems', 'UX research', 'Game economy', 'Unity + C#'],
    pt: ['Figma', 'Claude Code', 'Claude Design', 'Prototipação em código', 'React + TypeScript', 'Design systems', 'Pesquisa de UX', 'Economia de jogos', 'Unity + C#']
  },

  /* ---------- Process ---------- */
  process: [
    {
      title: { en: 'Understand why people come back', pt: 'Entender por que as pessoas voltam' },
      body: {
        en: 'Before drawing screens I try to understand what someone gets out of the product and what would make them use it again. Most of my design decisions start there.',
        pt: 'Antes de desenhar qualquer tela, tento entender o que a pessoa ganha com o produto e o que a faria voltar. A maioria das minhas decisões de design parte daí.'
      },
      proof: { en: 'At Knomee, each adventure shows clients something about their own finances that they can then share with their advisor.', pt: 'Na Knomee, cada aventura mostra ao cliente algo sobre as próprias finanças, que ele pode compartilhar com o assessor.' }
    },
    {
      title: { en: 'Prototype early, with AI', pt: 'Prototipar cedo, com IA' },
      body: {
        en: 'Static mockups don’t show timing, animation or how a flow feels after the tenth tap. When those details matter, I build the prototype in HTML or React, working with Claude Code.',
        pt: 'Mockups estáticos não mostram timing, animação nem a sensação de um fluxo depois do décimo toque. Quando esses detalhes importam, faço o protótipo em HTML ou React, junto com o Claude Code.'
      },
      proof: { en: 'The Knomee prototype has 58 screens, all built with Claude Code, and was used for handoff, sales demos and user tests.', pt: 'O protótipo da Knomee tem 58 telas, todas construídas com o Claude Code, e foi usado em handoff, demos de vendas e testes com usuários.' }
    },
    {
      title: { en: 'Make reviews easy', pt: 'Facilitar as revisões' },
      body: {
        en: 'Feedback is more useful when it’s left on the screen it’s about. When the team needed a way to comment on coded prototypes, I built one.',
        pt: 'O feedback é mais útil quando fica direto na tela em questão. Quando o time precisou comentar protótipos em código, criei uma ferramenta para isso.'
      },
      proof: { en: 'Review Layer, the commenting tool I made, was used on five Knomee prototypes.', pt: 'O Review Layer, a ferramenta de comentários que criei, foi usado em cinco protótipos da Knomee.' }
    },
    {
      title: { en: 'Ship, watch, adjust', pt: 'Lançar, observar, ajustar' },
      body: {
        en: 'Working on live games taught me that launch is only the first version. After something ships, I look at how people use it and adjust.',
        pt: 'Trabalhar com jogos live me ensinou que o lançamento é só a primeira versão. Depois que algo vai ao ar, observo como as pessoas usam e ajusto.'
      },
      proof: { en: 'On Smashing Four I rebalanced heroes based on performance data and player feedback.', pt: 'No Smashing Four, rebalanceei heróis com base em dados de desempenho e no feedback dos jogadores.' }
    }
  ],

  /* ---------- Projects ----------
     group: knomee | gamification | games
     layout: card size in the grid (lg, md, lg-wide, sm)
     metrics: kind = measured | projected | estimated (shown as a label)
  */
  cases: [
    {
      id: 'adventures', group: 'knomee', layout: 'lg', tone: 'deep', art: 'fan', minutes: 4,
      cover: 'assets/img/card-adventures.webp', coverAlt: { en: 'Three Knomee mobile screens: a swipe card, an outlook screen and a confidence badge', pt: 'Três telas do app da Knomee: um card de swipe, uma tela do Outlook e um selo do Confidence' },
      kicker: { en: 'Knomee · Client app', pt: 'Knomee · App do cliente' },
      title: { en: 'Knomee Adventures', pt: 'Knomee Adventures' },
      tagline: { en: 'Replacing a financial intake form with five short, game-like questionnaires.', pt: 'Troquei um formulário de cadastro financeiro por cinco questionários curtos, com cara de jogo.' },
      chip: { en: '5 adventures, 1 to 3 min each', pt: '5 aventuras, de 1 a 3 min cada' },
      meta: {
        role: { en: 'UX/UI and gamification designer', pt: 'Designer de UX/UI e gamificação' },
        when: { en: '2024 to 2026', pt: '2024 a 2026' },
        platform: { en: 'Mobile web, white-label', pt: 'Web mobile, white-label' },
        context: { en: 'Early-stage fintech, remote team', pt: 'Fintech em fase inicial, time remoto' }
      },
      problem: {
        en: 'Financial advisors usually start with a long intake form. Many prospects drop off halfway, and the answers they do give are short. Knomee wanted clients to share what they actually care about, like goals, worries and plans, before meeting their advisor.',
        pt: 'Assessores financeiros costumam começar com um formulário de cadastro longo. Muitos prospects desistem no meio, e as respostas que chegam são curtas. A Knomee queria que os clientes contassem o que importa de verdade para eles, como objetivos, preocupações e planos, antes de conhecer o assessor.'
      },
      moves: [
        {
          title: { en: 'Five short adventures', pt: 'Cinco aventuras curtas' },
          body: { en: 'I split the intake into five parts: Financial Joy, Confidence, Outlook, Future You and Goals. Each one takes one to three minutes, ends with a badge and fills in a section of the client’s Financial ID, a profile they can share with their advisor.', pt: 'Dividi o formulário em cinco partes: Financial Joy, Confidence, Outlook, Future You e Goals. Cada uma leva de um a três minutos, termina com um selo e preenche uma parte do Financial ID, um perfil que o cliente pode compartilhar com o assessor.' },
          img: ['assets/img/k-adventures.webp', 'assets/img/k-welcome.webp'], kind: 'phones'
        },
        {
          title: { en: 'One question at a time', pt: 'Uma pergunta por vez' },
          body: { en: 'When all seven areas of life were on one screen, people tended to skip some. I moved them to a deck of cards, one area per card, where you choose more, the same or less attention.', pt: 'Com as sete áreas da vida numa tela só, as pessoas tendiam a pular algumas. Passei para um deck de cards, uma área por card, em que você escolhe dar mais, a mesma ou menos atenção.' },
          img: ['assets/img/k-joy-photos.webp', 'assets/img/k-joy-swipe.webp'], kind: 'phones'
        },
        {
          title: { en: 'Help with open questions', pt: 'Ajuda nas perguntas abertas' },
          body: { en: 'Open questions about money are hard to start. I added suggested openings people can tap, and example text that types itself into the empty box.', pt: 'É difícil começar a responder uma pergunta aberta sobre dinheiro. Coloquei começos de frase para tocar e um texto de exemplo que vai se digitando sozinho no campo vazio.' },
          img: ['assets/img/k-outlook-ask.webp', 'assets/img/k-outlook-sky.webp'], kind: 'phones'
        },
        {
          title: { en: 'Inputs that fit the question', pt: 'Inputs que combinam com a pergunta' },
          body: { en: 'The Confidence slider has a sun that gets brighter as you drag it. Future You asks people to place their plans on a timeline and ends with a postcard to their future self.', pt: 'O slider do Confidence tem um sol que brilha mais conforme você arrasta. O Future You pede para a pessoa colocar os planos numa linha do tempo e termina com um cartão-postal para o eu do futuro.' },
          img: ['assets/img/k-conf-slider.webp', 'assets/img/k-fy-orb.webp', 'assets/img/k-fy-road.webp'], kind: 'phones'
        },
        {
          title: { en: 'A voice shortcut powered by AI', pt: 'Um atalho de voz com IA' },
          body: { en: 'Hold the Knomee button and say what changed, like “I just got divorced”. AI turns the sentence into the right next step: a life event, a question for the advisor or a goal. Before anything is saved, the person can edit what was heard, and the button says what it will create. The result appears as the record itself, the way it will look on the Financial ID. In the prototype the speech is scripted, to show the interaction.', pt: 'Segure o botão da Knomee e diga o que mudou, como “Acabei de me divorciar”. A IA transforma a frase no próximo passo certo: um evento de vida, uma pergunta para o assessor ou uma meta. Antes de salvar, a pessoa pode editar o que foi ouvido, e o botão diz o que vai criar. O resultado aparece como o próprio registro, do jeito que vai ficar no Financial ID. No protótipo, a fala é simulada para mostrar a interação.' },
          img: ['assets/img/k-voice-listen.webp', 'assets/img/k-voice-ready.webp', 'assets/img/k-voice-done.webp'], kind: 'phones'
        },
        {
          title: { en: 'Showing what the answers turned into', pt: 'Mostrar o que as respostas geraram' },
          body: { en: 'The badge screen at the end of each adventure also shows the part of the Financial ID it just filled in, so people can see what came out of their answers.', pt: 'A tela do selo, no fim de cada aventura, também mostra a parte do Financial ID que acabou de ser preenchida, para a pessoa ver o resultado das próprias respostas.' },
          img: ['assets/img/k-badge.webp', 'assets/img/k-conf-result.webp'], kind: 'phones'
        },
        {
          title: { en: 'Testing the funnel', pt: 'Testando o funil' },
          body: { en: 'I tested two versions of the welcome page, moved sign-up to after the first results, made “Continue without saving” the main button and used the loading screen to explain what each part of the profile means.', pt: 'Testei duas versões da página de boas-vindas, passei a criação de conta para depois dos primeiros resultados, deixei “Continuar sem salvar” como botão principal e usei a tela de carregamento para explicar cada parte do perfil.' },
          img: ['assets/img/k-landing-welcome.webp', 'assets/img/k-loading.webp'], kind: 'pair'
        }
      ],
      evolution: {
        title: { en: '2024 and 2026', pt: '2024 e 2026' },
        body: { en: 'The 2024 version was built around levels and locked tiles. In 2026 I reorganised it around what each adventure gives back to the person filling it in.', pt: 'A versão de 2024 era baseada em níveis e blocos bloqueados. Em 2026, reorganizei tudo em torno do que cada aventura devolve para quem preenche.' },
        tags: ['2024', '2026'],
        compare: [['assets/img/k-evo-2024-levels.webp', 'assets/img/k-evo-2026-adventures.webp'], ['assets/img/k-evo-2024-tasks.webp', 'assets/img/k-evo-2026-knomee-sheet.webp']]
      },
      metrics: [
        { v: '5', l: { en: 'adventures, one to three minutes each', pt: 'aventuras, de um a três minutos cada' } },
        { v: '2', l: { en: 'versions of the welcome page tested', pt: 'versões da página de boas-vindas testadas' } }
      ],
      live: 'https://victor-mascaro-ux.github.io/knomee-demo/app/app.html#/client-experience'
    },
    {
      id: 'advisor', group: 'knomee', layout: 'md', tone: 'paper', minutes: 5,
      cover: 'assets/img/k-readiness.webp', coverAlt: { en: 'Knomee Advisor prospect readiness screen with a score of 81', pt: 'Tela de prontidão de um prospect no Knomee Advisor, com score 81' },
      kicker: { en: 'Knomee · Advisor dashboard', pt: 'Knomee · Dashboard do assessor' },
      title: { en: 'Knomee Advisor', pt: 'Knomee Advisor' },
      tagline: { en: 'A dashboard that shows advisors which prospects are ready and how to start the conversation.', pt: 'Um dashboard que mostra ao assessor quais prospects estão prontos e como puxar a conversa.' },
      chip: { en: '58 screens', pt: '58 telas' },
      meta: {
        role: { en: 'Product designer, prototype in code with AI', pt: 'Product designer, protótipo em código com IA' },
        when: { en: '2024 to 2026', pt: '2024 a 2026' },
        platform: { en: 'Desktop web, responsive', pt: 'Web desktop, responsivo' },
        context: { en: 'Fintech for wealth management firms', pt: 'Fintech para gestoras de patrimônio' }
      },
      problem: {
        en: 'Advisors get a lot of prospects and very little information about them. They needed to know who to contact first and what to talk about. A readiness score could help, but only if advisors could see how it was calculated.',
        pt: 'Os assessores recebem muitos prospects e quase nenhuma informação sobre eles. Precisavam saber com quem falar primeiro e sobre o quê. Um score de prontidão podia ajudar, mas só se eles conseguissem ver como era calculado.'
      },
      moves: [
        {
          title: { en: 'Prospects grouped by readiness', pt: 'Prospects agrupados por prontidão' },
          body: { en: 'The prospect list is split into Ready now, Considering and Nurture, with the totals at the top, so advisors can see who to call first without going through the whole list.', pt: 'A lista de prospects é dividida em Ready now, Considering e Nurture, com os totais no topo, para o assessor ver com quem falar primeiro sem rolar a lista toda.' },
          img: ['assets/img/k-prospects.webp'], kind: 'wide'
        },
        {
          title: { en: 'Scores with the calculation visible', pt: 'Scores com o cálculo à mostra' },
          body: { en: 'Each score is broken down into Intent, Clarity and Receptivity, and the screen shows how it was calculated.', pt: 'Cada score se divide em Intent, Clarity e Receptivity, e a tela mostra como ele foi calculado.' },
          img: ['assets/img/k-readiness.webp'], kind: 'wide'
        },
        {
          title: { en: 'Conversation starters', pt: 'Sugestões de abordagem' },
          body: { en: 'The Playbook tab turns the client’s answers into suggested openers, along with words to use and words to avoid with that person.', pt: 'A aba Playbook transforma as respostas do cliente em frases para abrir a conversa, além de palavras para usar e evitar com aquela pessoa.' },
          img: ['assets/img/k-playbook.webp'], kind: 'wide'
        },
        {
          title: { en: 'Converting a prospect', pt: 'Converter um prospect' },
          body: { en: 'Turning a prospect into a client asks for confirmation first. After that there’s a short celebration with confetti, a message and the new row highlighted in the client list.', pt: 'Transformar um prospect em cliente pede uma confirmação antes. Depois vem uma comemoração rápida, com confete, uma mensagem e a nova linha destacada na lista de clientes.' },
          img: ['assets/img/k-convert.webp', 'assets/img/k-confetti.webp'], kind: 'pair'
        },
        {
          title: { en: 'Different colors for prospects and clients', pt: 'Cores diferentes para prospects e clientes' },
          body: { en: 'Prospect pages use Knomee’s plum and client pages use teal, so advisors always know which list they’re looking at.', pt: 'As páginas de prospects usam o roxo da Knomee e as de clientes usam azul-petróleo, para o assessor sempre saber em qual lista está.' },
          img: ['assets/img/k-client-insights.webp'], kind: 'wide'
        },
        {
          title: { en: 'Sample sizes in the analytics', pt: 'Tamanho da amostra no analytics' },
          body: { en: 'The analytics page shows the sample size next to each rate and hides a rate when there isn’t enough data behind it.', pt: 'A página de analytics mostra o tamanho da amostra ao lado de cada taxa e esconde a taxa quando não há dados suficientes.' },
          img: ['assets/img/k-analytics.webp'], kind: 'wide'
        },
        {
          title: { en: 'White-label settings', pt: 'Configurações de white-label' },
          body: { en: 'Firms can set their own logo, colors, fonts and welcome text. There’s a live preview, and fields that could break the layout have a character counter.', pt: 'Cada empresa pode definir logo, cores, fontes e texto de boas-vindas. Há um preview em tempo real, e os campos que podem quebrar o layout têm contador de caracteres.' },
          img: ['assets/img/k-org-custom.webp'], kind: 'wide'
        },
        {
          title: { en: 'Segmentation', pt: 'Segmentação' },
          body: { en: 'I rebuilt the prospect segmentation so every answer maps to a single segment, then tested it with generated data. The test found a bug that was quietly dropping some answers.', pt: 'Refiz a segmentação de prospects para cada resposta cair em um único segmento e testei com dados sintéticos. O teste revelou um bug que descartava algumas respostas sem ninguém perceber.' }
        }
      ],
      metrics: [
        { v: '643', l: { en: 'merged pull requests on the coded prototype', pt: 'pull requests mergeados no protótipo em código' } },
        { v: '58', l: { en: 'screens across the advisor, firm and client views', pt: 'telas nas visões de assessor, empresa e cliente' } }
      ],
      live: 'https://victor-mascaro-ux.github.io/knomee-demo/'
    },
    {
      id: 'review-layer', group: 'knomee', layout: 'md', tone: 'pale', minutes: 3,
      cover: 'assets/img/k-overlay.webp', coverAlt: { en: 'A prototype with yellow comment pins and an open comment thread', pt: 'Um protótipo com pins de comentário amarelos e uma thread aberta' },
      kicker: { en: 'Knomee · Internal tool', pt: 'Knomee · Ferramenta interna' },
      title: { en: 'Review Layer', pt: 'Review Layer' },
      tagline: { en: 'A commenting tool I built with Claude Code so the team could leave feedback directly on coded prototypes.', pt: 'Uma ferramenta de comentários que criei com o Claude Code para o time dar feedback direto nos protótipos em código.' },
      chip: { en: 'Used on 5 prototypes', pt: 'Usada em 5 protótipos' },
      meta: {
        role: { en: 'Designer and developer', pt: 'Designer e desenvolvedor' },
        when: { en: '2026', pt: '2026' },
        platform: { en: 'Web overlay', pt: 'Overlay web' },
        context: { en: 'Internal tool for the Knomee team', pt: 'Ferramenta interna do time da Knomee' }
      },
      problem: {
        en: 'When we moved prototypes from Figma to code, we lost Figma’s comments. Feedback ended up in chat messages and screenshots, and it was hard to tell which screen or version someone meant.',
        pt: 'Quando passamos os protótipos do Figma para o código, perdemos os comentários do Figma. O feedback foi parar no chat e em prints, e ficava difícil saber de qual tela ou versão a pessoa estava falando.'
      },
      moves: [
        {
          title: { en: 'Hidden by default', pt: 'Escondida por padrão' },
          body: { en: 'The tool stays hidden until you press a shortcut, so it doesn’t get in the way when someone is testing the prototype. Esc closes everything.', pt: 'A ferramenta fica escondida até você apertar um atalho, para não atrapalhar quem está testando o protótipo. O Esc fecha tudo.' },
          img: ['assets/img/k-overlay.webp'], kind: 'wide'
        },
        {
          title: { en: 'Pins that stay in place', pt: 'Pins que não saem do lugar' },
          body: { en: 'Comment pins are saved as a percentage of the screen, so they stay in the right spot at any window size.', pt: 'Os pins são salvos como porcentagem da tela, então ficam no lugar certo em qualquer tamanho de janela.' }
        },
        {
          title: { en: 'A neutral look', pt: 'Visual neutro' },
          body: { en: 'It has its own neutral style and typeface so it doesn’t get mixed up with the product underneath. There are three themes to choose from.', pt: 'Ela tem estilo e fonte próprios, neutros, para não se confundir com o produto por baixo. Dá para escolher entre três temas.' }
        },
        {
          title: { en: 'Comments tied to screens', pt: 'Comentários ligados às telas' },
          body: { en: 'Each comment belongs to the screen where it was left and can reopen that exact step of a flow. Every project keeps its own comments, and the tool warns you if two sites are sharing an ID by mistake.', pt: 'Cada comentário fica vinculado à tela onde foi deixado e pode reabrir exatamente aquele passo do fluxo. Cada projeto guarda os próprios comentários, e a ferramenta avisa se dois sites estiverem usando o mesmo ID por engano.' }
        },
        {
          title: { en: 'Names on comments', pt: 'Nomes nos comentários' },
          body: { en: 'Reviewers type their name once, and it signs every note they leave on every prototype, so a thread shows who said what. The name is added to each note when it’s written, so changing it later doesn’t rewrite older notes.', pt: 'Quem revisa digita o nome uma vez, e ele assina cada nota em todos os protótipos, então a thread mostra quem disse o quê. O nome entra em cada nota no momento em que ela é escrita, então trocar o nome depois não reescreve as notas antigas.' },
          img: ['assets/img/k-overlay-names.webp'], kind: 'wide'
        }
      ],
      metrics: [
        { v: '5', l: { en: 'Knomee prototypes reviewed with it', pt: 'protótipos da Knomee revisados com ela' } }
      ]
    },
    {
      id: 'go-to-market', group: 'knomee', layout: 'lg-wide', tone: 'night', minutes: 3,
      cover: 'assets/img/k-activation.webp', coverAlt: { en: 'Knomee activation toolkit home page with three toolkit cards', pt: 'Página inicial do kit de ativação da Knomee com três cards' },
      kicker: { en: 'Knomee · Sales and marketing', pt: 'Knomee · Vendas e marketing' },
      title: { en: 'Knomee Go-to-Market', pt: 'Knomee Go-to-Market' },
      tagline: { en: 'An activation toolkit, a pitch deck and a 90-second product video.', pt: 'Um kit de ativação, um pitch deck e um vídeo de produto de 90 segundos.' },
      chip: { en: 'Live at activation.knomee.com', pt: 'No ar em activation.knomee.com' },
      meta: {
        role: { en: 'Designer and developer', pt: 'Designer e desenvolvedor' },
        when: { en: '2026', pt: '2026' },
        platform: { en: 'Website, browser deck, video', pt: 'Site, deck no navegador, vídeo' },
        context: { en: 'For sales, customer success and the founder', pt: 'Para vendas, customer success e a fundadora' }
      },
      problem: {
        en: 'Knomee is a new kind of product, and the team had to explain it to firms, advisors and investors. Sales, customer success and the founder each needed material they could use with their own audience.',
        pt: 'A Knomee é um tipo novo de produto, e o time precisava explicá-la para empresas, assessores e investidores. Vendas, customer success e a fundadora precisavam, cada um, de material para o próprio público.'
      },
      moves: [
        {
          title: { en: 'Activation toolkit', pt: 'Kit de ativação' },
          body: { en: 'The toolkit started as a long PDF. I turned it into a website where you pick a goal (new clients, existing clients or recruiting) and a type of lead, and get a strategy and sample copy for that case. Customer success can edit the text on the page without a developer.', pt: 'O kit começou como um PDF longo. Transformei num site em que você escolhe um objetivo (novos clientes, clientes atuais ou recrutamento) e um tipo de lead, e recebe uma estratégia e textos de exemplo para aquele caso. O time de customer success edita os textos direto na página, sem depender de desenvolvedor.' },
          img: ['assets/img/k-activation-prospect.webp', 'assets/img/k-activation-hot.webp'], kind: 'pair'
        },
        {
          title: { en: 'Pitch deck', pt: 'Pitch deck' },
          body: { en: 'I prototyped three ways to present the deck: with search, with a slide list on the side, and as a grid of slides. The founder chose the grid, which lets her open the detail slides only when someone asks about them.', pt: 'Prototipei três formas de apresentar o deck: com busca, com uma lista de slides na lateral e como um grid de slides. A fundadora escolheu o grid, em que ela abre os slides de detalhe só quando alguém pergunta.' },
          img: ['assets/img/k-deck-backstage.webp'], kind: 'wide'
        },
        {
          title: { en: 'Product video', pt: 'Vídeo do produto' },
          body: { en: 'I made the video in code: the scenes are React components, the voice-over was generated with AI, and the frames were rendered one by one. The first cut was 2:48, and I later cut it down to 90 seconds.', pt: 'Fiz o vídeo em código: as cenas são componentes React, a locução foi gerada com IA e os frames foram renderizados um a um. O primeiro corte tinha 2:48, e depois enxuguei para 90 segundos.' },
          video: 'H_gZZZVwWFc',
          film: [
            { t: '0:08', src: 'assets/img/film-8.webp', cap: { en: 'A typical wealth firm website ending in an intake form.', pt: 'Um site típico de gestora, que termina num formulário de cadastro.' } },
            { t: '0:34', src: 'assets/img/film-34.webp', cap: { en: 'Several made-up competitor sites.', pt: 'Vários sites de concorrentes fictícios.' } },
            { t: '0:48', src: 'assets/img/film-48.webp', cap: { en: 'The Financial Joy adventure.', pt: 'A aventura Financial Joy.' } },
            { t: '1:02', src: 'assets/img/film-62.webp', cap: { en: 'The Future You postcard.', pt: 'O cartão-postal do Future You.' } },
            { t: '1:16', src: 'assets/img/film-76.webp', cap: { en: 'The advisor’s Playbook.', pt: 'O Playbook do assessor.' } },
            { t: '2:26', src: 'assets/img/film-146.webp', cap: { en: 'A client relationship over the years.', pt: 'A relação com um cliente ao longo dos anos.' } },
            { t: '2:40', src: 'assets/img/film-160.webp', cap: { en: 'End card.', pt: 'Cartela final.' } }
          ]
        }
      ],
      metrics: [
        { v: '3', l: { en: 'toolkits: prospects, clients and recruiting', pt: 'kits: prospects, clientes e recrutamento' } },
        { v: '2:48 → 1:30', l: { en: 'video length after the recut', pt: 'duração do vídeo depois do novo corte' } }
      ],
      live: 'https://activation.knomee.com/'
    },

    /* ---------- Games ---------- */
    {
      id: 'betsie', group: 'gamification', layout: 'lg-wide', tone: 'deep', minutes: 1,
      cover: 'assets/img/card-betsie.webp', coverAlt: { en: 'Four Betsie app screens: starting a bet, a pending bet, a live bet and the bet details', pt: 'Quatro telas do app Betsie: criar uma aposta, aposta pendente, aposta no ar e os detalhes da aposta' },
      kicker: { en: 'Startup · Consulting', pt: 'Startup · Consultoria' },
      title: { en: 'Betsie', pt: 'Betsie' },
      tagline: { en: 'UI redesign and gamification for a social betting app, ready for the pitch.', pt: 'Redesign de UI e gamificação para um app social de apostas, pronto para o pitch.' },
      chip: { en: 'Clickable prototype', pt: 'Protótipo navegável' },
      meta: {
        role: { en: 'UX and product design consultant', pt: 'Consultor de UX e produto' },
        when: { en: 'Jul to Nov 2024', pt: 'Jul a nov de 2024' },
        platform: { en: 'Mobile app', pt: 'App mobile' },
        context: { en: 'Early-stage US startup', pt: 'Startup americana em fase inicial' }
      },
      problem: {
        en: 'An early-stage US startup needed a cleaner product and a reason for users to keep coming back.',
        pt: 'Uma startup americana em fase inicial precisava de um produto mais limpo e de um motivo para os usuários continuarem voltando.'
      },
      moves: [
        { title: { en: 'Redesign and gamification', pt: 'Redesign e gamificação' }, body: { en: 'I redesigned the UI and added onboarding, scoring and feedback that help users learn how the app works.', pt: 'Refiz a UI e adicionei onboarding, pontuação e feedback que ajudam o usuário a entender como o app funciona.' },
          compare: ['assets/img/betsie-start.webp', 'assets/img/betsie-pending.webp'] },
        { title: { en: 'Prototype and video', pt: 'Protótipo e vídeo' }, body: { en: 'I delivered a clickable prototype and a showcase video they could use with investors and developers.', pt: 'Entreguei um protótipo navegável e um vídeo de apresentação para eles usarem com investidores e desenvolvedores.' },
          compare: ['assets/img/betsie-live.webp', 'assets/img/betsie-on.webp'] }
      ],
      metrics: [],
      live: 'https://betsie.app/'
    },
    {
      id: 'smashing-four', group: 'games', layout: 'md', tone: 'deep', minutes: 2,
      cover: 'assets/img/g-sf-bloodbite.webp', coverAlt: { en: 'Bloodbite, a raccoon gunslinger hero with glowing red eyes', pt: 'Bloodbite, um herói guaxinim pistoleiro de olhos vermelhos brilhantes' },
      kicker: { en: 'By Aliens · Game design', pt: 'By Aliens · Game design' },
      title: { en: 'Smashing Four', pt: 'Smashing Four' },
      tagline: { en: 'New heroes and a redesigned Hero Event for a live PvP game.', pt: 'Novos heróis e um Hero Event redesenhado para um jogo PvP live.' },
      chip: { en: '3 new heroes, balancing and live ops', pt: '3 novos heróis, balanceamento e live ops' },
      meta: {
        role: { en: 'Game and UX designer, By Aliens', pt: 'Game e UX designer, By Aliens' },
        when: { en: '2025', pt: '2025' },
        platform: { en: 'iOS and Android', pt: 'iOS e Android' },
        context: { en: 'Live PvP game with a long-running meta', pt: 'Jogo PvP live com um meta já estabelecido' }
      },
      problem: {
        en: 'Smashing Four had been live for years. It needed new heroes that wouldn’t throw off the balance, and a Hero Event that kept players interested after the first few days.',
        pt: 'O Smashing Four já estava no ar havia anos. Precisava de heróis novos que não desequilibrassem o jogo e de um Hero Event que mantivesse o interesse dos jogadores depois dos primeiros dias.'
      },
      moves: [
        {
          title: { en: 'Bloodbite', pt: 'Bloodbite' },
          body: { en: 'I designed Bloodbite, a hero whose bite leaves a wound that never heals and deals damage at the end of every turn. I worked on the ability, its stacking rules and the in-game description. I also designed Sheriff and Otter.', pt: 'Criei o Bloodbite, um herói cuja mordida deixa uma ferida que nunca cicatriza e causa dano no fim de cada turno. Trabalhei na habilidade, nas regras de stack e na descrição que aparece no jogo. Também criei o Sheriff e o Otter.' },
          img: ['assets/img/g-sf-bloodbite.webp'], kind: 'square'
        },
        {
          title: { en: 'Hero Event', pt: 'Hero Event' },
          body: { en: 'I reorganised the event tasks into golden, daily silver and daily bronze tiers, each with its own progress bar, reward and reset timer.', pt: 'Reorganizei as tarefas do evento em faixas de ouro, prata diária e bronze diária, cada uma com sua barra de progresso, recompensa e timer de reset.' },
          compare: ['assets/img/g-sf-hero-event-before.webp', 'assets/img/g-sf-hero-event-after.webp']
        },
        {
          title: { en: 'Rebalancing', pt: 'Rebalanceamento' },
          body: { en: 'I adjusted stats (HP, damage, weight and speed) for heroes players weren’t picking, based on performance data and what players were saying. I also worked on the reward tiers for Hero Event 2.0.', pt: 'Ajustei atributos (HP, dano, peso e velocidade) de heróis pouco escolhidos, com base em dados de desempenho e no que os jogadores diziam. Também trabalhei nas faixas de recompensa do Hero Event 2.0.' }
        },
        {
          title: { en: 'Live ops', pt: 'Live ops' },
          body: { en: 'I set up events and the season pass, and kept the game’s news and in-game content up to date.', pt: 'Configurei os eventos e o passe de temporada, e mantive em dia as notícias e o conteúdo dentro do jogo.' }
        }
      ],
      metrics: [],
      live: 'https://apps.apple.com/us/app/smashing-four-pvp-smash-hit/id1230892664'
    },
    {
      id: 'auction-city', group: 'games', layout: 'md', tone: 'blue', minutes: 2,
      cover: 'assets/img/g-ac-hunter-pass.webp', coverAlt: { en: 'Auction City Hunter Pass screen with free and premium reward tracks', pt: 'Tela do Hunter Pass do Auction City, com trilhas de recompensa grátis e premium' },
      kicker: { en: 'By Aliens · Systems and UX', pt: 'By Aliens · Sistemas e UX' },
      title: { en: 'Auction City', pt: 'Auction City' },
      tagline: { en: 'A season pass, new tutorials and clearer auction results for a tycoon game.', pt: 'Um passe de temporada, novos tutoriais e resultados de leilão mais claros para um jogo tycoon.' },
      chip: { en: 'Season pass and onboarding', pt: 'Passe de temporada e onboarding' },
      meta: {
        role: { en: 'Systems and UX designer, By Aliens', pt: 'Designer de sistemas e UX, By Aliens' },
        when: { en: '2024', pt: '2024' },
        platform: { en: 'iOS and Android', pt: 'iOS e Android' },
        context: { en: 'Auction tycoon game', pt: 'Jogo tycoon de leilões' }
      },
      problem: {
        en: 'New players were leaving early. The tutorials were long, auction results were hard to read, and there wasn’t much reason to come back each season.',
        pt: 'Os jogadores novos saíam cedo. Os tutoriais eram longos, os resultados dos leilões eram difíceis de ler e não havia muito motivo para voltar a cada temporada.'
      },
      moves: [
        {
          title: { en: 'Hunter Pass', pt: 'Hunter Pass' },
          body: { en: 'A themed season pass with relic items that only show up in special auctions.', pt: 'Um passe de temporada temático com relíquias que só aparecem em leilões especiais.' },
          img: ['assets/img/g-ac-hunter-pass.webp'], kind: 'game'
        },
        {
          title: { en: 'Tutorials', pt: 'Tutoriais' },
          body: { en: 'I rewrote the tutorials to be shorter and to start with an action instead of an explanation. I also rebalanced the early game so difficulty and rewards go up more gradually.', pt: 'Reescrevi os tutoriais para ficarem mais curtos e começarem com uma ação, não com uma explicação. Também rebalanceei o early game para a dificuldade e as recompensas subirem de forma mais gradual.' },
          img: ['assets/img/g-ac-city.webp', 'assets/img/g-ac-appraisal.webp'], kind: 'game'
        },
        {
          title: { en: 'Auction results', pt: 'Resultado dos leilões' },
          body: { en: 'The end of each auction now shows the cost, the value and the partial result before the final reveal.', pt: 'O fim de cada leilão agora mostra o custo, o valor e o resultado parcial antes da revelação final.' },
          img: ['assets/img/g-ac-auction-end.webp', 'assets/img/g-ac-collect.webp'], kind: 'game'
        },
        {
          title: { en: 'Statues and a gacha concept', pt: 'Estátuas e um conceito de gacha' },
          body: { en: 'Statues are permanent buildings you earn at milestones. For the gacha, I came up with a lighthouse that calls a drifting ship, which drops containers.', pt: 'As Estátuas são construções permanentes que você ganha ao atingir marcos do jogo. Para o gacha, pensei num farol que chama um navio à deriva, que solta contêineres.' },
          img: ['assets/img/g-ac-statue.webp', 'assets/img/g-ac-mystery-dock.webp'], kind: 'game'
        }
      ],
      metrics: [],
      live: 'https://apps.apple.com/br/app/auction-city-tycoon-simulator/id6446124916'
    },
    {
      id: 'illuminati', group: 'games', layout: 'sm', tone: 'night', minutes: 1,
      cover: 'assets/img/g-wai-key-art.webp', coverAlt: { en: 'We Are Illuminati key art: a triangle-headed Illuminati agent and a man in a suit on either side of the game logo', pt: 'Arte do We Are Illuminati: um agente Illuminati com cabeça de triângulo e um homem de terno, um de cada lado do logo do jogo' },
      kicker: { en: 'By Aliens · Game design', pt: 'By Aliens · Game design' },
      title: { en: 'We Are Illuminati', pt: 'We Are Illuminati' },
      tagline: { en: 'A new layout, a side story with three endings and a rewarded ad that fits the story.', pt: 'Um novo layout, uma história paralela com três finais e um anúncio com recompensa que faz parte da trama.' },
      chip: { en: '3 endings', pt: '3 finais' },
      meta: {
        role: { en: 'Game and UX designer, By Aliens', pt: 'Game e UX designer, By Aliens' },
        when: { en: '2023', pt: '2023' },
        platform: { en: 'iOS and Android', pt: 'iOS e Android' },
        context: { en: 'Idle game', pt: 'Jogo idle' }
      },
      problem: {
        en: 'Sessions in the middle of the game were getting shorter, the idle boosters were hard to understand, and the rewarded ads felt like interruptions.',
        pt: 'As sessões no mid-game estavam ficando mais curtas, os boosters idle eram difíceis de entender e os anúncios com recompensa pareciam interrupções.'
      },
      moves: [
        { title: { en: 'Main screen', pt: 'Tela principal' }, body: { en: 'I redesigned the main screen, made the managers and multipliers easier to understand, and added visible collectibles and a new area with more progression.', pt: 'Redesenhei a tela principal, deixei os gerentes e multiplicadores mais fáceis de entender e adicionei colecionáveis à vista e uma nova área com mais progressão.' },
          compare: ['assets/img/g-wai-main-before.webp', 'assets/img/g-wai-main-after.webp'] },
        { title: { en: 'Side story', pt: 'História paralela' }, body: { en: 'A side story with three endings, decided by what the player does, that runs alongside the idle loop.', pt: 'Uma história paralela com três finais, que dependem do que o jogador faz, rodando junto com o loop idle.' },
          img: ['assets/img/g-wai-side-story.webp'], kind: 'game' },
        { title: { en: 'Neila the Chrononaut', pt: 'Neila, a Crononauta' }, body: { en: 'A rewarded ad presented by Neila, a time-travelling character who brings random resources.', pt: 'Um anúncio com recompensa apresentado pela Neila, uma personagem que viaja no tempo e traz recursos aleatórios.' },
          img: ['assets/img/g-wai-neila.webp'], kind: 'game' }
      ],
      metrics: []
    },
    {
      id: 'idle-planes', group: 'games', layout: 'sm', tone: 'blue', minutes: 1,
      cover: 'assets/img/g-ip-cover.webp', coverAlt: { en: 'A green propeller fighter plane flying through a sunset sky', pt: 'Um caça verde de hélice voando num céu ao pôr do sol' },
      kicker: { en: 'By Aliens · Economy and UX', pt: 'By Aliens · Economia e UX' },
      title: { en: 'Idle Planes', pt: 'Idle Planes' },
      tagline: { en: 'Economy tuning, UX reviews and three minigames for an idle game.', pt: 'Ajustes de economia, revisões de UX e três minigames para um jogo idle.' },
      chip: { en: '3 minigames', pt: '3 minigames' },
      meta: {
        role: { en: 'Game and UX designer, By Aliens', pt: 'Game e UX designer, By Aliens' },
        when: { en: '2022 to 2023', pt: '2022 a 2023' },
        platform: { en: 'iOS and Android', pt: 'iOS e Android' },
        context: { en: 'Idle airline game', pt: 'Jogo idle de companhia aérea' }
      },
      problem: {
        en: 'After a while the pacing and the upgrade economy flattened out, and there wasn’t much to do besides tapping.',
        pt: 'Depois de um tempo, o ritmo e a economia de upgrades estagnavam, e não sobrava muito o que fazer além de tocar na tela.'
      },
      moves: [
        { title: { en: 'Pacing and economy', pt: 'Ritmo e economia' }, body: { en: 'I tuned the upgrade pacing and resource generation, and proposed systems for goals and progress feedback.', pt: 'Ajustei o ritmo dos upgrades e a geração de recursos, e propus sistemas de metas e de feedback de progresso.' },
          img: ['assets/img/g-ip-build.webp', 'assets/img/g-ip-legendary.webp'], kind: 'phones' },
        { title: { en: 'UX reviews', pt: 'Revisões de UX' }, body: { en: 'Screen-by-screen reviews pointing out where goals and rewards weren’t clear to the player.', pt: 'Revisões tela a tela apontando onde os objetivos e as recompensas não estavam claros para o jogador.' },
          img: ['assets/img/g-ip-daily-reward.webp'], kind: 'phones' },
        { title: { en: 'Minigames', pt: 'Minigames' }, body: { en: 'Three minigames that give players something to do between collections.', pt: 'Três minigames para o jogador ter o que fazer entre uma coleta e outra.' },
          img: ['assets/img/g-ip-combat.webp'], kind: 'phones' }
      ],
      metrics: [],
      live: 'https://apps.apple.com/br/app/idle-planes-air-force-squad/id1633630486'
    },
    {
      id: 'lumen', group: 'games', layout: 'sm', tone: 'night', minutes: 1,
      cover: 'assets/img/g-hemp-paradise.webp', coverAlt: { en: 'Island farming game with waterfalls and wooden bridges', pt: 'Jogo de fazenda numa ilha com cachoeiras e pontes de madeira' },
      kicker: { en: 'Studio · Production and live ops', pt: 'Estúdio · Produção e live ops' },
      title: { en: 'Lumen Games', pt: 'Lumen Games' },
      tagline: { en: 'Producer and game designer on Hemp Paradise, a live mobile game.', pt: 'Produtor e game designer no Hemp Paradise, um jogo mobile live.' },
      chip: { en: 'Live ops', pt: 'Live ops' },
      meta: {
        role: { en: 'Producer and game designer', pt: 'Produtor e game designer' },
        when: { en: '2021 to 2022', pt: '2021 a 2022' },
        platform: { en: 'Mobile', pt: 'Mobile' },
        context: { en: 'Indie studio in Aracaju', pt: 'Estúdio indie em Aracaju' }
      },
      problem: {
        en: 'A small studio needed someone to manage art production and run the game after launch.',
        pt: 'Um estúdio pequeno precisava de alguém para gerenciar a produção de arte e tocar o jogo depois do lançamento.'
      },
      moves: [
        { title: { en: 'Production', pt: 'Produção' }, body: { en: 'I managed art production, helped with the technical pipeline and wrote documentation for the team and partners.', pt: 'Cuidei da produção de arte, ajudei no pipeline técnico e escrevi a documentação para o time e os parceiros.' } },
        { title: { en: 'Live operations', pt: 'Live ops' }, body: { en: 'I ran events, news and in-game content, designed retention and monetization events, and analysed playtests.', pt: 'Rodei eventos, notícias e conteúdo no jogo, criei eventos de retenção e monetização e analisei playtests.' } }
      ],
      metrics: [],
      live: 'https://apps.apple.com/us/app/hemp-paradise-420-weed-farm/id1541215176'
    }
  ],

  /* ---------- University & game-jam projects ---------- */
  side: [
    { t: 'Lira Adventure', img: 'assets/img/side-lira-adventure.webp', url: 'https://flying-frog.itch.io/lira-adventure', d: { en: 'A jelly puzzle game.', pt: 'Um jogo de puzzle com gelatinas.' } },
    { t: 'CommuniCity', img: 'assets/img/side-communicity.webp', url: 'https://audev.itch.io/communicity', d: { en: 'A mobile game for learning English.', pt: 'Um jogo mobile para aprender inglês.' } },
    { t: 'Dashy Bird', img: 'assets/img/side-dashy-bird.webp', url: 'https://siriusgamedesign.itch.io/dashy-bird', d: { en: 'Tap to fly, drag to slingshot.', pt: 'Toque para voar e arraste para usar o estilingue.' } },
    { t: 'The Other King', img: 'assets/img/side-the-other-king.webp', url: 'https://siriusgamedesign.itch.io/the-other-king', d: { en: 'A game that breaks the fourth wall.', pt: 'Um jogo que quebra a quarta parede.' } },
    { t: 'Thunderclock: Red Shell', img: 'assets/img/side-thunderclock.webp', url: 'https://fortune-game-studio.itch.io/thunderclock', d: { en: 'Another game that breaks the fourth wall.', pt: 'Outro jogo que quebra a quarta parede.' } },
    { t: 'Behind the Curtain', img: 'assets/img/side-behind-the-curtain.webp', url: 'https://www.youtube.com/watch?v=bdaiMLI0oW8', d: { en: 'Based on Hitchcock’s Rear Window.', pt: 'Baseado em Janela Indiscreta, de Hitchcock.' } },
    { t: 'Yetu’s Journey', img: 'assets/img/side-yetus-journey.webp', url: 'https://siriusgamedesign.itch.io/a-viagem-de-yetu', d: { en: 'A psychological game set during the Yongxing disaster.', pt: 'Um jogo psicológico ambientado no desastre de Yongxing.' } },
    { t: 'Friday Heist', img: 'assets/img/side-friday-heist.webp', url: 'https://audev.itch.io/friday-heist', d: { en: 'A remake of the classic Elevator Action.', pt: 'Um remake do clássico Elevator Action.' } },
    { t: 'Hambogus', img: 'assets/img/side-hambogus.webp', url: 'https://www.youtube.com/watch?v=oySXhbCswD4', d: { en: 'Tilt your phone to stack falling burger ingredients.', pt: 'Incline o celular para empilhar ingredientes de hambúrguer que caem.' } },
    { t: 'The Druids’ Path', img: 'assets/img/side-druids-path.webp', url: 'https://siriusgamedesign.itch.io/caminho-dos-druidas', d: { en: 'Druids work together to save their village.', pt: 'Druidas se unem para salvar a vila.' } },
    { t: 'Deathrow', img: 'assets/img/side-deathrow.webp', url: 'https://www.youtube.com/watch?v=GpPVBNhG6iA', d: { en: 'A first-person horror shooter.', pt: 'Um FPS de terror.' } },
    { t: 'Chicken Tikka Masala', img: 'assets/img/side-chicken-tikka-masala.webp', url: 'https://www.youtube.com/watch?v=xe20lxsitPE', d: { en: 'A 2D side-scroller with a very fast chicken.', pt: 'Um side-scroller 2D com uma galinha muito rápida.' } },
    { t: 'Break Into', img: 'assets/img/side-break-into.webp', url: 'https://siriusgamedesign.itch.io/break-into', d: { en: 'A mix of Pong and Breakout.', pt: 'Uma mistura de Pong e Breakout.' } },
    { t: 'Armazone', img: 'assets/img/side-armazone.webp', fit: 'contain', url: 'https://siriusgamedesign.itch.io/armazone', d: { en: 'Put out fires in the Amazon forest.', pt: 'Apague incêndios na Amazônia.' } },
    { t: 'Where is Estela?', img: 'assets/img/side-where-is-estela.webp', fit: 'contain', url: 'https://panaisbouki.itch.io/onde-esta-estela', d: { en: 'Search a phone to find out what happened to Estela.', pt: 'Vasculhe um celular para descobrir o que aconteceu com a Estela.' } }
  ],

  /* ---------- Experience ---------- */
  experience: [
    {
      org: 'Knomee', when: { en: '2024 – now', pt: '2024 – atual' },
      role: { en: 'UX & Gamification Designer', pt: 'Designer de UX e Gamificação' },
      where: { en: 'Fintech · San Francisco · Remote', pt: 'Fintech · San Francisco · Remoto' },
      points: {
        en: ['Designed the client app’s Adventures, short questionnaires that build a Financial ID clients can share.', 'Designed the advisor dashboard: readiness scores, segmentation, alerts and conversation playbooks.', 'Designed an AI voice shortcut that turns what a client says into an in-app action.', 'Built the coded prototype with Claude Code, used for handoff, sales demos and user tests (643 merged pull requests).', 'Made the activation toolkit, the pitch deck and the product video.'],
        pt: ['Desenhei as Adventures do app do cliente, questionários curtos que montam um Financial ID compartilhável.', 'Desenhei o dashboard do assessor: scores de prontidão, segmentação, alertas e playbooks de conversa.', 'Desenhei um atalho de voz com IA que transforma a fala do cliente em ação.', 'Desenvolvi com o Claude Code o protótipo em código usado em handoff, demos de vendas e testes com usuários (643 pull requests mergeados).', 'Fiz o kit de ativação, o pitch deck e o vídeo do produto.']
      }
    },
    {
      org: 'By Aliens', when: { en: '2022 – 2025', pt: '2022 – 2025' },
      role: { en: 'Game & UX Designer', pt: 'Game e UX Designer' },
      where: { en: 'Game studio · Dubai · Remote', pt: 'Estúdio de jogos · Dubai · Remoto' },
      points: {
        en: ['Smashing Four: new heroes (Bloodbite, Sheriff, Otter), rebalancing, Hero Event 2.0 and live ops: events, season pass, news and in-game content.', 'Auction City: Hunter Pass season pass, new onboarding, Statues system and a gacha concept.', 'We Are Illuminati: new layout, a side story with three endings, ads and in-app purchases.', 'Idle Planes: pacing, upgrade economy, UX reviews and three minigames.'],
        pt: ['Smashing Four: novos heróis (Bloodbite, Sheriff, Otter), rebalanceamento, Hero Event 2.0 e live ops: eventos, passe de temporada, notícias e conteúdo no jogo.', 'Auction City: passe de temporada Hunter Pass, novo onboarding, sistema de Estátuas e um conceito de gacha.', 'We Are Illuminati: novo layout, uma história paralela com três finais, anúncios e compras in-app.', 'Idle Planes: ritmo, economia de upgrades, revisões de UX e três minigames.']
      }
    },
    {
      org: 'Betsie', when: { en: 'Jul – Nov 2024', pt: 'jul – nov 2024' },
      role: { en: 'UX/Product Design Consultant', pt: 'Consultor de UX e Produto' },
      where: { en: 'Startup · San Francisco · Remote', pt: 'Startup · San Francisco · Remoto' },
      points: {
        en: ['Added gamification to a social betting app: onboarding, scoring and feedback.', 'Delivered a clickable prototype and a showcase video for the pitch.'],
        pt: ['Adicionei gamificação a um app social de apostas: onboarding, pontuação e feedback.', 'Entreguei um protótipo navegável e um vídeo de apresentação para o pitch.']
      }
    },
    {
      org: 'Lumen Games', when: { en: '2021 – 2022', pt: '2021 – 2022' },
      role: { en: 'Producer / Game Designer', pt: 'Produtor / Game Designer' },
      where: { en: 'Game studio · Aracaju · Remote', pt: 'Estúdio de jogos · Aracaju · Remoto' },
      points: {
        en: ['Managed art production and the technical pipeline for Hemp Paradise.', 'Ran the live game: events, news and content. Designed retention and monetization events.', 'Analysed playtests and turned the findings into design changes.'],
        pt: ['Gerenciei a produção de arte e o pipeline técnico do Hemp Paradise.', 'Cuidei do live ops: eventos, notícias e conteúdo. Criei eventos de retenção e monetização.', 'Analisei playtests e transformei os insights em mudanças de design.']
      }
    },
    {
      org: 'PROAC', when: { en: '2021 – 2022', pt: '2021 – 2022' },
      role: { en: 'Game Design Intern', pt: 'Estagiário de Game Design' },
      where: { en: 'Cultural grant · São Paulo · Remote', pt: 'Edital cultural · São Paulo · Remoto' },
      points: {
        en: ['Worked on systems and gameplay for an experimental mobile game funded by a São Paulo cultural grant.'],
        pt: ['Trabalhei nos sistemas e no gameplay de um jogo mobile experimental financiado por um edital cultural de São Paulo.']
      }
    }
  ],

  /* ---------- Education (skill tree) ----------
     branch: foundation | behavior | strategy ; status: done | progress
  */
  skills: [
    {
      id: 'gamedesign', branch: 'foundation', status: 'done',
      name: { en: 'Game Design', pt: 'Design de Games' },
      kind: { en: 'Bachelor’s · Universidade Anhembi Morumbi', pt: 'Bacharelado · Universidade Anhembi Morumbi' },
      when: '2019 – 2023', grade: '96',
      core: { en: ['Game systems', 'Level design and narrative', 'Prototyping board and digital games', 'UX/UI design', 'Unity and C#', 'Teamwork and leadership'], pt: ['Sistemas de jogo', 'Level design e narrativa', 'Prototipação de jogos de tabuleiro e digitais', 'Design de UX/UI', 'Unity e C#', 'Trabalho em equipe e liderança'] },
      extra: { en: ['Dean’s List (2019)', 'Student Ambassador (2020–2021)', 'Full scholarship, graduated with distinction'], pt: ['Dean’s List (2019)', 'Embaixador estudantil (2020–2021)', 'Bolsa integral, formado com distinção'] }
    },
    {
      id: 'theatre', branch: 'foundation', status: 'done',
      name: { en: 'Theatre', pt: 'Teatro' },
      kind: { en: 'Technical course · Senac São Paulo', pt: 'Curso técnico · Senac São Paulo' },
      when: '2015 – 2016', grade: { en: 'Great', pt: 'Ótimo' },
      core: { en: ['Stage presence', 'Communication', 'Improvisation', 'Storytelling'], pt: ['Presença de palco', 'Comunicação', 'Improvisação', 'Storytelling'] },
      extra: { en: ['Acting, musical theatre, stage direction and public speaking'], pt: ['Atuação, teatro musical, direção cênica e oratória'] }
    },
    {
      id: 'gamification', branch: 'behavior', status: 'done',
      name: { en: 'Games and Gamification in Education', pt: 'Games e Gamificação na Educação' },
      kind: { en: 'Postgraduate · UNINTER', pt: 'Pós-graduação · UNINTER' },
      when: '2023 – 2024', grade: '100',
      core: { en: ['Habit loops', 'Motivation theory', 'Reward systems', 'Behavior design'], pt: ['Loops de hábito', 'Teoria da motivação', 'Sistemas de recompensa', 'Design comportamental'] },
      extra: { en: ['UX for games', 'Gamified interfaces', 'Design for engagement'], pt: ['UX para jogos', 'Interfaces gamificadas', 'Design para engajamento'] }
    },
    {
      id: 'neuro', branch: 'behavior', status: 'done',
      name: { en: 'Neuroeducation', pt: 'Neuroeducação' },
      kind: { en: 'Postgraduate · UNINTER', pt: 'Pós-graduação · UNINTER' },
      when: '2023 – 2024', grade: '100',
      core: { en: ['Learning psychology', 'Cognitive design', 'Emotional engagement', 'Educational UX'], pt: ['Psicologia da aprendizagem', 'Design cognitivo', 'Engajamento emocional', 'UX educacional'] },
      extra: { en: ['Cognitive neuroscience', 'Learning motivation'], pt: ['Neurociência cognitiva', 'Motivação na aprendizagem'] }
    },
    {
      id: 'mba-ux', branch: 'strategy', status: 'done',
      name: { en: 'MBA in Strategic Management in UX Design', pt: 'MBA em Gestão Estratégica em UX Design' },
      kind: { en: 'Postgraduate · UNINTER', pt: 'Pós-graduação · UNINTER' },
      when: '2025 – 2026',
      core: { en: ['UX leadership and business strategy', 'Research-based product development', 'Information architecture and usability', 'Agile design delivery'], pt: ['Liderança de UX e estratégia de negócio', 'Desenvolvimento de produto orientado por pesquisa', 'Arquitetura da informação e usabilidade', 'Entrega ágil de design'] },
      extra: { en: ['UX metrics and UXOps', 'Neuromarketing', 'Design thinking'], pt: ['Métricas de UX e UXOps', 'Neuromarketing', 'Design thinking'] }
    },
    {
      id: 'mba-ai', branch: 'strategy', status: 'done',
      name: { en: 'MBA in AI-Oriented Innovation and UX', pt: 'MBA em Inovação Orientada por IA e UX' },
      kind: { en: 'Postgraduate · UNIFAST', pt: 'Pós-graduação · UNIFAST' },
      when: '2025 – 2026',
      core: { en: ['UX research and discovery with AI', 'AI agents and automation', 'ResearchOps and DesignOps', 'Cognitive biases and decision design'], pt: ['Pesquisa e discovery de UX com IA', 'Agentes de IA e automação', 'ResearchOps e DesignOps', 'Vieses cognitivos e design de decisão'] },
      extra: { en: ['Data visualization and statistics', 'Working as a one-person UX team'], pt: ['Visualização de dados e estatística', 'Atuar como um time de UX de uma pessoa só'] }
    },
    {
      id: 'unicorn', branch: 'strategy', status: 'done',
      name: { en: 'UX Unicorn 2.0', pt: 'UX Unicorn 2.0' },
      kind: { en: 'Professional certificate · Leandro Rezende', pt: 'Certificado profissional · Leandro Rezende' },
      when: '2025 – 2026',
      core: { en: ['UX research and usability testing', 'UX metrics (HEART, AARRR)', 'UX writing', 'Journey maps and service blueprints'], pt: ['Pesquisa de UX e testes de usabilidade', 'Métricas de UX (HEART, AARRR)', 'UX writing', 'Mapas de jornada e service blueprints'] },
      extra: { en: ['Workshop facilitation', 'Front-end for designers'], pt: ['Facilitação de workshops', 'Front-end para designers'] }
    }
  ],
  branches: {
    foundation: { en: 'Foundations', pt: 'Fundamentos' },
    behavior: { en: 'Behavior and learning', pt: 'Comportamento e aprendizagem' },
    strategy: { en: 'Strategy and research', pt: 'Estratégia e pesquisa' }
  },
  courses: ['Figma UI UX Design Advanced · BYOL (2025)', 'Figma UI UX Design Essentials · BYOL (2025)', 'UX/UI Design · Gama Academy (2023)', 'Math for Video Games · GameDev.tv (2023)', 'Design Sprint Master · SETA (2021)', 'Level Design Masterclass · Udemy (2021)', '3D Unity + Multiplayer · Udemy (2022)'],

  /* ---------- Achievements (quest log) ---------- */
  achievements: [
    { id: 'scout', xp: 10, t: { en: 'First steps', pt: 'Primeiros passos' }, d: { en: 'Scrolled past the top of the page', pt: 'Passou do topo da página' } },
    { id: 'reader', xp: 40, t: { en: 'Case closed', pt: 'Caso encerrado' }, d: { en: 'Read a project to the end', pt: 'Leu um projeto até o fim' } },
    { id: 'completionist', xp: 80, t: { en: 'Main quest', pt: 'Missão principal' }, d: { en: 'Opened all four Knomee projects', pt: 'Abriu os quatro projetos da Knomee' } },
    { id: 'polyglot', xp: 20, t: { en: 'Bilingual', pt: 'Bilíngue' }, d: { en: 'Switched language', pt: 'Trocou de idioma' } },
    { id: 'daynight', xp: 10, t: { en: 'Day and night', pt: 'Dia e noite' }, d: { en: 'Switched theme', pt: 'Trocou de tema' } },
    { id: 'climber', xp: 30, t: { en: 'Tree climber', pt: 'De galho em galho' }, d: { en: 'Opened three items in Education', pt: 'Abriu três itens em Formação' } },
    { id: 'party', xp: 100, t: { en: 'Party invite', pt: 'Convite para a party' }, d: { en: 'Copied my email or opened LinkedIn', pt: 'Copiou meu e-mail ou abriu o LinkedIn' } },
    { id: 'secret', xp: 50, secret: true, t: { en: 'Old school', pt: 'Das antigas' }, d: { en: 'Entered the Konami code', pt: 'Digitou o código Konami' } }
  ],
  levels: [0, 50, 140, 260]
};
