import flashIcon from '../styles/img/flash.png';
import multiplierIcon from '../styles/img/multiplier-icon.png';
import columnsIcon from '../styles/img/column-icon.png';
import generatorIcon from '../styles/img/generator.png';
import abacusIcon from '../styles/img/abacus.png';

export default [
  {
    id: 1,
    name: 'anzan',
    title: {
      en: '',
      ru: '',
    },
    icon: flashIcon,
    background: '#833ab4',
    url: 'game-afterburner',
    disabled: false,
  },
  {
    id: 2,
    name: 'multiply',
    title: {
      en: '',
      ru: '',
    },
    icon: multiplierIcon,
    background: '#c13584',
    url: 'game-multiplier',
    disabled: false,
  },
  {
    id: 3,
    name: 'pillars',
    title: {
      en: '',
      ru: '',
    },
    icon: columnsIcon,
    background: '#f56040',
    url: 'game-count-columns',
    disabled: false,
  },
  {
    id: 4,
    name: 'questGenerator',
    title: {
      en: '',
      ru: '',
    },
    icon: generatorIcon,
    background: '#f56040',
    url: 'generator-game',
    disabled: false,
  },
  {
    id: 5,
    name: 'abacus',
    title: {
      en: '',
      ru: '',
    },
    icon: abacusIcon,
    background: '#f56040',
    url: 'abacus',
    disabled: false,
  },
];
