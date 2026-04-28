const STORAGE_KEY = "moon-lantern-save-v5";
const DEFAULT_ABILITY_IDS = ["focusLantern"];
const MAX_ACTIVE_ABILITIES = 2;
const TOAST_DURATION_MS = 3400;
const ABILITY_ORDER = [
  "focusLantern",
  "crescentSlash",
  "moonburst",
  "wardingLight",
  "ghoststep",
  "prismLance",
  "starfire",
  "solsticeBreak",
  "dawnflare",
];

const STAT_LABELS = {
  attack: "Power",
  defense: "Guard",
  maxHealth: "Health",
  resolve: "Resolve",
};

const PASSIVE_LABELS = {
  openingGuard: "Opening Guard",
  guardHeal: "Guard Mend",
  guardResolve: "Resolve on Guard",
  counterDamage: "Counter Damage",
  abilityPower: "Lantern Art Power",
  critChance: "Critical Edge",
  potionHeal: "Tonic Healing",
  potionResolve: "Tonic Resolve",
};

const SKILL_PATHS = {
  aegis: {
    name: "Aegis Route",
    summary: "Guard, counterplay, and surviving ugly fights.",
  },
  riven: {
    name: "Riven Route",
    summary: "Weapon pressure, crits, and heavier finishers.",
  },
  astral: {
    name: "Astral Route",
    summary: "Resolve economy, lantern arts, and steadier recovery.",
  },
};

const ORIGINS = {
  emberbrand: {
    name: "Emberbrand",
    rarity: "Common",
    weight: 5,
    summary: "+1 Power. Your hardest striking lantern arts run a little hotter.",
    introLine:
      "A coal-bright mark warms beneath your ribs as soon as the lantern touches your palms. Mira calls it an Emberbrand, the kind of gift that pushes a bearer toward decisive violence without ever quite forcing their hand.",
    bonusText:
      "Flare Lantern, Crescent Slash, Dawnflare, and Solstice Break hit a little harder than they should.",
    buffs: { attack: 1 },
    abilityMods: {
      focusLantern: { damage: 1 },
      crescentSlash: { damage: 2 },
      dawnflare: { damage: 2 },
      solsticeBreak: { damage: 2 },
    },
  },
  tidewrit: {
    name: "Tidewrit",
    rarity: "Common",
    weight: 4,
    summary: "+2 Health. Restorative techniques leave more behind.",
    introLine:
      "Cold script curls around your pulse and seals there. Tidewrit gifts never look dramatic from the outside, but old keepers swore they kept more bearers alive than any brighter miracle.",
    bonusText:
      "Flare Lantern and Dawnflare heal extra, Warding Light restores more, and Moonburst leaks a bit of Resolve back into you.",
    buffs: { maxHealth: 2 },
    abilityMods: {
      focusLantern: { heal: 1 },
      wardingLight: { heal: 2 },
      moonburst: { resolveGain: 1 },
      dawnflare: { heal: 1 },
    },
  },
  mirrorwake: {
    name: "Mirrorwake",
    rarity: "Uncommon",
    weight: 3,
    summary: "+1 Resolve. Glass-light techniques carve cleaner lines.",
    introLine:
      "For one blink you see a second version of your hands already moving with the lantern. Mirrorwake gifts are rare enough that Mira watches you in silence before she nods and tells you not to trust every reflection that answers back.",
    bonusText:
      "Moonburst strips more Guard, Prism Lance cuts deeper, and Starfire leaves a sharper weakness hanging in the air.",
    buffs: { resolve: 1 },
    abilityMods: {
      moonburst: { shred: 1 },
      prismLance: { damage: 2 },
      starfire: { weaken: 1 },
    },
  },
  duskveil: {
    name: "Duskveil",
    rarity: "Uncommon",
    weight: 2,
    summary: "+1 Guard. Wards and evasions leave more cover behind.",
    introLine:
      "A dusk-blue hush settles over your shoulders, so light you nearly miss it. Duskveil bearers are remembered less for glorious kills than for how often they walked out of fights everyone else thought had already closed over them.",
    bonusText:
      "Warding Light raises more Guard, Ghoststep leaves a shield after the miss, and Solstice Break braces you harder.",
    buffs: { defense: 1 },
    abilityMods: {
      wardingLight: { guard: 2 },
      ghoststep: { afterDodgeGuard: 2 },
      solsticeBreak: { guard: 1 },
    },
  },
  stormsigil: {
    name: "Stormsigil",
    rarity: "Rare",
    weight: 1,
    summary: "+1 Power, +1 Resolve. Several techniques pick up a small returning spark.",
    introLine:
      "Blue-white branches spit across your knuckles and vanish back into the dead lantern frame before Mira can say a word. She exhales like she has just remembered an old story she hoped the valley had outlived: a Stormsigil, rare and temperamental, but not enough to decide the climb for you on its own.",
    bonusText:
      "A handful of lantern techniques pick up a broad but modest edge instead of one overwhelming trick.",
    buffs: { attack: 1, resolve: 1 },
    abilityMods: {
      focusLantern: { damage: 1, resolveGain: 1 },
      moonburst: { damage: 1 },
      prismLance: { damage: 1 },
      dawnflare: { damage: 1 },
      solsticeBreak: { damage: 1 },
    },
  },
};

const AREA_THEME_BY_VISUAL = {
  village: "hollow",
  forest: "hollow",
  shrine: "hollow",
  wolf: "hollow",
  spider: "hollow",
  bridge: "bridge",
  drudge: "bridge",
  camp: "bridge",
  garden: "garden",
  stag: "garden",
  archive: "archive",
  knight: "archive",
  observatory: "spire",
  warden: "spire",
  spire: "spire",
  bloom: "spire",
  victory: "dawn",
};

const MENU_THEME_COPY = {
  hollow: {
    title: "Briar Road Kit",
    copy: "The lower road is where your origin first matters. Keep your loadout lean, read the room, and use the shrine and bridge puzzles to scavenge real leverage.",
  },
  bridge: {
    title: "Ravine Traveler Kit",
    copy: "Bridge wind and cliff shrines reward measured play. Armor, origin bonuses, and a disciplined tree path matter more than frantic button spam.",
  },
  garden: {
    title: "Glass Terrace Kit",
    copy: "The mid-mountain starts asking harder questions. Your chosen route should be visible in how you spend Resolve and what risks you accept.",
  },
  archive: {
    title: "Archive Field Notes",
    copy: "This stretch is about specialization. The wrong path is locked now, so squeeze everything you can out of the one you chose.",
  },
  spire: {
    title: "Starfall War Table",
    copy: "Bosses are stacked close together up here. Keep only your sharpest two techniques ready and let your origin tilt the edges of the fight.",
  },
  dawn: {
    title: "Dawnbearer Ledger",
    copy: "The climb is finished. The menu now reads like a build sheet for the run that carried the dawn back down the ridge.",
  },
};

const CUTSCENES = {
  prismStagPrelude: {
    chapter: "Boss Prelude",
    modeLabel: "Cutscene",
    title: "Prism Stag",
    objective: "The terrace ruler is finally showing itself.",
    visual: "stag",
    caption: "The mirrored terraces go still enough that every shard of light seems to lean toward a single set of antlers.",
    slides: [
      "The garden hushes before you ever see it. Reflections stop obeying their own angles. Moonlight climbs the terrace walls instead of falling across them, all of it being tugged toward something moving just beyond the glass blooms.",
      "When the Prism Stag steps into view, it arrives in pieces first: antlers in one reflection, hooves in another, then the full animal threading through all of them at once. The Moon Lantern answers with a hard silver pulse, like it has finally found a rival worth waking for.",
    ],
    finalLabel: "Stand against the Prism Stag",
  },
  hushKnightPrelude: {
    chapter: "Boss Prelude",
    modeLabel: "Cutscene",
    title: "Hush Knight",
    objective: "The keeper of the stacks has decided you are too loud to pass.",
    visual: "knight",
    caption: "Dust hangs in still layers until a single quiet room decides to move against you.",
    slides: [
      "The archive silence changes texture. What was empty before now feels supervised. Even your breathing comes back thinner, as if the room itself is trimming sound off it before it can echo.",
      "A figure rises out of the central stacks in plate so thin it looks cut from layered paper and old oaths. The Hush Knight draws a ceremonial blade without hurry, certain the room has already closed every other exit for it.",
    ],
    finalLabel: "Break the hush",
  },
  wardenPrelude: {
    chapter: "Boss Prelude",
    modeLabel: "Cutscene",
    title: "Ashen Warden",
    objective: "The chamber's oldest oath is standing up in front of you.",
    visual: "warden",
    caption: "Banked fire and oath-ash gather themselves into something that was built to outlast every keeper who ever lit this room.",
    slides: [
      "The observatory floor is ringed with old scorch marks, each one shaped like a kneeling figure. Ash drifts off them in coils and starts knitting itself together before you reach the dead firepit.",
      "The guardian forms around a negative space first, like armor remembering the body it once enclosed. By the time its helm turns toward you, the air already smells of iron and extinguished vows.",
    ],
    finalLabel: "Face the Ashen Warden",
  },
  seraphPrelude: {
    chapter: "Boss Prelude",
    modeLabel: "Cutscene",
    title: "Lumen Seraph",
    objective: "The choir causeway has one last sentinel between you and the spire.",
    visual: "warden",
    caption: "A long suspended walk hums with broken hymnwork while something winged and radiant keeps the passage sealed.",
    slides: [
      "Beyond the observatory dome hangs a causeway of brass ribs and fractured hymn plates. Every step sends a faint choir note through the metal, and all of them answer one brighter voice somewhere ahead.",
      "The Lumen Seraph descends without flapping, built from white glass feathers and a soldier's frame buried under liturgy. It lowers a spear of condensed dawn until the whole bridge rings under the weight of the gesture.",
    ],
    finalLabel: "Challenge the Lumen Seraph",
  },
  bloomPrelude: {
    chapter: "Boss Prelude",
    modeLabel: "Cutscene",
    title: "Eclipse Bloom",
    objective: "You are finally looking straight at the thing that has been drinking the dawn.",
    visual: "bloom",
    caption: "The lens pit opens like a wound trying to imitate a flower badly enough to fool something holy.",
    slides: [
      "With the mirror array aligned, the chamber brightens just enough to show the roots of the problem clearly. They are not roots at all, not anymore, but lengths of char and hunger wound around the true fire until the whole mass resembles a blossom from the wrong age of the world.",
      "The Bloom opens at your approach and the trapped dawn in the room recoils from it. For a heartbeat you feel the mountain weighing your origin, your chosen discipline, and the dead lantern in your grip all at once before deciding the next answer must be violence.",
    ],
    finalLabel: "Descend into the lens pit",
  },
};

const PUZZLES = {
  shrineAttunement: {
    chapter: "Puzzle",
    modeLabel: "Puzzle",
    title: "The Keeper's Rite",
    objective: "Tune the shrine pieces to the rite states before the basin overloads.",
    visual: "shrine",
    caption: "The basin, the bell, the altar glass, and the lantern rest all still answer a careful hand.",
    text: [
      "The old inscription is not a simple order after all. Each shrine piece is linked to the others by hidden rods beneath the stone, and turning one part drags the others with it.",
      "Click the marked mechanisms to rotate their states. Your goal is to match every current state to its target state before the basin floods the rite and lashes you for the mistake.",
    ],
    sourceNode: "shrine",
    hint: "This is a linked mechanism now, not a memory game. Watch which pieces move together and steer the whole shrine toward the target line.",
    resetText: "The basin boils over in cold silver spray and the whole rite slams back to its starting posture.",
    solveToast: "The shrine remembers you long enough to open its cache and bless the lantern.",
    overloadLimit: 12,
    failureDamage: 4,
    failureResolve: 1,
    hotspots: [
      {
        id: "bell",
        short: "Bell",
        label: "Bell tongue",
        x: 22,
        y: 24,
        initial: 1,
        target: 1,
        states: ["Hush", "Toll", "Peal", "Choir"],
        effects: [
          { id: "bell", shift: 1 },
          { id: "basin", shift: 1 },
          { id: "lantern", shift: 1 },
        ],
        clue: "Turning the bell drags the basin and lantern one notch with it.",
      },
      {
        id: "basin",
        short: "Basin",
        label: "Silver basin",
        x: 51,
        y: 80,
        initial: 2,
        target: 1,
        states: ["Still", "Silver", "Rising", "Flooded"],
        effects: [
          { id: "basin", shift: 1 },
          { id: "altar", shift: 1 },
        ],
        clue: "The basin has only the altar on its linkage, which makes it the cleanest correction in the room.",
      },
      {
        id: "altar",
        short: "Glass",
        label: "Smoked altar glass",
        x: 62,
        y: 46,
        initial: 2,
        target: 0,
        states: ["Clear", "Veiled", "Shadowed", "Shut"],
        effects: [
          { id: "altar", shift: 1 },
          { id: "bell", shift: 1 },
          { id: "lantern", shift: 1 },
        ],
        clue: "The altar rod kicks both the bell and the lantern when it turns.",
      },
      {
        id: "lantern",
        short: "Light",
        label: "Lantern rest",
        x: 50,
        y: 48,
        initial: 0,
        target: 3,
        states: ["Cold", "Smoking", "Warm", "Awake"],
        effects: [
          { id: "lantern", shift: 1 },
          { id: "basin", shift: 1 },
        ],
        clue: "The lantern catches on the basin linkage but leaves the altar untouched.",
      },
    ],
  },
  reliquaryDoors: {
    chapter: "Puzzle",
    modeLabel: "Puzzle",
    title: "Choir Reliquary",
    objective: "Set every saint door and the choir lock to their correct liturgies without overdriving the chapel.",
    visual: "shrine",
    caption: "Four saint seals are threaded into one old lock-song that still expects the right hands.",
    text: [
      "Each saint seal is connected to the choir lock with buried brass tongues. Turning one panel advances one or two others, so the chapel has to be solved as a whole circuit rather than a spoken order.",
      "Click the marked seals to rotate their liturgies. Match the current line to the target line before the lock-song snaps back and punishes the mistake.",
    ],
    sourceNode: "choirReliquary",
    hint: "The choir lock is a coupler. Treat the door faces like linked tumblers and spend touches carefully.",
    resetText: "The choir lock spits a brittle note through the chapel and all five seals slam back to their starting hymn.",
    solveToast: "The saint-doors open just far enough to spill road gear and a new cloak into your hands.",
    overloadLimit: 14,
    failureDamage: 5,
    failureResolve: 1,
    hotspots: [
      {
        id: "witness",
        short: "Witness",
        label: "Witness panel",
        x: 28,
        y: 54,
        initial: 3,
        target: 2,
        states: ["Ash", "Wake", "Watch", "Seal"],
        effects: [
          { id: "witness", shift: 1 },
          { id: "choir", shift: 1 },
          { id: "kneel", shift: 1 },
        ],
        clue: "The witness face drags both the choir lock and the kneeling saint with it.",
      },
      {
        id: "kneel",
        short: "Kneel",
        label: "Kneeling saint",
        x: 42,
        y: 70,
        initial: 3,
        target: 0,
        states: ["Kneel", "Rise", "Witness", "Turn"],
        effects: [
          { id: "kneel", shift: 1 },
          { id: "answer", shift: 1 },
        ],
        clue: "The kneeling saint only nudges itself and the answering bell.",
      },
      {
        id: "answer",
        short: "Answer",
        label: "Answering bell",
        x: 66,
        y: 26,
        initial: 1,
        target: 0,
        states: ["Answer", "Mute", "Call", "Peal"],
        effects: [
          { id: "answer", shift: 1 },
          { id: "ascend", shift: 1 },
          { id: "choir", shift: 1 },
        ],
        clue: "The answering bell tugs the stair and the choir core together.",
      },
      {
        id: "ascend",
        short: "Ascend",
        label: "Ascending stair",
        x: 76,
        y: 46,
        initial: 3,
        target: 1,
        states: ["Fall", "Ascend", "Wait", "Turn"],
        effects: [
          { id: "ascend", shift: 1 },
          { id: "witness", shift: 1 },
        ],
        clue: "The stair loops back to the witness face, making the chapel a circle.",
      },
      {
        id: "choir",
        short: "Choir",
        label: "Choir lock",
        x: 52,
        y: 44,
        initial: 0,
        target: 2,
        states: ["Dormant", "Humming", "Open", "Overtone"],
        effects: [
          { id: "choir", shift: 1 },
          { id: "witness", shift: 1 },
          { id: "answer", shift: 1 },
          { id: "ascend", shift: 1 },
        ],
        clue: "The choir lock is the broadest coupler in the reliquary and should be turned sparingly.",
      },
    ],
  },
  orreryRebuild: {
    chapter: "Puzzle",
    modeLabel: "Puzzle",
    title: "Sunken Orrery",
    objective: "Re-tune the drowned mechanism by matching every ring to its target alignment before the chamber locks you out.",
    visual: "archive",
    caption: "A half-flooded clock of brass rings and star weights still knows how to climb, if you can make it remember.",
    text: [
      "The drowned orrery is built from coupled rings. Every correction wheel advances one or two neighboring assemblies, so fixing it means planning the whole route instead of chasing one obvious sequence.",
      "Click the marked mechanisms to rotate their alignments. Match the target board before the chamber floods the rail with backlash.",
    ],
    sourceNode: "orreryVault",
    hint: "The brake and star wheel echo into each other. The shortest route is usually not the noisiest one.",
    resetText: "Floodwater slaps through the ring teeth and the whole machine lurches back to its drowned starting angle.",
    solveToast: "The orrery lurches back to life and the old lift rails wake with it.",
    overloadLimit: 13,
    failureDamage: 5,
    failureResolve: 1,
    hotspots: [
      {
        id: "brake",
        short: "Brake",
        label: "Brass brake",
        x: 20,
        y: 52,
        initial: 0,
        target: 0,
        states: ["Free", "Half-Lock", "Brake", "Bind"],
        effects: [
          { id: "brake", shift: 1 },
          { id: "counterweight", shift: 1 },
          { id: "star", shift: 1 },
        ],
        clue: "The brake arm tugs the star wheel and counterweight whenever it is moved.",
      },
      {
        id: "counterweight",
        short: "Weight",
        label: "Counterweight wheel",
        x: 44,
        y: 74,
        initial: 3,
        target: 0,
        states: ["Set", "Drag", "Sink", "High"],
        effects: [
          { id: "counterweight", shift: 1 },
          { id: "lens", shift: 1 },
        ],
        clue: "The counterweight only shares a shaft with the lens ring, making it precise but deceptive.",
      },
      {
        id: "lens",
        short: "Lens",
        label: "Lens ring",
        x: 58,
        y: 38,
        initial: 2,
        target: 3,
        states: ["Shade", "Trace", "Open", "True"],
        effects: [
          { id: "lens", shift: 1 },
          { id: "rail", shift: 1 },
          { id: "star", shift: 1 },
        ],
        clue: "The lens ring kicks both the ascender rail and star wheel when it turns.",
      },
      {
        id: "rail",
        short: "Rail",
        label: "Ascender rail",
        x: 76,
        y: 20,
        initial: 3,
        target: 3,
        states: ["Dark", "Primed", "Lit", "Climbing"],
        effects: [
          { id: "rail", shift: 1 },
          { id: "brake", shift: 1 },
        ],
        clue: "The rail loops back into the brake anchor, which is why brute force usually drowns this room.",
      },
      {
        id: "star",
        short: "Star",
        label: "Star wheel",
        x: 34,
        y: 28,
        initial: 3,
        target: 1,
        states: ["Blank", "North", "West", "South"],
        effects: [
          { id: "star", shift: 1 },
          { id: "brake", shift: 1 },
          { id: "lens", shift: 1 },
        ],
        clue: "The star wheel is tied to both the brake and the lens, making it the room's troublemaker.",
      },
    ],
  },
  lensArray: {
    chapter: "Puzzle",
    modeLabel: "Puzzle",
    title: "Mirror Array",
    objective: "Set the mirror lattice to the target pattern before the hanging chains throw the chamber back out of true.",
    visual: "spire",
    caption: "Broken mirrors hang in a suspended ring, waiting for the right chain of corrections to turn them back toward dawn.",
    text: [
      "The hanging mirrors are tied together by tension chains, so every correction skews at least one other mount. The old keepers solved this by reading the whole lattice at once.",
      "Click the marked mirror controls to rotate their states. Match the target line before the array snaps, burns your hands, and drops back to its misaligned baseline.",
    ],
    sourceNode: "spireHeart",
    hint: "The prism mount and anchor talk to each other more than any other pair in the room. Spend turns like they matter, because they do.",
    resetText: "The mirror chain shrieks, throws light into the rafters, and the whole lattice falls back into its hostile default.",
    solveToast: "The array locks into a clean ring of light and strips some of the final chamber's cover away.",
    overloadLimit: 12,
    failureDamage: 6,
    failureResolve: 2,
    hotspots: [
      {
        id: "anchor",
        short: "Anchor",
        label: "West anchor",
        x: 18,
        y: 44,
        initial: 0,
        target: 0,
        states: ["West", "North", "East", "South"],
        effects: [
          { id: "anchor", shift: 1 },
          { id: "chain", shift: 1 },
          { id: "prism", shift: 1 },
        ],
        clue: "The west anchor hauls both the chain and prism mount when it moves.",
      },
      {
        id: "chain",
        short: "Chain",
        label: "High chain",
        x: 28,
        y: 20,
        initial: 1,
        target: 0,
        states: ["Slack", "Taut", "Singing", "Locked"],
        effects: [
          { id: "chain", shift: 1 },
          { id: "lens", shift: 1 },
        ],
        clue: "The high chain only shares load with the central lens mount.",
      },
      {
        id: "lens",
        short: "Lens",
        label: "Central lens",
        x: 50,
        y: 46,
        initial: 3,
        target: 2,
        states: ["Blind", "Turning", "True", "Split"],
        effects: [
          { id: "lens", shift: 1 },
          { id: "reflector", shift: 1 },
          { id: "prism", shift: 1 },
        ],
        clue: "The central lens drags the reflector and prism with it every time it settles.",
      },
      {
        id: "reflector",
        short: "Reflect",
        label: "Final reflector",
        x: 76,
        y: 34,
        initial: 0,
        target: 0,
        states: ["Dark", "Warm", "Lit", "Dawn"],
        effects: [
          { id: "reflector", shift: 1 },
          { id: "anchor", shift: 1 },
        ],
        clue: "The final reflector loops back to the anchor on the western arm.",
      },
      {
        id: "prism",
        short: "Prism",
        label: "Prism mount",
        x: 62,
        y: 22,
        initial: 0,
        target: 2,
        states: ["Clouded", "Open", "Dawn", "Overbright"],
        effects: [
          { id: "prism", shift: 1 },
          { id: "anchor", shift: 1 },
          { id: "lens", shift: 1 },
        ],
        clue: "The prism mount feeds straight back into the anchor and lens, so wasteful turns cascade fast.",
      },
    ],
  },
};

