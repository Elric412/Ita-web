import { ChapterData } from './types';

export interface ChapterDataWithKanji extends ChapterData {
  kanji: string;
  kanjiTranslation: string;
}

export const QUOTES = [
  "People live their lives bound by what they accept as correct and true.",
  "That is how they define 'reality'.",
  "But what does it mean to be 'correct' or 'true'?",
  "Merely vague concepts...",
  "Their 'reality' may all be a mirage.",
  "Knowledge and awareness are equivocal.",
  "One's reality might be another's illusion.",
  "We humans are entirely shaped by our upbringing and our past.",
  "Growth occurs when one goes beyond one's limits.",
  "Realizing what you aren't is in itself a realization.",
  "It is not wise to judge others based on your own preconceptions and by their appearances.",
  "You are weak. Why are you weak? Because you lack... hatred.",
  "Even the strongest of opponents always has a weakness."
];

export const CHAPTERS: ChapterDataWithKanji[] = [
  {
    id: 'prodigy',
    number: 'I',
    title: 'THE PRODIGY',
    subtitle: 'Heir to the Uchiha',
    kanji: '天才',
    kanjiTranslation: 'Tensai',
    description: 'Born into war, he witnessed the hell of the battlefield at age 4. By age 7, he graduated the Academy at the top of his class. By 8, he mastered the Sharingan. A genius whose wisdom surpassed the Hokage.',
    quote: "I am always going to be there for you, even if it is only as an obstacle for you to overcome.",
    colorTheme: 'grey',
    stats: [
      { label: 'Academy Grad', value: 'Age 7' },
      { label: 'Sharingan', value: 'Age 8' },
      { label: 'Chunin', value: 'Age 10' },
      { label: 'ANBU Captain', value: 'Age 13' }
    ]
  },
  {
    id: 'massacre',
    number: 'II',
    title: 'THE MASSACRE',
    subtitle: 'The Night of Tragedy',
    kanji: '虐殺',
    kanjiTranslation: 'Gyakusatsu',
    description: 'To prevent a coup that would shatter the village and ignite a world war, he made the ultimate sacrifice. He slaughtered his clan, his parents, and his lover—sparing only his younger brother.',
    quote: "Foolish little brother... if you wish to kill me, hate me, detest me. And survive in an unsightly way.",
    colorTheme: 'red',
  },
  {
    id: 'akatsuki',
    number: 'III',
    title: 'THE AKATSUKI',
    subtitle: 'Shadow in the Clouds',
    kanji: '暁',
    kanjiTranslation: 'Akatsuki',
    description: 'Marked as a rogue ninja, he joined the organization that threatened the world. Yet, his true purpose remained hidden—protecting the Leaf Village from within the darkness.',
    quote: "We do not know what kind of people we truly are until the moment before our deaths.",
    colorTheme: 'purple',
  },
  {
    id: 'techniques',
    number: 'IV',
    title: 'THE TECHNIQUES',
    subtitle: 'Master of Genjutsu',
    kanji: '術',
    kanjiTranslation: 'Jutsu',
    description: 'Tsukuyomi to break the mind. Amaterasu to burn everything in sight. Susanoo to deflect all attacks. His visual prowess was unmatched in history.',
    quote: "All of this is part of my reality.",
    colorTheme: 'red',
  },
  {
    id: 'battle',
    number: 'V',
    title: 'THE FINAL BATTLE',
    subtitle: 'Brothers United in Blood',
    kanji: '決戦',
    kanjiTranslation: 'Kessen',
    description: 'The fated confrontation. He pushed Sasuke to his limits, freed him from Orochimaru’s curse, and sealed his legacy with a final poke to the forehead.',
    quote: "Forgive me, Sasuke. There won't be a next time.",
    colorTheme: 'grey',
  },
  {
    id: 'legacy',
    number: 'VI',
    title: 'THE LEGACY',
    subtitle: 'The Shadow Hokage',
    kanji: '遺産',
    kanjiTranslation: 'Isan',
    description: 'A true shinobi who sacrificed his name, his honor, and his life for the sake of peace. The unsung hero who saved the world from the shadows.',
    quote: "Self-sacrifice... A nameless shinobi who protects peace within its shadow. That is a true shinobi.",
    colorTheme: 'grey',
  }
];

export const NAV_ITEMS = [
  { id: 'hero', label: 'ORIGIN' },
  { id: 'prodigy', label: 'I' },
  { id: 'massacre', label: 'II' },
  { id: 'akatsuki', label: 'III' },
  { id: 'techniques', label: 'IV' },
  { id: 'battle', label: 'V' },
  { id: 'legacy', label: 'VI' },
];