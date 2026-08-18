// src/components/guides/index.js
import GemsGuide from './GemsGuide';
import { lazy } from 'react'; // ◄ ITT A HIÁNYZÓ IMPORT!
const MaximizeLightGuide = lazy(() => import('./MaximizeLightGuide'));

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
    subtitle: 'Tiny Quest Update Guide',
    description: 'Master Ally leveling, expedition strategies, voucher farming, and more.',
    bannerImg: '/guideimages/maxresdefault.webp',
    component: lazy(() => import('./TinyQuestGuide')),
  },
  maximizelight: {
    id: 'maximizelight',
    title: 'Maximize Your Light',
    subtitle: 'MAX LIGHT CAP',
    description: 'Discover the step-by-step path to reaching the highest Light cap in the game.',
    component: MaximizeLightGuide,
  },
};