const elements = {
  chapterLabel: document.querySelector("#chapterLabel"),
  sceneTitle: document.querySelector("#sceneTitle"),
  objectiveText: document.querySelector("#objectiveText"),
  modeChip: document.querySelector("#modeChip"),
  storyText: document.querySelector("#storyText"),
  interactionPanel: document.querySelector("#interactionPanel"),
  encounterSummary: document.querySelector("#encounterSummary"),
  choiceContainer: document.querySelector("#choiceContainer"),
  visualCaption: document.querySelector("#visualCaption"),
  visualPanel: document.querySelector("#visualPanel"),
  statusLine: document.querySelector("#statusLine"),
  healthText: document.querySelector("#healthText"),
  healthFill: document.querySelector("#healthFill"),
  xpText: document.querySelector("#xpText"),
  xpFill: document.querySelector("#xpFill"),
  levelStat: document.querySelector("#levelStat"),
  resolveStat: document.querySelector("#resolveStat"),
  attackStat: document.querySelector("#attackStat"),
  defenseStat: document.querySelector("#defenseStat"),
  goldStat: document.querySelector("#goldStat"),
  potionStat: document.querySelector("#potionStat"),
  weaponText: document.querySelector("#weaponText"),
  armorText: document.querySelector("#armorText"),
  originText: document.querySelector("#originText"),
  armorMenuButton: document.querySelector("#armorMenuButton"),
  armorMenu: document.querySelector("#armorMenu"),
  armorMenuClose: document.querySelector("#armorMenuClose"),
  menuTitle: document.querySelector("#armorMenuTitle"),
  menuCopy: document.querySelector("#menuCopy"),
  armorMenuContent: document.querySelector("#armorMenuContent"),
  menuTabs: document.querySelector("#menuTabs"),
  abilityList: document.querySelector("#abilityList"),
  inventoryList: document.querySelector("#inventoryList"),
  skillTreeContent: document.querySelector("#skillTreeContent"),
  logList: document.querySelector("#logList"),
  toastStack: document.querySelector("#toastStack"),
  restartButton: document.querySelector("#restartButton"),
};

const uiState = {
  menuOpen: false,
  activeMenuTab: "armor",
  toasts: [],
};

const ARMOR_SLOT_ORDER = ["head", "body", "cloak"];
const ARMOR_SLOT_LABELS = {
  head: "Head",
  body: "Body",
  cloak: "Cloak",
};

const ARMOR_PIECES = {
  scoutHood: {
    name: "Scout Hood",
    slot: "head",
    summary: "+1 Power. Start combat with +2 Guard.",
    description: "A weather-dark hood cut to keep rain off your eyes and blood off your collar.",
    buffs: { attack: 1 },
    passives: { openingGuard: 2 },
  },
  mirrorCirclet: {
    name: "Mirror Circlet",
    slot: "head",
    summary: "+1 Resolve. Abilities deal +2 damage.",
    description: "A thin silver ring set with reflective chips from the Glass Garden terraces.",
    buffs: { resolve: 1 },
    passives: { abilityPower: 2 },
  },
  travelLeathers: {
    name: "Travel Leathers",
    slot: "body",
    summary: "+1 Health. Guard heals 1.",
    description: "Not elegant, not sacred, just honest roadwork stitched to survive another hill.",
    buffs: { maxHealth: 1 },
    passives: { guardHeal: 1 },
  },
  silkWard: {
    name: "Silk Ward",
    slot: "body",
    summary: "+1 Guard, +2 Health. Deal 1 counter damage when hit.",
    description: "Moon spider silk wound tight under the chest and shoulders where fangs look first.",
    buffs: { defense: 1, maxHealth: 2 },
    passives: { counterDamage: 1 },
  },
  wardenPlate: {
    name: "Warden Plate",
    slot: "body",
    summary: "+2 Guard, +4 Health, -1 Resolve.",
    description: "Recovered plate from Starfall's watch, built to survive long sieges more than delicate spellwork.",
    buffs: { defense: 2, maxHealth: 4, resolve: -1 },
  },
  ferrymanShroud: {
    name: "Ferryman Shroud",
    slot: "cloak",
    summary: "+1 Guard, +1 Resolve. Start combat with +2 Guard.",
    description: "A silver-threaded bridge wrap that still smells faintly of river fog and cold iron.",
    buffs: { defense: 1, resolve: 1 },
    passives: { openingGuard: 2 },
  },
  ashvineCloak: {
    name: "Ashvine Cloak",
    slot: "cloak",
    summary: "+1 Guard, +3 Health. Guard grants +1 extra Resolve.",
    description: "A heat-drinking cloak stitched with ashvine veins that drink panic before it spreads.",
    buffs: { defense: 1, maxHealth: 3 },
    passives: { guardResolve: 1 },
  },
  cantorMantle: {
    name: "Cantor Mantle",
    slot: "cloak",
    summary: "+1 Resolve, +2 Health. Abilities deal +1 damage.",
    description: "A reliquary half-cloak worked with glass thread and hymn notches instead of plain stitching.",
    buffs: { resolve: 1, maxHealth: 2 },
    passives: { abilityPower: 1 },
  },
};

const SKILL_TREE = {
  aegisVow: {
    branch: "aegis",
    order: 1,
    cost: 1,
    requires: [],
    isPathRoot: true,
    name: "Oath of Brass",
    summary: "+4 Health, +1 Guard",
    description: "You decide you are climbing to outlast the mountain, not merely race it.",
    buffs: { maxHealth: 4, defense: 1 },
  },
  aegisStand: {
    branch: "aegis",
    order: 2,
    cost: 1,
    requires: ["aegisVow"],
    name: "Wall of Cinders",
    summary: "Guard heals 1 and grants +1 extra Resolve",
    description: "Every braced stance becomes a place to recover, not just endure.",
    passives: { guardHeal: 1, guardResolve: 1 },
  },
  aegisEcho: {
    branch: "aegis",
    order: 3,
    cost: 1,
    requires: ["aegisStand"],
    name: "Shield Echo",
    summary: "+4 Health. Start combat with +2 Guard",
    description: "You learn how to arrive in a fight already set behind the lantern frame.",
    buffs: { maxHealth: 4 },
    passives: { openingGuard: 2 },
  },
  aegisThorns: {
    branch: "aegis",
    order: 4,
    cost: 1,
    requires: ["aegisEcho"],
    name: "Saint Thorns",
    summary: "+1 Guard and deal 1 counter damage",
    description: "What lands on you starts paying for the privilege.",
    buffs: { defense: 1 },
    passives: { counterDamage: 1 },
  },
  aegisCrown: {
    branch: "aegis",
    order: 5,
    cost: 1,
    requires: ["aegisThorns"],
    name: "Keepers Crown",
    summary: "+6 Health. Start combat with +3 Guard",
    description: "The lantern stops being something you carry and becomes something you can anchor behind.",
    buffs: { maxHealth: 6 },
    passives: { openingGuard: 3 },
  },
  rivenVow: {
    branch: "riven",
    order: 1,
    cost: 1,
    requires: [],
    isPathRoot: true,
    name: "Edge Oath",
    summary: "+1 Power and +5% crit chance",
    description: "You choose the road where openings matter more than comfort.",
    buffs: { attack: 1 },
    passives: { critChance: 0.05 },
  },
  rivenArc: {
    branch: "riven",
    order: 2,
    cost: 1,
    requires: ["rivenVow"],
    name: "Cutting Arc",
    summary: "+1 Power. Abilities deal +1 damage",
    description: "Clean angles become their own kind of weapon.",
    buffs: { attack: 1 },
    passives: { abilityPower: 1 },
  },
  rivenSever: {
    branch: "riven",
    order: 3,
    cost: 1,
    requires: ["rivenArc"],
    name: "Severance",
    summary: "+2 Power",
    description: "You stop asking whether a strike will matter and start deciding how much.",
    buffs: { attack: 2 },
  },
  rivenFury: {
    branch: "riven",
    order: 4,
    cost: 1,
    requires: ["rivenSever"],
    name: "Blooded Timing",
    summary: "+5% crit chance and abilities deal +1 damage",
    description: "You feel exactly when a fight is ready to break and you lean into that instant.",
    passives: { critChance: 0.05, abilityPower: 1 },
  },
  rivenCrown: {
    branch: "riven",
    order: 5,
    cost: 1,
    requires: ["rivenFury"],
    name: "Comet Edge",
    summary: "+3 Power. Abilities deal +2 damage",
    description: "Your whole build turns into momentum and a refusal to pull back from it.",
    buffs: { attack: 3 },
    passives: { abilityPower: 2 },
  },
  astralVow: {
    branch: "astral",
    order: 1,
    cost: 1,
    requires: [],
    isPathRoot: true,
    name: "Star Vow",
    summary: "+1 Resolve",
    description: "You choose steadier breath, clearer hands, and a mind that keeps pace with the lantern.",
    buffs: { resolve: 1 },
  },
  astralCircuit: {
    branch: "astral",
    order: 2,
    cost: 1,
    requires: ["astralVow"],
    name: "Field Circuit",
    summary: "Tonics heal +2 and restore 1 Resolve",
    description: "Every scrap of preparation starts lasting longer.",
    passives: { potionHeal: 2, potionResolve: 1 },
  },
  astralLattice: {
    branch: "astral",
    order: 3,
    cost: 1,
    requires: ["astralCircuit"],
    name: "Lantern Lattice",
    summary: "+1 Resolve. Abilities deal +1 damage",
    description: "You learn how to hold power in the frame without wasting it.",
    buffs: { resolve: 1 },
    passives: { abilityPower: 1 },
  },
  astralFlow: {
    branch: "astral",
    order: 4,
    cost: 1,
    requires: ["astralLattice"],
    name: "Procession Step",
    summary: "+3 Health and Guard grants +1 extra Resolve",
    description: "Your pacing in long fights becomes calm enough to manufacture resources out of pressure.",
    buffs: { maxHealth: 3 },
    passives: { guardResolve: 1 },
  },
  astralCrown: {
    branch: "astral",
    order: 5,
    cost: 1,
    requires: ["astralFlow"],
    name: "Star Litany",
    summary: "+2 Resolve, +4 Health. Abilities deal +2 damage",
    description: "The lantern, the climb, and your breathing finally settle into one long working rhythm.",
    buffs: { resolve: 2, maxHealth: 4 },
    passives: { abilityPower: 2, potionResolve: 1 },
  },
};

const ITEMS = {
  huntersWhetstone: {
    name: "Hunter's Whetstone",
    kind: "Tool",
    summary: "+1 Power",
    description: "A jagged stone used by road hunters to keep a working edge.",
    buffs: { attack: 1 },
  },
  moonfangCharm: {
    name: "Moonfang Charm",
    kind: "Charm",
    summary: "+1 Power and unlocks Crescent Slash",
    description: "A wolf tooth braided in silver wire that twitches when blood is near.",
    buffs: { attack: 1 },
    abilityUnlock: "crescentSlash",
    weaponName: "Moon-bitten shortsword",
  },
  lanternShard: {
    name: "Lantern Shard",
    kind: "Relic",
    summary: "+4 Health, +1 Resolve, and unlocks Moonburst",
    description: "A star-cut shard slotted into the lantern's dead heart.",
    buffs: { maxHealth: 4, resolve: 1 },
    abilityUnlock: "moonburst",
  },
  clearwaterRibbon: {
    name: "Clearwater Ribbon",
    kind: "Blessing",
    summary: "+2 Health and unlocks Warding Light",
    description: "A cold thread of shrine water that seals cuts before they can open.",
    buffs: { maxHealth: 2 },
    abilityUnlock: "wardingLight",
  },
  bridgeHook: {
    name: "Bridge Hook",
    kind: "Tool",
    summary: "+1 Power",
    description: "An iron hook weighted perfectly for the close quarters of a swaying bridge.",
    buffs: { attack: 1 },
  },
  ferrymanToken: {
    name: "Ferryman Token",
    kind: "Token",
    summary: "+1 Guard and unlocks Ghoststep",
    description: "Stamped silver from the days when the ravine still charged a fare instead of lives.",
    buffs: { defense: 1 },
    abilityUnlock: "ghoststep",
  },
  moonsteelEdge: {
    name: "Moonsteel Edge",
    kind: "Weapon",
    summary: "+2 Power",
    description: "A sabre made for cutting mist, vow-threads, and armored joints.",
    buffs: { attack: 2 },
    weaponName: "Moonsteel sabre",
  },
  prismSigil: {
    name: "Prism Sigil",
    kind: "Sigil",
    summary: "+1 Power, +1 Resolve, and unlocks Prism Lance",
    description: "A glass rune that refracts lantern light into a killing point.",
    buffs: { attack: 1, resolve: 1 },
    abilityUnlock: "prismLance",
  },
  starMapScrap: {
    name: "Star Map Scrap",
    kind: "Chart",
    summary: "+1 Resolve and unlocks Starfire",
    description: "A torn celestial chart showing how the observatory bends the sky into fire.",
    buffs: { resolve: 1 },
    abilityUnlock: "starfire",
  },
  archivistSeal: {
    name: "Archivist Seal",
    kind: "Seal",
    summary: "+1 Guard and +1 Resolve",
    description: "An ivory signet that once opened the upper stacks and the lift beyond them.",
    buffs: { defense: 1, resolve: 1 },
  },
  choirThread: {
    name: "Choir Thread",
    kind: "Thread",
    summary: "+1 Power, +1 Resolve, and unlocks Solstice Break",
    description: "A strand of hymn-lit glass thread cut from the seraph's broken vestments.",
    buffs: { attack: 1, resolve: 1 },
    abilityUnlock: "solsticeBreak",
  },
  lensEmber: {
    name: "Lens Ember",
    kind: "Core",
    summary: "+2 Power, +1 Resolve, and unlocks Dawnflare",
    description: "A coal from the lens-fire that burns without ash or smoke.",
    buffs: { attack: 2, resolve: 1 },
    abilityUnlock: "dawnflare",
  },
  dawnfireCore: {
    name: "Dawnfire Core",
    kind: "Core",
    summary: "+4 Health and +1 Power",
    description: "The true heart of Starfall Observatory, hot enough to call morning home again.",
    buffs: { maxHealth: 4, attack: 1 },
  },
};

const ABILITIES = {
  focusLantern: {
    name: "Flare Lantern",
    cost: 1,
    description: "Deal radiant damage and steady yourself with a little healing.",
    use() {
      if (!spendResolve(1)) {
        return;
      }

      const damageBonus = getOriginAbilityBonus("focusLantern", "damage");
      const healAmount = 2 + getOriginAbilityBonus("focusLantern", "heal");
      const resolveGain = getOriginAbilityBonus("focusLantern", "resolveGain");
      const damage = dealDamageToEnemy(
        roll(4, 7) + Math.floor(getAttack() / 2) + getPassiveTotal("abilityPower") + damageBonus
      );

      heal(healAmount);
      if (resolveGain) {
        gainResolve(resolveGain);
      }

      pushLog(
        `Lantern flare burns ${state.currentEnemy.name} for ${damage} damage and restores ${healAmount} health.${resolveGain ? ` ${resolveGain} Resolve comes back through your origin mark.` : ""}`
      );

      if (state.currentEnemy.health <= 0) {
        winCombat();
        return;
      }

      enemyTurn();
    },
  },
  crescentSlash: {
    name: "Crescent Slash",
    cost: 1,
    description: "A heavy arc that scales with Power and refunds Resolve on a kill.",
    use() {
      if (!spendResolve(1)) {
        return;
      }

      const enemy = state.currentEnemy;
      const executeBonus = enemy.health <= Math.floor(enemy.maxHealth / 2) ? 2 : 0;
      const originDamage = getOriginAbilityBonus("crescentSlash", "damage");
      const damage = dealDamageToEnemy(
        roll(getAttack() + 3, getAttack() + 7) + executeBonus + getPassiveTotal("abilityPower") + originDamage
      );

      pushLog(`Crescent Slash lands for ${damage} damage.`);

      if (enemy.health <= 0) {
        gainResolve(1);
        pushLog("The charm feeds a clean kill back into your Resolve.");
        winCombat();
        return;
      }

      enemyTurn();
    },
  },
  moonburst: {
    name: "Moonburst",
    cost: 2,
    description: "Explode the lantern shard to hit hard and strip enemy Guard.",
    use() {
      if (!spendResolve(2)) {
        return;
      }

      const enemy = state.currentEnemy;
      const damage = dealDamageToEnemy(
        roll(6, 10) + Math.floor(getAttack() / 2) + getPassiveTotal("abilityPower") + getOriginAbilityBonus("moonburst", "damage")
      );
      const shred = 1 + getOriginAbilityBonus("moonburst", "shred");
      const resolveGain = getOriginAbilityBonus("moonburst", "resolveGain");

      enemy.defense = Math.max(0, enemy.defense - shred);
      if (resolveGain) {
        gainResolve(resolveGain);
      }

      pushLog(
        `Moonburst cracks across the fight for ${damage} damage and breaks ${shred} Guard.${resolveGain ? ` ${resolveGain} Resolve spills back into the frame.` : ""}`
      );

      if (enemy.health <= 0) {
        winCombat();
        return;
      }

      enemyTurn();
    },
  },
  wardingLight: {
    name: "Warding Light",
    cost: 1,
    description: "Recover health and harden your next defense.",
    use() {
      if (!spendResolve(1)) {
        return;
      }

      const amount = roll(6, 10) + getOriginAbilityBonus("wardingLight", "heal");
      const guardGain = 4 + getOriginAbilityBonus("wardingLight", "guard");
      heal(amount);
      state.guardBoost += guardGain;
      pushLog(`Warding Light restores ${amount} health and steels you with ${guardGain} Guard for the next strike.`);
      enemyTurn();
    },
  },
  ghoststep: {
    name: "Ghoststep",
    cost: 1,
    description: "Slip through the next hit, then let the miss recharge you.",
    use() {
      if (!spendResolve(1)) {
        return;
      }

      state.dodgeNext = true;
      state.pendingDodgeGuard = getOriginAbilityBonus("ghoststep", "afterDodgeGuard");
      gainResolve(1);
      pushLog("You move sideways through a ghost of yourself. The next attack will miss.");
      enemyTurn();
    },
  },
  prismLance: {
    name: "Prism Lance",
    cost: 2,
    description: "Pierce straight through enemy Guard with focused glass-light.",
    use() {
      if (!spendResolve(2)) {
        return;
      }

      const damage = dealDamageToEnemy(
        roll(8, 12) + getAttack() + getPassiveTotal("abilityPower") + getOriginAbilityBonus("prismLance", "damage"),
        { ignoreDefense: true }
      );
      pushLog(`Prism Lance drives through ${state.currentEnemy.name} for ${damage} damage.`);

      if (state.currentEnemy.health <= 0) {
        winCombat();
        return;
      }

      enemyTurn();
    },
  },
  starfire: {
    name: "Starfire",
    cost: 2,
    description: "Call a charted fireline from above and weaken the next enemy attack.",
    use() {
      if (!spendResolve(2)) {
        return;
      }

      const damage = dealDamageToEnemy(
        roll(10, 15) + Math.floor(getAttack() / 2) + getPassiveTotal("abilityPower"),
        { ignoreDefense: true }
      );
      const weaken = 1 + getOriginAbilityBonus("starfire", "weaken");
      state.currentEnemy.weakened = weaken;
      pushLog(`Starfire crashes down for ${damage} damage and drags ${weaken} strength out of the next counterblow.`);

      if (state.currentEnemy.health <= 0) {
        winCombat();
        return;
      }

      enemyTurn();
    },
  },
  solsticeBreak: {
    name: "Solstice Break",
    cost: 2,
    description: "Crash the lantern through the line, dealing heavy damage and raising Guard.",
    use() {
      if (!spendResolve(2)) {
        return;
      }

      const guardGain = 2 + getOriginAbilityBonus("solsticeBreak", "guard");
      const damage = dealDamageToEnemy(
        roll(getAttack() + 5, getAttack() + 9) + getPassiveTotal("abilityPower") + getOriginAbilityBonus("solsticeBreak", "damage")
      );
      state.guardBoost += guardGain;
      pushLog(`Solstice Break lands for ${damage} damage and leaves ${guardGain} Guard around you.`);

      if (state.currentEnemy.health <= 0) {
        winCombat();
        return;
      }

      enemyTurn();
    },
  },
  dawnflare: {
    name: "Dawnflare",
    cost: 2,
    description: "Spend the lens ember in a brutal burst of final, restorative light.",
    use() {
      if (!spendResolve(2)) {
        return;
      }

      const bossBonus = state.combat?.isBoss ? 2 : 0;
      const damage = dealDamageToEnemy(
        roll(12, 18) + getAttack() + bossBonus + getPassiveTotal("abilityPower") + getOriginAbilityBonus("dawnflare", "damage"),
        { ignoreDefense: true }
      );
      const healAmount = 3 + getOriginAbilityBonus("dawnflare", "heal");
      heal(healAmount);
      pushLog(`Dawnflare tears through the dark for ${damage} damage and returns ${healAmount} health.`);

      if (state.currentEnemy.health <= 0) {
        winCombat();
        return;
      }

      enemyTurn();
    },
  },
};

