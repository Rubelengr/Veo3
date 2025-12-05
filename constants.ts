import { VeoModel, AspectRatio, Resolution } from './types';

export const INITIAL_PROMPT_STATE = {
  subject: '',
  style: 'Cinematic',
  lighting: 'Natural',
  camera: 'Static',
  atmosphere: 'Neutral',
  custom: '',
};

export const MODEL_OPTIONS = [
  { value: VeoModel.FAST, label: 'Veo 3.1 Fast (Preview)' },
  { value: VeoModel.QUALITY, label: 'Veo 3.1 Quality' },
];

export const ASPECT_RATIOS = [
  { value: AspectRatio.LANDSCAPE, label: '16:9 Landscape' },
  { value: AspectRatio.PORTRAIT, label: '9:16 Portrait' },
];

export const RESOLUTIONS = [
  { value: Resolution.HD_720P, label: '720p HD' },
  { value: Resolution.FHD_1080P, label: '1080p FHD' },
];

export const STYLE_PRESETS = [
  "Cinematic", "Photorealistic", "Anime", "3D Render", "Vintage Film", "Cyberpunk", "Fantasy", "Documentary", "Claymation", "Watercolor"
];

export const LIGHTING_PRESETS = [
  "Natural", "Golden Hour", "Studio", "Neon", "Dark/Moody", "Bright/High-Key", "Volumetric", "Bioluminescent"
];

export const CAMERA_PRESETS = [
  "Static", "Pan", "Zoom In", "Zoom Out", "Tracking Shot", "Drone View", "Handheld", "FPV", "Dutch Angle"
];

export const SAMPLE_SUBJECTS = [
  "A futuristic city built into a giant waterfall",
  "A tiny astronaut exploring a garden of giant mushrooms",
  "A classic car driving along a coastal road at sunset",
  "A cyberpunk street food vendor serving glowing noodles",
  "A majestic dragon resting on a mountain peak in the snow",
  "A robot barista creating complex latte art",
  "A time-lapse of a blooming bioluminescent flower",
  "An underwater city with glass domes and swimming vehicles"
];