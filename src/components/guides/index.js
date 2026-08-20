// src/components/guides/index.js
import GemsGuide from './GemsGuide';
import { lazy } from 'react';

const MaximizeLightGuide = lazy(() => import('./MaximizeLightGuide'));
const SkillChartGuide = lazy(() => import('./SkillChartGuide'));
const MysticGearGuide = lazy(() => import('./MysticGearGuide'));
const TowersShipsGuide = lazy(() => import('./TowersShipsGuide')); // 👈 ÚJ IMPORT

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
  'maximizelight': {
    id: 'maximizelight',
    title: 'Maximize Your Light',
    subtitle: 'MAX LIGHT CAP',
    description: 'Discover the step-by-step path to reaching the highest Light cap in the game.',
    component: MaximizeLightGuide,
  },
  'crafting-paths': {
    id: 'crafting-paths',
    title: 'Star Chart & Rune Anvil',
    subtitle: 'Optimal Building Paths',
    description: 'Master your Star Chart routes, major nodes, and Runic Anvil upgrades.',
    component: SkillChartGuide,
  },
  'mystic-gear': {
    id: 'mystic-gear',
    title: 'Mystic Gear',
    subtitle: 'Endgame Crafting & Upgrades',
    description: 'Complete guide for Mystic Tier 5 upgrade costs, materials, and farming loops.',
    component: MysticGearGuide,
  },
  'towers-ships': {
    id: 'towers-ships',
    title: 'Towers & Ships',
    subtitle: '5★ Dungeons Farming',
    description: 'Best strategies for D13 Ship XP grinding and D14 Tower Phoenix Mote farming.',
    component: TowersShipsGuide,
  },
};