const ENEMIES = {
  briarWolf: {
    key: "briarWolf",
    name: "Briar Wolf",
    maxHealth: 20,
    defense: 0,
    attackMin: 3,
    attackMax: 9,
    xp: 16,
    goldRange: [6, 9],
    visual: "wolf",
    intro: "The thorns part and a Briar Wolf launches itself at the lantern glow.",
    description: "A lean wolf with briars braided through its hide and moon-white eyes fixed on your throat.",
    moves: [
      {
        name: "Stalking Circle",
        attackMin: 3,
        attackMax: 4,
        enemyGuardGain: 1,
        description: "It tests your range, then hardens behind thorned shoulders.",
      },
      {
        name: "Thorn Pounce",
        attackMin: 6,
        attackMax: 9,
        guardBreak: 1,
        description: "A full leap that punches through light cover.",
      },
      {
        name: "Hamstring Snap",
        attackMin: 4,
        attackMax: 6,
        resolveBurn: 1,
        description: "A snapping bite meant to rattle your hands off the lantern frame.",
      },
    ],
    reward() {
      state.flags.defeatedWolf = true;
      claimItem("moonfangCharm", "You cut a silvered tooth from the carcass and bind it to your wrist.");
    },
  },
  mireSpider: {
    key: "mireSpider",
    name: "Mire Spider",
    maxHealth: 25,
    defense: 2,
    attackMin: 4,
    attackMax: 10,
    xp: 18,
    goldRange: [5, 8],
    visual: "spider",
    intro: "Black legs rise out of the silver pool and a Mire Spider unfolds over the altar stones.",
    description: "Its shell mirrors the moon in broken pieces, and every leg-tip drips cold water.",
    moves: [
      {
        name: "Web Cast",
        attackMin: 4,
        attackMax: 6,
        resolveBurn: 1,
        enemyGuardGain: 1,
        description: "Sticky silver webbing steals a little nerve and leaves the beast harder to crack.",
      },
      {
        name: "Molting Brace",
        attackMin: 2,
        attackMax: 4,
        enemyGuardGain: 2,
        heal: 2,
        description: "It plates itself in wet glass and knits cracks shut while striking from cover.",
      },
      {
        name: "Venom Plunge",
        attackMin: 7,
        attackMax: 10,
        guardBreak: 2,
        description: "A plunging stab that punishes anyone hiding behind weak guard.",
      },
    ],
    reward() {
      state.flags.defeatedSpider = true;
      claimArmor("silkWard", "Silk peels free from the corpse in clean silver bands.");
    },
  },
  mistDrudge: {
    key: "mistDrudge",
    name: "Mist Drudge",
    maxHealth: 30,
    defense: 2,
    attackMin: 5,
    attackMax: 12,
    xp: 24,
    goldRange: [8, 12],
    visual: "drudge",
    intro: "Mist climbs the bridge cables and remembers just enough of a ferryman to hate you.",
    description: "It swings a hook of condensed frost and keeps trying to drag the lantern over the edge.",
    moves: [
      {
        name: "Hook Drag",
        attackMin: 5,
        attackMax: 7,
        resolveBurn: 1,
        description: "The drudge hooks your footing and tries to pull your focus out through your heels.",
      },
      {
        name: "Fog Bank",
        attackMin: 3,
        attackMax: 5,
        enemyGuardGain: 2,
        description: "Cold mist thickens around its shape and blunts clean retaliation.",
      },
      {
        name: "Ravine Heave",
        attackMin: 8,
        attackMax: 12,
        guardBreak: 2,
        description: "It commits both hands to a brutal swing meant to fling you clear off the bridge.",
      },
    ],
    reward() {
      state.flags.defeatedDrudge = true;
      state.potions += 1;
      pushToast("Tonic Recovered", "The ferryman's remains give up one sealed field tonic.", "resource");
      pushLog("When the mist thins, a sealed tonic falls out of it like a forgotten debt.");
      claimArmor("ferrymanShroud", "A bridge shroud lifts out of the fog and settles over your arm like it remembers you.");
      claimItem("ferrymanToken", "A ferry token clinks against the plank at your boots.");
    },
  },
  prismStag: {
    key: "prismStag",
    name: "Prism Stag",
    maxHealth: 38,
    defense: 2,
    attackMin: 6,
    attackMax: 13,
    xp: 34,
    goldRange: [9, 13],
    visual: "stag",
    intro: "Mirrored antlers split the garden reflections and the Prism Stag charges through all of them at once.",
    description: "Every hoofbeat throws shards of light across the terrace, making it hard to tell where the real body is.",
    moves: [
      {
        name: "Mirror Gallop",
        attackMin: 6,
        attackMax: 8,
        description: "A fast pass through the reflections, dangerous but honest.",
      },
      {
        name: "Antler Veil",
        attackMin: 4,
        attackMax: 6,
        enemyGuardGain: 2,
        resolveBurn: 1,
        description: "Shards of mirrored light sap your nerve while the Stag hides behind them.",
      },
      {
        name: "Prism Charge",
        attackMin: 10,
        attackMax: 13,
        guardBreak: 2,
        description: "The terrace ruler lowers its head and commits to a charge that must be respected.",
      },
      {
        name: "Shard Kick",
        attackMin: 7,
        attackMax: 10,
        enemyGuardGain: 1,
        description: "A sudden rear kick throws splinters of glass across the lane.",
      },
    ],
    reward() {
      state.flags.defeatedPrismStag = true;
      state.potions += 1;
      pushToast("Garden Draft", "A tonic survives inside the Stag's ribs of light.", "resource");
      pushLog("The Stag collapses into glass dust and leaves a tonic hidden inside its ribs of light.");
    },
  },
  hushKnight: {
    key: "hushKnight",
    name: "Hush Knight",
    maxHealth: 44,
    defense: 3,
    attackMin: 7,
    attackMax: 13,
    xp: 40,
    goldRange: [10, 15],
    visual: "knight",
    intro: "The archive quiet deepens until it hardens into a knight in paper-thin plate.",
    description: "It fights with a ceremonial blade and the dead silence of a room where no one has dared cough in centuries.",
    moves: [
      {
        name: "Measured Cut",
        attackMin: 7,
        attackMax: 9,
        description: "A disciplined slash meant to punish sloppy pacing.",
      },
      {
        name: "Silence Draw",
        attackMin: 5,
        attackMax: 6,
        enemyGuardGain: 1,
        resolveBurn: 1,
        description: "The Knight trims sound and confidence out of the room at the same time.",
      },
      {
        name: "Quietus Thrust",
        attackMin: 10,
        attackMax: 13,
        guardBreak: 2,
        resolveBurn: 1,
        description: "A direct thrust that rewards anyone who prepared and ruins anyone who did not.",
      },
      {
        name: "Archive Sentence",
        attackMin: 8,
        attackMax: 11,
        ignoreDefense: true,
        description: "The blade threads between your stance and the room's silence helps it land.",
      },
    ],
    reward() {
      state.flags.defeatedHushKnight = true;
      claimItem("archivistSeal", "An ivory seal breaks loose from the knight's breastplate and warms in your palm.");
    },
  },
  ashenWarden: {
    key: "ashenWarden",
    name: "Ashen Warden",
    maxHealth: 50,
    defense: 4,
    attackMin: 7,
    attackMax: 14,
    xp: 46,
    goldRange: [12, 18],
    visual: "warden",
    intro: "Ash lifts off the observatory floor and hardens into a knight-sized guardian around the dead firepit.",
    description: "Each step leaves a scorch mark shaped like an old oath. It guards the last live ember of Starfall.",
    moves: [
      {
        name: "Ash March",
        attackMin: 7,
        attackMax: 9,
        enemyGuardGain: 1,
        description: "It batters forward behind its own weight and leaves more cover around itself.",
      },
      {
        name: "Furnace Brace",
        attackMin: 4,
        attackMax: 6,
        enemyGuardGain: 2,
        heal: 3,
        description: "Heat rolls over its armor and seals some of the damage you already paid to deal.",
      },
      {
        name: "Oath Hammer",
        attackMin: 11,
        attackMax: 14,
        guardBreak: 2,
        description: "The Warden commits to a crushing overhead strike built to break fortifications.",
      },
      {
        name: "Cinder Edict",
        attackMin: 9,
        attackMax: 11,
        resolveBurn: 2,
        description: "Banked cinders flood the air and make clean thinking expensive.",
      },
    ],
    reward() {
      state.flags.defeatedWarden = true;
      claimItem("lensEmber", "A coal the size of a fist rolls out of the Warden's chest cavity without cooling.");
    },
  },
  lumenSeraph: {
    key: "lumenSeraph",
    name: "Lumen Seraph",
    maxHealth: 54,
    defense: 3,
    attackMin: 8,
    attackMax: 15,
    xp: 44,
    goldRange: [13, 18],
    visual: "warden",
    intro: "The causeway choir rises into a single blade of sound as the Lumen Seraph drops its spear toward you.",
    description: "A wing-shaped sentinel of glass plate and broken hymnwork that fights like it was trained to turn prayer into formation drills.",
    moves: [
      {
        name: "Choir Feint",
        attackMin: 7,
        attackMax: 9,
        resolveBurn: 1,
        description: "The bridge sings against your skull and the spear follows in behind the noise.",
      },
      {
        name: "Wing Ward",
        attackMin: 5,
        attackMax: 7,
        enemyGuardGain: 2,
        description: "White glass feathers interlock and make the next opening harder to exploit.",
      },
      {
        name: "Liturgy Spear",
        attackMin: 12,
        attackMax: 15,
        guardBreak: 2,
        ignoreDefense: true,
        description: "A formal thrust of condensed dawn that laughs at casual defense.",
      },
      {
        name: "Falling Hymn",
        attackMin: 9,
        attackMax: 12,
        resolveBurn: 1,
        description: "The seraph drops out of the air with the whole bridge ringing under it.",
      },
    ],
    reward() {
      state.flags.defeatedSeraph = true;
      claimItem("choirThread", "A line of hymn-lit thread tears loose from the seraph's vestments and coils around your wrist.");
    },
  },
  eclipseBloom: {
    key: "eclipseBloom",
    name: "Eclipse Bloom",
    maxHealth: 60,
    defense: 4,
    attackMin: 8,
    attackMax: 17,
    xp: 56,
    goldRange: [14, 20],
    visual: "bloom",
    intro: "The darkness in the lens pit opens like a flower and all the trapped dawn in the room recoils from it.",
    description: "It is root, ash, petal, and hunger braided together around the fire you came to save.",
    moves: [
      {
        name: "Root Lash",
        attackMin: 8,
        attackMax: 10,
        description: "A broad snapping root meant to keep you from setting your feet.",
      },
      {
        name: "Smother Petals",
        attackMin: 7,
        attackMax: 9,
        resolveBurn: 2,
        description: "The Bloom floods the pit with choking dark and bleeds Resolve out of you.",
      },
      {
        name: "Sap the Fire",
        attackMin: 5,
        attackMax: 7,
        enemyGuardGain: 2,
        heal: 4,
        description: "It drinks from the trapped dawn and hardens behind fresh layers of cover.",
      },
      {
        name: "Eclipse Surge",
        attackMin: 13,
        attackMax: 17,
        guardBreak: 3,
        ignoreDefense: true,
        description: "A catastrophic rush of root, ash, and false petals that ends lazy turns.",
      },
    ],
    reward() {
      state.flags.defeatedEclipseBloom = true;
      claimItem("dawnfireCore", "At the center of the dead flower you find the Dawnfire Core still burning.");
    },
  },
};

function pickRandomOriginId() {
  const total = Object.values(ORIGINS).reduce((sum, origin) => sum + origin.weight, 0);
  let rollValue = Math.random() * total;

  for (const [originId, origin] of Object.entries(ORIGINS)) {
    rollValue -= origin.weight;

    if (rollValue <= 0) {
      return originId;
    }
  }

  return "emberbrand";
}

function getOriginDefinition(sourceState = state) {
  return ORIGINS[sourceState.originId] || ORIGINS.emberbrand;
}

function buildIntroLog(originId) {
  return [
    `Elder Mira sends you east with a dead moon lantern, a warning about the ridge, and the ${ORIGINS[originId].name} stirring under your skin.`,
  ];
}

function createBaseState() {
  const originId = pickRandomOriginId();

  return {
    balanceVersion: 5,
    level: 1,
    xp: 0,
    baseMaxHealth: 27,
    baseAttack: 4,
    baseDefense: 1,
    baseResolve: 2,
    health: 27,
    resolve: 2,
    gold: 7,
    potions: 1,
    weapon: "Rusty shortsword",
    originId,
    specialization: null,
    inventory: [],
    armorInventory: ["travelLeathers"],
    equippedArmor: {
      head: null,
      body: "travelLeathers",
      cloak: null,
    },
    abilities: [...DEFAULT_ABILITY_IDS],
    equippedAbilities: [...DEFAULT_ABILITY_IDS],
    skillPoints: 0,
    unlockedTreeNodes: [],
    puzzleState: {},
    activePuzzle: null,
    cutscene: null,
    queuedCombat: null,
    log: buildIntroLog(originId),
    flags: {
      wagonSearched: false,
      defeatedWolf: false,
      shrineRiteSolved: false,
      defeatedSpider: false,
      ferrymanCacheOpened: false,
      defeatedDrudge: false,
      campRested: false,
      boughtMoonsteelEdge: false,
      boughtAshvineCloak: false,
      boughtCampTonics: false,
      reliquarySolved: false,
      glassPoolSearched: false,
      defeatedPrismStag: false,
      prismSigilClaimed: false,
      archiveJournalRead: false,
      starMapClaimed: false,
      defeatedHushKnight: false,
      orrerySolved: false,
      armorySearched: false,
      observatoryRested: false,
      defeatedWarden: false,
      defeatedSeraph: false,
      lensAligned: false,
      defeatedEclipseBloom: false,
    },
    currentNode: "intro",
    mode: "story",
    currentEnemy: null,
    combat: null,
    guardBoost: 0,
    dodgeNext: false,
    pendingDodgeGuard: 0,
  };
}

let state = hydrateState();

