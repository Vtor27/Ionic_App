const BASE_PATH_ICONS = 'assets/icons';
const BASE_PATH_IMAGES = 'assets/images';

export const ICONS = {
  // ../../assets/icons/history-icon.png
  historial: `${BASE_PATH_ICONS}/history-icon.png`,
} as const;

export const IMAGES = {};

export type IconKey = keyof typeof ICONS;
export type ImageKey = keyof typeof IMAGES;
