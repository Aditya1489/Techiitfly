export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  business: string;
  photo?: string;
  url?: string;
}

// Leave empty until real client reviews are confirmed.
// The Testimonials component automatically hides when this array is empty.
export const TESTIMONIALS: Testimonial[] = [];
