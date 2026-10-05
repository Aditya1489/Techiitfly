// Founder bio & story for techiitfly
// When story or photo is empty, the founder block is cleanly hidden in the UI.
export const founderName = "Aditya Chavhan";
export const founderPhoto: string = ""; // e.g. "/images/aditya.webp"
export const founderStory: string = ""; // 2-3 lines of story when ready

// Backward compatibility aliases
export const founderBio: string = founderStory;
export const hasFounderBio: boolean = Boolean(
  founderStory && founderStory.trim().length > 0 && founderPhoto && founderPhoto.trim().length > 0
);
export const hasFounderBlock: boolean = hasFounderBio;
