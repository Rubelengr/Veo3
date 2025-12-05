import { PromptState } from "../types";

// Since this is now a pure prompt generator without API keys, 
// we use a deterministic formatter instead of calling an LLM.

export const formatVeoPrompt = (state: PromptState): string => {
  const parts = [];

  // Base Subject
  if (state.subject) {
    parts.push(state.subject.trim().endsWith('.') ? state.subject.trim() : `${state.subject.trim()}.`);
  }

  // Visual Style
  if (state.style && state.style !== 'Cinematic') { // 'Cinematic' is often default, implied
    parts.push(`The visual style is ${state.style.toLowerCase()}.`);
  }

  // Lighting
  if (state.lighting && state.lighting !== 'Natural') {
    parts.push(`Lighting is ${state.lighting.toLowerCase()}.`);
  }

  // Camera
  if (state.camera && state.camera !== 'Static') {
    parts.push(`Shot with a ${state.camera.toLowerCase()} camera movement.`);
  }

  // Atmosphere
  if (state.atmosphere && state.atmosphere !== 'Neutral') {
    parts.push(`The atmosphere is ${state.atmosphere.toLowerCase()}.`);
  }

  // Custom
  if (state.custom) {
    parts.push(state.custom.trim().endsWith('.') ? state.custom.trim() : `${state.custom.trim()}.`);
  }

  // Veo 3.1 specific keywords for quality
  if (parts.length > 0) {
    parts.push("High quality, 4k, photorealistic, cinematic composition.");
  }

  return parts.join(" ");
};
