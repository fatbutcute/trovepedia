// src/components/guides/index.js
import GemsGuide from './GemsGuide';
import { lazy } from 'react'; // ◄ ITT A HIÁNYZÓ IMPORT!

export const GUIDES_DATA = {
  'gems': {
    id: 'gems',
    title: 'Gems',
    subtitle: 'Maximize Gem Stats',
    description: 'Learn the proper way to maximize your stats on your gems.',
    component: GemsGuide,
  },
  'tiny-quest': {
    id: 'tiny-quest',
    title: 'Tiny Quest & Ally Mastery',
    subtitle: 'Update Guide',
    description: 'Master Ally leveling up to Lvl 30, Expedition strategies, Voucher farming, and optimal routes.',
    bannerImg: '/guideimages/maxresdefault.webp',
    component: lazy(() => import('./TinyQuestGuide')),
  },
};