const NODES = {
  intro() {
    const origin = getOriginDefinition();

    return {
      chapter: "Chapter 1",
      modeLabel: "Story",
      title: "Dusk Hollow",
      objective: "Carry the spent Moon Lantern to Starfall Observatory before the valley loses the dawn outright.",
      visual: "village",
      caption: "A village keeps its shutters closed while you walk out carrying the last good light and whatever strange gift just answered it.",
      text: [
        "Night folds over Dusk Hollow as Elder Mira presses the dead Moon Lantern into your hands. The silver frame is cold except where her fingers have warmed it, as if memory is the only flame left inside.",
        origin.introLine,
        "Mira tells you the old observatory still holds a lens-fire strong enough to wake the lantern. If the valley is dark by dawn, the things that have learned to walk in moonless hours will come down from the ridge and stay.",
      ],
      actions: [
        {
          label: "Step through the west gate",
          primary: true,
          onChoose() {
            pushLog("You leave the village walls and take the Briar Road east.");
            goTo("forestEdge");
          },
        },
      ],
    };
  },
  forestEdge() {
    const actions = [];

    if (!state.flags.wagonSearched) {
      actions.push({
        label: "Search the wrecked wagon",
        onChoose: searchWagon,
      });
    }

    if (!state.flags.defeatedWolf) {
      actions.push({
        label: "Face the growling shape in the thorns",
        primary: true,
        onChoose() {
          startCombat("briarWolf", "forestEdge", "forestEdge");
        },
      });
    }

    actions.push({
      label: "Slip toward the hollow shrine",
      onChoose() {
        goTo("shrine");
      },
    });

    if (state.flags.defeatedWolf) {
      actions.push({
        label: "Take the cleared road toward Moon Bridge",
        primary: true,
        onChoose() {
          goTo("moonBridge");
        },
      });
    }

    return {
      chapter: "Chapter 2",
      modeLabel: "Story",
      title: "The Briar Road",
      objective: state.flags.defeatedWolf
        ? "The first ambush is broken. Strip the roadside for what it knows and keep climbing."
        : "Scavenge the roadside and survive the first thing the ridge sends down for you.",
      visual: "forest",
      caption: state.flags.defeatedWolf
        ? "The road is open again, though the thorn line still seems to watch you breathe."
        : "A ruined wagon, silver thorns, and something hungry moving just beyond sight.",
      text: state.flags.defeatedWolf
        ? [
            "The Briar Wolf lies still in the ditch, thorn-vines slowly unwinding from its fur. The woods are not quiet, but they have stopped leaning toward the lantern for now.",
            "The wagon wreck smells of cold iron, burst grain, and old panic. Whoever died here had just enough time to hide a few useful things before the thorns found them.",
            "Off the road, the shrine bell swings once without wind. Ahead, Moon Bridge spans the ravine like a wire drawn across the dark.",
          ]
        : [
            "The Briar Road narrows into wet stone and white thorns. A wagon lies split open in the ditch, its crates torn apart as if something tested each one for blood instead of food.",
            "Somewhere ahead, claws click against rock. Off to one side, a deer path climbs toward the roofless shrine where lantern-keepers once washed soot off their vows before the ascent.",
            "The mark under your skin keeps answering the lantern in tiny pulses. Whatever the gift is, the mountain has already noticed it.",
          ],
      actions,
    };
  },
  shrine() {
    const actions = [];

    if (!state.flags.shrineRiteSolved) {
      actions.push({
        label: "Work the keeper's rite",
        primary: true,
        onChoose() {
          startPuzzle("shrineAttunement", "shrine");
        },
      });
    }

    if (!state.flags.defeatedSpider) {
      actions.push({
        label: "Disturb the silver pool",
        onChoose() {
          startCombat("mireSpider", "shrine", "shrine");
        },
      });
    }

    actions.push({
      label: state.flags.defeatedWolf ? "Take the ravine path toward Moon Bridge" : "Return to the Briar Road",
      onChoose() {
        goTo(state.flags.defeatedWolf ? "moonBridge" : "forestEdge");
      },
    });

    return {
      chapter: "Chapter 3",
      modeLabel: "Story",
      title: "Hollow Shrine",
      objective: state.flags.shrineRiteSolved
        ? "The shrine has yielded what it can. Take its blessings and keep the climb moving."
        : "Wake the shrine's last rite and strip it for every blessing the ridge forgot to bury.",
      visual: "shrine",
      caption: "Moon-washed stone, a silver basin, and the sense that the shrine remembers every vow ever made inside it.",
      text: state.flags.shrineRiteSolved
        ? [
            "The silver basin is quiet now, but the shrine has changed around you in small ways. The air feels less suspicious. The glass altar has stopped hiding the old keeper's cache.",
            "Even ruined, this place remembers how to make one traveler feel briefly expected. The lantern sits warmer in your hand than it did when you arrived.",
            "Somewhere under the basin's reflection, the drowned spider still waits if you want the rest of what the shrine is guarding.",
          ]
        : [
            "The shrine crouches between pale birches with its roof long gone to weather and birds. Rainwater gathers in a shallow basin, bright as poured mercury beneath the broken moon.",
            "An altar of smoked glass stands against the back wall. Bent coins, hymn ribbons, and a pale crystal shard still wait there as if the keepers only stepped outside for one impossible moment.",
            "Cut into the floor is a ritual sequence the old keepers used when a lantern came to the shrine half-dead and needing more than prayer.",
          ],
      actions,
    };
  },
  moonBridge() {
    const actions = [];

    if (!state.flags.ferrymanCacheOpened) {
      actions.push({
        label: "Open the ferryman's lockbox",
        onChoose: openFerrymanCache,
      });
    }

    if (!state.flags.defeatedDrudge) {
      actions.push({
        label: "Cross the Moon Bridge",
        primary: true,
        onChoose() {
          startCombat("mistDrudge", "moonBridge", "moonBridge");
        },
      });
    } else {
      actions.push({
        label: "Follow the far ledge to the pilgrim camp",
        primary: true,
        onChoose() {
          goTo("pilgrimCamp");
        },
      });
    }

    actions.push({
      label: "Head back toward the Briar Road",
      onChoose() {
        goTo("forestEdge");
      },
    });

    return {
      chapter: "Chapter 4",
      modeLabel: "Story",
      title: "Moon Bridge",
      objective: state.flags.defeatedDrudge
        ? "The bridge is yours. Push higher before the fog remembers how to climb again."
        : "Cross the ravine without feeding the thing that keeps trying to remember a ferryman's shape.",
      visual: "bridge",
      caption: state.flags.defeatedDrudge
        ? "The bridge cables settle into silence, and the path beyond finally shows itself."
        : "A rope bridge hangs over white fog that keeps trying to rise into human shape.",
      text: state.flags.defeatedDrudge
        ? [
            "The bridge still sways from the fight, but the mist below no longer climbs. On the far side, a narrow ledge curls toward the abandoned pilgrim camp clinging to the cliff.",
            "The lockbox at the near anchor holds the kind of leftover practicality that kept older travelers alive: rope, hook, dry silver, and things worth wearing when the wind gets personal.",
            "The Moon Lantern hums more clearly now. Not awake, not yet, but listening hard enough to feel.",
          ]
        : [
            "Moon Bridge hangs over a ravine packed with slow-moving fog. The ropes are furred with frost, and the boards complain beneath even the thought of your weight.",
            "An iron lockbox sits chained to the near anchor. Halfway across, the mist below keeps lifting as if it has almost remembered the posture of the ferryman who used to tax this crossing.",
            "Old bridge hymns are scratched into the rail in shallow knife marks. Most of them end abruptly, as if the writers were called away mid-line.",
          ],
      actions,
    };
  },
  pilgrimCamp() {
    const actions = [];

    if (!state.flags.campRested) {
      actions.push({
        label: "Rest beside the blue coals",
        onChoose: restAtCamp,
      });
    }

    if (!state.flags.boughtMoonsteelEdge) {
      actions.push({
        label: "Trade 12 silver for the Moonsteel Edge",
        onChoose() {
          buyCampItem("moonsteelEdge", 12, "boughtMoonsteelEdge", "The ragpicker spirit salutes and hands over a wrapped sabre.");
        },
      });
    }

    if (!state.flags.boughtAshvineCloak) {
      actions.push({
        label: "Trade 10 silver for the Ashvine Cloak",
        onChoose() {
          buyCampItem("ashvineCloak", 10, "boughtAshvineCloak", "A heatless cloak slides out of the trader's chest with the smell of old cinders.");
        },
      });
    }

    if (!state.flags.boughtCampTonics) {
      actions.push({
        label: "Trade 6 silver for two field tonics",
        onChoose: buyCampTonics,
      });
    }

    actions.push({
      label: "Climb to the choir reliquary",
      primary: true,
      onChoose() {
        goTo("choirReliquary");
      },
    });

    actions.push({
      label: "Return to Moon Bridge",
      onChoose() {
        goTo("moonBridge");
      },
    });

    return {
      chapter: "Chapter 5",
      modeLabel: "Story",
      title: "Pilgrim Camp",
      objective: "Rest, barter, and decide what kind of build this climb is turning into.",
      visual: "camp",
      caption: "Blue coals still burn beneath collapsed tents while a courteous ghost minders the last trader's chest.",
      text: [
        "The pilgrim camp clings to a shelf of rock just beyond the bridge. Tents have collapsed into their ropes, but pale blue coals still burn in a cookfire no rain can quite kill.",
        "A ragpicker spirit sits beside a trader's chest, counting the same three brass buttons over and over. When it notices the Moon Lantern, it offers a solemn nod and lifts the lid on what road gear remains.",
        "Above the camp, a side stair climbs to a cliffside reliquary that used to bless pilgrims before they entered the higher terraces. The spirit jerks its chin toward it, as if to say that whatever is left up there is your business now.",
      ],
      actions,
    };
  },
  choirReliquary() {
    const actions = [];

    if (!state.flags.reliquarySolved) {
      actions.push({
        label: "Set the saint doors in sequence",
        primary: true,
        onChoose() {
          startPuzzle("reliquaryDoors", "choirReliquary");
        },
      });
    } else {
      actions.push({
        label: "Follow the upper stair into the Glass Garden",
        primary: true,
        onChoose() {
          goTo("glassGarden");
        },
      });
    }

    actions.push({
      label: "Drop back to the pilgrim camp",
      onChoose() {
        goTo("pilgrimCamp");
      },
    });

    return {
      chapter: "Chapter 6",
      modeLabel: "Story",
      title: "Choir Reliquary",
      objective: state.flags.reliquarySolved
        ? "The saint doors are open. Take what they yielded and push on to the terraces."
        : "Wake the saint doors and plunder what the cliff chapel still kept in reserve.",
      visual: "shrine",
      caption: "A half-buried cliff chapel where four saint doors still guard a choir lock older than the camp below it.",
      text: state.flags.reliquarySolved
        ? [
            "The reliquary doors sit ajar now, not wide enough to welcome a crowd but generous enough to admit one armed pilgrim and the notion that the old keepers were not careless about what they left behind.",
            "Cold air leaks out carrying incense, metal filings, and a faint hymn line that breaks apart before you can place the tune. A mantle from the hidden cache hangs more comfortably across your shoulders than it has any right to.",
            "Past the chapel roof, the scout stair angles upward toward the first mirrored terraces of the Glass Garden.",
          ]
        : [
            "The cliffside reliquary is half chapel, half lockbox. Four saint doors face inward toward a central choir lock wrought from glass ribs and brass tongues.",
            "Flood streaks and old soot mark the stone, but the carvings remain readable: witness, kneel, answer, ascend. Each panel looks like part of a single mechanism rather than separate decoration.",
            "If the old lock-song still works, it should open the saint cache and the stair beyond it both.",
          ],
      actions,
    };
  },
  glassGarden() {
    const actions = [];

    if (!state.flags.glassPoolSearched) {
      actions.push({
        label: "Search the mirrored pool",
        onChoose: searchGlassPool,
      });
    }

    if (!state.flags.defeatedPrismStag) {
      actions.push({
        label: "Follow the hoofprints into the reflected terraces",
        primary: true,
        onChoose() {
          startBossIntro("prismStagPrelude", "prismStag", "glassGarden", "glassGarden");
        },
      });
    } else if (!state.flags.prismSigilClaimed) {
      actions.push({
        label: "Take the Prism Sigil from the broken antlers",
        primary: true,
        onChoose: claimPrismSigil,
      });
    }

    if (state.flags.defeatedPrismStag && state.flags.prismSigilClaimed) {
      actions.push({
        label: "Enter the dark conservatory archive",
        primary: true,
        onChoose() {
          goTo("archive");
        },
      });
    }

    actions.push({
      label: "Head back to the choir reliquary",
      onChoose() {
        goTo("choirReliquary");
      },
    });

    return {
      chapter: "Chapter 7",
      modeLabel: "Story",
      title: "Glass Garden",
      objective: "Claim the light trapped in the terraces and break whatever rules them.",
      visual: "garden",
      caption: "Lightning-fused terraces bloom with mirrored flowers that only look soft from far away.",
      text: [
        "Glass flowers rise out of the ravine wall where old lightning fused the cliff into shining terraces. Each petal reflects a different phase of the moon, and the whole garden whispers whenever the lantern brightens.",
        "Fresh hoofprints score the mirrored soil. Whatever rules this place has antlers hard enough to cut its own reflections loose.",
        "The further you go, the more the garden stops behaving like a place and starts behaving like a hall of arguments between versions of the same light.",
      ],
      actions,
    };
  },
  archive() {
    const actions = [];

    if (!state.flags.archiveJournalRead) {
      actions.push({
        label: "Read the keeper's journal",
        onChoose: readArchiveJournal,
      });
    }

    if (!state.flags.starMapClaimed) {
      actions.push({
        label: "Search the chart room",
        onChoose: claimStarMap,
      });
    }

    if (!state.flags.defeatedHushKnight) {
      actions.push({
        label: "Break the hush in the central stacks",
        primary: true,
        onChoose() {
          startBossIntro("hushKnightPrelude", "hushKnight", "archive", "archive");
        },
      });
    } else {
      actions.push({
        label: "Descend into the drowned orrery vault",
        primary: true,
        onChoose() {
          goTo("orreryVault");
        },
      });
    }

    actions.push({
      label: "Return to the Glass Garden",
      onChoose() {
        goTo("glassGarden");
      },
    });

    return {
      chapter: "Chapter 8",
      modeLabel: "Story",
      title: "The Archive Below",
      objective: "Find the charts that wake the fire and survive the thing that has kept them silent.",
      visual: "archive",
      caption: "Dusty star charts, broken lift rails, and a silence so complete it feels sharpened.",
      text: [
        "The conservatory doors give way to a buried archive of hanging star maps, brass rails, and ladder-shadows. Dust is everywhere except the path that circles the central stacks, which has been kept clean by something patient.",
        "The surviving journal pages mention a lower orrery chamber that once powered the ascent lift, but the route down is sealed until the archive's current keeper is dealt with.",
        "It feels less like entering a room than stepping into a held breath someone else has been maintaining for years.",
      ],
      actions,
    };
  },
  orreryVault() {
    const actions = [];

    if (!state.flags.orrerySolved) {
      actions.push({
        label: "Rebuild the drowned orrery",
        primary: true,
        onChoose() {
          startPuzzle("orreryRebuild", "orreryVault");
        },
      });
    } else {
      actions.push({
        label: "Ride the reawakened lift to the Upper Observatory",
        primary: true,
        onChoose() {
          goTo("upperObservatory");
        },
      });
    }

    actions.push({
      label: "Climb back to the archive stacks",
      onChoose() {
        goTo("archive");
      },
    });

    return {
      chapter: "Chapter 9",
      modeLabel: "Story",
      title: "Sunken Orrery",
      objective: state.flags.orrerySolved
        ? "The lift path is alive again. Take it before the chamber thinks better of that decision."
        : "Rebuild the drowned mechanism that once carried keepers toward the upper mountain.",
      visual: "archive",
      caption: "Flooded brass rings, dead star weights, and a lift line that will not climb until the room remembers how.",
      text: state.flags.orrerySolved
        ? [
            "The orrery turns now with a wet, stubborn dignity. Light runs the ascender rail in staggered pulses, enough to wake the lift above.",
            "Scattered between the rings are bits of keeper tools, broken chain links, and just enough silver to remind you that even sacred rooms used to have budgets.",
            "Somewhere overhead, the observatory dome answers the returning mechanism with a low metallic call.",
          ]
        : [
            "Below the archive sits a chamber of half-submerged brass rings and drowned star weights. Floodwater has left tide lines across the walls high enough to make the room feel like it once belonged to something much bigger than rain.",
            "An ascender rail climbs from the far wall toward the observatory, but the power sequence is dead. Keeper notes pinned above the flood mark suggest the whole room can still be walked back to life if you correct it in the right order.",
            "The smell here is metal, algae, and long patience.",
          ],
      actions,
    };
  },
  upperObservatory() {
    const actions = [];

    if (!state.flags.armorySearched) {
      actions.push({
        label: "Search the ruined armory",
        onChoose: searchArmory,
      });
    }

    if (!state.flags.observatoryRested) {
      actions.push({
        label: "Warm yourself at the dying brazier",
        onChoose: restAtObservatory,
      });
    }

    if (!state.flags.defeatedWarden) {
      actions.push({
        label: "Approach the banked firepit",
        primary: true,
        onChoose() {
          startBossIntro("wardenPrelude", "ashenWarden", "upperObservatory", "upperObservatory");
        },
      });
    } else {
      actions.push({
        label: "Cross the choir causeway",
        primary: true,
        onChoose() {
          goTo("skyCauseway");
        },
      });
    }

    actions.push({
      label: "Ride the lift back down",
      onChoose() {
        goTo("orreryVault");
      },
    });

    return {
      chapter: "Chapter 10",
      modeLabel: "Story",
      title: "Upper Observatory",
      objective: "Break the warden and claim the ember guarding Starfall's final climb.",
      visual: "observatory",
      caption: "A cracked dome opens to the stars while a banked firepit dares you to believe it can still wake.",
      text: [
        "The observatory dome is split open to the night, its brass ribs silvered with frost. Beneath the great lens, an old firepit glows under a lid of ash, as if someone banked it centuries ago and expected you exactly this late.",
        "A ruined armory leans against one wall, its racks sagging under rust and old discipline. Beyond it, the outer causeway to the lens spire hangs over the void in long brass ribs.",
        "Every instinct you have says the chamber's real keeper is only pretending to be dead.",
      ],
      actions,
    };
  },
  skyCauseway() {
    const actions = [];

    if (!state.flags.defeatedSeraph) {
      actions.push({
        label: "Advance along the hymn bridge",
        primary: true,
        onChoose() {
          startBossIntro("seraphPrelude", "lumenSeraph", "skyCauseway", "skyCauseway");
        },
      });
    } else {
      actions.push({
        label: "Walk the cleared causeway into the Lens Spire",
        primary: true,
        onChoose() {
          goTo("spireHeart");
        },
      });
    }

    actions.push({
      label: "Retreat to the observatory floor",
      onChoose() {
        goTo("upperObservatory");
      },
    });

    return {
      chapter: "Chapter 11",
      modeLabel: "Story",
      title: "Choir Causeway",
      objective: state.flags.defeatedSeraph
        ? "The last outer sentinel is down. Cross the bridge before the spire changes its mind."
        : "Force your way past the hymn bridge sentinel and keep the climb alive.",
      visual: "observatory",
      caption: "A suspended walk of brass ribs and hymn plates hums over open dark all the way to the spire mouth.",
      text: state.flags.defeatedSeraph
        ? [
            "The causeway still sings underfoot, but the sharpest note in it is gone now. Broken hymn plates glitter around the fallen seraph like shed scales from a creature that was never really flesh to begin with.",
            "Ahead, the Lens Spire yawns open on suspended mirrors and a deeper darkness than any other chamber on the climb has managed.",
            "Whatever is waiting below it has already been feeding on light longer than the village has been alive.",
          ]
        : [
            "Beyond the observatory dome hangs a narrow causeway of brass ribs and fractured choir plates. Every step answers with a different note, most of them beautiful enough to be suspicious.",
            "Halfway across, old hymnwork gathers around a white-armored silhouette that has no business hovering in place and every right to keep you from passing.",
            "The ridge wind here is thin, cold, and absolutely full of falling distance.",
          ],
      actions,
    };
  },
  spireHeart() {
    const actions = [];

    if (!state.flags.lensAligned) {
      actions.push({
        label: "Align the mirror array",
        primary: true,
        onChoose() {
          startPuzzle("lensArray", "spireHeart");
        },
      });
    }

    if (state.flags.lensAligned && !state.flags.defeatedEclipseBloom) {
      actions.push({
        label: "Descend into the lens pit",
        primary: true,
        onChoose() {
          startBossIntro("bloomPrelude", "eclipseBloom", "spireHeart", "spireHeart");
        },
      });
    } else if (state.flags.defeatedEclipseBloom) {
      actions.push({
        label: "Lower the Dawnfire Core into the lens-fire",
        primary: true,
        onChoose() {
          goTo("ending");
        },
      });
    }

    actions.push({
      label: "Return to the causeway",
      onChoose() {
        goTo("skyCauseway");
      },
    });

    return {
      chapter: "Chapter 12",
      modeLabel: "Story",
      title: "The Lens Spire",
      objective: state.flags.defeatedEclipseBloom
        ? "The chamber is clear. Wake the lantern and carry the dawn home."
        : state.flags.lensAligned
          ? "The mirrors are set. Finish what rooted itself in the fire's heart."
          : "Align the hanging mirrors before you face what has been feeding on the dawn.",
      visual: "spire",
      caption: "Hanging mirrors and a lens pit where dawn should live, except something dark rooted itself there first.",
      text: [
        "Beyond the cracked lens lies a chamber of hanging mirrors and suspended brass ribs. In the center yawns the lens pit where the true fire should be, but something black and floral pulses there instead, feeding on the dawn trapped in the room.",
        "The mirror array around the pit is shattered into offsets and blind spots. Unless you fix it, whatever lives below gets to keep some of the room hidden from you.",
        "The Moon Lantern shivers in your grip. It knows this is the last door between the valley and a morning that never comes.",
      ],
      actions,
    };
  },
  ending() {
    const relicLine = state.inventory.length
      ? `You descend carrying ${state.inventory.map((itemId) => ITEMS[itemId].name).join(", ")}, proof that the mountain gave up far more than scars.`
      : "You descend with little but the relit lantern and the memory of how close the valley came to permanent dark.";
    const origin = getOriginDefinition();
    const pathId = getChosenPath();
    const pathLine = pathId
      ? `By the end of the climb you have become unmistakably ${SKILL_PATHS[pathId].name.toLowerCase()}: a shape the mountain would recognize even without the lantern.`
      : "Somehow you reached the top without ever swearing fully into one discipline, which feels less like indecision and more like a private argument you won.";

    return {
      chapter: "Epilogue",
      modeLabel: "Victory",
      title: "The Lantern Wakes",
      objective: "Dawn will reach Dusk Hollow with you this time.",
      visual: "victory",
      caption: "The dead lantern finally catches, bright enough to send the night backward a few careful steps.",
      text: [
        `You set the Dawnfire Core into the lens-fire and lower the Moon Lantern over it. For one breathless second nothing happens. Then the ${origin.name} under your skin answers with the lantern, and silver light spills through the crystal frame in quiet sheets until the whole observatory seems to exhale.`,
        "Below the ridge, the valley begins to glow in answer. Windows open in Dusk Hollow. Bells ring. The long dark loses its nerve and retreats into the trees.",
        `${pathLine} ${relicLine}`,
      ],
      actions: [
        {
          label: "Begin another run",
          primary: true,
          onChoose: resetGame,
        },
      ],
    };
  },
};

elements.restartButton.addEventListener("click", resetGame);
elements.armorMenuButton.addEventListener("click", () => setMenuOpen(true));
elements.armorMenuClose.addEventListener("click", () => setMenuOpen(false));
elements.armorMenu.addEventListener("click", (event) => {
  if (event.target === elements.armorMenu) {
    setMenuOpen(false);
  }
});
elements.menuTabs.querySelectorAll(".menu-tab").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveMenuTab(button.dataset.tab);
  });
});
elements.visualPanel.addEventListener("click", (event) => {
  const hotspot = event.target.closest("[data-hotspot]");

  if (!hotspot) {
    return;
  }

  handlePuzzleHotspot(hotspot.dataset.hotspot);
});
elements.interactionPanel.addEventListener("click", (event) => {
  const action = event.target.closest("[data-panel-action]");

  if (!action) {
    return;
  }

  if (action.dataset.panelAction === "reset-puzzle") {
    resetPuzzleAttempt();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && uiState.menuOpen) {
    setMenuOpen(false);
  }
});
render();

function hydrateState() {
  const fresh = createBaseState();

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return fresh;
    }

    const parsed = JSON.parse(saved);
    const inventory = Array.isArray(parsed.inventory) ? parsed.inventory.filter((itemId) => Boolean(ITEMS[itemId])) : [];
    const armorInventory = Array.from(
      new Set([
        ...fresh.armorInventory,
        ...(Array.isArray(parsed.armorInventory) ? parsed.armorInventory.filter((armorId) => Boolean(ARMOR_PIECES[armorId])) : []),
      ])
    );
    const equippedArmor = {
      head: armorInventory.includes(parsed.equippedArmor?.head) && ARMOR_PIECES[parsed.equippedArmor.head]?.slot === "head"
        ? parsed.equippedArmor.head
        : null,
      body: armorInventory.includes(parsed.equippedArmor?.body) && ARMOR_PIECES[parsed.equippedArmor.body]?.slot === "body"
        ? parsed.equippedArmor.body
        : "travelLeathers",
      cloak: armorInventory.includes(parsed.equippedArmor?.cloak) && ARMOR_PIECES[parsed.equippedArmor.cloak]?.slot === "cloak"
        ? parsed.equippedArmor.cloak
        : null,
    };
    const puzzleState = {};

    Object.entries(parsed.puzzleState || {}).forEach(([puzzleId, progress]) => {
      const puzzle = PUZZLES[puzzleId];

      if (!puzzle) {
        return;
      }

      const validHotspots = puzzle.hotspots.map((hotspot) => hotspot.id);
      const stateMap = {};

      puzzle.hotspots.forEach((hotspot) => {
        const rawValue = progress?.states?.[hotspot.id];
        const stateCount = hotspot.states?.length || 1;
        stateMap[hotspot.id] = Number.isFinite(rawValue) ? clamp(rawValue, 0, stateCount - 1) : hotspot.initial || 0;
      });

      puzzleState[puzzleId] = {
        attempt: [],
        seen: Array.isArray(progress.seen) ? progress.seen.filter((id) => validHotspots.includes(id)) : [],
        states: stateMap,
        touches: Number.isFinite(progress?.touches) ? Math.max(0, progress.touches) : 0,
        strikes: Number.isFinite(progress?.strikes) ? Math.max(0, progress.strikes) : 0,
        lastMessage: typeof progress.lastMessage === "string" ? progress.lastMessage : puzzle.hint,
        solved: Boolean(progress.solved),
      };
    });

    const merged = {
      ...fresh,
      ...parsed,
      originId: ORIGINS[parsed.originId] ? parsed.originId : fresh.originId,
      specialization: SKILL_PATHS[parsed.specialization] ? parsed.specialization : null,
      inventory,
      armorInventory,
      equippedArmor,
      puzzleState,
      activePuzzle: parsed.activePuzzle && PUZZLES[parsed.activePuzzle.id]
        ? { id: parsed.activePuzzle.id, sourceNode: parsed.activePuzzle.sourceNode || parsed.currentNode || fresh.currentNode }
        : null,
      cutscene: parsed.cutscene && CUTSCENES[parsed.cutscene.key]
        ? { key: parsed.cutscene.key, index: clamp(parsed.cutscene.index || 0, 0, CUTSCENES[parsed.cutscene.key].slides.length - 1) }
        : null,
      queuedCombat: parsed.queuedCombat && ENEMIES[parsed.queuedCombat.enemyKey]
        ? {
            enemyKey: parsed.queuedCombat.enemyKey,
            victoryNode: parsed.queuedCombat.victoryNode || fresh.currentNode,
            defeatNode: parsed.queuedCombat.defeatNode || fresh.currentNode,
            isBoss: Boolean(parsed.queuedCombat.isBoss),
          }
        : null,
      unlockedTreeNodes: Array.isArray(parsed.unlockedTreeNodes)
        ? parsed.unlockedTreeNodes.filter((nodeId) => Boolean(SKILL_TREE[nodeId]))
        : [],
      flags: {
        ...fresh.flags,
        ...(parsed.flags || {}),
      },
      log: Array.isArray(parsed.log) && parsed.log.length ? parsed.log : buildIntroLog(fresh.originId),
    };

    merged.abilities = buildAbilityList(
      merged,
      Array.isArray(parsed.abilities) ? parsed.abilities.filter((abilityId) => Boolean(ABILITIES[abilityId])) : []
    );
    merged.equippedAbilities = buildEquippedAbilityLoadout(
      merged,
      Array.isArray(parsed.equippedAbilities)
        ? parsed.equippedAbilities.filter((abilityId) => Boolean(ABILITIES[abilityId]))
        : []
    );
    merged.specialization = getChosenPath(merged);
    merged.health = clamp(
      typeof merged.health === "number" ? merged.health : getMaxHealth(merged),
      0,
      getMaxHealth(merged)
    );
    merged.resolve = clamp(
      typeof merged.resolve === "number" ? merged.resolve : getMaxResolve(merged),
      0,
      getMaxResolve(merged)
    );

    return merged;
  } catch (error) {
    console.warn("Could not load save data, starting fresh.", error);
    return fresh;
  }
}

