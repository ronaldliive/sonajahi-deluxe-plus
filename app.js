/* Sõnajahi Seiklus – Mobile-first reading trainer */
(function(){
  'use strict';
  const EL = sel => document.querySelector(sel);
  const ELS = sel => Array.from(document.querySelectorAll(sel));

  // State
  // --- Levels (5) from easy to hard ---
  const LEVELS = [
    // Level 1: väga lihtne, lühikesed sõnad, selged emotikonid
    [
      { word: 'KOOK', emojis: ['🍰','🔔','☀️'], answer: 0 },
      { word: 'KASS', emojis: ['🐱','🐶','🌧️'], answer: 0 },
      { word: 'KOER', emojis: ['🐶','🐱','🐭'], answer: 0 },
      { word: 'AUTO', emojis: ['🚗','🍎','🐟'], answer: 0 },
      { word: 'BUSS', emojis: ['🚌','🚲','🚂'], answer: 0 },
      { word: 'PALL', emojis: ['🏀','🧸','🧃'], answer: 0 },
      { word: 'NUKK', emojis: ['🧸','🎲','🎈'], answer: 0 },
      { word: 'LILL', emojis: ['🌸','🌧️','🌙'], answer: 0 },
      { word: 'LEHT', emojis: ['🍃','🌵','🌲'], answer: 0 },
      { word: 'KALA', emojis: ['🐟','🍇','🌳'], answer: 0 },
      { word: 'PÄIKE', emojis: ['☀️','🌙','🌧️'], answer: 0 },
      { word: 'KUU', emojis: ['🌙','☁️','⭐'], answer: 0 },
      { word: 'TÄHT', emojis: ['⭐','⚡','💥'], answer: 0 },
      { word: 'MAJA', emojis: ['🏠','🚲','🍭'], answer: 0 },
      { word: 'PUU', emojis: ['🌳','🌵','🍀'], answer: 0 },
      { word: 'MUNA', emojis: ['🥚','🍎','🧀'], answer: 0 },
      { word: 'LEHM', emojis: ['🐮','🐭','🐔'], answer: 0 },
      { word: 'SAI', emojis: ['🍞','🥐','🥖'], answer: 0 },
      { word: 'ÕUN', emojis: ['🍎','🍒','🍓'], answer: 0 },
      { word: 'PIRN', emojis: ['🍐','🍋','🍏'], answer: 0 },
      { word: 'KOKK', emojis: ['👨‍🍳','👨‍⚕️','👮‍♂️'], answer: 0 },
      { word: 'KIRVES', emojis: ['🪓','🔧','🔨'], answer: 0 },
      { word: 'RAHA', emojis: ['💰','🧯','🔔'], answer: 0 }
    ],
    // Level 2: diakriitikutega ja tuttavad asjad (edasijõudnu)
    [
      { word: 'LUMI', emojis: ['❄️','🔥','🌊'], answer: 0 },
      { word: 'SÜDA', emojis: ['❤️','💙','💛'], answer: 0 },
      { word: 'PÄHKEL', emojis: ['🌰','🥜','🍞'], answer: 0 },
      { word: 'SAI', emojis: ['🍞','🥐','🥖'], answer: 0 },
      { word: 'JÄÄ', emojis: ['🧊','🔥','🧵'], answer: 0 },
      { word: 'RAAMAT', emojis: ['📖','📕','📗'], answer: 0 },
      { word: 'KING', emojis: ['👟','🧦','👒'], answer: 0 },
      { word: 'KINDAD', emojis: ['🧤','🧦','🧣'], answer: 0 },
      { word: 'MÜTS', emojis: ['🧢','🧣','👓'], answer: 0 },
      { word: 'SUKK', emojis: ['🧦','🧤','👟'], answer: 0 },
      { word: 'KOHV', emojis: ['☕','🥛','🍵'], answer: 0 },
      { word: 'TEE', emojis: ['🍵','🥛','🍺'], answer: 0 },
      { word: 'VAARIKAS', emojis: ['🍓','🍒','🍅'], answer: 0 },
      { word: 'MUSTIKAS', emojis: ['🫐','🍇','🍏'], answer: 0 },
      { word: 'ÕUN', emojis: ['🍎','🍒','🍓'], answer: 0 },
      { word: 'PIRN', emojis: ['🍐','🍋','🍏'], answer: 0 },
      { word: 'KIRSS', emojis: ['🍒','🍓','🍎'], answer: 0 },
      { word: 'KÜÜSLAUK', emojis: ['🧄','🥬','🌽'], answer: 0 },
      { word: 'SEEN', emojis: ['🍄','🌰','🥜'], answer: 0 },
      { word: 'VEEDEL', emojis: ['💧','🔥','🌪️'], answer: 0 },
      { word: 'LENDUR', emojis: ['👨‍✈️','👷','👨‍🍳'], answer: 0 }
    ],
    // Level 3: pikemad või segadust tekitavad paarid (ekspert)
    [
      { word: 'ARBUUS', emojis: ['🍉','🍏','🍇'], answer: 0 },
      { word: 'PORGAND', emojis: ['🥕','🌽','🍞'], answer: 0 },
      { word: 'KURK', emojis: ['🥒','🥬','🌽'], answer: 0 },
      { word: 'MAASIKAS', emojis: ['🍓','🍒','🍎'], answer: 0 },
      { word: 'MELON', emojis: ['🍈','🍏','🍐'], answer: 0 },
      { word: 'DRAAKON', emojis: ['🐉','🐲','🦖'], answer: 0 },
      { word: 'RONG', emojis: ['🚆','🚗','🚲'], answer: 0 },
      { word: 'LENDUR', emojis: ['👨‍✈️','👷','👨‍🍳'], answer: 0 },
      { word: 'KELL', emojis: ['⏰','🧭','⌛'], answer: 0 },
      { word: 'LIBLIKAS', emojis: ['🦋','🐝','🐞'], answer: 0 },
      { word: 'JÄNES', emojis: ['🐰','🐹','🐭'], answer: 0 },
      { word: 'AHV', emojis: ['🐵','🦁','🐯'], answer: 0 },
      { word: 'SIIL', emojis: ['🦔','🐷','🐭'], answer: 0 },
      { word: 'ELEKTER', emojis: ['⚡','💡','🔌'], answer: 0 },
      { word: 'TELEFON', emojis: ['📱','📞','📟'], answer: 0 },
      { word: 'LAEV', emojis: ['🚢','⛵','🛶'], answer: 0 },
      { word: 'ASTRONOOM', emojis: ['🧑‍🚀','👨‍🔧','🧑‍🎓'], answer: 0 },
      { word: 'ROBOTT', emojis: ['🤖','👾','🧠'], answer: 0 },
      { word: 'TEADLANE', emojis: ['🧑‍🔬','👨‍🎓','🧑‍🍳'], answer: 0 }
    ],
    // Level 4: loomad/objektid sarnaste segajatega
    [
      { word: 'JÄNES', emojis: ['🐰','🐹','🐭'], answer: 0 },
      { word: 'AHV', emojis: ['🐵','🦁','🐯'], answer: 0 },
      { word: 'RONG', emojis: ['🚆','🚗','🚲'], answer: 0 },
      { word: 'LENDUR', emojis: ['👨‍✈️','👷','👨‍🍳'], answer: 0 },
      { word: 'KELL', emojis: ['⏰','🧭','⌛'], answer: 0 },
    ],
    // Level 5: pikemad ja harvemad sõnad
    [
      { word: 'LIBLIKAS', emojis: ['🦋','🐝','🐞'], answer: 0 },
      { word: 'DRAAKON', emojis: ['🐉','🐲','🦖'], answer: 0 },
      { word: 'ELEKTER', emojis: ['⚡','💡','🔌'], answer: 0 },
      { word: 'LAEVAL', emojis: ['🚢','⛵','🛶'], answer: 0 },
      { word: 'TELEFON', emojis: ['📱','📞','📟'], answer: 0 },
    ],
  ];

  // Per-level rewards
  const REWARDS = [
    { icon: '⭐', text: 'Kuldne täht' },
    { icon: '🎖️', text: 'Vapra mängija medal' },
    { icon: '🏅', text: 'Meistri märk' },
    { icon: '🏆', text: 'Võidukarikas' },
    { icon: '👑', text: 'Kuninglik kroon' },
  ];

  // Robust shuffle using Fisher–Yates with crypto fallback
  function rng(){
    try{
      const u = new Uint32Array(1);
      crypto.getRandomValues(u);
      return u[0] / 2**32;
    }catch{ return Math.random(); }
  }
  function shuffleArray(arr){
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(rng() * (i + 1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  // --- Large word bank loader (manifest + chunks) ---
  async function loadWordBank(){
    try{
      // Prefer chunked manifest; fall back to words.json if present
      let manifest;
      try{
        const mr = await fetch('words_manifest.json', { cache: 'no-store' });
        if(mr.ok) manifest = await mr.json();
      }catch{}
      if(manifest && manifest.levels){
        await loadFromManifest(manifest);
        return;
      }
      // fallback
      try{
        const res = await fetch('words.json', { cache: 'no-store' });
        if(res.ok){
          const data = await res.json();
          await mergeWordBank(data);
        }
      }catch{}
    }catch(e){ /* ignore offline or missing */ }
  }

  async function loadFromManifest(man){
    const byLevel = man.levels || {};
    // helper to fetch JSON safely
    const fetchJson = async (path)=>{
      try{ const r = await fetch(path, { cache:'no-store' }); return r.ok ? r.json() : null; }catch{ return null; }
    };
    // gather words arrays
    const mergeUpper = (arr)=> (Array.isArray(arr)?arr:[]).map(w=> (w||'').toUpperCase());
    const uniq = (arr)=> Array.from(new Set(arr));
    const pushLevel = (levelIdx, wordsArr, filterFn)=>{
      const tasks = wordsArr.map(toTask).filter(Boolean);
      const filtered = typeof filterFn==='function' ? tasks.filter(t=>filterFn(t.word)) : tasks;
      LEVELS[levelIdx].push(...filtered);
    };
    // Algaja
    if(Array.isArray(byLevel.algaja)){
      let all = [];
      for(const f of byLevel.algaja){ const j = await fetchJson(f); if(j && Array.isArray(j.words)) all = all.concat(mergeUpper(j.words)); }
      all = uniq(all);
      pushLevel(0, all, w=> w.length <= 5);
    }
    // Edasijõudnu (accept both keys)
    const adv = Array.isArray(byLevel.edasijoudnu)? byLevel.edasijoudnu : byLevel.edasijõudnu;
    if(Array.isArray(adv)){
      let all = [];
      for(const f of adv){ const j = await fetchJson(f); if(j && Array.isArray(j.words)) all = all.concat(mergeUpper(j.words)); }
      all = uniq(all);
      pushLevel(1, all);
    }
    // Ekspert
    if(Array.isArray(byLevel.ekspert)){
      let all = [];
      for(const f of byLevel.ekspert){ const j = await fetchJson(f); if(j && Array.isArray(j.words)) all = all.concat(mergeUpper(j.words)); }
      all = uniq(all);
      pushLevel(2, all);
    }
  }

  function toTask(w){
    const word = (w||'').toUpperCase();
    if(!word) return null;
    const emo = canonicalEmojiForWord(word, null);
    // Include all words; emoji is optional and only used for emoji rounds
    return { word, emojis: emo ? [emo] : [], answer: 0 };
  }

  async function mergeWordBank(data){
    if(!data || !data.levels) return;
    const L = data.levels;
    const addMany = (arr, intoLevel, filterFn) => {
      if(!Array.isArray(arr)) return;
      const tasks = arr.map(toTask).filter(Boolean);
      const filtered = typeof filterFn === 'function' ? tasks.filter(t => filterFn(t.word)) : tasks;
      LEVELS[intoLevel].push(...filtered);
    };
    // Level 0: Algaja – max 5 letters
    addMany(L.algaja, 0, w => w.length <= 5);
    // Level 1: Edasijõudnu – allow accents/common words
    addMany(L.edasijoudnu || L.edasijõudnu, 1);
    // Level 2: Ekspert – longer words ok
    addMany(L.ekspert, 2);
  }

  let taskIndex = 0, correct = 0, wrong = 0, coins = 0, stickers = 0;
  let roundCounter = 0; // strictly alternate rounds: even = word->emoji, odd = emoji->word
  let lastWordShown = null; // for banning its emoji in the next emoji-choice round
  let banNextEmoji = null; // emoji to exclude from next emoji-choice options
  const seenWords = new Set(); // prevent repeats across the whole session until refresh
  const seenEmojis = new Set(); // prevent showing the same emoji twice in a session
  let currentTask = null; // holds the active task so TTS can use the exact word
  let results = []; // per-task result: true/false/null
  let levelIndex = 0; // 0..4
  let currentOrder = [];
  let currentRoundType = null; // 'word_to_emoji' or 'emoji_to_word'
  let proceedHandler = null; // overlay continue

  // Elements
  const tasksCount = EL('#tasks-count');
  const tasksTotal = EL('#tasks-total');
  const correctCount = EL('#correct-count');
  const wrongCount = EL('#wrong-count');
  const coinCount = EL('#coin-count');
  const stickerCount = EL('#sticker-count');
  const progress = null; // progress bar removed
  const feedback = EL('#feedback');
  const dots = EL('#dots');
  const pillCorrect = EL('#pill-correct');
  const pillWrong = EL('#pill-wrong');
  const letters = EL('#letters');
  const choices = EL('#choices');
  const floaters = EL('#floaters');
  const btnSkip = EL('#btn-skip');
  const btnNew = EL('#btn-new');
  const btnSay = EL('#btn-say');
  // Answer overlay elements
  const ansOverlay = EL('#answer-overlay');
  const ansEmoji = EL('#answer-emoji');
  const ansTitle = EL('#answer-title');
  const ansSub = EL('#answer-sub');
  const ansCounter = EL('#answer-counter');
  const ansNext = EL('#answer-next');
  // Welcome overlay removed; inline level selection is used
  const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let audioUnlocked = false;

  function sessionLen(){
    const total = currentOrder.length || LEVELS[levelIndex].length;
    return Math.min(10, total);
  }
  tasksTotal.textContent = sessionLen();

  // Filter: Beginner level should only contain short words (<=5 letters)
  try{
    if(Array.isArray(LEVELS[0])){
      LEVELS[0] = LEVELS[0].filter(t => (t.word || '').length <= 5 && (t.word || '').toUpperCase() !== 'KIRVES');
    }
  }catch(e){ /* ignore */ }

  function toast(msg){
    let t = EL('.toast');
    if(!t){ t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    setTimeout(()=> t.classList.remove('show'), 900);
  }

  // --- Haptics helper (best-effort across platforms) ---
  function haptic(type){
    try{
      if(navigator && typeof navigator.vibrate === 'function'){
        if(type === 'success') navigator.vibrate([12, 20, 12]);
        else if(type === 'error') navigator.vibrate([20, 40, 20]);
        else navigator.vibrate(8);
      }
      // Future: add platform-specific hooks if available
    }catch(e){ /* ignore */ }
  }

  function playBuzz(){
    try{
      if(!audioCtx){ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      const now = audioCtx.currentTime;
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      g.connect(audioCtx.destination);
      const o = audioCtx.createOscillator();
      o.type = 'square';
      o.frequency.setValueAtTime(220, now);
      o.frequency.setValueAtTime(180, now + 0.12);
      o.connect(g);
      o.start(now);
      o.stop(now + 0.25);
    }catch(e){ /* ignore */ }
  }

  // --- Chime sound for correct answer ---
  let audioCtx = null;
  async function unlockAudio(){
    try{
      if(audioUnlocked) return;
      if(!audioCtx){ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      if(audioCtx.state === 'suspended' && audioCtx.resume){ await audioCtx.resume(); }
      // play a tiny silent buffer to satisfy iOS gesture requirement
      const buf = audioCtx.createBuffer(1, 1, 22050);
      const src = audioCtx.createBufferSource();
      src.buffer = buf; src.connect(audioCtx.destination); src.start(0);
      audioUnlocked = true;
    }catch(e){ /* best-effort */ }
  }
  function playChime(){
    try{
      if(!audioCtx){ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
      const now = audioCtx.currentTime;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      gain.connect(audioCtx.destination);

      const o1 = audioCtx.createOscillator();
      o1.type = 'sine';
      o1.frequency.setValueAtTime(880, now); // A5
      o1.frequency.linearRampToValueAtTime(988, now + 0.18); // B5 glide
      o1.connect(gain);
      o1.start(now);
      o1.stop(now + 0.35);

      // Second short sparkle
      const o2 = audioCtx.createOscillator();
      const g2 = audioCtx.createGain();
      g2.gain.setValueAtTime(0.0001, now + 0.18);
      g2.gain.exponentialRampToValueAtTime(0.15, now + 0.20);
      g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.40);
      o2.type = 'triangle';
      o2.frequency.setValueAtTime(1319, now + 0.18); // E6
      o2.connect(g2); g2.connect(audioCtx.destination);
      o2.start(now + 0.18);
      o2.stop(now + 0.40);
    }catch(e){ /* ignore audio errors */ }
  }

  // --- TTS (TartuNLP v2) ---
  const TTS_ENDPOINT = 'https://api.tartunlp.ai/text-to-speech/v2';
  const ttsCache = new Map(); // key: `${speaker}|${speed}|${text}` -> objectURL

  function currentWord(){
    return ELS('.letter').map(n=>n.textContent).join('');
  }

  async function speakText(text, speaker='mari', spd=1){
    const key = `${speaker}|${spd}|${text}`;
    if(ttsCache.has(key)){
      return playUrl(ttsCache.get(key));
    }
    const res = await fetch(TTS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, speaker, speed: spd })
    });
    if(!res.ok){
      const msg = await safeText(res);
      throw new Error(`TTS HTTP ${res.status}: ${msg}`);
    }
    const blob = await res.blob(); // audio/wav
    const url = URL.createObjectURL(blob);
    ttsCache.set(key, url);
    return playUrl(url);
  }

  function playUrl(url){
    return new Promise((resolve) => {
      const a = new Audio();
      a.src = url;
      a.onended = ()=> resolve();
      a.onerror = ()=> resolve();
      a.play().catch(()=> resolve());
    });
  }

  async function safeText(res){
    try{ return await res.text(); }catch{ return ''; }
  }

  function animatePill(el, anim){
    if(!el) return;
    el.classList.remove('anim-bump','anim-shake');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add(anim === 'bump' ? 'anim-bump' : 'anim-shake');
    setTimeout(()=>{
      el.classList.remove('anim-bump','anim-shake');
    }, 450);
  }

  function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  const PRAISES = [
    'Tubli!','Väga hea!','Suurepärane!','Hästi tehtud!','Vinge!',
    'Jätka samas vaimus!','Imeline!','Lahe töö!','Täpselt nii!','Õige vastus!',
    'Fantastiline!','Suurepärane pingutus!','Super!','Vägev!','Oi kui nutikas!',
    'See oli meisterlik!','Sa oled tõeline tegija!','Väga tubli töö!','Kõrgelt kiidetud!','Täpselt pihta!',
    'Võrratu!','Ülimalt tubli!','See läks hiilgavalt!','Muljetavaldav!','Puhas kuld!',
    'Täpsus nagu kellavärk!','Bravuurikas sooritus!','Õppur meister!','Ääretult tubli!','Sära edasi!',
    'Tark tegu!','Täitsa super!','See oli võit!','Käsi südamel – suurepärane!','Oivaline töö!',
    'Väga nutikas valik!','See oli õige mõte!','Hakkab looma!','Tipptulemus!','Suure töö võit!',
    'Puhas rõõm!','Kõik klappis suurepäraselt!','Parim tulemus!','Täielik õnnestumine!','Lust vaadata!',
    'Sa said sellega hakkama!','Väga selge vastus!','Tubli pingutus!','Edukas samm!','Õige tee!'
  ];
  let praiseQueue = [];
  function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
  function initPraiseQueue(){ praiseQueue = shuffle([...PRAISES]); }
  function praise(){
    if(!praiseQueue.length) initPraiseQueue();
    return praiseQueue.shift();
  }

  // Short encouragements for wrong answers (kid-friendly, positive)
  const ENCOURAGES = [
    'Pole hullu, proovi veel!', 'Tubli katse!', 'Lähme edasi!', 'Sa saad hakkama!', 'Hea püüe!',
    'Veel natuke ja õnnestub!', 'Ära anna alla!', 'Proovime uuesti!', 'Suurepärane püüdlus!', 'Kohe tuleb välja!'
  ];
  function encourage(){ return ENCOURAGES[Math.floor(Math.random()*ENCOURAGES.length)]; }

  function pickTask(){
    const levelTasks = LEVELS[levelIndex];
    const idx = currentOrder[taskIndex] ?? Math.min(taskIndex, levelTasks.length-1);
    return levelTasks[idx] || randomItem(levelTasks);
  }

  // --- Emoji choice builder to avoid ambiguous sets ---
  const EMOJI_CATEGORY = new Map([
    // animals
    ['🐱','animal'],['🐶','animal'],['🐭','animal'],['🦔','animal'],['🐰','animal'],['🐵','animal'],['🐝','animal'],['🐞','animal'],['🦋','animal'],['🐮','animal'],
    // vehicles
    ['🚗','vehicle'],['🚌','vehicle'],['🚆','vehicle'],['🚲','vehicle'],['🚢','vehicle'],['⛵','vehicle'],['🛶','vehicle'],
    // food
    ['🍰','food'],['🥖','food'],['🥐','food'],['🥞','food'],['🍎','food'],['🍐','food'],['🍒','food'],['🍓','food'],['🍇','food'],['🫐','food'],['🍉','food'],['🍈','food'],['🥕','food'],['🥒','food'],['🌰','food'],['🥜','food'],
    // drink
    ['☕','drink'],['🍵','drink'],['🥛','drink'],
    // plants/nature
    ['🌸','nature'],['🌳','nature'],['🍃','nature'],['🌵','nature'],['🍀','nature'],
    // weather/sky
    ['☀️','sky'],['🌙','sky'],['⭐','sky'],['❄️','sky'],
    // objects/symbols/tools
    ['📖','object'],['📕','object'],['📗','object'],['📱','object'],['📞','object'],['📟','object'],['⚡','object'],['💡','object'],['🔌','object'],['⏰','object'],['🧭','object'],['⌛','object'],['🎲','object'],['🎈','object'],['🧸','object'],['🔔','object'],
    // clothing
    ['👟','clothing'],['🧦','clothing'],['🧤','clothing'],['🧢','clothing'],['👒','clothing'],['🧣','clothing']
  ]);

  const WORD_EMOJI = new Map([
    ['RAAMAT','📖'],['RAAMATUD','📖'],['RAAMATU','📖'],
    ['KIRI','📜'],['POST','📮'],['PILT','🖼️'],['LAMP','💡'],['KELL','⏰'],
    ['ÕUN','🍎'],['PIRN','🍐'],['KIRSS','🍒'],['MAASIKAS','🍓'],['MUSTIKAS','🫐'],['ARBUUS','🍉'],['MELON','🍈'],['BANAAN','🍌'],['APELSIN','🍊'],['SIDRUN','🍋'],['VIINAMARI','🍇'],['PÄHKEL','🌰'],['SEEN','🍄'],['KURK','🥒'],['PORGAND','🥕'],['TOMAT','🍅'],['SAI','🍞'],['KOOK','🍰'],['MUNA','🥚'],['PANNKOOK','🥞'],
    ['KOHV','☕'],['TEE','🍵'],['PIIM','🥛'],['VESI','💧'],
    ['KASS','🐱'],['KOER','🐶'],['LEHM','🐮'],['SIIL','🦔'],['JÄNES','🐰'],['AHV','🐵'],['KALA','🐟'],['LINNUD','🐦'],['MESILANE','🐝'],['LEPATRIINU','🐞'],['LIBLIKAS','🦋'],['DRAAKON','🐉'],
    ['AUTO','🚗'],['BUSS','🚌'],['RONG','🚆'],['LAEV','🚢'],['PAAT','🛶'],['RATAS','🚲'],['LENNUK','✈️'],
    ['MAJA','🏠'],['KOOL','🏫'],['POOD','🏬'],['KLOSS','🧱'],
    ['PÄIKE','☀️'],['KUU','🌙'],['TÄHT','⭐'],['LUMI','❄️'],['VIHM','🌧️'],['TORM','⛈️'],['TUUL','🌬️'],['VIKERKAAR','🌈'],
    ['LILL','🌸'],['PUU','🌳'],['LEHT','🍃'],['KAKTUS','🌵'],
    ['UKS','🚪'],['AKEN','🪟'],['VOODI','🛏️'],['TOOL','🪑'],['DIIVAN','🛋️'],['VANN','🛁'],['DUŠŠ','🚿'],['TUALett','🚽'],
    ['NUGA','🔪'],['KAHVEL','🍴'],['LUSIKAS','🥄'],['PANN','🍳'],
    ['KAPP','🗄️'],['KOHVER','🧳'],['KÄÄRID','✂️'],['KLEEBIS','🏷️'],
    ['TELEFON','📱'],['TELEKA','📺'],['ARVUTI','💻'],['MÄNGUKONSOOL','🎮'],
    ['KIRJUTUSLAUD','🖊️'],['PLAIIATS','✏️'],['KUMM','🧽'],['LIIM','🧴'],
    ['KELL','⏰'],['KAARDID','🃏'],['MÄNG','🎲'],['ÕHUPALL','🎈'],
    ['RAHA','💰'],['VÕTI','🔑'],['LUKK','🔒'],['ELEKTER','⚡'],['PÕLEMA','🔥'],
    ['KROON','👑'],['MEDAL','🏅'],['KARIKAS','🏆'],
    ['PÄEV','📅'],['KAART','🗺️'],['KIRI','✉️'],['PAKK','📦']
  ]);

  function canonicalEmojiForWord(word, fallback){
    const key = (word||'').toUpperCase();
    return WORD_EMOJI.get(key) || fallback;
  }

  function randomFromCategories(excludeCat, count){
    const pool = Array.from(EMOJI_CATEGORY.entries()).filter(([emo,cat])=> cat!==excludeCat).map(([emo])=>emo);
    const out = [];
    while(out.length < count && pool.length){
      const i = Math.floor(Math.random()*pool.length);
      const [emo] = pool.splice(i,1);
      out.push(emo);
    }
    return out;
  }

  function buildChoicesForTask(t, banEmoji){
    try{
      // Only use canonical mapping; if missing, abort to avoid placeholder icons
      const correct = canonicalEmojiForWord(t.word, null);
      if(!correct) return [];
      if(banEmoji && correct === banEmoji) return []; // force caller to pick another task
      const cat = EMOJI_CATEGORY.get(correct) || 'object';
      const distractors = randomFromCategories(cat, 2).filter(d => d !== correct && d !== banEmoji);
      while(distractors.length < 2){
        const all = Array.from(EMOJI_CATEGORY.keys());
        const pick = all[Math.floor(Math.random()*all.length)];
        if(pick !== correct && pick !== banEmoji && !distractors.includes(pick)) distractors.push(pick);
      }
      return [correct, ...distractors];
    }catch(e){
      // Fallback to provided task emojis if something goes wrong
      return [];
    }
  }

  function renderTask(){
    // If finished all tasks in the current level, handle level completion
    if(taskIndex >= currentOrder.length){
      finishLevel();
      return;
    }
    let t = pickTask();
    if(!t){
      showGameOver();
      return;
    }
    currentTask = t;
    letters.innerHTML = '';
    const phase = roundCounter % 3; // 0: word->emoji, 1: emoji->word, 2: word->word
    if(phase === 0){
      currentRoundType = 'word_to_emoji';
      // If this task's correct emoji equals banned one, skip forward to keep the game from being trivial
      let guard=0; let built=[]; let localT=t;
      while(guard<6){
        const testBuilt = buildChoicesForTask(localT, banNextEmoji);
        if(testBuilt && testBuilt.length){ built = testBuilt; break; }
        taskIndex++;
        if(taskIndex >= currentOrder.length){ finishLevel(); return; }
        localT = pickTask(); currentTask = localT;
        guard++;
      }
      if(!built.length){ built = []; }
      // mark actually shown word as seen
      if(localT && localT.word){ seenWords.add((localT.word||'').toUpperCase()); }
      // Show the word (letters) and ask to pick correct emoji (using localT)
      const letterEls = [];
      letters.innerHTML = '';
      (localT.word||'').toUpperCase().split('').forEach(ch => {
        const d = document.createElement('div');
        d.className = 'letter';
        d.textContent = ch;
        letters.appendChild(d);
        letterEls.push(d);
      });
      fitWordToContainer();
      renderChoicesEmoji(localT, built);
      // letter pop-in
      letterEls.forEach((el,i)=> setTimeout(()=> el.classList.add('pop'), 25 * i));
      // set ban for next emoji-choice round
      lastWordShown = (localT.word||'').toUpperCase();
      banNextEmoji = canonicalEmojiForWord(lastWordShown, null) || null;
      roundCounter++;
    } else if(phase === 1){
      currentRoundType = 'emoji_to_word';
      // Word-choice round: show the emoji (must exist), pick the correct WORD.
      // Find the next suitable task with a valid, unseen, and not-banned emoji without breaking alternation
      let attempts = 0; let emoji = canonicalEmojiForWord(t.word, null);
      while(attempts < 12 && (!emoji || emoji === '❓' || seenEmojis.has(emoji) || (banNextEmoji && emoji === banNextEmoji))){
        taskIndex++;
        if(taskIndex >= currentOrder.length){ finishLevel(); return; }
        t = pickTask();
        currentTask = t;
        emoji = canonicalEmojiForWord(t.word, null);
        attempts++;
      }
      if(!emoji || emoji==='❓'){ // no valid emoji -> skip to next
        taskIndex++;
        roundCounter++;
        return;
      }
      // mark actually shown word as seen
      if(t && t.word){ seenWords.add((t.word||'').toUpperCase()); }
      const e = document.createElement('div');
      e.className = 'emoji-stage';
      e.textContent = emoji;
      letters.appendChild(e);
      seenEmojis.add(emoji);
      renderChoicesWords(t);
      // after emoji->word round, clear ban if it matched the shown emoji
      const justShown = emoji;
      if(banNextEmoji && justShown === banNextEmoji){ banNextEmoji = null; }
      roundCounter++;
    }
    renderHUD();
    renderDots();
  }

  // --- Fit long words to container by scaling the letters row ---
  function fitWordToContainer(){
    try{
      const container = letters;
      if(!container) return;
      // reset transform and gap
      container.style.transform = 'scale(1)';
      container.style.transformOrigin = 'center center';
      // Try progressively tighter gaps if needed
      const gapOptions = ['16px','12px','8px','6px','4px','2px'];
      for(const gap of gapOptions){
        container.style.gap = gap;
        const avail = container.parentElement ? container.parentElement.clientWidth - 24 : container.clientWidth;
        const needed = container.scrollWidth;
        if(needed > 0 && avail > 0){
          const scale = Math.max(0.35, Math.min(1, avail / needed));
          container.style.transform = `scale(${scale})`;
          // if it fits without hitting min scale and not overflowing, stop early
          if(scale > 0.36 && needed * scale <= avail) break;
        }
      }
    }catch(e){ /* no-op */ }
  }
  window.addEventListener('resize', ()=>{ try{ fitWordToContainer(); }catch{} });

  function renderChoicesEmoji(t, prebuilt){
    choices.innerHTML = '';
    let built = Array.isArray(prebuilt) && prebuilt.length ? prebuilt.slice(0,3) : [];
    if(!built.length){
      try{ built = buildChoicesForTask(t, banNextEmoji) || []; }catch{ built = []; }
    }
    if(!built.length && Array.isArray(t.emojis)) built = t.emojis.slice(0,3);
    const order = [0,1,2].sort(()=> Math.random() - 0.5);
    const correctIndex = order.indexOf(0); // correct is at index 0 in built
    const created = [];
    order.forEach((srcIdx, pos) => {
      const emo = built[srcIdx];
      const c = document.createElement('button');
      c.className = 'choice enter ripple';
      c.setAttribute('type','button');
      c.setAttribute('aria-label', `Valik ${pos+1}`);
      c.innerHTML = `<div class="emoji">${emo}</div>`;
      const isCorrect = (pos === correctIndex);
      c.addEventListener('click', () => onChoose(isCorrect, c));
      choices.appendChild(c);
      created.push(c);
    });
    // staggered entrance
    requestAnimationFrame(()=>{
      created.forEach((el,i)=> setTimeout(()=> el.classList.add('show'), 40 * i));
    });
  }

  function buildWordChoicesForTask(t){
    const correct = (t.word||'').toUpperCase();
    const levelTasks = LEVELS[levelIndex] || [];
    // Build pool of distractor words (unique, not the same as correct)
    const pool = levelTasks
      .map(x => (x.word||'').toUpperCase())
      .filter(w => w && w !== correct);
    // Get two unique random distractors
    const picks = new Set();
    while(picks.size < 2 && pool.length){
      const i = Math.floor(Math.random()*pool.length);
      picks.add(pool.splice(i,1)[0]);
    }
    const distractors = Array.from(picks);
    while(distractors.length < 2){ distractors.push('XXXX'); }
    return [correct, ...distractors];
  }

  function renderChoicesWords(t){
    choices.innerHTML = '';
    let built = [];
    try{ built = buildWordChoicesForTask(t) || []; }catch{ built = []; }
    const order = [0,1,2].sort(()=> Math.random() - 0.5);
    const correctIndex = order.indexOf(0);
    const created = [];
    order.forEach((srcIdx, pos) => {
      const word = (built[srcIdx]||'').toUpperCase();
      const c = document.createElement('button');
      c.className = 'choice enter ripple';
      c.setAttribute('type','button');
      c.setAttribute('aria-label', `Valik ${pos+1}`);
      c.innerHTML = `<div class="word">${word}</div>`;
      const isCorrect = (pos === correctIndex);
      c.addEventListener('click', () => onChoose(isCorrect, c));
      choices.appendChild(c);
      created.push(c);
    });
    requestAnimationFrame(()=>{
      created.forEach((el,i)=> setTimeout(()=> el.classList.add('show'), 40 * i));
    });
  }

  function renderHUD(){
    tasksCount.textContent = taskIndex;
    correctCount.textContent = correct;
    if(wrongCount) wrongCount.textContent = wrong;
    coinCount.textContent = coins;
    stickerCount.textContent = stickers;
    // progress removed
    if(feedback){ feedback.className = 'feedback'; feedback.textContent = 'Vali õige pilt!'; }
  }

  function renderDots(){
    if(!dots) return;
    const frag = document.createDocumentFragment();
    for(let i=0;i<sessionLen();i++){
      const s = document.createElement('span');
      s.className = 'dot';
      if(i < results.length){
        const r = results[i];
        if(r === true) s.classList.add('good');
        else if(r === false) s.classList.add('bad');
      } else if(i === results.length){
        s.classList.add('current');
      }
      frag.appendChild(s);
    }
    dots.innerHTML = '';
    dots.appendChild(frag);
  }

  function onChoose(isCorrect, chosen){
    const buttons = ELS('.choice');
    buttons.forEach(b => b.disabled = true);
    chosen.classList.add(isCorrect ? 'correct' : 'wrong');

    if(isCorrect){
      haptic('success');
      correct++; coins += 1;
      if(correct % 4 === 0){ stickers += 1; toast('🎉 Saad kleepsu!'); }
      const say = praise();
      try{ window.lastPraise = say; }catch{}
      toast('✅ '+say);
      playChime();
      confetti(chosen);
      if(feedback){ feedback.className = 'feedback good'; feedback.textContent = say; }
      animatePill(pillCorrect, 'bump');
      results.push(true);
      try{ spawnBurstAt(chosen); }catch{}
    } else {
      haptic('error');
      toast('❌ Proovi uuesti!');
      wrong++;
      if(feedback){ feedback.className = 'feedback bad'; feedback.textContent = 'Vale vastus. Proovi järgmine!'; }
      animatePill(pillWrong, 'shake');
      results.push(false);
    }

    // Determine correct word for TTS in overlay
    const correctWord = (function(){
      if(currentRoundType === 'word_to_emoji') return lastWordShown;
      if(currentTask && currentTask.word) return (currentTask.word||'').toUpperCase();
      return lastWordShown || currentWord();
    })();

    // Show per-answer overlay with counter (X / 10) and wait for tap
    try{
      if(ansOverlay){
        const cur = Math.min(results.length, sessionLen());
        if(ansEmoji) ansEmoji.textContent = isCorrect ? '🎉' : '❌';
        if(ansTitle) ansTitle.textContent = isCorrect ? 'Tubli!' : 'Proovi järgmine!';
        if(ansSub) ansSub.textContent = isCorrect ? 'Õige vastus' : 'Vale vastus';
        if(ansCounter) ansCounter.textContent = `${cur} / ${sessionLen()}`;
        const ansCorrectText = EL('#answer-correct-text');
        const ansWord = EL('#answer-word');
        if(ansWord){ ansWord.textContent = (correctWord||'') ? String(correctWord).toUpperCase() : ''; }
        if(ansCorrectText){
          const label = isCorrect ? 'Sõna' : 'Õige sõna oli';
          if(correctWord){ ansCorrectText.textContent = `${label}: ${correctWord}`; ansCorrectText.style.display = ''; }
          else { ansCorrectText.textContent = ''; ansCorrectText.style.display = 'none'; }
        }
        ansOverlay.style.display = 'flex';
        // TTS: correct => word then praise; wrong => word then short encouragement
        if(isCorrect){
          const say = (typeof window !== 'undefined' && window.lastPraise) ? window.lastPraise : undefined;
          const praiseText = say || 'Tubli!';
          speakText(correctWord, 'mari', 0.9)
            .then(()=> speakText(praiseText.toLowerCase(), 'mari', 0.95))
            .catch(()=>{});
        } else {
          const after = encourage();
          speakText(correctWord, 'mari', 0.9)
            .then(()=> speakText(after.toLowerCase(), 'mari', 0.95))
            .catch(()=>{});
        }
      }
    }catch{}

    // Proceed only on JÄTKA tap
    const goNext = ()=>{
      if(ansOverlay){ ansOverlay.style.display = 'none'; }
      if(proceedHandler){ ansNext?.removeEventListener('click', proceedHandler); ansOverlay?.removeEventListener('click', proceedHandler); proceedHandler=null; }
      taskIndex++;
      if(taskIndex >= sessionLen()){
        levelComplete();
      } else {
        renderTask();
      }
    };
    if(ansNext){
      proceedHandler = goNext;
      // Delay enabling taps briefly to avoid accidental double-advance
      setTimeout(()=>{
        ansNext.addEventListener('click', proceedHandler, { once:true });
        // Also allow tapping anywhere on overlay to continue
        ansOverlay?.addEventListener('click', proceedHandler, { once:true });
      }, 250);
    } else {
      // no auto-dismiss fallback; require user action
    }
  }

  function levelComplete(){
    toast(`Tase ${levelIndex+1} läbitud! Õigeid: ${correct}/${sessionLen()}`);
    // progress removed
    // Järgmine tase kui on
    if(levelIndex < LEVELS.length-1){
      levelIndex++;
      startLevel();
    } else {
      // Show game over overlay
      const over = EL('#gameover');
      const title = EL('#gameover-title');
      const text = EL('#gameover-text');
      if(over){
        if(title) title.textContent = 'Suurepärane!';
        if(text) text.textContent = `Kõik tasemed läbitud! Õigeid vastuseid: ${correct}. Soovid mängida uuesti?`;
        over.style.display = 'flex';
        const btnAgain = EL('#btn-again');
        const btnQuit = EL('#btn-quit');
        if(btnAgain){ btnAgain.onclick = ()=>{ over.style.display='none'; resetSession(); }; }
        if(btnQuit){ btnQuit.onclick = ()=>{ text.textContent = 'Aitäh mängimast! Kohtumiseni!'; }; }
      } else {
        toast('🎉 Kõik tasemed läbitud!');
      }
    }
  }

  function resetSession(){
    levelIndex = 0;
    seenWords.clear();
    seenEmojis.clear();
    roundCounter = 0;
    startLevel();
  }

  function startLevel(){
    taskIndex = 0; correct = 0; wrong = 0; coins = 0; stickers = 0; results = []; roundCounter = 0;
    // reset emoji repetition tracker per level start
    seenEmojis.clear();
    // Build a no-repeat order for the entire level (supports very large pools)
    const levelArr = LEVELS[levelIndex];
    // Build unique-by-word index list to avoid duplicates from large pools
    const seenLocal = new Set();
    const uniqueIdx = levelArr
      .map((t, i) => ({ i, w: (t.word||'').toUpperCase() }))
      .filter(o => {
        if(!o.w) return false;
        if(seenLocal.has(o.w)) return false;
        seenLocal.add(o.w);
        return true;
      });
    const eligibleIdx = uniqueIdx
      .filter(o => !seenWords.has(o.w))
      .map(o => o.i);
    const baseIdx = eligibleIdx.length ? eligibleIdx : levelArr.map((_,i)=>i);
    currentOrder = shuffleArray(baseIdx.slice());
    // Rotate by a random offset so the first words vary between sessions
    if(currentOrder.length > 1){
      const offset = Math.floor(rng() * currentOrder.length);
      if(offset){ currentOrder = currentOrder.slice(offset).concat(currentOrder.slice(0, offset)); }
    }
    tasksTotal.textContent = sessionLen();
    // reflect current level in dropdown if present
    const sel = EL('#level-select');
    if(sel){ sel.value = String(levelIndex); }
    // Näita eesmärki
    const r = REWARDS[levelIndex];
    toast(`Tase ${levelIndex+1}: Eesmärk – ${r.icon} ${r.text}`);
    if(feedback){ feedback.className = 'feedback'; feedback.textContent = `Tase ${levelIndex+1}. Eesmärk: ${r.icon} ${r.text}`; }
    renderTask();
    // start ambient floaters
    try{ startFloaters(); }catch{}
  }

  // --- Delightful moving elements ('floaters') ---
  function rand(min,max){ return Math.random()*(max-min)+min; }
  function spawnFloater({emoji='✨', x=null, y=null, size=null, dur=null}){
    if(!floaters) return;
    const el = document.createElement('div');
    el.className = 'floater';
    el.textContent = emoji;
    const s = size || rand(18,36);
    const left = (x!=null? x : rand(0, window.innerWidth-20));
    const top = (y!=null? y : rand(0, window.innerHeight-20));
    el.style.left = left+ 'px';
    el.style.top = top + 'px';
    el.style.fontSize = s + 'px';
    el.style.animationDuration = (dur || rand(6,12)) + 's';
    floaters.appendChild(el);
    setTimeout(()=>{ el.remove(); }, 15000);
  }
  function startFloaters(){
    if(!floaters) return;
    if(floaters._loop) return;
    const loop = ()=>{
      if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ return; }
      const pool = ['✨','🌟','🫧','🎈','💫','⭐','🎉'];
      spawnFloater({ emoji: pool[Math.floor(Math.random()*pool.length)] });
      floaters._timer = setTimeout(loop, rand(1200, 2200));
    };
    floaters._loop = true;
    loop();
  }
  function spawnBurstAt(target){
    if(!floaters) return;
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const pool = ['✨','🌟','💥','💫','🎉'];
    for(let i=0;i<6;i++){
      setTimeout(()=> spawnFloater({ emoji: pool[i%pool.length], x: cx+rand(-10,10), y: cy+rand(-10,10), size: rand(18,34), dur: rand(4,8) }), i*60);
    }
  }

  // Events
  // Add ripple to static buttons
  document.querySelectorAll('.btn').forEach(b=> b.classList.add('ripple'));
  btnSkip.addEventListener('click', ()=>{ results.push(null); taskIndex++; renderTask(); });
  btnNew.addEventListener('click', resetSession);
  // Welcome/TTS greeting removed – start immediately
  // Level selection via dropdown
  const levelSelect = EL('#level-select');
  if(levelSelect){
    levelSelect.addEventListener('change', ()=>{
      const v = parseInt(levelSelect.value || '0', 10) || 0;
      levelIndex = Math.max(0, Math.min(v, LEVELS.length-1));
      startLevel();
    });
  }
  // No start button – levels can be switched any time from inline selector

  // --- Level completion flow ---
  const levelDone = EL('#leveldone');
  const btnLevelAgain = EL('#btn-level-again');
  const btnLevelNext = EL('#btn-level-next');

  function finishLevel(){
    // If last level, show final gameover overlay
    const lastLevel = (levelIndex >= LEVELS.length - 1);
    if(lastLevel){
      showGameOver();
      return;
    }
    // Otherwise, show level-done overlay with big praise and let the player decide
    if(levelDone){
      const titleEl = EL('#leveldone-title');
      const textEl = EL('#leveldone-text');
      const levelNames = ['Algaja','Edasijõudnu','Ekspert'];
      const name = levelNames[levelIndex] || 'Tase';
      if(titleEl){ titleEl.textContent = 'Väga tubli!'; titleEl.classList.add('big'); }
      if(textEl){ textEl.textContent = `${name} tase on läbitud. Soovid mängida sama taset uuesti või liikuda järgmisele tasemele?`; textEl.classList.add('big'); }
      levelDone.style.display = 'flex';
      // audio praise
      try{ speakText(praise(), 'mari', 0.95); }catch(e){}
    }
  }

  if(btnLevelAgain){
    btnLevelAgain.addEventListener('click', ()=>{
      if(levelDone) levelDone.style.display = 'none';
      // restart same level
      startLevel();
    });
  }
  if(btnLevelNext){
    btnLevelNext.addEventListener('click', ()=>{
      if(levelDone) levelDone.style.display = 'none';
      // move to next level on user decision only
      levelIndex = Math.min(levelIndex + 1, LEVELS.length - 1);
      startLevel();
    });
  }
  if(btnSay){
    btnSay.addEventListener('click', async ()=>{
      // Use the exact task word and lowercase it to prevent letter-by-letter spelling
      const text = (currentTask ? currentTask.word : currentWord()).toLowerCase();
      btnSay.disabled = true;
      try{
        await speakText(text, 'mari', 0.8);
      }catch(e){ console.error(e); toast('⚠️ TTS viga'); }
      finally{ btnSay.disabled = false; }
    });
  }

  // Start: load large word bank if available, then start level ONCE
  (async function init(){
    try{ await loadWordBank(); }catch(e){}
    initPraiseQueue();
    startLevel();
  })();

  // --- Confetti ---
  function confetti(anchor){
    const rect = anchor.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const colors = ['#22c55e','#60a5fa','#facc15','#ef4444','#a78bfa'];
    const n = 16;
    for(let i=0;i<n;i++){
      const s = document.createElement('span');
      s.style.position='fixed';
      s.style.left = cx+'px';
      s.style.top = cy+'px';
      s.style.width = s.style.height = (6+Math.random()*6)+'px';
      s.style.background = colors[i%colors.length];
      s.style.borderRadius = Math.random()>0.5?'2px':'50%';
      s.style.pointerEvents='none';
      s.style.zIndex='9999';
      document.body.appendChild(s);
      const ang = Math.random()*Math.PI*2;
      const dist = 60+Math.random()*80;
      const tx = Math.cos(ang)*dist;
      const ty = Math.sin(ang)*dist - 40; // slight upward arc
      const rot = (Math.random()*360)|0;
      s.animate([
        { transform:`translate(0,0) rotate(0deg)`, opacity:1 },
        { transform:`translate(${tx}px, ${ty}px) rotate(${rot}deg)`, opacity:0 }
      ], { duration: 800+Math.random()*400, easing:'cubic-bezier(.2,.7,.2,1)' })
      .onfinish = ()=> s.remove();
    }
  }
})();
