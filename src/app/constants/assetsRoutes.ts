const BASE_PATH_ICONS = 'assets/icons';
const BASE_PATH_IMAGES = 'assets/images';

export const ICONS = {
  // ../../assets/icons/history-icon.png
  historial: `${BASE_PATH_ICONS}/history-icon.png`,
} as const;

export const IMAGES = {
  estados: {
    bien: '/assets/emoticons/status-bien.png',
    justo: '/assets/emoticons/status-justo.png',
    muyJusto: '/assets/emoticons/status-muyJusto.png',
    pasado: '/assets/emoticons/status-pasado.png',
    ganancias: '/assets/emoticons/ganancias.png',
  },
};

export type IconKey = keyof typeof ICONS;
export type ImageKey = keyof typeof IMAGES;