function buildAbilityList(sourceState, knownAbilities = []) {
  const unlocked = new Set(DEFAULT_ABILITY_IDS);

  knownAbilities.forEach((abilityId) => {
    if (ABILITIES[abilityId]) {
      unlocked.add(abilityId);
    }
  });

  (sourceState.inventory || []).forEach((itemId) => {
    const abilityId = ITEMS[itemId]?.abilityUnlock;

    if (abilityId && ABILITIES[abilityId]) {
      unlocked.add(abilityId);
    }
  });

  return ABILITY_ORDER.filter((abilityId) => unlocked.has(abilityId));
}

function buildEquippedAbilityLoadout(sourceState, preferredIds = []) {
  const unlocked = new Set(
    Array.isArray(sourceState.abilities) && sourceState.abilities.length
      ? sourceState.abilities.filter((abilityId) => Boolean(ABILITIES[abilityId]))
      : buildAbilityList(sourceState)
  );
  const loadout = [];

  preferredIds.forEach((abilityId) => {
    if (!unlocked.has(abilityId) || loadout.includes(abilityId) || loadout.length >= MAX_ACTIVE_ABILITIES) {
      return;
    }

    loadout.push(abilityId);
  });

  DEFAULT_ABILITY_IDS.forEach((abilityId) => {
    if (!unlocked.has(abilityId) || loadout.includes(abilityId) || loadout.length >= MAX_ACTIVE_ABILITIES) {
      return;
    }

    loadout.push(abilityId);
  });

  if (!loadout.length) {
    const fallback = ABILITY_ORDER.find((abilityId) => unlocked.has(abilityId));

    if (fallback) {
      loadout.push(fallback);
    }
  }

  return ABILITY_ORDER.filter((abilityId) => loadout.includes(abilityId)).slice(0, MAX_ACTIVE_ABILITIES);
}

function getReadyAbilityIds(sourceState = state) {
  return buildEquippedAbilityLoadout(sourceState, sourceState.equippedAbilities || []);
}

function getReadyAbilityNames(sourceState = state) {
  return getReadyAbilityIds(sourceState).map((abilityId) => ABILITIES[abilityId]?.name).filter(Boolean);
}

function getChosenPath(sourceState = state) {
  if (sourceState.specialization && SKILL_PATHS[sourceState.specialization]) {
    return sourceState.specialization;
  }

  const unlockedRoot = (sourceState.unlockedTreeNodes || []).find((nodeId) => SKILL_TREE[nodeId]?.isPathRoot);
  return unlockedRoot ? SKILL_TREE[unlockedRoot].branch : null;
}

function getOriginBuffTotal(stat, sourceState = state) {
  return getOriginDefinition(sourceState).buffs?.[stat] || 0;
}

function getOriginAbilityBonus(abilityId, key, sourceState = state) {
  return getOriginDefinition(sourceState).abilityMods?.[abilityId]?.[key] || 0;
}

function describeOriginAbilityBonus(abilityId, sourceState = state) {
  const mods = getOriginDefinition(sourceState).abilityMods?.[abilityId];

  if (!mods) {
    return "";
  }

  const parts = [];

  if (mods.damage) {
    parts.push(`+${mods.damage} damage`);
  }

  if (mods.heal) {
    parts.push(`+${mods.heal} healing`);
  }

  if (mods.resolveGain) {
    parts.push(`restore +${mods.resolveGain} Resolve`);
  }

  if (mods.guard) {
    parts.push(`grant +${mods.guard} Guard`);
  }

  if (mods.afterDodgeGuard) {
    parts.push(`leave +${mods.afterDodgeGuard} Guard after the dodge`);
  }

  if (mods.shred) {
    parts.push(`strip +${mods.shred} extra Guard`);
  }

  if (mods.weaken) {
    parts.push(`weaken +${mods.weaken} extra attack`);
  }

  return parts.length ? `Origin bonus: ${parts.join(", ")}.` : "";
}

function getAbilityDescription(abilityId) {
  const ability = ABILITIES[abilityId];
  const bonusText = describeOriginAbilityBonus(abilityId);

  return bonusText ? `${ability.description} ${bonusText}` : ability.description;
}

function saveGame() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setMenuOpen(open) {
  uiState.menuOpen = open;
  renderTravelerMenu();
}

function setActiveMenuTab(tab) {
  uiState.activeMenuTab = tab;
  renderTravelerMenu();
}

function pushToast(title, body, tone = "reward") {
  const id = window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  uiState.toasts = [...uiState.toasts.slice(-2), { id, title, body, tone }];
  renderToasts();
  window.setTimeout(() => dismissToast(id), TOAST_DURATION_MS);
}

function dismissToast(id) {
  const nextToasts = uiState.toasts.filter((toast) => toast.id !== id);

  if (nextToasts.length === uiState.toasts.length) {
    return;
  }

  uiState.toasts = nextToasts;
  renderToasts();
}

function clearToasts() {
  if (!uiState.toasts.length) {
    return;
  }

  uiState.toasts = [];
  renderToasts();
}

function resetGame() {
  state = createBaseState();
  uiState.menuOpen = false;
  uiState.activeMenuTab = "armor";
  clearToasts();
  saveGame();
  render();
}

function getItemBuffTotal(stat, sourceState = state) {
  return (sourceState.inventory || []).reduce((total, itemId) => total + (ITEMS[itemId]?.buffs?.[stat] || 0), 0);
}

function getEquippedArmorIds(sourceState = state) {
  return ARMOR_SLOT_ORDER.map((slot) => sourceState.equippedArmor?.[slot]).filter((armorId) => Boolean(ARMOR_PIECES[armorId]));
}

function getArmorBuffTotal(stat, sourceState = state) {
  return getEquippedArmorIds(sourceState).reduce((total, armorId) => total + (ARMOR_PIECES[armorId]?.buffs?.[stat] || 0), 0);
}

function getTreeBuffTotal(stat, sourceState = state) {
  return (sourceState.unlockedTreeNodes || []).reduce((total, nodeId) => total + (SKILL_TREE[nodeId]?.buffs?.[stat] || 0), 0);
}

function getPassiveTotal(passive, sourceState = state) {
  const armorPassive = getEquippedArmorIds(sourceState).reduce(
    (total, armorId) => total + (ARMOR_PIECES[armorId]?.passives?.[passive] || 0),
    0
  );
  const treePassive = (sourceState.unlockedTreeNodes || []).reduce(
    (total, nodeId) => total + (SKILL_TREE[nodeId]?.passives?.[passive] || 0),
    0
  );

  return armorPassive + treePassive;
}

function getBuffTotal(stat, sourceState = state) {
  return getOriginBuffTotal(stat, sourceState) + getItemBuffTotal(stat, sourceState) + getArmorBuffTotal(stat, sourceState) + getTreeBuffTotal(stat, sourceState);
}

function getMaxHealth(sourceState = state) {
  return sourceState.baseMaxHealth + getBuffTotal("maxHealth", sourceState);
}

function getAttack(sourceState = state) {
  return sourceState.baseAttack + getBuffTotal("attack", sourceState);
}

function getDefense(sourceState = state) {
  return sourceState.baseDefense + getBuffTotal("defense", sourceState);
}

function getMaxResolve(sourceState = state) {
  return sourceState.baseResolve + getBuffTotal("resolve", sourceState);
}

function getXpToNext(sourceState = state) {
  return 18 + (sourceState.level - 1) * 12;
}

function getCritChance(sourceState = state) {
  return 0.14 + getPassiveTotal("critChance", sourceState);
}

function clampVitals() {
  state.health = clamp(state.health, 0, getMaxHealth());
  state.resolve = clamp(state.resolve, 0, getMaxResolve());
}

function heal(amount) {
  state.health = clamp(state.health + amount, 0, getMaxHealth());
}

function gainResolve(amount) {
  state.resolve = clamp(state.resolve + amount, 0, getMaxResolve());
}

function refillResolve() {
  state.resolve = getMaxResolve();
}

function spendResolve(cost) {
  if (state.resolve < cost) {
    pushLog(`You need ${cost} Resolve for that skill.`);
    return false;
  }

  state.resolve -= cost;
  return true;
}

function getPuzzleProgress(puzzleId, sourceState = state) {
  const puzzle = PUZZLES[puzzleId];
  const progress = sourceState.puzzleState?.[puzzleId];

  if (!puzzle) {
    return {
      attempt: [],
      seen: [],
      states: {},
      touches: 0,
      strikes: 0,
      lastMessage: "",
      solved: false,
    };
  }

  if (progress) {
    return progress;
  }

  const states = {};

  puzzle.hotspots.forEach((hotspot) => {
    states[hotspot.id] = hotspot.initial || 0;
  });

  return {
    attempt: [],
    seen: [],
    states,
    touches: 0,
    strikes: 0,
    lastMessage: puzzle.hint,
    solved: false,
  };
}

function ensurePuzzleProgress(puzzleId) {
  if (!state.puzzleState[puzzleId]) {
    state.puzzleState[puzzleId] = getPuzzleProgress(puzzleId);
  }

  return state.puzzleState[puzzleId];
}

function isPuzzleSolved(puzzleId, progress = getPuzzleProgress(puzzleId)) {
  const puzzle = PUZZLES[puzzleId];

  if (!puzzle) {
    return false;
  }

  return puzzle.hotspots.every((hotspot) => (progress.states?.[hotspot.id] ?? hotspot.initial ?? 0) === hotspot.target);
}

function getPuzzleStateLabel(puzzleId, hotspotId, sourceState = state) {
  const puzzle = PUZZLES[puzzleId];

  if (!puzzle) {
    return "";
  }

  const hotspot = puzzle.hotspots.find((entry) => entry.id === hotspotId);

  if (!hotspot) {
    return "";
  }

  const progress = getPuzzleProgress(puzzleId, sourceState);
  const value = progress.states?.[hotspotId] ?? hotspot.initial ?? 0;
  return hotspot.states[value] || hotspot.states[0] || "";
}

function getPuzzleStateShort(label) {
  if (!label) {
    return "";
  }

  return label.length <= 4 ? label.toUpperCase() : label.slice(0, 4).toUpperCase();
}

function resetPuzzleBoard(puzzleId, options = {}) {
  const puzzle = PUZZLES[puzzleId];

  if (!puzzle) {
    return;
  }

  const progress = ensurePuzzleProgress(puzzleId);
  progress.states = {};
  progress.attempt = [];
  progress.touches = 0;

  puzzle.hotspots.forEach((hotspot) => {
    progress.states[hotspot.id] = hotspot.initial || 0;
  });

  if (options.resetSeen) {
    progress.seen = [];
  }

  progress.lastMessage = options.message || puzzle.hint;
}

function getTreeNodeStatus(nodeId, sourceState = state) {
  const node = SKILL_TREE[nodeId];
  const unlocked = sourceState.unlockedTreeNodes.includes(nodeId);
  const chosenPath = getChosenPath(sourceState);
  const prereqsMet = node.requires.every((requiredId) => sourceState.unlockedTreeNodes.includes(requiredId));
  const pathLocked = Boolean(chosenPath && node.branch !== chosenPath && !unlocked);
  let reason = "";

  if (unlocked) {
    return {
      unlocked: true,
      canUnlock: false,
      pathLocked: false,
      reason: "Unlocked",
    };
  }

  if (pathLocked) {
    reason = `Locked by ${SKILL_PATHS[chosenPath].name}`;
  } else if (!prereqsMet) {
    reason = `Needs ${node.requires.map((requiredId) => SKILL_TREE[requiredId].name).join(", ")}`;
  } else if (sourceState.skillPoints < node.cost) {
    reason = `Needs ${node.cost} point${node.cost === 1 ? "" : "s"}`;
  }

  return {
    unlocked: false,
    canUnlock: !pathLocked && prereqsMet && sourceState.skillPoints >= node.cost,
    pathLocked,
    reason,
  };
}

function unlockAbility(abilityId, sourceName) {
  if (!ABILITIES[abilityId] || state.abilities.includes(abilityId)) {
    return;
  }

  state.abilities.push(abilityId);
  state.abilities = ABILITY_ORDER.filter((id) => state.abilities.includes(id));
  const autoEquipped = state.equippedAbilities.length < MAX_ACTIVE_ABILITIES;

  if (autoEquipped) {
    state.equippedAbilities.push(abilityId);
  }

  state.equippedAbilities = buildEquippedAbilityLoadout(state, state.equippedAbilities);
  pushLog(
    `${ABILITIES[abilityId].name} unlocks through ${sourceName}.${autoEquipped ? " It is now ready in combat." : " Ready it from the Abilities menu when you want it."}`
  );
  pushToast(
    "New Technique",
    `${ABILITIES[abilityId].name}${autoEquipped ? " is now in your ready loadout." : " is waiting in reserve."}`,
    "ability"
  );
}

function claimArmor(armorId, pickupLine = "") {
  const armor = ARMOR_PIECES[armorId];

  if (!armor || state.armorInventory.includes(armorId)) {
    return false;
  }

  const previousMaxHealth = getMaxHealth();
  const previousMaxResolve = getMaxResolve();

  state.armorInventory.push(armorId);

  if (pickupLine) {
    pushLog(pickupLine);
  }

  pushLog(`${armor.name}: ${armor.summary}. Open the Traveler Menu to equip it.`);
  const autoEquipped = !state.equippedArmor[armor.slot];

  if (autoEquipped) {
    state.equippedArmor[armor.slot] = armorId;
    pushLog(`${armor.name} equips automatically because that slot was empty.`);
  }

  pushToast(
    "Armor Acquired",
    `${armor.name}${autoEquipped ? " equipped automatically." : ""} ${armor.summary}`,
    "armor"
  );

  const healthGain = getMaxHealth() - previousMaxHealth;
  const resolveGain = getMaxResolve() - previousMaxResolve;

  if (healthGain > 0) {
    state.health += healthGain;
  }

  if (resolveGain > 0) {
    state.resolve += resolveGain;
  }

  clampVitals();
  return true;
}

function equipArmor(slot, armorId) {
  if (!ARMOR_SLOT_ORDER.includes(slot)) {
    return;
  }

  if (armorId && (!state.armorInventory.includes(armorId) || ARMOR_PIECES[armorId]?.slot !== slot)) {
    return;
  }

  if (!armorId && slot === "body") {
    pushLog("You need at least one body layer on the mountain.");
    saveGame();
    render();
    return;
  }

  const previousMaxHealth = getMaxHealth();
  const previousMaxResolve = getMaxResolve();
  state.equippedArmor[slot] = armorId || null;

  const healthShift = getMaxHealth() - previousMaxHealth;
  const resolveShift = getMaxResolve() - previousMaxResolve;

  state.health += healthShift;
  state.resolve += resolveShift;
  clampVitals();
  pushLog(armorId ? `${ARMOR_PIECES[armorId].name} equipped in the ${ARMOR_SLOT_LABELS[slot]} slot.` : `${ARMOR_SLOT_LABELS[slot]} slot cleared.`);
  saveGame();
  render();
}

function toggleAbilityReadyState(abilityId) {
  if (!ABILITIES[abilityId] || !state.abilities.includes(abilityId)) {
    return;
  }

  const readyIds = getReadyAbilityIds();
  const isReady = readyIds.includes(abilityId);

  if (isReady) {
    if (readyIds.length === 1) {
      pushLog("Keep at least one technique ready for combat.");
      saveGame();
      render();
      return;
    }

    state.equippedAbilities = readyIds.filter((id) => id !== abilityId);
    pushLog(`${ABILITIES[abilityId].name} moves to reserve.`);
    pushToast("Technique Stored", `${ABILITIES[abilityId].name} will stay out of the combat menu for now.`, "ability");
  } else {
    if (readyIds.length >= MAX_ACTIVE_ABILITIES) {
      pushLog(`Only ${MAX_ACTIVE_ABILITIES} techniques can stay ready at once.`);
      saveGame();
      render();
      return;
    }

    state.equippedAbilities = [...readyIds, abilityId];
    state.equippedAbilities = buildEquippedAbilityLoadout(state, state.equippedAbilities);
    pushLog(`${ABILITIES[abilityId].name} is now ready for combat.`);
    pushToast("Technique Readied", `${ABILITIES[abilityId].name} will now appear in battle.`, "ability");
  }

  saveGame();
  render();
}

function claimItem(itemId, pickupLine = "") {
  const item = ITEMS[itemId];

  if (!item || state.inventory.includes(itemId)) {
    return false;
  }

  const previousMaxHealth = getMaxHealth();
  const previousMaxResolve = getMaxResolve();

  state.inventory.push(itemId);

  if (pickupLine) {
    pushLog(pickupLine);
  }

  if (item.weaponName) {
    state.weapon = item.weaponName;
  }

  pushLog(`${item.name}: ${item.summary}.`);
  pushToast("Relic Acquired", `${item.name}. ${item.summary}`, "reward");

  if (item.abilityUnlock) {
    unlockAbility(item.abilityUnlock, item.name);
  }

  const healthGain = getMaxHealth() - previousMaxHealth;
  const resolveGain = getMaxResolve() - previousMaxResolve;

  if (healthGain > 0) {
    state.health += healthGain;
  }

  if (resolveGain > 0) {
    state.resolve += resolveGain;
  }

  clampVitals();
  return true;
}

function unlockTreeNode(nodeId) {
  const node = SKILL_TREE[nodeId];
  const status = getTreeNodeStatus(nodeId);

  if (!node || !status.canUnlock) {
    return;
  }

  const previousMaxHealth = getMaxHealth();
  const previousMaxResolve = getMaxResolve();

  state.skillPoints -= node.cost;
  state.unlockedTreeNodes.push(nodeId);

  if (node.isPathRoot) {
    state.specialization = node.branch;
  }

  const healthShift = getMaxHealth() - previousMaxHealth;
  const resolveShift = getMaxResolve() - previousMaxResolve;

  state.health += healthShift;
  state.resolve += resolveShift;
  clampVitals();
  pushLog(`${node.name} unlocked. ${node.summary}.`);
  pushToast("Skill Tree Advanced", `${node.name}. ${node.summary}`, "tree");
  saveGame();
  render();
}

function grantExperience(amount, sourceName) {
  state.xp += amount;
  pushLog(`${sourceName} grants ${amount} XP.`);

  while (state.xp >= getXpToNext()) {
    const threshold = getXpToNext();
    const gains = ["+4 Health", "+1 Power"];

    state.xp -= threshold;
    state.level += 1;
    state.baseMaxHealth += 4;
    state.baseAttack += 1;

    if (state.level % 2 === 0) {
      state.baseDefense += 1;
      gains.push("+1 Guard");
    }

    if (state.level % 3 === 0) {
      state.baseResolve += 1;
      gains.push("+1 Resolve");
    }

    state.skillPoints += 1;
    gains.push("+1 Skill Point");
    state.health += 4;
    refillResolve();
    pushLog(`Level ${state.level}. ${gains.join(", ")}.`);
  }

  clampVitals();
}

function pushLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 12);
}

function goTo(nodeKey) {
  state.mode = "story";
  state.currentNode = nodeKey;
  state.currentEnemy = null;
  state.combat = null;
  state.activePuzzle = null;
  state.cutscene = null;
  state.queuedCombat = null;
  state.guardBoost = 0;
  state.dodgeNext = false;
  state.pendingDodgeGuard = 0;
  refillResolve();
  clampVitals();
  saveGame();
  render();
}

