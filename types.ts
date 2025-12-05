export enum VeoModel {
  FAST = 'veo-3.1-fast-generate-preview',
  QUALITY = 'veo-3.1-generate-preview',
}

export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum Resolution {
  HD_720P = '720p',
  FHD_1080P = '1080p',
}

export interface GeneratedVideo {
  id: string;
  url: string;
  prompt: string;
  model: VeoModel;
  timestamp: number;
}

export interface GenerationParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  imageStart?: string; // base64
  imageEnd?: string; // base64
}

export interface PromptState {
  subject: string;
  style: string;
  lighting: string;
  camera: string;
  atmosphere: string;
  custom: string;
}