function startPuzzle(puzzleId, sourceNode = state.currentNode) {
  if (!PUZZLES[puzzleId]) {
    return;
  }

  state.mode = "puzzle";
  state.activePuzzle = {
    id: puzzleId,
    sourceNode,
  };
  state.currentEnemy = null;
  state.combat = null;
  state.cutscene = null;
  state.queuedCombat = null;
  const progress = ensurePuzzleProgress(puzzleId);

  if (!progress.solved) {
    resetPuzzleBoard(puzzleId);
  }

  saveGame();
  render();
}

function resetPuzzleAttempt(puzzleId = state.activePuzzle?.id) {
  if (!puzzleId || !PUZZLES[puzzleId]) {
    return;
  }

  resetPuzzleBoard(puzzleId);
  pushLog("You step back, read the mechanism again, and start the sequence over by hand.");
  saveGame();
  render();
}

function handlePuzzleHotspot(hotspotId) {
  if (state.mode !== "puzzle" || !state.activePuzzle) {
    return;
  }

  const puzzleId = state.activePuzzle.id;
  const puzzle = PUZZLES[puzzleId];
  const hotspot = puzzle.hotspots.find((entry) => entry.id === hotspotId);
  const progress = ensurePuzzleProgress(puzzleId);

  if (!hotspot || progress.solved) {
    return;
  }

  progress.seen = Array.from(new Set([...progress.seen, hotspotId]));
  hotspot.effects.forEach((effect) => {
    const target = puzzle.hotspots.find((entry) => entry.id === effect.id);

    if (!target) {
      return;
    }

    const stateCount = target.states.length;
    const current = progress.states[effect.id] ?? target.initial ?? 0;
    progress.states[effect.id] = (current + effect.shift) % stateCount;
  });

  progress.touches += 1;
  progress.lastMessage = hotspot.clue;
  pushLog(`${hotspot.label}: ${hotspot.clue}`);

  if (isPuzzleSolved(puzzleId, progress)) {
    progress.solved = true;
    completePuzzle(puzzleId);
    return;
  }

  if (progress.touches >= puzzle.overloadLimit) {
    progress.strikes += 1;
    state.health = Math.max(1, state.health - puzzle.failureDamage);
    state.resolve = Math.max(0, state.resolve - puzzle.failureResolve);
    progress.lastMessage = puzzle.resetText;
    pushLog(`${puzzle.resetText} The backlash costs ${puzzle.failureDamage} health${puzzle.failureResolve ? ` and ${puzzle.failureResolve} Resolve` : ""}.`);
    resetPuzzleBoard(puzzleId, { message: puzzle.resetText });
  }

  saveGame();
  render();
}

function completePuzzle(puzzleId) {
  switch (puzzleId) {
    case "shrineAttunement":
      state.flags.shrineRiteSolved = true;
      grantExperience(18, "The keeper's rite");
      state.health = getMaxHealth();
      refillResolve();
      claimItem("lanternShard", "The crystal shard slides into the Moon Lantern as if it had always been waiting for this exact prayer.");
      claimItem("clearwaterRibbon", "The basin knots a thread of silver water around your wrist before it goes still.");
      pushToast("Rite Completed", PUZZLES[puzzleId].solveToast, "reward");
      goTo("shrine");
      return;
    case "reliquaryDoors":
      state.flags.reliquarySolved = true;
      state.gold += 9;
      state.potions += 1;
      grantExperience(22, "The choir reliquary");
      claimArmor("cantorMantle", "Behind the saint doors hangs a cantor mantle stiff with glass thread and old incense.");
      pushToast("Reliquary Opened", "9 silver and 1 tonic were tucked behind the saint cache.", "resource");
      pushLog("The choir lock opens the saint cache and the upper stair in one long rattling sigh.");
      goTo("choirReliquary");
      return;
    case "orreryRebuild":
      state.flags.orrerySolved = true;
      state.gold += 10;
      state.potions += 1;
      grantExperience(22, "The sunken orrery");
      pushToast("Orrery Restored", "10 silver and 1 tonic shake loose as the lift path wakes.", "resource");
      pushLog("The drowned rings catch, turn, and finally hand power back to the ascender rail.");
      goTo("orreryVault");
      return;
    case "lensArray":
      state.flags.lensAligned = true;
      grantExperience(20, "The mirror array");
      refillResolve();
      pushToast("Array Aligned", PUZZLES[puzzleId].solveToast, "reward");
      pushLog("The mirrors lock into a clean halo above the pit and the chamber loses one more place to hide.");
      goTo("spireHeart");
      return;
    default:
      return;
  }
}

function startBossIntro(cutsceneKey, enemyKey, victoryNode, defeatNode, isBoss = true) {
  if (!CUTSCENES[cutsceneKey] || !ENEMIES[enemyKey]) {
    return;
  }

  state.mode = "cutscene";
  state.cutscene = {
    key: cutsceneKey,
    index: 0,
  };
  state.queuedCombat = {
    enemyKey,
    victoryNode,
    defeatNode,
    isBoss,
  };
  state.currentEnemy = null;
  state.combat = null;
  state.activePuzzle = null;
  saveGame();
  render();
}

function advanceCutscene() {
  if (!state.cutscene) {
    return;
  }

  const cutscene = CUTSCENES[state.cutscene.key];

  if (state.cutscene.index < cutscene.slides.length - 1) {
    state.cutscene.index += 1;
    saveGame();
    render();
    return;
  }

  const queued = state.queuedCombat;
  state.cutscene = null;

  if (queued) {
    startCombat(queued.enemyKey, queued.victoryNode, queued.defeatNode, queued.isBoss);
    return;
  }

  state.mode = "story";
  saveGame();
  render();
}

function getEnemyMove(enemy = state.currentEnemy) {
  if (!enemy?.moves?.length) {
    return null;
  }

  return enemy.moves[enemy.moveIndex % enemy.moves.length];
}

function advanceEnemyMove(enemy = state.currentEnemy) {
  if (!enemy?.moves?.length) {
    return;
  }

  enemy.moveIndex = (enemy.moveIndex + 1) % enemy.moves.length;
}

function getIntentThreat(move) {
  if (!move) {
    return "";
  }

  const notes = [];

  if (move.guardBreak) {
    notes.push(`Pierces ${move.guardBreak} Guard`);
  }

  if (move.ignoreDefense) {
    notes.push("Ignores Defense");
  }

  if (move.resolveBurn) {
    notes.push(`Burns ${move.resolveBurn} Resolve`);
  }

  if (move.enemyGuardGain) {
    notes.push(`Gains ${move.enemyGuardGain} Guard`);
  }

  if (move.heal) {
    notes.push(`Heals ${move.heal}`);
  }

  return notes.join(" | ");
}

function startCombat(enemyKey, victoryNode, defeatNode, isBoss = false) {
  const enemy = ENEMIES[enemyKey];

  if (!enemy) {
    return;
  }

  state.mode = "combat";
  state.currentEnemy = {
    key: enemy.key,
    name: enemy.name,
    health: enemy.maxHealth,
    maxHealth: enemy.maxHealth,
    defense: enemy.defense,
    attackMin: enemy.attackMin,
    attackMax: enemy.attackMax,
    description: enemy.description,
    visual: enemy.visual,
    weakened: 0,
    moves: enemy.moves || [],
    moveIndex: 0,
  };
  state.combat = {
    victoryNode,
    defeatNode,
    intro: enemy.intro,
    isBoss,
  };
  state.activePuzzle = null;
  state.cutscene = null;
  state.queuedCombat = null;
  state.guardBoost = 0;
  state.dodgeNext = false;
  state.pendingDodgeGuard = 0;
  refillResolve();
  state.guardBoost += getPassiveTotal("openingGuard");

  if (enemyKey === "eclipseBloom" && state.flags.lensAligned) {
    state.currentEnemy.defense = Math.max(0, state.currentEnemy.defense - 1);
    state.currentEnemy.attackMax = Math.max(state.currentEnemy.attackMin, state.currentEnemy.attackMax - 1);
    pushLog("The aligned mirror array strips some of the Bloom's cover away.");
  }

  if (getPassiveTotal("openingGuard")) {
    pushLog("Your armor and training lay a ready guard over the opening exchange.");
  }

  const openingMove = getEnemyMove(state.currentEnemy);

  if (openingMove) {
    pushLog(`${enemy.name} telegraphs ${openingMove.name.toLowerCase()}. ${openingMove.description}`);
  }

  pushLog(`${enemy.name} blocks your path.`);
  saveGame();
  render();
}

function resolveCombatAction(actionId) {
  if (!state.currentEnemy) {
    return;
  }

  switch (actionId) {
    case "attack":
      playerAttack();
      break;
    case "guard":
      guardAction();
      break;
    case "potion":
      drinkPotion();
      break;
    default:
      if (ABILITIES[actionId]) {
        ABILITIES[actionId].use();
      }
      break;
  }

  saveGame();
  render();
}

function playerAttack() {
  const crit = Math.random() < getCritChance();
  const damage = dealDamageToEnemy(roll(getAttack() + 1, getAttack() + 4) + (crit ? 3 : 0));

  pushLog(`${crit ? "Critical hit. " : ""}You deal ${damage} damage to ${state.currentEnemy.name}.`);

  if (crit) {
    gainResolve(1);
    pushLog("A clean opening restores 1 Resolve.");
  }

  if (state.currentEnemy.health <= 0) {
    winCombat();
    return;
  }

  enemyTurn();
}

function guardAction() {
  state.guardBoost = Math.max(state.guardBoost, 5);
  const resolveGain = 1 + getPassiveTotal("guardResolve");
  const healing = getPassiveTotal("guardHeal");

  gainResolve(resolveGain);

  if (healing) {
    heal(healing);
  }

  pushLog(`You set the lantern frame, gaining ${resolveGain} Resolve and heavy Guard for the next hit.`);

  if (healing) {
    pushLog(`Your current armor and discipline patch ${healing} health back together while you brace.`);
  }

  enemyTurn();
}

function drinkPotion() {
  if (state.potions < 1) {
    pushLog("You fumble for a tonic and find only empty glass.");
    enemyTurn();
    return;
  }

  const healing = roll(6, 10) + Math.floor(state.level / 2) + getPassiveTotal("potionHeal");
  state.potions -= 1;
  heal(healing);
  gainResolve(getPassiveTotal("potionResolve"));
  pushLog(`You drink a field tonic and recover ${healing} health.`);

  if (getPassiveTotal("potionResolve")) {
    pushLog("The tonic clears your head enough to restore some Resolve.");
  }

  enemyTurn();
}

function dealDamageToEnemy(rawDamage, options = {}) {
  const enemy = state.currentEnemy;
  const mitigation = options.ignoreDefense ? 0 : enemy.defense;
  const damage = Math.max(1, rawDamage - mitigation);
  enemy.health = clamp(enemy.health - damage, 0, enemy.maxHealth);
  return damage;
}

function enemyTurn() {
  const enemy = state.currentEnemy;

  if (!enemy) {
    return;
  }

  const move = getEnemyMove(enemy);

  if (!move) {
    const fallbackDamage = Math.max(1, roll(enemy.attackMin, enemy.attackMax) - (getDefense() + state.guardBoost));
    state.health = clamp(state.health - fallbackDamage, 0, getMaxHealth());
    pushLog(`${enemy.name} strikes for ${fallbackDamage} damage.`);
    state.guardBoost = 0;
    state.pendingDodgeGuard = 0;

    if (state.health <= 0) {
      loseCombat();
    }

    return;
  }

  if (state.dodgeNext) {
    state.dodgeNext = false;
    state.guardBoost = state.pendingDodgeGuard || 0;
    state.pendingDodgeGuard = 0;
    enemy.weakened = 0;
    pushLog(`You ghost past ${enemy.name}'s ${move.name.toLowerCase()} without taking the hit.`);

    if (move.heal) {
      enemy.health = clamp(enemy.health + move.heal, 0, enemy.maxHealth);
      pushLog(`${enemy.name} still recovers ${move.heal} health behind the miss.`);
    }

    if (move.enemyGuardGain) {
      enemy.defense += move.enemyGuardGain;
      pushLog(`${enemy.name} still comes out of it with +${move.enemyGuardGain} Guard.`);
    }

    if (state.guardBoost) {
      pushLog(`The missed strike leaves ${state.guardBoost} Guard around you.`);
    }

    advanceEnemyMove(enemy);
    return;
  }

  const weakness = enemy.weakened || 0;
  const minAttack = Math.max(1, (move.attackMin ?? enemy.attackMin) - weakness);
  const maxAttack = Math.max(minAttack, (move.attackMax ?? enemy.attackMax) - weakness);
  const incoming = roll(minAttack, maxAttack);
  const guardAfterBreak = Math.max(0, state.guardBoost - (move.guardBreak || 0));
  const defenseTotal = move.ignoreDefense ? guardAfterBreak : getDefense() + guardAfterBreak;
  const damage = Math.max(1, incoming - defenseTotal);

  if (weakness) {
    pushLog("The next strike comes through the starfire haze, slower than it should.");
  }

  state.health = clamp(state.health - damage, 0, getMaxHealth());
  pushLog(`${enemy.name} uses ${move.name} for ${damage} damage.`);

  if (move.guardBreak) {
    pushLog(`${move.name} tears through ${move.guardBreak} points of Guard.`);
  }

  if (move.resolveBurn) {
    state.resolve = Math.max(0, state.resolve - move.resolveBurn);
    pushLog(`${move.name} burns ${move.resolveBurn} Resolve out of you.`);
  }

  if (move.heal) {
    enemy.health = clamp(enemy.health + move.heal, 0, enemy.maxHealth);
    pushLog(`${enemy.name} regains ${move.heal} health in the exchange.`);
  }

  if (move.enemyGuardGain) {
    enemy.defense += move.enemyGuardGain;
    pushLog(`${enemy.name} hardens behind +${move.enemyGuardGain} Guard.`);
  }

  state.guardBoost = 0;
  state.pendingDodgeGuard = 0;
  enemy.weakened = 0;

  const counterDamage = damage > 0 ? getPassiveTotal("counterDamage") : 0;

  if (counterDamage) {
    const returned = dealDamageToEnemy(counterDamage, { ignoreDefense: true });
    pushLog(`Your armor bites back for ${returned} counter damage.`);

    if (enemy.health <= 0) {
      winCombat();
      return;
    }
  }

  advanceEnemyMove(enemy);

  const nextMove = getEnemyMove(enemy);

  if (nextMove && state.health > 0) {
    pushLog(`${enemy.name} shifts toward ${nextMove.name.toLowerCase()}. ${nextMove.description}`);
  }

  if (state.health <= 0) {
    loseCombat();
  }
}

function winCombat() {
  const enemyDef = ENEMIES[state.currentEnemy.key];
  const nextNode = state.combat?.victoryNode || state.currentNode;
  const silver = roll(enemyDef.goldRange[0], enemyDef.goldRange[1]);

  grantExperience(enemyDef.xp, enemyDef.name);
  state.gold += silver;
  pushLog(`${enemyDef.name} leaves ${silver} silver in the aftermath.`);
  pushToast("Silver Acquired", `${silver} silver recovered from ${enemyDef.name}.`, "resource");
  enemyDef.reward();

  state.mode = "story";
  state.currentEnemy = null;
  state.combat = null;
  state.guardBoost = 0;
  state.dodgeNext = false;
  state.pendingDodgeGuard = 0;
  goTo(nextNode);
}

function loseCombat() {
  const retreatNode = state.combat?.defeatNode || state.currentNode;
  const enemyName = state.currentEnemy.name;
  const silverLost = Math.min(8, state.gold);

  state.gold -= silverLost;
  state.health = Math.max(10, Math.floor(getMaxHealth() * 0.55));
  state.mode = "story";
  state.currentEnemy = null;
  state.combat = null;
  state.guardBoost = 0;
  state.dodgeNext = false;
  state.pendingDodgeGuard = 0;
  refillResolve();

  pushLog(`The lantern drags you back from blacking out. You lose ${silverLost} silver and wake hurt but alive.`);
  pushLog(`${enemyName} still waits ahead.`);
  goTo(retreatNode);
}

function searchWagon() {
  state.flags.wagonSearched = true;
  state.gold += 4;
  state.potions += 1;
  pushToast("Supplies Recovered", "4 silver and 1 tonic salvaged from the wrecked wagon.", "resource");
  claimItem("huntersWhetstone", "A hunter's kit survives under a split axle, along with one sealed tonic.");
  claimArmor("scoutHood", "Folded under the kit is a scout hood sized close enough to fit.");
  pushLog("You also salvage 4 silver from a hidden purse sewn into the wagon canvas.");
  saveGame();
  render();
}

function openFerrymanCache() {
  state.flags.ferrymanCacheOpened = true;
  state.gold += 7;
  state.potions += 1;
  pushToast("Cache Opened", "7 silver and 1 tonic pulled from the ferryman's lockbox.", "resource");
  claimItem("bridgeHook", "The lockbox yields a ferryman's hook, old rope, and one dry field tonic.");
  claimArmor("ferrymanShroud", "Folded beneath the rope is a ferry shroud, still cold with bridge mist.");
  pushLog("Tucked beneath the rope is a stack of 7 silver stamped with bridge toll marks.");
  saveGame();
  render();
}

function restAtCamp() {
  state.flags.campRested = true;
  state.health = getMaxHealth();
  refillResolve();
  pushLog("The blue coals do not warm the air, only the bones. You rise fully restored.");
  saveGame();
  render();
}

function buyCampItem(itemId, cost, flagName, pickupLine) {
  if (state.gold < cost) {
    pushLog(`You need ${cost} silver for that trade.`);
    saveGame();
    render();
    return;
  }

  state.gold -= cost;
  state.flags[flagName] = true;

  if (ARMOR_PIECES[itemId]) {
    claimArmor(itemId, pickupLine);
  } else {
    claimItem(itemId, pickupLine);
  }

  saveGame();
  render();
}

function buyCampTonics() {
  if (state.gold < 6) {
    pushLog("The ragpicker spirit taps the chest lid. No credit tonight.");
    saveGame();
    render();
    return;
  }

  state.gold -= 6;
  state.potions += 2;
  state.flags.boughtCampTonics = true;
  pushLog("You trade 6 silver for two tonics wrapped in oiled cloth.");
  pushToast("Camp Trade", "Two tonics wrapped in oiled cloth join your pack.", "resource");
  saveGame();
  render();
}

function searchGlassPool() {
  state.flags.glassPoolSearched = true;
  state.gold += 8;
  state.potions += 1;
  pushToast("Garden Cache", "8 silver and 1 tonic shaken loose from the mirrored roots.", "resource");
  claimArmor("mirrorCirclet", "Buried in the fused roots sits a polished circlet that catches every shard of light.");
  pushLog("Beneath the mirrored pool you find 8 silver and a tonic trapped under fused roots.");
  saveGame();
  render();
}

function claimPrismSigil() {
  state.flags.prismSigilClaimed = true;
  claimItem("prismSigil", "Inside the Stag's shattered antlers, a prism rune still turns with its own light.");
  saveGame();
  render();
}

function readArchiveJournal() {
  state.flags.archiveJournalRead = true;
  grantExperience(10, "The keeper's journal");
  refillResolve();
  pushLog("The journal teaches you where the keepers stood when the lens-fire fought back.");
  saveGame();
  render();
}

function claimStarMap() {
  state.flags.starMapClaimed = true;
  claimItem("starMapScrap", "Pinned under brass weights, a torn star chart survives the dust and the hush.");
  saveGame();
  render();
}

function searchArmory() {
  state.flags.armorySearched = true;
  state.potions += 1;
  pushToast("Armory Stores", "A field tonic survives in the old observatory racks.", "resource");
  claimArmor("wardenPlate", "The armory gives up a fitted chestplate and one tonic that somehow never evaporated.");
  saveGame();
  render();
}

function restAtObservatory() {
  state.flags.observatoryRested = true;
  heal(12);
  refillResolve();
  pushLog("The brazier's last orange breath carries enough heat to set your hands steady again.");
  saveGame();
  render();
}

function getCurrentScene() {
  if (state.mode === "cutscene" && state.cutscene) {
    const cutscene = CUTSCENES[state.cutscene.key];
    const slideIndex = state.cutscene.index;

    return {
      chapter: cutscene.chapter,
      modeLabel: cutscene.modeLabel,
      title: cutscene.title,
      objective: `${cutscene.objective} ${slideIndex + 1}/${cutscene.slides.length}`,
      visual: cutscene.visual,
      caption: cutscene.caption,
      text: [cutscene.slides[slideIndex]],
      interaction: {
        type: "cutscene",
        current: slideIndex + 1,
        total: cutscene.slides.length,
      },
      actions: [
        {
          label: slideIndex === cutscene.slides.length - 1 ? cutscene.finalLabel : "Continue",
          primary: true,
          onChoose: advanceCutscene,
        },
      ],
    };
  }

  if (state.mode === "puzzle" && state.activePuzzle) {
    const puzzle = PUZZLES[state.activePuzzle.id];
    const progress = getPuzzleProgress(state.activePuzzle.id);
    const actions = [];

    if (progress.touches) {
      actions.push({
        label: "Reset the mechanism",
        onChoose: resetPuzzleAttempt,
      });
    }

    actions.push({
      label: "Step back from the mechanism",
      onChoose() {
        goTo(state.activePuzzle.sourceNode);
      },
    });

    return {
      chapter: puzzle.chapter,
      modeLabel: puzzle.modeLabel,
      title: puzzle.title,
      objective: puzzle.objective,
      visual: puzzle.visual,
      caption: puzzle.caption,
      text: puzzle.text,
      interaction: {
        type: "puzzle",
        puzzleId: state.activePuzzle.id,
      },
      actions,
    };
  }

  if (state.mode === "combat" && state.currentEnemy) {
    return {
      chapter: state.combat?.isBoss ? "Boss Encounter" : "Encounter",
      modeLabel: "Combat",
      title: state.currentEnemy.name,
      objective: state.combat?.isBoss
        ? "Spend Resolve carefully and break the guardian before it breaks the climb."
        : "Survive the fight and keep the lantern moving.",
      visual: state.currentEnemy.visual,
      caption: "The road narrows until only you, the monster, and whatever your relics, origin, and route can still do matter.",
      text: [
        state.combat?.intro || "A monster crashes out of the dark.",
        state.currentEnemy.description,
      ],
      actions: getCombatActions(),
    };
  }

  const buildNode = NODES[state.currentNode] || NODES.intro;
  return buildNode();
}

function getCombatActions() {
  const guardResolve = 1 + getPassiveTotal("guardResolve");
  const readyAbilities = getReadyAbilityIds();
  const actions = [
    {
      label: "Strike with your weapon",
      primary: true,
      onChoose() {
        resolveCombatAction("attack");
      },
    },
    {
      label: `Raise your guard (+5 Guard, +${guardResolve} Resolve)`,
      onChoose() {
        resolveCombatAction("guard");
      },
    },
  ];

  if (state.potions > 0) {
    actions.push({
      label: `Drink a field tonic (${state.potions})`,
      onChoose() {
        resolveCombatAction("potion");
      },
    });
  }

  readyAbilities.forEach((abilityId) => {
    const ability = ABILITIES[abilityId];

    actions.push({
      label: `${ability.name} (${ability.cost} Resolve)`,
      onChoose() {
        resolveCombatAction(abilityId);
      },
      disabled: state.resolve < ability.cost,
    });
  });

  return actions;
}

function render() {
  const scene = getCurrentScene();

  applyAreaTheme(scene);
  elements.chapterLabel.textContent = scene.chapter;
  elements.sceneTitle.textContent = scene.title;
  elements.objectiveText.textContent = scene.objective;
  elements.modeChip.textContent = scene.modeLabel;
  elements.visualCaption.textContent = scene.caption;
  elements.visualPanel.innerHTML = buildVisualMarkup(scene);
  elements.visualPanel.classList.toggle("interactive", scene.interaction?.type === "puzzle");
  elements.visualPanel.setAttribute("aria-hidden", String(scene.interaction?.type !== "puzzle"));
  elements.storyText.replaceChildren(...scene.text.map(renderParagraph));

  renderInteractionPanel(scene);
  renderChoices(scene.actions);
  renderEncounterSummary();
  renderStats(scene);
  renderArmorMenu();
  renderAbilities();
  renderInventory();
  renderSkillTree();
  renderTravelerMenu();
  renderLog();
}

function buildVisualMarkup(scene) {
  if (scene.interaction?.type === "puzzle") {
    const puzzle = PUZZLES[scene.interaction.puzzleId];
    const progress = getPuzzleProgress(scene.interaction.puzzleId);

    return `
      <div class="visual-stage">
        ${sceneArt(scene.visual)}
        ${puzzle.hotspots.map((hotspot) => {
          const seen = progress.seen.includes(hotspot.id);
          const currentValue = progress.states?.[hotspot.id] ?? hotspot.initial ?? 0;
          const completed = currentValue === hotspot.target;
          const status = completed ? "solved" : seen ? "seen" : "idle";
          const currentLabel = hotspot.states[currentValue] || hotspot.states[0];
          const targetLabel = hotspot.states[hotspot.target] || hotspot.states[0];

          return `
            <button
              class="visual-hotspot ${status}"
              type="button"
              style="left:${hotspot.x}%; top:${hotspot.y}%"
              data-hotspot="${hotspot.id}"
              aria-label="${hotspot.label}"
              title="${hotspot.label}"
            >
              <span class="hotspot-name">${hotspot.short}</span>
              <strong>${getPuzzleStateShort(currentLabel)}</strong>
              <small>${getPuzzleStateShort(targetLabel)}</small>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  if (scene.interaction?.type === "cutscene") {
    return `<div class="visual-stage cutscene-stage">${sceneArt(scene.visual)}<div class="cutscene-vignette"></div></div>`;
  }

  return sceneArt(scene.visual);
}

function renderParagraph(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}

function renderInteractionPanel(scene) {
  elements.interactionPanel.innerHTML = "";

  if (!scene.interaction) {
    elements.interactionPanel.classList.add("hidden");
    return;
  }

  elements.interactionPanel.classList.remove("hidden");

  if (scene.interaction.type === "cutscene") {
    const shell = document.createElement("section");
    const title = document.createElement("p");
    const body = document.createElement("p");

    shell.className = "interaction-shell cutscene-shell";
    title.className = "eyebrow";
    title.textContent = `Scene ${scene.interaction.current} of ${scene.interaction.total}`;
    body.className = "interaction-copy";
    body.textContent = "Boss preludes are short on purpose: enough setup to sell the encounter, not enough to stall the fight.";
    shell.append(title, body);
    elements.interactionPanel.append(shell);
    return;
  }

  if (scene.interaction.type === "puzzle") {
    const puzzle = PUZZLES[scene.interaction.puzzleId];
    const progress = getPuzzleProgress(scene.interaction.puzzleId);
    const shell = document.createElement("section");
    const title = document.createElement("p");
    const body = document.createElement("p");
    const stress = document.createElement("div");
    const board = document.createElement("div");
    const clue = document.createElement("div");

    shell.className = "interaction-shell puzzle-shell";
    title.className = "eyebrow";
    title.textContent = `Stress ${progress.touches} / ${puzzle.overloadLimit}`;
    body.className = "interaction-copy";
    body.textContent = puzzle.hint;
    stress.className = "puzzle-stress";
    stress.textContent = `Backlashes taken: ${progress.strikes}`;
    board.className = "puzzle-board";
    clue.className = "clue-box";
    clue.textContent = progress.lastMessage || puzzle.hint;

    puzzle.hotspots.forEach((hotspot) => {
      const step = document.createElement("div");
      const currentLabel = getPuzzleStateLabel(scene.interaction.puzzleId, hotspot.id);
      const targetLabel = hotspot.states[hotspot.target] || hotspot.states[0];
      const isDone = currentLabel === targetLabel;

      step.className = `puzzle-step${isDone ? " done" : ""}`;
      step.innerHTML = `
        <span>${hotspot.short}</span>
        <strong>${currentLabel}</strong>
        <small>Target: ${targetLabel}</small>
      `;
      board.append(step);
    });

    shell.append(title, body, stress, board, clue);

    if (progress.touches) {
      const resetButton = document.createElement("button");
      resetButton.type = "button";
      resetButton.className = "menu-action panel-action";
      resetButton.dataset.panelAction = "reset-puzzle";
      resetButton.textContent = "Reset Mechanism";
      shell.append(resetButton);
    }

    elements.interactionPanel.append(shell);
  }
}

function renderChoices(actions) {
  elements.choiceContainer.innerHTML = "";

  actions.forEach((action, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${action.primary || (!actions.some((item) => item.primary) && index === 0) ? " primary" : ""}`;
    button.textContent = action.label;
    button.disabled = Boolean(action.disabled);
    button.addEventListener("click", action.onChoose);
    elements.choiceContainer.append(button);
  });
}

function renderEncounterSummary() {
  if (state.mode !== "combat" || !state.currentEnemy) {
    elements.encounterSummary.classList.add("hidden");
    elements.encounterSummary.innerHTML = "";
    return;
  }

  const enemy = state.currentEnemy;
  const nextMove = getEnemyMove(enemy);
  const enemyHealth = Math.round((enemy.health / enemy.maxHealth) * 100);
  elements.encounterSummary.classList.remove("hidden");
  elements.encounterSummary.innerHTML = `
    <h3>${enemy.name}</h3>
    <p>${enemy.description}</p>
    <p class="detail-line">Enemy Guard ${enemy.defense} | Enemy Attack ${enemy.attackMin}-${enemy.attackMax}</p>
    ${nextMove ? `<p class="detail-line"><strong>Next Move:</strong> ${nextMove.name} (${nextMove.attackMin}-${nextMove.attackMax})${getIntentThreat(nextMove) ? ` | ${getIntentThreat(nextMove)}` : ""}</p><p class="detail-line">${nextMove.description}</p>` : ""}
    <div class="meter-meta">
      <span>Enemy Health</span>
      <span>${enemy.health} / ${enemy.maxHealth}</span>
    </div>
    <div class="meter">
      <span style="width: ${enemyHealth}%"></span>
    </div>
  `;
}

function renderStats(scene) {
  const healthPercent = Math.round((state.health / getMaxHealth()) * 100);
  const xpPercent = Math.round((state.xp / getXpToNext()) * 100);
  const readyTechniques = getReadyAbilityNames();
  const readyLine = readyTechniques.length ? readyTechniques.join(" + ") : "No techniques ready";
  const origin = getOriginDefinition();
  const pathId = getChosenPath();
  const pathLine = pathId ? SKILL_PATHS[pathId].name : "No route chosen";
  const puzzleProgress = state.activePuzzle ? getPuzzleProgress(state.activePuzzle.id) : null;

  if (state.mode === "combat") {
    const nextMove = getEnemyMove();
    elements.statusLine.textContent = nextMove
      ? `${readyTechniques.length}/${MAX_ACTIVE_ABILITIES} techniques ready. Incoming: ${nextMove.name}. ${pathLine.toLowerCase()} bonuses still apply.`
      : `${readyTechniques.length}/${MAX_ACTIVE_ABILITIES} techniques ready. ${origin.name} is live and ${pathLine.toLowerCase()} bonuses still apply.`;
  } else if (state.mode === "puzzle" && puzzleProgress) {
    elements.statusLine.textContent = `Puzzle stress ${puzzleProgress.touches}/${PUZZLES[state.activePuzzle.id].overloadLimit}. ${origin.name} keeps humming through the mechanism.`;
  } else if (state.mode === "cutscene" && state.cutscene) {
    elements.statusLine.textContent = `Boss prelude ${state.cutscene.index + 1}/${CUTSCENES[state.cutscene.key].slides.length}. Hold steady before the fight opens.`;
  } else {
    elements.statusLine.textContent = `Ready techniques: ${readyLine}. ${pathId ? `${pathLine} locked in.` : "Your first tree oath locks the other two paths."}${state.skillPoints ? ` ${state.skillPoints} skill point${state.skillPoints === 1 ? "" : "s"} waiting.` : ""}`;
  }

  elements.healthText.textContent = `${state.health} / ${getMaxHealth()}`;
  elements.healthFill.style.width = `${healthPercent}%`;
  elements.xpText.textContent = `${state.xp} / ${getXpToNext()}`;
  elements.xpFill.style.width = `${xpPercent}%`;
  elements.levelStat.textContent = state.level;
  elements.resolveStat.textContent = `${state.resolve} / ${getMaxResolve()}`;
  elements.attackStat.textContent = getAttack();
  elements.defenseStat.textContent = getDefense();
  elements.goldStat.textContent = state.gold;
  elements.potionStat.textContent = state.potions;
  elements.weaponText.textContent = state.weapon;
  elements.armorText.textContent = getEquippedArmorSummary();
  elements.originText.textContent = `${origin.name} · ${origin.rarity}`;
}

function createTag(text, tone = "") {
  const pill = document.createElement("span");
  pill.className = `tag-pill${tone ? ` ${tone}` : ""}`;
  pill.textContent = text;
  return pill;
}

function getBuffDescriptors(buffs = {}) {
  return Object.entries(buffs)
    .filter(([, value]) => value)
    .map(([stat, value]) => `${value > 0 ? "+" : ""}${value} ${STAT_LABELS[stat] || stat}`);
}

function getPassiveDescriptors(passives = {}) {
  return Object.entries(passives)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      if (key === "critChance") {
        return `+${Math.round(value * 100)}% Crit`;
      }

      const label = PASSIVE_LABELS[key] || key;
      return `${label}${typeof value === "number" ? ` ${value > 0 ? `+${value}` : value}` : ""}`;
    });
}

function createCardVisual(label, crest, tone) {
  const visual = document.createElement("div");
  const crestText = document.createElement("strong");
  const labelText = document.createElement("span");

  visual.className = `card-visual ${tone}`;
  crestText.textContent = crest;
  labelText.textContent = label;
  visual.append(crestText, labelText);
  return visual;
}

function renderArmorMenu() {
  elements.armorMenuContent.innerHTML = "";
  const overview = document.createElement("section");
  const overviewTitle = document.createElement("p");
  const overviewGrid = document.createElement("div");

  overview.className = "loadout-board";
  overviewTitle.className = "eyebrow";
  overviewTitle.textContent = "Field Loadout";
  overviewGrid.className = "loadout-grid";

  ARMOR_SLOT_ORDER.forEach((slot) => {
    const tile = document.createElement("div");
    const equippedId = state.equippedArmor[slot];
    const armor = equippedId ? ARMOR_PIECES[equippedId] : null;
    const slotName = document.createElement("span");
    const armorName = document.createElement("strong");
    const summary = document.createElement("small");

    tile.className = `loadout-slot ${slot}`;
    slotName.textContent = ARMOR_SLOT_LABELS[slot];
    armorName.textContent = armor ? armor.name : "Empty";
    summary.textContent = armor ? armor.summary : "No bonuses in this slot.";
    tile.append(createCardVisual(ARMOR_SLOT_LABELS[slot], ARMOR_SLOT_LABELS[slot].slice(0, 1), slot), slotName, armorName, summary);
    overviewGrid.append(tile);
  });

  overview.append(overviewTitle, overviewGrid);
  elements.armorMenuContent.append(overview);

  ARMOR_SLOT_ORDER.forEach((slot) => {
    const section = document.createElement("section");
    const title = document.createElement("p");
    const copy = document.createElement("p");
    const list = document.createElement("div");
    const equippedId = state.equippedArmor[slot];
    const ownedChoices = state.armorInventory.filter((armorId) => ARMOR_PIECES[armorId].slot === slot);
    const options = slot === "body" ? ownedChoices : [null, ...ownedChoices];

    section.className = "armor-slot-section";
    title.className = "eyebrow";
    title.textContent = ARMOR_SLOT_LABELS[slot];
    copy.className = "slot-copy";
    copy.textContent = equippedId
      ? `Equipped: ${ARMOR_PIECES[equippedId].name}`
      : "Equipped: nothing in this slot.";
    list.className = "armor-choice-list";

    options.forEach((armorId) => {
      const card = document.createElement("div");
      const header = document.createElement("div");
      const cardFrame = document.createElement("div");
      const textWrap = document.createElement("div");
      const name = document.createElement("strong");
      const summary = document.createElement("small");
      const body = document.createElement("p");
      const tags = document.createElement("div");
      const action = document.createElement("button");
      const equipped = equippedId === armorId;
      const armor = armorId ? ARMOR_PIECES[armorId] : null;
      const description = armor
        ? `${armor.summary} ${armor.description}`
        : `Leave the ${ARMOR_SLOT_LABELS[slot].toLowerCase()} slot open and gain no extra buffs here.`;

      card.className = `armor-choice-card${equipped ? " equipped" : ""}`;
      header.className = "armor-choice-top";
      cardFrame.className = "card-frame";
      tags.className = "armor-tags";
      action.className = "menu-action";
      action.type = "button";
      action.disabled = equipped;
      action.textContent = equipped ? "Equipped" : armor ? "Equip" : "Unequip";

      name.textContent = armor ? armor.name : `No ${ARMOR_SLOT_LABELS[slot].toLowerCase()} piece`;
      summary.textContent = armor ? armor.summary : "No bonuses";
      body.textContent = description;

      if (!equipped) {
        action.addEventListener("click", () => {
          equipArmor(slot, armorId);
        });
      }

      const statDescriptors = armor ? getBuffDescriptors(armor.buffs) : [];
      const passiveDescriptors = armor ? getPassiveDescriptors(armor.passives) : [];
      [...statDescriptors, ...passiveDescriptors].forEach((descriptor) => tags.append(createTag(descriptor, slot)));

      cardFrame.append(createCardVisual(ARMOR_SLOT_LABELS[slot], armor ? armor.name.slice(0, 2).toUpperCase() : "--", slot));
      textWrap.append(name, summary, body, tags);
      header.append(cardFrame, textWrap, action);
      card.append(header);
      list.append(card);
    });

    section.append(title, copy, list);
    elements.armorMenuContent.append(section);
  });
}

function renderAbilities() {
  elements.abilityList.innerHTML = "";
  const readyIds = getReadyAbilityIds();
  const origin = getOriginDefinition();
  const intro = document.createElement("section");
  const introTitle = document.createElement("p");
  const introBody = document.createElement("p");

  intro.className = "menu-banner";
  introTitle.className = "eyebrow";
  introTitle.textContent = `Ready Techniques ${readyIds.length} / ${MAX_ACTIVE_ABILITIES}`;
  introBody.className = "menu-note";
  introBody.textContent = `${origin.name} (${origin.rarity}): ${origin.summary} ${origin.bonusText}`;
  intro.append(createCardVisual("Origin", origin.name.slice(0, 2).toUpperCase(), "origin"), introTitle, introBody);
  elements.abilityList.append(intro);

  ABILITY_ORDER.filter((abilityId) => state.abilities.includes(abilityId)).forEach((abilityId) => {
    const ability = ABILITIES[abilityId];
    const card = document.createElement("div");
    const top = document.createElement("div");
    const frame = document.createElement("div");
    const textWrap = document.createElement("div");
    const title = document.createElement("strong");
    const cost = document.createElement("small");
    const body = document.createElement("p");
    const tags = document.createElement("div");
    const action = document.createElement("button");
    const isReady = readyIds.includes(abilityId);
    const canUnequip = readyIds.length > 1;
    const hasOpenSlot = readyIds.length < MAX_ACTIVE_ABILITIES;
    const statusTag = document.createElement("span");
    const costTag = document.createElement("span");

    card.className = `ability-card${isReady ? " equipped" : ""}`;
    top.className = "ability-card-top";
    frame.className = "card-frame";
    tags.className = "ability-tags";
    action.className = "menu-action";
    action.type = "button";
    title.textContent = ability.name;
    cost.textContent = `${ability.cost} Resolve`;
    body.textContent = getAbilityDescription(abilityId);
    statusTag.className = "tag-pill";
    statusTag.textContent = isReady ? "Ready in combat" : "Reserve";
    costTag.className = "tag-pill";
    costTag.textContent = `${ability.cost} Resolve`;

    if (isReady) {
      action.textContent = canUnequip ? "Unequip" : "Keep Ready";
      action.disabled = !canUnequip;
    } else {
      action.textContent = hasOpenSlot ? "Equip" : "Slots Full";
      action.disabled = !hasOpenSlot;
    }

    if (!action.disabled) {
      action.addEventListener("click", () => {
        toggleAbilityReadyState(abilityId);
      });
    }

    tags.append(statusTag, costTag);
    frame.append(createCardVisual("Art", ability.name.slice(0, 2).toUpperCase(), isReady ? "ready" : "reserve"));
    textWrap.append(title, cost, body, tags);
    top.append(frame, textWrap, action);
    card.append(top);
    elements.abilityList.append(card);
  });
}

function renderInventory() {
  elements.inventoryList.innerHTML = "";

  if (!state.inventory.length) {
    const note = document.createElement("span");
    note.className = "empty-note";
    note.textContent = "No relics yet.";
    elements.inventoryList.append(note);
    return;
  }

  state.inventory.forEach((itemId) => {
    const item = ITEMS[itemId];
    const card = document.createElement("div");
    const frame = document.createElement("div");
    const title = document.createElement("strong");
    const type = document.createElement("small");
    const body = document.createElement("p");
    const tags = document.createElement("div");

    card.className = "inventory-card";
    frame.className = "card-frame";
    tags.className = "inventory-tags";
    title.textContent = item.name;
    type.textContent = item.kind;
    body.textContent = `${item.summary}. ${item.description}`;
    frame.append(createCardVisual(item.kind, item.kind.slice(0, 2).toUpperCase(), "loot"));
    getBuffDescriptors(item.buffs).forEach((descriptor) => tags.append(createTag(descriptor, "loot")));
    if (item.abilityUnlock) {
      tags.append(createTag(`Unlocks ${ABILITIES[item.abilityUnlock].name}`, "loot"));
    }

    card.append(frame, title, type, body, tags);
    elements.inventoryList.append(card);
  });
}

function renderSkillTree() {
  elements.skillTreeContent.innerHTML = "";
  const chosenPath = getChosenPath();
  const pointLine = document.createElement("p");

  pointLine.className = "tree-points";
  pointLine.textContent = chosenPath
    ? `Skill points available: ${state.skillPoints}. Specialization locked: ${SKILL_PATHS[chosenPath].name}.`
    : `Skill points available: ${state.skillPoints}. Your first oath locks the other two paths.`;
  elements.skillTreeContent.append(pointLine);

  Object.entries(SKILL_PATHS).forEach(([pathId, path]) => {
    const section = document.createElement("section");
    const header = document.createElement("div");
    const title = document.createElement("p");
    const copy = document.createElement("p");
    const list = document.createElement("div");
    const badge = document.createElement("span");
    const stateClass = chosenPath === pathId ? "active" : chosenPath ? "locked" : "open";

    section.className = `tree-tier path-section ${stateClass}`;
    header.className = "tree-tier-header";
    title.className = "eyebrow";
    title.textContent = path.name;
    copy.className = "slot-copy";
    copy.textContent = path.summary;
    list.className = "tree-node-list";
    badge.className = "tag-pill";
    badge.textContent = chosenPath === pathId ? "Chosen" : chosenPath ? "Locked" : "Open";

    Object.entries(SKILL_TREE)
      .filter(([, node]) => node.branch === pathId)
      .sort(([, left], [, right]) => left.order - right.order)
      .forEach(([nodeId, node]) => {
        const card = document.createElement("div");
        const top = document.createElement("div");
        const textWrap = document.createElement("div");
        const name = document.createElement("strong");
        const cost = document.createElement("small");
        const body = document.createElement("p");
        const tags = document.createElement("div");
        const action = document.createElement("button");
        const status = getTreeNodeStatus(nodeId);
        const unlocked = status.unlocked;

        card.className = `tree-node ${unlocked ? "unlocked" : status.pathLocked ? "path-locked" : "locked"}`;
        top.className = "tree-node-top";
        tags.className = "tree-tags";
        action.className = "menu-action";
        action.type = "button";
        action.disabled = !status.canUnlock;
        action.textContent = unlocked ? "Unlocked" : status.canUnlock ? `Unlock (${node.cost})` : status.reason || "Locked";

        if (status.canUnlock) {
          action.addEventListener("click", () => {
            unlockTreeNode(nodeId);
          });
        }

        name.textContent = node.name;
        cost.textContent = node.summary;
        body.textContent = node.description;

        if (node.isPathRoot) {
          const rootTag = document.createElement("span");
          rootTag.className = "tag-pill";
          rootTag.textContent = "Path Root";
          tags.append(rootTag);
        }

        if (node.requires.length) {
          const prereqTag = document.createElement("span");
          prereqTag.className = "tag-pill";
          prereqTag.textContent = `Needs: ${node.requires.map((requiredId) => SKILL_TREE[requiredId].name).join(", ")}`;
          tags.append(prereqTag);
        }

        textWrap.append(name, cost, body, tags);
        top.append(textWrap, action);
        card.append(top);
        list.append(card);
      });

    header.append(title, badge);
    section.append(header, copy, list);
    elements.skillTreeContent.append(section);
  });
}

function renderTravelerMenu() {
  elements.armorMenu.classList.toggle("hidden", !uiState.menuOpen);
  elements.armorMenu.setAttribute("aria-hidden", String(!uiState.menuOpen));

  const sections = {
    armor: elements.armorMenuContent,
    abilities: elements.abilityList,
    loot: elements.inventoryList,
    tree: elements.skillTreeContent,
    journal: elements.logList,
  };

  elements.menuTabs.querySelectorAll(".menu-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === uiState.activeMenuTab);
  });

  Object.entries(sections).forEach(([tab, node]) => {
    node.classList.toggle("hidden", tab !== uiState.activeMenuTab);
  });
}

function getEquippedArmorSummary() {
  const equippedNames = getEquippedArmorIds().map((armorId) => ARMOR_PIECES[armorId].name);
  return equippedNames.length ? equippedNames.join(" / ") : "No armor equipped";
}

function applyAreaTheme(scene) {
  const themeKey = AREA_THEME_BY_VISUAL[scene.visual] || "hollow";
  const theme = MENU_THEME_COPY[themeKey] || MENU_THEME_COPY.hollow;

  document.body.dataset.theme = themeKey;
  elements.armorMenu.dataset.theme = themeKey;
  elements.menuTitle.textContent = theme.title;
  elements.menuCopy.textContent = theme.copy;
}

function renderLog() {
  elements.logList.innerHTML = "";

  state.log.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    elements.logList.append(item);
  });
}

function renderToasts() {
  elements.toastStack.innerHTML = "";

  uiState.toasts.forEach((toast) => {
    const card = document.createElement("div");
    const title = document.createElement("strong");
    const body = document.createElement("p");

    card.className = "toast";
    card.dataset.tone = toast.tone;
    card.setAttribute("role", "status");
    title.textContent = toast.title;
    body.textContent = toast.body;
    card.append(title, body);
    elements.toastStack.append(card);
  });
}

function sceneArt(key) {
  const library = {
    village: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="villageSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#24334C"/>
            <stop offset="1" stop-color="#100D17"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#villageSky)"/>
        <circle class="pulse" cx="236" cy="54" r="26" fill="#DDE7FF" fill-opacity=".85"/>
        <path d="M0 168C61 150 96 140 150 148C214 158 250 126 320 140V220H0V168Z" fill="#16111F"/>
        <path d="M0 188C76 174 123 170 166 177C220 186 262 168 320 176V220H0V188Z" fill="#231928"/>
        <path d="M47 176H76V127L61 116L47 127V176Z" fill="#302038"/>
        <path d="M92 176H132V145L112 129L92 145V176Z" fill="#37243D"/>
        <path d="M148 176H176V109L162 95L148 109V176Z" fill="#432944"/>
        <path d="M151 95H173L162 62L151 95Z" fill="#58435C"/>
        <rect x="58" y="136" width="7" height="12" fill="#F5C86F"/>
        <rect x="106" y="151" width="7" height="10" fill="#F5C86F"/>
        <rect x="158" y="119" width="8" height="14" fill="#F5C86F"/>
        <circle class="float" cx="224" cy="142" r="9" fill="#F8D78E" fill-opacity=".8"/>
        <path d="M224 133L229 153H219L224 133Z" fill="#F9E4A3"/>
      </svg>`,
    forest: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="forestSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#22363F"/>
            <stop offset="1" stop-color="#0B0E13"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#forestSky)"/>
        <circle cx="238" cy="45" r="24" fill="#D6E4E9" fill-opacity=".72"/>
        <path d="M0 220V154L58 112L88 220H0Z" fill="#0F1719"/>
        <path d="M50 220V104L97 68L146 220H50Z" fill="#142122"/>
        <path d="M116 220V118L166 74L214 220H116Z" fill="#102022"/>
        <path d="M183 220V100L240 54L293 220H183Z" fill="#0E181D"/>
        <path d="M243 220V128L291 88L320 220H243Z" fill="#101215"/>
        <path d="M76 176C112 164 148 156 189 159C214 160 239 167 269 179" stroke="#C7D5D4" stroke-opacity=".32" stroke-width="4" stroke-linecap="round"/>
        <path d="M64 182L123 170L114 161L78 164L64 182Z" fill="#483433"/>
        <circle class="shimmer" cx="236" cy="148" r="4" fill="#E8616A"/>
        <circle class="shimmer" cx="250" cy="148" r="4" fill="#E8616A"/>
      </svg>`,
    shrine: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shrineSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#293853"/>
            <stop offset="1" stop-color="#120E18"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#shrineSky)"/>
        <circle class="pulse" cx="162" cy="48" r="28" fill="#E4EEFF" fill-opacity=".76"/>
        <path d="M0 220V172C39 160 82 154 118 164C146 171 185 181 229 176C262 172 291 160 320 151V220H0Z" fill="#13101C"/>
        <path d="M93 171H229L215 112H108L93 171Z" fill="#35273B"/>
        <path d="M121 112H201V92L188 83H134L121 92V112Z" fill="#4C3452"/>
        <ellipse cx="162" cy="176" rx="66" ry="18" fill="#87D9D4" fill-opacity=".22"/>
        <ellipse class="pulse" cx="162" cy="176" rx="44" ry="10" fill="#8EE7DE" fill-opacity=".35"/>
        <rect x="152" y="101" width="20" height="22" rx="6" fill="#F6D782"/>
      </svg>`,
    bridge: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bridgeSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#334766"/>
            <stop offset="1" stop-color="#0E0F17"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#bridgeSky)"/>
        <circle cx="248" cy="42" r="24" fill="#E2EDFF" fill-opacity=".78"/>
        <path d="M0 109C52 118 83 123 133 119C171 115 193 100 230 98C269 95 290 104 320 118V220H0V109Z" fill="#10121A"/>
        <path d="M112 92L0 136" stroke="#695A70" stroke-width="4"/>
        <path d="M208 92L320 136" stroke="#695A70" stroke-width="4"/>
        <path d="M112 92C142 108 176 108 208 92" stroke="#927D98" stroke-width="4" stroke-linecap="round"/>
        <path d="M121 98H199" stroke="#B59E80" stroke-width="4" stroke-linecap="round"/>
        <path d="M130 104H190" stroke="#B59E80" stroke-width="4" stroke-linecap="round"/>
        <path d="M139 110H181" stroke="#B59E80" stroke-width="4" stroke-linecap="round"/>
        <ellipse class="shimmer" cx="160" cy="170" rx="74" ry="28" fill="#D0E2F3" fill-opacity=".18"/>
        <path class="float" d="M158 148C171 145 178 152 182 160C185 166 178 172 169 171C160 170 151 164 149 157C147 151 149 150 158 148Z" fill="#DDE9F8" fill-opacity=".45"/>
      </svg>`,
    camp: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="campSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#30415A"/>
            <stop offset="1" stop-color="#0C0D13"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#campSky)"/>
        <circle cx="248" cy="38" r="24" fill="#E7F0FF" fill-opacity=".78"/>
        <path d="M0 220V168L74 138L157 150L238 132L320 147V220H0Z" fill="#14111C"/>
        <path d="M63 176H120L98 134L63 176Z" fill="#3B2A3D"/>
        <path d="M111 178H168L141 142L111 178Z" fill="#4B3348"/>
        <path d="M214 182H270L244 146L214 182Z" fill="#372735"/>
        <ellipse class="pulse" cx="183" cy="179" rx="22" ry="8" fill="#88E7E4" fill-opacity=".55"/>
        <path d="M183 152L191 179H175L183 152Z" fill="#A8FFF5"/>
        <circle class="float" cx="41" cy="165" r="9" fill="#D7E3FF" fill-opacity=".28"/>
      </svg>`,
    garden: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gardenSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#2C4966"/>
            <stop offset="1" stop-color="#0B0D14"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#gardenSky)"/>
        <circle class="pulse" cx="242" cy="40" r="24" fill="#ECF7FF" fill-opacity=".78"/>
        <path d="M0 220V170L61 157L118 140L177 151L239 127L320 146V220H0Z" fill="#110F18"/>
        <path d="M42 177C56 155 69 146 80 146C91 146 98 155 105 178" stroke="#8DDCD3" stroke-width="3" stroke-linecap="round"/>
        <path d="M99 173C113 145 126 131 139 131C152 131 161 145 168 174" stroke="#BFE7FF" stroke-width="3" stroke-linecap="round"/>
        <path d="M165 177C180 150 193 139 206 139C219 139 229 151 236 177" stroke="#D9B8FF" stroke-width="3" stroke-linecap="round"/>
        <ellipse class="shimmer" cx="80" cy="150" rx="10" ry="16" fill="#CFFAFF" fill-opacity=".28"/>
        <ellipse class="shimmer" cx="139" cy="136" rx="11" ry="18" fill="#FFE9B5" fill-opacity=".26"/>
        <ellipse class="shimmer" cx="207" cy="144" rx="12" ry="19" fill="#DCCFFF" fill-opacity=".28"/>
      </svg>`,
    archive: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="archiveSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#283342"/>
            <stop offset="1" stop-color="#0C0D11"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#archiveSky)"/>
        <rect x="36" y="58" width="44" height="120" fill="#2C2333"/>
        <rect x="86" y="46" width="48" height="132" fill="#35283C"/>
        <rect x="140" y="68" width="38" height="110" fill="#2D2134"/>
        <rect x="184" y="42" width="44" height="136" fill="#382A3F"/>
        <rect x="234" y="61" width="50" height="117" fill="#2A2131"/>
        <path d="M26 193H296" stroke="#5A5165" stroke-width="5" stroke-linecap="round"/>
        <path d="M160 30L160 193" stroke="#6C7A92" stroke-width="4" stroke-dasharray="8 8"/>
        <circle class="pulse" cx="160" cy="82" r="9" fill="#F1D98D" fill-opacity=".78"/>
      </svg>`,
    observatory: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="obsSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#28375A"/>
            <stop offset="1" stop-color="#0A0B10"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#obsSky)"/>
        <circle cx="230" cy="45" r="25" fill="#E5EEFD" fill-opacity=".82"/>
        <path d="M0 220V174L108 144L193 122L320 150V220H0Z" fill="#121018"/>
        <path d="M138 144H232V89C232 63 211 42 185 42C159 42 138 63 138 89V144Z" fill="#36263B"/>
        <path d="M151 96H219V84C219 64 204 49 185 49C166 49 151 64 151 84V96Z" fill="#4E3555"/>
        <path d="M170 46L212 85" stroke="#7D6783" stroke-width="7" stroke-linecap="round"/>
        <rect x="180" y="108" width="12" height="28" rx="5" fill="#F3C66B"/>
        <ellipse class="pulse" cx="186" cy="110" rx="26" ry="14" fill="#F8D983" fill-opacity=".26"/>
      </svg>`,
    spire: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="spireSky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#2F3A60"/>
            <stop offset="1" stop-color="#0B0C12"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#spireSky)"/>
        <ellipse class="pulse" cx="160" cy="185" rx="56" ry="20" fill="#FFD58A" fill-opacity=".18"/>
        <path d="M160 35L110 90L130 182H190L210 90L160 35Z" fill="#302538"/>
        <path d="M160 56L132 94H188L160 56Z" fill="#58445C"/>
        <path d="M83 58L120 108" stroke="#9EB7D7" stroke-width="4"/>
        <path d="M237 58L200 108" stroke="#9EB7D7" stroke-width="4"/>
        <path d="M60 110L122 126" stroke="#9EB7D7" stroke-width="4"/>
        <path d="M260 110L198 126" stroke="#9EB7D7" stroke-width="4"/>
        <circle class="shimmer" cx="160" cy="117" r="18" fill="#F6C86E" fill-opacity=".64"/>
      </svg>`,
    wolf: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="220" fill="#130F16"/>
        <path d="M0 162C59 141 104 132 162 138C228 144 265 134 320 120V220H0V162Z" fill="#201624"/>
        <path d="M76 166L118 134L151 127L190 136L228 127L245 148L229 170L183 184L128 183L92 177L76 166Z" fill="#3A2534"/>
        <path d="M104 135L118 106L136 130" fill="#3A2534"/>
        <path d="M185 136L200 104L218 132" fill="#3A2534"/>
        <circle class="shimmer" cx="142" cy="146" r="5" fill="#FF7A7A"/>
        <circle class="shimmer" cx="189" cy="146" r="5" fill="#FF7A7A"/>
        <path d="M142 166H188L170 180L142 166Z" fill="#F0D2B8"/>
      </svg>`,
    spider: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="220" fill="#100D16"/>
        <ellipse cx="160" cy="110" rx="54" ry="40" fill="#2D2436"/>
        <ellipse cx="160" cy="98" rx="33" ry="28" fill="#3C3148"/>
        <path d="M107 115L56 92" stroke="#5A4B6A" stroke-width="6" stroke-linecap="round"/>
        <path d="M108 127L47 132" stroke="#5A4B6A" stroke-width="6" stroke-linecap="round"/>
        <path d="M112 139L62 174" stroke="#5A4B6A" stroke-width="6" stroke-linecap="round"/>
        <path d="M213 115L264 92" stroke="#5A4B6A" stroke-width="6" stroke-linecap="round"/>
        <path d="M212 127L273 132" stroke="#5A4B6A" stroke-width="6" stroke-linecap="round"/>
        <path d="M208 139L258 174" stroke="#5A4B6A" stroke-width="6" stroke-linecap="round"/>
        <circle class="pulse" cx="145" cy="96" r="5" fill="#9FECE3"/>
        <circle class="pulse" cx="175" cy="96" r="5" fill="#9FECE3"/>
        <ellipse class="pulse" cx="160" cy="182" rx="96" ry="20" fill="#8ADFD3" fill-opacity=".1"/>
      </svg>`,
    drudge: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="220" fill="#0E1017"/>
        <ellipse class="pulse" cx="160" cy="176" rx="98" ry="26" fill="#D4E7F5" fill-opacity=".16"/>
        <path d="M161 52C125 52 101 82 101 114C101 156 129 176 161 176C193 176 221 156 221 114C221 82 197 52 161 52Z" fill="#CFDDF0" fill-opacity=".25"/>
        <path d="M133 117C154 105 178 105 189 118C198 128 194 151 179 160C164 169 141 167 126 154C112 142 115 126 133 117Z" fill="#EDF4FF" fill-opacity=".42"/>
        <path d="M210 110L255 82" stroke="#E5EDF9" stroke-opacity=".5" stroke-width="8" stroke-linecap="round"/>
        <path d="M255 82L268 94" stroke="#E5EDF9" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>
      </svg>`,
    stag: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="220" fill="#10131A"/>
        <path d="M74 157L118 127L174 122L224 138L249 170L203 182L126 180L74 157Z" fill="#253242"/>
        <path d="M200 124L218 84L242 116" stroke="#C1E9FF" stroke-width="6" stroke-linecap="round"/>
        <path d="M185 124L172 77L149 113" stroke="#D4C0FF" stroke-width="6" stroke-linecap="round"/>
        <path d="M149 113L120 84" stroke="#F1D88A" stroke-width="5" stroke-linecap="round"/>
        <circle class="shimmer" cx="189" cy="145" r="5" fill="#8DE3FF"/>
        <circle class="pulse" cx="225" cy="58" r="28" fill="#E9F3FF" fill-opacity=".18"/>
        <ellipse class="pulse" cx="160" cy="188" rx="80" ry="15" fill="#9BE8EA" fill-opacity=".12"/>
      </svg>`,
    knight: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="220" fill="#100E14"/>
        <path d="M126 184L116 104L160 72L204 104L194 184H126Z" fill="#30273A"/>
        <path d="M143 112L160 98L177 112L173 163H147L143 112Z" fill="#4B4056"/>
        <path d="M160 72L176 46H144L160 72Z" fill="#67586F"/>
        <path d="M204 117L252 89" stroke="#DCDCE8" stroke-opacity=".5" stroke-width="8" stroke-linecap="round"/>
        <path d="M248 89L266 101" stroke="#DCDCE8" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>
        <circle class="pulse" cx="149" cy="110" r="4" fill="#F1D791"/>
        <circle class="pulse" cx="171" cy="110" r="4" fill="#F1D791"/>
      </svg>`,
    warden: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="220" fill="#150D12"/>
        <ellipse class="pulse" cx="160" cy="194" rx="90" ry="20" fill="#FFB278" fill-opacity=".14"/>
        <path d="M128 176L118 103L160 68L202 103L192 176H128Z" fill="#3A2429"/>
        <path d="M142 110L160 96L178 110L174 160H146L142 110Z" fill="#5E3437"/>
        <path d="M160 69L176 46H144L160 69Z" fill="#7A4745"/>
        <path class="shimmer" d="M160 82C172 97 183 110 183 128C183 149 173 168 160 176C147 168 137 149 137 128C137 110 148 97 160 82Z" fill="#F7B15E" fill-opacity=".68"/>
        <rect x="155" y="110" width="10" height="52" rx="5" fill="#FCE1A2"/>
      </svg>`,
    bloom: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="220" fill="#120D14"/>
        <ellipse class="pulse" cx="160" cy="186" rx="94" ry="18" fill="#FFD28C" fill-opacity=".08"/>
        <path d="M160 188C160 160 153 136 140 112C126 87 108 72 84 60C99 104 103 130 102 144C101 159 96 172 84 184C112 175 137 176 160 188Z" fill="#2C1A22"/>
        <path d="M160 188C160 160 167 136 180 112C194 87 212 72 236 60C221 104 217 130 218 144C219 159 224 172 236 184C208 175 183 176 160 188Z" fill="#2C1A22"/>
        <path d="M160 188C176 160 185 138 188 122C192 101 188 80 175 58C164 82 160 101 160 118C160 135 160 158 160 188Z" fill="#3D232C"/>
        <circle class="shimmer" cx="160" cy="118" r="22" fill="#F4B360" fill-opacity=".55"/>
        <circle class="pulse" cx="160" cy="118" r="10" fill="#FFE9B2" fill-opacity=".75"/>
      </svg>`,
    victory: `
      <svg class="scene-svg" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="victorySky" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
            <stop stop-color="#2C385C"/>
            <stop offset="1" stop-color="#0F111A"/>
          </linearGradient>
        </defs>
        <rect width="320" height="220" fill="url(#victorySky)"/>
        <circle class="pulse" cx="160" cy="72" r="40" fill="#FFF1AF" fill-opacity=".82"/>
        <path d="M0 220V175C51 157 101 153 145 160C200 169 257 165 320 144V220H0Z" fill="#111019"/>
        <path d="M144 182H177L185 116L160 90L136 116L144 182Z" fill="#F2D387"/>
        <ellipse class="pulse" cx="160" cy="118" rx="42" ry="28" fill="#FFF6CD" fill-opacity=".4"/>
        <path d="M160 28V8" stroke="#FFF6CD" stroke-width="4" stroke-linecap="round"/>
        <path d="M234 76H254" stroke="#FFF6CD" stroke-width="4" stroke-linecap="round"/>
        <path d="M66 76H86" stroke="#FFF6CD" stroke-width="4" stroke-linecap="round"/>
      </svg>`,
  };

  return library[key] || library.village;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
